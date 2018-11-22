using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MAP_Web.Models
{
    public class ServiceFeeContract : BaseEntity
    {
        public int Id { get; set; } 
        public string Code { get; set; }
        public string Value { get; set; }
        public double SFRate { get; set; }
    }
}