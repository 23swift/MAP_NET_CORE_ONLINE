using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using MAP_Web.Models;

namespace MAP_Web.DataAccess
{
    public class AuditLog_Context : DbContext
    {
        public AuditLog_Context(DbContextOptions<AuditLog_Context> options)
        : base(options)
        {

        }

        public virtual DbSet<ChangeLog> ChangeLogs { get; set; }
    }
}