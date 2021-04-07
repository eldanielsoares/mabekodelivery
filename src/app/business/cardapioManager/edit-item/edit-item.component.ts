import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';
import { BusinessService } from '../../business.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  prodInfo?: Produto
  userCat?: User
  item = this.fb.group({
    'nome': ['', [Validators.required]],
    'ingredientes': ['', [Validators.required]],
    //'sabor': [''],
    'preco': ['', [Validators.required]],
    'categoria': [''],
    'sabor': [''],
    'multi': ['']
  })

  img?: any
  uploadedImage?: Blob
  subscription = new Subscription
  loading = false
  categorias?: string[]
  constructor(private fb: FormBuilder,
    private ng2: Ng2ImgMaxService,
    private storage: AngularFireStorage,
    private businessService: BusinessService,
    private router: Router,
    private notify: NotifyService,
    private auth: AngularFireAuth) {

    const nav = this.router.getCurrentNavigation()
    this.prodInfo = nav?.extras.state?.prod
    this.userCat = nav?.extras.state?.categoria
    this.categorias = this.userCat?.categorias


    this.item.controls['nome'].setValue(this.prodInfo?.nome)
    this.item.controls['ingredientes'].setValue(this.prodInfo?.ingredientes)
    //this.item.controls['sabor'].setValue(this.prodInfo?.sabor)
    this.item.controls['preco'].setValue(this.prodInfo?.preco)
    this.item.controls['categoria'].setValue(this.prodInfo?.categoria)
    this.item.controls['multi'].setValue(`${this.prodInfo?.multipleSabor}`)
    let sabores = ''
    this.prodInfo?.sabor?.reduce((current, elem)=> sabores += elem+',')
    this.item.controls['sabor'].setValue(sabores)
    
    if (this.prodInfo?.urlProduto != null) {
      this.img = this.prodInfo?.urlProduto
    }


  }



  ngOnInit(): void {
  }

  resize(event: any) {
    let image = event.target.files[0]
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

  saveProd() {
    this.loading = true
    let file = this.uploadedImage
    let saborArr = this.item.controls['sabor'].value

    let multiSabor : boolean
    if (this.item.controls['multi'].value == 'true'){
      multiSabor = true
    }else{
      multiSabor = false
    }

    if (file == null) {
     let authSub =  this.auth.authState.subscribe(userId => {
        let prod: Produto = {
          nome: this.item.controls['nome'].value,
          ingredientes: this.item.controls['ingredientes'].value,
          preco: this.item.controls['preco'].value,
          categoria: this.item.controls['categoria'].value,
          sabor: saborArr.split(/\s*,\s*/),
          multipleSabor: multiSabor

        }

        this.businessService.editProd(this.prodInfo!.docId!, prod).then(() => {
          this.notify.notifications('Item atualizado com sucesso')
          this.router.navigateByUrl('/dashboard/cardapio', { replaceUrl: true, state: { user: this.userCat } })
          this.loading = false
        }).catch(err => {
          this.notify.notifications(err)
          this.loading = false
        })

        this.subscription.add(authSub)
        
      })
    }else{

      let authSub =  this.auth.authState.subscribe(userId => {
        let docId = this.prodInfo?.docId
        let path = `image/${docId}`
        let task = this.storage.upload(path, file)
        .then((u)=>{
         let link =   this.storage.ref(path).getDownloadURL().subscribe((urlImage)=>{
            let prod : Produto = {
              nome: this.item.controls['nome'].value,
              ingredientes: this.item.controls['ingredientes'].value,
              preco: this.item.controls['preco'].value,
              categoria: this.item.controls['categoria'].value,
              urlProduto: urlImage,
              sabor: saborArr.split(/\s*,\s*/),
              multipleSabor: multiSabor
      
            }
      
            this.businessService.editProd(this.prodInfo!.docId!, prod).then(() =>{
              this.notify.notifications('Item atualizado com sucesso')
              this.router.navigateByUrl('/dashboard/cardapio', {replaceUrl: true, state: {user: this.userCat}})
              this.loading = false
            }).catch(err =>{
              this.notify.notifications(err)
              this.loading = false
            })
          })
          this.subscription.add(link)
        } )
        this.subscription.add(authSub)
      })

    }


  }

  goToBack() {
    this.router.navigateByUrl('/dashboard/cardapio', { replaceUrl: true, state: { user: this.userCat } })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.subscription = new Subscription
  }

}
