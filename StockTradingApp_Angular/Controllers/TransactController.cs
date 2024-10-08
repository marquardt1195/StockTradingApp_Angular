﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("GetTransactionsByTradeId")]
        public async Task<List<Data.Transaction>> GetTransactionsByTradeId(int tradeId)
        {
            return await _transactionService.GetTransactionsByTradeId(tradeId);
        }

        [HttpGet("GetAllTransactions")]
        public async Task<List<Data.Transaction>> GetAllTransactions()
        {
            return await _transactionService.GetAllTransactions();
        }

        [HttpPost("AddTradeLeg")]
        public async Task AddTradeLeg(Data.Transaction transaction)
        {
            await _transactionService.AddTradeLeg(transaction);
        }

        [HttpPost("ReduceTradeLeg")]
        public async Task ReduceTradeLeg(Data.Transaction transaction)
        {
            await _transactionService.ReduceTradeLeg(transaction);
        }

        [HttpPost("EditTradeLeg")]
        public async Task EditTradeLeg(Data.Transaction transaction)
        {
            await _transactionService.EditTradeLeg(transaction);
        }

        [HttpPost("RemoveTradeLeg")]
        public async Task RemoveTradeLeg(Data.Transaction transaction)
        {
            await _transactionService.RemoveTradeLeg(transaction);
        }
    }
}
