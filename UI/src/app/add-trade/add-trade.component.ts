import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  @Input() showForm: boolean = false
  @Input() formMode!: 'addNewTrade' | 'addNewTransaction' | 'addLeg'
  //@Input() selectedTrade!: Trade
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

    this.addTradeLeg = this.formBuilder.group({
      trade_id: '',
      stock_symbol: '',
      entry_price: '',
      entry_date: '',
      shares_bought: '',
      dollar_stop_loss: ''
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
        trade_id: this.selectedTransaction.trade_id,
        stock_symbol: this.selectedTransaction.stock_symbol
      });
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
  }

  public onSubmitAddTradeLeg(): void {
    if (this.addTradeLeg.valid) {
      const addTradeLegValues = this.addTradeLeg.value;

      const transaction: Transaction = {
        trade_id: addTradeLegValues.trade_id,
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
