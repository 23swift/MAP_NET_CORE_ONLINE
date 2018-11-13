using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using MAP_Web.Models;

namespace MAP_Web.Models.ViewModels
{
    public class CustomerProfileViewModel
    {
        public CustomerProfileViewModel()
        {
            this.Owners = new Collection<Owners>();
            this.Signatories = new Collection<Signatories>();
            this.Branches = new Collection<Branch>();
        }
        public int Id { get; set; }
        public string legalName { get; set; }
        public int ownership { get; set; }
        public Nullable<DateTime> dtiRegDate { get; set; }
        public string registeredBusinessNumber { get; set; }
        public string customerNumber { get; set; }
        public int RequestId { get; set; }
        public Request Request { get; set; }
        public ICollection<Owners> Owners { get; set; }
        public ICollection<Signatories> Signatories { get; set; }
        public ICollection<Branch> Branches { get; set; }   
    }
}