import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotifyService } from './notifications/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mabeko-delivery';

  constructor(private auth: AngularFireAuth, private notify: NotifyService){

  }

  ngOnInit(){
    let msg = 'Se encontrou esta mensagem é porque é curioso, e precisamos de pessoas assim aqui. Se estiver interessado em alguma vaga de emprego, nos procure (98) 985223703\n'
    console.log(msg);

    this.auth.authState.subscribe((user)=>{
      if (user?.uid != null) {
        this.notify.requestToken(user?.uid)
      }
    })
    
    /*if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(function(position){


        var latitude = "latitude=" + position.coords.latitude;
        var longitude = "&longitude=" + position.coords.longitude;
        var query = latitude + longitude + "&localityLanguage=pt-br";
        const Http = new XMLHttpRequest();

        var bigdatacloud_api =
          "https://api.bigdatacloud.net/data/reverse-geocode-client?";

        bigdatacloud_api += query;
        Http.open("GET", bigdatacloud_api)
        Http.send()
        Http.onreadystatechange = function(){
          if(this.readyState == 4 && this.status ==200){
            var myObj = JSON.parse(this.responseText)
            var city = myObj.locality
            localStorage.setItem('city', city)
            console.log(localStorage.getItem('city'));
            
            
          }
        }
      },
      function error(msg) {alert('Please enable your GPS position feature.');},
      {maximumAge:100, timeout:5000, enableHighAccuracy: true});
    }else{
      alert("Geolocation API is not supported in your browser.")
    }*/
  }
}
