﻿using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Entities
{
    public class Request : FullAuditedEntity, IMustHaveTenant
    {
        public const int MaxNameLength = 100;
        [Required]
        [StringLength(MaxNameLength)]
        public string RoomName { get; set; }
        [Required]
        public int RoomNumber { get; set; }
        [Required]
        [StringLength(MaxNameLength)]
        public string CategoryName { get; set; }
        [Required]
        public int Price { get; set; }
        public int TenantId { get; set; }
    }
}
