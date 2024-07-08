export interface Transaction {

  transactionId: number;
  tradeId: number;
  stockSymbol: string;
  entryPrice: number | null;
  numberSharesEntered: number | null;
  entryDate: Date | null;
  dollarStopLoss: number | null;
  sellPrice: number | null;
  numberSharesExited: number | null;
  exitDate: Date | null;

}
