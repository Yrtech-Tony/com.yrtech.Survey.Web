using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.SurveyWeb.Controllers
{
    public class OperateController : Controller
    {
        //
        // GET: /Operate/
        public ActionResult RecheckStatusIndex()
        {
            return View();
        }

        public ActionResult ScoreOperateIndex()
        {
            return View();
        }
	}
}