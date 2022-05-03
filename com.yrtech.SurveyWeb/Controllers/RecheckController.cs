using com.yrtech.SurveyWeb.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.SurveyWeb.Controllers
{
    [AuthenAdmin]
    public class RecheckController : Controller
    {
        //
        // GET: /Recheck/
        public ActionResult RecheckStatusIndex()
        {
            return View();
        }
        public ActionResult RecheckIndex()
        {
            return View();
        }
        public ActionResult RecheckStatusDtl()
        {
            return PartialView("_PartialRecheckStatusDtl");
        }
        public ActionResult Detail(string projectId,string shopId,string subjectRecheckTypeId,string statusName)
        {
            ViewBag.ProjectId = projectId;
            ViewBag.ShopId = shopId;
            ViewBag.SubjectRecheckTypeId = subjectRecheckTypeId;
            ViewBag.StatusName = statusName;
            return View();
        }
        
	}
}