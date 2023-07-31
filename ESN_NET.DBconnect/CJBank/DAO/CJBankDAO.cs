using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.CJBank.MODEL;
using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.CJBank.DAO
{
    public class CJBankDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public CJBankDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 08 March 2018> </Since>
        public List<CJBankModel> getCJBankList()
        {
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("SELECT cjb.CJBANKACCOUNTINFOID, cjb.CJBANKACCOUNTNAME, cjb.BANKID, bank.PROPERTYDESC_TH, cjb.BANKBRANCHNAME, cjb.BANKACCOUNTNO FROM ZTBLCJBANKACCOUNTINFO cjb " +
                    "LEFT JOIN ZTBLBANK bank ON cjb.BANKID = bank.PROPERTYID ORDER BY cjb.CJBANKACCOUNTINFOID");
                List<CJBankModel> ExecutedResult = conn.GetSQLQueryStirng<CJBankModel>(sql.ToString());

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 5 May2018> </Since>/
        public List<CJBankModel> getDocumentDetail(string reqID)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqID, "NVARCHAR");

                List<CJBankModel> ExecutedResult = conn.GetResultPROC<CJBankModel>("CJ_SP_CJBANKACCOUNTINFO_GET_DOCUMENT_DETAILS", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
