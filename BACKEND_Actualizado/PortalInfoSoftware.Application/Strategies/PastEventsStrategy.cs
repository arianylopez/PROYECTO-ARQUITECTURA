using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Strategies
{
    public class PastEventsStrategy : IEventFilterStrategy
    {
        public IQueryable<Evento> AplicarFiltro(IQueryable<Evento> query)
        {
            return query.Where(e => e.FechaFin < DateTime.UtcNow)
                        .OrderByDescending(e => e.FechaFin);
        }
    }
}