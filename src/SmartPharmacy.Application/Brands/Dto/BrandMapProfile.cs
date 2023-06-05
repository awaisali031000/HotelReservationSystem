using AutoMapper;
using SmartPharmacy.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Brands.Dto
{
    public class BrandMapProfile: Profile
    {
        public BrandMapProfile()
        {
            CreateMap<CreateBrandDto, Brand>();

            CreateMap<Brand, BrandDto>();

            CreateMap<BrandDto, Brand>();
        }
    }
}
