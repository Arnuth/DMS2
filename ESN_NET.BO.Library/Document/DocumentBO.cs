using ESN_NET.BO.Library.AssetInfo;
using ESN_NET.BO.Library.DeedOwnerInfo;
using ESN_NET.BO.Library.DocumentLandLeaseAgreement;
using ESN_NET.BO.Library.DocumentLicense;
using ESN_NET.BO.Library.DocumentSpaceRental;
using ESN_NET.BO.Library.DocumentVehicleRental;
using ESN_NET.BO.Library.LandLeaseRate;
using ESN_NET.BO.Library.LesseeInfo;
using ESN_NET.BO.Library.LessorInfo;
using ESN_NET.BO.Library.Notification;
using ESN_NET.BO.Library.ReceiveAccountInfo;
using ESN_NET.BO.Library.ReceivePersonInfo;
using ESN_NET.BO.Library.Request;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Document.DAO;
using ESN_NET.DBconnect.Document.MODEL;
using ESN_NET.DBconnect.ReceivePersonInfo.MODEL;
using ESN_NET.DBconnect.Request.MODEL;
using System.Collections.Generic;
using System.Data;

namespace ESN_NET.BO.Library.Document
{
    public class DocumentBO
    {
        /// <Since 8 March 2018> </Since>
        /// Add 20 April 2018 : Notification of Transection
        public MessageModel insertDocumentLandLeaseAgreement(DocumentModel model)
        {
            LessorInfoBO lessorBO = new LessorInfoBO();
            DataTable lessorDataTable = lessorBO.setLessorInfoDataTable(model.DOCUMENT_LANDLEASEAGREEMENT.LESSORINFO);

            ReceivePersonInfoBO receivePersonBO = new ReceivePersonInfoBO();
            DataTable receiverDataTable = receivePersonBO.setReceivePersonInfoDataTable(model.DOCUMENT_LANDLEASEAGREEMENT.RECEIVEPERSONINFO);

            LandLeaseRateBO landLeaseRateBO = new LandLeaseRateBO();
            DataTable landLeaseRateDataTable = landLeaseRateBO.setLandLeaseRateDataTable(model.DOCUMENT_LANDLEASEAGREEMENT.LANDLEASERATE);

            DeedOwnerInfoBO deedOwnerInfoBO = new DeedOwnerInfoBO();
            DataTable deedOwnerInfoTable = deedOwnerInfoBO.setDeedOwnerInfoDataTable(model.DOCUMENT_LANDLEASEAGREEMENT.DEEDOWNERINFO);

            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = daoClass.insertDocumentLandLeaseAgreement(model, lessorDataTable, receiverDataTable, landLeaseRateDataTable, deedOwnerInfoTable);

            #region Notification of Transection
            if (result.MSGSTATUS == 0 && model.REQUEST.REQUESTSTATUS == 2)
            {
                model.REQUEST.REQID = result.MSGTEXT;
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 2);
            }
            #endregion

            return result;
        }

        /// <Since 8 March 2018> </Since>
        /// Add 20 April 2018 : Notification of Transection
        public MessageModel insertDocumentLicense(DocumentModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = daoClass.insertDocumentLicense(model);

            #region Notification of Transection
            if (result.MSGSTATUS == 0 && model.REQUEST.REQUESTSTATUS == 2)
            {
                model.REQUEST.REQID = result.MSGTEXT;
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 2);
            }
            #endregion

