using System;

namespace MAP_Web.Models.ViewModels
{
    public class RequestHeaderViewModel
    {
        public string referenceNumber { get; set; }
        public string aoCode { get; set; }
        public string ownership { get; set; }
        public DateTime requestedDate { get; set; }
        public string legalName { get; set; }
    }
}