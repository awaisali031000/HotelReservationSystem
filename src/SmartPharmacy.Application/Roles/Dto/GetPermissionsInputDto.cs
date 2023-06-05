using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Roles.Dto
{
    public class GetPermissionsInputDto
    {
        [Required]
        public int RoleId { get; set; }
    }
}
