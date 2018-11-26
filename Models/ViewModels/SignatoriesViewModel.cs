namespace MAP_Web.Models.ViewModels
{
    public class SignatoriesViewModel
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string signingAuthority { get; set; }
        public string position { get; set; }
        public int applicableTo { get; set; }
        public string dbaName { get; set; }
        public int CustomerProfileId { get; set; }
        public CustomerProfileViewModel CustomerProfile { get; set; }
    }
}