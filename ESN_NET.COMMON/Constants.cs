using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.COMMON
{
    public class Constants
    {
        //Connection
        public const string DB_CONNECTION = "DBConnection";
        public const string SERVER = "server";
        public const string DATABASE = "database";
        public const string UID = "uid";
        public const string PASSWORD = "password";
        public static string getSettingDB(string setting)
        {
            string connectionDB = GetConfig.getConnectionString(DB_CONNECTION);
            var settings = connectionDB.Split(';');
            foreach(string config in settings){
                if (config.IndexOf(setting) != -1)
                {
                    int index = config.IndexOf("=");
                    int length = config.Length - index;
                    return config.Substring(index + 1);
                }
            }
            return "";
        }
        
        //Format Date
        public const string FORMATDATE = "FormatDate";
        public const string FORMATDATEDB = "FormatDateDB";
        public const string FORMATDATETIME = "FormatDateTime";
        public const string FormatDateBC = "FormatDateBC";

        //Log File Path
        public const string LOG_FILE_PATH = "LogFilePath";

        //File Upload Path
        public const string FILE_PATH = "FilePath";

        //Line Api
        public const string LINE_TOKEN = "LineAPI";
        public const string LINE_SENDER = "LineSender";

        //STMP E-Mail
        public const string STMP_EMAIL_HOST = "EmailHost";
        public const string STMP_EMAIL_USER = "EmailUser";
        public const string STMP_EMAIL_PASS = "EmailPass";
        public const string STMP_EMAIL_PORT = "EmailPort";
        public const string STMP_EMAIL_CREDENTIALS = "EmailCredentials";
        public const string STMP_EMAIL_SSL = "EmailSSL";

        public static string getDateBC(DateTime? date)
        {
            return String.Format(GetConfig.getAppSetting(Constants.FormatDateBC), date) + (date.Value.Year + 543).ToString(); ;
        }
    }
}
