using System.ComponentModel.DataAnnotations;

namespace StockTradingApp_Angular.Data
{
    public class Transaction
    {
        [Key]
        public int transaction_id { get; set; }

        public int trade_id { get; set; }

        public string stock_symbol { get; set; } = string.Empty;

        public decimal? entry_price { get; set; }

        public int? shares_bought { get; set; }

        public DateTime? entry_date { get; set; }

        public decimal? dollar_stop_loss { get; set; }

        public decimal? exit_price { get; set; }

        public int? shares_sold { get; set; }

        public DateTime? exit_date { get; set; }
    }
}
