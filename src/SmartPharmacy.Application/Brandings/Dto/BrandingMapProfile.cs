using AutoMapper;
using SmartPharmacy.Entities;
using SmartPharmacy.Rooms.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Brandings.Dto
{
    public class BrandingMapProfile : Profile
    {
        public BrandingMapProfile()
        {
            CreateMap<CreateBrandingDto, Branding>();

            CreateMap<Branding, BrandingDto>();

            CreateMap<BrandingDto, Branding>();
        }
    }
}
