import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register = this.fb.group({
    'nome': ['', [Validators.required]],
    'whatsapp': ['', [Validators.required, Validators.maxLength(11)]],
    'email': ['', [Validators.required, Validators.email]],
    'senha': ['', [Validators.minLength(6), Validators.required]],
    'cep': ['', [Validators.required]],
    'rua': ['', [Validators.required]],
    'bairro': ['', [Validators.required]],
    'cidade': ['', [Validators.required]],
    'estado': ['', [Validators.required]],
    'numero': ['', [Validators.required]],
    'plano': ['true', [Validators.required]],
    'endereco': ['']
  })

  estados = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goías',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraíma',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins'
  ];
  loading = false

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private angularAuth: AngularFireAuth,
    private notify: NotifyService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onAutocompleteSelected(result: any) {
    console.log('onAutocompleteSelected: ', result.formatted_address);
    this.register.controls['endereco'].setValue(result.formatted_address)
  }



  public handleAddressChange(address: any) {
    console.log(address.formatted_address);
    //this.register.controls['origem'].setValue(address.formatted_address)

  }

  handleRegister() {
    this.loading = true
    var urlNome = this.register.controls['nome'].value
    let email = this.register.controls['email'].value
    let senha = this.register.controls['senha'].value
    let plano: boolean
    if (this.register.controls['plano'].value == 'false') {
      plano = false
    } else {
      plano = true
    }

    this.authService.register(email, senha).then(() => {
      this.angularAuth.authState.subscribe((userID) => {
        let user: User = {
          nome: this.register.controls['nome'].value,
          nomeUrl: `${urlNome.toLowerCase().replace(/\s/g, '')}-${userID?.uid}`,
          uid: userID?.uid,
          whatsapp: this.register.controls['whatsapp'].value,
          autorizado: true,
          email: this.register.controls['email'].value,
          dataInicio: Date.now(),
          receberPorWhatsapp: plano,
          endereco: this.register.controls['endereco'].value
        }
        if (userID?.uid != null) {
          this.authService.createAccount(userID?.uid, user).then(() => {
            //console.log('funcionou');
            this.loading = false
            this.router.navigateByUrl('/dashboard', { replaceUrl: true })

          })
        }
      })
    }).catch(err => {
      //console.log(err)
      this.loading = false
      this.notify.notifications(err)
    })
  }

}
