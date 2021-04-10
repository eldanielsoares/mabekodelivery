import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { PedidosOnline } from 'src/app/interfaces/pedidos-online';
import { PremiumService } from 'src/app/shop-premium/premium.service';
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
    this.router.navigateByUrl('/dashboard/print', {state:{ print: p}})
  }

}