            return result;
        }

        /// <Since 18 April 2018> </Since>
        public MessageModel insertDocumentSpaceRental(DocumentModel model)
        {
            LesseeInfoBO lesseeBO = new LesseeInfoBO();
            DataTable lesseeDataTable = lesseeBO.setLesseeInfoDataTable(model.DOCUMENT_SPACERENTAL.LESSEEINFO);

            ReceiveAccountInfoBO receivePersonBO = new ReceiveAccountInfoBO();
            DataTable receiverDataTable = receivePersonBO.setReceiveAccountInfoDataTable(model.DOCUMENT_SPACERENTAL.RECEIVEACCOUNTINFO);

            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = daoClass.insertDocumentSpaceRental(model, lesseeDataTable, receiverDataTable);

            #region Notification of Transection
            if (result.MSGSTATUS == 0 && model.REQUEST.REQUESTSTATUS == 2)
            {
                model.REQUEST.REQID = result.MSGTEXT;
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 2);
            }
            #endregion

            return result;
        }

        /// <summary>
        /// Insert document vehicle rental.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public MessageModel InsertDocumentVehicleRental(DocumentModel model)
        {
            var documentVehicleRental = model.DOCUMENT_VEHICLERENTAL;

            var assetInfoBO = new AssetInfoBO();
            var assetInfo = assetInfoBO.SetAssetInfoDataTable(documentVehicleRental.ASSETINFOS);

            var receivePersonInfoBO = new ReceivePersonInfoBO();
            var receivePersonInfo = receivePersonInfoBO.setReceivePersonInfoDataTable(new List<ReceivePersonInfoModel> { documentVehicleRental.RECEIVEPERSONINFO });

            var daoClass = new DocumentDAO();
            MessageModel result = daoClass.InsertDocumentVehicleRental(model, assetInfo, receivePersonInfo);

            #region Notification of Transection
            if (result.MSGSTATUS == 0 && model.REQUEST.REQUESTSTATUS == 2)
            {
                model.REQUEST.REQID = result.MSGTEXT;
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 2);
            }
            #endregion

            return result;
        }

        /// <summary>
        /// Update document vehicle rental.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public MessageModel UpdateDocumentVehicleRental(DocumentModel model)
        {
            var documentVehicleRental = model.DOCUMENT_VEHICLERENTAL;

            var assetInfoBO = new AssetInfoBO();
            var assetInfo = assetInfoBO.SetAssetInfoDataTable(documentVehicleRental.ASSETINFOS);

            var receivePersonInfoBO = new ReceivePersonInfoBO();
            var receivePersonInfo = receivePersonInfoBO.setReceivePersonInfoDataTable(new List<ReceivePersonInfoModel> { documentVehicleRental.RECEIVEPERSONINFO });

            var daoClass = new DocumentDAO();
            MessageModel result = daoClass.updateDocumentVehicleRental(model, assetInfo, receivePersonInfo);

            #region Notification of Transection
            if (result.MSGSTATUS == 0 && model.REQUEST.REQUESTSTATUS == 2)
            {
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 2);
            }
            #endregion

            return result;
        }

        /// <Since 16 March 2018> </Since>
        public MessageModel updateDocumentLandLeaseAgreement(DocumentModel model)
        {
            LessorInfoBO lessorBO = new LessorInfoBO();
            DataTable lessorDataTable = lessorBO.setLessorInfoDataTable(model.DOCUMENT_LANDLEASEAGREEMENT.LESSORINFO);

            ReceivePersonInfoBO receivePersonBO = new ReceivePersonInfoBO();
            DataTable receiverDataTable = receivePersonBO.setReceivePersonInfoDataTable(model.DOCUMENT_LANDLEASEAGREEMENT.RECEIVEPERSONINFO);

            LandLeaseRateBO landLeaseRateBO = new LandLeaseRateBO();
            DataTable landLeaseRateDataTable = landLeaseRateBO.setLandLeaseRateDataTable(model.DOCUMENT_LANDLEASEAGREEMENT.LANDLEASERATE);

            DeedOwnerInfoBO deedOwnerInfoBO = new DeedOwnerInfoBO();
            DataTable deedOwnerInfoTable = deedOwnerInfoBO.setDeedOwnerInfoDataTable(model.DOCUMENT_LANDLEASEAGREEMENT.DEEDOWNERINFO);

            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = daoClass.updateDocumentLandLeaseAgreement(model, lessorDataTable, receiverDataTable, landLeaseRateDataTable, deedOwnerInfoTable);

            #region Notification of Transection
            if (result.MSGSTATUS == 0 && model.REQUEST.REQUESTSTATUS == 2)
            {
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 2);
            }
            #endregion

            return result;
        }

        /// <Since 16 March 2018> </Since>
        public MessageModel updateDocumentLicense(DocumentModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = daoClass.updateDocumentLicense(model);

            #region Notification of Transection
            if (result.MSGSTATUS == 0 && model.REQUEST.REQUESTSTATUS == 2)
            {
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 2);
            }
            #endregion

            return result;
        }

        /// <Since 7 May 2018> </Since>
        public MessageModel updateDocumentSpaceRental(DocumentModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = new MessageModel();

            LesseeInfoBO lesseeBO = new LesseeInfoBO();
            DataTable lesseeDataTable = lesseeBO.setLesseeInfoDataTable(model.DOCUMENT_SPACERENTAL.LESSEEINFO);

            ReceiveAccountInfoBO receivePersonBO = new ReceiveAccountInfoBO();
            DataTable receiverDataTable = receivePersonBO.setReceiveAccountInfoDataTable(model.DOCUMENT_SPACERENTAL.RECEIVEACCOUNTINFO);

            result = daoClass.updateDocumentSpaceRental(model, lesseeDataTable, receiverDataTable);

            #region Notification of Transection
            if (result.MSGSTATUS == 0 && model.REQUEST.REQUESTSTATUS == 2)
            {
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 2);
            }
            #endregion

            return result;
        }

        /// <Since 14 March 2018> </Since>/
        public DocumentModel getDocumentDetail(DocumentModel model)
        {
            string reqID = model.REQUEST.REQID;

            RequestBO reqBO = new RequestBO();
            DocumentModel result = new DocumentModel
            {
                REQUEST = reqBO.getDocumentDetail(reqID)
            };

            switch (model.REQUEST.DOCTYPEID)
            {
                case 1:
                    DocumentLandLeaseAgreementBO llBO = new DocumentLandLeaseAgreementBO();
                    result.DOCUMENT_LANDLEASEAGREEMENT = llBO.getDocumentDetail(reqID);
                    break;

                case 2:
                    DocumentLicenseBO lcBO = new DocumentLicenseBO();
                    result.DOCUMENT_LICENSE = lcBO.getDocumentDetail(reqID);
                    break;

                case 3:
                    DocumentSpaceRentalBO srBO = new DocumentSpaceRentalBO();
                    result.DOCUMENT_SPACERENTAL = srBO.getDocumentDetail(reqID);
                    break;
               
                case 4:
                    DocumentVehicleRentalBO vrBO = new DocumentVehicleRentalBO();
                    result.DOCUMENT_VEHICLERENTAL = vrBO.GetDocumentDetails(reqID);
                    break;
            }

            return result;
        }

        /// <Since 16 March 2018> </Since>
        public MessageModel approveDocumentLandLeaseAgreement(DocumentModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = daoClass.approveDocumentLandLeaseAgreement(model);

            #region Notification of Transection
            if (result.MSGSTATUS == 0)
            {
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 3);
            }
            #endregion

            return result;
        }

        /// <Since 22 March 2018> </Since>
        public MessageModel rejectDocumentLandLeaseAgreement(RequestModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = daoClass.rejectDocumentLandLeaseAgreement(model);

            #region Notification of Transection
            if (result.MSGSTATUS == 0)
            {
                DocumentModel docModel = new DocumentModel
                {
                    REQUEST = model
                };
                docModel = getDocumentDetail(docModel);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(docModel, 4);
            }
            #endregion

            return result;
        }

        /// <Since 16 March 2018> </Since>
        public MessageModel approveDocumentLicense(DocumentModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = daoClass.approveDocumentLicense(model);

            #region Notification of Transection
            if (result.MSGSTATUS == 0)
            {
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 3);
            }
            #endregion

            return result;
        }

        /// <Since 5 May 2018> </Since>
        public MessageModel approveDocumentSpaceRental(DocumentModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = new MessageModel();
            NotificationBO boClass = new NotificationBO();

            result = daoClass.approveDocumentSpaceRental(model);

                #region Notification of Transection
                if (result.MSGSTATUS == 0)
                {
                    model = getDocumentDetail(model);

                    boClass.Alert(model, 3);
                }
                #endregion
        return result;
            
        }

        /// <Since 3 May 2018> </Since>
        public MessageModel approveDocumentVehicleRental(DocumentModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            MessageModel result = daoClass.approveDocumentVehicleRental(model);

            #region Notification of Transection
            if (result.MSGSTATUS == 0)
            {
                model = getDocumentDetail(model);

                NotificationBO boClass = new NotificationBO();
                boClass.Alert(model, 3);
            }
            #endregion

            return result;
        }

        /// <Since 23 March 2018> </Since>
        public MessageModel getNextRevisionDocument(RequestModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            return daoClass.getNextRevisionDocument(model);
        }

        /// <Since 23 March 2018> </Since>
        public MessageModel insertNewRivisionDocumentLandLeaseAgreement(RequestModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            return daoClass.insertNewRivisionDocumentLandLeaseAgreement(model);
        }

        /// <Since 2 April 2018> </Since>
        public MessageModel insertNewRivisionDocumentLicense(RequestModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            return daoClass.insertNewRivisionDocumentLicense(model);
        }

        /// <Since 5 May 2018> </Since>
        public MessageModel insertNewRivisionDocumentVehicleRental(RequestModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            return daoClass.insertNewRivisionDocumentVehicleRental(model);
        }

        /// <summary>
        /// Insert new revision document space rental.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public MessageModel InsertNewRivisionDocumentSpaceRental(RequestModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            return daoClass.InsertNewRivisionDocumentSpaceRental(model);
        }

        /// <Since 23 April 2018> </Since>
        public MessageModel deleteDraftDocument(RequestModel model)
        {
            DocumentDAO daoClass = new DocumentDAO();
            return daoClass.deleteDraftDocument(model);
        }
    }
}
