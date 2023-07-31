using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ESN_NET.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult LogIn()
        {
            return View();
        }

        public ActionResult ChangeCulture(string lang, string returnUrl)
        {
            Session["Culture"] = new CultureInfo(lang);
            return Redirect(returnUrl);
        }
    }
}