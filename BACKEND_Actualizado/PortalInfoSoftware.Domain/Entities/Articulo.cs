namespace PortalInfoSoftware.Domain.Entities
{
    public class Articulo : BaseEntity
    {
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public string Contenido { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public int TiempoLectura { get; set; }
        public string Estado { get; set; } = "Pendiente";
        public DateTime? FechaPublicacion { get; set; }
    }
}