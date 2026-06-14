namespace PortalInfoSoftware.Application.DTOs
{
    public class ImagenGaleriaDTO
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string ActividadAsociada { get; set; } = string.Empty;
    }
}