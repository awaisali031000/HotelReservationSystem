using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using SmartPharmacy.AuditLogs.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.AuditLogs
{
    public class AuditLogAppService : ApplicationService, IAuditLogAppService
    {

        private readonly IRepository<AuditLog, long> _repository;

        public AuditLogAppService(IRepository<AuditLog, long> repository)
        {
            _repository = repository;
        }

        public Task<PagedResultDto<PagedAuditLogResultResponseDto>> GetAll(PagedAuditLogResultRequestDto input)
        {
            var list = _repository.GetAll()
                .WhereIf(input.ExceptionOnly, x => !string.IsNullOrEmpty(x.Exception))
                .WhereIf(input.TenantId > 0, x => x.TenantId == input.TenantId)
                .WhereIf(input.UserId > 0, x => x.UserId == input.UserId);
            int totalCount = list.Count();
            var pagedList = list.OrderByDescending(x => x.Id)
                .PageBy(input)
                .ToList();
            return Task.FromResult(new PagedResultDto<PagedAuditLogResultResponseDto>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<PagedAuditLogResultResponseDto>>(pagedList)
            });
        }
    }
}
