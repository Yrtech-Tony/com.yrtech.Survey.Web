using com.yrtech.SurveyWeb.Attributes;
using com.yrtech.SurveyWeb.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace com.yrtech.SurveyWeb.Controllers
{
    [AuthenAdmin]
    public class AppealController : Controller
    {

        // GET: Appeal
        public ActionResult AppealImport()
        {
            return View();
        }

        public ActionResult AppealIndex()
        {
            return View();
        }

        public ActionResult Edit(string appealId)
        {
            ViewBag.AppealId = appealId;
            return View();
        }


        public ActionResult GetAreaListByParent(int area, string type)
        {
            List<AreaDto> lst = new List<AreaDto>();
            if (Session["LoginUser"] != null)
            {
                AccountDto accountDto = Session["LoginUser"] as AccountDto;
                if (type == "BusinessArea")
                {
                    lst = accountDto.WideAreaList.Where(x => x.ParentId == area).ToList();
                }
                else if (type == "WideArea")
                {
                    lst = accountDto.BigAreaList.Where(x => x.ParentId == area).ToList();
                }
                else if (type == "BigArea")
                {
                    lst = accountDto.MiddleAreaList.Where(x => x.ParentId == area).ToList();
                }
                else if (type == "MiddleArea")
                {
                    lst = accountDto.SmallAreaList.Where(x => x.ParentId == area).ToList();
                }
            }

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetShopListByArea(int SmallArea)
        {
            AccountDto accountDto = Session["LoginUser"] as AccountDto;
            var shopList = accountDto.ShopList.Where(x => x.AreaId == SmallArea);
            return Json(shopList, JsonRequestBehavior.AllowGet);
        }        
    }
}