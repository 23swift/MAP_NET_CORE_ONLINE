using System;

namespace MAP_Web.Models.ViewModels
{
    public class DocumentChecklistViewModel
    {
        public int Id { get; set; }
        public int documentName { get; set; }
        public string remarks { get; set; }
        public bool submitted { get; set; }
        public Nullable<DateTime> targetDateOfSubmission { get; set; }
        public Nullable<DateTime> dateSubmitted { get; set; }
        public byte[] fileUpload { get; set; }
        public int NewAffiliationId { get; set; }
        public NewAffiliation NewAffiliation { get; set; }
    }
}