using Abp.Authorization;
using SmartPharmacy.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Users.Dto
{
    public class SetUserPermissionsInputDto
    {
        public int? TenantId { get; set; }
        public string UserId { get; set; }
        public List<string> Permissions { get; set; }

    }
}
