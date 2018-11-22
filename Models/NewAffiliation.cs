using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
namespace MAP_Web.Models
{
    public class NewAffiliation
    {
        public NewAffiliation()
        {
            Branches = new HashSet<Branch>();
            this.DocumentChecklists = new Collection<DocumentChecklist>();
        }
             
        [ForeignKey("Request")]
        public Int32 Id { get; set; }
        public Int32 Status { get; set; }
        public string userScreenFlow { get; set; }
        public string eMail { get; set; }
        public virtual CustomerProfile CustomerProfile { get; set; }
        public virtual ICollection<Branch> Branches { get; set; }
        public virtual ICollection<DocumentChecklist> DocumentChecklists { get; set; }

        public virtual Request Request { get; set; }
    }
}