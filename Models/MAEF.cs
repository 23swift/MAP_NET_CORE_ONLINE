using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MAP_Web.Models
{
    public partial class MAEF
    {

        public MAEF()
        {
            //this.CreditChecking = new HashSet<CreditChecking>();
        }


        public Int32 Id { get; set; }

        public bool bnpNfisWithAd { get; set; }

        public string bnpNfisWithAdRemarks { get; set; }

        public bool nldsWithAd { get; set; }

        public string nldsWithAdRemarks { get; set; }

        public bool pepOfacWithAd { get; set; }

        public string pepOfacWithAdRemarks { get; set; }    

        public bool matchWithAd { get; set; }

        public string matchWithAdRemarks { get; set; }  

        public bool vmtsWithAd { get; set; }

        public string vmtsWithAdRemarks { get; set; }  

         public bool tmrsWithAd { get; set; }

        public string tmrsWithAdRemarks { get; set; } 

         public bool fraudWithAd { get; set; }

        public string fraudWithAdRemarks { get; set; }       

         public bool prevDeclinedWithAd { get; set; }

        public string prevDeclinedWithAdRemarks { get; set; } 

         public bool amlaYes { get; set; }

        public string amlaClass { get; set; } 

        public string nameOfPep { get; set; }

        public bool rptYes { get; set; }

        public string rptClass { get; set; }
        public string nameOfRp { get; set; }   

         public string location { get; set; }   
        public bool appearance { get; set; }    

        public bool withTelYes { get; set; }     

        public bool largeAccYes { get; set; }     

        public bool natureBus { get; set; }     

       public string psv { get; set; }      
        public bool signVerifYes { get; set; }   
       public bool chkApprove { get; set; }

       public bool chkApprovePendingCust { get; set; }

       public bool chkWithReq { get; set; }    

       public bool chkWithException { get; set; }   

       public bool chkDecline { get; set; }    

       public string assignMidCap { get; set; }  

       public string payDelay { get; set; }   

       public string holdOutDeposit { get; set; } 

       public string otherRemarks { get; set; }   

       public string processedBy { get; set; }      

       public string approver1 { get; set; }   

       public Nullable<System.DateTime> decisionDate1 { get; set; }  

       public string approver2 { get; set; }   

       public Nullable<System.DateTime> decisionDate2 { get; set; } 

       public string approver3 { get; set; }   

       public Nullable<System.DateTime> decisionDate3 { get; set; }

       public Nullable<System.DateTime>processedDate { get; set;}

       public string approverDecision1 { get; set;}    

       public string approverDecision2 { get; set;}

       public string approverDecision3 { get; set;}

       public string typeOfCnp { get; set;}

       public ICollection<ApproveWithReqReason> ApproveWithReqReason { get; set; }

       public ICollection<ApproveWithExceptDetails> ApproveWithExceptDetails { get; set; }

        public int RequestId { get; set; }
        public Request Request { get; set; }

        public ICollection<ApproveWithExceptDetailsMqr> ApproveWithExceptDetailsMqr { get; set; }

        public ICollection<ApproveWithReqReasonMqr> ApproveWithReqReasonMqr { get; set; }

        public AwrMaef AwrMaef { get; set; }

    }
}
