import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
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
    'minEntrega': ['', [Validators.required]],
    'tipo': ['true']
  })

  entregaFixa = this.fb.group({
    'fixa': this.fb.array([])
  })

  fixa = this.entregaFixa.get('fixa') as FormArray
  loading = false
  dinamic?: boolean
  precoFixo: string[] = []
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

    if (this.promoInfo?.freteDinamico != undefined) {
      if (this.promoInfo.freteDinamico) {
        this.promo.controls['tipo'].setValue('true')
        this.dinamic = true
      } else {
        this.promo.controls['tipo'].setValue('false')
        this.dinamic = false
      }

    }

    let end : string[] = []

    if (this.promoInfo?.enderecosFixos?.length != undefined) {
      this.promoInfo.enderecosFixos.forEach((val)=>{
        this.fixa.push(
          this.fb.group({
            'bairro': this.fb.control(val.split('-')[0]),
            'preco': this.fb.control(parseFloat(val.substring(val.lastIndexOf('$')+1)))
            
          })
        )
        end.push(val)
        
      })
    }

    
  

    if (this.promoInfo?.minTaxa) {
      this.promo.controls['minEntrega'].setValue(this.promoInfo?.minTaxa)
    }



  }

  ngOnInit(): void {
    //console.log(this.promoInfo?.enderecosFixos);
    
    if (this.promoInfo?.enderecosFixos == undefined) {
      this.fixa.push(
        this.fb.group({
          'bairro': this.fb.control(''),
          'preco': this.fb.control('')
        })
      )
    }

  }

  rd(evt: any) {
    console.log(evt.value);
    if (evt.value == 'true') {
      this.dinamic = true
    } else {
      this.dinamic = false
    }

  }

  addEndereco() {
    this.fixa.push(
      this.fb.group({
        'bairro': this.fb.control('', [Validators.required]),
        'preco': this.fb.control('', [Validators.required])
      })
    )
  }

  delEnd(i: number){
    this.fixa.removeAt(i)
  }

  handlePromo() {
    this.loading = true
    let authSub = this.auth.authState.subscribe(userId => {


      let user: User = {
        taxaEntrega: this.promo.controls['entrega'].value,
        minTaxa: this.promo.controls['minEntrega'].value,
        freteDinamico: true
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

  handleFixa() {
    this.loading = true
    let authSub = this.auth.authState.subscribe(userId => {
      let entregaFixa = this.fixa.value

      for (let b in entregaFixa) {
        this.precoFixo.push(`${entregaFixa[b].bairro} - R$${entregaFixa[b].preco}`)
      }

      let user: User = {
        enderecosFixos: this.precoFixo,
        freteDinamico: false
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
