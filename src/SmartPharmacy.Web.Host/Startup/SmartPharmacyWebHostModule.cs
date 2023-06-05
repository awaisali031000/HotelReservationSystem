using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SmartPharmacy.Configuration;

namespace SmartPharmacy.Web.Host.Startup
{
    [DependsOn(
       typeof(SmartPharmacyWebCoreModule))]
    public class SmartPharmacyWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public SmartPharmacyWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartPharmacyWebHostModule).GetAssembly());
        }
    }
}
