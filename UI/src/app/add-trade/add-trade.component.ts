import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TradeService } from '../services/TradeService/trade.service';
import { TransactionService  } from '../services/TransactionService/transaction.service'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Trade } from '../../Models/Trade'
import { Transaction } from '../../Models/Transaction';



@Component({
  selector: 'app-add-trade',
  templateUrl: './add-trade.component.html',
  styleUrl: './add-trade.component.css'
})
export class AddTradeComponent implements OnChanges {
  public newTradeForm: FormGroup;
  public addTradeLeg: FormGroup;
  public reduceTradeLeg: FormGroup;
  isDisabled = true;


  @Input() showForm: boolean = false
  @Input() formMode!: 'addNewTrade' | 'deleteTrade' | 'addLeg' | 'reduceLeg'
  @Input() selectedTransaction!: Transaction
  @Output() closeForm = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private tradeService: TradeService,
    private transactionService: TransactionService
  ) {
    this.newTradeForm = this.formBuilder.group({
      trade_id: '',
      stock_symbol: '',
      cost_basis: '',
      shares_bought: '',
      date_initiated: '',
      dollar_stop_loss: '',
      sell_basis: '',
      shares_sold: '',
      date_closed: ''
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
    if (changes['selectedTransaction'] && this.formMode === 'addLeg' || this.formMode == 'reduceLeg') {
      this.includeSymbolInTradeLegForm();
    }
  }

  public onSubmitNewTrade(): void {
    if (this.newTradeForm.valid) {
      const formValues = this.newTradeForm.value;

      const trade: Trade = {
        stock_symbol: formValues.stock_symbol,
        cost_basis: parseFloat(formValues.cost_basis),
        shares_bought: parseInt(formValues.shares_bought),
        date_initiated: new Date(formValues.date_initiated),
        dollar_stop_loss: parseFloat(formValues.dollar_stop_loss),
        sell_basis: parseFloat(formValues.sell_basis),
        shares_sold: parseInt(formValues.shares_sold),
        date_closed: new Date(formValues.date_closed)
      };

      this.tradeService.submitNewTrade(trade).subscribe({
        next: (response: any) => {
          console.log('Trade added successfully.', response);
          this.newTradeForm.reset(); // Clear the form
          this.closeForm.emit(); // Emit the close event
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding trade', error);
        }
      });
    }
    if (this.newTradeForm.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.newTradeForm.markAllAsTouched();
      return;
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
    if (this.addTradeLeg.invalid) {
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
    if (this.reduceTradeLeg.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.reduceTradeLeg.markAllAsTouched();
      return;
    }
  }

  public onSubmitDeleteTrade(): void {

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

  //disabling input removes from form submission. This piece re-enables for form submission while disabling user input
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
  }
}
