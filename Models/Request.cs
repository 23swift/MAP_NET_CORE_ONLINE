using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MAP_Web.Models
{
    public class Request : BaseEntity
    {
        public Request()
        {
           // Approvals = new HashSet<RequestApproval>();
           // RequiredApprovals = new HashSet<RequiredApproval>();
            MQRRequestApprovals = new HashSet<MQRRequestApproval>();
            MQRRequiredApprovals = new HashSet<MQRRequiredApproval>();
            History = new HashSet<History>();
            CreatedDate = DateTime.Now;
        }

        public Int32 Id { get; set; }
        public int RequestType { get; set; }
        public string RequestDescription { get; set; }

        public Nullable<Guid> WorkflowInstanceId { get; set; }
        public Nullable<Guid> AuditLogGroupId { get; set; }
        public Int32 Status { get; set; }
        public string BookMark { get; set; }
        public string TrackingNo { get; set; }
        public bool Insuff { get; set; }
        public Int32 MQRStatus { get; set; }
        public string Owner { get; set; }
      //  public ICollection<RequiredApproval> RequiredApprovals { get; set; }
      //  public ICollection<RequestApproval> Approvals { get; set; }
        public ICollection<MQRRequiredApproval> MQRRequiredApprovals { get; set; }
        public ICollection<MQRRequestApproval> MQRRequestApprovals { get; set; }
        public virtual NewAffiliation NewAffiliation { get; set; }
        public virtual FileMaintenance FileMaintenance { get; set; }
        public virtual POSRequest POSRequest { get; set; }
        public virtual AdditionalFacility AdditionalFacility { get; set; }
        public virtual BranchAffiliation BranchAffiliation { get; set; }
        public virtual MAEF MAEF { get; set; }

        public virtual ApprovalSetup ApprovalSetup { get; set;}

        public virtual ICollection<RequiredApproval> RequiredApproval { get; set;}
        public virtual ICollection<History> History { get; set; }
    }

}