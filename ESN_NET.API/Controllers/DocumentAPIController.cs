using ESN_NET.BO.Library.Document;
using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Document.MODEL;
using ESN_NET.DBconnect.Request.MODEL;
using System;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class DocumentAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public DocumentAPIController()
        {
            logger = new Logger("DocumentAPIController");
            line = new LineAPI();
        }

        /// <Since 9 March 2018> </Since>
        [ActionName("insertDocumentLandLeaseAgreement")]
        [HttpPost]
        public MessageModel insertDocumentLandLeaseAgreement(DocumentModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("insertDocumentLandLeaseAgreement : {0}", model.REQUEST.USERREQUESTNAME));
                result = boClass.insertDocumentLandLeaseAgreement(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("insertDocumentLandLeaseAgreement : {0}", ex.Message));
                logger.error(string.Format("insertDocumentLandLeaseAgreement : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 9 March 2018> </Since>
        [ActionName("insertDocumentLicense")]
        [HttpPost]
        public MessageModel insertDocumentLicense(DocumentModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("insertDocumentLicense : {0}", model.REQUEST.USERREQUESTNAME));
                result = boClass.insertDocumentLicense(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("insertDocumentLicense : {0}", ex.Message));
                logger.error(string.Format("insertDocumentLicense : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 18 April 2018> </Since>
        [ActionName("insertDocumentSpaceRental")]
        [HttpPost]
        public MessageModel insertDocumentSpaceRental(DocumentModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                result = boClass.insertDocumentSpaceRental(model);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("insertDocumentSpaceRental : {0}", ex.Message));
                line.NotificationLine(string.Format("insertDocumentSpaceRental : {0}", ex.Message));
            }

            return result;
        }

        /// <summary>
        /// Insert document vehicle rental.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ActionName("insertDocumentVehicleRental")]
        [HttpPost]
        public MessageModel InsertDocumentVehicleRental(DocumentModel model)
        {
            const string msgFormat = "insertDocumentVehicleRental : {0}";

            try
            {
                logger.info(string.Format(msgFormat, model.REQUEST.USERREQUESTNAME));

                var boClass = new DocumentBO();
                return boClass.InsertDocumentVehicleRental(model);
            }
            catch (Exception ex)
            {
                string errMessage = string.Format(msgFormat, ex.Message);
                logger.error(errMessage);
                line.NotificationLine(errMessage);

                return new MessageModel
                {
                    MSGSTATUS = 1,
                    MSGTEXT = errMessage
                };
            }
        }

        /// <summary>
        /// Update document vehicle rental.
        /// </summary>
        /// <param name="model"></param>
        /// <Since 04 May 2018> </Since>
        /// <returns></returns>
        [ActionName("updateDocumentVehicleRental")]
        [HttpPost]
        public MessageModel updateDocumentVehicleRental(DocumentModel model)
        {
            const string msgFormat = "updateDocumentVehicleRental : {0}";

            try
            {
                logger.info(string.Format(msgFormat, model.REQUEST.USERREQUESTNAME));

                var boClass = new DocumentBO();
                return boClass.UpdateDocumentVehicleRental(model);
            }
            catch (Exception ex)
            {
                string errMessage = string.Format(msgFormat, ex.Message);
                logger.error(errMessage);
                line.NotificationLine(errMessage);

                return new MessageModel
                {
                    MSGSTATUS = 1,
                    MSGTEXT = errMessage
                };
            }
        }

        /// <Since 16 March 2018> </Since>
        [ActionName("updateDocumentLandLeaseAgreement")]
        [HttpPost]
        public MessageModel updateDocumentLandLeaseAgreement(DocumentModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("updateDocumentLandLeaseAgreement : {0}", model.REQUEST.USERREQUESTNAME));
                result = boClass.updateDocumentLandLeaseAgreement(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("updateDocumentLandLeaseAgreement : {0}", ex.Message));
                logger.error(string.Format("updateDocumentLandLeaseAgreement : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 16 March 2018> </Since>
        [ActionName("updateDocumentLicense")]
        [HttpPost]
        public MessageModel updateDocumentLicense(DocumentModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("updateDocumentLicense : {0}", model.REQUEST.USERREQUESTNAME));
                result = boClass.updateDocumentLicense(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("updateDocumentLicense : {0}", ex.Message));
                logger.error(string.Format("updateDocumentLicense : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 7 May 2018> </Since>
        [ActionName("updateDocumentSpaceRental")]
        [HttpPost]
        public MessageModel updateDocumentSpaceRental(DocumentModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("updateDocumentSpaceRental : {0}", model.REQUEST.USERREQUESTNAME));
                result = boClass.updateDocumentSpaceRental(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("updateDocumentSpaceRental : {0}", ex.Message));
                logger.error(string.Format("updateDocumentSpaceRental : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 13 March 2018> </Since>
        [ActionName("getDocumentDetail")]
        [HttpPost]
        public DocumentModel getDocumentDetail(DocumentModel model)
        {
            DocumentModel result = new DocumentModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("getDocumentDetail : {0}", model.REQUEST.USERREQUESTNAME));
                result = boClass.getDocumentDetail(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("getDocumentDetail : {0}", ex.Message));
                logger.error(string.Format("getDocumentDetail : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 16 March 2018> </Since>
        [ActionName("approveDocumentLandLeaseAgreement")]
        [HttpPost]
        public MessageModel approveDocumentLandLeaseAgreement(DocumentModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("approveDocumentLandLeaseAgreement : {0}", model.REQUEST.USERREQUESTNAME));
                result = boClass.approveDocumentLandLeaseAgreement(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("approveDocumentLandLeaseAgreement : {0}", ex.Message));
                logger.error(string.Format("approveDocumentLandLeaseAgreement : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 22 March 2018> </Since>
        [ActionName("rejectDocumentLandLeaseAgreement")]
        [HttpPost]
        public MessageModel rejectDocumentLandLeaseAgreement(RequestModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("rejectDocumentLandLeaseAgreement : {0}", model.USERREQUESTNAME));
                result = boClass.rejectDocumentLandLeaseAgreement(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("rejectDocumentLandLeaseAgreement : {0}", ex.Message));
                logger.error(string.Format("rejectDocumentLandLeaseAgreement : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 16 March 2018> </Since>
        [ActionName("approveDocumentLicense")]
        [HttpPost]
        public MessageModel approveDocumentLicense(DocumentModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("approveDocumentLicense : {0}", model.REQUEST.USERREQUESTNAME));
                result = boClass.approveDocumentLicense(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("approveDocumentLicense : {0}", ex.Message));
                logger.error(string.Format("approveDocumentLicense : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 5 May 2018> </Since>
        [ActionName("approveDocumentSpaceRental")]
        [HttpPost]
        public MessageModel approveDocumentSpaceRental(DocumentModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("approveDocumentSpaceRental : {0}", model.REQUEST.USERREQUESTNAME));
                result = boClass.approveDocumentSpaceRental(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("approveDocumentSpaceRental : {0}", ex.Message));
                logger.error(string.Format("approveDocumentSpaceRental : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 3 May 2018> </Since>
        [ActionName("approveDocumentVehicleRental")]
        [HttpPost]
        public MessageModel approveDocumentVehicleRental(DocumentModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("approveDocumentVehicleRental : {0}", model.REQUEST.USERREQUESTNAME));
                result = boClass.approveDocumentVehicleRental(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("approveDocumentVehicleRental : {0}", ex.Message));
                logger.error(string.Format("approveDocumentVehicleRental : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 23 March 2018> </Since>
        [ActionName("getNextRevisionDocument")]
        [HttpPost]
        public MessageModel getNextRevisionDocument(RequestModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("getNextRevisionDocument : {0}", model.USERREQUESTNAME));
                result = boClass.getNextRevisionDocument(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("getNextRevisionDocument : {0}", ex.Message));
                logger.error(string.Format("getNextRevisionDocument : {0}", ex.Message));
            }

            return result;
        }

        [ActionName("insertNewRivisionDocumentLandLeaseAgreement")]
        [HttpPost]
        public MessageModel insertNewRivisionDocumentLandLeaseAgreement(RequestModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("insertNewRivisionDocumentLandLeaseAgreement : {0}", model.USERREQUESTNAME));
                result = boClass.insertNewRivisionDocumentLandLeaseAgreement(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("insertNewRivisionDocumentLandLeaseAgreement : {0}", ex.Message));
                logger.error(string.Format("insertNewRivisionDocumentLandLeaseAgreement : {0}", ex.Message));
            }

            return result;
        }

        [ActionName("insertNewRivisionDocumentLicense")]
        [HttpPost]
        public MessageModel insertNewRivisionDocumentLicense(RequestModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("insertNewRivisionDocumentLicense : {0}", model.USERREQUESTNAME));
                result = boClass.insertNewRivisionDocumentLicense(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("insertNewRivisionDocumentLicense : {0}", ex.Message));
                logger.error(string.Format("insertNewRivisionDocumentLicense : {0}", ex.Message));
            }

            return result;
        }

        [ActionName("insertNewRivisionDocumentVehicleRental")]
        [HttpPost]
        public MessageModel insertNewRivisionDocumentVehicleRental(RequestModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("insertNewRivisionDocumentVehicleRental : {0}", model.USERREQUESTNAME));
                result = boClass.insertNewRivisionDocumentVehicleRental(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("insertNewRivisionDocumentVehicleRental : {0}", ex.Message));
                logger.error(string.Format("insertNewRivisionDocumentVehicleRental : {0}", ex.Message));
            }

            return result;
        }

        /// <summary>
        /// Insert new revision document space rental.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ActionName("insertNewRivisionDocumentSpaceRental")]
        [HttpPost]
        public MessageModel InsertNewRivisionDocumentSpaceRental(RequestModel model)
        {
            const string msgFormat = "InsertNewRivisionDocumentSpaceRental : {0}";

            MessageModel result = new MessageModel();
            try
            {
                logger.info(string.Format(msgFormat, model.USERREQUESTNAME));
                DocumentBO boClass = new DocumentBO();
                result = boClass.InsertNewRivisionDocumentSpaceRental(model);
            }
            catch (Exception ex)
            {
                string errMessage = string.Format(msgFormat, ex.Message);

                logger.error(errMessage);
                line.NotificationLine(string.Format(msgFormat, ex.Message));
            }

            return result;
        }

        [ActionName("deleteDraftDocument")]
        [HttpPost]
        public MessageModel deleteDraftDocument(RequestModel model)
        {
            MessageModel result = new MessageModel();
            DocumentBO boClass = new DocumentBO();

            try
            {
                logger.info(string.Format("deleteDraftDocument : {0}", model.USERREQUESTNAME));
                result = boClass.deleteDraftDocument(model);
            }
            catch (Exception ex)
            {
                line.NotificationLine(string.Format("deleteDraftDocument : {0}", ex.Message));
                logger.error(string.Format("deleteDraftDocument : {0}", ex.Message));
            }

            return result;
        }
    }
}
