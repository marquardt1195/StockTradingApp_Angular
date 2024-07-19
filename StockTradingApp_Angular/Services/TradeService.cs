using Microsoft.EntityFrameworkCore;
using StockTradingApp_Angular.Data;
using StockTradingApp_Angular.Services.Interfaces;

namespace StockTradingApp_Angular.Services
{
    public class TradeService : ITradeService
    {

        private readonly ApplicationDbContext _context;
        private readonly ILogger<TradeService> _logger;

        public TradeService(ApplicationDbContext context, ILogger<TradeService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<Trade>> GetAllTrades()
        {
            var trades = await _context.Trade.ToListAsync();
            return trades;
        }

        public async Task InitiateTrade(Trade trade)
        {
            try
            {
                if (trade != null)
                {
                    await _context.Trade.AddAsync(trade);
                    await _context.SaveChangesAsync();

                    var transaction = new Transaction
                    {
                        trade_id = trade.trade_id,
                        stock_symbol = trade.stock_symbol,
                        entry_price = trade.cost_basis,
                        shares_bought = trade.shares_bought,
                        entry_date = trade.date_initiated,
                        dollar_stop_loss = trade.dollar_stop_loss
                    };
                    await _context.Transaction.AddAsync(transaction);
                    await _context.SaveChangesAsync();
                }
            } 
            catch (Exception ex)
            {
                var exceptionMessage = ex.Message;
            }
        }
    }
}
