using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;

namespace SmartPharmacy.Controllers
{
    public abstract class SmartPharmacyControllerBase: AbpController
    {
        protected SmartPharmacyControllerBase()
        {
            LocalizationSourceName = SmartPharmacyConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
