using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.ReceiveAccountInfo.MODEL
{
    public class ReceiveAccountInfoModel
    {
        public int RECEIVEACCOUNTINFOID { get; set; }
        public string REQID { get; set; }
        public string RECEIVEACCOUNTNAME { get; set; }
        public int BANKID { get; set; }
        public string BANKNAME { get; set; }
        public string BANKBRANCHNAME { get; set; }
        public string BANKACCOUNTNO { get; set; }
    }
}
