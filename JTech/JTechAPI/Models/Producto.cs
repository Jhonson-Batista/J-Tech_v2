namespace JTechAPI.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string IMEI { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public int MesGarantia { get; set; }
        public int MarcaId { get; set; }
        public Marca Marca { get; set; }

    }
}
