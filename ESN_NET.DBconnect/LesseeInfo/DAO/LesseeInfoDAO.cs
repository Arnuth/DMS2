using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.LesseeInfo.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.LesseeInfo.DAO
{
    public class LesseeInfoDAO
    {
        #region Private variables
        private SQLconnect conn;
        private string formatDate;
        #endregion

        public LesseeInfoDAO()
        {
            conn = new SQLconnect();
            formatDate = GetConfig.getAppSetting(Constants.FORMATDATEDB);
        }
        /// <Since 14 March 2018> </Since>/
        public List<LesseeInfoModel> getDocumentDetail(string reqID)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqID, "NVARCHAR");

                List<LesseeInfoModel> ExecutedResult = conn.GetResultPROC<LesseeInfoModel>("CJ_SP_LESSEEINFO_GET_DOCUMENT_DETAILS", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
