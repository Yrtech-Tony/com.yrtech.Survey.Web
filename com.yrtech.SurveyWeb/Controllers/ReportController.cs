﻿using System;
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

        public ActionResult FileUploading()
        {
            return PartialView("_PartialFileUploading");
        }

        public ActionResult LogIndex()
        {
            return View();
        }        
	}
}