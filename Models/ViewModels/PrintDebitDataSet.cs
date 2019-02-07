using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace MAP_Web.Models.ViewModels
{
    public class PrintDebitDataSet
    {
        public string settlementAccNoForDebit { get; set; }
        public string payeesName { get; set; }
        public string emailAddressForReportDist { get; set; }
        public string mailingAddressForPaymentDel { get; set; }
    }
}