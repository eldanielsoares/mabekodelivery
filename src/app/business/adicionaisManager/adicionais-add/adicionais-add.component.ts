import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Adicionais } from 'src/app/interfaces/adicionais';
import { User } from 'src/app/interfaces/user';
import { BusinessService } from '../../business.service';
import * as uuid from 'uuid'
import { NotifyService } from 'src/app/notifications/notify.service';

@Component({
  selector: 'app-adicionais-add',
  templateUrl: './adicionais-add.component.html',
  styleUrls: ['./adicionais-add.component.css']
})
export class AdicionaisAddComponent implements OnInit {

  user?: User
  add = this.fb.group({
    'nome': ['', [Validators.required]],
    'categoria': ['', [Validators.required]],
    'preco': ['', [Validators.required]],
  })
  constructor(private router: Router,
    private fb: FormBuilder,
     private auth: AngularFireAuth,
     private bs: BusinessService,
     private notify: NotifyService) { 

     let nav  = this.router.getCurrentNavigation()
      this.user = nav?.extras?.state?.user
      
      console.log(this.user);
      
     }

  ngOnInit(): void {
  }

  saveAdd(){
    this.auth.authState.subscribe(uid =>{
      let docId = uid?.uid + uuid.v4()
      let add : Adicionais = {
        nome : this.add.controls['nome'].value,
        categoria: this.add.controls['categoria'].value,
        preco : this.add.controls['preco'].value,
        uid : uid?.uid,
        docId: docId
      }

      this.bs.saveAdicionais(docId, add).then(() => {
       this.notify.notifications('Adicionado')
       this.add.reset()
      }).catch(e =>{
        this.notify.notifications(e)
      })
    })
  }

  goToBack() {
    this.router.navigateByUrl('/dashboard/add-extras', { replaceUrl: true })
  }

}
