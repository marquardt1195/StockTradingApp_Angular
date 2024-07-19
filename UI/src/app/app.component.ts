import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../Models/Transaction';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  http = inject(HttpClient);
  showForm = false;
  formMode?: 'addNew' | 'addLeg';
  selectedTransaction?: Transaction;

  //a transaction observable.. denoted by the dollar sign.
  //can make use of transactions observable in html file
  transactions$ = this.getAllTransactions();
  //selectedTransaction$ = this.getTransactionById();

  constructor() {
  //  this.selectedTransaction$ = this.getTransactionById();
  }

  openAddLegForm(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.formMode = 'addLeg';
    this.showForm = true;
  }

  ngOnInit() {
    this.transactions$ = this.getAllTransactions();
    this.transactions$.subscribe(data => {
      console.log('Transactions:', data); // Log the data to inspect in browser console
    });
    //this.selectedTransaction$.subscribe(data => {
    //  console.log('Transaction:', data);
    //});
  }


  //return type: transaction array
  private getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('https://localhost:7006/api/Transact/GetAllTransactions');
  }

  private getTransactionById(): Observable<Transaction> {
    return this.http.get<Transaction>('https://localhost:7006/api/Transact/GetTransactionById');
  }
}
