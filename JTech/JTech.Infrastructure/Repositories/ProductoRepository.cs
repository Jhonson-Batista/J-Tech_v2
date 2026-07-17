using JTech.Domain.Entities;
using JTech.Infrastructure.Context;
using JTech.Infrastructure.Core;
using JTech.Infrastructure.Interfaces;

namespace JTech.Infrastructure.Repositories
{
    public class ProductoRepository : BaseRepository<Producto>, IProductoRepository
    {
        public ProductoRepository(AppDbContext context) : base(context)
        {
        }
    }
}
