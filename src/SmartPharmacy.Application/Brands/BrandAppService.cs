using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.ObjectMapping;
using Abp.UI;
using SmartPharmacy.Authorization;
using SmartPharmacy.Authorization.Roles;
using SmartPharmacy.Brands.Dto;
using SmartPharmacy.Entities;
using SmartPharmacy.Roles.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Brands
{
    public class BrandAppService : AsyncCrudAppService<Brand, BrandDto, int, PagedBrandResultRequestDto, CreateBrandDto, BrandDto>,
        IBrandAppService
    {
        private readonly IRepository<Brand, int> _repository;

        public BrandAppService(IRepository<Brand, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override async Task<BrandDto> CreateAsync(CreateBrandDto input)
        {
            CheckCreatePermission();
            CheckProductBrandName(input.Name);


            var brand = ObjectMapper.Map<Brand>(input);

            brand.TenantId = AbpSession.TenantId;
            CheckErrors(await Repository.InsertAsync(brand));
            return MapToEntityDto(brand);
        }
        private void CheckProductBrandName(string name)
        {
            int count = _repository.GetAll().Where(x => x.Name == name).Count();
            if (count > 0)
                throw new UserFriendlyException("Error");
        }

        protected override IQueryable<Brand> CreateFilteredQuery(PagedBrandResultRequestDto input)
        {


            return (IQueryable<Brand>)Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword));
        }

        protected override IQueryable<Brand> ApplySorting(IQueryable<Brand> query, PagedBrandResultRequestDto input)
        {
            return query.OrderBy(r => r.Name);
        }

        public override async Task DeleteAsync(EntityDto<int> input)
        {
            CheckDeletePermission();

            var brand = await Repository.GetAsync(input.Id);

            if (brand == null)
            {
                throw new UserFriendlyException(this.L("DataNotFound"));
            }

            await Repository.DeleteAsync(brand);
        }
        public override async Task<BrandDto> UpdateAsync(BrandDto input)
        {
            CheckUpdatePermission();

            var brand = await Repository.GetAsync(input.Id);

            ObjectMapper.Map(input, brand);

            CheckErrors(await Repository.UpdateAsync(brand));

            return MapToEntityDto(brand);
        }

        protected virtual void CheckErrors(Brand brand)
        {
            if (brand != null && brand.Id > 0)
            {
                return;
            }
        }



        public async Task<ListResultDto<BrandDto>> GetAllList()
        {
            var brand = await _repository.GetAllListAsync();
            return new ListResultDto<BrandDto>(ObjectMapper.Map<List<BrandDto>>(brand));
        }

        public override Task<PagedResultDto<BrandDto>> GetAllAsync(PagedBrandResultRequestDto input)
        {

            var query = Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword));

            return Task.FromResult(new PagedResultDto<BrandDto>
            {
                Items = ObjectMapper.Map<IReadOnlyList<BrandDto>>(query
                .OrderByDescending(x => x.Id)
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)),
                TotalCount = query.Count()
            });


        }
    }
}
