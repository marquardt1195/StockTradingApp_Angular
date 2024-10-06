import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AddTradeComponent } from './components/add-trade/add-trade.component';
import { ShowTransactionsComponent } from './components/show-transactions/show-transactions.component';
import { OpenPositionsComponent } from './components/nav-menu/open-positions/open-positions.component';
import { TradesComponent } from './components/nav-menu/trades/trades.component';
import { AnalyticsComponent } from './components/nav-menu/analytics/analytics.component';
import { AccountComponent } from './components/nav-menu/account/account.component';

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
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe, CurrencyPipe], // Services go here
  bootstrap: [AppComponent] // The main application view, called the root component, that hosts all other app views
})
export class AppModule { }
