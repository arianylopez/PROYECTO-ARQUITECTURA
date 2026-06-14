using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Strategies
{
    public interface IEventFilterStrategy
    {
        IQueryable<Evento> AplicarFiltro(IQueryable<Evento> query);
    }
}