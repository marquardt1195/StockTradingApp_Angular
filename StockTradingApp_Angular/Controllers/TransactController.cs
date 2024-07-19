using Microsoft.AspNetCore.Mvc;
using StockTradingApp_Angular.Data;
using StockTradingApp_Angular.Services.Interfaces;
using StockTradingApp_Angular.Services;
using System.Transactions;

namespace StockTradingApp_Angular.Controllers
{
    [Route("api/Transact")]
    [ApiController]
    public class TransactController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactController(ITransactionService transactionService) 
        {
            _transactionService = transactionService;
        }

        [HttpGet("GetTransactionById")]
        public async Task<Data.Transaction> GetTransactionById()
        {
            return await _transactionService.GetTransactionById();
        }

        [HttpGet("GetAllTransactions")]
        public async Task<List<Data.Transaction>> GetAllTransactions()
        {
            return await _transactionService.GetAllTransactions();
        }

        [HttpPost("AddTransaction")]
        public async Task InitiateTrade(Data.Transaction transaction)
        {
            await _transactionService.InitiateTrade(transaction);
        }

        [HttpPost("AddTradeLeg")]
        public async Task AddTradeLeg(Data.Transaction transaction)
        {
            await _transactionService.AddTradeLeg(transaction);
        }
    }
}
