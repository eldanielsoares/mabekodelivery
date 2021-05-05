import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { PedidosOnline } from 'src/app/interfaces/pedidos-online';

import * as jspdf from 'jspdf'
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  pedidos?: PedidosOnline
  constructor(private router: Router) {
    let nav = this.router.getCurrentNavigation()
    this.pedidos = nav?.extras?.state?.print
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.print()
  }


  print() {
    const content = document.getElementById('print')
    if (content) {
      html2canvas(content).then((canvas) => {
        var imgWidth = 60
        var imgHeight = canvas.height * imgWidth / canvas.width
        const contentDataUrl = canvas.toDataURL('img/png')
        var pdf = new jspdf.jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [imgWidth, imgHeight]
        })

        pdf.addImage(contentDataUrl, 'PNG', 0, 0, imgWidth, imgHeight)
        
        this.router.navigateByUrl('/dashboard/meus-pedidos', { replaceUrl: true })
        if (navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
        ) {
          pdf.save(`${Math.floor(Math.random() * 65536)}`)
          
        }
        else {
          pdf.output('dataurlnewwindow')
         
        }
      })
    }
  }

}
