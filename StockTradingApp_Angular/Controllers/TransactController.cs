﻿using Microsoft.AspNetCore.Mvc;
using StockTradingApp_Angular.Data;
using StockTradingApp_Angular.Services.Interfaces;
using StockTradingApp_Angular.Services;
using System.Transactions;

namespace StockTradingApp_Angular.Controllers
{
    [Route("Transact")]
    [ApiController]
    public class TransactController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactController(ITransactionService transactionService) 
        {
            _transactionService = transactionService;
        }

        [HttpGet("GetAllTransactions")]
        public async Task<List<Transactions>> GetAllTransactions()
        {
            return await _transactionService.GetAllTransactions();
        }
    }
}
