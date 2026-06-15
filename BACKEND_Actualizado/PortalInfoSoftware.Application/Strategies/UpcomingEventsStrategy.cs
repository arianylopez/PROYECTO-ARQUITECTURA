using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Strategies
{
    public class UpcomingEventsStrategy : IEventFilterStrategy
    {
        public IQueryable<Evento> AplicarFiltro(IQueryable<Evento> query)
        {
            return query.Where(e => e.FechaFin >= DateTime.UtcNow)
                        .OrderBy(e => e.FechaInicio);
        }
    }
}