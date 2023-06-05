using Abp.Application.Services;
using SmartPharmacy.Requests.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Requests
{
    public interface IRequestAppService : IAsyncCrudAppService<RequestDto, int, PagedRequestResultRequestDto, CreateRequestDto, RequestDto>
    {
    }
}
