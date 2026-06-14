using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Strategies
{
    public class UpcomingEventsStrategy : IEventFilterStrategy
    {
        public IQueryable<Evento> AplicarFiltro(IQueryable<Evento> query)
        {
            return query.Where(e => e.FechaInicio >= DateTime.UtcNow)
                        .OrderBy(e => e.FechaInicio);
        }
    }
}