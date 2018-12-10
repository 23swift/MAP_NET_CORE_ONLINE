namespace MAP_Web.Models.ViewModels
{
    public class ApproveWithReqReasonViewModel
    {
        public int Id { get; set; }
        public int awrsRequirement { get; set; }
        public string awrsRemarks { get; set;}
        public bool chkAwrsComplied { get; set; }      
        public int MAEFId { get; set; }
        public MAEF MAEF { get; set; }
    }
}