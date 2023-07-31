using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;

namespace ESN_NET.COMMON
{
    public class EmailSmtp
    {
        public bool sendEmail(string subject, string body, string emailto)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient(GetConfig.getAppSetting(Constants.STMP_EMAIL_HOST));
                mail.From = new MailAddress(GetConfig.getAppSetting(Constants.STMP_EMAIL_USER));
                mail.To.Add(emailto);
                mail.Subject = subject;
                mail.Body = body;

                //System.Net.Mail.Attachment attachment;
                //attachment = new System.Net.Mail.Attachment("c:/textfile.txt");
                //mail.Attachments.Add(attachment);

                SmtpServer.Port = Int32.Parse(GetConfig.getAppSetting(Constants.STMP_EMAIL_PORT));
                if (Boolean.Parse(GetConfig.getAppSetting(Constants.STMP_EMAIL_CREDENTIALS)))
                {
                    SmtpServer.Credentials = new System.Net.NetworkCredential(GetConfig.getAppSetting(Constants.STMP_EMAIL_USER), GetConfig.getAppSetting(Constants.STMP_EMAIL_PASS));
                }
                else
                {
                    SmtpServer.UseDefaultCredentials = true;
                }
                SmtpServer.EnableSsl = Boolean.Parse(GetConfig.getAppSetting(Constants.STMP_EMAIL_SSL));
                SmtpServer.Send(mail);
                return true;
            }
            catch (SmtpException ex)
            {
                return false;
                throw ex;               
            }
        }
    }
}