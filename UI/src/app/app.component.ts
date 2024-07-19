import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../Models/Transaction';
import { Trade } from '../Models/Trade';
import { AsyncPipe } from '@angular/common';
import { TransactionService } from '../app/services/TransactionService/transaction.service';
import { TradeService } from '../app/services/TradeService/trade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public showForm = false;
  public formMode!: 'addNewTrade' | 'addNewTransaction' | 'addLeg';
  public selectedTransaction!: Transaction;
  public transactions$!: Observable<Transaction[]>;
  public trades$!: Observable<Trade[]>;
  //a transaction observable.. denoted by the dollar sign.
  //can make use of transactions observable in html file

  constructor(
    private transactionService: TransactionService,
    private tradeService: TradeService
  ) {
  }

  public openAddLegForm(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.formMode = 'addLeg';
    this.showForm = true;
  }

  public ngOnInit() {
    this.trades$ = this.tradeService.getAllTrades();
    this.trades$.subscribe(data => {
      console.log('Trades:', data);
    });
    this.transactions$ = this.transactionService.getAllTransactions();
    this.transactions$.subscribe(data => {
      console.log('Transactions:', data);
    });
  }
}
