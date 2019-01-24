using System;
using MAP_Web.Models;

namespace MAP_Web.Models
{
    public class ApprovalSetup
    {
        public int id { get; set; }
        public int approvalCount { get; set; }
        public string rank { get; set; } 
        public int requestId { get; set; }
        public int requestType { get; set; }
        public Nullable<bool> withRequirements { get; set; }
        public Nullable<bool> withException { get; set; }  
        public Request Request { get; set; }   
    }
}