namespace PortalInfoSoftware.Domain.Entities
{
    public class Docente : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string? PhotoUrl { get; set; }
        public string? LinkedinUrl { get; set; }
        public string? EmailPersonal { get; set; }
        public string? Telefono { get; set; }
        public bool IsActive { get; set; } = true;
        public int Orden { get; set; } = 0;
    }
}