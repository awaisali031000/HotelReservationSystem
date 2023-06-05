using System.Threading.Tasks;
using Abp.Application.Services;
using SmartPharmacy.Sessions.Dto;

namespace SmartPharmacy.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
