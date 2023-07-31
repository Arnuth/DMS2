using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.DocumentLicense.MODEL
{
    public class DocumentLicenseModel
    {
        public string REQID { get; set; }
        public string DOCRUNNO { get; set; }
        public int LICENSETYPEID { get; set; }
        public string LICENSETYPENAME { get; set; }
        public string LICENSEBOOKNO { get; set; }
        public string LICENSEDOCNO { get; set; }
        public Decimal FEEAMOUNT { get; set; }
        public string FEEAMOUNTTEXT
        {
            get { return FEEAMOUNT.ToString("#,##0.00"); }
            set { }
        }
        public int HOUSEANDLANDTAX { get; set; }
    }
}
