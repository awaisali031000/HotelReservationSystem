using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.MultiTenancy.Dto
{
    public class SetTenantFeatureDto
    {
        public int TenantId { get; set; }

        public Abp.NameValue[] Features { get; set; }
    }
}
