using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace SmartPharmacy.EntityFrameworkCore
{
    public static class SmartPharmacyDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<SmartPharmacyDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<SmartPharmacyDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
