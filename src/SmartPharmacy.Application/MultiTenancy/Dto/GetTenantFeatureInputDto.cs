using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.MultiTenancy.Dto
{
    public class GetFeaturesInputDto
    {
        [Required]
        public int TenantId { get; set; }
    }
}
