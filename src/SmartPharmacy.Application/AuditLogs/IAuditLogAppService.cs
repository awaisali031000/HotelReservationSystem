using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SmartPharmacy.AuditLogs.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.AuditLogs
{
    public interface IAuditLogAppService : IApplicationService
    {
        Task<PagedResultDto<PagedAuditLogResultResponseDto>> GetAll(PagedAuditLogResultRequestDto input);
    }
}
