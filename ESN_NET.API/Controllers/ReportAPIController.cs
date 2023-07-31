using ESN_NET.DBconnect.Common;
using ESN_NET.COMMON;
using ESN_NET.BO.Library.Report;
using ESN_NET.DBconnect.Report.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class ReportAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public ReportAPIController()
        {
            logger = new Logger("ReportAPIController");
            line = new LineAPI();
        }

        /// <Since 5 March 2018> </Since>
        [ActionName("getReportList")]
        [HttpGet]
        public List<ReportModel> getReportList()
        {
            List<ReportModel> result = new List<ReportModel>();
            ReportBO boClass = new ReportBO();

            try
            {
                result = boClass.getReportList();
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getReportList : {0}", ex.Message));
                line.NotificationLine(string.Format("getReportList : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 24 April 2018> </Since>
        [ActionName("getExcelReport")]
        [HttpPost]
        public List<dynamic> getExcelReport(List<ReportParameterModel> model, string storedProc)
        {
            List<dynamic> result = new List<dynamic>();
            ReportBO boClass = new ReportBO();
            try
            {
                result = boClass.getExcelReport(model, storedProc);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getExcelReport : {0}", ex.Message));
                line.NotificationLine(string.Format("getExcelReport : {0}", ex.Message));
            }
            return result;
        }
    }
}
