using ESN_NET.DBconnect.DocumentLicense.DAO;
using ESN_NET.DBconnect.DocumentLicense.MODEL;

namespace ESN_NET.BO.Library.DocumentLicense
{
    public class DocumentLicenseBO
    {
        /// <Since 14 March 2018> </Since>/
        public DocumentLicenseModel getDocumentDetail(string reqID)
        {
            DocumentLicenseDAO daoClass = new DocumentLicenseDAO();
            return daoClass.getDocumentDetail(reqID);
        }
    }
}
