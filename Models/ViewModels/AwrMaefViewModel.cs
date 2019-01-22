using System;

namespace MAP_Web.Models.ViewModels
{
    public class AwrMaefViewModel
    {
        public int Id { get; set; }
        public string accountOfficer { get; set; }
        public string aoInsuffCount { get; set; }
        public string mpHeadInsuffThreshold { get; set; }
        public string exceptionRemarks { get; set; }
        public string processedBy { get; set; }
        public Nullable<DateTime> processedDate { get; set; }
        public string approver1 { get; set; }
        public Nullable<DateTime> approver1DecisionDate { get; set; }
        public string approver2 { get; set; }
        public Nullable<DateTime> approver2DecisionDate { get; set; }
        public string approver3 { get; set; }
        public Nullable<DateTime> approver3DecisionDate { get; set; }
        public int MAEFId { get; set; }
        public MAEF MAEF { get; set; }
    }
}