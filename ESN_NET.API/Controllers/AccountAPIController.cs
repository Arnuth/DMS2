using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.User.MODEL;
using ESN_NET.DBconnect.Account.MODEL;
using ESN_NET.BO.Library.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class AccountAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public AccountAPIController()
        {
            logger = new Logger("AccountAPIController");
            line = new LineAPI();
        }

        /// <Since 8 Febuary 2018> </Since>
        [ActionName("loginUser")]
        [HttpPost]
        public AccountModel loginUser(UserModel model)
        {
            AccountModel result = new AccountModel();
            AccountBO boClass = new AccountBO();

            try
            {
                result = boClass.loginUser(model);
            }
            catch (Exception ex)
            {
                MessageModel msg = new MessageModel();
                msg.MSGSTATUS = -201;
                msg.MSGTEXT = ex.Message;
                result.MESSAGE = msg;
                logger.error(string.Format("loginUser : {0}", ex.Message));
                line.NotificationLine(string.Format("loginUser : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 13 Febuary 2018> </Since>
        [ActionName("requestPassword")]
        [HttpPost]
        public MessageModel requestPassword(UserModel model)
        {
            MessageModel result = new MessageModel();
            AccountBO boClass = new AccountBO();

            try
            {
                result = boClass.requestPassword(model);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("requestPassword : {0}", ex.Message));
                line.NotificationLine(string.Format("requestPassword : {0}", ex.Message));
            }

            return result;
        }
    }
}
