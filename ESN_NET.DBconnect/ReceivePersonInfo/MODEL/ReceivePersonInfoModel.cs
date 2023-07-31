using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.ReceivePersonInfo.MODEL
{
    public class ReceivePersonInfoModel
    {
        public int RECEIVEPERSONID { get; set; }
        public string REQID { get; set; }
        public string RECEIVEPERSONNAME { get; set; }
        public int BANKID { get; set; }
        public string BANKNAME { get; set; }
        public string BANKBRANCHNAME { get; set; }
        public string BANKACCOUNTNO { get; set; }
    }
}
