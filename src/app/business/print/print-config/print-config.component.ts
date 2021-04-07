import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';
import * as Constants from '../../../constants/constants'

@Component({
  selector: 'app-print-config',
  templateUrl: './print-config.component.html',
  styleUrls: ['./print-config.component.css']
})
export class PrintConfigComponent implements OnInit {

  print = this.fb.group({
    'largura': ['80', [Validators.required]],
    'altura': ['120', [Validators.required]]
  })
  loading = false
  subscription = new Subscription

  promoInfo?: User
  constructor(private router: Router,
    private fb: FormBuilder,
    private notify: NotifyService) {

  }

  ngOnInit(): void {
   if (localStorage.getItem(Constants.KEYS.ALTURA) != '') {
    this.print.controls['altura'].setValue(localStorage.getItem(Constants.KEYS.ALTURA))
   }

   if (localStorage.getItem(Constants.KEYS.LARGURA) != '') {
    this.print.controls['largura'].setValue(localStorage.getItem(Constants.KEYS.LARGURA))
   }




  }

  handlePrint() {
    let largura = this.print.controls['largura'].value
    let altura = this.print.controls['altura'].value

    localStorage.setItem(Constants.KEYS.ALTURA, altura)
    localStorage.setItem(Constants.KEYS.LARGURA, largura)
    this.notify.notifications('Salvo com sucesso')
    this.router.navigateByUrl('/dashboard', {replaceUrl:true})

  }

  goToBack() {
    this.router.navigateByUrl('/dashboard', { replaceUrl: true })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.subscription = new Subscription
  }

}
