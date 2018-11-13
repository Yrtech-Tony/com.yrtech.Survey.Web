using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace com.yrtech.SurveyWeb.Controllers
{
    public class SystemController : Controller
    {
        //
        // GET: /System/
        public ActionResult BrandIndex()
        {
            return View();
        }

        public ActionResult TenantIndex()
        {
            return View();
        }
                
	}
}