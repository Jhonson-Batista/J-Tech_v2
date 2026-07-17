using Microsoft.AspNetCore.Mvc;
using JTech.Domain.Entities;
using JTech.Infrastructure.Interfaces;
using JTech.Infrastructure.Models;

namespace JTechAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MarcaController : ControllerBase
    {
        private readonly IMarcaRepository _marcaRepository;

        public MarcaController(IMarcaRepository marcaRepository)
        {
            _marcaRepository = marcaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Marca>>> GetAll()
        {
            var marcas = await _marcaRepository.GetAllAsync();
            return Ok(marcas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Marca>> GetById(int id)
        {
            var marca = await _marcaRepository.GetByIdAsync(id);
            if (marca == null) return NotFound();
            return Ok(marca);
        }

        [HttpPost]
        public async Task<ActionResult> Create(MarcaModel model)
        {
            var marca = new Marca
            {
                Nombre = model.Nombre,
                PaisOrigen = model.PaisOrigen
            };
            await _marcaRepository.AddAsync(marca);
            return CreatedAtAction(nameof(GetById), new { id = marca.Id }, marca);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, MarcaModel model)
        {
            var marca = await _marcaRepository.GetByIdAsync(id);
            if (marca == null) return NotFound();
            marca.Nombre = model.Nombre;
            marca.PaisOrigen = model.PaisOrigen;
            await _marcaRepository.UpdateAsync(marca);
            return Ok(marca);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var marca = await _marcaRepository.GetByIdAsync(id);
            if (marca == null) return NotFound();
            await _marcaRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}