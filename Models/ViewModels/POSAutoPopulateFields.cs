namespace MAP_Web.Models.ViewModels
{
    public class POSAutoPopulateFields
    {
        public string requestersBusinessUnit { get; set; }
        public string businessUnitAO { get; set; }
        public string segment { get; set; }
        public string approvedBy { get; set; }
        public string merchantLegalName { get; set; } // Branch
        public string merchantDBAName { get; set; } // Branch
        public string businessSignage { get; set; } // OIF
        public string merchantDbaAddress { get; set; } // Branch
        public string merchantDbaCity { get; set; } // Branch
        public string nsp { get; set; }
    }
}