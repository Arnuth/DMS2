using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.ReceiveAccountInfo.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.ReceiveAccountInfo.DAO
{
    public class ReceiveAccountInfoDAO
    {
        #region Private variables
        private SQLconnect conn;
        private string formatDate;
        #endregion

        public ReceiveAccountInfoDAO()
        {
            conn = new SQLconnect();
            formatDate = GetConfig.getAppSetting(Constants.FORMATDATEDB);
        }
        /// <Since 14 March 2018> </Since>/
        public List<ReceiveAccountInfoModel> getDocumentDetail(string reqID)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqID, "NVARCHAR");

                List<ReceiveAccountInfoModel> ExecutedResult = conn.GetResultPROC<ReceiveAccountInfoModel>("CJ_SP_RECEIVEACCOUNTINFO_GET_DOCUMENT_DETAILS", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
