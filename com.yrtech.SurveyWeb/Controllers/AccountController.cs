using com.yrtech.SurveyWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace com.yrtech.SurveyWeb.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Login(string ReturnUrl)
        {
            ViewBag.ReturnUrl = ReturnUrl;
            return View();
        }

        public ActionResult AfterLogin(string loginUser)
        {
            AccountDto LoginUser = CommonHelper.DecodeString<AccountDto>(loginUser);
            Session["LoginUser"] = LoginUser;
            return Json("", JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logoff()
        {
            Session["LoginUser"] = null;
            return this.Redirect("~/");
        }

        public ActionResult ChangePassword()
        {
            return View();
        }
        #region 账号管理
        public ActionResult ShopAccountIndex()
        {
            return View();
        }
        public ActionResult SurveyAccountIndex()
        {
            return View();
        }

        public ActionResult AccountEdit()
        {
            return PartialView("_PartialAccountEdit");
        }
        public ActionResult RelateUserInfoObject()
        {
            return PartialView("_PartialUserInfoObject");
        }
        public ActionResult RelateUserInfoObjectSurveyAccount()
        {
            return PartialView("_PartialUserInfoObjectSurveyAccount");
        }
        public ActionResult RelateUserInfoBrand()
        {
            return PartialView("_PartialUserInfoBrand");
        }


        public ActionResult OpenUserInfoImport()
        {
            return PartialView("_PartialShopAccountImport");
        }

        public ActionResult OpenUserInfoObjectImport()
        {
            return PartialView("_PartialUserInfoObjectImport");
        }
        #endregion
    }
}