using System;

namespace MAP_Web.Models.ViewModels
{
    public class ApproveWithExceptDetailsMqrViewModel
    {
        public int Id { get; set; }
        public string awerdMqrRequirement { get; set; }
        public string awerdRemarks { get; set; }
        public string awerdMqrRemarks { get; set; }
        public Nullable<System.DateTime> awerdMqrDate { get; set; }
        public int MAEFId { get; set; }
        public MAEF MAEF { get; set; }
    }
}