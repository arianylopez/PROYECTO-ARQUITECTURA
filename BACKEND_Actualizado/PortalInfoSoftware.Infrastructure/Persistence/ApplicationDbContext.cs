using Microsoft.EntityFrameworkCore;
using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<PlanEstudios> PlanesEstudio { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<MateriaPrerrequisito> MateriasPrerrequisitos { get; set; }
        public DbSet<Administrador> Administradores { get; set; }
        public DbSet<Docente> Docentes { get; set; }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Articulo> Articulos { get; set; }
        public DbSet<ImagenGaleria> ImagenesGaleria { get; set; }
        public DbSet<RelatoEstudiantil> RelatosEstudiantiles { get; set; }
        public DbSet<InformacionCarrera> InformacionCarrera { get; set; }
        public DbSet<AreaEspecializacion> AreasEspecializacion { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Materia>()
                .HasOne(m => m.PlanEstudios)
                .WithMany(p => p.Materias)
                .HasForeignKey(m => m.PlanId);

            modelBuilder.Entity<Materia>()
                .HasIndex(m => m.Sigla)
                .IsUnique();

            modelBuilder.Entity<MateriaPrerrequisito>()
                .HasKey(mp => new { mp.MateriaId, mp.PrerrequisitoId });

            modelBuilder.Entity<MateriaPrerrequisito>()
                .HasOne(mp => mp.Materia)
                .WithMany(m => m.Prerrequisitos)
                .HasForeignKey(mp => mp.MateriaId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MateriaPrerrequisito>()
                .HasOne(mp => mp.Prerrequisito)
                .WithMany(m => m.Habilitadas)
                .HasForeignKey(mp => mp.PrerrequisitoId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Administrador>()
                .HasIndex(a => a.Email)
                .IsUnique();

            modelBuilder.Entity<Evento>()
                .HasOne(e => e.Autor)
                .WithMany()
                .HasForeignKey(e => e.AutorId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}