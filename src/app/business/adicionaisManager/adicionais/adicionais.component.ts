import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Adicionais } from 'src/app/interfaces/adicionais';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';
import { BusinessService } from '../../business.service';

@Component({
  selector: 'app-adicionais',
  templateUrl: './adicionais.component.html',
  styleUrls: ['./adicionais.component.css']
})
export class AdicionaisComponent implements OnInit {

  user?: User
  subj = new Subscription
  adicional$? : Observable<Adicionais[]>
  constructor(private router: Router, 
    private bs : BusinessService, 
    private auth: AngularFireAuth,
    private notify: NotifyService) {
    let nav = this.router.getCurrentNavigation()
    this.user = nav?.extras?.state?.user

    console.log(this.user);

  }

  ngOnInit(): void {
    let u = this.auth.authState.subscribe((user)=>{
      this.adicional$ = this.bs.getAdicionais(user?.uid!)
    })
    this.subj.add(u)

  }

  deleteAdd(docId: any){
    this.bs.deleteAdicionais(docId).then(()=>{
      this.notify.notifications('Adicional apagado com sucesso.')
    }).catch(err=>{
      this.notify.notifications(err)
    })
  }

  goToBack() {
    this.router.navigateByUrl('/dashboard', { replaceUrl: true })
  }

  goToAdd() {
    this.router.navigateByUrl('/dashboard/extra-item', { state: { user: this.user } })
  }

  goToEdit(a: any) {
    this.router.navigateByUrl('/dashboard/edit-extra', { state: { adicionais: a, user: this.user?.categorias } })
    //console.log(a);
    
  }

  ngOnDestroy(){
    this.subj.unsubscribe()
    this.subj = new Subscription
  }


}
