using Abp.Authorization;
using AutoMapper;
using SmartPharmacy.Authorization.Users;

namespace SmartPharmacy.Users.Dto
{
    public class UserMapProfile : Profile
    {
        public UserMapProfile()
        {
            CreateMap<UserDto, User>();
            CreateMap<UserDto, User>()
                .ForMember(x => x.Roles, opt => opt.Ignore())
                .ForMember(x => x.CreationTime, opt => opt.Ignore());

            CreateMap<CreateUserDto, User>();
            CreateMap<CreateUserDto, User>().ForMember(x => x.Roles, opt => opt.Ignore());
            CreateMap<Permission, UserPermissionDto>().ForMember(x => x.Parent,
                options => options.MapFrom(x => x.Parent.Name));
            CreateMap<Permission, GetUserPermissionsOutputDto>();
        }
    }
}
