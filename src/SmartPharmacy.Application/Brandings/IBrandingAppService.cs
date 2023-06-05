using Abp.Application.Services;
using SmartPharmacy.Brandings.Dto;
using SmartPharmacy.Rooms.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Brandings
{
    public interface IBrandingAppService : IAsyncCrudAppService<BrandingDto, int, PagedBrandingResultRequestDto, CreateBrandingDto, BrandingDto>
    {
    }
}
