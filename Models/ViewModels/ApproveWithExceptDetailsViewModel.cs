using System;

namespace MAP_Web.Models.ViewModels
{
    public class ApproveWithExceptDetailsViewModel
    {
         public int Id { get; set; }
        public string awerdRequirement { get; set; }
        public string awerdRemarks { get; set;}
        public Nullable<System.DateTime> awerdDate { get; set; }      
        public int MAEFId { get; set; }
        public MAEF MAEF { get; set; }
    }
}