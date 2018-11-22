using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace MAP_Web.Models
{
    public class CustomerProfile
    {
        public CustomerProfile()
        {
            this.Owners = new Collection<Owners>();
            this.Signatories = new Collection<Signatories>();
        }
        public int Id { get; set; }
        public string legalName { get; set; }
        public int ownership { get; set; }
        public Nullable<DateTime> dtiRegDate { get; set; }
        public string registeredBusinessNumber { get; set; }
        public string customerNumber { get; set; }
        public int NewAffiliationId { get; set; }
        public NewAffiliation NewAffiliation { get; set; }
        public ICollection<Owners> Owners { get; set; }
        public ICollection<Signatories> Signatories { get; set; }
    }
}