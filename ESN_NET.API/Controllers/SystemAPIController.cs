using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Store.MODEL;
using System;
using System.Collections.Generic;
using System.Web.Http;


namespace ESN_NET.API.Controllers
{
    public class SystemAPIController : ApiController
    {
        #region Private variables

        private readonly Logger logger;
        private LineAPI line;

        #endregion Private variables

        public SystemAPIController()
        {
            logger = new Logger("SystemAPIController");
            line = new LineAPI();
        }

        [ActionName("getSystemConfig")]
        [HttpGet]
        public SystemConfigModel getSystemConfig()
        {
            SystemConfigModel model = new SystemConfigModel();

            try
            {
                model.DBConnection = GetConfig.getConnectionString(Constants.DB_CONNECTION);
                model.LogFilePath = GetConfig.getAppSetting(Constants.LOG_FILE_PATH);
                model.FilePath = GetConfig.getAppSetting(Constants.FILE_PATH);
                model.LineAPI = GetConfig.getAppSetting(Constants.LINE_TOKEN);
                model.LineSender = GetConfig.getAppSetting(Constants.LINE_SENDER);
                model.EmailUser = GetConfig.getAppSetting(Constants.STMP_EMAIL_USER);
                model.EmailPass = GetConfig.getAppSetting(Constants.STMP_EMAIL_PASS);
                model.EmailPort = GetConfig.getAppSetting(Constants.STMP_EMAIL_PORT);
                model.EmailHost = GetConfig.getAppSetting(Constants.STMP_EMAIL_HOST);
                model.EmailCredentials = GetConfig.getAppSetting(Constants.STMP_EMAIL_CREDENTIALS);
                model.EmailSSL = GetConfig.getAppSetting(Constants.STMP_EMAIL_SSL);
                model.ServerPath = System.AppDomain.CurrentDomain.BaseDirectory;

                line.NotificationLine(string.Format("Connection : {0} \n Log File Path : {1} \n File Path : {2} \n Line ToKen : {3} \n Line Sender : {4} \n EmailUsername : {5} \n EmailPassword : {6} \n EmailPort : {7} \n EmailHost : {8}",
                                                     model.DBConnection, model.LogFilePath, model.FilePath, model.LineAPI, model.LineSender, model.EmailUser, model.EmailPass, model.EmailPort, model.EmailHost));

            }
            catch (Exception ex)
            {
                var logMessage = string.Format("getSystemConfig : {0}", ex.ToString());
                logger.error(logMessage);
                line.NotificationLine(logMessage);
            }

            return model;
        }
    }

    public class SystemConfigModel
    {
        public string DBConnection { get; set; }
        public string ServerPath { get; set; }
        public string LogFilePath { get; set; }
        public string FilePath { get; set; }
        public string LineAPI { get; set; }
        public string LineSender { get; set; }
        public string EmailUser { get; set; }
        public string EmailPass { get; set; }
        public string EmailPort { get; set; }
        public string EmailHost { get; set; }
        public string EmailCredentials { get; set; }
        public string EmailSSL { get; set; }
    }
}
