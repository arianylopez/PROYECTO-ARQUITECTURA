namespace PortalInfoSoftware.Application.DTOs
{
    public class RelatoEstudiantilCreateDTO
    {
        public string NombreEstudiante { get; set; } = string.Empty;
        public string Experiencia { get; set; } = string.Empty;
        public string ActividadRelacionada { get; set; } = string.Empty;
        public string? FotoUrl { get; set; }
    }
}