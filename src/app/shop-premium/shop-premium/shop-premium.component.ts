import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop-premium',
  templateUrl: './shop-premium.component.html',
  styleUrls: ['./shop-premium.component.css']
})
export class ShopPremiumComponent implements OnInit {
  url : string = ''
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  gotoHome(){
    this.url = localStorage.getItem('url')!
    this.router.navigateByUrl(`/d/${this.url}`)
  }

  gotoPedidos(){
    this.router.navigateByUrl('/d/pedidos')
  }

}
