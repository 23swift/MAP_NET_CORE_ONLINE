using System.Collections.Generic;

namespace MAP_Web.Models.ViewModels
{
    public class ClaimsViewModel
    {
        public string name { get; set; }
        public IEnumerable<string> role { get; set; }
        public IEnumerable<string> access { get; set; }
        public string rank { get; set; }
    }
}