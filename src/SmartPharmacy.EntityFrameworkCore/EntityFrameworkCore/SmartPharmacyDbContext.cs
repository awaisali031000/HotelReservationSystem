using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using SmartPharmacy.Authorization.Roles;
using SmartPharmacy.Authorization.Users;
using SmartPharmacy.MultiTenancy;
using SmartPharmacy.Entities;

namespace SmartPharmacy.EntityFrameworkCore
{
    public class SmartPharmacyDbContext : AbpZeroDbContext<Tenant, Role, User, SmartPharmacyDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public DbSet<Brand> Brands { get; set; }
        public DbSet<Branding> Brandings { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Request> Requests { get; set; }

        public SmartPharmacyDbContext(DbContextOptions<SmartPharmacyDbContext> options)
            : base(options)
        {
        }
    }
}
