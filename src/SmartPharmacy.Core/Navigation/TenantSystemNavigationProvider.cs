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
    public class TenantSystemNavigationProvider : NavigationProvider
    {

        public override void SetNavigation(INavigationProviderContext context)
        {
            const string menuName = "TenantSystemMainMenu";

            context.Manager.Menus.Add(menuName, new MenuDefinition(menuName, L(menuName)));

            context.Manager.Menus[menuName].DisplayName = L(menuName);

            context.Manager.Menus[menuName]
                .AddItem(
                    new MenuItemDefinition(
                        "Dashboard",
                        L("Dashboard"),
                        url: "/user/dashboard",
                        icon: "dashboard",
                        requiresAuthentication: true,
                        permissionDependency: CheckSinglePermission(PermissionNames.Dashboard)
                        )
                );

            context.Manager.Menus[menuName]
                .AddItem(
                new MenuItemDefinition(
                    "Request",
                    L("Request"),
                    icon: "code-sandbox"
                    ).AddItem(
                        new MenuItemDefinition(
                            "Request",
                            L("Request"),
                            url: "/user/request-list",
                            icon: "medicine-box",
                        requiresAuthentication: true
                            )
                    )
            );
        }

        private IPermissionDependency CheckSinglePermission(string permissionName)
        {
            return new SimplePermissionDependency(permissionName);
        }

        private ILocalizableString L(string name)
        {
            return new LocalizableString(name, SmartPharmacyConsts.LocalizationSourceName);
        }
    }
}
