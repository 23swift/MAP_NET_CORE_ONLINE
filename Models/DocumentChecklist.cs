using System;

namespace MAP_Web.Models
{
    public class DocumentChecklist
    {
        public int Id { get; set; }
        public int documentName { get; set; }
        public string remarks { get; set; }
        public bool submitted { get; set; }
        public Nullable<DateTime> targetDateOfSubmission { get; set; }
        public Nullable<DateTime> dateSubmitted { get; set; }
        public byte[] fileUpload { get; set; }
        public string submittedBy { get; set; }
        public int NewAffiliationId { get; set; }
        public NewAffiliation NewAffiliation { get; set; }
    }
}