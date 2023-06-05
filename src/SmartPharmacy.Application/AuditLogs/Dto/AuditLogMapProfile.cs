using Abp.Auditing;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.AuditLogs.Dto
{
    public class AuditLogMapProfile : Profile
    {
        public AuditLogMapProfile()
        {
            CreateMap<AuditLog, PagedAuditLogResultResponseDto>();
        }
    }
}
