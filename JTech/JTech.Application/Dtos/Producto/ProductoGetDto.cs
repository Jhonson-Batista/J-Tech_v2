using JTech.Application.Dtos;

namespace JTech.Application.Dtos.Producto
{
    public class ProductoGetDto : DtoBase   
    {
        public string Nombre { get; set; }
        public string IMEI { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public int MesGarantia { get; set; }
        public int MarcaId { get; set; }
    }
}
