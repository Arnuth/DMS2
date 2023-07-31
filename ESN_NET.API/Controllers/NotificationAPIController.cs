using ESN_NET.BO.Library.Notification;
using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Notification.MODEL;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class NotificationAPIController : ApiController
    {
        #region Private variables

        private Logger logger;
        private LineAPI line;

        #endregion Private variables

        #region Constructor

        /// <summary>
        /// Class constructor.
        /// </summary>
        public NotificationAPIController()
        {
            logger = new Logger("NotificationAPIController");
            line = new LineAPI();
        }

        #endregion Constructor

        #region Methods

        /// <summary>
        /// Delete notification list.
        /// </summary>
        /// <param name="notificationIdArray"></param>
        /// <returns></returns>
        [ActionName("deleteNotificationList")]
        [HttpPost]
        public MessageModel DeleteNotificationList(NotificationRequestModel model)
        {
            try
            {
                var boClass = new NotificationBO();
                return boClass.DeleteNotificationList(model);
            }
            catch (Exception ex)
            {
                var errMessage = string.Format("DeleteNotificationList : {0}", ex.Message);

                logger.error(errMessage);
                line.NotificationLine(errMessage);

                return new MessageModel
                {
                    MSGSTATUS = -201,
                    MSGTEXT = ex.Message
                };
            }
        }

        #endregion Methods
    }
}