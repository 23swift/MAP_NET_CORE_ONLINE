using System;

namespace MAP_Web.Models.ViewModels
{
    public class PrintAdmrcDataSet
    {
        public string dccRebateRate { get; set; }
        public string thirdPartyCasa { get; set; }
        public string otherEmailAddress { get; set; }
        public string otherMobileNumber { get; set; }
        public string typeOfRelatedParty { get; set; }
        public string riNameRelation { get; set; }
        public string nameOfPep { get; set; }
        public string fraudToolProviderId { get; set; }
        public string cnpOrientationDate { get; set; }
        public string directPaymentLink { get; set; }
        public string gatewayIntegrationType { get; set; }
        public string crteIssuedByCnp { get; set; }
        public string taxExemptClassCnp { get; set; }
        public Nullable<DateTime> validFrom { get; set; }
        public Nullable<DateTime> validUntil { get; set; }

    }
}