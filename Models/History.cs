using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MAP_Web.Models
{
    public partial class History
    {

        public int Id { get; set; }

        public System.DateTime date { get; set; }

        public string remarks { get; set; }

        public string action { get; set; }

        public string user { get; set; }

        public string groupCode { get; set; }
        public int RequestId { get; set; }
        public virtual Request Request { get; set; }
    }
}
