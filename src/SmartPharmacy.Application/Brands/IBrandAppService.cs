using Abp.Application.Services;
using SmartPharmacy.Brands.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Brands
{
    public interface IBrandAppService : IAsyncCrudAppService<BrandDto, int, PagedBrandResultRequestDto, CreateBrandDto, BrandDto>
    {
    }
}
