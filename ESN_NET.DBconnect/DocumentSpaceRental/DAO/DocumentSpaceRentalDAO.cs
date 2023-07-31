using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.DocumentSpaceRental.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.DocumentSpaceRental.DAO
{
    public class DocumentDocumentSpaceRentalDAO
    {
        #region Private variables
        private SQLconnect conn;
        private string formatDate;
        #endregion

        public DocumentDocumentSpaceRentalDAO()
        {
            conn = new SQLconnect();
            formatDate = GetConfig.getAppSetting(Constants.FORMATDATEDB);
        }
        /// <Since 14 March 2018> </Since>/
        public DocumentSpaceRentalModel getDocumentDetail(string reqID)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqID, "NVARCHAR");

                DocumentSpaceRentalModel ExecutedResult = conn.GetResultPROC<DocumentSpaceRentalModel>("CJ_SP_DOCUMENTSPACERENTAL_GET_DOCUMENT_DETAILS", arLstParameter).First<DocumentSpaceRentalModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
