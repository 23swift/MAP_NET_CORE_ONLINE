using System;

namespace MAP_Web.Models.ViewModels
{
    public class BranchAutoPopulateFields
    {
        public string dbaName { get; set; }
        public string registeredBusinessNo { get; set; }
        public string adminContactPerson { get; set; }
        public string branchPhoneNumber { get; set; }
        public string branchMobileNumber { get; set; }
        public string mcc { get; set; }
        public Nullable<int> intesCodeForDiners { get; set; }
        public string strategicMerchant { get; set; }
        public string imprinterName { get; set; }
        public string imprinterNumber { get; set; }
        public string imprinterAmex { get; set; }
        public string imprinterDc { get; set; }
        public string imprinterJcb { get; set; }
        public string imprinterOthers { get; set; }
        public Nullable<int> totalNumberOfManualImprinters { get; set; }
    }
}