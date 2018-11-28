using System;

namespace MAP_Web.Models
{
    public class TerminalDetails
    {
        public int Id { get; set; }
        public string terminalBrand { get; set; }
        public string terminalType { get; set; }
        public string terminalModelRequested { get; set; }
        public Nullable<int> numberOfTerminalsRequested { get; set; }
        public string telcoProvider { get; set; }
        public string simType { get; set; }
        public Nullable<bool> tipAdjust { get; set; }
        public Nullable<bool> hotelSetupFacility { get; set; }
        public Nullable<bool> manualKeyInFacility { get; set; }
        public string creditStraightTid { get; set; }
        public Nullable<int> POSId { get; set; }
        public POS POS { get; set; }
    }
}