import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { Observable } from 'rxjs';
import { TransactionService } from '../../services/TransactionService/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {AlertService } from '../../services/AlertService'


@Component({
  selector: 'app-show-transactions',
  templateUrl: './show-transactions.component.html',
  styleUrl: './show-transactions.component.css'
})
export class ShowTransactionsComponent implements OnChanges {
  //Properties decorated with @Input() are meant to receive data from a parent component. Changes to the value in the parent component will automatically propagate to the child component.
  @Input() transactionsByTradeId$!: Observable<Transaction[]>;
  @Input() showTransactionsModal: boolean = false
  @Input() showEditTransactionModal: boolean = false
  @Input() showRemoveTransactionModal: boolean = false
  @Input() transactionFormMode: 'addLeg' | 'reduceLeg' | 'editLeg' | null = null;

  @Output() editTransaction = new EventEmitter<Transaction>(); // This will emit an event when the new button is clicked
  @Output() closeForm = new EventEmitter<void>();

  public selectedTransaction!: Transaction;
  public editTradeLeg: FormGroup;
  isDisabled = true;

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private alertService: AlertService,
  ) {
    this.editTradeLeg = this.formBuilder.group({
      trade_id: 0,
      transaction_id: 0,
      stock_symbol: { value: '', disabled: this.isDisabled },
      entry_price: '',
      entry_date: '',
      shares_bought: '',
      dollar_stop_loss: '',
      exit_price: '',
      shares_sold: '',
      exit_date: ''
    })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.includeTransactionDetailsInEditForm();
  }

  openEditTradeLeg(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.showTransactionsModal = false;
    this.showEditTransactionModal = true;
    this.transactionFormMode = 'editLeg';
    this.editTransaction.emit(transaction);

    console.log('showTransactionsModal:', this.showTransactionsModal);
    console.log('showEditTransactionModal:', this.showEditTransactionModal);
  }

  openRemoveTradeLeg(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.showTransactionsModal = false;
    this.showRemoveTransactionModal = true;
  }

  public onSubmitRemoveTradeLeg(transaction: Transaction): void {
    this.transactionService.removeTradeLeg(transaction).subscribe({
      next: (response: any) => {
        console.log('Trade leg removed successfully.', response);
        this.alertService.showToastSuccess('removeLeg');
        this.editTradeLeg.reset(); // Clear the form
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showToastError('removeLeg');
        console.error('Error removing trade leg', error);
      }
    });
  }


  public onSubmitEditTradeLeg(): void {
    this.enableControlsForSubmission();
      const editTradeLegValues = this.editTradeLeg.value;
      const transaction: Transaction = {
        trade_id: editTradeLegValues.trade_id,
        transaction_id: editTradeLegValues.transaction_id,
        stock_symbol: editTradeLegValues.stock_symbol,
        entry_price: parseFloat(editTradeLegValues.entry_price),
        entry_date: editTradeLegValues.entry_date ? new Date(editTradeLegValues.entry_date) : null,
        shares_bought: parseInt(editTradeLegValues.shares_bought, 10),
        dollar_stop_loss: parseFloat(editTradeLegValues.dollar_stop_loss),
        exit_price: parseFloat(editTradeLegValues.exit_price),
        shares_sold: parseInt(editTradeLegValues.shares_sold, 10),
        exit_date: editTradeLegValues.exit_date ? new Date(editTradeLegValues.exit_date) : null
      }

    this.transactionService.submitEditTradeLeg(transaction).subscribe({
        next: (response: any) => {
        console.log('Trade leg edited successfully.', response);
        this.alertService.showToastSuccess('editLeg');
          this.editTradeLeg.reset(); // Clear the form
          this.closeModal();
        },
      error: (error: HttpErrorResponse) => {
        this.alertService.showToastError('editLeg');
          console.error('Error editing trade leg', error);
        }
      });
  }

  private includeTransactionDetailsInEditForm(): void {
    if (this.selectedTransaction) {
      this.editTradeLeg.patchValue({
        trade_id: this.selectedTransaction.trade_id,
        transaction_id: this.selectedTransaction.transaction_id,
        stock_symbol: this.selectedTransaction.stock_symbol,
        entry_price: this.selectedTransaction.entry_price,
        shares_bought: this.selectedTransaction.shares_bought,
        entry_date: this.selectedTransaction.entry_date,
        dollar_stop_loss: this.selectedTransaction.dollar_stop_loss,
        exit_price: this.selectedTransaction.exit_price,
        shares_sold: this.selectedTransaction.shares_sold,       
        exit_date: this.selectedTransaction.exit_date
      });
      console.log('Entry Date:', this.selectedTransaction.entry_date);
    }
  }

  private enableControlsForSubmission() {
    if (this.isDisabled) {
      this.editTradeLeg.get('stock_symbol')?.enable();
    }
  }

  //private formatDate(date: Date | null): string | null {
  //  if (!date) {
  //    return null; // If the date is null, return null
  //  }
  //  return date.toISOString().split('T')[0]; // Format as 'yyyy-MM-dd'
  //}

  public closeModal(): void {
    this.showTransactionsModal = false;
    this.showEditTransactionModal = false;
    this.showRemoveTransactionModal = false;
    this.closeForm.emit();
  }
}
