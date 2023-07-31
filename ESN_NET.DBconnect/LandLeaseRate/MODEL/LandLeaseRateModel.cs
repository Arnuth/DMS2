using ESN_NET.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.LandLeaseRate.MODEL
{
    public class LandLeaseRateModel
    {
        public int LANDLEASERATEID { get; set; }
        public string REQID { get; set; }
        public int RECEIVEPERSONID { get; set; }
        public string RECEIVEPERSONNAME { get; set; }
        public int STARTYEAR { get; set; }
        public int ENDYEAR { get; set; }
        public DateTime? STARTDATE { get; set; }
        public string SSTARTDATE
        {
            get
            {
                return STARTDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), STARTDATE);
            }
            set { }
        }
        public string BCSTARTDATE
        {
            get
            {
                return STARTDATE == null ? "-" : Constants.getDateBC(STARTDATE);
            }
            set { }
        }
        public DateTime? ENDDATE { get; set; }
        public string SENDDATE
        {
            get
            {
                return ENDDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), ENDDATE);
            }
            set { }
        }
        public string BCENDDATE
        {
            get
            {
                return ENDDATE == null ? "-" : Constants.getDateBC(ENDDATE);
            }
            set { }
        }
        public Decimal LANDLEASEAMOUNT { get; set; }
        public string SLANDLEASEAMOUNT
        {
            get
            {
                return LANDLEASEAMOUNT == 0 ? "-" : LANDLEASEAMOUNT.ToString("#,##0.00");
            }
            set { }
        }
        public double SERVICEAMOUNT { get; set; }
        public string SSERVICEAMOUNT
        {
            get
            {
                return SERVICEAMOUNT == 0 ? "-" : SERVICEAMOUNT.ToString("#,##0.00");
            }
            set { }
        }
        public int SERVICETAXFLAG { get; set; }
        public string TAXAMOUNT
        {
            get
            {
                if (VATCALFLAG == 1)
                {
                    return SERVICETAXFLAG == 1 ? "-" : (SERVICEAMOUNT * 0.07).ToString("#,##0.00");
                }
                return "-";
                
            }
        }
        public int VATCALFLAG { get; set; }
    }   
}
