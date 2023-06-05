using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using SmartPharmacy.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Brands.Dto
{
    [AutoMapTo(typeof(Brand))]
    public class BrandDto : EntityDto<int>
    {
        [StringLength(Brand.MaxNameLength)]
        public string Name { get; set; }

        [StringLength(Brand.MaxLogoLength)]
        public string Logo { get; set; }
    }
}
