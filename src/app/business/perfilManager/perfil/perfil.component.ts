import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userInfo? : User
  loading = false
  profile = this.fb.group({
    'nome': [''],
    'whatsapp': [''],
    'rua': [''],
    'bairro': [''],
    'cidade': [''],
    'numero': [''],
    'estado': [''],
    'cep': [''],
    'endereco' : ['']
  })
  constructor(private router: Router,
    private fb : FormBuilder,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private notify: NotifyService) {

      
    const nav = this.router.getCurrentNavigation()
    this.userInfo = nav?.extras.state?.user;

    //console.log(this.userInfo?.nomeUrl);
    
    
    this.profile.controls['nome'].setValue(this.userInfo?.nome)
    this.profile.controls['whatsapp'].setValue(this.userInfo?.whatsapp)
    this.profile.controls['rua'].setValue(this.userInfo?.rua)
    this.profile.controls['cidade'].setValue(this.userInfo?.cidade)
    this.profile.controls['cep'].setValue(this.userInfo?.cep)
    this.profile.controls['estado'].setValue(this.userInfo?.estado)
    this.profile.controls['numero'].setValue(this.userInfo?.numero)
    this.profile.controls['bairro'].setValue(this.userInfo?.bairro)
    this.profile.controls['endereco'].setValue(this.userInfo?.endereco)

    

     }

  ngOnInit(): void {
  }

  onAutocompleteSelected(result: any) {
    console.log('onAutocompleteSelected: ', result.formatted_address);
    this.profile.controls['endereco'].setValue(result.formatted_address)
  }


  handleProfile(){
    this.loading = true
    var urlNome = this.profile.controls['nome'].value
    this.auth.authState.subscribe(userId=>{
      let user : User = {
        nome: this.profile.controls['nome'].value,
       //nomeUrl: `${urlNome.toLowerCase().replace(/\s/g, '')}-${userId?.uid}`,
        whatsapp: this.profile.controls['whatsapp'].value,
        rua: this.profile.controls['rua'].value,
        endereco : this.profile.controls['endereco'].value
      }

      this.authService.updateProfile(userId!.uid, user).then(()=>{
        this.notify.notifications('Seu perfil foi atualizado com sucesso')
        this.router.navigateByUrl('/dashboard', {replaceUrl: true})
        this.loading = false
        
      }).catch(err=>{
           this.notify.notifications(err)
           this.loading = false
      })

    })
    
  }
  goToBack(){
    this.router.navigateByUrl('/dashboard', {replaceUrl: true})
  }


}
