using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.LesseeInfo.MODEL
{
    public class LesseeInfoModel
    {
        public int LESSEEINFOID { get; set; }
        public string REQID { get; set; }
        public string VENDORID { get; set; }
        public string VENDORNAME { get; set; }
        public int VENDORFLAG { get; set; }
        public string VENDORBANKID { get; set; }
        public string VENDORBANKNAME { get; set; }
        public int LESSEETYPE { get; set; }
        public string LESSEETYPENAME { get; set; }
        public string OTHERTYPE { get; set; }
        public int CORPORATIONTYPE { get; set; }
        public string CORPORATIONTYPENAME
        {
            get
            {
                if (LESSEETYPE == 3)
                {
                    return CORPORATIONTYPE == 0 ? "บริษัท" : "ห้างหุ้นส่วนจำกัด";
                }
                return "";
            }
            set { }
        }
        public string TELEPHONE { get; set; }
        public string LINEID { get; set; }
        public string ADDRESS { get; set; }
        public string CITIZENID { get; set; }
    }
}
