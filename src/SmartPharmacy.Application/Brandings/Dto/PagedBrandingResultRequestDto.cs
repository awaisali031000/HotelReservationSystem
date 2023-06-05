using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Brandings.Dto
{
    public class PagedBrandingResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
