using Abp.AppFactory.ExcelGenerator;
using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SmartPharmacy.Authorization;

namespace SmartPharmacy
{
    [DependsOn(
        typeof(SmartPharmacyCoreModule),
        typeof(AbpAutoMapperModule),
        typeof(ExcelGeneratorModule))]
    public class SmartPharmacyApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<SmartPharmacyAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(SmartPharmacyApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
