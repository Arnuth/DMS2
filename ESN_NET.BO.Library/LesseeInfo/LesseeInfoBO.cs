using ESN_NET.DBconnect.LesseeInfo.DAO;
using ESN_NET.DBconnect.LesseeInfo.MODEL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.BO.Library.LesseeInfo
{
    public class LesseeInfoBO
    {
        /// <Since 18 April 2018> </Since>/
        public List<LesseeInfoModel> getDocumentDetail(string reqID)
        {
            LesseeInfoDAO daoClass = new LesseeInfoDAO();
            return daoClass.getDocumentDetail(reqID);
        }

        /// <Since 18 April 2018> </Since>/
        public DataTable setLesseeInfoDataTable(List<LesseeInfoModel> model)
        {
            DataTable lesseeDataTable = new DataTable("CJ_LESSEE_INFO");
            lesseeDataTable.Columns.Add("LESSEEINFOID", typeof(int));
            lesseeDataTable.Columns.Add("REQID", typeof(string));
            lesseeDataTable.Columns.Add("VENDORID", typeof(string));
            lesseeDataTable.Columns.Add("VENDORNAME", typeof(string));
            lesseeDataTable.Columns.Add("VENDORFLAG", typeof(int));
            lesseeDataTable.Columns.Add("VENDORBANKID", typeof(string));
            lesseeDataTable.Columns.Add("LESSEETYPE", typeof(int));
            lesseeDataTable.Columns.Add("OTHERTYPE", typeof(string));
            lesseeDataTable.Columns.Add("CORPORATIONTYPE", typeof(int));
            lesseeDataTable.Columns.Add("TELEPHONE", typeof(string));
            lesseeDataTable.Columns.Add("LINEID", typeof(string));
            lesseeDataTable.Columns.Add("ADDRESS", typeof(string));
            lesseeDataTable.Columns.Add("CITIZENID", typeof(string));

            foreach (LesseeInfoModel lessee in model)
            {
                lesseeDataTable.Rows.Add(lessee.LESSEEINFOID, lessee.REQID, lessee.VENDORID, lessee.VENDORNAME, lessee.VENDORFLAG, lessee.VENDORBANKID,
                                         lessee.LESSEETYPE, lessee.OTHERTYPE, lessee.CORPORATIONTYPE, lessee.TELEPHONE, lessee.LINEID, lessee.ADDRESS, lessee.CITIZENID);
            }

            return lesseeDataTable;
        }
    }
}
