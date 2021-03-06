using System;

namespace MAP_Web.Models
{
    public class ChangeLog
    {
        public int Id { get; set; }
        public Nullable<Guid> AuditLogGroupId { get; set; }
        public string EntityName { get; set; }
        public string PropertyName { get; set; }
        public string PrimaryKeyValue { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public string Action { get; set; }
        public DateTime DateChanged { get; set; }        
        public int HistoryId { get; set; }
        public Nullable<Guid> HistoryGroupId { get; set; }
    }
}