using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.AuditLogs.Dto
{
    public class PagedAuditLogResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool ExceptionOnly { get; set; }
        public int TenantId { get; set; }

        public int UserId { get; set; }
    }
}
