using System;

namespace MAP_Web.Models
{
    public class ApproveWithExceptDetailsAwr
    {
        public int Id { get; set; }
        public string awerdAwrRequirement { get; set; }
        public string awerdRemarks { get; set; }
        public string awerdMqrRemarks { get; set; }
        public string awerdAwrRemarks { get; set; }
        public Nullable<System.DateTime> awerdAwrDate { get; set; }
        public int MAEFId { get; set; }
        public MAEF MAEF { get; set; }
        public Nullable<Guid> HistoryGroupId { get; set; }   
        public Nullable<Guid> AuditLogGroupId { get; set; }   
    }
}