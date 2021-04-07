import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as constants from '../constants/constants'
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private notify: MatSnackBar, private angularMessaging: AngularFireMessaging) { }

  notifications(msg:string){
    this.notify.open(msg, 'Ok', {duration: 3000})
  }

  requestToken(uid: string) {
    if (uid != null) {
      this.angularMessaging.requestToken.subscribe((token) => {
        localStorage.setItem(constants.KEYS.TOKEN, token?.toString()!)
      })
    }
  }
}
