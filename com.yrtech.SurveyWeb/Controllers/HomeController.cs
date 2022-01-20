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
        public ActionResult LabelIndex()
        {
            return View();
        }
        public ActionResult LabelEdit()
        {
            return PartialView("_PartialLabelEdit");
        }
        public ActionResult Main()
        {
            return View();
        }
	}
}