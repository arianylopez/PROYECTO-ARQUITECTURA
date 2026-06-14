using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortalInfoSoftware.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InicializacionMallaCurricular : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlanesEstudio",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    IsCurrent = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanesEstudio", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Materias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PlanId = table.Column<Guid>(type: "uuid", nullable: false),
                    PlanEstudiosId = table.Column<Guid>(type: "uuid", nullable: false),
                    Sigla = table.Column<string>(type: "text", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Semestre = table.Column<int>(type: "integer", nullable: false),
                    Creditos = table.Column<int>(type: "integer", nullable: true),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Objetivos = table.Column<string>(type: "text", nullable: false),
                    Contenidos = table.Column<string>(type: "text", nullable: false),
                    Competencias = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Materias_PlanesEstudio_PlanEstudiosId",
                        column: x => x.PlanEstudiosId,
                        principalTable: "PlanesEstudio",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MateriasPrerrequisitos",
                columns: table => new
                {
                    MateriaId = table.Column<Guid>(type: "uuid", nullable: false),
                    PrerrequisitoId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MateriasPrerrequisitos", x => new { x.MateriaId, x.PrerrequisitoId });
                    table.ForeignKey(
                        name: "FK_MateriasPrerrequisitos_Materias_MateriaId",
                        column: x => x.MateriaId,
                        principalTable: "Materias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MateriasPrerrequisitos_Materias_PrerrequisitoId",
                        column: x => x.PrerrequisitoId,
                        principalTable: "Materias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Materias_PlanEstudiosId",
                table: "Materias",
                column: "PlanEstudiosId");

            migrationBuilder.CreateIndex(
                name: "IX_Materias_Sigla",
                table: "Materias",
                column: "Sigla",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MateriasPrerrequisitos_PrerrequisitoId",
                table: "MateriasPrerrequisitos",
                column: "PrerrequisitoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MateriasPrerrequisitos");

            migrationBuilder.DropTable(
                name: "Materias");

            migrationBuilder.DropTable(
                name: "PlanesEstudio");
        }
    }
}
