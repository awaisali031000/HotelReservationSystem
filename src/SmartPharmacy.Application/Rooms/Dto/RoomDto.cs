using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SmartPharmacy.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Rooms.Dto
{
    [AutoMapTo(typeof(Room))]
    public class RoomDto : EntityDto<int>
    {
        [Required]
        public string RoomName { get; set; }
        [Required]
        public int RoomNumber { get; set; }
        [Required]
        [StringLength(Room.MaxNameLength)]
        public string CategoryName { get; set; }
        [Required]
        public int Price { get; set; }

        [StringLength(Room.MaxImageLength)]
        public string Image { get; set; }
    }
}
