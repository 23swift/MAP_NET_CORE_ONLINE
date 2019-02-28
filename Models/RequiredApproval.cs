using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MAP_Web.Models
{
    public class RequiredApproval
    {
        public Int32 Id { get; set; }
        public string rank { get; set; }
        public int approvalCount { get; set;} 
        public int requestId { get; set; }        
        public Request Request { get; set; }
        public string user { get; set; }

        public bool finalApprover { get; set; }        
    }
}