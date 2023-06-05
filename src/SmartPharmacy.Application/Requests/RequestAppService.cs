using Abp.Application.Services;
using SmartPharmacy.Entities;
using SmartPharmacy.Requests.Dto;
using SmartPharmacy.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.UI;
using Abp.Collections.Extensions;
using Abp.Extensions;

namespace SmartPharmacy.Requests
{
    public class RequestAppService : AsyncCrudAppService<Request, RequestDto, int, PagedRequestResultRequestDto, CreateRequestDto, RequestDto>,
        IRequestAppService
    {
        private readonly IRepository<Request, int> _repository;

        public RequestAppService(IRepository<Request, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override async Task<RequestDto> CreateAsync(CreateRequestDto input)
        {
            CheckCreatePermission();


            var request = ObjectMapper.Map<Request>(input);
            CheckErrors(await Repository.InsertAsync(request));
            return MapToEntityDto(request);
        }

        protected override IQueryable<Request> CreateFilteredQuery(PagedRequestResultRequestDto input)
        {


            return (IQueryable<Request>)Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.RoomName.Contains(input.Keyword));
        }

        protected override IQueryable<Request> ApplySorting(IQueryable<Request> query, PagedRequestResultRequestDto input)
        {
            return query.OrderBy(r => r.RoomName);
        }

        public override async Task DeleteAsync(EntityDto<int> input)
        {
            CheckDeletePermission();

            var request = await Repository.GetAsync(input.Id);

            if (request == null)
            {
                throw new UserFriendlyException(this.L("DataNotFound"));
            }

            await Repository.DeleteAsync(request);
        }
        public override async Task<RequestDto> UpdateAsync(RequestDto input)
        {
            CheckUpdatePermission();

            var request = await Repository.GetAsync(input.Id);

            ObjectMapper.Map(input, request);

            CheckErrors(await Repository.UpdateAsync(request));

            return MapToEntityDto(request);
        }

        protected virtual void CheckErrors(Request request)
        {
            if (request != null && request.Id > 0)
            {
                return;
            }
        }



        public async Task<ListResultDto<RequestDto>> GetAllList()
        {
            var request = await _repository.GetAllListAsync();
            return new ListResultDto<RequestDto>(ObjectMapper.Map<List<RequestDto>>(request));
        }

        public override Task<PagedResultDto<RequestDto>> GetAllAsync(PagedRequestResultRequestDto input)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {

                var query = Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.RoomName.Contains(input.Keyword));

                return Task.FromResult(new PagedResultDto<RequestDto>
                {
                    Items = ObjectMapper.Map<IReadOnlyList<RequestDto>>(query
                    .OrderByDescending(x => x.Id)
                    .Skip(input.SkipCount)
                    .Take(input.MaxResultCount)),
                    TotalCount = query.Count()
                });

            }
        }
    }
}
