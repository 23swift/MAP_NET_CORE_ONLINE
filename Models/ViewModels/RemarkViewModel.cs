using System;

namespace MAP_Web.Models.ViewModels
{
    public class RemarkViewModel
    {
        public int id { get; set; }
        public string remarks { get; set; }
        public string user { get; set; } 
        public System.DateTime date { get; set; }
        public int status { get; set; }
        public int RequestId { get; set; }
        public virtual Request Request { get; set; }            
    }
}