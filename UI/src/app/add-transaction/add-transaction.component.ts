import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../Models/Transaction';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  newTradeForm: FormGroup;
  @Input() showForm?: boolean;
  @Output() closeForm = new EventEmitter<void>();
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.newTradeForm = this.formBuilder.group({
      transaction_id: '',
      stock_symbol: '',
      entry_price: '',
      entry_date: '',
      shares_bought: '',
      dollar_stop_loss: ''
    });
  }

  onSubmitNewTrade(): void {
    if (this.newTradeForm.valid) {
      const formValues = this.newTradeForm.value;

      const transaction: Transaction = {
        stock_symbol: formValues.stock_symbol,
        entry_price: parseFloat(formValues.entry_price),
        entry_date: new Date(formValues.entry_date),
        shares_bought: parseInt(formValues.shares_bought, 10),
        dollar_stop_loss: parseFloat(formValues.dollar_stop_loss)
      };

      this.submitNewTrade(transaction).subscribe({
        next: (response: any) => {
          console.log('Transaction added successfully.', response);
          this.newTradeForm.reset(); // Clear the form
          this.closeForm.emit(); // Emit the close event
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

  closeModal(): void {
    this.closeForm.emit();
  }
}
