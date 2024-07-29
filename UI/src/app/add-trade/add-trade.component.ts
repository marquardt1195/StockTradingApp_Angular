import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TradeService } from '../services/TradeService/trade.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Trade } from '../../Models/Trade'
import { Transaction } from '../../Models/Transaction';



@Component({
  selector: 'app-add-trade',
  templateUrl: './add-trade.component.html',
  styleUrl: './add-trade.component.css'
})
export class AddTradeComponent {
  public newTradeForm: FormGroup;
  isDisabled = true;


  @Input() showForm: boolean = false
  @Input() tradeFormMode: 'addNewTrade' | 'deleteTrade' | null = null;
  @Input() selectedTransaction!: Transaction;
  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshTransactions = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private tradeService: TradeService,
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
          this.refreshTransactions.emit(); // Emit the refresh event
          this.closeForm.emit(); // Emit the close event
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding trade', error);
        }
      });
    }
    else {
      // Mark all controls as touched to trigger validation messages
      this.newTradeForm.markAllAsTouched();
      return;
    }
  }


  public onSubmitDeleteTrade(): void {
    const trade_id: number = this.selectedTransaction.trade_id;
    this.tradeService.deleteTrade(trade_id).subscribe({
      next: (response: any) => {
        console.log('Trade deleted successfully.', response);
        this.refreshTransactions.emit(); // Emit the refresh event
        this.closeForm.emit(); // Emit the close event
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting trade', error);
      }
    });
  }


  public closeModal(): void {
    this.closeForm.emit();
  }
}
