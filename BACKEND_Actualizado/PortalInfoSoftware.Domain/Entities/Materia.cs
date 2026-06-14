namespace PortalInfoSoftware.Domain.Entities
{
    public class Materia : BaseEntity
    {
        public Guid PlanId { get; set; }
        public PlanEstudios PlanEstudios { get; set; } = null!;

        public string Sigla { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public int Semestre { get; set; }
        public int? Creditos { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public string Objetivos { get; set; } = string.Empty;
        public string Contenidos { get; set; } = string.Empty;
        public string Competencias { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;

        public ICollection<MateriaPrerrequisito> Prerrequisitos { get; set; } = new List<MateriaPrerrequisito>();
        public ICollection<MateriaPrerrequisito> Habilitadas { get; set; } = new List<MateriaPrerrequisito>();
    }
}