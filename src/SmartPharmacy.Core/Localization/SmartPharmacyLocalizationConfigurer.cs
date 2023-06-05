using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace SmartPharmacy.Localization
{
    public static class SmartPharmacyLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(SmartPharmacyConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(SmartPharmacyLocalizationConfigurer).GetAssembly(),
                        "SmartPharmacy.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
