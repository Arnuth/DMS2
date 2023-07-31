using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.UserClass.MODEL;
using ESN_NET.BO.Library.UserClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class UserClassAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public UserClassAPIController()
        {
            logger = new Logger("UserClassAPIController");
            line = new LineAPI();
        }

        /// <Since 12 Febuary 2018> </Since>
        [ActionName("getUserClassList")]
        [HttpGet]
        public List<UserClassModel> getUserClassList()
        {
            List<UserClassModel> result = new List<UserClassModel>();
            UserClassBO boClass = new UserClassBO();

            try
            {
                result = boClass.getUserClassList();
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getUserClassList : {0}", ex.Message));
                line.NotificationLine(string.Format("getUserClassList : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 13 Febuary 2018> </Since>
        [ActionName("addUserClass")]
        [HttpPost]
        public MessageModel addUserClass(UserClassModel model)
        {
            MessageModel result = new MessageModel();
            UserClassBO boClass = new UserClassBO();

            try
            {
                result = boClass.addUserClass(model);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("addUserClass : {0}", ex.Message));
                line.NotificationLine(string.Format("addUserClass : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 13 Febuary 2018> </Since>
        [ActionName("editUserClass")]
        [HttpPost]
        public MessageModel editUserClass(UserClassModel model)
        {
            MessageModel result = new MessageModel();
            UserClassBO boClass = new UserClassBO();

            try
            {
                result = boClass.editUserClass(model);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("editUserClass : {0}", ex.Message));
                line.NotificationLine(string.Format("editUserClass : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 13 Febuary 2018> </Since>
        [ActionName("deleteUserClass")]
        [HttpPost]
        public MessageModel deleteUserClass(UserClassModel model)
        {
            MessageModel result = new MessageModel();
            UserClassBO boClass = new UserClassBO();

            try
            {
                result = boClass.deleteUserClass(model);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("deleteUserClass : {0}", ex.Message));
                line.NotificationLine(string.Format("deleteUserClass : {0}", ex.Message));
            }

            return result;
        }
    }
}
