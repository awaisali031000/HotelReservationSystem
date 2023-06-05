using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Authorization;
using System.Collections.Generic;

namespace SmartPharmacy.Roles.Dto
{
    [AutoMapFrom(typeof(Permission))]
    public class PermissionDto : EntityDto<long>
    {
        public string Parent { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
    }
}
