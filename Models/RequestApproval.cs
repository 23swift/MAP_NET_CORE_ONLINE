using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MAP_Web.Models
{
    public class RequestApproval
    {
        public Int32 Id { get; set; }
        public bool approve { get; set; }      
        public int requestId { get; set; }    
        public string user { get; set; }     
        public string rank {get; set;}   
        public Request Request { get; set; }    
        public Nullable<Guid> HistoryGroupId { get; set; }   
        public Nullable<Guid> AuditLogGroupId { get; set; }             
    }
}