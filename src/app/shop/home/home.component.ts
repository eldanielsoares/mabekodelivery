import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessModule } from 'src/app/business/business.module';
import { BusinessService } from 'src/app/business/business.service';
import { Pedido } from 'src/app/interfaces/pedido';
import { Produto } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$?: Observable<User[]>
  prod$?: Observable<Produto[]>
  cart: Pedido[] = []
  size: number = 0
  idAdicionado?: string[] = []
  diaSemana = new Date().getDay()+1
  dates = this.diaSemana.toString()
  mSelected : string = ''
  url?: string
  constructor(private route: ActivatedRoute,
    private shopService: ShopService,
    private router: Router,
    private notify: NotifyService) { }

  ngOnInit(): void {
    let p = this.route.snapshot.paramMap.get('url')
    this.url = p!
    //console.log(p);
    this.user$ = this.shopService.getUserShop(p!)
    this.prod$ = this.shopService.getUserProds(p!, '')
    this.cart = this.shopService.getPedido()
    this.idAdicionado = this.shopService.prod
    this.size = this.cart.length
    //console.log(this.dates);
    
  }
  categoria(evt: any){
    this.prod$ = this.shopService.getUserProds(this.url!, evt.value)
  }

  goToCart(p: any) {
    let data = p
    this.router.navigateByUrl('/cart', {state: {url: data}})
  }


  addRemove(p: Produto, index: number) {
    let i = this.cart.findIndex(pedido => p.nome == pedido.pedido)
    if (i < 0) {
      this.addProduct(p)
    } else if (i >= 0) {
      this.remove(p)
    }
  }

  addProduct(p: Produto) {
    let pedido: Pedido = {
      pedido!: p.nome!,
      preco: p.preco!,
      quantidade: 1,
      id: p.docId!,
      sabor: p.sabor,
      multiSabor: p.multipleSabor,
      categoria: p.categoria
    }

    this.size = this.cart.length + 1
    this.shopService.addPedido(pedido)
    this.shopService.prod?.push(p.docId!)
    this.idAdicionado = this.shopService.prod
    this.notify.notifications('Item adicionado')

  }

  remove(p: Produto) {
    let i = this.cart.findIndex(pedido => p.docId == pedido.id)
    if (i >= 0) {
      this.cart.splice(i, 1)
      this.size = this.cart.length

      let addCart = this.shopService.prod?.findIndex(item => p.docId === item)
      if (addCart! >= 0) {
        this.shopService.prod?.splice(addCart!, 1)
        this.idAdicionado = this.shopService.prod
        this.notify.notifications('Item removido')

      }
    }
  }

}
