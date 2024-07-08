export interface Transaction {

  TransactionId: number;
  TradeId: number;
  StockSymbol: string;
  EntryPrice: number | null;
  NumberSharesEntered: number | null;
  EntryDate: Date | null;
  DollarStopLoss: number | null;
  SellPrice: number | null;
  NumberSharesExited: number | null;
  ExitDate: Date | null;
}
