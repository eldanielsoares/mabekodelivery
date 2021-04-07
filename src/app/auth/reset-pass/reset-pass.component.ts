import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/notifications/notify.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
 
  reset = this.fb.group({
    'email': ['', [Validators.required]]
  })
  loading= false

  constructor(private authService: AuthService,
    private notify: NotifyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  HandleReset(){
    this.loading = true;
    let email = this.reset.controls['email'].value
    this.authService.resetPass(email).then(()=>{
      this.notify.notifications('E-mail enviado com sucesso')
      this.loading = false;
      this.router.navigateByUrl('/login', {replaceUrl: true})
    }).catch(err=>{
      this.notify.notifications(err)
      this.loading = false;
    })
  }

}
