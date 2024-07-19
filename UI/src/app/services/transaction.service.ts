import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../../Models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'https://localhost:7006/api/Transact';

  constructor(private http: HttpClient) { }

  public submitNewTrade(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddTransaction`, transaction);
  }

  public submitTradeLeg(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddTradeLeg`, transaction);
  }

  //return type: transaction array
  public getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('https://localhost:7006/api/Transact/GetAllTransactions');
  }

  public getTransactionById(): Observable<Transaction> {
    return this.http.get<Transaction>('https://localhost:7006/api/Transact/GetTransactionById');
  }
}
