using Microsoft.EntityFrameworkCore;
namespace MAP_Web.DataAccess
{
    public class MAP_Context : DbContext
    {
        public MAP_Context(DbContextOptions<MAP_Context> options)
        : base(options)
        {

        }

        public DbSet<Models.Employee> Employee { get; set; }
        public DbSet<Models.CustomerProfile> CustomerProfile { get; set; }
        public virtual DbSet<Models.Request> Request { get; set; }
        public virtual DbSet<Models.POSRequest> POSRequest { get; set; }
        public virtual DbSet<Models.MAEF> MAEF { get; set; }
        public virtual DbSet<Models.OIF> OIF { get; set; }
        public virtual DbSet<Models.Branch> Branch { get; set; }
        public virtual DbSet<Models.ApprovalSetup> ApprovalSetup { get; set; }
        public virtual DbSet<Models.MerchantGroup> MerchantGroup { get; set; }
        public virtual DbSet<Models.Customer> Customer { get; set; }
        public virtual DbSet<Models.NewAffiliation> NewAffiliation { get; set; }
        public virtual DbSet<Models.AdditionalFacility> AdditionalFacility { get; set; }
        public virtual DbSet<Models.BranchAffiliation> BranchAffiliation { get; set; }
        public virtual DbSet<Models.DocumentList> DocumentList { get; set; }
        public virtual DbSet<Models.OcularInspectionForm> OcularInspectionForm { get; set; }
        public virtual DbSet<Models.MaintenanceMaster> MaintenanceMaster { get; set; }
        public virtual DbSet<Models.MaintenanceDetails> MaintenanceDetails { get; set; }
        public virtual DbSet<Models.AuditLog> AuditLog { get; set; }
        public virtual DbSet<Models.AOMaintenance> AOMaintenance { get; set; }
        public virtual DbSet<Models.BUMaintenance> BUMaintenance { get; set; }
        public virtual DbSet<Models.ServiceFeeContract> ServiceFeeContract { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.NewAffiliation>()
                .HasOne(n => n.CustomerProfile)
                .WithOne(c => c.NewAffiliation)
                .HasForeignKey<Models.CustomerProfile>(c => c.NewAffiliationId);

            modelBuilder.Entity<Models.Branch>()
                .HasOne(n => n.OIF)
                .WithOne(c => c.Branch)
                .HasForeignKey<Models.OIF>(c => c.BranchId);

            modelBuilder.Entity<Models.Request>()
                .HasOne(n => n.MAEF)
                .WithOne(c => c.Request)
                .HasForeignKey<Models.MAEF>(c => c.RequestId);


            
        }
    }
}