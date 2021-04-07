import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias = this.fb.group({
    category: ['']
  })

  user?: User;
  loading: boolean = false;

  cat = ['Promoções','Burguer', 'Pizzas', 'Lanches', 'Batata frita', 'Hot Dog', 'Macarronada','Carnes', 'Combos', 'Frangos e aves', 'Bolos', 'Porções', 'Marmitex', 'Massas', 'Salgados', 'Doces', 'Veganos', 'Bebidas', 'Nordestina', 'Japonês', 'Churrasco', 'Outros']
  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private notify: NotifyService) {
    const nav = this.router.getCurrentNavigation()
    this.user = nav?.extras.state?.user
  }

  ngOnInit(): void {
    this.categorias.controls['category'].setValue(this.user?.categorias)
  }

  saveCat() {
    this.loading = true
    let user: User = {
      categorias: this.categorias.controls['category'].value
    }
    this.authService.updateProfile(this.user?.uid!, user).then(() => {
      this.notify.notifications('Salvo com sucesso')
      this.loading = false;
      this.router.navigateByUrl('/dashboard', { replaceUrl: true })
    }).catch(err => {
      this.notify.notifications(err)
      this.loading = false
    })

  }

  goToBack() {
    this.router.navigateByUrl('/dashboard', { replaceUrl: true })
  }

}
