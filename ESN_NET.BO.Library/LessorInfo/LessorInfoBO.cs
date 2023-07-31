using ESN_NET.DBconnect.LessorInfo.DAO;
using ESN_NET.DBconnect.LessorInfo.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace ESN_NET.BO.Library.LessorInfo
{
    public class LessorInfoBO
    {
        /// <Since 14 March 2018> </Since>/
        public List<LessorInfoModel> getDocumentDetail(string reqID)
        {
            LessorInfoDAO daoClass = new LessorInfoDAO();
            return daoClass.getDocumentDetail(reqID);
        }

        /// <Since 14 March 2018> </Since>/
        public DataTable setLessorInfoDataTable(List<LessorInfoModel> model)
        {
            DataTable lessorDataTable = new DataTable("CJ_LESSOR_INFO");
            lessorDataTable.Columns.Add("LESSORINFOID", typeof(int));
            lessorDataTable.Columns.Add("REQID", typeof(string));
            lessorDataTable.Columns.Add("VENDORID", typeof(string));
            lessorDataTable.Columns.Add("VENDORNAME", typeof(string));
            lessorDataTable.Columns.Add("CITIZENID", typeof(string));
            lessorDataTable.Columns.Add("VENDORADDRESS", typeof(string));
            lessorDataTable.Columns.Add("LESSORTYPE", typeof(int));
            lessorDataTable.Columns.Add("CORPORATIONTYPE", typeof(int));
            lessorDataTable.Columns.Add("OTHERTYPE", typeof(string));
            lessorDataTable.Columns.Add("VENDORCONTACT", typeof(string));
            lessorDataTable.Columns.Add("VENDORMOBILE", typeof(string));

            foreach (LessorInfoModel lessor in model)
            {
                lessorDataTable.Rows.Add(lessor.LESSORINFOID, lessor.REQID, lessor.VENDORID, lessor.VENDORNAME, lessor.CITIZENID, lessor.VENDORADDRESS,
                                         lessor.LESSORTYPE, lessor.CORPORATIONTYPE, lessor.OTHERTYPE, lessor.VENDORCONTACT, lessor.VENDORMOBILE);
            }

            return lessorDataTable;
        }
    }
}
