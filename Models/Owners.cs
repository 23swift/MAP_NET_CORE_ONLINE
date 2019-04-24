using System;

namespace MAP_Web.Models
{
    public class Owners
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string percentOfOwnership { get; set; }
        public string typeOfRelatedParty { get; set; }
        public string remarks { get; set; }
        public Nullable<Guid> AuditLogGroupId { get; set; }
        public int CustomerProfileId { get; set; }
        public CustomerProfile CustomerProfile { get; set; }
        public Nullable<Guid> HistoryGroupId { get; set; }        
    }
}