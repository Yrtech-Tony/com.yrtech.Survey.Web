using com.yrtech.SurveyWeb.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.SurveyWeb.Controllers
{
    [AuthenAdmin]
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }
	}
}