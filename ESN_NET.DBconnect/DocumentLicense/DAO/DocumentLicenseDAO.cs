using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.DocumentLicense.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.DocumentLicense.DAO
{
    public class DocumentLicenseDAO
    {
        #region Private variables
        private SQLconnect conn;
        private string formatDate;
        #endregion

        public DocumentLicenseDAO()
        {
            conn = new SQLconnect();
            formatDate = GetConfig.getAppSetting(Constants.FORMATDATEDB);
        }
        /// <Since 14 March 2018> </Since>/
        public DocumentLicenseModel getDocumentDetail(string reqID)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqID, "NVARCHAR");

                DocumentLicenseModel ExecutedResult = conn.GetResultPROC<DocumentLicenseModel>("CJ_SP_DOCUMENTLICENSE_GET_DOCUMENT_DETAILS", arLstParameter).First<DocumentLicenseModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
