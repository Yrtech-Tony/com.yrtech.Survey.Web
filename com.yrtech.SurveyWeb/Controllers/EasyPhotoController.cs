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
        public ActionResult EasyPhotoUserInfoIndex()
        {
            return View();
        }
        public ActionResult EasyPhotoUserInfoEdit()
        {
            return PartialView("_PartialEasyPhotoUserInfoEdit");
        }

        public ActionResult EasyPhotoNoteIndex()
        {
            return View();
        }
        public ActionResult EasyPhotoNoteEdit()
        {
            return PartialView("_PartialEasyPhotoNoteEdit");
        }
        
        public ActionResult EasyPhotoPhotoListIndex()
        {
            return View();
        }
        public ActionResult EasyPhotoPhotoListEdit()
        {
            return PartialView("_PartialEasyPhotoPhotoListEdit");
        }
        
        public ActionResult EasyPhotoOtherPropertyIndex()
        {
            return View();
        }
        public ActionResult EasyPhotoOtherPropertyEdit()
        {
            return PartialView("_PartialEasyPhotoOtherPropertyEdit");
        }

        public ActionResult EasyPhotoCheckTypeIndex()
        {
            return View();
        }
        public ActionResult EasyPhotoCheckTypeEdit()
        {
            return PartialView("_PartialEasyPhotoUserInfoShopEdit");
        }

        public ActionResult EasyPhotoUserInfoShopIndex()
        {
            return View();
        }
        public ActionResult EasyPhotoUserInfoShopEdit()
        {
            return PartialView("_PartialEasyPhotoUserInfoShopEdit");
        }

        public ActionResult EasyPhotoAnswerIndex()
        {
            return View();
        }
        public ActionResult EasyPhotoAnswerEdit()
        {
            return PartialView("_PartialEasyAnswerEdit");
        }
        
    }
}