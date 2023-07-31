using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Report.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.Report.DAO
{
    public class ReportDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public ReportDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 2 March 2018> </Since>
        public List<ReportModel> getReportList()
        {
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("SELECT * FROM dbo.ESN_REPORT");

                List<ReportModel> ExecutedResult = conn.GetSQLQueryStirng<ReportModel>(sql.ToString());

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 24 April 2018> </Since>
        public List<dynamic> getExcelReport(List<ReportParameterModel> model, string storedProc)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                foreach (ReportParameterModel param in model)
                {
                    if (!String.IsNullOrEmpty(param.VALUE))
                        SQLconnect.PROCArgumentsCollection(arLstParameter, param.PARAMETER, param.VALUE, "NVARCHAR");
                }

                IEnumerable<dynamic> ExecutedResult = conn.GetResultPROCDYNAMICRESULT(storedProc, arLstParameter);
                return ExecutedResult.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
