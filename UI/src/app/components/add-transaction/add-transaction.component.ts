import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/TransactionService/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnChanges {
  public newTransactionForm: FormGroup;
  public addTradeLeg: FormGroup;
  public reduceTradeLeg: FormGroup;
  isDisabled = true;

  @Input() showForm: boolean = false
  @Input() transactionFormMode: 'addLeg' | 'reduceLeg' | 'editLeg' | null = null;
  @Input() selectedTransaction!: Transaction;
  @Output() closeForm = new EventEmitter<void>();

  constructor(
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

    //inside the .group method, we define the form controls.
    //Here, strings initialized as empty string. numbers initialized as null with proper validation
    this.addTradeLeg = this.formBuilder.group({
      trade_id: [0, Validators.required],
      stock_symbol: [{ value: '', disabled: this.isDisabled }, Validators.required],
      entry_price: ['', Validators.required],
      entry_date: ['', Validators.required],
      shares_bought: ['', Validators.required],
      dollar_stop_loss: ['', Validators.required],
      exit_price: '',
      shares_sold: '',
      exit_date: ''
    });

    this.reduceTradeLeg = this.formBuilder.group({
      trade_id: [0, Validators.required],
      stock_symbol: [{ value: '', disabled: this.isDisabled }, Validators.required],
      entry_price: '',
      entry_date: '',
      shares_bought: '',
      dollar_stop_loss: '',
      exit_price: ['', Validators.required],
      shares_sold: ['', Validators.required],
      exit_date: ['', Validators.required]
    });
  }


  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTransaction'] &&
      this.transactionFormMode === 'addLeg' ||
      this.transactionFormMode == 'reduceLeg') {
      this.includeSymbolInTradeLegForm();
    }
  }


  public onSubmitAddTradeLeg(): void {
    this.enableControlsForSubmission();

    if (this.addTradeLeg.valid) {
      const addTradeLegValues = this.addTradeLeg.value;

      const transaction: Transaction = {
        trade_id: addTradeLegValues.trade_id,
        stock_symbol: addTradeLegValues.stock_symbol,
        entry_price: parseFloat(addTradeLegValues.entry_price),
        entry_date: new Date(addTradeLegValues.entry_date),
        shares_bought: parseInt(addTradeLegValues.shares_bought, 10),
        dollar_stop_loss: parseFloat(addTradeLegValues.dollar_stop_loss),
        exit_price: parseFloat(addTradeLegValues.exit_price),
        shares_sold: parseInt(addTradeLegValues.shares_sold, 10),
        exit_date: new Date(addTradeLegValues.exit_date)
      }

      this.transactionService.submitAddTradeLeg(transaction).subscribe({
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
    else {
      // Mark all controls as touched to trigger validation messages
      this.addTradeLeg.markAllAsTouched();
      return;
    }
  }


  public onSubmitReduceTradeLeg(): void {
    this.enableControlsForSubmission();

    if (this.reduceTradeLeg.valid) {
      const reduceTradeLegValues = this.reduceTradeLeg.value;

      const transaction: Transaction = {
        trade_id: reduceTradeLegValues.trade_id,
        stock_symbol: reduceTradeLegValues.stock_symbol,
        entry_price: parseFloat(reduceTradeLegValues.entry_price),
        entry_date: new Date(reduceTradeLegValues.entry_date),
        shares_bought: parseInt(reduceTradeLegValues.shares_bought, 10),
        dollar_stop_loss: parseFloat(reduceTradeLegValues.dollar_stop_loss),
        exit_price: parseFloat(reduceTradeLegValues.exit_price),
        shares_sold: parseInt(reduceTradeLegValues.shares_sold, 10),
        exit_date: new Date(reduceTradeLegValues.exit_date)
      }

      this.transactionService.submitReduceTradeLeg(transaction).subscribe({
        next: (response: any) => {
          console.log('Trade leg reduced successfully.', response);
          this.reduceTradeLeg.reset();
          this.closeForm.emit();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error reducing trade leg', error);
        }
      });
    }
    else {
      // Mark all controls as touched to trigger validation messages
      this.reduceTradeLeg.markAllAsTouched();
      return;
    }
  }

  private includeSymbolInTradeLegForm(): void {
    if (this.selectedTransaction) {
      this.addTradeLeg.patchValue({
        trade_id: this.selectedTransaction.trade_id,
        stock_symbol: this.selectedTransaction.stock_symbol
      });
    }
    if (this.selectedTransaction) {
      this.reduceTradeLeg.patchValue({
        trade_id: this.selectedTransaction.trade_id,
        stock_symbol: this.selectedTransaction.stock_symbol
      });
    }
  }

  private enableControlsForSubmission() {
    if (this.isDisabled) {
      this.addTradeLeg.get('stock_symbol')?.enable();
    }
    if (this.isDisabled) {
      this.reduceTradeLeg.get('stock_symbol')?.enable();
    }
  }

  public closeModal(): void {
    this.closeForm.emit();
    this.transactionFormMode = null; 
  }
}
