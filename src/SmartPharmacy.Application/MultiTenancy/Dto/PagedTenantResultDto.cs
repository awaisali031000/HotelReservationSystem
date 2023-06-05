using Abp.Application.Editions;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.MultiTenancy.Dto
{
    public class PagedTenantResultDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TenancyName { get; set; }
        public int? EditionId { get; set; }
        public string EditionName { get; set; }
    }
}
