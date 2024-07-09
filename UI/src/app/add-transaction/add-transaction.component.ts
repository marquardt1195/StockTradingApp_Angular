import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Transaction } from '../../Models/Transaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  newTradeForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.newTradeForm = this.formBuilder.group({
      transaction_id: ['', Validators.required],
      stock_symbol: ['', Validators.required],
      entry_price: ['', Validators.required],
      entry_date: ['', Validators.required],
      shares_bought: ['', Validators.required],
      dollar_stop_loss: ['', Validators.required]
    });
  }

  onSubmitNewTrade(): void {
    if (this.newTradeForm.valid) {
      const formValues = this.newTradeForm.value;

      const transaction: Transaction = {
        transaction_id: formValues.transaction_id,
        stock_symbol: formValues.stock_symbol,
        entry_price: parseFloat(formValues.entry_price),
        entry_date: new Date(formValues.entry_date),
        shares_bought: parseInt(formValues.shares_bought, 10),
        dollar_stop_loss: parseFloat(formValues.dollar_stop_loss)
      };

      this.submitNewTrade(transaction).subscribe({
        next: (response: any) => {
          console.log('Transaction added successfully.', response);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding trade', error);
        }
      });
    }
  }

  private submitNewTrade(transaction: Transaction): Observable<any> {
    const apiUrl = 'https://localhost:7006/api/Transact/AddTransaction';
    return this.http.post<any>(apiUrl, transaction);
  }
}
