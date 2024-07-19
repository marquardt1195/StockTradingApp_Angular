using StockTradingApp_Angular.Data;

namespace StockTradingApp_Angular.Services.Interfaces
{
    public interface ITradeService
    {
        Task<List<Trade>> GetAllTrades();

        Task InitiateTrade(Trade trade);

    }
}
