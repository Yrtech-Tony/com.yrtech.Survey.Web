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
        public ActionResult RecheckIndex2()
        {
            return View();
        }
        public ActionResult RecheckModify()
        {
            return View();
        }
        public ActionResult RecheckConfirm()
        {
            return View();
        }
        public ActionResult SpotCheck1()
        {
            return View();
        }
        public ActionResult SpotCheck2()
        {
            return View();
        }
        public ActionResult RecheckStatusDtl()
        {
            return PartialView("_PartialRecheckStatusDtl");
        }
        public ActionResult RecheckEdit()
        { 
            return PartialView("_PartialRecheckEdit");
        }
        public ActionResult RecheckEdit2()
        {
            return PartialView("_PartialRecheckEdit2");
        }
        public ActionResult Detail(string projectId,string shopId,string subjectRecheckTypeId,string statusName)
        {
            ViewBag.ProjectId = projectId;
            ViewBag.ShopId = shopId;
            ViewBag.SubjectRecheckTypeId = subjectRecheckTypeId;
            ViewBag.StatusName = statusName;
            return View();
        }

        public ActionResult RecheckBatchIndex()
        {
            return View();
        }

        public ActionResult FirstRecheckIndex()
        {
            return View();
        }

        public ActionResult FirstRecheckDetail(string brandId, string projectId, string shopId)
        {
            ViewBag.BrandId = brandId;
            ViewBag.ProjectId = projectId;
            ViewBag.ShopId = shopId;
            return View();
        }

        public ActionResult FirstRecheckEdit()
        {
            return PartialView("_PartialFirstRecheckEdit");
        }


        public ActionResult SecondRecheckIndex()
        {
            return View();
        }
        public ActionResult SecondRecheckDetail(string brandId, string projectId, string shopId)
        {
            ViewBag.BrandId = brandId;
            ViewBag.ProjectId = projectId;
            ViewBag.ShopId = shopId;
            return View();
        }

        public ActionResult SecondRecheckEdit()
        {
            return PartialView("_PartialSecondRecheckEdit");
        }
	}
}