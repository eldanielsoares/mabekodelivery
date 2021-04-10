import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { PedidosOnline } from 'src/app/interfaces/pedidos-online';
import { PremiumService } from 'src/app/shop-premium/premium.service';
import * as jspdf from 'jspdf'
import * as Constants from '../../../constants/constants'
import { Router } from '@angular/router';

@Component({
  selector: 'app-pendente',
  templateUrl: './pendente.component.html',
  styleUrls: ['./pendente.component.css']
})
export class PendenteComponent implements OnInit {

  pendente$?: Observable<PedidosOnline[]>
  panelOpenState = false;
  constructor(private ps: PremiumService,
    private auth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
    this.auth.authState.subscribe(user => {
      this.pendente$ = this.ps.getPedidosPendente(user?.uid!)
    })

  }

  enviarMsg(pedido: PedidosOnline) {
    let celular = `55${pedido.telefoneCliente}`
    let info = `Olá, ${pedido.nomeCliente}, seu pedido ${pedido.pedido} está pronto para ser aceito`
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
