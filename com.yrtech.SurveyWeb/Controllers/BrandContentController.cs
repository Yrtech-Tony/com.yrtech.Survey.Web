using com.yrtech.SurveyWeb.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.SurveyWeb.Controllers
{
    [AuthenAdmin]
    public class BrandContentController : Controller
    {

        public ActionResult ShopIndex()
        {
            return View();
        }

        public ActionResult ProjectIndex()
        {
            return View();
        }

        public ActionResult SbjectTypeExamIndex()
        {
            return View();
        }

        public ActionResult ProjectEdit()
        {
            return PartialView("_PartialProjectEdit");
        }
        
    }
}
