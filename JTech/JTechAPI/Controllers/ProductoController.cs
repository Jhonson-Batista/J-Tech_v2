using Microsoft.AspNetCore.Mvc;
using JTechAPI.DTOs;
using JTechAPI.Models;

namespace JTechAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductoController : ControllerBase
    {
        private static List<Producto> productos = new List<Producto>();
        private static int nextId = 1;

        [HttpGet]
        public ActionResult<List<Producto>> GetAll()
        {
            return Ok(productos);
        }

        [HttpGet("{id}")]
        public ActionResult<Producto> GetById(int id)
        {
            var producto = productos.FirstOrDefault(p => p.Id == id);
            if (producto == null) return NotFound();
            return Ok(producto);
        }

        [HttpPost]
        public ActionResult<Producto> Create(ProductoDto dto)
        {
            var producto = new Producto
            {
                Id = nextId++,
                Nombre = dto.Nombre,
                IMEI = dto.IMEI,
                Precio = dto.Precio,
                Stock = dto.Stock,
                MesGarantia = dto.MesGarantia,
                MarcaId = dto.MarcaId
            };
            productos.Add(producto);
            return CreatedAtAction(nameof(GetById), new { id = producto.Id }, producto);
        }

        [HttpPut("{id}")]
        public ActionResult<Producto> Update(int id, ProductoDto dto)
        {
            var producto = productos.FirstOrDefault(p => p.Id == id);
            if (producto == null) return NotFound();
            producto.Nombre = dto.Nombre;
            producto.IMEI = dto.IMEI;
            producto.Precio = dto.Precio;
            producto.Stock = dto.Stock;
            producto.MesGarantia = dto.MesGarantia;
            producto.MarcaId = dto.MarcaId;
            return Ok(producto);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var producto = productos.FirstOrDefault(p => p.Id == id);
            if (producto == null) return NotFound();
            productos.Remove(producto);
            return NoContent();
        }
    }
}