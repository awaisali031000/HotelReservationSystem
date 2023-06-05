using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Users.Dto
{
    public class GetUserPermissionsInputDto
    {
        public int? TenantId { get; set; }
        [Required]
        public string UserId { get; set; }
    }
}
