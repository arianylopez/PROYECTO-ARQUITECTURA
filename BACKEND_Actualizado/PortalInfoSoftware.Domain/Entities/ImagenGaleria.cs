namespace PortalInfoSoftware.Domain.Entities
{
    public class ImagenGaleria : BaseEntity
    {
        public string ImageUrl { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string ActividadAsociada { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}