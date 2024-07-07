using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using com.yrtech.SurveyWeb.Attributes;

namespace com.yrtech.SurveyWeb.Controllers
{
    [AuthenAdmin]
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

        public ActionResult UserInfoForBrand(string BrandId, string BrandCode, string BrandName)
        {
            ViewBag.BrandId = BrandId;
            ViewBag.BrandCode = BrandCode;
            ViewBag.BrandName = BrandName;
            return PartialView("_PartialUserInfoForBrand");
        }
        public ActionResult BrandEdit()
        {
            return PartialView("_PartialBrandEdit");
        }

        public ActionResult Notice()
        {
            return View();
        }

        public ActionResult NoticeEdit()
        {
            return View("_PartialNoticeEdit");
        }
	}
}