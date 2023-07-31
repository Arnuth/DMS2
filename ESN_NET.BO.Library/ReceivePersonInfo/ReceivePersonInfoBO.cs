using ESN_NET.DBconnect.ReceivePersonInfo.DAO;
using ESN_NET.DBconnect.ReceivePersonInfo.MODEL;
using System.Collections.Generic;
using System.Data;

namespace ESN_NET.BO.Library.ReceivePersonInfo
{
    public class ReceivePersonInfoBO
    {
        /// <Since 14 March 2018> </Since>/
        public List<ReceivePersonInfoModel> getDocumentDetail(string reqID)
        {
            ReceivePersonInfoDAO daoClass = new ReceivePersonInfoDAO();
            return daoClass.getDocumentDetail(reqID);
        }

        public DataTable setReceivePersonInfoDataTable(List<ReceivePersonInfoModel> model)
        {
            DataTable receiverDataTable = new DataTable("CJ_RECEVIE_PERSON_INFO");
            receiverDataTable.Columns.Add("RECEIVEPERSONID", typeof(int));
            receiverDataTable.Columns.Add("REQID", typeof(string));
            receiverDataTable.Columns.Add("RECEIVEPERSONNAME", typeof(string));
            receiverDataTable.Columns.Add("BANKID", typeof(int));
            receiverDataTable.Columns.Add("BANKBRANCHNAME", typeof(string));
            receiverDataTable.Columns.Add("BANKACCOUNTNO", typeof(string));

            foreach (ReceivePersonInfoModel receivePerson in model)
            {
                receiverDataTable.Rows.Add(receivePerson.RECEIVEPERSONID, receivePerson.REQID, receivePerson.RECEIVEPERSONNAME, receivePerson.BANKID,
                                           receivePerson.BANKBRANCHNAME, receivePerson.BANKACCOUNTNO);
            }

            return receiverDataTable;
        }
    }
}
