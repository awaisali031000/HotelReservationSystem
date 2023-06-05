using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using SmartPharmacy.Roles.Dto;

namespace SmartPharmacy.Roles
{
    public interface IRoleAppService : IAsyncCrudAppService<RoleDto, int, PagedRoleResultRequestDto, CreateRoleDto, RoleDto>
    {
        Task<ListResultDto<PermissionDto>> GetAllPermissions();

        Task<GetRoleForEditOutput> GetRoleForEdit(EntityDto input);

        Task<ListResultDto<RoleListDto>> GetRolesAsync(GetRolesInput input);

        Task SetPermissions(SetPermissionsInputDto input);

        Task<ListResultDto<GetPermissionsOutputDto>> GetPermissions(GetPermissionsInputDto input);


    }
}
