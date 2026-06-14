namespace PortalInfoSoftware.Application.DTOs
{
    public class EventoCreateDTO
    {
        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public string Lugar { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? InscripcionUrl { get; set; }
        public int? MaxParticipantes { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
    }
}