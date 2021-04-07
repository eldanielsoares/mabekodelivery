import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

  expediente: string[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  expedienteEsc = this.fb.group({
    'exp': [''],
  })
  userInfo?: User;
  horaInicio? = ''
  horaFim? = ''
  loading = false
  subscription = new Subscription
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private router: Router,
    private notify: NotifyService,
    ) {
    const nav = this.router.getCurrentNavigation()
    this.userInfo = nav?.extras.state?.user
  }

  ngOnInit(): void {
     this.expedienteEsc.controls['exp'].setValue(this.userInfo?.expediente)
     let h = this.userInfo?.horario?.split('-')
     this.horaInicio = h![0]
     this.horaFim = h![1]
     
  }

  save() {
    this.loading = true
    const authId = this.auth.authState.subscribe(userId => {
      let user: User = {
        expediente: this.expedienteEsc.controls['exp'].value,
        horario: `${this.horaInicio}-${this.horaFim}`
      }

      this.authService.updateProfile(userId!.uid, user).then(() => {
        this.loading = false
        this.notify.notifications('Expediente atualizado com sucesso')
        this.router.navigateByUrl('/dashboard', {replaceUrl: true})
      }).catch(err =>{
        this.notify.notifications(err)
      })
    })

    this.subscription.add(authId)
  }

  goToBack(){
    this.router.navigateByUrl('/dashboard', {replaceUrl: true})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.subscription = new Subscription
  }


}
