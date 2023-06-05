using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Users.Dto
{
    [AutoMapFrom(typeof(Permission))]
    public class UserPermissionDto : EntityDto<long>
    {
        public string Parent { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
    }
}
