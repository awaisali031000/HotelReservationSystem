using Abp.Application.Editions;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Editions.Dto
{
    public class EditionMapProfile : Profile
    {
        public EditionMapProfile()
        {
            CreateMap<CreateEditionDto, Edition>();

            CreateMap<EditionDto, Edition>();

            CreateMap<Edition, EditionDto>();
        }
    }
}
