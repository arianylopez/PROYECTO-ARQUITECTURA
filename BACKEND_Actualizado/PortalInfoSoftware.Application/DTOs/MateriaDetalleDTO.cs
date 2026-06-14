namespace PortalInfoSoftware.Application.DTOs
{
    public class MateriaDetalleDTO
    {
        public string Sigla { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public int Semestre { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public string Objetivos { get; set; } = string.Empty;
        public string Contenidos { get; set; } = string.Empty;

        public List<MateriaDTO> Prerrequisitos { get; set; } = new List<MateriaDTO>();
        public List<MateriaDTO> Habilitadas { get; set; } = new List<MateriaDTO>();
    }
}