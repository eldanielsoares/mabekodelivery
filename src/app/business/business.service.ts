import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import * as Constants from '../constants/constants'
import { Produto } from '../interfaces/product';
import { Adicionais } from '../interfaces/adicionais';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  constructor(private afs: AngularFirestore) { }

  getUser(uid: string): Observable<User[]>{
    return this.afs.collection<User>(Constants.COLLECTIONS.USER_COLLECTION, ref=> ref.where('uid', '==', uid)).valueChanges()
  }

  saveProd(docId: string, prod: Produto){
    return this.afs.collection(Constants.COLLECTIONS.PRODUTOS_COLLECTION).doc(docId).set(prod)
  }

  saveAdicionais(docId: string, add: Adicionais){
    return this.afs.collection(Constants.COLLECTIONS.ADICIONAIS).doc(docId).set(add)
  }

  getMyProducts(userId: string,categoria : string): Observable<Produto[]>{
    let prod: any
    if (categoria == '') {
      prod = this.afs.collection<Produto>(Constants.COLLECTIONS.PRODUTOS_COLLECTION, ref=> ref.where('idUser', '==', userId)).valueChanges()
    }else {
      prod = this.afs.collection<Produto>(Constants.COLLECTIONS.PRODUTOS_COLLECTION, ref=> ref.where('idUser', '==', userId).where('categoria', '==', categoria)).valueChanges()
    }
    return  prod
  }

  updateVisible(docId: string, visible: boolean){
    if(visible){
      return this.afs.collection<Produto>(Constants.COLLECTIONS.PRODUTOS_COLLECTION).doc(docId).update({visivel: false})
    }else{
      return this.afs.collection<Produto>(Constants.COLLECTIONS.PRODUTOS_COLLECTION).doc(docId).update({visivel: true})
    }
  }

  editProd(docId:string, prod: Produto){
    return this.afs.collection<Produto>(Constants.COLLECTIONS.PRODUTOS_COLLECTION).doc(docId).update(prod)
  }

  deleteProduct(docId: string){
    return this.afs.collection<Produto>(Constants.COLLECTIONS.PRODUTOS_COLLECTION).doc(docId).delete()
  }

}
