using Microsoft.EntityFrameworkCore;

namespace StockTradingApp_Angular.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }


        public DbSet<Transaction> Transactions { get; set; }
    }
}
