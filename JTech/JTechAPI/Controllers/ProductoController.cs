using Microsoft.AspNetCore.Mvc;
using JTech.Application.Contract;
using JTech.Application.Dtos.Producto;

namespace JTechAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductoController : ControllerBase
    {
        private readonly IProductoService _productoService;

        public ProductoController(IProductoService productoService)
        {
            _productoService = productoService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var productos = await _productoService.GetAllAsync();
            return Ok(productos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var producto = await _productoService.GetByIdAsync(id);
            if (producto == null) return NotFound();
            return Ok(producto);
        }

        [HttpPost]
        public async Task<ActionResult> Create(ProductoSaveDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _productoService.AddAsync(dto);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, ProductoSaveDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _productoService.UpdateAsync(id, dto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _productoService.DeleteAsync(id);
            return NoContent();
        }
    }
}