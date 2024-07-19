using Microsoft.AspNetCore.Mvc;
using StockTradingApp_Angular.Data;
using StockTradingApp_Angular.Services;
using StockTradingApp_Angular.Services.Interfaces;

namespace StockTradingApp_Angular.Controllers
{
    [Route("api/Trade")]
    [ApiController]
    public class TradeController : ControllerBase
    {
        private readonly ITradeService _tradeService;

        public TradeController(ITradeService tradeService)
        {
            _tradeService = tradeService;
        }

        [HttpGet("GetAllTrades")]
        public async Task<List<Trade>> GetAllTrades()
        {
            return await _tradeService.GetAllTrades();
        }

        [HttpPost("AddTrade")]
        public async Task AddNewTrade(Trade trade)
        {
            await _tradeService.InitiateTrade(trade);
        }
    }
}
