using System;
using System.Collections.Generic;
using MAP_Web.Models;
using MAP_Web.DataAccess;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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

          // int historyId = (int)changes.SingleOrDefault(s => s.Entity.GetType().Name=="History").CurrentValues[propertyName: "Id"];

          //   Guid historyGroupId =  new Guid(changes.SingleOrDefault(h => h.Entity.GetType().Name=="History").CurrentValues[propertyName: "HistoryGroupId"].ToString());

            foreach (var change in changes)
            {
                var entityName = change.Entity.GetType().Name;

                // var primaryKey = GetPrimaryKeyValue(change);
                var DatabaseValues = change.GetDatabaseValues();
                Guid auditLogId = new Guid();
                Guid historyGroupId = new Guid();

                

                foreach (var prop in change.CurrentValues.Properties)  //insert auditlogId on history
                {
                    if (prop.Name == "AuditLogGroupId")
                    {
                      // auditLogId = new Guid(change.CurrentValues[property: prop] == null ? Guid.NewGuid() : change.CurrentValues[property: prop].ToString());
                      auditLogId = new Guid(change.CurrentValues[property: prop].ToString()); 
                       //break;
                    }

                    if(prop.Name == "HistoryGroupId")
                    {
                      historyGroupId = new Guid(change.CurrentValues[property: prop].ToString());  
                      // break;        
                    }

                }

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

                    if (!originalValue.Equals(currentValue) && !prop.IsPrimaryKey() && !prop.IsForeignKey())
                    {
                        ChangeLog log = new ChangeLog()
                        {
                            EntityName = entityName,
                            PropertyName = prop.Name,
                            OldValue = originalValue == null ? "" : originalValue.ToString(),
                            NewValue = currentValue == null ? "" : currentValue.ToString(),
                            DateChanged = now,
                            AuditLogGroupId = auditLogId,
                            Action = action,
                            HistoryGroupId = historyGroupId
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