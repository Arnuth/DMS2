using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ESN_NET.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
               name: "DefaultApi",
               routeTemplate: "api/{controller}/{action}/{value}",
               defaults: new { value = RouteParameter.Optional }
           );
        }
    }
}
