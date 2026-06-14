namespace PortalInfoSoftware.Application.DTOs
{
    public class DocentePublicoDTO
    {
        public Guid Id { get; set; }
        public string NombreCompleto { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public string? PhotoUrl { get; set; }
        public string? LinkedinUrl { get; set; }
        public string Descripcion { get; set; } = string.Empty;
    }
}