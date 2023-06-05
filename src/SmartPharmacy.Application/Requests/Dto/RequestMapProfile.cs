using AutoMapper;
using SmartPharmacy.Entities;
using SmartPharmacy.Rooms.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Requests.Dto
{
    public class RequestMapProfile : Profile
    {
        public RequestMapProfile()
        {
            CreateMap<CreateRequestDto, Request>();

            CreateMap<Request, RequestDto>();

            CreateMap<RequestDto, Request>();
        }
    }
}
