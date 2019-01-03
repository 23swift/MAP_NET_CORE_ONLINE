using System;
using MAP_Web.Models;

namespace MAP_Web.Models
{
    public class ApprovalCount
    {
        public int Id { get; set; } 
        public string user { get; set; }  
        public int requestId { get; set; }
        public bool approve { get; set; }
        public Request Request { get; set; }          
    }
}