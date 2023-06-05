using AutoMapper;
using SmartPharmacy.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Rooms.Dto
{
    public class RoomMapProfile : Profile
    {
        public RoomMapProfile()
        {
            CreateMap<CreateRoomDto, Room>();

            CreateMap<Room, RoomDto>();

            CreateMap<RoomDto, Room>();
        }
    }
}
