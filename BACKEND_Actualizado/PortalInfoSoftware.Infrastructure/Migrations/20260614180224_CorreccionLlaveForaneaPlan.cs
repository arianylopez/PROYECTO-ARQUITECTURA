using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortalInfoSoftware.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CorreccionLlaveForaneaPlan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materias_PlanesEstudio_PlanEstudiosId",
                table: "Materias");

            migrationBuilder.DropIndex(
                name: "IX_Materias_PlanEstudiosId",
                table: "Materias");

            migrationBuilder.DropColumn(
                name: "PlanEstudiosId",
                table: "Materias");

            migrationBuilder.CreateIndex(
                name: "IX_Materias_PlanId",
                table: "Materias",
                column: "PlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materias_PlanesEstudio_PlanId",
                table: "Materias",
                column: "PlanId",
                principalTable: "PlanesEstudio",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materias_PlanesEstudio_PlanId",
                table: "Materias");

            migrationBuilder.DropIndex(
                name: "IX_Materias_PlanId",
                table: "Materias");

            migrationBuilder.AddColumn<Guid>(
                name: "PlanEstudiosId",
                table: "Materias",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Materias_PlanEstudiosId",
                table: "Materias",
                column: "PlanEstudiosId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materias_PlanesEstudio_PlanEstudiosId",
                table: "Materias",
                column: "PlanEstudiosId",
                principalTable: "PlanesEstudio",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
