namespace MAP_Web.Models
{
    public class Signatories
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string signingAuthority { get; set; }
        public string position { get; set; }
        public int applicableTo { get; set; }
    }
}