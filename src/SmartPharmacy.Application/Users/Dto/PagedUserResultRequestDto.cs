﻿using Abp.Application.Services.Dto;
using System;

namespace SmartPharmacy.Users.Dto
{
    //custom PagedResultRequestDto
    public class PagedUserResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
        public int? TenantId { get; set; }


    }
}
