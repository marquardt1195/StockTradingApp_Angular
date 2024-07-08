using StockTradingApp_Angular.Data;

namespace StockTradingApp_Angular.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<List<Transaction>> GetAllTransactions();

        Task<Transaction> GetTransactionById();

        Task InitiateTrade();
    }
}
