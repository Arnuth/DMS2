using System;
using System.Collections.Generic;

namespace ESN_NET.DBconnect.Notification.MODEL
{
    public class NotificationRequestModel
    {
        public DateTime? PAYOUTDATE { get; set; }
        public string DELETEUSER { get; set; }
        public List<string> NOTIFICATIONIDLIST { get; set; }
    }
}
