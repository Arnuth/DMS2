using ESN_NET.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CrystalDecisions.CrystalReports.Engine;
using System.IO;

namespace ESN_NET.API.Controllers
{
    public class ReportController : Controller
    {
        #region Private variables
        private System.Web.Script.Serialization.JavaScriptSerializer json;
        private Logger logger;
        private LineAPI line;
        #endregion

        public ReportController()
        {
            json = new System.Web.Script.Serialization.JavaScriptSerializer();
            logger = new Logger("ReportController");
            line = new LineAPI();
        }

        /// <Since 28 March 2018> </Since>
        /// Edit 1 : Add DataSourceConnections SetConnection For CJ another side not use.
        public ActionResult ReportDownload(ReportsModel model)
        {
            try
            {
                ReportDocument rd = new ReportDocument();
                rd.Load(Path.Combine(Server.MapPath("~/CrystalReports"), model.REPORTNAME));

                string server = Constants.getSettingDB(Constants.SERVER);
                string db = Constants.getSettingDB(Constants.DATABASE);
                string uid = Constants.getSettingDB(Constants.UID);
                string pwd = Constants.getSettingDB(Constants.PASSWORD);

                rd.SetDatabaseLogon(uid, pwd, server, db);

                //Remark Edit 1 : User for CJ only.
                rd.DataSourceConnections[0].SetConnection(server, db, uid, pwd);


                if (!string.IsNullOrEmpty(model.REPORTPARAMETER))
                {

                    List<ReportParameter> reportParmeter = json.Deserialize<List<ReportParameter>>(model.REPORTPARAMETER);
                    for (int i = 0; i < reportParmeter.Count; i++)
                    {
                        ReportParameter parameter = reportParmeter[i];
                        rd.SetParameterValue(reportParmeter[i].PARAMETER, string.IsNullOrEmpty(reportParmeter[i].VALUE) ? null : reportParmeter[i].VALUE);
                    }
                }

                Response.Buffer = false;
                Response.ClearContent();
                Response.ClearHeaders();

                Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                FileStreamResult fileResult = new FileStreamResult(stream, "application/pdf");
                stream.Seek(0, SeekOrigin.Begin);
                return File(stream, "application/pdf", model.REPORTNAME.Split('.')[0] + ".pdf");
            }
            catch (Exception ex)
            {
                logger.error(string.Format("ReportNewTab : {0}", ex.Message));
                line.NotificationLine(string.Format("ReportNewTab : {0}", ex.Message));
                logger.error(string.Format("ReportNewTab : {0}", ex.InnerException.StackTrace));
                line.NotificationLine(string.Format("ReportNewTab : {0}", ex.InnerException.StackTrace));
                return null;
            }
            
        }

        /// <Since 28 March 2018> </Since>
        /// Edit 1 : Add DataSourceConnections SetConnection For CJ another side not use.
        [HttpPost]
        public ActionResult ReportNewTab(ReportsModel model)
        {
            try
            {
                ReportDocument rd = new ReportDocument();
                rd.Load(Path.Combine(Server.MapPath("~/CrystalReports"), model.REPORTNAME));

                string server = Constants.getSettingDB(Constants.SERVER);
                string db = Constants.getSettingDB(Constants.DATABASE);
                string uid = Constants.getSettingDB(Constants.UID);
                string pwd = Constants.getSettingDB(Constants.PASSWORD);

                rd.SetDatabaseLogon(uid, pwd, server, db);

                //Remark Edit 1 : User for CJ only.
                rd.DataSourceConnections[0].SetConnection(server, db, uid, pwd);

                if (!string.IsNullOrEmpty(model.REPORTPARAMETER))
                {

                    List<ReportParameter> reportParmeter = json.Deserialize<List<ReportParameter>>(model.REPORTPARAMETER);
                    for (int i = 0; i < reportParmeter.Count; i++)
                    {
                        ReportParameter parameter = reportParmeter[i];
                        rd.SetParameterValue(reportParmeter[i].PARAMETER, string.IsNullOrEmpty(reportParmeter[i].VALUE) ? null : reportParmeter[i].VALUE);
                    }
                }

                Response.Buffer = false;
                Response.ClearContent();
                Response.ClearHeaders();

                Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                FileStreamResult fileResult = new FileStreamResult(stream, "application/pdf");
                stream.Seek(0, SeekOrigin.Begin);
                return File(stream, "application/pdf");
            }
            catch (Exception ex)
            {
                logger.error(string.Format("ReportNewTab : {0}", ex.Message));
                line.NotificationLine(string.Format("ReportNewTab : {0}", ex.Message));
                logger.error(string.Format("ReportNewTab : {0}", ex.InnerException.StackTrace));
                line.NotificationLine(string.Format("ReportNewTab : {0}", ex.InnerException.StackTrace));
                return null;
            }
        }
    }

    public class ReportsModel
    {
        public string REPORTNAME { get; set; }
        public string REPORTPARAMETER { get; set; }
    }

    public class ReportParameter
    {
        public string PARAMETER { get; set; }
        public string VALUE { get; set; }
    }
}