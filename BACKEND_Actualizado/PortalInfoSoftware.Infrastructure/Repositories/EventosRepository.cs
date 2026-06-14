using Microsoft.EntityFrameworkCore;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Application.Strategies;
using PortalInfoSoftware.Domain.Entities;
using PortalInfoSoftware.Infrastructure.Persistence;

namespace PortalInfoSoftware.Infrastructure.Repositories
{
    public class EventosRepository : IEventosRepository
    {
        private readonly ApplicationDbContext _context;

        public EventosRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Evento>> ObtenerEventosConEstrategiaAsync(IEventFilterStrategy strategy)
        {
            var query = _context.Eventos.Where(e => e.IsPublished).AsQueryable();
            query = strategy.AplicarFiltro(query);
            return await query.ToListAsync();
        }

        public async Task<Evento?> GetByIdAsync(Guid id)
        {
            return await _context.Eventos.FirstOrDefaultAsync(e => e.Id == id && e.IsPublished);
        }

        public async Task<Evento> AddAsync(Evento evento)
        {
            await _context.Eventos.AddAsync(evento);
            await _context.SaveChangesAsync();
            return evento;
        }

        public async Task UpdateAsync(Evento evento)
        {
            _context.Eventos.Update(evento);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var evento = await _context.Eventos.FindAsync(id);
            if (evento != null)
            {
                evento.IsPublished = false;
                _context.Eventos.Update(evento);
                await _context.SaveChangesAsync();
            }
        }
    }
}