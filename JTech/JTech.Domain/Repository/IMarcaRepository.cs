using JTech.Domain.Entities;
namespace JTech.Domain.Repository
{
    public interface IMarcaRepository
    {
        Task<IEnumerable<Marca>> GetAllAsync();
        Task<Marca> GetByIdAsync(int id);
        Task AddAsync(Marca marca);
        Task UpdateAsync(Marca marca);
        Task DeleteAsync(int id);

    }
}
