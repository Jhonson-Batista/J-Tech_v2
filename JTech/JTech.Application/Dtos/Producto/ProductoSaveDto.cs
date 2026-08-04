using System.ComponentModel.DataAnnotations;

namespace JTech.Application.Dtos.Producto
{
    public class ProductoSaveDto
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El IMEI es requerido")]
        [StringLength(15, MinimumLength = 15, ErrorMessage = "El IMEI debe tener 15 dígitos")]
        public string IMEI { get; set; }

        [Required(ErrorMessage = "El precio es requerido")]
        [Range(0.01, double.MaxValue, ErrorMessage = "El precio debe ser mayor a 0")]
        public decimal Precio { get; set; }

        [Required(ErrorMessage = "El stock es requerido")]
        [Range(0, int.MaxValue, ErrorMessage = "El stock no puede ser negativo")]
        public int Stock { get; set; }

        [Required(ErrorMessage = "Los meses de garantía son requeridos")]
        [Range(1, 60, ErrorMessage = "La garantía debe ser entre 1 y 60 meses")]
        public int MesGarantia { get; set; }

        [Required(ErrorMessage = "La marca es requerida")]
        public int MarcaId { get; set; }
    }
}
