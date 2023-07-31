using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Request.MODEL;
using ESN_NET.BO.Library.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class RequestAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public RequestAPIController()
        {
            logger = new Logger("RequestAPIController");
            line = new LineAPI();
        }

        /// <Since 26 March 2018> </Since>
        [ActionName("setNotificationPayment")]
        [HttpPost]
        public MessageModel setNotificationPayment(RequestModel model)
        {
            MessageModel result = new MessageModel();
            RequestBO boClass = new RequestBO();

            try
            {
                result = boClass.setNotificationPayment(model);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("setNotificationPayment : {0}", ex.Message));
                line.NotificationLine(string.Format("setNotificationPayment : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 09 May 2018> </Since>
        [ActionName("setNotificationPaymentSpaceRental")]
        [HttpPost]
        public MessageModel setNotificationPaymentSpaceRental(RequestModel model)
        {
            MessageModel result = new MessageModel();
            RequestBO boClass = new RequestBO();

            try
            {
                result = boClass.setNotificationPaymentSpaceRental(model);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("setNotificationPaymentSpaceRental : {0}", ex.Message));
                line.NotificationLine(string.Format("setNotificationPaymentSpaceRental : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 09 May 2018> </Since>
        [ActionName("setNotificationPaymentVehicleRental")]
        [HttpPost]
        public MessageModel setNotificationPaymentVehicleRental(RequestModel model)
        {
            MessageModel result = new MessageModel();
            RequestBO boClass = new RequestBO();

            try
            {
                result = boClass.setNotificationPaymentVehicleRental(model);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("setNotificationPaymentVehicleRental : {0}", ex.Message));
                line.NotificationLine(string.Format("setNotificationPaymentVehicleRental : {0}", ex.Message));
            }

            return result;
        }

    }
}
