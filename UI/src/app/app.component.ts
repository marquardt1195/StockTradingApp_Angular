import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../Models/Transaction';
import { AsyncPipe } from '@angular/common';
import { TransactionService } from '../app/services/TransactionService/transaction.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private transactionService: TransactionService) {
    this.tradeFormMode = null;
    this.transactionFormMode = null;
  }

  public showForm = false;
  public tradeFormMode: 'addNewTrade' | 'deleteTrade' | null = null;
  public transactionFormMode: 'addLeg' | 'reduceLeg' | null = null;
  public showTransactionsModal = false;
  public showEditTransactionModal = false;
  public selectedTransaction!: Transaction;
  public transactions$!: Observable<Transaction[]>;
  public transactionsByTradeId$!: Observable<Transaction[]>;

  //a transaction observable.. denoted by the dollar sign.
  //can make use of transactions observable in html file

  public ngOnInit() {
    this.loadTransactions();
  }

  public loadTransactions() {
    this.transactions$ = this.transactionService.getAllTransactions();
  }

  public openAddLegForm(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.transactionFormMode = 'addLeg';
    this.showForm = true;
  }

  public openReduceLegForm(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.transactionFormMode = 'reduceLeg';
    this.showForm = true;
  }

  public openDeleteTrade(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.transactionFormMode = null; //needed to prevent add and reduce legs from showing when deleting..
    this.tradeFormMode = 'deleteTrade';
    this.showForm = true;
    this.transactionsByTradeId$ = this.transactionService.getTransactionsByTradeId(transaction.trade_id);
    this.transactionsByTradeId$.subscribe(data => {
      console.log('Transactions by Trade Id:', data);
    });
  }

  public openTransactionsByTradeId(trade_id: number): void {
    this.showTransactionsModal = true;
    this.showEditTransactionModal = false;
    this.transactionsByTradeId$ = this.transactionService.getTransactionsByTradeId(trade_id);
    // this.transactionsByTradeId$.subscribe();  // Ensure the request is made
    //In Angular and RxJS, the concept of subscribing to an observable is central to how you interact with asynchronous data streams. When you subscribe to an observable, you're telling it: "I want to be notified whenever new data is emitted."
    this.transactionsByTradeId$.subscribe(data => {
      console.log('Transactions by Trade Id:', data);
    });
  }

  public openEditTransactionModal(transaction: Transaction): void {
    console.log('Show edit transaction modal opened for transaction:', transaction);
    this.selectedTransaction = transaction;
    this.showEditTransactionModal = true;
    this.showTransactionsModal = false;
  }

  public onRefreshTransactions(): void {
    this.loadTransactions();
  }
}
