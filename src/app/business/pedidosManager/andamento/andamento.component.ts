import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { PedidosOnline } from 'src/app/interfaces/pedidos-online';
import { PremiumService } from 'src/app/shop-premium/premium.service';
import * as jspdf from 'jspdf'
import * as Constants from '../../../constants/constants'
import { Router } from '@angular/router';
@Component({
  selector: 'app-andamento',
  templateUrl: './andamento.component.html',
  styleUrls: ['./andamento.component.css']
})
export class AndamentoComponent implements OnInit {

  andamento$?: Observable<PedidosOnline[]>
  panelOpenState = false;
  constructor(private ps: PremiumService,
    private auth: AngularFireAuth,
    private router: Router) { }

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
    this.ps.updateStatusDelete(p.docId).then(() => {
      console.log('recusado');

    }).catch(e => {
      console.log(e);

    })

  }

  print(p: PedidosOnline) {
    this.router.navigateByUrl('/dashboard/print', {state:{ print: p}})
  }

}
