using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using MAP_Web.Services;

namespace MAP_Web.DataAccess
{
    public class MAP_Context : DbContext
    {
        private readonly IAuditLogService _AuditLogService;
        public MAP_Context(DbContextOptions<MAP_Context> options, IAuditLogService _AuditLogService)
        : base(options)
        {
            this._AuditLogService = _AuditLogService;
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
        public virtual DbSet<Models.AOMaintenance> AOMaintenance { get; set; }
        public virtual DbSet<Models.BUMaintenance> BUMaintenance { get; set; }
        public virtual DbSet<Models.ServiceFeeContract> ServiceFeeContract { get; set; }
        public virtual DbSet<Models.TerminalMaintenance> TerminalMaintenance { get; set; }
        public virtual DbSet<Models.ApprovalCount> ApprovalCount { get; set; }
        public virtual DbSet<Models.ApproveWithReqReasonMqr> ApproveWithReqReasonMqr { get; set; }
        public virtual DbSet<Models.ApproveWithExceptDetailsMqr> ApproveWithExceptDetailsMqr { get; set; }
        public virtual DbSet<Models.ApproveWithExceptDetailsAwr> ApproveWithExceptDetailsAwr { get; set; }
        public virtual DbSet<Models.AwrMaef> AwrMaef { get; set; }
        public virtual DbSet<Models.RequestApproval> RequestApproval { get; set; }

        public virtual DbSet<Models.ApprovalMatrix> ApprovalMatrix { get; set; }

        public virtual DbSet<Models.Remark> Remark { get; set;}

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

            modelBuilder.Entity<Models.MAEF>()
            .HasOne(n => n.AwrMaef)
            .WithOne(c => c.MAEF)
            .HasForeignKey<Models.AwrMaef>(c => c.MAEFId);

            foreach (var property in modelBuilder.Model.GetEntityTypes()
                                                        .SelectMany(t => t.GetProperties())
                                                        .Where(p => p.ClrType == typeof(decimal)))
            {
                property.Relational().ColumnType = "decimal(18,6)";
            }

            //base.OnModelCreating(modelBuilder);
            // modelBuilder.Entity<Models.POSRequest>()
            //     .HasOne(n => n.POS)
            //     .WithOne(c => c.POSRequest)
            //     .HasForeignKey<Models.POS>(c => c.POSRequestId);
        }


        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            // var modifiedEntities = ChangeTracker.Entries()
            // .Where(p => p.State == EntityState.Modified).ToList();
            var modifiedEntities = ChangeTracker.Entries()
            .Where(p => p.State == EntityState.Added ||
            p.State == EntityState.Modified ||
            p.State == EntityState.Deleted).ToList();
            int result = await base.SaveChangesAsync();
          //  await _AuditLogService.Save(modifiedEntities);
           // int result = await base.SaveChangesAsync();
            return result;
        }
    }
}