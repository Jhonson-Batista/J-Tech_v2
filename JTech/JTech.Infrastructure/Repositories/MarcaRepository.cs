using JTech.Domain.Entities;
using JTech.Infrastructure.Context;
using JTech.Infrastructure.Interfaces;
using JTech.Infrastructure.Core;

namespace JTech.Infrastructure.Repositories
{
    public class MarcaRepository : BaseRepository<Marca>, IMarcaRepository
    {
        public MarcaRepository(AppDbContext context) : base(context)
        {
        }
    }
}
