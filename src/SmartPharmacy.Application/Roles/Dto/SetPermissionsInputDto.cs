using Abp.Authorization;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Roles.Dto
{
    public class SetPermissionsInputDto
    {
        public int RoleId { get; set; }

        public List<string> Permissions { get; set; }

    }
}
