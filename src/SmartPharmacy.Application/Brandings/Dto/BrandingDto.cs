using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SmartPharmacy.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Brandings.Dto
{
    [AutoMapTo(typeof(Branding))]
    public class BrandingDto : EntityDto<int>
    {
        [Required]
        public string HotelName { get; set; }
        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
        [Required]
        public string HotelAddress { get; set; }
        public string HotelDescription { get; set; }
        public string Image { get; set; }
    }
}
