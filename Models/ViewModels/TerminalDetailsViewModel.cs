using System;

namespace MAP_Web.Models.ViewModels
{
    public class TerminalDetailsViewModel
    {
        public int Id { get; set; }
        public Nullable<int> terminalBrand { get; set; }
        public Nullable<int> terminalType { get; set; }
        public Nullable<int> terminalModelRequested { get; set; }
        public Nullable<int> numberOfTerminalsRequested { get; set; }
        public string telcoProvider { get; set; }
        public Nullable<int> simType { get; set; }
        public Nullable<bool> tipAdjust { get; set; }
        public Nullable<bool> hotelSetupFacility { get; set; }
        public Nullable<bool> manualKeyInFacility { get; set; }
        public string creditStraightTid { get; set; }
        public int POSId { get; set; }
        public POS POS { get; set; }
    }
}