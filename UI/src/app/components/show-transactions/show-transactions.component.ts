import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { Observable } from 'rxjs';
import { TransactionService } from '../../services/TransactionService/transaction.service';

@Component({
  selector: 'app-show-transactions',
  templateUrl: './show-transactions.component.html',
  styleUrl: './show-transactions.component.css'
})
export class ShowTransactionsComponent implements OnChanges{
  @Input() transactionsByTradeId$!: Observable<Transaction[]>;
  @Input() showTransactionsModal: boolean = false
  @Output() closeForm = new EventEmitter<void>();
  @Output() editTransaction = new EventEmitter<Transaction>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showTransactionsModal'] && this.showTransactionsModal) {
      // Fetch the transactions if necessary
    }
  }

  public closeModal(): void {
    this.closeForm.emit();
  }
}