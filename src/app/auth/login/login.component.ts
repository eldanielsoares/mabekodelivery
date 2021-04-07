import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/notifications/notify.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'senha': ['', [Validators.minLength(6), Validators.required]]
  })

  loading = false

  constructor(private fb: FormBuilder, private authService: AuthService,
    private notify: NotifyService,
    private router: Router) { }

  ngOnInit(): void {
  }

  handleLogin(){
    this.loading = true
    let email = this.login.controls['email'].value
    let senha = this.login.controls['senha'].value

    this.authService.login(email, senha).then(()=>{
      this.router.navigateByUrl('/dashboard', {replaceUrl: true})
      this.loading = false
    }).catch(err=>{
      this.loading = false
      this.notify.notifications(err)
      
    })

  }

}
