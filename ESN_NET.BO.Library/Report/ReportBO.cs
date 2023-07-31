using ESN_NET.DBconnect.Report.DAO;
using ESN_NET.DBconnect.Report.MODEL;
using System.Collections.Generic;

namespace ESN_NET.BO.Library.Report
{
    public class ReportBO
    {
        /// <Since 2 March 2018> </Since>
        public List<ReportModel> getReportList()
        {
            ReportDAO daoClass = new ReportDAO();
            return daoClass.getReportList();
        }

        /// <Since 24 April 2018> </Since>
        public List<dynamic> getExcelReport(List<ReportParameterModel> model, string storedProc)
        {
            ReportDAO daoClass = new ReportDAO();
            return daoClass.getExcelReport(model, storedProc);
        }
    }
}
