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
            return await _context.Transaction.ToListAsync();
        }

        public async Task<Transaction> GetTransactionById()
        {
            return await _context.Transaction.FirstOrDefaultAsync();
        }

        public async Task InitiateTrade(Transaction transaction)
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
                var message = ex.Message;
            }

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
    }
}
