using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using SmartPharmacy.Configuration.Dto;

namespace SmartPharmacy.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : SmartPharmacyAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
