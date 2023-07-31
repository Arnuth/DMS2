using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.LessorInfo.MODEL
{
    public class LessorInfoModel
    {
        public int LESSORINFOID { get; set; }
        public string REQID { get; set; }
        public string VENDORID { get; set; }
        public string VENDORNAME { get; set; }
        public string CITIZENID { get; set; }
        public string VENDORADDRESS { get; set; }
        public int LESSORTYPE { get; set; }
        public string OTHERTYPE { get; set; }
        public string LESSORTYPENAME { get; set; }
        public int CORPORATIONTYPE { get; set; }
        public string CORPORATIONTYPENAME {
            get {
                if (LESSORTYPE == 3)
                {
                    return CORPORATIONTYPE == 0 ? "บริษัท" : "ห้างหุ้นส่วนจำกัด";
                }
                return "";
            }
            set { }
        }
        public string VENDORCONTACT { get; set; }
        public string VENDORMOBILE { get; set; }
    }
}
