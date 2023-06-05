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
    public class Branding : FullAuditedEntity, IMayHaveTenant
    {
        public const int MinPhoneNumberLength = 11;
        public const int MaxPhoneNumberLength = 13;
        public const int MaxNameLength = 100;
        [Required]
        [StringLength(MaxNameLength)]
        public string HotelName { get; set; }
        [Required]
        [DataType(DataType.PhoneNumber)]
        [MinLength(MinPhoneNumberLength)]
        [MaxLength(MaxPhoneNumberLength)]
        public string PhoneNumber { get; set; }
        [Required]
        public string HotelAddress { get; set; }
        public string HotelDescription { get; set; }
        public string Image { get; set; }
        public int? TenantId { get; set; }
    }
}
