using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Request.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.Request.DAO
{
    public class RequestDAO
    {
        #region Private variables
        private SQLconnect conn;
        private string formatDate;
        #endregion

        public RequestDAO()
        {
            conn = new SQLconnect();
            formatDate = GetConfig.getAppSetting(Constants.FORMATDATEDB);
        }

        /// <Since 14 March 2018> </Since>/
        public RequestModel getDocumentDetail(string reqID)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqID, "NVARCHAR");

                RequestModel ExecutedResult = conn.GetResultPROC<RequestModel>("CJ_SP_REQUEST_GET_DOCUMENT_DETAILS", arLstParameter).First<RequestModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 26 March 2018> </Since>/
        public MessageModel setNotificationPayment(RequestModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", model.REQID, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userclass", model.USERREQUESTID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@number_notice", model.NOTICENUMBER_PAYOUT.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@unit_notice", model.NOTICEUNIT_PAYOUT, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_NOTIFICATION_GENARATE_PAYMENT", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 09 May 2018> </Since>/
        public MessageModel setNotificationPaymentSpaceRental(RequestModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", model.REQID, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userclass", model.USERREQUESTID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@number_notice", model.NOTICENUMBER_PAYOUT.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@unit_notice", model.NOTICEUNIT_PAYOUT, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_NOTIFICATION_GENARATE_PAYMENT_DOCUMENT_SPACERENTAL", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 09 May 2018> </Since>/
        public MessageModel setNotificationPaymentVehicleRental(RequestModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", model.REQID, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userclass", model.USERREQUESTID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@number_notice", model.NOTICENUMBER_PAYOUT.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@unit_notice", model.NOTICEUNIT_PAYOUT, "NVARCHAR");	

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_NOTIFICATION_GENARATE_PAYMENT_DOCUMENT_VEHICLERENTAL", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
