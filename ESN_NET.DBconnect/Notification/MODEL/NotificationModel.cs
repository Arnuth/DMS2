using System;

namespace ESN_NET.DBconnect.Notification.MODEL
{
    public class NotificationModel
    {
        public int NOTIFICATIONID { get; set; }
        public string REQID { get; set; }
        public string NOTICE_TYPE { get; set; }
        public int? NOTICE_USERCLASS { get; set; }
        public DateTime? NOTICEDATE { get; set; }
        public DateTime? PAYMENTDATE { get; set; }
        public DateTime? CONDITIONEXPIREDATE { get; set; }
        public int? LINETEMPLATETYPE { get; set; }
        public int? EMAILTEMPLATETYPE { get; set; }
        public DateTime? CREATEDATE { get; set; }
        public string CREATEDBY { get; set; }
    }
}
