using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Requests.Dto
{
    public class PagedRequestResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
