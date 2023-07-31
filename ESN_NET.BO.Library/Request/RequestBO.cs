using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Request.DAO;
using ESN_NET.DBconnect.Request.MODEL;

namespace ESN_NET.BO.Library.Request
{
    public class RequestBO
    {
        /// <Since 14 March 2018> </Since>/
        public RequestModel getDocumentDetail(string reqID)
        {
            RequestDAO daoClass = new RequestDAO();
            return daoClass.getDocumentDetail(reqID);
        }

        /// <Since 26 March 2018> </Since>/
        public MessageModel setNotificationPayment(RequestModel model)
        {
            RequestDAO daoClass = new RequestDAO();
            return daoClass.setNotificationPayment(model);
        }

        /// <Since 09 May 2018> </Since>/
        public MessageModel setNotificationPaymentSpaceRental(RequestModel model)
        {
            RequestDAO daoClass = new RequestDAO();
            return daoClass.setNotificationPaymentSpaceRental(model);
        }

        /// <Since 09 May 2018> </Since>/
        public MessageModel setNotificationPaymentVehicleRental(RequestModel model)
        {
            RequestDAO daoClass = new RequestDAO();
            return daoClass.setNotificationPaymentVehicleRental(model);
        } 
    }
}
