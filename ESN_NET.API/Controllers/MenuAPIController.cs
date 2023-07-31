using ESN_NET.COMMON;
using ESN_NET.BO.Library.Menu;
using ESN_NET.DBconnect.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class MenuAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public MenuAPIController()
        {
            logger = new Logger("MenuAPIController");
            line = new LineAPI();
        }

        /// <Since 12 Febuary 2018> </Since>
        [ActionName("getMenuList")]
        [HttpGet]
        public IHttpActionResult getMenuList()
        {
            MenuBO boClass = new MenuBO();
            List<dynamic> result = new List<dynamic>();

            try
            {
                result = boClass.getMenuList();
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getMenuList : {0}", ex.Message));
                line.NotificationLine(string.Format("getMenuList : {0}", ex.Message));
            }

            return Json<IEnumerable<object>>(result);
        }

        /// <Since 12 Febuary 2018> </Since>
        [ActionName("setMenuConfig")]
        [HttpGet]
        public MessageModel setMenuConfig(string userClass, string menu, bool status, string language)
        {
            MenuBO boClass = new MenuBO();
            MessageModel result = new MessageModel();
            
            try
            {
                result = boClass.setMenuConfig(userClass, menu, status, language);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("setMenuConfig : {0}", ex.Message));
                line.NotificationLine(string.Format("setMenuConfig : {0}", ex.Message));
            }

            return result;
        }
    }
}
