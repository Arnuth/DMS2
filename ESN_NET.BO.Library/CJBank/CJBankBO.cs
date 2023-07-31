using ESN_NET.DBconnect.CJBank.DAO;
using ESN_NET.DBconnect.CJBank.MODEL;
using System.Collections.Generic;

namespace ESN_NET.BO.Library.CJBank
{
    public class CJBankBO
    {
        /// <Since 08 March 2018> </Since>
        public List<CJBankModel> getCJBankList()
        {
            CJBankDAO daoClass = new CJBankDAO();
            return daoClass.getCJBankList();
        }

        /// <Since 5 May 2018> </Since>/
        public List<CJBankModel> getDocumentDetail(string reqID)
        {
            CJBankDAO daoClass = new CJBankDAO();
            return daoClass.getDocumentDetail(reqID);
        }
    }
}
