using JTech.Application.Contract;
using JTech.Application.Dtos.Marca;
using JTech.Domain.Entities;
using JTech.Infrastructure.Interfaces;

namespace JTech.Application.Services
{
    public class MarcaService : IMarcaService
    {
        private readonly IMarcaRepository _marcaRepository;

        public MarcaService(IMarcaRepository marcaRepository)
        {
            _marcaRepository = marcaRepository;
        }

        public async Task<IEnumerable<MarcaGetDto>> GetAllAsync()
        {
            var marcas = await _marcaRepository.GetAllAsync();
            return marcas.Select(m => new MarcaGetDto
            {
                id = m.Id,
                Nombre = m.Nombre,
                PaisOrigen = m.PaisOrigen
            });
        }

        public async Task<MarcaGetDto> GetByIdAsync(int id)
        {
            var marca = await _marcaRepository.GetByIdAsync(id);
            if (marca == null) return null;
            return new MarcaGetDto
            {
                id = marca.Id,
                Nombre = marca.Nombre,
                PaisOrigen = marca.PaisOrigen
            };
        }

        public async Task AddAsync(MarcaSaveDto dto)
        {
            var marca = new Marca
            {
                Nombre = dto.Nombre,
                PaisOrigen = dto.PaisOrigen
            };
            await _marcaRepository.AddAsync(marca);
        }

        public async Task UpdateAsync(int id, MarcaSaveDto dto)
        {
            var marca = await _marcaRepository.GetByIdAsync(id);
            if (marca == null) throw new Exception($"Marca con id {id} no encontrada");
            marca.Nombre = dto.Nombre;
            marca.PaisOrigen = dto.PaisOrigen;
            await _marcaRepository.UpdateAsync(marca);
        }

        public async Task DeleteAsync(int id)
        {
            var marca = await _marcaRepository.GetByIdAsync(id);
            if (marca == null) throw new Exception($"Marca con id {id} no encontrada");
            await _marcaRepository.DeleteAsync(id);
        }
    }
}