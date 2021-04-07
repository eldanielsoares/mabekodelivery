import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  promo = this.fb.group({
    'nome': ['', [Validators.required]],
    'status': ['true'],
    'desconto': ['', [Validators.required]]
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

    if (this.promoInfo?.cupom) {
      this.promo.controls['nome'].setValue(this.promoInfo?.cupom)
      let status = this.promoInfo?.cupomStatus
      this.promo.controls['status'].setValue(status?.toString())
      this.promo.controls['desconto'].setValue(this.promoInfo?.desconto)

    }



  }

  ngOnInit(): void {

  }

  handlePromo() {
    this.loading = true
    let authSub = this.auth.authState.subscribe(userId => {
      let status: boolean
      if (this.promo.controls['status'].value == 'true') {
        status = !!this.promo.controls['status'].value
      } else {
        status = !this.promo.controls['status'].value
      }
      let desc = this.promo.controls['desconto'].value


      let user: User = {
        cupom: this.promo.controls['nome'].value,
        cupomStatus: status,
        desconto: desc as number
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
