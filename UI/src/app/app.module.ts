import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CurrencyPipe, DatePipe } from '@angular/common';

@NgModule({
  declarations: [ // Components, directives, and pipes go here
    AppComponent,
    AddTransactionComponent,
    NavMenuComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [ // Other modules whose exported classes are needed by component templates
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, CurrencyPipe], // Services go here
  bootstrap: [AppComponent] // The main application view, called the root component, that hosts all other app views
})
export class AppModule { }
