using System;
using System.Collections.Generic;

namespace MAP_Web.Models
{
    public class POS
    {
        public int Id { get; set; }
        public Nullable<int> natureOfRequest { get; set; }
        public Nullable<int> reprogrammingType { get; set; }
        public Nullable<int> tidIssuanceType { get; set; }
        public string requestersName { get; set; }
        public string requestersBusinessUnit { get; set; }
        public string requestersContactNumber { get; set; }
        public Nullable<int> area { get; set; }
        public Nullable<int> accountOfficerHandler { get; set; }
        public Nullable<int> businessTypeOfAccount { get; set; }
        public Nullable<int> businessUnitAO { get; set; }
        public string segment { get; set; }
        public string approvedBy { get; set; }
        public string merchantLegalName { get; set; }
        public string merchantDBAName { get; set; }
        public string merchantNameOnSignage { get; set; }
        public string merchantDbaAddress { get; set; }
        public string merchantDbaAddressOld { get; set; }
        public string merchantDbaCity { get; set; }
        public Nullable<bool> isContactlessMerchant { get; set; }
        public Nullable<bool> isMultiMerchant { get; set; }
        public string merchantCategoryCode { get; set; }
        public string nsp { get; set; }
        public string contactPerson { get; set; }
        public string contactNumber { get; set; }
        public string numberOfPrintedSlips { get; set; }
        public string reasonForThreeSlipsPrinting { get; set; }
        public Nullable<DateTime> requiredDateAndTimeOfDispatch { get; set; }
        public Nullable<bool> isInstallationTerm { get; set; }
        public Nullable<DateTime> requiredPullOutDateForTempPOSTerminals { get; set; }
        public string reasonForPermanentGPRSInstallation { get; set; }
        public string otherRequiredProfilingFacility { get; set; }
        public Nullable<bool> isTipAdjust { get; set; }
        public Nullable<int> mustSettle { get; set; }
        public Nullable<bool> isHotelSetupFacility { get; set; }
        public Nullable<bool> isManualKeyInFacility { get; set; }
        public string remarksSpecialInstructions { get; set; }
        public string creditStraightTidExisting { get; set; }
        public string creditStraightTidNew { get; set; }
        public Nullable<DateTime> dateAndTimeEndorsedToMAU { get; set; }
        public string creditStraightMidVmjaVmjacd { get; set; }
        public string creditStraightMidVmj { get; set; }
        public string creditStraightMidAmex { get; set; }
        public string dinersMID { get; set; }
        public string cupAcceptorId { get; set; }
        public string merchantLoyalty { get; set; }
        public string merchantPrepaid { get; set; }
        public string creditStraightMidVmjaVmjacVmjacd { get; set; }
        public string creditStraightMidVmjaVmjacVmjacdNew { get; set; }
        public string creditStraightMidVmjaVmjacVmjacdOffUs { get; set; }
        public string creditStraightMidVmjOffUs { get; set; }
        public string creditStraightMidAmexOffUs { get; set; }
        public string creditStraightMidVmjaVmjacVmjacdUsd { get; set; }
        public string creditStraightMidVmjUsd { get; set; }
        public string creditStraightMidAmexUsd { get; set; }
        public string smEcardMid { get; set; }
        public string smPartnerPlusMid { get; set; }
        public string regularInstallmentMidVmjaVmjacVmjacd { get; set; }
        public string regularInstallmentMidVmj { get; set; }
        public string regularInstallmentMidAmex { get; set; }
        public string zeroInstallmentMidVmjaVmjacVmjacd { get; set; }
        public string zeroInstallmentMidVmj { get; set; }
        public string zeroInstallmentMidAmex { get; set; }
        public string regularBnplInstallmentMidVmjaVmjacVmjacd { get; set; }
        public string zeroBnplInstallmentMidVmjaVmjacVmjacd { get; set; }
        public string debitTid { get; set; }
        public string dccMarkup { get; set; }
        public string emailSubject { get; set; }
        public Nullable<DateTime> dateTimeAssignedPSProfiling { get; set; }
        public Nullable<DateTime> dateTimeEndorsedPaymentSolutionsOperations { get; set; }
        public string bdoPayMobileNumberOfTerminals { get; set; }
        public string bdoPayMobileBusinessGroup { get; set; }
        public string bdoPayMobileMerchantPortalUserEmailAddress { get; set; }
        public string bdoPayMobileMerchantPortalNominatedUsername { get; set; }
        public string bdoPayMobileInternetConnection { get; set; }
        public string bdoPayMobileInternetProvider { get; set; }
        public string bdoPayMobileReferenceField { get; set; }
        public string bdoPayMobileRfName { get; set; }
        public string tidIssuedBy { get; set; }
        public Nullable<DateTime> dateAndTimeTidIssued { get; set; }
        public Nullable<bool> isWaved { get; set; }
        public Nullable<bool> isShared { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public virtual ICollection<TerminalDetails> TerminalDetails {get;set;}
    }
}