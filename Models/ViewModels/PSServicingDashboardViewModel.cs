using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace MAP_Web.Models.ViewModels
{
    public class PSServicingDashboardViewModel
    {
        public int RequestId { get; set; }
        public string ReferenceNo { get; set; }
        public string RequestersName { get; set; }
        public string RequestType { get; set; }
        public string DBAName { get; set; }
        public DateTime DateRequested { get; set; }
        public string Status { get; set; }
        public string NatureOfRequest { get; set; }
        public int BranchId { get; set; }
    }
}