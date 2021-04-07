import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';
import { BusinessModule } from '../business.module';
import { BusinessService } from '../business.service';
import * as Constants from '../../constants/constants'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user$?: Observable<User[]>
  @ViewChild('myInput') myInput?: ElementRef;
  subscription = new Subscription
  uid?: string
  /*dia = new Date().getDay()+1
  dates = this.dia.toString()*/

  constructor(private authService: AuthService,
    private router: Router,
    private notify: NotifyService,
    private businessService: BusinessService,
    private auth: AngularFireAuth,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    let authSub = this.auth.authState.subscribe(userId => {
      this.user$ = this.businessService.getUser(userId!.uid)
      this.uid = userId?.uid
    })
    
    

    this.subscription.add(authSub)


  }

  signOut() {
    this.authService.signOut()
      .then(() => {
        this.router.navigateByUrl('/login')
      }).catch(err => {
        this.notify.notifications(err)
      })
  }

  copy() {
    navigator.clipboard.writeText(this.myInput?.nativeElement.value).then(url => {
      this.notify.notifications('URL foi copiada com sucesso')
    }).catch(e => console.error(e));

  }

  goToProfile(p: User) {
    let userInfo = p
    this.router.navigateByUrl('/dashboard/perfil', { state: { user: userInfo } })
  }

  goToCategoria(p: User) {
    let userInfo = p
    this.router.navigateByUrl('/dashboard/categoria', { state: { user: userInfo } })
  }

  goToCardapio(p: User){
    let userInfo = p
    let url = this.myInput?.nativeElement.value
    sessionStorage.setItem(Constants.KEYS.URL, url.slice(url.lastIndexOf('/') + 1))
    this.router.navigateByUrl('/dashboard/cardapio', {state: {user: userInfo}})
    
  }

  goToAdicionais(p: User){
    let userInfo = p
    let url = this.myInput?.nativeElement.value
    sessionStorage.setItem(Constants.KEYS.URL, url.slice(url.lastIndexOf('/') + 1))
    this.router.navigateByUrl('/dashboard/add-extras', {state: {user: userInfo}})
    
  }

  goToExpediente(p: any){
    this.router.navigateByUrl('/dashboard/expediente', {state:{user: p}})
  }

  goToPromo(p: any){
    this.router.navigateByUrl('/dashboard/promocoes', {state:{user: p}})
  }

  goToPgt(p: any){
    this.router.navigateByUrl('/dashboard/pagamentos', {state:{user:p}})
  }

  goToEntrega(p: any){
    this.router.navigateByUrl('/dashboard/entrega', {state:{user:p}})
  }

  goToPedidos(){
    this.router.navigateByUrl('/dashboard/meus-pedidos')
  }


  goToPrint(){
    this.router.navigateByUrl('/dashboard/print-config')
  }



  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.subscription = new Subscription
  }

}
