using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;


namespace MAP_Web.Models
{
    public class BUMaintenance : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<int> Role { get; set; }
        public int UserId { get; set; }
    }
}