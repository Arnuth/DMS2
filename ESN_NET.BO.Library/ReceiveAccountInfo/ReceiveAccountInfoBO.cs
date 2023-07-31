using ESN_NET.DBconnect.ReceiveAccountInfo.DAO;
using ESN_NET.DBconnect.ReceiveAccountInfo.MODEL;
using System.Collections.Generic;
using System.Data;

namespace ESN_NET.BO.Library.ReceiveAccountInfo
{
    public class ReceiveAccountInfoBO
    {
        /// <Since 18 April 2018> </Since>/
        public List<ReceiveAccountInfoModel> getDocumentDetail(string reqID)
        {
            ReceiveAccountInfoDAO daoClass = new ReceiveAccountInfoDAO();
            return daoClass.getDocumentDetail(reqID);
        }

        public DataTable setReceiveAccountInfoDataTable(List<ReceiveAccountInfoModel> model)
        {
            DataTable receiverDataTable = new DataTable("CJ_RECEVIE_ACCOUNT_INFO");
            receiverDataTable.Columns.Add("RECEIVEACCOUNTINFOID", typeof(int));
            receiverDataTable.Columns.Add("REQID", typeof(string));
            receiverDataTable.Columns.Add("RECEIVEACCOUNTNAME", typeof(string));
            receiverDataTable.Columns.Add("BANKID", typeof(int));
            receiverDataTable.Columns.Add("BANKBRANCHNAME", typeof(string));
            receiverDataTable.Columns.Add("BANKACCOUNTNO", typeof(string));

            foreach (ReceiveAccountInfoModel receivePerson in model)
            {
                receiverDataTable.Rows.Add(receivePerson.RECEIVEACCOUNTINFOID, receivePerson.REQID, receivePerson.RECEIVEACCOUNTNAME, receivePerson.BANKID,
                                           receivePerson.BANKBRANCHNAME, receivePerson.BANKACCOUNTNO);
            }

            return receiverDataTable;
        }
    }
}
