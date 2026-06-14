namespace PortalInfoSoftware.Domain.Entities
{
    public class RelatoEstudiantil : BaseEntity
    {
        public string NombreEstudiante { get; set; } = string.Empty;
        public string Experiencia { get; set; } = string.Empty;
        public string ActividadRelacionada { get; set; } = string.Empty;
        public string? FotoUrl { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
