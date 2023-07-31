using ESN_NET.DBconnect.DocumentLandLeaseAgreement.MODEL;
using ESN_NET.DBconnect.DocumentLicense.MODEL;
using ESN_NET.DBconnect.DocumentVehicleRental.MODEL;
using ESN_NET.DBconnect.DocumentSpaceRental.MODEL;
using ESN_NET.DBconnect.Request.MODEL;

namespace ESN_NET.DBconnect.Document.MODEL
{
    public class DocumentModel
    {
        public RequestModel REQUEST { get; set; }
        public DocumentLandLeaseAgreementModel DOCUMENT_LANDLEASEAGREEMENT { get; set; }
        public DocumentLicenseModel DOCUMENT_LICENSE { get; set; }
        public DocumentSpaceRentalModel DOCUMENT_SPACERENTAL { get; set; }
        public DocumentVehicleRentalModel DOCUMENT_VEHICLERENTAL { get; set; }
    }
}
