namespace PortalInfoSoftware.Application.DTOs
{
    public class ArticuloCreateDTO
    {
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public string Contenido { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public int TiempoLectura { get; set; }
    }
}