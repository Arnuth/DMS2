using ESN_NET.BO.Library.AssetInfo;
using ESN_NET.BO.Library.FileAttachment;
using ESN_NET.BO.Library.ReceivePersonInfo;
using ESN_NET.BO.Library.Request;
using ESN_NET.DBconnect.DocumentVehicleRental.DAO;
using ESN_NET.DBconnect.DocumentVehicleRental.MODEL;
using ESN_NET.DBconnect.FileAttachment.MODEL;
using System.Linq;

namespace ESN_NET.BO.Library.DocumentVehicleRental
{
    public class DocumentVehicleRentalBO
    {
        #region Constant variables

        private const string DOCFILETYPE_VEHICLERENTALDOC = "VehicleRentalDoc";
        private const string DOCFILETYPE_OTHERDOC = "OtherDoc";

        #endregion Constant variables

        /// <summary>
        /// Get document details.
        /// </summary>
        /// <param name="reqId"></param>
        /// <returns></returns>
        public DocumentVehicleRentalModel GetDocumentDetails(string reqId)
        {
            var daoClass = new DocumentVehicleRentalDAO();
            var result = daoClass.GetDocumentDetail(reqId);

            #region AssetInfo

            var assetInfoBO = new AssetInfoBO();
            result.ASSETINFOS = assetInfoBO.GetDocumentDetails(reqId);

            #endregion AssetInfo

            #region ReceivePersonInfo

            var receivePersonInfoBO = new ReceivePersonInfoBO();
            result.RECEIVEPERSONINFO = receivePersonInfoBO.getDocumentDetail(reqId).FirstOrDefault();

            #endregion ReceivePersonInfo

            #region Request

            //var requestBO = new RequestBO();
            //result.REQUEST = requestBO.getDocumentDetail(reqId);

            #endregion Request

            #region FileAttachments

            //var fileAttachmentBO = new FileAttachmentBO();
            //var fileAttachmentList = fileAttachmentBO.getFileAttachmentByRequest(new FileAttachmentModel { REQID = reqId });

            //result.VEHICLERENTALDOC_FILEATTACHMENT = fileAttachmentList.FirstOrDefault(file => file.DOCFILETYPE == DOCFILETYPE_VEHICLERENTALDOC);
            //result.OTHERDOC_FILEATTACHMENTS = fileAttachmentList.Where(file => file.DOCFILETYPE == DOCFILETYPE_OTHERDOC).ToList();

            #endregion FileAttachments

            return result;
        }
    }
}
