using System.ComponentModel.DataAnnotations;

namespace StockTradingApp_Angular.Data
{
    public class Trade
    {
        [Key]
        public int trade_id { get; set; }

        public string stock_symbol { get; set; } = string.Empty;

        public decimal cost_basis { get; set; }

        public int shares_bought { get; set; }

        public DateTime date_initiated { get; set; }

        public decimal dollar_stop_loss { get; set; }

        public decimal? sell_basis { get; set; }

        public int? shares_sold { get; set; }

        public DateTime? date_closed { get; set; }
    }
}
