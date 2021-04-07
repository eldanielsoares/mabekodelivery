import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { PedidosOnline } from 'src/app/interfaces/pedidos-online';
import { PremiumService } from 'src/app/shop-premium/premium.service';
import * as jspdf from 'jspdf'
import * as Constants from '../../../constants/constants'
@Component({
  selector: 'app-andamento',
  templateUrl: './andamento.component.html',
  styleUrls: ['./andamento.component.css']
})
export class AndamentoComponent implements OnInit {

  andamento$?: Observable<PedidosOnline[]>
  panelOpenState = false;
  constructor(private ps: PremiumService,
    private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.authState.subscribe(user => {
      this.andamento$ = this.ps.getPedidosAndamento(user?.uid!)
    })

  }

  enviarMsg(pedido: PedidosOnline) {
    let celular = `55${pedido.telefoneVendedor}`
    let info = `Olá, ${pedido.nomeCliente}, seu pedido ${pedido.pedido} está sendo preparado`
    let msg = window.encodeURIComponent(info)
    window.open(`https://api.whatsapp.com/send?phone=${celular}&text=${msg}`)
  }

  handleAceitar(p: any) {
    p as PedidosOnline
    this.ps.updateStatus(p.docId, p.status).then(() => {
      //em breve um código aqui

    }).catch(e => {
      console.log(e);

    })

  }

  handleRecusar(p: any) {
    p as PedidosOnline
    this.ps.deletePedido(p.docId).then(() => {
      console.log('recusado');

    }).catch(e => {
      console.log(e);

    })

  }

  print(p: PedidosOnline) {
    let altura = '120'
    let largura = '80'
    if (localStorage.getItem(Constants.KEYS.ALTURA) != '') {
      altura = localStorage.getItem(Constants.KEYS.ALTURA)!
    }

    if (localStorage.getItem(Constants.KEYS.LARGURA) != '') {
      altura = localStorage.getItem(Constants.KEYS.LARGURA)!
    }
    var doc = new jspdf.jsPDF({

      orientation: "portrait",
      unit: "mm",
      format: [120, 60]
    })

    

    let ped = ''
    for (let p1 in p.pedido) {

      ped += `${p.pedido[parseInt(p1)]}\n`

    }

    let txtEndereco1 = p.endereco!.split(/\s*,\s*/)
    let adress = ''
    for (let s in txtEndereco1) {
      adress += `${txtEndereco1[s]}\n`
    }
    var txt = `${p.nomeVendedor} - Pedido\nCliente: ${p.nomeCliente}\nPedido: \n${ped}Forma de Pagamento: \n${p.formaPagamento}\nDesconto: R$${p.desconto!.toFixed(2)}\nTroco:${p.troco}\nEndereço: \n${adress}\nObservação: ${p.observacao}\nTaxa de entrega: R$${p.entregaTaxa!.toFixed(2)}\nTotal: R$${p.preco!.toFixed(2)}\n`

    doc.setFontSize(8)
    doc.text(txt, 5, 5)

    doc.output('dataurlnewwindow')
  }

}
