using ESN_NET.BO.Library.DeedOwnerInfo;
using ESN_NET.BO.Library.LandLeaseRate;
using ESN_NET.BO.Library.LessorInfo;
using ESN_NET.BO.Library.ReceivePersonInfo;
using ESN_NET.DBconnect.DocumentLandLeaseAgreement.DAO;
using ESN_NET.DBconnect.DocumentLandLeaseAgreement.MODEL;

namespace ESN_NET.BO.Library.DocumentLandLeaseAgreement
{
    public class DocumentLandLeaseAgreementBO
    {
        /// <Since 14 March 2018> </Since>/
        public DocumentLandLeaseAgreementModel getDocumentDetail(string reqID)
        {
            DocumentLandLeaseAgreementDAO daoClass = new DocumentLandLeaseAgreementDAO();
            DocumentLandLeaseAgreementModel result = daoClass.getDocumentDetail(reqID);

            LessorInfoBO lessorBO = new LessorInfoBO();
            result.LESSORINFO = lessorBO.getDocumentDetail(reqID);

            ReceivePersonInfoBO receiverBO = new ReceivePersonInfoBO();
            result.RECEIVEPERSONINFO = receiverBO.getDocumentDetail(reqID);

            LandLeaseRateBO llrBO = new LandLeaseRateBO();
            result.LANDLEASERATE = llrBO.getDocumentDetail(reqID);

            DeedOwnerInfoBO doiBO = new DeedOwnerInfoBO();
            result.DEEDOWNERINFO = doiBO.getDocumentDetail(reqID);

            return result;
        }
    }
}
