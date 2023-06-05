using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SmartPharmacy.Rooms.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Rooms
{
    public interface IRoomAppService : IAsyncCrudAppService<RoomDto, int, PagedRoomResultRequestDto, CreateRoomDto, RoomDto>
    {
    }
}
