using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Rooms.Dto
{
    public class PagedRoomResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
