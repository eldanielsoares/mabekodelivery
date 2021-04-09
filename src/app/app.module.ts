import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFireStorageModule} from '@angular/fire/storage'
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics'
import { AngularFireMessagingModule } from '@angular/fire/messaging'
import { AgmCoreModule } from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    MaterialModule,
    Ng2ImgMaxModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
    AngularFireMessagingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHMpjcm4fZYQB8yC9uwwowZ-lkDsxqZB8',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
