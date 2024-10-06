using Microsoft.EntityFrameworkCore;
using StockTradingApp_Angular.Data;
using StockTradingApp_Angular.Services.Interfaces;

namespace StockTradingApp_Angular.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TransactionService> _logger;

        public TransactionService(ApplicationDbContext context, ILogger<TransactionService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<Transaction>> GetAllTransactions()
        {
            return await _context.Transaction
                .GroupBy(x=>x.trade_id)
                .Select(x => new Transaction
                {
                    trade_id = x.Key,
                    stock_symbol = x.First().stock_symbol,
                    entry_price = x.Sum(t => t.entry_price * t.shares_bought) / x.Sum(t => t.shares_bought),
                    shares_bought = (x.Sum(x => x.shares_bought) - x.Sum(x => x.shares_sold)),
                    entry_date = x.OrderBy(t => t.entry_date).Where(x=>x.entry_date != null).First().entry_date,
                    dollar_stop_loss = x.OrderBy(t=>t.entry_date).Last().dollar_stop_loss
                })                             
                .ToListAsync();
        }

        public async Task<List<Transaction>> GetTransactionsByTradeId(int tradeId)
        {
            return await _context.Transaction.Where(x=>x.trade_id == tradeId).ToListAsync();
        }

        public async Task AddTradeLeg(Transaction transaction)
        {
            try
            {
                if (transaction != null)
                {
                    await _context.Transaction.AddAsync(transaction);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var exceptionMessage = ex.Message; 
            }
        }

        public async Task ReduceTradeLeg(Transaction transaction)
        {
            try
            {
                if (transaction != null)
                {
                    await _context.Transaction.AddAsync(transaction);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var exceptionMessage = ex.Message;
            }
        }

        public async Task EditTradeLeg(Transaction transaction)
        {
            try
            {
                _context.Update(transaction);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var exceptionMessage = ex.Message;
            }
        }

        public async Task RemoveTradeLeg(Transaction transaction)
        {
            try
            {
                _context.Transaction.Remove(transaction);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var exceptionMessage = ex.Message;
            }
        }
    }
}
