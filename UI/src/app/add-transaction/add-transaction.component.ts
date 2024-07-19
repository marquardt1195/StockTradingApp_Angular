import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from '../../Models/Transaction';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TransactionService } from '../services/TransactionService/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnChanges {
  public newTransactionForm: FormGroup;
  public addTradeLeg: FormGroup;

  @Input() showForm: boolean = false
  @Input() formMode!: 'addNewTrade' | 'addNewTransaction' | 'addLeg'
  @Input() selectedTransaction!: Transaction
  @Output() closeForm = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.newTransactionForm = this.formBuilder.group({
      transaction_id: '',
      trade_id: '',
      stock_symbol: '',
      entry_price: '',
      entry_date: '',
      shares_bought: '',
      dollar_stop_loss: ''
    });

    this.addTradeLeg = this.formBuilder.group({
      stock_symbol: '',
      entry_price: '',
      entry_date: '',
      shares_bought: ''
    })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTransaction'] && this.formMode === 'addLeg') {
      this.includeSymbolInAddTradeLegForm();
    }
  }

  private includeSymbolInAddTradeLegForm(): void {
    if (this.selectedTransaction) {
      this.addTradeLeg.patchValue({
        stock_symbol: this.selectedTransaction.stock_symbol,
      });
    }
  }

  public onSubmitNewTrade(): void {
    if (this.newTransactionForm.valid) {
      const formValues = this.newTransactionForm.value;

      const transaction: Transaction = {
        stock_symbol: formValues.stock_symbol,
        entry_price: parseFloat(formValues.entry_price),
        entry_date: new Date(formValues.entry_date),
        shares_bought: parseInt(formValues.shares_bought, 10),
        dollar_stop_loss: parseFloat(formValues.dollar_stop_loss)
      };

      this.transactionService.submitNewTrade(transaction).subscribe({
        next: (response: any) => {
          console.log('Transaction added successfully.', response);
          this.newTransactionForm.reset(); // Clear the form
          this.closeForm.emit(); // Emit the close event
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding trade', error);
        }
      });
    }
  }

  public onSubmitAddTradeLeg(): void {
    if (this.addTradeLeg.valid) {
      const addTradeLegValues = this.addTradeLeg.value;

      const transaction: Transaction = {
        stock_symbol: addTradeLegValues.stock_symbol,
        entry_price: parseFloat(addTradeLegValues.entry_price),
        entry_date: new Date(addTradeLegValues.entry_date),
        shares_bought: parseInt(addTradeLegValues.shares_bought, 10),
        dollar_stop_loss: parseFloat(addTradeLegValues.dollar_stop_loss)
      }

      this.transactionService.submitTradeLeg(transaction).subscribe({
        next: (response: any) => {
          console.log('Trade leg added successfully.', response);
          this.addTradeLeg.reset(); // Clear the form
          this.closeForm.emit(); // Emit the close event
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding trade leg', error);
        }
      });
    }
  }

  public closeModal(): void {
    this.closeForm.emit();
  }
}
