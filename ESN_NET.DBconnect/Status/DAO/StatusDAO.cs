using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Status.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ESN_NET.DBconnect.Status.DAO
{
    public class StatusDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public StatusDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 19 April 2018> </Since>
        public List<StatusModel> getStatus()
        {
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("SELECT * FROM dbo.ESN_STATUS");

                List<StatusModel> ExecutedResult = conn.GetSQLQueryStirng<StatusModel>(sql.ToString());

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 20 April 2018> </Since>
        public StatusModel getStatusById(int status)
        {
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("SELECT * FROM dbo.ESN_STATUS WHERE STATUSID = '" + status + "'");

                StatusModel ExecutedResult = conn.GetSQLQueryStirng<StatusModel>(sql.ToString()).First<StatusModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
