import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AddTradeComponent } from './add-trade/add-trade.component';
import { ShowTransactionsComponent } from './show-transactions/show-transactions.component';
import { OpenPositionsComponent } from './nav-menu/open-positions/open-positions.component';
import { TradesComponent } from './nav-menu/trades/trades.component';
import { AnalyticsComponent } from './nav-menu/analytics/analytics.component';
import { AccountComponent } from './nav-menu/account/account.component';

@NgModule({
  declarations: [ // Components, directives, and pipes go here
    AppComponent,
    AddTransactionComponent,
    NavMenuComponent,
    OpenPositionsComponent,
    TradesComponent,
    AddTradeComponent,
    ShowTransactionsComponent,
    OpenPositionsComponent,
    AnalyticsComponent,
    AccountComponent
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
