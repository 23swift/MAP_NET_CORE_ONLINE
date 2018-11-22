namespace MAP_Web.Models.ViewModels
{
    public class TerminalDetailsViewModel
    {
        public int Id { get; set; }
        public int terminalBrand { get; set; }
        public int terminalType { get; set; }
        public int terminalModelRequested { get; set; }
        public string numberOfTerminalsRequested { get; set; }
        public string telcoProvider { get; set; }
        public string simType { get; set; }
        public bool tipAdjust { get; set; }
        public bool hotelSetupFacility { get; set; }
        public bool manualKeyInFacility { get; set; }
        public int POSId { get; set; }
        public POS POS { get; set; }
    }
}