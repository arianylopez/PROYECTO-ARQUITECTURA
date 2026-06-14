namespace PortalInfoSoftware.Domain.Entities
{
    public class PlanEstudios : BaseEntity
    {
        public string Nombre { get; set; } = string.Empty;
        public bool IsCurrent { get; set; } = true;

        public ICollection<Materia> Materias { get; set; } = new List<Materia>();
    }
}