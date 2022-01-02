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
        public ActionResult ProjectIndex()
        {
            return View();
        }

        public ActionResult ProjectEdit()
        {
            return PartialView("_PartialProjectEdit");
        }
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

        public ActionResult SubjectLinkEdit()
        {
            return PartialView("_PartialSubjectLinkEdit");
        }
        
        public ActionResult SubjectDetail(string ProjectId, string SubjectId, string Page)
        {
            ViewBag.ProjectId = ProjectId;
            ViewBag.SubjectId = SubjectId;
            ViewBag.Page = Page;

            return View();
        }
        #region 复审错误类型
        public ActionResult RecheckErrorTypeIndex()
        {
            return View();
        }
        public ActionResult RecheckErrorTypeEdit()
        {
            return PartialView("_PartialRecheckErrorTypeEdit");
        }
        #endregion
        #region 复审类型
        public ActionResult RecheckTypeIndex()
        {
            return View();
        }
        public ActionResult RecheckTypeEdit()
        {
            return PartialView("_PartialRecheckTypeEdit");
        }
        #endregion
        #region 试卷类型
        public ActionResult SubjectTypeExamIndex()
        {
            return View();
        }
        public ActionResult SubjectTypeExamEdit()
        {
            return PartialView("_PartialSubjectTypeExamEdit");
        }
        #endregion
        public ActionResult LoadPartial(string view)
        {
            return PartialView(view);
        }
        
    }
}