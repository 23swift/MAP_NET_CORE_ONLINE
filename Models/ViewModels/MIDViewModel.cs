using MAP_Web.Models;
using System;

namespace MAP_Web.Models.ViewModels
{
    public class MIDViewModel
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
        public string serviceFeeRate { get; set; }
        public Nullable<bool> amexMna { get; set; }
        public string intesCode { get; set; }
        public string payDelayDays { get; set; }
        public string merchantPromotionsGroup { get; set; }
        public string defaultMpPromotion { get; set; }
        public Nullable<int> forMoto { get; set; }
        public string dccMarkupRate { get; set; }
        public string dccMerchantRebate { get; set; }
        public int BranchId { get; set; }
        public BranchViewModel Branch { get; set; }
    }
}