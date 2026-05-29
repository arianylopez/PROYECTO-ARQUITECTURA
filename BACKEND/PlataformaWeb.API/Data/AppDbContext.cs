using Microsoft.EntityFrameworkCore;
using PlataformaWeb.API.Models;

namespace PlataformaWeb.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // 1. Seguridad
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }

        // 2. Académico
        public DbSet<StudyPlan> StudyPlans { get; set; }
        public DbSet<Semester> Semesters { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<SubjectPrerequisite> SubjectPrerequisites { get; set; }

        // 3. Comunidad
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<TeacherSubject> TeacherSubjects { get; set; }
        public DbSet<Alumni> Alumni { get; set; }

        // 4. Contenido
        public DbSet<Category> Categories { get; set; }
        public DbSet<Post> Posts { get; set; }

        // 5. Multimedia
        public DbSet<Banner> Banners { get; set; }
        public DbSet<GalleryAlbum> GalleryAlbums { get; set; }
        public DbSet<GalleryImage> GalleryImages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<SubjectPrerequisite>()
                .HasKey(sp => new { sp.SubjectId, sp.PrerequisiteId });

            modelBuilder.Entity<SubjectPrerequisite>()
                .HasOne(sp => sp.Subject)
                .WithMany(s => s.Requires)
                .HasForeignKey(sp => sp.SubjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SubjectPrerequisite>()
                .HasOne(sp => sp.Prerequisite)
                .WithMany(s => s.PrerequisiteFor)
                .HasForeignKey(sp => sp.PrerequisiteId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TeacherSubject>()
                .HasKey(ts => new { ts.TeacherId, ts.SubjectId });

            modelBuilder.Entity<TeacherSubject>()
                .HasOne(ts => ts.Teacher)
                .WithMany(t => t.TeacherSubjects)
                .HasForeignKey(ts => ts.TeacherId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TeacherSubject>()
                .HasOne(ts => ts.Subject)
                .WithMany(s => s.TeacherSubjects)
                .HasForeignKey(ts => ts.SubjectId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}