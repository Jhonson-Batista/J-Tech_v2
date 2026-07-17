using Microsoft.AspNetCore.Mvc;
using JTech.Domain.Entities;
using JTech.Infrastructure.Interfaces;
using JTech.Infrastructure.Models;

namespace JTechAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductoController : ControllerBase
    {
        private readonly IProductoRepository _productoRepository;

        public ProductoController(IProductoRepository productoRepository)
        {
            _productoRepository = productoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetAll()
        {
            var productos = await _productoRepository.GetAllAsync();
            return Ok(productos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetById(int id)
        {
            var producto = await _productoRepository.GetByIdAsync(id);
            if (producto == null) return NotFound();
            return Ok(producto);
        }

        [HttpPost]
        public async Task<ActionResult> Create(ProductoModel model)
        {
            var producto = new Producto
            {
                Nombre = model.Nombre,
                IMEI = model.IMEI,
                Precio = model.Precio,
                Stock = model.Stock,
                MesGarantia = model.MesGarantia,
                MarcaId = model.MarcaId
            };
            await _productoRepository.AddAsync(producto);
            return CreatedAtAction(nameof(GetById), new { id = producto.Id }, producto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, ProductoModel model)
        {
            var producto = await _productoRepository.GetByIdAsync(id);
            if (producto == null) return NotFound();
            producto.Nombre = model.Nombre;
            producto.IMEI = model.IMEI;
            producto.Precio = model.Precio;
            producto.Stock = model.Stock;
            producto.MesGarantia = model.MesGarantia;
            producto.MarcaId = model.MarcaId;
            await _productoRepository.UpdateAsync(producto);
            return Ok(producto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var producto = await _productoRepository.GetByIdAsync(id);
            if (producto == null) return NotFound();
            await _productoRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}