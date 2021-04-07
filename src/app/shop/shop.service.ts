import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import * as Constants from '../constants/constants'
import { Produto } from '../interfaces/product';
import { Pedido } from '../interfaces/pedido';
import { Adicionais } from '../interfaces/adicionais';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  pedido : Pedido[] = []
  prod: string[] = []
  constructor(private afs: AngularFirestore) { }

  getUserShop(uid: string): Observable<User[]>{
    return this.afs.collection<User>(Constants.COLLECTIONS.USER_COLLECTION, ref=> ref.where('nomeUrl', '==', uid)).valueChanges()
  }

  getUserShopLocal(uid: string): Observable<User[]>{
    return this.afs.collection<User>(Constants.COLLECTIONS.USER_COLLECTION, ref=> ref.where('uid', '==', uid)).valueChanges()
  }

  getUserProds(url: string, categoria: string): Observable<Produto[]>{
    let prod: any
    if(categoria == ''){
      prod = this.afs.collection<Produto>(Constants.COLLECTIONS.PRODUTOS_COLLECTION, ref=> ref.where('urlNome', '==', url).where('visivel', '==', true)).valueChanges()
    }else{
      prod = this.afs.collection<Produto>(Constants.COLLECTIONS.PRODUTOS_COLLECTION, ref=> ref.where('urlNome', '==', url).where('visivel', '==', true).where('categoria', '==', categoria)).valueChanges()
    }
    return prod
  }

  getProdsCategoria(url: string, categoria: string): Observable<Produto[]>{
    return this.afs.collection<Produto>(Constants.COLLECTIONS.PRODUTOS_COLLECTION, ref=> ref.where('urlNome', '==', url).where('visivel', '==', true).where('categoria', '==', categoria)).valueChanges()
  }

  getAdicionais(uid: string){
    return this.afs.collection<Adicionais>(Constants.COLLECTIONS.ADICIONAIS, ref=> ref.where('uid', '==', uid)).valueChanges()
  }

  
  getPedido(): Pedido[]{
    return this.pedido!
  }

  addPedido(p: Pedido){
    this.pedido.push(p)
    
  }

  removePedido(i:number){
    this.pedido.splice(i,1)
    this.prod.splice(i,1)
  }


}
