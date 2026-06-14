namespace PortalInfoSoftware.Domain.Entities
{
    public class AreaEspecializacion : BaseEntity
    {
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string Tecnologias { get; set; } = string.Empty;
        public string OportunidadesLaborales { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}