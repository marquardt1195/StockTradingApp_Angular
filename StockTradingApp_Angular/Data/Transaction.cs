using System.ComponentModel.DataAnnotations;

namespace StockTradingApp_Angular.Data
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }

        public int TradeId { get; set; }

        public string StockSymbol { get; set; } = string.Empty;

        public decimal? EntryPrice { get; set; }

        public int? NumberSharesEntered { get; set; }

        public DateTime? EntryDate { get; set; }

        public decimal? DollarStopLoss { get; set; }

        public decimal? SellPrice { get; set; }

        public int? NumberSharesExited { get; set; }

        public DateTime? ExitDate { get; set; }
    }
}
