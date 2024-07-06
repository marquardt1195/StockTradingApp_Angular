using StockTradingApp_Angular.Data;

namespace StockTradingApp_Angular.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<List<Transactions>> GetAllTransactions();
    }
}
