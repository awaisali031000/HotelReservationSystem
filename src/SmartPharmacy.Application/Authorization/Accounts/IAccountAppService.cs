using System.Threading.Tasks;
using Abp.Application.Services;
using SmartPharmacy.Authorization.Accounts.Dto;

namespace SmartPharmacy.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
        Task ResetPassword(ResetPasswordInputDto resetPasswordInput);
    }
}
