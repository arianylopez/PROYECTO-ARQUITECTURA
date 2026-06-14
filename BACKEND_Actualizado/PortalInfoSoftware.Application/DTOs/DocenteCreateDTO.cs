namespace PortalInfoSoftware.Application.DTOs
{
    public class DocenteCreateDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string? PhotoUrl { get; set; }
        public string? LinkedinUrl { get; set; }
        public string? EmailPersonal { get; set; }
        public string? Telefono { get; set; }
    }
}