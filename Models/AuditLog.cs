using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MAP_Web.Models
{
   public class AuditLog
    {
        public Int32 Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string TrackingNo { get; set; }
        public string Entity { get; set; }
        public string OldValues { get; set; }
        public string NewValues { get; set; }
        public DateTime DateLoged { get; set; }

    }
}
