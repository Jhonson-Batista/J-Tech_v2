using Microsoft.AspNetCore.Mvc;
using JTech.Application.Contract;
using JTech.Application.Dtos.Marca;

namespace JTechAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MarcaController : ControllerBase
    {
        private readonly IMarcaService _marcaService;

        public MarcaController(IMarcaService marcaService)
        {
            _marcaService = marcaService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var marcas = await _marcaService.GetAllAsync();
            return Ok(marcas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var marca = await _marcaService.GetByIdAsync(id);
            if (marca == null) return NotFound();
            return Ok(marca);
        }

        [HttpPost]
        public async Task<ActionResult> Create(MarcaSaveDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _marcaService.AddAsync(dto);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, MarcaSaveDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _marcaService.UpdateAsync(id, dto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _marcaService.DeleteAsync(id);
            return NoContent();
        }
    }
}