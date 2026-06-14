namespace PortalInfoSoftware.Application.DTOs
{
    public class MateriaDTO
    {
        public string Sigla { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public int Semestre { get; set; }
        public int? Creditos { get; set; }
    }
}