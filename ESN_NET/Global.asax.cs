using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ESN_NET
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        protected void Application_AcquireRequestState(Object sender, EventArgs e)
        {
            if (HttpContext.Current.Session != null)
            {
                CultureInfo ci = (CultureInfo)this.Session["Culture"];
                if (ci == null)
                {
                    string langName = "en";

                    if (HttpContext.Current.Request.UserLanguages != null &&
                    HttpContext.Current.Request.UserLanguages.Length != 0)
                    {
                        //Gets accepted list
                        //langName = HttpContext.Current.Request.UserLanguages[0].Substring(0, 2);
                        langName = "th";
                    }
                    ci = new CultureInfo(langName);

                    this.Session["Culture"] = ci;
                }

                CultureInfo ci2 = new CultureInfo("en-US");
                ci2.DateTimeFormat.DateSeparator = "/";
                ci2.DateTimeFormat.LongDatePattern = "yyyy/MM/dd";
                ci2.DateTimeFormat.ShortDatePattern = "yyyy/MM/dd";
                ci2.DateTimeFormat.LongTimePattern = "HH:mm:ss tt";
                ci2.DateTimeFormat.ShortTimePattern = "HH:mm tt";

                Thread.CurrentThread.CurrentUICulture = ci;
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(ci.Name);
                Thread.CurrentThread.CurrentCulture.DateTimeFormat = ci2.DateTimeFormat;

            }
            //}
        }
    }
}
