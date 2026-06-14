namespace PortalInfoSoftware.Application.DTOs
{
    public class RelatoEstudiantilDTO
    {
        public Guid Id { get; set; }
        public string NombreEstudiante { get; set; } = string.Empty;
        public string Experiencia { get; set; } = string.Empty;
        public string ActividadRelacionada { get; set; } = string.Empty;
        public string? FotoUrl { get; set; }
    }
}