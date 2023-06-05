using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SmartPharmacy.MultiTenancy.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartPharmacy.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
        PagedResultDto<PagedTenantResultDto> GetTenants(PagedTenantResultRequestDto input);

        Task SetFeature(SetTenantFeatureDto input);
        Task<IReadOnlyList<Abp.NameValue>> GetFeatures(GetFeaturesInputDto input);
    }
}

