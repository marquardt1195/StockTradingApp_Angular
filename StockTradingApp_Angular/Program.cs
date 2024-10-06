using StockTradingApp_Angular.Data;
using Microsoft.EntityFrameworkCore;
using StockTradingApp_Angular.Services.Interfaces;
using StockTradingApp_Angular.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection")));
//Response no longer camelCase
builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});


builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ITradeService, TradeService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//added to resolve errors from UI
//look into limiting the application origin that this can only come from specific app
//this is likely not good for live websites as anyone can access
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();

app.Run();
