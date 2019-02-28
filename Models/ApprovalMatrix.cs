using System;
using MAP_Web.Models;

namespace MAP_Web.Models
{
    public class ApprovalMatrix
    {
        public int id { get; set; }
        public int approvalCount { get; set; }
        public string rank { get; set; } 
        public string ownership { get; set;}
        public int requestType { get; set; }
        public bool finalApprover { get; set; }
        public Nullable<bool> withRequirements { get; set; }
        public Nullable<bool> withException { get; set; }          
    }
}

