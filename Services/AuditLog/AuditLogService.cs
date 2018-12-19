using System;
using System.Collections.Generic;
using MAP_Web.Models;
using MAP_Web.DataAccess;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class AuditLogService : IAuditLogService
    {
        private AuditLog_Context _loggerContext;

        public AuditLogService(AuditLog_Context loggerContext)
        {
            _loggerContext = loggerContext;
        }

        async Task IAuditLogService.Save(List<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry> changes)
        {
            var now = DateTime.UtcNow;
            foreach (var change in changes)
            {
                var entityName = change.Entity.GetType().Name;

                // var primaryKey = GetPrimaryKeyValue(change);
                var DatabaseValues = change.GetDatabaseValues();
                var auditLogId = change.CurrentValues[propertyName: "AuditLogGroupId"];
                string action = "";
                foreach (var prop in change.OriginalValues.Properties)
                {
                    var originalValue = new Object();
                    var currentValue = new Object();
                    switch (change.State) {
                        case EntityState.Added:
                            originalValue = "";
                            currentValue = change.CurrentValues[property: prop] ?? "";
                            action = "ADDED";
                        break;
                        case EntityState.Modified:
                            originalValue = DatabaseValues.GetValue<object>(prop) ?? "";
                            currentValue = change.CurrentValues[property: prop] ?? "";
                            action = "MODIFIED";
                            break;
                        case EntityState.Deleted:
                            originalValue = DatabaseValues.GetValue<object>(prop) ?? "";
                            currentValue = "";
                            action = "DELETED";
                            break;
                        default:
                        break;
                    }

                    if (!originalValue.Equals(currentValue))
                    {
                        ChangeLog log = new ChangeLog()
                        {
                            EntityName = entityName,
                            // PrimaryKeyValue = prop.IsPrimaryKey,
                            PropertyName = prop.Name,
                            OldValue = originalValue == null ? "" : originalValue.ToString(),
                            NewValue = currentValue == null ? "" : currentValue.ToString(),
                            DateChanged = now,
                            AuditLogGroupId = new Guid(auditLogId.ToString()),
                            Action = action
                        };

                        await _loggerContext.ChangeLogs.AddAsync(log);
                        await _loggerContext.SaveChangesAsync();
                    }
                }
            }
        }
    }

    public interface IAuditLogService
    {
        Task Save(List<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry> changes);
    }
}