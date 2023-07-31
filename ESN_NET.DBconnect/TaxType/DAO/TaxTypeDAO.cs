using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.TaxType.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ESN_NET.DBconnect.TaxType.DAO
{
    public class TaxTypeDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public TaxTypeDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 08 March 2018> </Since>
        public List<TaxTypeModel> getTaxTypeList()
        {
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("SELECT TAXTYPEID,TAXTYPE,TAXPERCENTVALUE,TAXDESC_EN,TAXDESC_TH,CREATEDATE,CREATEBY,UPDATEDATE,UPDATEBY FROM ZTBLTAXTYPE ORDER BY TAXTYPE");

                List<TaxTypeModel> ExecutedResult = conn.GetSQLQueryStirng<TaxTypeModel>(sql.ToString());

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
