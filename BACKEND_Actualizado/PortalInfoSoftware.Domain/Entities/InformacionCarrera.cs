namespace PortalInfoSoftware.Domain.Entities
{
    public class InformacionCarrera : BaseEntity
    {
        public string Descripcion { get; set; } = string.Empty;
        public string Objetivos { get; set; } = string.Empty;
        public string PerfilEgresado { get; set; } = string.Empty;
        public string CampoLaboral { get; set; } = string.Empty;
        public string Competencias { get; set; } = string.Empty;
    }
}