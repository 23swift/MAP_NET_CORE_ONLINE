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
            this.MIDs = new Collection<MID>();
        }
        public int Id { get; set; }
        public string dbaName { get; set; }
        public string adminContactPerson { get; set; }
        public string dbaAddress1 { get; set; }
        public string dbaAddress2 { get; set; }
        public string dbaAddress3 { get; set; }
        public string dbaAddress4 { get; set; }
        public string dbaCity { get; set; }
        public string branchPhoneNumber { get; set; }
        public string branchMobileNumber { get; set; }
        public string branchWebsite { get; set; }
        public Nullable<bool> isAtmDebit { get; set; }
        public Nullable<int> numberOfDebitTidAtm { get; set; }
        public Nullable<decimal> mdrAtm { get; set; }
        public Nullable<bool> isSmGiftCard { get; set; }
        public Nullable<decimal> mdrSmGiftCard { get; set; }
        public Nullable<bool> isSmShopCard { get; set; }
        public Nullable<decimal> mdrSmShopCard { get; set; }
        public Nullable<bool> isCashAgad { get; set; }
        public Nullable<int> numberOfDebitTidCashAgad { get; set; }
        public Nullable<decimal> mdrCashAgad { get; set; }
        public string mcc { get; set; }
        public string strategicMerchant { get; set; }
        public string mcAssignedId { get; set; }
        public string areaMallCode { get; set; }
        public string imprinterName { get; set; }
        public string imprinterNumber { get; set; }
        public string imprinterAmex { get; set; }
        public string imprinterDc { get; set; }
        public string imprinterJcb { get; set; }
        public string imprinterOthers { get; set; }
        public string intesCodeForDiners { get; set; }

        public Nullable<int> totalNumberOfManualImprinters { get; set; }
        public string holdOutAccountNumber { get; set; }
        public Nullable<bool> directPaymentLink { get; set; }
        public string fraudToolProvider { get; set; }
        public string gatewayIntegrationType { get; set; }
        public string principalDetailsRemarks { get; set; }
        public Nullable<int> holdOutAmount { get; set; }
        public string taxCode { get; set; }
        public string taxType { get; set; }


        public Nullable<int> payDelayDays { get; set; }
        public string otherDetailsRemarks { get; set; }

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

        public string AMEXKeyAcctIND { get; set; }

        public string CUPCardAcceptorId { get; set; }

        public Nullable<int> CUPTaxCode { get; set; }

        public string CUPTaxNumber { get; set; }

        public Nullable<System.DateTime> CUPTaxExemptExpiryDate { get; set; }
        public string goodsServices { get; set; }
        public Nullable<int> merchantGrade { get; set; }
        public string serviceProvider { get; set; }
        public Nullable<bool> cardHolderData { get; set; }
        public string cardHolderDataTobeStored { get; set; }
        public string branchCode { get; set; }
        public Nullable<int> imprinterTotal { get; set; }
        public string dbaZipCode { get; set; }
        public Nullable<int> regionCode { get; set; }
        public Nullable<int> checkDeliveryCode { get; set; }
        public string paymentMode { get; set; }

        public string creditSettlementAcctNo { get; set; }
        public string settlementAcctNo { get; set; }

         public Nullable<System.DateTime> taxExemptFrom { get; set; }

         public Nullable<System.DateTime> taxExemptTo { get; set; }

        public Nullable<int> taxExemptIssuedBy { get; set; }

        public string merchantGroupCode { get; set; }

        public string tin { get; set; }

        public Nullable<bool> withTax { get; set; }
        public Nullable<int> cardPlan { get; set; }
        public Nullable<bool> isActive { get; set; }
        public Nullable<bool> isAffiliated { get; set; }
        public string principalFirstName { get; set; }
        public string principalLastName { get; set; }

        public string principalMiddleName { get; set; }
        public string specialMailingAdd1 { get; set; }
        public string specialMailingAdd2 { get; set; }
        public string specialMailingAdd3 { get; set; }
        public string specialMailingAdd4 { get; set; }
        public string specialMailingCity { get; set; }
        public string specialMailingZipCode { get; set; }

        public string mailingAddress1 { get; set; }
        public string mailingAddress2 { get; set; }

        public string mailingAddress3 { get; set; }

        public string mailingAddress4 { get; set; }

        public string mailingCity { get; set; }

        public string mailingAddressZipCode { get; set; }

        public string debitSettlementAcctNo { get; set; }
        public Nullable<System.DateTime> taxExemptValidityFrom { get; set; }

        public Nullable<System.DateTime> taxExemptValidityTo { get; set; }

        public string taxExemptCertIssuedBy { get; set; }
        public string taxExemptClass { get; set; }

        public string registeredBusinessNo { get; set; }

        public Nullable<System.DateTime> DTIBusinessRegDate { get; set; }

        public Nullable<System.DateTime> SECRegDate { get; set; }

        public string nameOfAcquirer { get; set; }

        public Nullable<bool> ecrForInstallation { get; set; }

        public Nullable<bool> isSwipingCardWithoutInstalledECR { get; set; }

        public Nullable<bool> withInstalledECR { get; set; }

        public string settlementAccNoForDebit { get; set; }

        public string payeesName { get; set; }

        public string emailAddressForReportDist { get; set; }

        //public string soaRecipients { get; set; }

        public string soaEmailAddress { get; set; }

        public string emailAddress { get; set; }

        public Nullable<bool> reportDistributionPerCompany { get; set; }

        public Nullable<bool> reportPerBranch { get; set; }

        public string principalFbName { get; set; }

        public Nullable<System.DateTime> principalDateOfBirth { get; set; }

        public Nullable<int> principalCivilStatus { get; set; }

        public string principalPhoneNo { get; set; }

        public string principalPermanentAddress { get; set; }

        public Nullable<int> principalCity { get; set; }

        public Nullable<int> principalZipCode { get; set; }

        public Nullable<int> principalHomeOwnership { get; set; }

        public string spouseAddress { get; set; }

        public Nullable<int> spouseCity { get; set; }

        public string spouseFirstName { get; set; }

        public string spouseLastName { get; set; }

        public string spouseMiddleName { get; set; }

        public string spousePhoneNo { get; set; }

        public Nullable<int> spouseZipCode { get; set; }

        public string financialInstitution { get; set; }

        public string accountFacility { get; set; }

        public string acctLoanNo { get; set; }

        public string loanTerm { get; set; }

        public Nullable<int> noOfPos { get; set; }

        public Nullable<decimal> discountDebitRate { get; set; }

        public string storeId { get; set; }

        public string reportPerCompanysBranch { get; set; }

        public string ftpDir { get; set; }

        public Nullable<bool> genPayment { get; set; }

        public Nullable<bool> computeCWT { get; set; }

        public Nullable<bool> settlementPerBranch { get; set; }

        public string customerNo { get; set; }

        public Nullable<int> amexRating { get; set; }

        public string bdoPayRating { get; set; }

        public string amexRiskIndicator { get; set; }

        public Nullable<int> bdoPaySegment { get; set; }

        public string aoCode { get; set; }

        public string forMoto { get; set; }

        public Nullable<int> tranSource { get; set; }

        public string holdOutAcctNo { get; set; }


        public string remarks { get; set; }

        public string preparedBy { get; set; }

        public Nullable<System.DateTime> preparedDate { get; set; }

        public string notedBy { get; set; }

        public string notedDate { get; set; }

        public string controlNo { get; set; }

        public Nullable<bool> smsSending { get; set; }

        public Nullable<bool> withDependency { get; set; }

        public Nullable<bool> custr { get; set; }

        public Nullable<bool> postMaintReview { get; set; }

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

        public Nullable<int> mcId { get; set; }

        public Nullable<int> debitMailingAddressCity { get; set; }

        public Nullable<int> debitMailingAddressZipCode { get; set; }

        public Nullable<int> sendBdo030114 { get; set; }

        public string branch { get; set; }

        public string tradeCustomerName { get; set; }

        public string tradeContactNo { get; set; }

        public string debitMerchantNo { get; set; }

        public Nullable<bool> isSingleProp { get; set; }

        public Nullable<bool> isPartnershipCorp { get; set; }
        public Nullable<Guid> AuditLogGroupId { get; set; }
        public Nullable<System.DateTime> mdfDateTimeCreated { get; set; }

        public string legalName { get; set; }


        public string merchantNumber { get; set; }   

        public string paymentMethodCreditFac { get; set; }
        public Nullable<bool> withExistingAcquirer { get; set; }
        public string mailingAddressForPaymentDel { get; set; }
        public int reportSetting { get; set; }
        public string emailAddressForReportSetting { get; set; }
        public string debitFacilityRemarks { get; set; }
        public string nameAuthorizedSoaRecip { get; set; }
        public Nullable<decimal> merchDiscountRateDebitCrd { get; set; }
        public string thirdPartyCasa { get; set; }
        public string otherEmailAddress { get; set; }
        public string otherMobileNumber { get; set; }
        public string typeOfRelatedParty { get; set; }
        public string riNameRelation { get; set; }
        public string nameOfPep { get; set; }
        public Nullable<DateTime> cnpOrientationDate { get; set; }
        public string crteIssuedByCnp { get; set; }
        public string taxExemptClassCnp { get; set; }
        public Nullable<DateTime> cnpValidFrom { get; set; }     
        public Nullable<DateTime> cnpValidUntil { get; set; }  




        public string ownerName { get; set; }  
        public Nullable<DateTime> ownerBirthday { get; set; } 
        public string spouseName { get; set; }
        public virtual POSRequest POSRequest { get; set; }
        public virtual OIF OIF { get; set; }
        public virtual ICollection<POS> POS { get; set; }

        public virtual Request Request { get; set; }
        public int NewAffiliationId { get; set; }
        public virtual NewAffiliation NewAffiliation { get; set; }
        public virtual ICollection<MID> MIDs { get; set; }
    }
}
