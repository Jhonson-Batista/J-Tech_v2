using JTech.Domain.Core;
namespace JTech.Domain.Entities
{
    public class Marca : BaseEntity
    {
        public string Nombre { get; set; }
        public string PaisOrigen { get; set; }

        public ICollection<Producto> Productos { get; set; }
    }
}
