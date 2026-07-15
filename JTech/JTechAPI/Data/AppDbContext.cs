using JTechAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JTechAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Marca> Marcas { get; set; }
        public DbSet<Producto> Productos { get; set; }
    }
}
