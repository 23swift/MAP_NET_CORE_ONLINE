using System;
using System.Collections.Generic;
using MAP_Web.Models;
using MAP_Web.DataAccess;

namespace MAP_Web.Services
{
    public class AuditLogService : IAuditLogService
    {
        private AuditLog_Context _loggerContext;

        public AuditLogService(AuditLog_Context loggerContext){
            _loggerContext=loggerContext;
        }

        void IAuditLogService.Save(List<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry> changes)
        {
            var now = DateTime.UtcNow;
            foreach (var change in changes)
            {
                var entityName = change.Entity.GetType().Name;

            // var primaryKey = GetPrimaryKeyValue(change);
                var DatabaseValues = change.GetDatabaseValues();
                foreach(var prop in change.OriginalValues.Properties)
                // foreach(var prop in change.OriginalValues.Properties)
                {
                    // var originalValue = change.OriginalValues[prop].ToString();
                    var originalValue = DatabaseValues.GetValue<object>(prop).ToString();
                    var currentValue = change.CurrentValues[prop].ToString();
                    ChangeLog log = new ChangeLog()
                    {
                    EntityName = entityName,
                    // PrimaryKeyValue = prop.IsPrimaryKey,

                    PropertyName = prop.Name,
                    OldValue = originalValue,
                    NewValue = currentValue,
                    DateChanged = now
                    };

                    _loggerContext.Add<ChangeLog>(log);
                    _loggerContext.SaveChanges();
                }
            }
        }
    }

    public interface IAuditLogService
    {
        void Save(List<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry> changes);
    }
}