using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace ESN_NET.DBconnect.Common
{
    public class MessageModel
    {
        public int MSGSTATUS { get; set; }
        public string MSGTEXT { get; set; }
    }
    public class DataTableParameter
    {
        public string PARAMETER_NAME { get; set; }
        public DataTable PARAMETER_DATATABLE { get; set; }
    }
}
