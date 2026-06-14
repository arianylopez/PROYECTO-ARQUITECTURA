namespace PortalInfoSoftware.Application.DTOs
{
    public class ArticuloPublicoDTO
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public string Contenido { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public int TiempoLectura { get; set; }
        public DateTime? FechaPublicacion { get; set; }
    }
}
