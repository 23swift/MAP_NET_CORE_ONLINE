

namespace MAP_Web.Models
{
    using System.ComponentModel.DataAnnotations;
    using System;
    using System.Collections.Generic;
    
    public partial class MaintenanceDetails:BaseEntity
    {
     
        public MaintenanceDetails()
        {
            this.Code = "";
            this.SubCategoryId = 0;
        }
    
        public int Id { get; set; }
        public string Value { get; set; }
        public bool isDeleted { get; set; }
        public string Code { get; set; }
        public int SubCategoryId { get; set; }
        public virtual MaintenanceMaster MaintenanceMaster { get; set; }
    }
}
