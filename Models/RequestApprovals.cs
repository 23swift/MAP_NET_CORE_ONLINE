using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MAP_Web.Models
{
  /*  
    public class RequestApproval
    {
        public Int32 Id { get; set; }
        public string Approver { get; set; }
        public DateTime? Date { get; set; }
        public bool Approved { get; set; }
        
        public string Rank { get; set; }
        public Request Request { get; set; }
    }
    */

/*     public class RequiredApproval
    {
       public Int32 Id { get; set; }
       // public Int32 ApprovalCount { get; set; }
        public string rank { get; set; }
        public int approvalCount { get; set;} 
        public int requestId { get; set; }        
        public Request Request { get; set; }
        public String user { get; set; }
        public bool isApproved { get; set; } 

    }*/

    public class MQRRequestApproval
    {
        public Int32 Id { get; set; }
        public string Approver { get; set; }
        public DateTime? Date { get; set; }
        public bool Approved { get; set; }

        public string Rank { get; set; }
        public Request Request { get; set; }
    }
    public class MQRRequiredApproval
    {
        public Int32 Id { get; set; }
        // public Int32 ApprovalCount { get; set; }
        public string Rank { get; set; }
        public Request Request { get; set; }
        public String User { get; set; }
        public bool isApproved { get; set; }

    }
 /* 
    public class ApprovalSetup
    {
        
        public Int32 Id { get; set; }
        public Int32 ApprovalCount { get; set; }
        public string Rank { get; set; }
        public bool WithRequirements { get; set; }
        public bool WithException { get; set; }

        public int RequestType { get; set; }


    }
*/
    
    public class MQRApprovalSetup
    {

        public Int32 Id { get; set; }
        public Int32 ApprovalCount { get; set; }
        public string Rank { get; set; }
        public bool WithRequirements { get; set; }
        public bool WithException { get; set; }

        public int RequestType { get; set; }


    }

}
