using Abp.Authorization;
using SmartPharmacy.Authorization.Roles;
using SmartPharmacy.Authorization.Users;

namespace SmartPharmacy.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
