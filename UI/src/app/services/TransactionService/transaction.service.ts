import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../../../Models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'https://localhost:7006/api/Transact';

  constructor(private http: HttpClient) { }

  public submitNewTrade(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddTransaction`, transaction);
  }

  public submitAddTradeLeg(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddTradeLeg`, transaction);
  }

  public submitReduceTradeLeg(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ReduceTradeLeg`, transaction);
  }

  //return type: transaction array
  public getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/GetAllTransactions`);
  }

  public getTransactionsByTradeId(trade_id: number): Observable<Transaction[]> {
    const params = new HttpParams().set('tradeId', trade_id.toString());
    return this.http.get<Transaction[]>(`${this.apiUrl}/GetTransactionsByTradeId`, { params });
  }
}
