using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace MAP_Web.Models.ViewModels
{
    public class BranchViewModel
    {
        public BranchViewModel()
        {
            // this.ecrForInstallation = false;
            // this.isSwipingCardWithoutInstalledECR = false;
            // this.isSwipingCardWithInstalledECR = false;
            // this.isActive = true;
            // this.withAcquirer = true;
            // this.withDependency = true;
            // this.withTax = true;

            // this.MIDs = new Collection<MID>();
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
        public string tppOnly { get; set; }
        public string strategicMerchant { get; set; }
        public string mcAssignedId { get; set; }
        public string areaMallCode { get; set; }
        public string imprinterName { get; set; }
        public string imprinterNumber { get; set; }
        public string imprinterAmex { get; set; }
        public string imprinterDc { get; set; }
        public string imprinterJcb { get; set; }
        public string imprinterOthers { get; set; }
        public Nullable<int> totalNumberOfManualImprinters { get; set; }
        public string holdOutAccountNumber { get; set; }
        public Nullable<bool> directPaymentLink { get; set; }
        public string fraudToolProvider { get; set; }
        public string gatewayIntegrationType { get; set; }
        public string principalDetailsRemarks { get; set; }
        public Nullable<int> holdOutAmount { get; set; }




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

        public string AMEXKeyAcctIND { get; set; }

        public string CUPCardAcceptorId { get; set; }

        public Nullable<int> CUPTaxCode { get; set; }

        public string CUPTaxNumber { get; set; }

        public Nullable<System.DateTime> CUPTaxExemptExpiryDate { get; set; }


        public string principalName1 { get; set; }

        public string principalName2 { get; set; }

        public string principalName3 { get; set; }

        public string principalName4 { get; set; }

        public string principalName5 { get; set; }

        public string goodsServices { get; set; }

        public string phoneNo { get; set; }

        public string mobileNo { get; set; }

        public string emailAddress { get; set; }

        public string mailingAddress1 { get; set; }

        public Nullable<bool> withECR { get; set; }

        public Nullable<int> merchantGrade { get; set; }

        public string serviceProvider { get; set; }

        public string website { get; set; }

        public Nullable<bool> cardHolderData { get; set; }

        public string cardHolderDataTobeStored { get; set; }

        public string branchCode { get; set; }

        public Nullable<int> imprinterTotal { get; set; }

        public Nullable<int> dbaZipCode { get; set; }

        public Nullable<int> regionCode { get; set; }

        public Nullable<int> checkDeliveryCode { get; set; }

        public string paymentMode { get; set; }

        public string settlementAcctNo { get; set; }

        public string merchantGroupCode { get; set; }

        public string TIN { get; set; }

        public Nullable<bool> withTax { get; set; }

        public Nullable<int> cardPlan { get; set; }

        public Nullable<bool> isActive { get; set; }

        public Nullable<bool> isAffiliated { get; set; }

        public string principalFirstName { get; set; }

        public string principalLastName { get; set; }

        public string principalMiddleName { get; set; }

        public string mailingAddress2 { get; set; }

        public string mailingAddress3 { get; set; }

        public string mailingAddress4 { get; set; }

        public Nullable<int> mailingCity { get; set; }

        public Nullable<int> mailingAddressZipCode { get; set; }

        public Nullable<System.DateTime> taxExemptFrom { get; set; }

        public Nullable<System.DateTime> taxExemptTo { get; set; }

        public Nullable<int> taxExemptIssuedBy { get; set; }

        public string registeredBusinessNo { get; set; }

        public Nullable<System.DateTime> DTIBusinessRegDate { get; set; }

        public Nullable<System.DateTime> SECRegDate { get; set; }

        public Nullable<bool> withAcquirer { get; set; }

        public string acquirerInstitutionName { get; set; }

        public Nullable<bool> ecrForInstallation { get; set; }

        public Nullable<bool> isSwipingCardWithoutInstalledECR { get; set; }

        public Nullable<bool> isSwipingCardWithInstalledECR { get; set; }

        public string debitSettlementAcctNo { get; set; }

        public string payeesName { get; set; }

        public string emailAddressForReport { get; set; }

        public string SOARecipients { get; set; }

        public string SOAEmailAddress { get; set; }

        public Nullable<bool> reportDistributionperCompany { get; set; }

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

        public string feeAccount { get; set; }

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

        public Nullable<int> NewAffiliationId { get; set; }
        public virtual NewAffiliation NewAffiliation { get; set; }
    }
}