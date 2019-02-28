using System;

namespace MAP_Web.Models.ViewModels
{
    public class MDMHeaderViewModel
    {
        public string trackingNo { get; set; }
        public string legalName { get; set; }
        public int requestType { get; set; }
        public DateTime requestedDate { get; set; }
        public string mid { get; set; }
        public string businessUnit { get; set; }
        public string subUnitArea { get; set; }
        public string aoName { get; set; }
        public string mdmReviewedBy { get; set; }
        public DateTime mdmReviewedDate { get; set; }
        public string ownership { get; set; }
    }
}