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
  title = "UI";
  http = inject(HttpClient);

  //a transaction observable.. denoted by the dollar sign.
  //can make use of transactions observable in html file
  transactions$ = this.getAllTransactions();
  singleTransaction$ = this.getTransactionById();

  ngOnInit() {
    this.transactions$ = this.getAllTransactions();
    this.transactions$.subscribe(data => {
      console.log('Transactions:', data); // Log the data to inspect in browser console
    });
    this.singleTransaction$.subscribe(data => {
      console.log('Transaction:', data);
    });
  }


  //return type: transaction array
  private getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('https://localhost:7006/api/Transact/GetAllTransactions');
  }

  private getTransactionById(): Observable<Transaction> {
    return this.http.get<Transaction>('https://localhost:7006/api/Transact/GetTransactionById');
  }
}
