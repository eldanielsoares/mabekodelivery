import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/interfaces/product';
import { NotifyService } from 'src/app/notifications/notify.service';
import * as Constants from '../../../constants/constants'
import { BusinessService } from '../../business.service';
import * as uuid from 'uuid'
import { User } from 'src/app/interfaces/user';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { AngularFireStorage } from '@angular/fire/storage';



@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item = this.fb.group({
    'nome': ['', [Validators.required]],
    'ingredientes': ['', [Validators.required]],
    'preco': ['', [Validators.required]],
    'categoria': [''],
    'sabor': [''],
    'multi': ['true']
  })
  categorias?: string[]
  img?: any
  uploadedImage?: Blob

  subscription = new Subscription
  loading = false
  user?: User
  constructor(private fb: FormBuilder,
    private ng2: Ng2ImgMaxService,
    private businessService: BusinessService,
    private router: Router,
    private notify: NotifyService,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    const user = this.router.getCurrentNavigation()
    this.user = user?.extras?.state?.user
    //console.log(this.user);
    this.categorias = this.user?.categorias


  }

  ngOnInit(): void {
    //console.log(sessionStorage.getItem(Constants.KEYS.URL) as string);
    
  }

  resize(event: any) {
    let image = event.target.files[0]
    //this.uploadedImage = new Blob
    this.ng2.compressImage(image, 0.300)
      .subscribe(result => {
        this.uploadedImage = new File([result], result.name)
        this.uploadedImage = result
        var reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = (_event) => {
          this.img = reader.result

        }


      })
  }

  saveProdContinue() {
    this.loading = true
    let file = this.uploadedImage
    let saborArr = this.item.controls['sabor'].value
    let multiSabor : boolean
    if (this.item.controls['multi'].value == 'true'){
      multiSabor = true
    }else{
      multiSabor = false
    }

    if (file == null || undefined) {
      let authSub = this.auth.authState.subscribe(userId => {
        let docIds = userId!.uid + uuid.v4()
        let produto: Produto = {
          nome: this.item.controls['nome'].value,
          ingredientes: this.item.controls['ingredientes'].value,
          categoria: this.item.controls['categoria'].value,
          preco: this.item.controls['preco'].value,
          docId: docIds,
          idUser: userId!.uid,
          urlNome: sessionStorage.getItem(Constants.KEYS.URL) as string,
          visivel: true,
          sabor: saborArr.split(/\s*,\s*/),
          multipleSabor: multiSabor
        }

        this.businessService.saveProd(docIds, produto).then(() => {

          this.notify.notifications('Item adicionado com sucesso')
          this.item.reset()
          this.loading = false
          this.img = ''
          //this.uploadedImage = new Blob
        }).catch(err => {
          this.notify.notifications(err)
          this.loading = false
        })

      })
      this.subscription.add(authSub)
    } else {

      let authSub = this.auth.authState.subscribe(userId => {
        let docIds = userId!.uid + uuid.v4()
        let path = `image/${docIds}`
        let task = this.storage.upload(path, file)
          .then((u) => {
            let link = this.storage.ref(path).getDownloadURL().subscribe((urlImage) => {
              let produto: Produto = {
                nome: this.item.controls['nome'].value,
                ingredientes: this.item.controls['ingredientes'].value,
                categoria: this.item.controls['categoria'].value,
                preco: this.item.controls['preco'].value,
                docId: docIds,
                idUser: userId!.uid,
                urlNome: sessionStorage.getItem(Constants.KEYS.URL) as string,
                visivel: true,
                urlProduto: urlImage,
                sabor: saborArr.split(/\s*,\s*/),
                multipleSabor: multiSabor
              }

              this.businessService.saveProd(docIds, produto).then(() => {
                this.notify.notifications('Item adicionado com sucesso')
                this.item.reset()
                this.loading = false
                this.img = ''
                this.uploadedImage = undefined
              }).catch(err => {
                this.notify.notifications(err)
                this.loading = false
              })
            })
            this.subscription.add(link)
          })

      })
      this.subscription.add(authSub)
    }
  }

  saveProdFinish() {
    this.loading = true
    let file = this.uploadedImage
    let multiSabor : boolean
    if (this.item.controls['multi'].value == 'true'){
      multiSabor = true
    }else{
      multiSabor = false
    }
    let saborArr = this.item.controls['sabor'].value
    if (file == null) {
      let authSub = this.auth.authState.subscribe(userId => {
        let docIds = userId!.uid + uuid.v4()
        let produto: Produto = {
          nome: this.item.controls['nome'].value,
          ingredientes: this.item.controls['ingredientes'].value,
          categoria: this.item.controls['categoria'].value,
          preco: this.item.controls['preco'].value,
          docId: docIds,
          idUser: userId!.uid,
          urlNome: sessionStorage.getItem(Constants.KEYS.URL) as string,
          visivel: true,
          sabor: saborArr.split(/\s*,\s*/),
          multipleSabor: multiSabor
        }

        this.businessService.saveProd(docIds, produto).then(() => {

          this.notify.notifications('Item adicionado com sucesso')
          this.router.navigateByUrl('/dashboard/cardapio', { replaceUrl: true, state: { user: this.user } })
          this.item.reset()
          this.loading = false
        }).catch(err => {
          this.notify.notifications(err)
          this.loading = false
        })

      })
      this.subscription.add(authSub)
    } else {

      let authSub = this.auth.authState.subscribe(userId => {
        let docIds = userId!.uid + uuid.v4()
        let path = `image/${docIds}`
        let task = this.storage.upload(path, file)
          .then((u) => {
            let link = this.storage.ref(path).getDownloadURL().subscribe((urlImage) => {
              let produto: Produto = {
                nome: this.item.controls['nome'].value,
                ingredientes: this.item.controls['ingredientes'].value,
                categoria: this.item.controls['categoria'].value,
                preco: this.item.controls['preco'].value,
                docId: docIds,
                idUser: userId!.uid,
                urlNome: sessionStorage.getItem(Constants.KEYS.URL) as string,
                visivel: true,
                urlProduto: urlImage,
                sabor: saborArr.split(/\s*,\s*/),
                multipleSabor: multiSabor
              }

              this.businessService.saveProd(docIds, produto).then(() => {

                this.notify.notifications('Item adicionado com sucesso')
                this.router.navigateByUrl('/dashboard/cardapio', { replaceUrl: true, state: { user: this.user } })
                this.item.reset()
                this.loading = false
              }).catch(err => {
                this.notify.notifications(err)
                this.loading = false
              })
            })
            this.subscription.add(link)
          })

      })
      this.subscription.add(authSub)
    }



  }
  goToBack() {
    this.router.navigateByUrl('/dashboard/cardapio', { replaceUrl: true, state: { user: this.user } })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.subscription = new Subscription
  }

}
