using Microsoft.EntityFrameworkCore;
using PortalInfoSoftware.Domain.Entities;
using PortalInfoSoftware.Infrastructure.Persistence;

namespace PortalInfoSoftware.Infrastructure.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (!await context.Administradores.AnyAsync())
            {
                var admin = new Administrador
                {
                    Email = "admin@ucb.edu.bo",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
                    FirstName = "Admin",
                    LastName = "Sistema",
                    IsActive = true
                };
                await context.Administradores.AddAsync(admin);
                await context.SaveChangesAsync();
            }

            if (await context.Materias.AnyAsync())
            {
                return;
            }

            var plan = await context.PlanesEstudio.FirstOrDefaultAsync();
            if (plan == null)
            {
                plan = new PlanEstudios
                {
                    Nombre = "Ingeniería de Software - UCB Santa Cruz",
                    IsCurrent = true
                };
                await context.PlanesEstudio.AddAsync(plan);
                await context.SaveChangesAsync();
            }

            var fis111 = new Materia { PlanId = plan.Id, Sigla = "FIS-111", Nombre = "Física I y Laboratorio", Semestre = 1, Creditos = 7 };
            var mat123 = new Materia { PlanId = plan.Id, Sigla = "MAT-123", Nombre = "Álgebra Lineal", Semestre = 1, Creditos = 5 };
            var car100 = new Materia { PlanId = plan.Id, Sigla = "CAR-100", Nombre = "Escritura Académica", Semestre = 1, Creditos = 4 };
            var sis111 = new Materia { PlanId = plan.Id, Sigla = "SIS-111", Nombre = "Introducción a la Programación", Semestre = 1, Creditos = 5 };
            var isw111 = new Materia { PlanId = plan.Id, Sigla = "ISW-111", Nombre = "Fundamentos en Ingeniería de Software", Semestre = 1, Creditos = 5 };
            var mat132 = new Materia { PlanId = plan.Id, Sigla = "MAT-132", Nombre = "Cálculo I", Semestre = 1, Creditos = 5 };

            var mat133 = new Materia { PlanId = plan.Id, Sigla = "MAT-133", Nombre = "Cálculo II", Semestre = 2, Creditos = 5 };
            var mat142 = new Materia { PlanId = plan.Id, Sigla = "MAT-142", Nombre = "Probabilidad y estadística I", Semestre = 2, Creditos = 5 };
            var mat122 = new Materia { PlanId = plan.Id, Sigla = "MAT-122", Nombre = "Estructuras Discretas", Semestre = 2, Creditos = 5 };
            var sis112 = new Materia { PlanId = plan.Id, Sigla = "SIS-112", Nombre = "Programación I", Semestre = 2, Creditos = 5 };
            var sis122 = new Materia { PlanId = plan.Id, Sigla = "SIS-122", Nombre = "Bases de Datos I", Semestre = 2, Creditos = 5 };
            var fhc101 = new Materia { PlanId = plan.Id, Sigla = "FHC-101", Nombre = "Antropología y Valores", Semestre = 2, Creditos = 5 };

            var ind260 = new Materia { PlanId = plan.Id, Sigla = "IND-260", Nombre = "Metodología de la Investigación", Semestre = 3, Creditos = 4 };
            var mat262 = new Materia { PlanId = plan.Id, Sigla = "MAT-262", Nombre = "Análisis numérico", Semestre = 3, Creditos = 5 };
            var sis211 = new Materia { PlanId = plan.Id, Sigla = "SIS-211", Nombre = "Estructuras de datos", Semestre = 3, Creditos = 5 };
            var sis212 = new Materia { PlanId = plan.Id, Sigla = "SIS-212", Nombre = "Programación II", Semestre = 3, Creditos = 5 };
            var sis221 = new Materia { PlanId = plan.Id, Sigla = "SIS-221", Nombre = "Bases de datos II", Semestre = 3, Creditos = 5 };
            var isw112 = new Materia { PlanId = plan.Id, Sigla = "ISW-112", Nombre = "Metodologías ágiles para desarrollo de software", Semestre = 3, Creditos = 5 };

            var isw231 = new Materia { PlanId = plan.Id, Sigla = "ISW-231", Nombre = "Interacción Humano-Computador", Semestre = 4, Creditos = 5 };
            var sis131 = new Materia { PlanId = plan.Id, Sigla = "SIS-131", Nombre = "Arquitectura de computadoras", Semestre = 4, Creditos = 5 };
            var mat301 = new Materia { PlanId = plan.Id, Sigla = "MAT-301", Nombre = "Análisis de algoritmos", Semestre = 4, Creditos = 6 };
            var isw232 = new Materia { PlanId = plan.Id, Sigla = "ISW-232", Nombre = "Gráficos por computador", Semestre = 4, Creditos = 5 };
            var isw211 = new Materia { PlanId = plan.Id, Sigla = "ISW-211", Nombre = "Diseño de software", Semestre = 4, Creditos = 6 };
            var fhc202 = new Materia { PlanId = plan.Id, Sigla = "FHC-202", Nombre = "Cristología y Biblia", Semestre = 4, Creditos = 5 };

            var isw311 = new Materia { PlanId = plan.Id, Sigla = "ISW-311", Nombre = "Arquitectura de Software", Semestre = 5, Creditos = 5 };
            var isw212 = new Materia { PlanId = plan.Id, Sigla = "ISW-212", Nombre = "Software Quality Assurance I", Semestre = 5, Creditos = 5 };
            var sis132 = new Materia { PlanId = plan.Id, Sigla = "SIS-132", Nombre = "Sistemas Operativos", Semestre = 5, Creditos = 5 };
            var isw233 = new Materia { PlanId = plan.Id, Sigla = "ISW-233", Nombre = "Aplicaciones Web I", Semestre = 5, Creditos = 5 };
            var isw213 = new Materia { PlanId = plan.Id, Sigla = "ISW-213", Nombre = "Taller de diseño de software I", Semestre = 5, Creditos = 5 };
            var isw221 = new Materia { PlanId = plan.Id, Sigla = "ISW-221", Nombre = "Inteligencia Artificial", Semestre = 5, Creditos = 5 };

            await context.Materias.AddRangeAsync(
                fis111, mat123, car100, sis111, isw111, mat132,
                mat133, mat142, mat122, sis112, sis122, fhc101,
                ind260, mat262, sis211, sis212, sis221, isw112,
                isw231, sis131, mat301, isw232, isw211, fhc202,
                isw311, isw212, sis132, isw233, isw213, isw221
            );

            await context.SaveChangesAsync();

            var prerrequisitos = new List<MateriaPrerrequisito>
            {
                new MateriaPrerrequisito { MateriaId = mat133.Id, PrerrequisitoId = mat132.Id },
                new MateriaPrerrequisito { MateriaId = mat142.Id, PrerrequisitoId = mat132.Id },
                new MateriaPrerrequisito { MateriaId = mat122.Id, PrerrequisitoId = mat123.Id },
                new MateriaPrerrequisito { MateriaId = sis112.Id, PrerrequisitoId = sis111.Id },
                new MateriaPrerrequisito { MateriaId = sis122.Id, PrerrequisitoId = sis111.Id },

                new MateriaPrerrequisito { MateriaId = ind260.Id, PrerrequisitoId = car100.Id },
                new MateriaPrerrequisito { MateriaId = mat262.Id, PrerrequisitoId = mat123.Id },
                new MateriaPrerrequisito { MateriaId = mat262.Id, PrerrequisitoId = mat133.Id },
                new MateriaPrerrequisito { MateriaId = sis211.Id, PrerrequisitoId = mat122.Id },
                new MateriaPrerrequisito { MateriaId = sis211.Id, PrerrequisitoId = sis112.Id },
                new MateriaPrerrequisito { MateriaId = sis212.Id, PrerrequisitoId = sis112.Id },
                new MateriaPrerrequisito { MateriaId = sis221.Id, PrerrequisitoId = sis122.Id },
                new MateriaPrerrequisito { MateriaId = isw112.Id, PrerrequisitoId = isw111.Id },

                new MateriaPrerrequisito { MateriaId = mat301.Id, PrerrequisitoId = sis211.Id },
                new MateriaPrerrequisito { MateriaId = isw232.Id, PrerrequisitoId = mat123.Id },
                new MateriaPrerrequisito { MateriaId = isw211.Id, PrerrequisitoId = isw112.Id },

                new MateriaPrerrequisito { MateriaId = isw311.Id, PrerrequisitoId = isw211.Id },
                new MateriaPrerrequisito { MateriaId = isw212.Id, PrerrequisitoId = isw211.Id },
                new MateriaPrerrequisito { MateriaId = sis132.Id, PrerrequisitoId = sis131.Id },
                new MateriaPrerrequisito { MateriaId = isw233.Id, PrerrequisitoId = sis212.Id },
                new MateriaPrerrequisito { MateriaId = isw233.Id, PrerrequisitoId = sis221.Id },
                new MateriaPrerrequisito { MateriaId = isw213.Id, PrerrequisitoId = isw211.Id },
                new MateriaPrerrequisito { MateriaId = isw221.Id, PrerrequisitoId = mat142.Id },
                new MateriaPrerrequisito { MateriaId = isw221.Id, PrerrequisitoId = mat301.Id }
            };

            await context.MateriasPrerrequisitos.AddRangeAsync(prerrequisitos);
            await context.SaveChangesAsync();
        }
    }
}
