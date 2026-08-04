using JTech.Application.Dtos.Producto;

namespace JTech.Application.Contract
{
    public interface IProductoService
    {
        Task<IEnumerable<ProductoGetDto>> GetAllAsync();
        Task<ProductoGetDto> GetByIdAsync(int id);
        Task AddAsync(ProductoSaveDto dto);
        Task UpdateAsync(int id, ProductoSaveDto dto);
        Task DeleteAsync(int id);
    }
}
