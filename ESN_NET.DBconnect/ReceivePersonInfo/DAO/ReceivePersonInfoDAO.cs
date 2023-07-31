using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.ReceivePersonInfo.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.ReceivePersonInfo.DAO
{
    public class ReceivePersonInfoDAO
    {
        #region Private variables
        private SQLconnect conn;
        private string formatDate;
        #endregion

        public ReceivePersonInfoDAO()
        {
            conn = new SQLconnect();
            formatDate = GetConfig.getAppSetting(Constants.FORMATDATEDB);
        }
        /// <Since 14 March 2018> </Since>/
        public List<ReceivePersonInfoModel> getDocumentDetail(string reqID)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqID, "NVARCHAR");

                List<ReceivePersonInfoModel> ExecutedResult = conn.GetResultPROC<ReceivePersonInfoModel>("CJ_SP_RECEIVEPERSONINFO_GET_DOCUMENT_DETAILS", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
