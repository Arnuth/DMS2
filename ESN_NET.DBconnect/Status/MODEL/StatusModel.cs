﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.Status.MODEL
{
    public class StatusModel
    {
        public int STATUSID { get; set; }
        public string STATUSNAME_EN { get; set; }
        public string STATUSNAME_TH { get; set; }
        public string ALERT_TO { get; set; }
    }
}
