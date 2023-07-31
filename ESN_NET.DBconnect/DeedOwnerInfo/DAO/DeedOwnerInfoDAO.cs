using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.DeedOwnerInfo.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.DeedOwnerInfo.DAO
{
    public class DeedOwnerInfoDAO
    {
        #region Private variables
        private SQLconnect conn;
        private string formatDate;
        #endregion

        #region Class constructor

        /// <summary>
        /// Class constructor.
        /// </summary>
        public DeedOwnerInfoDAO()
        {
            conn = new SQLconnect();
            formatDate = GetConfig.getAppSetting(Constants.FORMATDATEDB);
        }

        #endregion Class constructor

        /// <Since 1 May 2018> </Since>
        public List<DeedOwnerInfoModel> getDocumentDetail(string reqID)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqID, "NVARCHAR");

                List<DeedOwnerInfoModel> ExecutedResult = conn.GetResultPROC<DeedOwnerInfoModel>("CJ_SP_DEEDOWNERINFO_GET_DOCUMENT_DETAILS", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
