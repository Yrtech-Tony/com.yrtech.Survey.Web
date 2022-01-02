using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.SurveyWeb.Controllers
{
    public class WechatOAuthController : Controller
    {
        //
        // GET: /WechatOAuth/
        public async Task<ActionResult> Index()
        {
            WechatUtils wechatUtil = new WechatUtils();
            ReturnJson json = await wechatUtil.GetRedirectUrl();
            return Redirect(json.Res.Data.redirectURL);
        }

        public ActionResult AutoLogin(string code)
        {
            return View();
        }

       
    }
}