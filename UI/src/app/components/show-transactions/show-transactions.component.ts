import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { Observable } from 'rxjs';
import { TransactionService } from '../../services/TransactionService/transaction.service';

@Component({
  selector: 'app-show-transactions',
  templateUrl: './show-transactions.component.html',
  styleUrl: './show-transactions.component.css'
})
export class ShowTransactionsComponent {
  //Properties decorated with @Input() are meant to receive data from a parent component. Changes to the value in the parent component will automatically propagate to the child component.
  @Input() transactionsByTradeId$!: Observable<Transaction[]>;
  @Input() showTransactionsModal: boolean = false
  @Input() showEditTransactionModal: boolean = false
  @Input() transactionFormMode: 'addLeg' | 'reduceLeg' | null = null;

  @Output() editTransaction = new EventEmitter<Transaction>(); // This will emit an event when the new button is clicked
  @Output() closeForm = new EventEmitter<void>();

  public selectedTransaction!: Transaction;


  showTransactionToEdit(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.showTransactionsModal = false;
    this.showEditTransactionModal = true;
    this.editTransaction.emit(transaction);

    console.log('showTransactionsModal:', this.showTransactionsModal);
    console.log('showEditTransactionModal:', this.showEditTransactionModal);
  }

  public closeModal(): void {
    this.showTransactionsModal = false;
    this.showEditTransactionModal = false;
    this.closeForm.emit();
  }
}
