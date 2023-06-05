using Abp.Application.Services;
using SmartPharmacy.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartPharmacy.Rooms.Dto;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.UI;
using Abp.Collections.Extensions;
using Abp.Domain.Uow;

namespace SmartPharmacy.Rooms
{
    public class RoomAppService : AsyncCrudAppService<Room, RoomDto, int, PagedRoomResultRequestDto, CreateRoomDto, RoomDto>,
        IRoomAppService
    {
        private readonly IRepository<Room, int> _repository;

        public RoomAppService(IRepository<Room, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override async Task<RoomDto> CreateAsync(CreateRoomDto input)
        {
            CheckCreatePermission();
            CheckRoomName(input.RoomName);


            var room = ObjectMapper.Map<Room>(input);

            room.TenantId = AbpSession.TenantId;
            CheckErrors(await Repository.InsertAsync(room));
            return MapToEntityDto(room);
        }
        private void CheckRoomName(string name)
        {
            int count = _repository.GetAll().Where(x => x.RoomName == name).Count();
            if (count > 0)
                throw new UserFriendlyException("Error");
        }

        protected override IQueryable<Room> CreateFilteredQuery(PagedRoomResultRequestDto input)
        {


            return (IQueryable<Room>)Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.RoomName.Contains(input.Keyword));
        }

        protected override IQueryable<Room> ApplySorting(IQueryable<Room> query, PagedRoomResultRequestDto input)
        {
            return query.OrderBy(r => r.RoomNumber);
        }

        public override async Task DeleteAsync(EntityDto<int> input)
        {
            CheckDeletePermission();

            var room = await Repository.GetAsync(input.Id);

            if (room == null)
            {
                throw new UserFriendlyException(this.L("DataNotFound"));
            }

            await Repository.DeleteAsync(room);
        }
        public override async Task<RoomDto> UpdateAsync(RoomDto input)
        {
            CheckUpdatePermission();

            var room = await Repository.GetAsync(input.Id);

            ObjectMapper.Map(input, room);

            CheckErrors(await Repository.UpdateAsync(room));

            return MapToEntityDto(room);
        }

        protected virtual void CheckErrors(Room room)
        {
            if (room != null && room.Id > 0)
            {
                return;
            }
        }



        public async Task<ListResultDto<RoomDto>> GetAllList()
        {
            var room = await _repository.GetAllListAsync();
            return new ListResultDto<RoomDto>(ObjectMapper.Map<List<RoomDto>>(room));
        }

        public override Task<PagedResultDto<RoomDto>> GetAllAsync(PagedRoomResultRequestDto input)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {

                var query = Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.RoomName.Contains(input.Keyword));

                return Task.FromResult(new PagedResultDto<RoomDto>
                {
                    Items = ObjectMapper.Map<IReadOnlyList<RoomDto>>(query
                    .OrderByDescending(x => x.Id)
                    .Skip(input.SkipCount)
                    .Take(input.MaxResultCount)),
                    TotalCount = query.Count()
                });

            }
        }
    }
}
