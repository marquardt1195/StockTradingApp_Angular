import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../Models/Transaction';
import { AsyncPipe } from '@angular/common';
import { TransactionService } from '../app/services/transaction.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  http = inject(HttpClient);
  showForm = false;
  formMode?: 'addNew' | 'addLeg';
  selectedTransaction!: Transaction;

  //a transaction observable.. denoted by the dollar sign.
  //can make use of transactions observable in html file
  transactions$ = this.transactionService.getAllTransactions();

  constructor(private transactionService: TransactionService) {
  }

  public openAddLegForm(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.formMode = 'addLeg';
    this.showForm = true;
  }

  public ngOnInit() {
    this.transactions$ = this.transactionService.getAllTransactions();
    this.transactions$.subscribe(data => {
      console.log('Transactions:', data); // Log the data to inspect in browser console
    });
  }
}
