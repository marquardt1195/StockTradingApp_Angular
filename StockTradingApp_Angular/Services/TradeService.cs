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
            return await _context.Trade.ToListAsync();
        }

        public async Task InitiateTrade(Trade trade)
        {
            try
            {
                if (trade != null)
                {
                    await _context.Trade.AddAsync(trade);
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
