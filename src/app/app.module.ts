import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {UtilModule} from './util/util.module';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AddReunionComponent } from './add-reunion/add-reunion.component';
import { ReadreunionComponent } from './readreunion/readreunion.component';
import { ObtenerFotoComponent } from './obtener-foto/obtener-foto.component';

@NgModule({
  declarations: [
    AppComponent,
    AddReunionComponent,
    ReadreunionComponent,
    ObtenerFotoComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    UtilModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
