namespace PortalInfoSoftware.Application.DTOs
{
    public class AreaEspecializacionCreateDTO
    {
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string Tecnologias { get; set; } = string.Empty;
        public string OportunidadesLaborales { get; set; } = string.Empty;
    }
}