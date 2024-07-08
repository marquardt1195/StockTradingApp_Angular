export interface Trade {

  trade_id: number;
  stock_symbol: string;
  cost_basis: number;
  shares_bought: number;
  date_initiated: Date;
  dollar_stop_loss: number;
  sell_basis: number | null;
  shares_sold: number | null;
  date_closed: Date | null;
}
