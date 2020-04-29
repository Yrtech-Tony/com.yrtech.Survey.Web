using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace com.yrtech.SurveyWeb.Models
{
    public class Brand
    {
        public int BrandId { get; set; }
        public Nullable<int> TenantId { get; set; }
        public string BrandCode { get; set; }
        public string BrandName { get; set; }
        public string Remark { get; set; }
        public Nullable<int> InUserId { get; set; }
        public Nullable<System.DateTime> InDateTime { get; set; }
        public Nullable<int> ModifyUserId { get; set; }
        public Nullable<System.DateTime> ModifyDateTime { get; set; }
    }
}