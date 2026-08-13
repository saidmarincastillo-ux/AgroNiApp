using AgroNi.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AgroNi.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed default admin user requested by user
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Email = "agrogestorni@gmail.com",
                PasswordHash = "12345", // Hashed in production
                Role = "ADMIN"
            });
        }
    }
}
