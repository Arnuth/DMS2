using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ESN_NET.API
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "Default",
               url: "{controller}/{action}",
               defaults: new { action = "REPORT", id = UrlParameter.Optional }
           );
        }
    }
}

