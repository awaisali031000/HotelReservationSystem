using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Brands.Dto
{
    public class PagedBrandResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
