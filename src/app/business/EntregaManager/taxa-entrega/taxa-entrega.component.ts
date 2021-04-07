import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';

@Component({
  selector: 'app-taxa-entrega',
  templateUrl: './taxa-entrega.component.html',
  styleUrls: ['./taxa-entrega.component.css']
})
export class TaxaEntregaComponent implements OnInit {

  promo = this.fb.group({
    'entrega': ['', [Validators.required]],
    'minEntrega': ['', [Validators.required]]
  })
  loading = false
  subscription = new Subscription

  promoInfo?: User
  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private notify: NotifyService) {

    const nav = this.router.getCurrentNavigation()
    this.promoInfo = nav?.extras.state?.user

    if (this.promoInfo?.taxaEntrega) {
      this.promo.controls['entrega'].setValue(this.promoInfo?.taxaEntrega)
    }

    if (this.promoInfo?.minTaxa) {
      this.promo.controls['minEntrega'].setValue(this.promoInfo?.minTaxa)
    }



  }

  ngOnInit(): void {

  }

  handlePromo() {
    this.loading = true
    let authSub = this.auth.authState.subscribe(userId => {
      

      let user: User = {
        taxaEntrega: this.promo.controls['entrega'].value,
        minTaxa : this.promo.controls['minEntrega'].value
      }

      this.authService.updateProfile(userId!.uid, user).then(() => {
        this.notify.notifications('Promoção criada com sucesso')
        this.router.navigateByUrl('/dashboard', { replaceUrl: true })
        this.loading = false
      }).catch(err => {
        this.notify.notifications(err)
        this.loading = false
      })
    })

    this.subscription.add(authSub)


  }

  goToBack() {
    this.router.navigateByUrl('/dashboard', { replaceUrl: true })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.subscription = new Subscription
  }

}
