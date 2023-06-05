using System.Threading.Tasks;
using SmartPharmacy.Configuration.Dto;

namespace SmartPharmacy.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
