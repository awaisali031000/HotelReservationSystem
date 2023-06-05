using Abp.MultiTenancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Users.Dto
{
    public class GetUserAllPermissionsInputDto
    {
        public MultiTenancySides? MultiTenancySide { get; set; }
    }
}
