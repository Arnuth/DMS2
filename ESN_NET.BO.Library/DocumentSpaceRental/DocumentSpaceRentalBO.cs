using ESN_NET.BO.Library.LesseeInfo;
using ESN_NET.BO.Library.ReceiveAccountInfo;
using ESN_NET.BO.Library.CJBank;
using ESN_NET.DBconnect.DocumentSpaceRental.DAO;
using ESN_NET.DBconnect.DocumentSpaceRental.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.BO.Library.DocumentSpaceRental
{
    public class DocumentSpaceRentalBO
    {
        /// <Since 14 March 2018> </Since>/
        public DocumentSpaceRentalModel getDocumentDetail(string reqID)
        {
            DocumentDocumentSpaceRentalDAO daoClass = new DocumentDocumentSpaceRentalDAO();
            DocumentSpaceRentalModel result = new DocumentSpaceRentalModel();

            try
            {
                result = daoClass.getDocumentDetail(reqID);

                LesseeInfoBO liBO = new LesseeInfoBO();
                result.LESSEEINFO = liBO.getDocumentDetail(reqID);

                ReceiveAccountInfoBO rpiBO = new ReceiveAccountInfoBO();
                result.RECEIVEACCOUNTINFO = rpiBO.getDocumentDetail(reqID);

                CJBankBO cjbBO = new CJBankBO();
                result.CJBANKACCOUNT = cjbBO.getDocumentDetail(reqID);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
    }
}
