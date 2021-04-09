import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotifyService } from 'src/app/notifications/notify.service';
import { PremiumService } from 'src/app/shop-premium/premium.service';

@Component({
  selector: 'app-pedidos-manager',
  templateUrl: './pedidos-manager.component.html',
  styleUrls: ['./pedidos-manager.component.css']
})
export class PedidosManagerComponent implements OnInit {
  tabLoadTimes: Date[] = [];
  constructor(private ps: PremiumService, private notify: NotifyService, private auth: AngularFireAuth) { 
    
  }

  ngOnInit(): void {
    let valor = 0
    let size= 0 
    this.auth.authState.subscribe((user: any)=>{
      if (user?.uid != null) {
        this.ps.getPedidosPendente(user?.uid).subscribe((data: any)=>{
          
          if (valor != 0 && size < data.length) {
            //this.playAudio()
            //
            this.notify.notifications('Você recebeu um novo pedido')
            this.playAudio()
          }

          valor = 1
          size = data.length
        })
      }

      
    })

  }


  playAudio() { 
    let audio = new Audio();
    audio.src = "../../../assets/toque.mp3";
    audio.load();
    audio.play();
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

}
