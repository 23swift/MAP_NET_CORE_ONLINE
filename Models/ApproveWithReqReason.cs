using MAP_Web.Models;

namespace MAP_Web.Models
{
    public class ApproveWithReqReason
    {
        public int Id { get; set; }
        public string awrsRequirement { get; set; }
        public string awrsRemarks { get; set;}
        public bool chkAwrsComplied { get; set; }      
        public int MAEFId { get; set; }
        public MAEF MAEF { get; set; }
       



    }
}