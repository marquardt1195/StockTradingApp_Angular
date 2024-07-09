export interface Transaction {

  transaction_id?: number;
  //trade_id: number;
  stock_symbol: string;
  entry_price: number;
  shares_bought: number;
  entry_date: Date;
  dollar_stop_loss: number;
  //exit_price: number | null;
  //shares_sold: number | null;
  //exit_date: Date | null;
}
