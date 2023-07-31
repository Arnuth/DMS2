using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.DocumentLandLeaseAgreement.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.DocumentLandLeaseAgreement.DAO
{
    public class DocumentLandLeaseAgreementDAO
    {
        #region Private variables
        private SQLconnect conn;
        private string formatDate;
        #endregion

        public DocumentLandLeaseAgreementDAO()
        {
            conn = new SQLconnect();
            formatDate = GetConfig.getAppSetting(Constants.FORMATDATEDB);
        }
        /// <Since 14 March 2018> </Since>/
        public DocumentLandLeaseAgreementModel getDocumentDetail(string reqID)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqID, "NVARCHAR");

                DocumentLandLeaseAgreementModel ExecutedResult = conn.GetResultPROC<DocumentLandLeaseAgreementModel>("CJ_SP_DOCUMENTLANDLEASEAGREEMENT_GET_DOCUMENT_DETAILS", arLstParameter).First<DocumentLandLeaseAgreementModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
