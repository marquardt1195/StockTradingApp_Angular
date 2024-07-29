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
  public showForm = false;
  public tradeFormMode: 'addNewTrade' | 'deleteTrade' | null = null;
  public transactionFormMode: 'addLeg' | 'reduceLeg' | null = null;
  public showTransactionsModal = false;
  public selectedTransaction!: Transaction;
  public transactions$!: Observable<Transaction[]>;
  public transactionsByTradeId$!: Observable<Transaction[]>;

  //a transaction observable.. denoted by the dollar sign.
  //can make use of transactions observable in html file

  constructor(private transactionService: TransactionService) {
    this.tradeFormMode = null;
    this.transactionFormMode = null;
  }

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
  }

  //public openAddNewTradeForm(): void {
  //  this.formMode = 'addNewTrade';
  //  this.showForm = true;
  //}

  public openTransactionsByTradeId(trade_id: number): void {
    this.showTransactionsModal = true;
    this.transactionsByTradeId$ = this.transactionService.getTransactionsByTradeId(trade_id);
   // this.transactionsByTradeId$.subscribe();  // Ensure the request is made
    this.transactionsByTradeId$.subscribe(data => {
      console.log('Transactions by Trade Id:', data);
    });
  }

  public onRefreshTransactions(): void {
    this.loadTransactions();
  }
}
