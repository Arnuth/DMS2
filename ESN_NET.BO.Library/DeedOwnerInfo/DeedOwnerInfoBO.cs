using ESN_NET.DBconnect.DeedOwnerInfo.DAO;
using ESN_NET.DBconnect.DeedOwnerInfo.MODEL;
using System.Collections.Generic;
using System.Data;

namespace ESN_NET.BO.Library.DeedOwnerInfo
{
    public class DeedOwnerInfoBO
    {
        /// <Since 1 May 2018> </Since>
        public List<DeedOwnerInfoModel> getDocumentDetail(string reqID)
        {
            DeedOwnerInfoDAO daoClass = new DeedOwnerInfoDAO();
            return daoClass.getDocumentDetail(reqID);
        }

        /// <Since 1 May 2018> </Since>
        public DataTable setDeedOwnerInfoDataTable(List<DeedOwnerInfoModel> model)
        {
            DataTable deedOwnerDataTable = new DataTable("CJ_DEEDOWNER_INFO");
            deedOwnerDataTable.Columns.Add("DEEDOWNERINFOID", typeof(int));
            deedOwnerDataTable.Columns.Add("REQID", typeof(string));
            deedOwnerDataTable.Columns.Add("DEEDOWNER", typeof(string));

            foreach (DeedOwnerInfoModel deedOwner in model)
            {
                deedOwnerDataTable.Rows.Add(deedOwner.DEEDOWNERINFOID, deedOwner.REQID, deedOwner.DEEDOWNER);
            }

            return deedOwnerDataTable;
        }
    }
}
