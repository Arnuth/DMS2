using ESN_NET.DBconnect.AssetInfo.MODEL;
using ESN_NET.DBconnect.FileAttachment.MODEL;
using ESN_NET.DBconnect.ReceivePersonInfo.MODEL;
using ESN_NET.DBconnect.Request.MODEL;
using System.Collections.Generic;

namespace ESN_NET.DBconnect.DocumentVehicleRental.MODEL
{
    public class DocumentVehicleRentalModel
    {
        private List<AssetInfoModel> _ASSETINFOS;
        public string REQID { get; set; }
        public string DOCRUNNO { get; set; }
        public int LESSORNAME { get; set; }
        public string LESSORNAME_TH { get; set; }
        public string LESSOR_COSTCENTER { get; set; }
        public string VEHICLERENTAL_DOCNO { get; set; }
        public int VEHICLERENTALTYPEID { get; set; }
        public string VEHICLERENTALTYPE { get; set; }
        public int PAYMENTOUTWITHINDATE { get; set; }

        public List<AssetInfoModel> ASSETINFOS {
            get
            {
                return this._ASSETINFOS == null ? new List<AssetInfoModel>() : this._ASSETINFOS;
            }
            set
            {
                this._ASSETINFOS = value;
            }
        }

        private ReceivePersonInfoModel _RECEIVEPERSONINFO;
        public ReceivePersonInfoModel RECEIVEPERSONINFO
        {
            get { return _RECEIVEPERSONINFO ?? new ReceivePersonInfoModel(); }
            set { _RECEIVEPERSONINFO = value; }
        }

        //private RequestModel request;
        //public RequestModel REQUEST
        //{
        //    get { return request ?? new RequestModel(); }
        //    set { request = value; }
        //}

        //public FileAttachmentModel VEHICLERENTALDOC_FILEATTACHMENT { get; set; }

        //private List<FileAttachmentModel> otherDoc_fileAttachments;
        //public List<FileAttachmentModel> OTHERDOC_FILEATTACHMENTS
        //{
        //    get { return otherDoc_fileAttachments ?? new List<FileAttachmentModel>(); }
        //    set { otherDoc_fileAttachments = value; }
        //}
    }
}
