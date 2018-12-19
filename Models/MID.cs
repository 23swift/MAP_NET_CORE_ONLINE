using System;

namespace MAP_Web.Models
{
    public class MID
    {
        public int Id { get; set; }
        public string cardPlans { get; set; }
        public string monitorCode { get; set; }
        public string defaultTransSrc { get; set; }
        public Nullable<bool> currencyPhp { get; set; }
        public Nullable<bool> currencyUsd { get; set; }
        public Nullable<bool> majorPurchase { get; set; }
        public Nullable<bool> offUs { get; set; }
        public Nullable<int> status { get; set; }
        public string cupAcceptorId { get; set; }
        public string serviceFeeStraight { get; set; }
        public string merchantGroupCode { get; set; }
        public Nullable<decimal> serviceFeeRate { get; set; }
        public Nullable<bool> amexMna { get; set; }
        public string dinersIse { get; set; }
        public Nullable<int> payDelayDays { get; set; }
        public string merchantPromotionsGroup { get; set; }
        public string defaultMpPromotion { get; set; }
        public Nullable<int> forMoto { get; set; }
        public string dccMarkupRate { get; set; }
        public string dccMerchantRebate { get; set; }
        public Nullable<Guid> AuditLogGroupId { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
    }
}