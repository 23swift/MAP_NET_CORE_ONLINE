using System;

namespace MAP_Web.Models.ViewModels
{
    public class DashboardViewModel
    {
        public int RequestId { get; set; }
        public string referenceNo { get; set; }
        public DateTime requestedDate { get; set; }
        public string requestType { get; set; }
        public string businessName { get; set; }
        public string dbaName { get; set; }
        public string requestedBy { get; set; }
        public string status { get; set; }
        public int tat { get; set; }
        public string userName { get; set; }
    }
}