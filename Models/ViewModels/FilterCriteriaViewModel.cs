using System;

namespace MAP_Web.Models.ViewModels
{
    public class FilterCriteriaViewModel
    {
        public FilterCriteriaViewModel()
        {
            this.requestType = 0;
            this.status = 0;
        }
        public string legalName { get; set; }
        public string dbaName { get; set; }
        public string aoName { get; set; }
        public string trackingNo { get; set; }
        public int requestType { get; set; }
        public Nullable<DateTime> createdDate { get; set; }
        public int status { get; set; }
    }
}