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
            List<AccountDto> userList = CommonHelper.DecodeString<List<AccountDto>>(loginUser);
            if (userList != null && userList.Count > 0)
            {
                Session["LoginUser"] = userList[0];
            }
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
        public ActionResult AccountIndex()
        {
            return View();
        }
        #endregion
    }
}