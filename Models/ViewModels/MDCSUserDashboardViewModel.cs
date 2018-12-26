using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MAP_Web.Models.ViewModels
{
    public class MDCSUserDashboardViewModel
    {
        public int RequestId { get; set; }
        public string ReferenceNo { get; set; }
        public DateTime RequestedDate { get; set; }
        public string RequestType { get; set; }
        public string BusinessName { get; set; }
        public string DBAName { get; set; }
        public string RequestedBy { get; set; }
        public string Status { get; set; }
        public int TAT { get; set; }
        public string UserName { get; set; }
    }
}