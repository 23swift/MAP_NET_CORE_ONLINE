using System;
using MAP_Web.Models;


namespace MAP_Web.Models
{
    public class ApproveWithExceptDetailsMqr
    {
        public int Id { get; set; }
        public string awerdMqrRequirement { get; set; }
        public string awerdMqrRemarks { get; set; }
        public string awerdRemarks { get; set; }
        public Nullable<System.DateTime> awerdMqrDate { get; set; }
        public int MAEFId { get; set; }
        public MAEF MAEF { get; set; }
        public Nullable<Guid> HistoryGroupId { get; set; }   
        public Nullable<Guid> AuditLogGroupId { get; set; }           
    }
}