import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';
import { BusinessService } from '../../business.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  produto$?: Observable<Produto[]>
  user?: User
  mSelected = ''
  constructor(private auth: AngularFireAuth,
    private businessService: BusinessService,
    private notify: NotifyService,
    private router: Router,
    private storage: AngularFireStorage) {
    const nav = this.router.getCurrentNavigation()
    this.user = nav?.extras.state?.user;
    //console.log(this.user);

  }

  ngOnInit(): void {
    this.auth.authState.subscribe(userId => {
      this.produto$ = this.businessService.getMyProducts(userId!.uid, '')
    })
  }

  categoria(evt: any){
    this.auth.authState.subscribe(userId => {
      this.produto$ = this.businessService.getMyProducts(userId!.uid, evt.value)
    })
  }

  goToEdit(p: Produto) {
    this.router.navigateByUrl('/dashboard/edit', { state: { prod: p, categoria: this.user } })

  }

  goToAdd() {
    this.router.navigateByUrl('/dashboard/add-item', { state: { user: this.user } })
  }

  handleVisible(visible: any, docId: any) {
    this.businessService.updateVisible(docId, visible).then(() => {
      if (visible) {
        this.notify.notifications('Produto ocultado')
      } else {
        this.notify.notifications('Produto visível')
      }
    }).catch(err => {
      this.notify.notifications(err)
    })
  }

  handleDelete(docId: any) {
    var resultado = confirm("Você tem certeza que deseja excluir o item? ");
    if (resultado == true) {
      this.businessService.deleteProduct(docId).then(() => {
        this.notify.notifications('Este item foi apagado')
        let path = `image/${docId}`
        this.storage.ref(path).delete()
      }).catch(err => {
        this.notify.notifications(err)
      })
    }
  }

  goToBack() {
    this.router.navigateByUrl('/dashboard', { replaceUrl: true })
  }

}
