using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.COMMON
{
    public class LineAPI
    {
        public void NotificationLine(string msg)
        {
            var request = (HttpWebRequest)WebRequest.Create("https://notify-api.line.me/api/notify");
            //var postData = string.Format("message={0}&stickerPackageId=1&stickerId=113", msg);
            var postData = string.Format("message={0}", GetConfig.getAppSetting(Constants.LINE_SENDER) + msg);
            var data = Encoding.UTF8.GetBytes(postData);

            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;
            request.Headers.Add("Authorization", "Bearer " + GetConfig.getAppSetting(Constants.LINE_TOKEN));

            using (var stream = request.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }

            var response = (HttpWebResponse)request.GetResponse();
            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
        }

        public void CJNotificationLine(string token, string msg)
        {
            var request = (HttpWebRequest)WebRequest.Create("https://notify-api.line.me/api/notify");
            //var postData = string.Format("message={0}&stickerPackageId=1&stickerId=113", msg);
            var postData = string.Format("message={0}", msg);
            var data = Encoding.UTF8.GetBytes(postData);

            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;
            request.Headers.Add("Authorization", "Bearer " + token);

            using (var stream = request.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }

            var response = (HttpWebResponse)request.GetResponse();
            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
        }
    }
}
