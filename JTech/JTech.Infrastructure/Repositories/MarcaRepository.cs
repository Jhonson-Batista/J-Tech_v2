using JTech.Domain.Entities;
using JTech.Infrastructure.Interfaces;
using JTech.Infrastructure.Core;
using JTech.Infrastructure.Context;


namespace JTech.Infrastructure.Repositories
{
    public class MarcaRepository : BaseRepository<Marca>, IMarcaRepository
    {
        public MarcaRepository(AppDbContext context) : base(context)
        {
        }
    }
}
