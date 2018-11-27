using MAP_Web.Models;
using System;

namespace MAP_Web.Models.ViewModels
{
    public class MIDViewModel
    {        
        public int Id { get; set; }
        public Nullable<int> cardPlans { get; set; }
        public Nullable<int> monitorCode { get; set; }
        public Nullable<int> defaultTransSrc { get; set; }
        public Nullable<bool> currencyPhp { get; set; }
        public Nullable<bool> currencyUsd { get; set; }
        public Nullable<bool> majorPurchase { get; set; }
        public Nullable<bool> offUs { get; set; }
        public Nullable<int> status { get; set; }
        public string cupAcceptorId { get; set; }
        public Nullable<int> serviceFeeStraight { get; set; }
        public Nullable<int> merchantGroupCode { get; set; }
        public string serviceFeeRate { get; set; }
        public Nullable<bool> amexMna { get; set; }
        public string intesCode { get; set; }
        public string payDelayDays { get; set; }
        public Nullable<int> merchantPromotionsGroup { get; set; }
        public Nullable<int> defaultMpPromotion { get; set; }
        public Nullable<int> forMoto { get; set; }
        public string dccMarkupRate { get; set; }
        public string dccMerchantRebate { get; set; }
        public int BranchId { get; set; }
        public BranchViewModel Branch { get; set; }
    }
}