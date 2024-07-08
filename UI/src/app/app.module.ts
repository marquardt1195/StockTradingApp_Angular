import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

@NgModule({
  declarations: [ // Components, directives, and pipes go here
    AppComponent, AddTransactionComponent
  ],
  imports: [ // Other modules whose exported classes are needed by component templates
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [], // Services go here
  bootstrap: [AppComponent] // The main application view, called the root component, that hosts all other app views
})
export class AppModule { }
