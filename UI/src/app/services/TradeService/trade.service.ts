import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trade } from '../../../Models/Trade';



@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private apiUrl = 'https://localhost:7006/api/Trade';

  constructor(private http: HttpClient) { }

  public getAllTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>(`${this.apiUrl}/GetAllTrades`);
  }

  //TODO: Is any here a bad idea? Should I be more specific?
  public submitNewTrade(trade: Trade): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddTrade`, trade);
  }

}
