using Abp.Application.Navigation;
using Abp.Authorization;
using Abp.Localization;
using SmartPharmacy.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Navigation
{
    public class AdminSystemNavigationProvider : NavigationProvider
    {
        public override void SetNavigation(INavigationProviderContext context)
        {
            const string menuName = "AdminSystemMainMenu";

            context.Manager.MainMenu.DisplayName = L(menuName);
            context.Manager.MainMenu
                .AddItem(
                    new MenuItemDefinition(
                        "Dashboard",
                        L("Dashboard"),
                        url: "/admin/dashboard",
                        icon: "dashboard",
                        requiresAuthentication: true,
                        permissionDependency: CheckSinglePermission(PermissionNames.Dashboard)
                        )
                );


            context.Manager.MainMenu
                .AddItem(
                new MenuItemDefinition(
                    "User",
                    L("User"),
                    icon: "code-sandbox"
                    ).AddItem(
                        new MenuItemDefinition(
                            "User",
                            L("User"),
                            url: "/admin/user-list",
                            icon: "medicine-box",
                        requiresAuthentication: true
                            )
                    ).AddItem(
                        new MenuItemDefinition(
                            "Role",
                            L("Role"),
                            url: "/admin/role-list",
                            icon: "medicine-box",
                        requiresAuthentication: true
                            )
                    ).AddItem(
                        new MenuItemDefinition(
                            "Edition",
                            L("Edition"),
                            url: "/admin/edition-list",
                            icon: "medicine-box",
                        requiresAuthentication: true
                            )
                    ).AddItem(
                        new MenuItemDefinition(
                            "Tenant",
                            L("Tenant"),
                            url: "/admin/tenant-list",
                            icon: "medicine-box",
                        requiresAuthentication: true
                            )
                    )
            );


            context.Manager.MainMenu
                .AddItem(
                    new MenuItemDefinition(
                        "Branding",
                        L("Branding"),
                        url: "/admin/branding",
                        icon: "unordered-list",
                        requiresAuthentication: true
                        )
                );


            context.Manager.MainMenu
                .AddItem(
                    new MenuItemDefinition(
                        "Room",
                        L("Room"),
                        url: "/admin/room",
                        icon: "unordered-list",
                        requiresAuthentication: true
                        )
                );


            context.Manager.MainMenu
                .AddItem(
                    new MenuItemDefinition(
                        "CustomerRequest",
                        L("CustomerRequest"),
                        url: "/admin/customer-request",
                        icon: "unordered-list",
                        requiresAuthentication: true
                        )
                );
        }

        private IPermissionDependency CheckSinglePermission(string permissionName)
        {
            return new SimplePermissionDependency(permissionName);
        }

        private IPermissionDependency CheckAllPermission(string[] permissionNames)
        {
            return new SimplePermissionDependency(requiresAll: true, permissionNames);
        }

        private ILocalizableString L(string name)
        {
            return new LocalizableString(name, SmartPharmacyConsts.LocalizationSourceName);
        }
    }
}
