using com.yrtech.SurveyWeb.Attributes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.SurveyWeb.Controllers
{
    [AuthenAdmin]
    public class AppealController : Controller
    {

        // GET: Appeal
        public ActionResult AppealImport()
        {
            return View();
        }

        public ActionResult AppealIndex()
        {
            return View();
        }

        public ActionResult Edit(string appealId)
        {
            ViewBag.AppealId = appealId;
            return View();
        }

    }
}