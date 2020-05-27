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
        public ActionResult ShopEdit()
        {
            return PartialView("_PartialShopEdit");

        }

        public ActionResult ProjectIndex()
        {
            return View();
        }

        public ActionResult ProjectEdit()
        {
            return PartialView("_PartialProjectEdit");
        }

        public ActionResult AreaIndex()
        {
            return View();
        }

        public ActionResult AreaEdit()
        {
            return PartialView("_PartialAreaEdit");
        }

        public ActionResult SetChildArea()
        {
            return PartialView("_PartialSetChildArea");
        }

        public ActionResult SetShop()
        {
            return PartialView("_PartialSetShop");
        }

        public ActionResult GroupIndex()
        {
            return View();
        }

        public ActionResult GroupEdit()
        {
            return PartialView("_PartialGroupEdit");
        }

        public ActionResult OpenAreaImport()
        {
            return View("_PartialAreaImport");
        }
        public ActionResult OpenAreaShopImport()
        {
            return View("_PartialAreaShopImport");
        }
        public ActionResult OpenShopImport()
        {
            return View("_PartialShopImport");
        }
    }
}