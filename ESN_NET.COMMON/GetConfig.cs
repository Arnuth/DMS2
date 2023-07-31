using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.COMMON
{
    public class GetConfig
    {
        public static String getConnectionString(String keyname)
        {
            return System.Configuration.ConfigurationManager.ConnectionStrings[keyname].ToString();
        }

        public static String getAppSetting(String keyname)
        {
            return System.Configuration.ConfigurationManager.AppSettings[keyname].ToString();
        }
    }
}
