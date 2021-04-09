import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Adicionais } from 'src/app/interfaces/adicionais';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';
import { BusinessService } from '../../business.service';

@Component({
  selector: 'app-edit-adicionais',
  templateUrl: './edit-adicionais.component.html',
  styleUrls: ['./edit-adicionais.component.css']
})
export class EditAdicionaisComponent implements OnInit {

  user? = []
  adicionais?: Adicionais
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
     this.adicionais = nav?.extras?.state?.adicionais
     console.log(this.adicionais);
     
      
     }

  ngOnInit(): void {
    this.add.controls['nome'].setValue(this.adicionais?.nome)
    this.add.controls['categoria'].setValue(this.adicionais?.categoria)
    this.add.controls['preco'].setValue(this.adicionais?.preco)
  }

  saveAdd(){
    let add : Adicionais = {
      nome : this.add.controls['nome'].value,
      categoria: this.add.controls['categoria'].value,
      preco : this.add.controls['preco'].value,
    }

    this.bs.editAdicionais(this.adicionais?.docId!, add).then(() => {
     this.notify.notifications('Atualizado')
     this.router.navigateByUrl('/dashboard')
     this.add.reset()
    }).catch(e =>{
      this.notify.notifications(e)
    })
  }

  goToBack() {
    this.router.navigateByUrl('/dashboard', { replaceUrl: true })
  }

}
