using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Entities
{
    public class Brand : FullAuditedEntity, IMayHaveTenant
    {
        public const int MaxNameLength = 100;
        public const int MaxLogoLength = 400;

        [StringLength(MaxNameLength)]
        public string Name { get; set; }

        [StringLength(MaxLogoLength)]
        public string Logo { get; set; }
        public int? TenantId { get; set; }
    }
}
