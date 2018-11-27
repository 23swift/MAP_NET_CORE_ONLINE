namespace MAP_Web.Models
{
    public class Signatories
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string signingAuthority { get; set; }
        public string position { get; set; }
        public int applicableTo { get; set; }
        public string dbaName { get; set; }
        public int CustomerProfileId { get; set; }
        public CustomerProfile CustomerProfile { get; set; }
    }
}