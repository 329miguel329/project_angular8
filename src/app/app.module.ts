import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ServicioUsuario } from './layout/servicios/usuario.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ServicioEstudiante } from './layout/servicios/estudiante.service';
import { ServicioColegio } from './layout/servicios/colegio.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const firebaseConfig = {
    apiKey: 'AIzaSyAQZ7Ofzt7XegZFq5n8R7ZIFqqcn8PW15E',
    authDomain: 'mineducation-c1c66.firebaseapp.com',
    databaseURL: 'https://mineducation-c1c66.firebaseio.com',
    storageBucket: 'mineducation-c1c66.appspot.com',
    messagingSenderId: '371753799938'
};

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireModule,
        NgbModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard, ServicioUsuario, ServicioEstudiante, ServicioColegio],
    bootstrap: [AppComponent]
})
export class AppModule {}
