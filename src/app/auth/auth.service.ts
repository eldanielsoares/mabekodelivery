import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import * as Constants from '../constants/constants'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
    private afs: AngularFirestore
    ) { }

    register(email: string, senha:string){
       return this.auth.setPersistence('local').then(()=>{
        return this.auth.createUserWithEmailAndPassword(email, senha)
      })
    }

    login(email:string, senha: string){
      return this.auth.setPersistence('local').then(()=>{
        return this.auth.signInWithEmailAndPassword(email, senha)
      })
    }

   createAccount(docId: string, data: User){
     return this.afs.collection(Constants.COLLECTIONS.USER_COLLECTION).doc(docId).set(data)
   }

   updateProfile(docId: string, user: User){
     return this.afs.collection(Constants.COLLECTIONS.USER_COLLECTION).doc(docId).update(user)
   }

   resetPass(email: string){
     return this.auth.sendPasswordResetEmail(email)
   }

   signOut(){
     return this.auth.signOut()
   }
}
