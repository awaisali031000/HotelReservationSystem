using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SmartPharmacy.EntityFrameworkCore;
using SmartPharmacy.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace SmartPharmacy.Web.Tests
{
    [DependsOn(
        typeof(SmartPharmacyWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class SmartPharmacyWebTestModule : AbpModule
    {
        public SmartPharmacyWebTestModule(SmartPharmacyEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartPharmacyWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(SmartPharmacyWebMvcModule).Assembly);
        }
    }
}