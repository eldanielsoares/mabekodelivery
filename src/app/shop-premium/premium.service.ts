import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import auth from 'firebase/app'
import { PedidosOnline } from '../interfaces/pedidos-online';
import * as Constants from '../constants/constants'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PremiumService {

  constructor(private fireAuth: AngularFireAuth,
             private afs: AngularFirestore) { }

  loginGoogle(){
    var credential = new auth.auth.GoogleAuthProvider()
    return this.fireAuth.signInWithPopup(credential)
  }

  loginFacebook(){
    var credential = new auth.auth.FacebookAuthProvider()
    return this.fireAuth.signInWithPopup(credential)
  }

  logout(){
    return this.fireAuth.signOut()
  }

  finishOrder(docId: string, pedido: PedidosOnline){
    return this.afs.collection(Constants.COLLECTIONS.PEDIDOS).doc(docId).set(pedido)
  }

  getPedidos(uid: string): Observable<PedidosOnline[]>{
    return this.afs.collection<PedidosOnline>(Constants.COLLECTIONS.PEDIDOS, ref=> ref.orderBy('timestamp', 'desc').where('idCliente', '==', uid)).valueChanges()
  }

  getPedidosPendente(uid: string): Observable<PedidosOnline[]>{
    return this.afs.collection<PedidosOnline>(Constants.COLLECTIONS.PEDIDOS, ref=> ref.orderBy('timestamp', 'asc').where('idVendedor', '==', uid).where('status', '==', 1)).valueChanges()
  }

  getPedidosAndamento(uid: string): Observable<PedidosOnline[]>{
    return this.afs.collection<PedidosOnline>(Constants.COLLECTIONS.PEDIDOS, ref=> ref.orderBy('timestamp', 'asc').where('idVendedor', '==', uid).where('status', '==', 2)).valueChanges()
  }

  getPedidosSaiuEntrega(uid: string): Observable<PedidosOnline[]>{
    return this.afs.collection<PedidosOnline>(Constants.COLLECTIONS.PEDIDOS, ref=> ref.orderBy('timestamp', 'asc').where('idVendedor', '==', uid).where('status', '==', 3)).valueChanges()
  }

  getPedidosFinalizado(uid: string): Observable<PedidosOnline[]>{
    return this.afs.collection<PedidosOnline>(Constants.COLLECTIONS.PEDIDOS, ref=> ref.orderBy('timestamp', 'desc').where('idVendedor', '==', uid).where('status', '==', 4)).valueChanges()
  }

  getPedidosLocal(uid: string): Observable<PedidosOnline[]>{
    return this.afs.collection<PedidosOnline>(Constants.COLLECTIONS.PEDIDOS, ref=> ref.orderBy('timestamp', 'desc').where('idVendedor', '==', uid).where('status', '==', 5)).valueChanges()
  }

  updateStatus(docId: string, status: number){
    return this.afs.collection(Constants.COLLECTIONS.PEDIDOS).doc(docId).update({status: status + 1})
  }

  deletePedido(docId: string){
    return this.afs.collection(Constants.COLLECTIONS.PEDIDOS).doc(docId).delete()
  }


}
