using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.Report.MODEL
{
    public class ReportModel
    {
        public int REPORTID { get; set; }
        public string REPORT_ICON { get; set; }
        public string REPORTGROUP_EN { get; set; }
        public string REPORTGROUP_TH { get; set; }
        public string REPORTNAME_EN { get; set; }
        public string REPORTNAME_TH { get; set; }
        public string EXCEL { get; set; }
        public string REPORTFILEPATH { get; set; }
        public string CRITERIA { get; set; }
    }
}
