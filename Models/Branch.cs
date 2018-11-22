using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MAP_Web.Models
{
    public class Branch
    {
        public Branch()
        {
            this.ecrForInstallation = false;
            this.isSwipingCardWithoutInstalledECR = false;
            this.isSwipingCardWithInstalledECR = false;
            this.isActive = true;
            this.withAcquirer = true;
            this.withDependency = true;
            this.withTax = true;

            this.MIDs = new Collection<MID>();
        }
        public int Id { get; set; }
        // public Business Business { get; set; }
        public string dbaAddress1 { get; set; }

        public string dbaAddress2 { get; set; }

        public string dbaAddress3 { get; set; }

        public int City_Id { get; set; }

        public string DBAName { get; set; }

        public Nullable<int> areaMallCode { get; set; }

        public Nullable<int> payDelayDays { get; set; }

        public Nullable<System.DateTime> dateClosed { get; set; }

        public Nullable<int> closedreason { get; set; }

        public string owningMerchant { get; set; }

        public string JCBAcceptorId { get; set; }

        public Nullable<int> JCBSchemeClosereason { get; set; }

        public Nullable<int> JCBSchemeRevisionReason { get; set; }

        public Nullable<int> JCBRevisionRSN { get; set; }

        public Nullable<int> schemeAreaCode1 { get; set; }

        public Nullable<int> schemeAreaCode2 { get; set; }

        public string AMEXCardAcceptorId { get; set; }

        public Nullable<int> AMEXActivationReason { get; set; }

        public Nullable<int> AMEXCanceledReason { get; set; }

        public Nullable<int> AMEXRoleCode { get; set; }

        public string AMEXRiskIND { get; set; }

        public string AMEXKeyAcctIND { get; set; }

        public string CUPCardAcceptorId { get; set; }

        public Nullable<int> CUPTaxCode { get; set; }

        public string CUPTaxNumber { get; set; }

        public Nullable<System.DateTime> CUPTaxExemptExpiryDate { get; set; }

        public string imprinterPlateName { get; set; }

        public string imprinterPlateNumbers { get; set; }

        public string imprinterAMEX { get; set; }

        public string imprinterDC { get; set; }

        public string imprinterJCB { get; set; }

        public string imprinterOthers { get; set; }

        public string principalName1 { get; set; }

        public string principalName2 { get; set; }

        public string principalName3 { get; set; }

        public string principalName4 { get; set; }

        public string principalName5 { get; set; }

        public string adminContactperson { get; set; }

        public string goodsServices { get; set; }

        public string phoneNo { get; set; }

        public string mobileNo { get; set; }

        public string emailAddress { get; set; }

        public string mailingAddress1 { get; set; }

        public bool withECR { get; set; }

        public Nullable<int> merchantGrade { get; set; }

        public string serviceProvider { get; set; }

        public string website { get; set; }

        public bool cardHolderData { get; set; }

        public string cardHolderDataTobeStored { get; set; }

        public int MCC_Id { get; set; }

        public string branchCode { get; set; }

        public Nullable<int> imprinterTotal { get; set; }

        public int dbaZipCode { get; set; }

        public Nullable<int> regionCode { get; set; }

        public Nullable<int> checkDeliveryCode { get; set; }

        public string paymentMode { get; set; }

        public string settlementAcctNo { get; set; }

        public string merchantGroupCode { get; set; }

        public string TIN { get; set; }

        public bool withTax { get; set; }

        public Nullable<int> cardPlan { get; set; }

        public bool isActive { get; set; }

        public bool isAffiliated { get; set; }

        public string dbaAddress4 { get; set; }

        public string principalFirstName { get; set; }

        public string principalLastName { get; set; }

        public string principalMiddleName { get; set; }

        public string mailingAddress2 { get; set; }

        public string mailingAddress3 { get; set; }

        public string mailingAddress4 { get; set; }

        public int mailingCity { get; set; }

        public int mailingAddressZipCode { get; set; }

        public Nullable<int> dbaCity { get; set; }

        public Nullable<System.DateTime> taxExemptFrom { get; set; }

        public Nullable<System.DateTime> taxExemptTo { get; set; }

        public int taxExemptIssuedBy { get; set; }

        public string registeredBusinessNo { get; set; }

        public Nullable<System.DateTime> DTIBusinessRegDate { get; set; }

        public Nullable<System.DateTime> SECRegDate { get; set; }

        public bool withAcquirer { get; set; }

        public string acquirerInstitutionName { get; set; }

        public bool ecrForInstallation { get; set; }

        public bool isSwipingCardWithoutInstalledECR { get; set; }

        public bool isSwipingCardWithInstalledECR { get; set; }

        public string debitSettlementAcctNo { get; set; }

        public string payeesName { get; set; }

        public string emailAddressForReport { get; set; }

        public string SOARecipients { get; set; }

        public string SOAEmailAddress { get; set; }

        public bool reportDistributionperCompany { get; set; }

        public bool reportPerBranch { get; set; }

        public string principalFbName { get; set; }

        public Nullable<System.DateTime> principalDateOfBirth { get; set; }

        public int principalCivilStatus { get; set; }

        public string principalPhoneNo { get; set; }

        public string principalPermanentAddress { get; set; }

        public int principalCity { get; set; }

        public int principalZipCode { get; set; }

        public int principalHomeOwnership { get; set; }

        public string spouseAddress { get; set; }

        public int spouseCity { get; set; }

        public string spouseFirstName { get; set; }

        public string spouseLastName { get; set; }

        public string spouseMiddleName { get; set; }

        public string spousePhoneNo { get; set; }

        public int spouseZipCode { get; set; }

        public string financialInstitution { get; set; }

        public string accountFacility { get; set; }

        public string acctLoanNo { get; set; }

        public string loanTerm { get; set; }

        public int noOfPos { get; set; }

        public decimal discountDebitRate { get; set; }

        public string storeId { get; set; }

        public string reportPerCompanysBranch { get; set; }

        public string ftpDir { get; set; }

        public bool genPayment { get; set; }

        public bool computeCWT { get; set; }

        public bool settlementPerBranch { get; set; }

        public string customerNo { get; set; }

        public int amexRating { get; set; }

        public int bdoPayRating { get; set; }

        public int bdoPaySegment { get; set; }

        public string aoCode { get; set; }

        public string feeAccount { get; set; }

        public string forMoto { get; set; }

        public int strategicMerchant { get; set; }

        public int tranSource { get; set; }

        public string holdOutAcctNo { get; set; }

        public string holdOutAmount { get; set; }

        public string remarks { get; set; }

        public string preparedBy { get; set; }

        public Nullable<System.DateTime> preparedDate { get; set; }

        public string notedBy { get; set; }

        public string notedDate { get; set; }

        public string controlNo { get; set; }

        public bool smsSending { get; set; }

        public bool withDependency { get; set; }

        public bool custr { get; set; }

        public bool postMaintReview { get; set; }

        public Nullable<System.DateTime> postMaintReviewDate { get; set; }

        public Nullable<System.DateTime> currentDate { get; set; }

        public string midCount { get; set; }

        public Nullable<System.DateTime> midDateTimeCreated { get; set; }

        public string tidCount { get; set; }

        public Nullable<System.DateTime> tidDateTimeCreated { get; set; }

        public string mdf { get; set; }

        public string mdfChecker { get; set; }

        public Nullable<System.DateTime> mdfDateTimeChecked { get; set; }

        public string mdfMaker { get; set; }

        public int mcId { get; set; }

        public int debitMailingAddressCity { get; set; }

        public int debitMailingAddressZipCode { get; set; }

        public int sendBdo030114 { get; set; }

        public string branch { get; set; }

        public string tradeCustomerName { get; set; }

        public string tradeContactNo { get; set; }

        public string debitMerchantNo { get; set; }

        public bool isSingleProp { get; set; }

        public bool isPartnershipCorp { get; set; }

        public Nullable<System.DateTime> mdfDateTimeCreated { get; set; }

        public string legalName { get; set; }

        public virtual POSRequest POSRequest { get; set; }
        public virtual OIF OIF { get; set; }
        public virtual ICollection<POS> POS { get; set; }

        public virtual Request Request { get; set; }
        public int NewAffiliationId { get; set; }
        public virtual NewAffiliation NewAffiliation { get; set; }
        public virtual ICollection<MID> MIDs { get; set; }
    }
}
