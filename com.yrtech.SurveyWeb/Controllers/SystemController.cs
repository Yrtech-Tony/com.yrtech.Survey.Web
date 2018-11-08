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
        public ActionResult Brand()
        {
            return View();
        }

        public ActionResult Tenant()
        {
            return View();
        }

        public ActionResult Project()
        {
            return View();
        }

        public ActionResult SubjectLink()
        {
            return View();
        }

        public ActionResult Subject()
        {
            return View();
        }
        
	}
}