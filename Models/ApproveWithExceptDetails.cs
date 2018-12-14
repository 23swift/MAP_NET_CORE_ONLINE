using System;
using MAP_Web.Models;

namespace MAP_Web.Models
{
    public class ApproveWithExceptDetails
    {
        
        public int Id { get; set; }
        public string awerdRequirement { get; set; }
        public string awerdRemarks { get; set;}
        public Nullable<System.DateTime> awerdDate { get; set; }      
        public int MAEFId { get; set; }
        public MAEF MAEF { get; set; }
    }
}