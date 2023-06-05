using Abp.Application.Editions;
using Abp.Application.Services;
using SmartPharmacy.Editions.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Editions
{
    public interface IEditionAppService : IAsyncCrudAppService<EditionDto, int, PagedEditionResultRequestDto, CreateEditionDto, EditionDto>
    {
        List<EditionDto> GetAllList();

        Task SetFeatures(SetFeatureDto input);
        Task<IReadOnlyList<Abp.NameValue>> GetFeatures(GetFeaturesInputDto input);
    }
}
