using System;

namespace MAP_Web.Models.ViewModels
{
    public class ApproveWithReqReasonMqrViewModel
    {
        public int Id { get; set; }
        public string awrsMqrRequirement { get; set; }
        public string awrsMqrRemarks { get; set; }
        public string awrsRemarks { get; set; }
        public bool chkAwrsComplied { get; set; }
        public int MAEFId { get; set; }
        public MAEF MAEF { get; set; }
    }
}