using SmartPharmacy.Debugging;

namespace SmartPharmacy
{
    public class SmartPharmacyConsts
    {
        public const string LocalizationSourceName = "SmartPharmacy";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "4b9bd25a58904b618e593df442b859be";
    }
}
