using System.ComponentModel.DataAnnotations;
namespace JTech.Application.Dtos.Marca
{
    public class MarcaSaveDto
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El país de origen es requerido")]
        public string PaisOrigen { get; set; }
    }
}
