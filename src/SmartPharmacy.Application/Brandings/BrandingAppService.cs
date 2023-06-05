using Abp.Application.Services;
using SmartPharmacy.Entities;
using SmartPharmacy.Brandings.Dto;
using SmartPharmacy.Brandings;
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

namespace SmartPharmacy.Brandings
{
    public class BrandingAppService : AsyncCrudAppService<Branding, BrandingDto, int, PagedBrandingResultRequestDto, CreateBrandingDto, BrandingDto>,
        IBrandingAppService
    {
        private readonly IRepository<Branding, int> _repository;

        public BrandingAppService(IRepository<Branding, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override async Task<BrandingDto> CreateAsync(CreateBrandingDto input)
        {

            var branding = ObjectMapper.Map<Branding>(input);

            branding.TenantId = AbpSession.TenantId;
            CheckErrors(await Repository.InsertAsync(branding));
            return MapToEntityDto(branding);
        }

        protected override IQueryable<Branding> CreateFilteredQuery(PagedBrandingResultRequestDto input)
        {


            return (IQueryable<Branding>)Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.HotelName.Contains(input.Keyword));
        }

        protected override IQueryable<Branding> ApplySorting(IQueryable<Branding> query, PagedBrandingResultRequestDto input)
        {
            return query.OrderBy(r => r.HotelName);
        }

        public override async Task DeleteAsync(EntityDto<int> input)
        {
            CheckDeletePermission();

            var branding = await Repository.GetAsync(input.Id);

            if (branding == null)
            {
                throw new UserFriendlyException(this.L("DataNotFound"));
            }

            await Repository.DeleteAsync(branding);
        }
        public override async Task<BrandingDto> UpdateAsync(BrandingDto input)
        {
            CheckUpdatePermission();

            var branding = await Repository.GetAsync(input.Id);

            ObjectMapper.Map(input, branding);

            CheckErrors(await Repository.UpdateAsync(branding));

            return MapToEntityDto(branding);
        }

        protected virtual void CheckErrors(Branding branding)
        {
            if (branding != null && branding.Id > 0)
            {
                return;
            }
        }



        public async Task<ListResultDto<BrandingDto>> GetAllList()
        {
            var branding = await _repository.GetAllListAsync();
            return new ListResultDto<BrandingDto>(ObjectMapper.Map<List<BrandingDto>>(branding));
        }

        public override Task<PagedResultDto<BrandingDto>> GetAllAsync(PagedBrandingResultRequestDto input)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {

                var query = Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.HotelName.Contains(input.Keyword));

                return Task.FromResult(new PagedResultDto<BrandingDto>
                {
                    Items = ObjectMapper.Map<IReadOnlyList<BrandingDto>>(query
                    .OrderByDescending(x => x.Id)
                    .Skip(input.SkipCount)
                    .Take(input.MaxResultCount)),
                    TotalCount = query.Count()
                });

            }
        }
    }
}
