using Abp.Authorization;
using SmartPharmacy.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace SmartPharmacy.Authorization
{
    public class SmartPharmacyAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            var permissions = context.CreatePermission(
                name: PermissionNames.Permission,
                displayName: L(PermissionNames.Permission)
                );

            //Dashboard Permission

            permissions.CreateChildPermission(
                name: PermissionNames.Dashboard,
                displayName: L(PermissionNames.Dashboard));

            //User Permissions

            var userManagementPermissions = permissions.CreateChildPermission(
                name: PermissionNames.UserManagement,
                displayName: L(PermissionNames.UserManagement));

            userManagementPermissions.CreateChildPermission(
                name: PermissionNames.UserManagement_CreateUser,
                displayName: L(PermissionNames.UserManagement_CreateUser));

            userManagementPermissions.CreateChildPermission(
               name: PermissionNames.UserManagement_EditUser,
               displayName: L(PermissionNames.UserManagement_EditUser));

            userManagementPermissions.CreateChildPermission(
               name: PermissionNames.UserManagement_ManageUserPermissions,
               displayName: L(PermissionNames.UserManagement_ManageUserPermissions));

            userManagementPermissions.CreateChildPermission(
               name: PermissionNames.UserManagement_DeleteUser,
               displayName: L(PermissionNames.UserManagement_DeleteUser));

            userManagementPermissions.CreateChildPermission(
               name: PermissionNames.UserManagement_ImportDataThroughExcel,
               displayName: L(PermissionNames.UserManagement_ImportDataThroughExcel),
               multiTenancySides: MultiTenancySides.Tenant);

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, SmartPharmacyConsts.LocalizationSourceName);
        }
    }
}
