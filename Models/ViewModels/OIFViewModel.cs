using System;

namespace MAP_Web.Models.ViewModels
{
    public class OIFViewModel
    {
        public OIFViewModel()
        {
            this.adverseFindings = false;
        }
        public int Id { get; set; }
        public string dbaName { get; set; }
        public string dbaAddress1 { get; set; }
        public string dbaAddress2 { get; set; }
        public string dbaAddress3 { get; set; }
        public string dbaAddress4 { get; set; }
        public string dbaCity { get; set; }
        public string outskirt { get; set; }
        public string contactPerson { get; set; }
        public string position { get; set; }
        public string phoneNo { get; set; }
        public string mobileNo { get; set; }
        public string natureOfBusiness { get; set; }
        public string productsOfferedSold { get; set; }
        public string numberOfYearsOperating { get; set; }
        public string businessHours { get; set; }
        public string noOfFulltimeEmployees { get; set; }
        public string contractual { get; set; }
        public string premiseStatus { get; set; }
        public string monthlyRent { get; set; }
        public string lengthOfStay { get; set; }
        public string location { get; set; }
        public string businessSignage { get; set; }
        public string typeOfPremise { get; set; }
        public string floorArea { get; set; }
        public Nullable<bool> interiorAppearance { get; set; }
        public Nullable<bool> exteriorAppearance { get; set; }
        public Nullable<bool> stocksInventory { get; set; }
        public Nullable<bool> equipment { get; set; }
        public Nullable<bool> withHighCardTraffic { get; set; }
        public string surroundingEstablishment { get; set; }
        public string otherMarketingChannelSource { get; set; }
        public string averageNoOfTransactionMonth { get; set; }
        public string nameOfEvent { get; set; }
        public string venue { get; set; }
        public string typeOfEvent { get; set; }
        public string expectedNoOfBuyers { get; set; }
        public string productsServicesSoldOffered { get; set; }
        public string priceRangeOfProductsServices { get; set; }
        public string expectedNoOfParticipants { get; set; }
        public string averageRegistration { get; set; }
        public Nullable<DateTime> inclusiveDateOfEvent { get; set; }
        public string nameOfLastEvent { get; set; }
        public string venueOfTheLastEvent { get; set; }
        public Nullable<DateTime> dateOfTheLastEvent { get; set; }
        public string totalSalesVolume { get; set; }
        public string nameOfTheLastAcquirer { get; set; }
        public Nullable<bool> overAllRating { get; set; }
        public Nullable<bool> adverseFindings { get; set; }
        public Nullable<int> incompleteReportDueTo { get; set; }
        public string remarks { get; set; }
        public string informantsName { get; set; }
        public string informantsPosition { get; set; }
        public string inspectedBy { get; set; }
        public Nullable<DateTime> dateInspected { get; set; }
        public string reviewedBy { get; set; }
        public Nullable<DateTime> dateReviewed { get; set; }
        public Nullable<bool> isWaved { get; set; }
        public int BranchId { get; set; }
        public BranchViewModel Branch { get; set; }
    }
}