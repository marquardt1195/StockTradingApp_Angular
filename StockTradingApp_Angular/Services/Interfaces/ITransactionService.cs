using StockTradingApp_Angular.Data;

namespace StockTradingApp_Angular.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<List<Transaction>> GetAllTransactions();

        Task<List<Transaction>> GetTransactionsByTradeId(int tradeId);

        Task InitiateTrade(Transaction transaction);

        Task AddTradeLeg(Transaction transaction);

        Task ReduceTradeLeg(Transaction transaction);

    }
}
