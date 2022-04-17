import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'; // needed to make HTTP requests

import { AppComponent } from './app.component';
import { ScatterComponent } from './scatter/scatter.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ScatterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // add to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
