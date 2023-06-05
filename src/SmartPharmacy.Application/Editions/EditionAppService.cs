using Abp.Application.Editions;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.UI;
using SmartPharmacy.Authorization;
using SmartPharmacy.Editions.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Editions
{
    public class EditionAppService : AsyncCrudAppService<Edition, EditionDto, int, PagedEditionResultRequestDto, CreateEditionDto, EditionDto>, IEditionAppService
    {
        private readonly EditionManager _editionManager;
        private readonly IRepository<Edition, int> _repository;
        public EditionAppService(EditionManager editionManager,
            IRepository<Edition, int> repository) : base(repository)
        {
            _editionManager = editionManager;
            _repository = repository;
        }

        public override async Task<EditionDto> CreateAsync(CreateEditionDto input)
        {
            CheckCreatePermission();
            CheckEdition(input.Name);

            var edition = ObjectMapper.Map<Edition>(input);
            await _repository.InsertAsync(edition);
            return MapToEntityDto(edition);
        }
        private void CheckEdition(string name)
        {
            int count = _repository.GetAll().Where(x => x.Name == name).Count();
            if (count > 0)
                throw new UserFriendlyException("Error");
        }


        protected override IQueryable<Edition> CreateFilteredQuery(PagedEditionResultRequestDto input)
        {
            return (IQueryable<Edition>)_repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword)
                || x.DisplayName.Contains(input.Keyword));
        }

        protected override IQueryable<Edition> ApplySorting(IQueryable<Edition> query, PagedEditionResultRequestDto input)
        {
            return query.OrderBy(r => r.Name);
        }

        public override async Task DeleteAsync(EntityDto<int> input)
        {
            CheckDeletePermission();

            var edition = await _repository.GetAsync(input.Id);

            if (edition == null)
            {
                throw new UserFriendlyException(this.L("DataNotFound"));
            }

            await _repository.DeleteAsync(edition);
        }

        public override async Task<EditionDto> UpdateAsync(EditionDto input)
        {
            CheckUpdatePermission();

            var edition = await _repository.GetAsync(input.Id);

            ObjectMapper.Map(input, edition);

            CheckErrors(await _repository.UpdateAsync(edition));

            return MapToEntityDto(edition);
        }

        protected virtual void CheckErrors(Edition edition)
        {
            if (edition != null && edition.Id > 0)
            {
                return;
            }
        }

        public List<EditionDto> GetAllList()
        {
            return ObjectMapper.Map<List<EditionDto>>(_repository.GetAllList());
        }

        public async Task SetFeatures(SetFeatureDto input)
        {
            await _editionManager.SetFeatureValuesAsync(input.editionId, input.features);
        }

        public async Task<IReadOnlyList<Abp.NameValue>> GetFeatures(GetFeaturesInputDto input)
        {
            return await _editionManager.GetFeatureValuesAsync(input.EditionId);
        }

        public override Task<PagedResultDto<EditionDto>> GetAllAsync(PagedEditionResultRequestDto input)
        {

            var query = Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword));

            return Task.FromResult(new PagedResultDto<EditionDto>
            {
                Items = ObjectMapper.Map<IReadOnlyList<EditionDto>>(query
                .OrderByDescending(x => x.Id)
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)),
                TotalCount = query.Count()
            });


        }
    }
}
