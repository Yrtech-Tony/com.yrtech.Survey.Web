using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.SurveyWeb.Controllers
{
    public class ReportController : Controller
    {
        //
        // GET: /Report/
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ReportAreaIndex()
        {
            return View();
        }

        public ActionResult stat()
        {
            return View();
        }

        public ActionResult FileUploading()
        {
            return PartialView("_PartialFileUploading");
        }
        public ActionResult FileUploadingArea()
        {
            return PartialView("_PartialFileUploadingArea");
        }

        public ActionResult LogIndex()
        {
            return View();
        }
        public ActionResult ReportSet()
        {
            return View();
        }

        public ActionResult ChapterIndex()
        {
            return View();
        }
        public ActionResult ChapterEdit()
        {
            return PartialView("_PartialChapterEdit");
        }
        public ActionResult OpenChapterSubjectImport()
        {
            return PartialView("_PartialChapterSubjectImport");
        }
        public ActionResult OpenChapterSubject()
        {
            return PartialView("_PartialChapterSubject");
        }

        public ActionResult ReportTypeIndex()
        {
            return View();
        }
        public ActionResult ReportTypeEdit()
        {
            return PartialView("_PartialReportTypeEdit");
        }
        public ActionResult OpenReportTypeShopImport()
        {
            return PartialView("_PartialReportTypeShopImport");
        }
        public ActionResult OpenReportTypeShop()
        {
            return PartialView("_PartialReportTypeShop");
        }
        public ActionResult ReportJobIndex()
        {
            return View();
        }
        public ActionResult OpenReportJobImport()
        {
            return PartialView("_PartialReportJobImport");
        }

    }
}