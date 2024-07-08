export interface Transaction {

  transaction_id: number;
  trade_id: number;
  stock_symbol: string;
  entry_price: number | null;
  shares_bought: number | null;
  entry_date: Date | null;
  dollar_stop_loss: number | null;
  exit_price: number | null;
  shares_sold: number | null;
  exit_date: Date | null;
}
