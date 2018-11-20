using com.yrtech.SurveyWeb.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.SurveyWeb.Controllers
{
    [AuthenAdmin]
    public class ProjectContentController : Controller
    {
        // GET: SubjectContent
        public ActionResult SubjectIndex(string Page)
        {
            ViewBag.Page = Page;
            return View();
        }

        // GET: SubjectContent
        public ActionResult SubjectInspectionStandardIndex()
        {
            return View();
        }

        // GET: SubjectContent
        public ActionResult SubjectFileIndex()
        {
            return View();
        }

        // GET: SubjectContent
        public ActionResult SubjectLossResultIndex()
        {
            return View();
        }

        // GET: SubjectContent
        public ActionResult SubjectTypeScoreRegionIndex()
        {
            return View();
        }

        // GET: SubjectContent
        public ActionResult SubjectLinkIndex()
        {
            return View();
        }

        // GET: SubjectContent
        public ActionResult ShopByProjectIndex()
        {
            return View();
        }
        
        public ActionResult SubjectEdit()
        {
            return PartialView("_PartialSubjectEdit");
        }

        public ActionResult SubjectIndexEdit()
        {
            return PartialView("_PartialSubjectIndexEdit");
        }
        
        public ActionResult SubjectDetail(string ProjectId, string SubjectId, string Page)
        {
            ViewBag.ProjectId = ProjectId;
            ViewBag.SubjectId = SubjectId;
            ViewBag.Page = Page;

            return View();
        }

        public ActionResult LoadPartial(string view)
        {
            return PartialView(view);
        }
        
    }
}