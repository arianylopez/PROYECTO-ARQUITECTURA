namespace PortalInfoSoftware.Domain.Entities
{
    public class MateriaPrerrequisito
    {
        public Guid MateriaId { get; set; }
        public Materia Materia { get; set; } = null!;

        public Guid PrerrequisitoId { get; set; }
        public Materia Prerrequisito { get; set; } = null!;
    }
}