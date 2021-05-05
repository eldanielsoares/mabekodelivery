import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PedidosOnline } from 'src/app/interfaces/pedidos-online';
import { PremiumService } from 'src/app/shop-premium/premium.service';

@Component({
  selector: 'app-finalizado',
  templateUrl: './finalizado.component.html',
  styleUrls: ['./finalizado.component.css']
})
export class FinalizadoComponent implements OnInit {

  finalizado$?: Observable<PedidosOnline[]>
  panelOpenState = false;
  constructor(private ps: PremiumService,
    private auth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
    this.auth.authState.subscribe(user => {
      this.finalizado$ = this.ps.getPedidosFinalizado(user?.uid!)
    })

  }

  enviarMsg(pedido: PedidosOnline) {
    let celular = `55${pedido.telefoneCliente}`
    let info = `Olá, ${pedido.nomeVendedor}, alguma novidade sobre meu pedido ${pedido.pedido}`
    let msg = window.encodeURIComponent(info)
    window.open(`https://api.whatsapp.com/send?phone=${celular}&text=${msg}`)
  }

  print(p: PedidosOnline) {
    this.router.navigateByUrl('/dashboard/print', {state:{ print: p}})
  }
}
