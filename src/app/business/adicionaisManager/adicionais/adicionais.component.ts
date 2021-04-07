import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-adicionais',
  templateUrl: './adicionais.component.html',
  styleUrls: ['./adicionais.component.css']
})
export class AdicionaisComponent implements OnInit {

  user?: User
  constructor(private router: Router) {
    let nav = this.router.getCurrentNavigation()
    this.user = nav?.extras?.state?.user

    console.log(this.user);

  }

  ngOnInit(): void {
  }

  goToBack() {
    this.router.navigateByUrl('/dashboard', { replaceUrl: true })
  }

  goToAdd() {
    this.router.navigateByUrl('/dashboard/extra-item', { state: { user: this.user } })
  }


}
