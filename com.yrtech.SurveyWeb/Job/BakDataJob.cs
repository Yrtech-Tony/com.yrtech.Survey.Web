using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace com.yrtech.SurveyAPI.Job
{
    public class BakDataJob :IJob
    {

        public void Execute(IJobExecutionContext context)
        {
            Console.WriteLine("Execute BakDataJob "+ DateTime.Now.ToString());
        }
    }
}