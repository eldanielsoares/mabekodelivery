import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css']
})
export class PagamentosComponent implements OnInit {
  user?: User;
  pagamento = ['Dinheiro', 'Crédito à vista', 'Crédito parcelado', 'Débito', 'Ticket Alimentação', 'Ame', 'Pix', 'Bitcoin', 'Etherium']
  formasPgt = this.fb.group({
    pgt: ['']
  })
  loading = false
  subscription = new Subscription
  constructor(private authService: AuthService,
    private auth: AngularFireAuth,
    private notify: NotifyService,
    private router: Router,
    private fb: FormBuilder) {
    const nav = this.router.getCurrentNavigation()
    this.user = nav?.extras.state?.user
    
    

  }


  ngOnInit(): void {
    this.formasPgt.controls['pgt'].setValue(this.user?.pagamentos)
  }

  save() {
    this.loading = true
    const authId = this.auth.authState.subscribe(userId => {
      let user: User = {
        pagamentos: this.formasPgt.controls['pgt'].value
      }
      this.authService.updateProfile(userId!.uid, user).then(() => {
        this.notify.notifications('Formas de pagamento atualizadas com sucesso')
        this.loading = false
        this.router.navigateByUrl('/dashboard', { replaceUrl: true })

      }).catch(err => {
        this.notify.notifications(err)
        this.loading = false
      })
    })

  }

  goToBack() {
    this.router.navigateByUrl('/dashboard', { replaceUrl: true })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.subscription = new Subscription
  }

}
