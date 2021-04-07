import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, Subscription } from 'rxjs';
import { PedidosOnline } from 'src/app/interfaces/pedidos-online';
import { PremiumService } from '../premium.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {

  logado: boolean = false
  user?: any
  logged?= ''
  authS = new Subscription
  panelOpenState = false;
  pedidos = ['1', '2', '3']
  pedidos$?: Observable<PedidosOnline[]>

  constructor(private premiumService: PremiumService,
    private fireAngular: AngularFireAuth) { }

  ngOnInit(): void {
    var userD = this.fireAngular.authState.subscribe(user => {
      this.logged = user?.uid
      this.user = user
      this.pedidos$ = this.premiumService.getPedidos(user?.uid!)
    })
    this.authS.add(userD)

  }

  login() {
    this.premiumService.loginGoogle().then(user => {
      this.fireAngular.authState.subscribe(userData => {
        this.logged = userData?.uid
        this.user = userData
        this.pedidos$ = this.premiumService.getPedidos(userData?.uid!)
      }
      )
    })
  }

  loginFace() {
    this.premiumService.loginFacebook().then(user => {
      this.fireAngular.authState.subscribe(userData => {
        this.logged = userData?.uid
        this.user = userData
        this.pedidos$ = this.premiumService.getPedidos(userData?.uid!)
      }
      )
    })
  }

  logout() {
    this.premiumService.logout().then(() => {
      this.user = ''
      this.logged = ''
    })
  }

  enviarMsg(pedido: PedidosOnline) {
    let celular = `55${pedido.telefoneVendedor}`
    let info = `Olá, ${pedido.nomeVendedor}, alguma novidade sobre meu pedido ${pedido.pedido}`
    let msg = window.encodeURIComponent(info)
    window.open(`https://api.whatsapp.com/send?phone=${celular}&text=${msg}`)
  }

  onDestroy() {
    this.authS.unsubscribe()
    this.authS = new Subscription
  }


}
