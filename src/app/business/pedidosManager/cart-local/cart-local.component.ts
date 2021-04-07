import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosOnline } from 'src/app/interfaces/pedidos-online';
import { User } from 'src/app/interfaces/user';
import { NotifyService } from 'src/app/notifications/notify.service';
import { PremiumService } from 'src/app/shop-premium/premium.service';
import { ShopService } from 'src/app/shop/shop.service';
import { BusinessService } from '../../business.service';
import * as Constants from '../../../constants/constants'
import * as uuid from 'uuid'

@Component({
  selector: 'app-cart-local',
  templateUrl: './cart-local.component.html',
  styleUrls: ['./cart-local.component.css']
})
export class CartLocalComponent implements OnInit {

  cart: Pedido[] = []
  url?: User
  total: number = 0
  desconto: number = 0
  disable = false
  logged?= ''
  loading = false
  //adicionais$!: Observable<Adicionais[]>
  obs = this.fb.group({
    'observation': [''],
    'nome': ['', [Validators.required]],
    'pgt': ['', [Validators.required]],
    'troco': ['0'],
    'desconto': [''],
    'mesa': ['']
  })
  entrega?: any = 'true'
  entregaForm: boolean = true
  pgt?: any = ''

  /*sabor = this.fb.group({
    'sabores': ['']
  })*/

  sabor = this.fb.group({
    'sabores': this.fb.array([])
  })

  sabores = this.sabor.get('sabores') as FormArray

  constructor(private shopService: ShopService,
    private bs: BusinessService,
    private router: Router,
    private fb: FormBuilder,
    private notify: NotifyService,
    private premiumService: PremiumService,
    private auth: AngularFireAuth) {
    const nav = this.router.getCurrentNavigation()
    this.url = nav?.extras.state?.url




  }

  ngOnInit(): void {
    //this.adicionais$ = this.shopService.getAdicionais(this.url?.uid!)
    this.cart = this.shopService.getPedido()
    this.total = this.cart.reduce((prev, elem) => prev + elem.preco, 0)

    this.cart.forEach(() => {
      this.sabores.push(this.fb.control(''))
    })

  }


  descount() {
    if (this.obs.controls['desconto'].value.toUpperCase() == this.url?.cupom?.toUpperCase() && this.url?.cupomStatus) {
      this.notify.notifications(`Você ganhou um cupom de ${this.url?.desconto}% de deconto`)
      this.desconto = this.url.desconto as number;
      let descontoP = this.total * (this.desconto / 100)
      if (this.total > 0) {
        this.total = this.total - descontoP
      }
      this.disable = true
    } else {
      this.notify.notifications(`Este cupom não é válido`)
      this.desconto = 0;
      let descontoP = this.total * (this.desconto / 100)
      this.total = this.total - descontoP
    }
  }

  pgtType(evt: any) {
    this.pgt = evt.value
    if (evt.value != 'Dinheiro') {
      this.obs.controls['troco'].setValue('')
    }

  }


  add(p: Pedido, i: number) {

    this.cart[i].preco = (this.cart[i].preco / this.cart[i].quantidade)

    this.cart[i].quantidade += 1

    this.cart[i].preco = this.cart[i].preco * this.cart[i].quantidade

    //console.log(this.cart[i].preco);

    this.total = this.cart.reduce((prev, elem) => prev + elem.preco, 0)
    let descontoP = this.total * (this.desconto / 100)
    this.total = this.total - descontoP

  }

  min(p: Pedido, i: number) {

    if (this.cart[i].quantidade > 1) {
      this.cart[i].preco = (this.cart[i].preco / this.cart[i].quantidade)

      this.cart[i].quantidade -= 1

      this.cart[i].preco = this.cart[i].preco * this.cart[i].quantidade

      //console.log(this.cart[i].preco);

      this.total = this.cart.reduce((prev, elem) => prev + elem.preco, 0)
      let descontoP = this.total * (this.desconto / 100)
      this.total = this.total - descontoP
      console.log(this.total);
    }

  }

  finishPremium() {

    let info = ''
    this.loading = true

    let selectionSabor = []
    selectionSabor = this.sabor.controls['sabores'].value
    let pedido: string[] = []
    for (let p in this.cart) {

      if (selectionSabor[p] != '') {
        selectionSabor[p] = `- Sabor: ${selectionSabor[p]}`
      } else {
        selectionSabor[p] = ''
      }

      pedido.push(`${this.cart[p].quantidade} x ${this.cart[p].pedido} - R$${this.cart[p].preco} ${selectionSabor[p]}`)
      //pedidos += 

    }


    

    let descTxt = ''
    let desc = 0
    if (this.desconto > 0) {
      let txt = this.total * (this.desconto / 100)
      desc = this.total * (this.desconto / 100)
      descTxt = ` R$ ${txt.toFixed(2)}`
    } else {
      descTxt = "Sem desconto"
      desc = 0
    }

    //info = `${this.url?.nome} - *PEDIDO FINALIZADO*\n*Cliente:* ${this.obs.controls['nome'].value}\n*Pedido:*\n${pedidos}*Forma de pagamento:* ${this.obs.controls['pgt'].value}\n*Desconto:* ${descTxt}\n*Troco:* ${trocoTxt}\n${entrega}\n*Observação:* ${this.obs.controls['observation'].value}\n\n*${txtTotal}* R$${this.total.toFixed(2)} ${taxaMsg}`

    console.log(pedido);
    
    this.auth.authState.subscribe(userId=>{
      let docId = userId?.uid + uuid.v4()
      let pedidoOnline : PedidosOnline = {
        docId: docId,
        desconto : desc,
        pedido: pedido,
        preco : this.total,
        idVendedor: userId?.uid,
        mesa: this.obs.controls['mesa'].value,
        formaPagamento: this.obs.controls['pgt'].value,
        nomeVendedor: this.url?.nome,
        observacao : this.obs.controls['observation'].value,
        nomeCliente : this.obs.controls['nome'].value,
        status: 5,
        troco: this.obs.controls['troco'].value,
        timestamp: Date.now(),
      }

      this.premiumService.finishOrder(docId, pedidoOnline).then(() => {
        this.notify.notifications('Pedido feito com sucesso')
        this.loading = false;
        this.router.navigateByUrl('/dashboard/meus-pedidos', {replaceUrl: true})
        this.shopService.prod = []
        this.shopService.pedido = []
      }).catch(error =>{
        this.notify.notifications(error)
      })
      
      
    })

    /*let celular = `55${this.url?.whatsapp}`
    let msg = window.encodeURIComponent(info)
    window.open(`https://api.whatsapp.com/send?phone=${celular}&text=${msg}`)*/


  }


  remove(i: number) {


    /*this.cart[i].preco = (this.cart[i].preco / this.cart[i].quantidade)

    this.cart[i].quantidade -= 1

    this.cart[i].preco = this.cart[i].preco * this.cart[i].quantidade

    //console.log(this.cart[i].preco);

    this.total = this.cart.reduce((prev, elem) => prev + elem.preco, 0)

    this.shopService.removePedido(i)*/

    this.total = (this.total + (this.cart[i].preco * this.desconto / 100)) - (this.cart[i].preco)
    this.shopService.removePedido(i)


  }


  goToBack() {
    this.router.navigateByUrl(`/dashboard/shop-local`, { replaceUrl: true })
  }

}
