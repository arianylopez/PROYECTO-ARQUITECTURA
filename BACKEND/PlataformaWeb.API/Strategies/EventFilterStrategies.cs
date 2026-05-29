using PlataformaWeb.API.Models;

namespace PlataformaWeb.API.Strategies
{
    public interface IEventFilterStrategy
    {
        IQueryable<Post> ApplyFilter(IQueryable<Post> query);
    }

    // Estrategia 1: Eventos Próximos (Desde hoy en adelante, ordenados por los más cercanos)
    public class UpcomingEventsStrategy : IEventFilterStrategy
    {
        public IQueryable<Post> ApplyFilter(IQueryable<Post> query)
        {
            return query.Where(p => p.Type == "EVENT" && p.EventStartDate >= DateTime.UtcNow)
                        .OrderBy(p => p.EventStartDate);
        }
    }

    // Estrategia 2: Eventos Históricos / Pasados (Ordenados del más reciente al más antiguo)
    public class HistoricalEventsStrategy : IEventFilterStrategy
    {
        public IQueryable<Post> ApplyFilter(IQueryable<Post> query)
        {
            return query.Where(p => p.Type == "EVENT" && p.EventStartDate < DateTime.UtcNow)
                        .OrderByDescending(p => p.EventStartDate);
        }
    }
}