using JTech.Application.Contract;
using JTech.Application.Dtos.Producto;
using JTech.Domain.Entities;
using JTech.Infrastructure.Interfaces;

namespace JTech.Application.Services
{
    public class ProductoService : IProductoService
    {
        private readonly IProductoRepository _productoRepository;

        public ProductoService(IProductoRepository productoRepository)
        {
            _productoRepository = productoRepository;
        }

        public async Task<IEnumerable<ProductoGetDto>> GetAllAsync()
        {
            var productos = await _productoRepository.GetAllAsync();
            return productos.Select(p => new ProductoGetDto
            {
                id = p.Id,
                Nombre = p.Nombre,
                IMEI = p.IMEI,
                Precio = p.Precio,
                Stock = p.Stock,
                MesGarantia = p.MesGarantia,
                MarcaId = p.MarcaId
            });
        }

        public async Task<ProductoGetDto> GetByIdAsync(int id)
        {
            var producto = await _productoRepository.GetByIdAsync(id);
            if (producto == null) return null;
            return new ProductoGetDto
            {
                id = producto.Id,
                Nombre = producto.Nombre,
                IMEI = producto.IMEI,
                Precio = producto.Precio,
                Stock = producto.Stock,
                MesGarantia = producto.MesGarantia,
                MarcaId = producto.MarcaId
            };
        }

        public async Task AddAsync(ProductoSaveDto dto)
        {
            var producto = new Producto
            {
                Nombre = dto.Nombre,
                IMEI = dto.IMEI,
                Precio = dto.Precio,
                Stock = dto.Stock,
                MesGarantia = dto.MesGarantia,
                MarcaId = dto.MarcaId
            };
            await _productoRepository.AddAsync(producto);
        }

        public async Task UpdateAsync(int id, ProductoSaveDto dto)
        {
            var producto = await _productoRepository.GetByIdAsync(id);
            if (producto == null) throw new Exception($"Producto con id {id} no encontrado");
            producto.Nombre = dto.Nombre;
            producto.IMEI = dto.IMEI;
            producto.Precio = dto.Precio;
            producto.Stock = dto.Stock;
            producto.MesGarantia = dto.MesGarantia;
            producto.MarcaId = dto.MarcaId;
            await _productoRepository.UpdateAsync(producto);
        }

        public async Task DeleteAsync(int id)
        {
            var producto = await _productoRepository.GetByIdAsync(id);
            if (producto == null) throw new Exception($"Producto con id {id} no encontrado");
            await _productoRepository.DeleteAsync(id);
        }
    }
}