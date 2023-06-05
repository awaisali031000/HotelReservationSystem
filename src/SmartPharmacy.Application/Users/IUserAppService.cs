using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SmartPharmacy.Roles.Dto;
using SmartPharmacy.Users.Dto;

namespace SmartPharmacy.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task DeActivate(EntityDto<long> user);
        Task Activate(EntityDto<long> user);
        Task<ListResultDto<RoleDto>> GetRoles();
        Task ChangeLanguage(ChangeUserLanguageDto input);

        Task<bool> ChangePassword(ChangePasswordDto input);
        Task SetPermissions(SetUserPermissionsInputDto input);
        Task<ListResultDto<UserPermissionDto>> GetAllPermissions(GetUserAllPermissionsInputDto input);

        Task<ListResultDto<GetUserPermissionsOutputDto>> GetPermissions(Dto.GetUserPermissionsInputDto input);

    }
}
