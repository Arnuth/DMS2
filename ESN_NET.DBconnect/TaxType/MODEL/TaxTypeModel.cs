using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.TaxType.MODEL
{
    public class TaxTypeModel
    {
        public int TAXTYPEID { get; set; }
        public string TAXTYPE { get; set; }
        public string TAXPERCENTVALUE { get; set; }
        public string TAXDESC_EN { get; set; }
        public string TAXDESC_TH { get; set; }
        public DateTime CREATEDATE { get; set; }
        public string CREATEBY { get; set; }
        public DateTime UPDATEDATE { get; set; }
        public string UPDATEBY { get; set; }
    }
}
