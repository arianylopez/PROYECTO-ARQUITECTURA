using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Services
{
    public class ArticulosService : IArticulosService
    {
        private readonly IArticulosRepository _repository;

        public ArticulosService(IArticulosRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ArticuloPublicoDTO>> ObtenerArticulosPublicadosAsync(string? categoria)
        {
            var articulos = await _repository.ObtenerPublicadosAsync(categoria);
            return articulos.Select(a => new ArticuloPublicoDTO
            {
                Id = a.Id,
                Titulo = a.Titulo,
                Autor = a.Autor,
                Categoria = a.Categoria,
                Contenido = a.Contenido,
                ImageUrl = a.ImageUrl,
                TiempoLectura = a.TiempoLectura,
                FechaPublicacion = a.FechaPublicacion
            }).ToList();
        }

        public async Task<IEnumerable<ArticuloPublicoDTO>> ObtenerArticulosPendientesAsync()
        {
            var articulos = await _repository.ObtenerPendientesAsync();
            return articulos.Select(a => new ArticuloPublicoDTO
            {
                Id = a.Id,
                Titulo = a.Titulo,
                Autor = a.Autor,
                Categoria = a.Categoria,
                Contenido = a.Contenido,
                ImageUrl = a.ImageUrl,
                TiempoLectura = a.TiempoLectura,
                FechaPublicacion = a.FechaPublicacion
            }).ToList();
        }

        public async Task<ArticuloPublicoDTO?> ObtenerArticuloPorIdAsync(Guid id)
        {
            var a = await _repository.GetByIdAsync(id);
            if (a == null) return null;

            return new ArticuloPublicoDTO
            {
                Id = a.Id,
                Titulo = a.Titulo,
                Autor = a.Autor,
                Categoria = a.Categoria,
                Contenido = a.Contenido,
                ImageUrl = a.ImageUrl,
                TiempoLectura = a.TiempoLectura,
                FechaPublicacion = a.FechaPublicacion
            };
        }

        public async Task<ArticuloPublicoDTO> EnviarArticuloAsync(ArticuloCreateDTO dto)
        {
            var articulo = new Articulo
            {
                Titulo = dto.Titulo,
                Autor = dto.Autor,
                Categoria = dto.Categoria,
                Contenido = dto.Contenido,
                ImageUrl = dto.ImageUrl,
                TiempoLectura = dto.TiempoLectura,
                Estado = "Pendiente"
            };

            var created = await _repository.AddAsync(articulo);

            return new ArticuloPublicoDTO
            {
                Id = created.Id,
                Titulo = created.Titulo,
                Autor = created.Autor,
                Categoria = created.Categoria,
                Contenido = created.Contenido,
                ImageUrl = created.ImageUrl,
                TiempoLectura = created.TiempoLectura
            };
        }

        public async Task CambiarEstadoArticuloAsync(Guid id, ArticuloEstadoDTO dto)
        {
            var articulo = await _repository.GetByIdAsync(id);
            if (articulo == null) throw new KeyNotFoundException();

            articulo.Estado = dto.Estado;
            if (dto.Estado == "Publicado" && articulo.FechaPublicacion == null)
            {
                articulo.FechaPublicacion = DateTime.UtcNow;
            }
            articulo.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(articulo);
        }

        public async Task EliminarArticuloAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task ActualizarArticuloAsync(Guid id, ArticuloCreateDTO dto)
        {
            var articulo = await _repository.GetByIdAsync(id);
            if (articulo == null) throw new Exception("Artículo no encontrado");

            articulo.Titulo = dto.Titulo;
            articulo.Autor = dto.Autor;
            articulo.Categoria = dto.Categoria;
            articulo.Contenido = dto.Contenido;
            articulo.ImageUrl = dto.ImageUrl;
            articulo.TiempoLectura = dto.TiempoLectura;
            articulo.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(articulo);
        }
    }
}