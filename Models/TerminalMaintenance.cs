using System;

namespace MAP_Web.Models
{
    public class TerminalMaintenance
    {
        public int Id { get; set; }
        public Nullable<int> TerminalBrandId { get; set; }
        public Nullable<int> TerminalTypeId { get; set; }
        public Nullable<int> TerminalModelId { get; set; }
    }
}