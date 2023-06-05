using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SmartPharmacy.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Requests.Dto
{
    [AutoMapTo(typeof(Request))]
    public class RequestDto : EntityDto<int>
    {
        [Required]
        public string RoomName { get; set; }
        [Required]
        public int RoomNumber { get; set; }
        [Required]
        [StringLength(Request.MaxNameLength)]
        public string CategoryName { get; set; }
        [Required]
        public int Price { get; set; }
    }
}
