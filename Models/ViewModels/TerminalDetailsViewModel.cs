namespace MAP_Web.Models.ViewModels
{
    public class TerminalDetailsViewModel
    {
        public int Id { get; set; }
        public int terminalBrand { get; set; }
        public int terminalType { get; set; }
        public int terminalModelRequested { get; set; }
        public int numberOfTerminalsRequested { get; set; }
        public string telcoProvider { get; set; }
        public int simType { get; set; }
        public bool tipAdjust { get; set; }
        public bool hotelSetupFacility { get; set; }
        public bool manualKeyInFacility { get; set; }
        public string creditStraightTid { get; set; }
        public int POSId { get; set; }
        public POS POS { get; set; }
    }
}