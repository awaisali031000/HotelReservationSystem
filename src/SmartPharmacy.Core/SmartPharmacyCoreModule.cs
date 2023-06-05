using Abp.Localization;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Runtime.Security;
using Abp.Timing;
using Abp.Zero;
using Abp.Zero.Configuration;
using SmartPharmacy.Authorization.Roles;
using SmartPharmacy.Authorization.Users;
using SmartPharmacy.Configuration;
using SmartPharmacy.Features;
using SmartPharmacy.Localization;
using SmartPharmacy.MultiTenancy;
using SmartPharmacy.Navigation;
using SmartPharmacy.Timing;

namespace SmartPharmacy
{
    [DependsOn(typeof(AbpZeroCoreModule))]
    public class SmartPharmacyCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            // Declare entity types
            Configuration.Modules.Zero().EntityTypes.Tenant = typeof(Tenant);
            Configuration.Modules.Zero().EntityTypes.Role = typeof(Role);
            Configuration.Modules.Zero().EntityTypes.User = typeof(User);

            SmartPharmacyLocalizationConfigurer.Configure(Configuration.Localization);

            // Enable this line to create a multi-tenant application.
            Configuration.MultiTenancy.IsEnabled = SmartPharmacyConsts.MultiTenancyEnabled;

            // Configure roles
            AppRoleConfig.Configure(Configuration.Modules.Zero().RoleManagement);

            Configuration.Settings.Providers.Add<AppSettingProvider>();
            
            Configuration.Localization.Languages.Add(new LanguageInfo("fa", "فارسی", "famfamfam-flags ir"));
            
            Configuration.Settings.SettingEncryptionConfiguration.DefaultPassPhrase = SmartPharmacyConsts.DefaultPassPhrase;
            SimpleStringCipher.DefaultPassPhrase = SmartPharmacyConsts.DefaultPassPhrase;

            Configuration.Navigation.Providers.Add<AdminSystemNavigationProvider>();
            Configuration.Navigation.Providers.Add<TenantSystemNavigationProvider>();

            Configuration.Features.Providers.Add<AppFeatureProvider>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartPharmacyCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IocManager.Resolve<AppTimes>().StartupTime = Clock.Now;
        }
    }
}
