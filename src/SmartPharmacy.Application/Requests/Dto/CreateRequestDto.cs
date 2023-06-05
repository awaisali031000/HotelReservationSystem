using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Requests.Dto
{
    public class CreateRequestDto
    {
        [Required]
        public int RoomNumber { get; set; }
        [Required]
        public string RoomName { get; set; }
        [Required]
        public string CategoryName { get; set; }
        [Required]
        public int Price { get; set; }
    }
}
