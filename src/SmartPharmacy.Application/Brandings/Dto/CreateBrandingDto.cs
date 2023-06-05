using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Brandings.Dto
{
    public class CreateBrandingDto
    {
        [Required]
        public string HotelName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string HotelAddress { get; set; }
        public string HotelDescription { get; set; }
        public string Image { get; set; }
    }
}
