using JTech.Domain.Entities;
using Microsoft.EntityFrameworkCore;
namespace JTech.Infrastructure.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Marca> Marcas { get; set; }
    public DbSet<Producto> Productos { get; set; }
}
