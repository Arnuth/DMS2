using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.User.MODEL;
using ESN_NET.BO.Library.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class UserAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public UserAPIController()
        {
            logger = new Logger("UserAPIController");
            line = new LineAPI();
        }

        /// <Since 23 Febuary 2018> </Since>
        [ActionName("getUserList")]
        [HttpPost]
        public List<UserModel> getUserList()
        {
            UserBO boClass = new UserBO();
            List<UserModel> result = new List<UserModel>();

            try
            {
                result = boClass.getUserList();
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getUserList : {0}", ex.Message));
                line.NotificationLine(string.Format("getUserList : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 26 Febuary 2018> </Since>
        [ActionName("getUserPropertyByUser")]
        [HttpPost]
        public List<UserPropertyModel> getUserPropertyByUser(UserModel model, string language)
        {
            UserBO boClass = new UserBO();
            List<UserPropertyModel> result = new List<UserPropertyModel>();

            try
            {
                result = boClass.getUserPropertyByUser(model, language);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getUserPropertyByUser : {0}", ex.Message));
                line.NotificationLine(string.Format("getUserPropertyByUser : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 23 Febuary 2018> </Since>
        [ActionName("insertUser")]
        [HttpPost]
        public MessageModel insertUser(UserModel model, string language)
        {
            UserBO boClass = new UserBO();
            MessageModel result = new MessageModel();

            try
            {
                result = boClass.insertUser(model, language);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("insertUser : {0}", ex.Message));
                line.NotificationLine(string.Format("insertUser : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 27 Febuary 2018> </Since>
        [ActionName("updateUser")]
        [HttpPost]
        public MessageModel updateUser(UserModel model, string language)
        {
            UserBO boClass = new UserBO();
            MessageModel result = new MessageModel();

            try
            {
                result = boClass.updateUser(model, language);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("updateUser : {0}", ex.Message));
                line.NotificationLine(string.Format("updateUser : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 27 Febuary 2018> </Since>
        [ActionName("changestatusUser")]
        [HttpPost]
        public MessageModel changestatusUser(UserModel model, string language)
        {
            UserBO boClass = new UserBO();
            MessageModel result = new MessageModel();

            try
            {
                result = boClass.changestatusUser(model, language);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("changestatusUser : {0}", ex.Message));
                line.NotificationLine(string.Format("changestatusUser : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 28 Febuary 2018> </Since>
        [ActionName("changePasswordUser")]
        [HttpGet]
        public MessageModel changePasswordUser(string username, string oldpass, string newpass, string language)
        {
            UserBO boClass = new UserBO();
            MessageModel result = new MessageModel();

            try
            {
                result = boClass.changePasswordUser(username, oldpass, newpass, language);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("changePasswordUser : {0}", ex.Message));
                line.NotificationLine(string.Format("changePasswordUser : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 27 Febuary 2018> </Since>
        [ActionName("getUserByProperty")]
        [HttpPost]
        public List<UserModel> getUserByProperty(UserModel model)
        {
            UserBO boClass = new UserBO();
            List<UserModel> result = new List<UserModel>();

            try
            {
                result = boClass.getUserByProperty(model);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getUserByProperty : {0}", ex.Message));
                line.NotificationLine(string.Format("getUserByProperty : {0}", ex.Message));
            }

            return result;
        }
    }
}
