using JTech.Application.Dtos.Marca;

namespace JTech.Application.Contract
{
    public interface IMarcaService
    {
        Task<IEnumerable<MarcaGetDto>> GetAllAsync();
        Task<MarcaGetDto> GetByIdAsync(int id);
        Task AddAsync(MarcaSaveDto dto);
        Task UpdateAsync(int id, MarcaSaveDto dto);
        Task DeleteAsync(int id);
    }
}
