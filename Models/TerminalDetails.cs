namespace MAP_Web.Models
{
    public class TerminalDetails
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

    }
}