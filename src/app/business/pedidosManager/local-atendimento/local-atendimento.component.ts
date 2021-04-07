import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { PedidosOnline } from 'src/app/interfaces/pedidos-online';
import { PremiumService } from 'src/app/shop-premium/premium.service';
import * as Constants from '../../../constants/constants'
import * as jspdf from 'jspdf'
import { Router } from '@angular/router';
@Component({
  selector: 'app-local-atendimento',
  templateUrl: './local-atendimento.component.html',
  styleUrls: ['./local-atendimento.component.css']
})
export class LocalAtendimentoComponent implements OnInit {

  finalizado$?: Observable<PedidosOnline[]>
  panelOpenState = false;
  constructor(private ps: PremiumService,
    private auth: AngularFireAuth,
    private router : Router) { }

  ngOnInit(): void {
    this.auth.authState.subscribe(user => {
      this.finalizado$ = this.ps.getPedidosLocal(user?.uid!)
    })

  }

  goToLocalShop(){
    this.router.navigateByUrl('/dashboard/shop-local')
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
    var doc1 = new jspdf.jsPDF()
    var height = doc1.internal.pageSize.getHeight()
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
