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
    public class EasyPhotoController : Controller
    {

        
        public ActionResult EasyPhotoProjectIndex()
        {
            return View();
        }
        public ActionResult EasyPhotoProjectEdit()
        {
            return PartialView("_PartialEasyPhotoProjectEdit");
        }
    }
}