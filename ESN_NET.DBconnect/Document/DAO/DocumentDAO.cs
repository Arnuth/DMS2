using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Document.MODEL;
using ESN_NET.DBconnect.DocumentLandLeaseAgreement.MODEL;
using ESN_NET.DBconnect.DocumentLicense.MODEL;
using ESN_NET.DBconnect.DocumentSpaceRental.MODEL;
using ESN_NET.DBconnect.Request.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace ESN_NET.DBconnect.Document.DAO
{
    public class DocumentDAO
    {
        #region Private variables
        private SQLconnect conn;
        private string formatDate;
        #endregion

        #region Class constructor

        /// <summary>
        /// Class constructor.
        /// </summary>
        public DocumentDAO()
        {
            conn = new SQLconnect();
            formatDate = GetConfig.getAppSetting(Constants.FORMATDATEDB);
        }

        #endregion Class constructor

        #region Insert document methods

        /// <Since 8 March 2018> </Since>
        public MessageModel insertDocumentLandLeaseAgreement(DocumentModel model, DataTable lessorTable, DataTable receivePersonTable, DataTable landLeaseRateTable, DataTable deedOwnerTable)
        {
            try
            {
                RequestModel reqModel = model.REQUEST;
                DocumentLandLeaseAgreementModel llaModel = model.DOCUMENT_LANDLEASEAGREEMENT;

                ArrayList arLstParameter = new ArrayList();
                List<DataTableParameter> dtParams = new List<DataTableParameter>();

                #region Request
                if (!string.IsNullOrEmpty(reqModel.STORECODE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@storecode", reqModel.STORECODE, "NVARCHAR");
                if (reqModel.DOCTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
                if (reqModel.REQUESTSTATUS > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCreateDate", reqModel.DOC_CREATEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CREATEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docEffectiveDate", reqModel.DOC_EFFECTIVEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EFFECTIVEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docExpireDate", reqModel.DOC_EXPIREDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EXPIREDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCancelDate", reqModel.DOC_CANCELDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CANCELDATE), "NVARCHAR");
                if (reqModel.USERREQUESTID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqID", reqModel.USERREQUESTID.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.USERREQUESTNAME))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqName", reqModel.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Exp", reqModel.NOTICENUMBER_EXPIRE.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_EXPIRE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Exp", reqModel.NOTICEUNIT_EXPIRE, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_payout", reqModel.NOTICENUMBER_PAYOUT.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_PAYOUT))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_payout", reqModel.NOTICEUNIT_PAYOUT, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.REMARKS))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");
                #endregion

                #region Land Lease Agreement Document
                if (!string.IsNullOrEmpty(llaModel.AGREEMENTNO))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@docname", llaModel.AGREEMENTNO, "NVARCHAR");
                if (llaModel.AGREEMENTTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@agreementTypeID", llaModel.AGREEMENTTYPEID.ToString(), "NVARCHAR");
                if (llaModel.AGREEMENTTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@receivePersonNum", llaModel.RECEIVEPERSONNUMBER.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@serviceAttachFlag", llaModel.SERVICEATTACHMENTFLAG.ToString(), "NVARCHAR");
                if (llaModel.PAYMENTOUTTERM > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@paymentOutTerm", llaModel.PAYMENTOUTTERM.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@firstPaymentOutDate", llaModel.FIRSTPAYMENTOUTDATE == null ? "-" : String.Format(formatDate, llaModel.FIRSTPAYMENTOUTDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@paymentOutWithinDate", llaModel.PAYMENTOUTWITHINDATE.ToString(), "NVARCHAR");
                if (llaModel.LANDLEASETAXTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@landLeaseTaxTypeID", llaModel.LANDLEASETAXTYPEID.ToString(), "NVARCHAR");
                if (llaModel.SERVICETAXTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@serviceTaxTypeID", llaModel.SERVICETAXTYPEID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futurePaymentOutFlag", llaModel.FUTUREPAYMENTOUTFLAG.ToString(), "NVARCHAR");
                if (llaModel.FUTUREPAYMENTOUTTERM > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@futurePaymentOutTerm", llaModel.FUTUREPAYMENTOUTTERM.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futurePaymentOutStartDate", llaModel.FUTUREPAYMENTOUTSTARTDATE == null ? "-" : String.Format(formatDate, llaModel.FUTUREPAYMENTOUTSTARTDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futurePaymentOutEndDate", llaModel.FUTUREPAYMENTOUTENDDATE == null ? "-" : String.Format(formatDate, llaModel.FUTUREPAYMENTOUTENDDATE), "NVARCHAR");

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futureServicePaymentOutFlag", llaModel.FUTURESERVICEPAYMENTOUTFLAG.ToString(), "NVARCHAR");
                if (llaModel.FUTURESERVICEPAYMENTOUTTERM > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@futureServicePaymentOutTerm", llaModel.FUTURESERVICEPAYMENTOUTTERM.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futureServicePaymentOutStartDate", llaModel.FUTURESERVICEPAYMENTOUTSTARTDATE == null ? "-" : String.Format(formatDate, llaModel.FUTURESERVICEPAYMENTOUTSTARTDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futureServicePaymentOutEndDate", llaModel.FUTURESERVICEPAYMENTOUTENDDATE == null ? "-" : String.Format(formatDate, llaModel.FUTURESERVICEPAYMENTOUTENDDATE), "NVARCHAR");

                if (!string.IsNullOrEmpty(llaModel.DEEDOWNER))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@deedOwner", llaModel.DEEDOWNER, "NVARCHAR");
                if (llaModel.HOUSEANDLANDTAX > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@houseAndLandTax", llaModel.HOUSEANDLANDTAX.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@depositFlag", llaModel.DEPOSITFLAG.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@depositAmount", llaModel.DEPOSITAMOUNT.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(llaModel.DEPOSITREMARKS))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@depositRemarks", llaModel.DEPOSITREMARKS, "NVARCHAR");
                if (llaModel.CANCELINFODATE > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@cancelInfoDate", llaModel.CANCELINFODATE.ToString(), "NVARCHAR");

                SQLconnect.PROCDataTablesCollection(dtParams, "@lessorInfo", lessorTable);
                SQLconnect.PROCDataTablesCollection(dtParams, "@receivePersonInfo", receivePersonTable);
                SQLconnect.PROCDataTablesCollection(dtParams, "@landLeaseRate", landLeaseRateTable);
                SQLconnect.PROCDataTablesCollection(dtParams, "@deedOwnerInfo", deedOwnerTable);
                #endregion

                MessageModel ExecutedResult = conn.GetResultPROCWithDataTable<MessageModel>("CJ_SP_DOCUMENT_INSERT_DOCUMENT_LAND_LEASE_AGREEMENT", dtParams, arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 8 March 2018> </Since>
        public MessageModel insertDocumentLicense(DocumentModel model)
        {
            try
            {
                RequestModel reqModel = model.REQUEST;
                DocumentLicenseModel licenseModel = model.DOCUMENT_LICENSE;

                ArrayList arLstParameter = new ArrayList();

                #region Request
                if (!string.IsNullOrEmpty(reqModel.STORECODE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@storecode", reqModel.STORECODE, "NVARCHAR");
                if (reqModel.DOCTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
                if (reqModel.REQUESTSTATUS > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCreateDate", reqModel.DOC_CREATEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CREATEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docEffectiveDate", reqModel.DOC_EFFECTIVEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EFFECTIVEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docExpireDate", reqModel.DOC_EXPIREDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EXPIREDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCancelDate", reqModel.DOC_CANCELDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CANCELDATE), "NVARCHAR");
                if (reqModel.USERREQUESTID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqID", reqModel.USERREQUESTID.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.USERREQUESTNAME))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqName", reqModel.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Exp", reqModel.NOTICENUMBER_EXPIRE.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_EXPIRE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Exp", reqModel.NOTICEUNIT_EXPIRE, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_payout", reqModel.NOTICENUMBER_PAYOUT.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_PAYOUT))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_payout", reqModel.NOTICEUNIT_PAYOUT, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.REMARKS))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");
                #endregion

                #region License Document
                if (licenseModel.LICENSETYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@licenseTypeID", licenseModel.LICENSETYPEID.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(licenseModel.LICENSEBOOKNO))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@licenseBookNo", licenseModel.LICENSEBOOKNO, "NVARCHAR");
                if (!string.IsNullOrEmpty(licenseModel.LICENSEDOCNO))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@licenseDocNo", licenseModel.LICENSEDOCNO, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@feeAmount", licenseModel.FEEAMOUNT.ToString(), "NVARCHAR");
                if (licenseModel.HOUSEANDLANDTAX > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@houseAndLandTaxType", licenseModel.HOUSEANDLANDTAX.ToString(), "NVARCHAR");
                #endregion

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_INSERT_DOCUMENT_LICENSE", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 18 April 2018> </Since>
        public MessageModel insertDocumentSpaceRental(DocumentModel model, DataTable lesseeTable, DataTable receiveAccountTable)
        {
            try
            {
                RequestModel reqModel = model.REQUEST;
                //DocumentLandLeaseAgreementModel llaModel = model.DOCUMENT_LANDLEASEAGREEMENT;
                DocumentSpaceRentalModel srModel = model.DOCUMENT_SPACERENTAL;

                ArrayList arLstParameter = new ArrayList();
                List<DataTableParameter> dtParams = new List<DataTableParameter>();

                #region Request
                if (!string.IsNullOrEmpty(reqModel.STORECODE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@storecode", reqModel.STORECODE, "NVARCHAR");
                if (reqModel.DOCTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
                if (reqModel.REQUESTSTATUS > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCreateDate", reqModel.DOC_CREATEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CREATEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docEffectiveDate", reqModel.DOC_EFFECTIVEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EFFECTIVEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docExpireDate", reqModel.DOC_EXPIREDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EXPIREDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCancelDate", reqModel.DOC_CANCELDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CANCELDATE), "NVARCHAR");
                if (reqModel.USERREQUESTID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqID", reqModel.USERREQUESTID.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.USERREQUESTNAME))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqName", reqModel.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Exp", reqModel.NOTICENUMBER_EXPIRE.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_EXPIRE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Exp", reqModel.NOTICEUNIT_EXPIRE, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_PAYOUT))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_payout", reqModel.NOTICENUMBER_PAYOUT.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_PAYOUT))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_payout", reqModel.NOTICEUNIT_PAYOUT, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.REMARKS))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");
                #endregion

                #region Space Rental Document
                if (!string.IsNullOrEmpty(srModel.SPACERENTAL_DOCNO))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@spaceRentalDocNo", srModel.SPACERENTAL_DOCNO.ToString(), "NVARCHAR");
                if (srModel.SPACERENTALTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@spaceRentalTypeID", srModel.SPACERENTALTYPEID.ToString(), "NVARCHAR");
                if (srModel.SERVICECHARGETYPE > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@serviceChargeType", srModel.SERVICECHARGETYPE.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@serviceChargeAmount", srModel.SERVICECHARGEAMOUNT.ToString(), "NVARCHAR");
                if (srModel.SERVICECHARGETAXFLAG > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@serviceChargeTaxFlag", srModel.SERVICECHARGETAXFLAG.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@electricChargeAmount", srModel.ELECTRICCHARGEAMOUNT.ToString(), "NVARCHAR");
                if (srModel.ELECTRICCHARGETAXFLAG > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@electricChargeTaxFlag", srModel.ELECTRICCHARGETAXFLAG.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@waterChargeAmount", srModel.WATERCHARGEAMOUNT.ToString(), "NVARCHAR");
                if (srModel.WATERCHARGETAXFLAG > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@waterChargeTaxFlag", srModel.WATERCHARGETAXFLAG.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@insuranceChargeAmount", srModel.INSURANCECHARGEAMOUNT.ToString(), "NVARCHAR");
                if (srModel.INSURANCECHARGETAXFLAG > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@insuranceChargeTaxFlag", srModel.INSURANCECHARGETAXFLAG.ToString(), "NVARCHAR");
                if (srModel.HOUSEANDLANDTAXID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@houseAndLandTaxID", srModel.HOUSEANDLANDTAXID.ToString(), "NVARCHAR");
                if (srModel.BOARDTAXID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@boardTaxID", srModel.BOARDTAXID.ToString(), "NVARCHAR");
                if (srModel.RENTALNUMBER > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@rentalNumber", srModel.RENTALNUMBER.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(srModel.RENTALUNIT))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@rentalUnit", srModel.RENTALUNIT.ToString(), "NVARCHAR");
                if (srModel.PAYMENTOUTWITHINDATE > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@paymentOutWithInDate", srModel.PAYMENTOUTWITHINDATE.ToString(), "NVARCHAR");
                if (srModel.CANCELINFODATE > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@cancelInfoDate", srModel.CANCELINFODATE.ToString(), "NVARCHAR");
                if (srModel.SPACERENTALSIZEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@spaceRentalSizeID", srModel.SPACERENTALSIZEID.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(srModel.SPACERENTALDESC))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@spaceRentalDESC", srModel.SPACERENTALDESC.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(srModel.CJBANKACCOUNTLIST))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@cjBankAccountList", srModel.CJBANKACCOUNTLIST.ToString(), "NVARCHAR");

                SQLconnect.PROCDataTablesCollection(dtParams, "@lesseeInfo", lesseeTable);
                SQLconnect.PROCDataTablesCollection(dtParams, "@receiveAccountInfo", receiveAccountTable);
                #endregion

                MessageModel ExecutedResult = conn.GetResultPROCWithDataTable<MessageModel>("CJ_SP_DOCUMENT_INSERT_DOCUMENT_SPACE_RENTAL", dtParams, arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Insert document vehicle rental.
        /// </summary>
        /// <param name="model"></param>
        /// <param name="dataTables"></param>
        /// <returns></returns>
        public MessageModel InsertDocumentVehicleRental(DocumentModel model, params DataTable[] dataTables)
        {
            var arLstParameter = new ArrayList();

            #region Request

            var reqModel = model.REQUEST;

            SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqID", reqModel.USERREQUESTID.ToString(), "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqName", reqModel.USERREQUESTNAME, "NVARCHAR");

            SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCreateDate", reqModel.DOC_CREATEDATE.HasValue ? String.Format(formatDate, reqModel.DOC_CREATEDATE) : "-", "NVARCHAR");

            // Expire
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Exp", reqModel.NOTICENUMBER_EXPIRE.ToString(), "NVARCHAR");
            if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_EXPIRE))
            {
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Exp", reqModel.NOTICEUNIT_EXPIRE, "NVARCHAR");
            }

            // Insurance
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Ins", reqModel.NOTICENUMBER_INSURANCE.ToString(), "NVARCHAR");
            if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_INSURANCE))
            {
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Ins", reqModel.NOTICEUNIT_INSURANCE, "NVARCHAR");
            }

            // Car Act
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Act", reqModel.NOTICENUMBER_CARACT.ToString(), "NVARCHAR");
            if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_CARACT))
            {
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Act", reqModel.NOTICEUNIT_CARACT, "NVARCHAR");
            }

            // Vehicle Tax
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Tax", reqModel.NOTICENUMBER_VEHICLETAX.ToString(), "NVARCHAR");
            if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_VEHICLETAX))
            {
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Tax", reqModel.NOTICEUNIT_VEHICLETAX, "NVARCHAR");
            }

            #endregion Request

            #region Vehicle Rental Document

            var vrModel = model.DOCUMENT_VEHICLERENTAL;

            //SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqId", vrModel.REQID, "NVARCHAR");
            //SQLconnect.PROCArgumentsCollection(arLstParameter, "@docRunNo", vrModel.DOCRUNNO, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@lessorName", vrModel.LESSORNAME.ToString(), "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@vehicleRental_docNo", vrModel.VEHICLERENTAL_DOCNO, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@vehicleRentalTypeId", vrModel.VEHICLERENTALTYPEID.ToString(), "INT");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@paymentOutWithinDate", vrModel.PAYMENTOUTWITHINDATE.ToString(), "INT");

            #endregion Vehicle Rental Document

            #region DataTables

            var dtParams = new List<DataTableParameter>();

            SQLconnect.PROCDataTablesCollection(dtParams, "@assetInfo", dataTables[0]);
            SQLconnect.PROCDataTablesCollection(dtParams, "@receivePersonInfo", dataTables[1]);

            #endregion

            return conn.GetResultPROCWithDataTable<MessageModel>("CJ_SP_DOCUMENT_INSERT_DOCUMENT_VEHICLE_RENTAL", dtParams, arLstParameter).First<MessageModel>();
        }

        #endregion Insert document methods

        #region Update document methods

        /// <summary>
        /// Insert document vehicle rental.
        /// </summary>
        /// <param name="model"></param>
        /// <param name="dataTables"></param>
        /// <Since 04 May 2018> </Since>
        /// <returns></returns>
        public MessageModel updateDocumentVehicleRental(DocumentModel model, params DataTable[] dataTables)
        {
            var arLstParameter = new ArrayList();

            #region Request

            var reqModel = model.REQUEST;

            SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqrunno", reqModel.REQID, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqID", reqModel.USERREQUESTID.ToString(), "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqName", reqModel.USERREQUESTNAME, "NVARCHAR");

            SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCreateDate", reqModel.DOC_CREATEDATE.HasValue ? String.Format(formatDate, reqModel.DOC_CREATEDATE) : "-", "NVARCHAR");

            // Expire
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Exp", reqModel.NOTICENUMBER_EXPIRE.ToString(), "NVARCHAR");
            if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_EXPIRE))
            {
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Exp", reqModel.NOTICEUNIT_EXPIRE, "NVARCHAR");
            }

            // Insurance
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Ins", reqModel.NOTICENUMBER_INSURANCE.ToString(), "NVARCHAR");
            if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_INSURANCE))
            {
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Ins", reqModel.NOTICEUNIT_INSURANCE, "NVARCHAR");
            }

            // Car Act
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Act", reqModel.NOTICENUMBER_CARACT.ToString(), "NVARCHAR");
            if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_CARACT))
            {
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Act", reqModel.NOTICEUNIT_CARACT, "NVARCHAR");
            }

            // Vehicle Tax
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Tax", reqModel.NOTICENUMBER_VEHICLETAX.ToString(), "NVARCHAR");
            if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_VEHICLETAX))
            {
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Tax", reqModel.NOTICEUNIT_VEHICLETAX, "NVARCHAR");
            }

            // Remark
            if (!string.IsNullOrEmpty(reqModel.REMARKS))
            {
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");
            }

            // Documrnt Cancel Date
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCancelDate", reqModel.DOC_CANCELDATE.HasValue ? String.Format(formatDate, reqModel.DOC_CANCELDATE) : "-", "NVARCHAR");


            #endregion Request

            #region Vehicle Rental Document

            var vrModel = model.DOCUMENT_VEHICLERENTAL;

            //SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqId", vrModel.REQID, "NVARCHAR");
            //SQLconnect.PROCArgumentsCollection(arLstParameter, "@docRunNo", vrModel.DOCRUNNO, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@lessorName", vrModel.LESSORNAME.ToString(), "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@vehicleRental_docNo", vrModel.VEHICLERENTAL_DOCNO, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@vehicleRentalTypeId", vrModel.VEHICLERENTALTYPEID.ToString(), "INT");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@paymentOutWithinDate", vrModel.PAYMENTOUTWITHINDATE.ToString(), "INT");

            #endregion Vehicle Rental Document

            #region DataTables

            var dtParams = new List<DataTableParameter>();

            SQLconnect.PROCDataTablesCollection(dtParams, "@assetInfo", dataTables[0]);
            SQLconnect.PROCDataTablesCollection(dtParams, "@receivePersonInfo", dataTables[1]);

            #endregion

            return conn.GetResultPROCWithDataTable<MessageModel>("CJ_SP_DOCUMENT_UPDATE_DOCUMENT_VEHICLE_RENTAL", dtParams, arLstParameter).First<MessageModel>();
        }

        /// <Since 16 March 2018> </Since>
        public MessageModel updateDocumentLandLeaseAgreement(DocumentModel model, DataTable lessorTable, DataTable receivePersonTable, DataTable landLeaseRateTable, DataTable deedOwnerTable)
        {
            try
            {
                RequestModel reqModel = model.REQUEST;
                DocumentLandLeaseAgreementModel llaModel = model.DOCUMENT_LANDLEASEAGREEMENT;

                ArrayList arLstParameter = new ArrayList();
                List<DataTableParameter> dtParams = new List<DataTableParameter>();

                #region Request
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqModel.REQID, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.STORECODE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@storecode", reqModel.STORECODE, "NVARCHAR");
                if (reqModel.DOCTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
                if (reqModel.REQUESTSTATUS > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCreateDate", reqModel.DOC_CREATEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CREATEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docEffectiveDate", reqModel.DOC_EFFECTIVEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EFFECTIVEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docExpireDate", reqModel.DOC_EXPIREDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EXPIREDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCancelDate", reqModel.DOC_CANCELDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CANCELDATE), "NVARCHAR");
                if (reqModel.USERREQUESTID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqID", reqModel.USERREQUESTID.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.USERREQUESTNAME))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqName", reqModel.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Exp", reqModel.NOTICENUMBER_EXPIRE.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_EXPIRE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Exp", reqModel.NOTICEUNIT_EXPIRE, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_payout", reqModel.NOTICENUMBER_PAYOUT.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_PAYOUT))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_payout", reqModel.NOTICEUNIT_PAYOUT, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.REMARKS))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");
                #endregion

                #region Land Lease Agreement Document
                if (!string.IsNullOrEmpty(llaModel.AGREEMENTNO))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@docname", llaModel.AGREEMENTNO, "NVARCHAR");
                if (llaModel.AGREEMENTTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@agreementTypeID", llaModel.AGREEMENTTYPEID.ToString(), "NVARCHAR");
                if (llaModel.AGREEMENTTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@receivePersonNum", llaModel.RECEIVEPERSONNUMBER.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@serviceAttachFlag", llaModel.SERVICEATTACHMENTFLAG.ToString(), "NVARCHAR");
                if (llaModel.PAYMENTOUTTERM > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@paymentOutTerm", llaModel.PAYMENTOUTTERM.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@firstPaymentOutDate", llaModel.FIRSTPAYMENTOUTDATE == null ? "-" : String.Format(formatDate, llaModel.FIRSTPAYMENTOUTDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@paymentOutWithinDate", llaModel.PAYMENTOUTWITHINDATE.ToString(), "NVARCHAR");
                if (llaModel.LANDLEASETAXTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@landLeaseTaxTypeID", llaModel.LANDLEASETAXTYPEID.ToString(), "NVARCHAR");
                if (llaModel.SERVICETAXTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@serviceTaxTypeID", llaModel.SERVICETAXTYPEID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futurePaymentOutFlag", llaModel.FUTUREPAYMENTOUTFLAG.ToString(), "NVARCHAR");
                if (llaModel.FUTUREPAYMENTOUTTERM > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@futurePaymentOutTerm", llaModel.FUTUREPAYMENTOUTTERM.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futurePaymentOutStartDate", llaModel.FUTUREPAYMENTOUTSTARTDATE == null ? "-" : String.Format(formatDate, llaModel.FUTUREPAYMENTOUTSTARTDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futurePaymentOutEndDate", llaModel.FUTUREPAYMENTOUTENDDATE == null ? "-" : String.Format(formatDate, llaModel.FUTUREPAYMENTOUTENDDATE), "NVARCHAR");

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futureServicePaymentOutFlag", llaModel.FUTURESERVICEPAYMENTOUTFLAG.ToString(), "NVARCHAR");
                if (llaModel.FUTURESERVICEPAYMENTOUTTERM > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@futureServicePaymentOutTerm", llaModel.FUTURESERVICEPAYMENTOUTTERM.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futureServicePaymentOutStartDate", llaModel.FUTURESERVICEPAYMENTOUTSTARTDATE == null ? "-" : String.Format(formatDate, llaModel.FUTURESERVICEPAYMENTOUTSTARTDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@futureServicePaymentOutEndDate", llaModel.FUTURESERVICEPAYMENTOUTENDDATE == null ? "-" : String.Format(formatDate, llaModel.FUTURESERVICEPAYMENTOUTENDDATE), "NVARCHAR");

                if (!string.IsNullOrEmpty(llaModel.DEEDOWNER))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@deedOwner", llaModel.DEEDOWNER, "NVARCHAR");
                if (llaModel.HOUSEANDLANDTAX > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@houseAndLandTax", llaModel.HOUSEANDLANDTAX.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@depositFlag", llaModel.DEPOSITFLAG.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@depositAmount", llaModel.DEPOSITAMOUNT.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(llaModel.DEPOSITREMARKS))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@depositRemarks", llaModel.DEPOSITREMARKS, "NVARCHAR");
                if (llaModel.CANCELINFODATE > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@cancelInfoDate", llaModel.CANCELINFODATE.ToString(), "NVARCHAR");

                SQLconnect.PROCDataTablesCollection(dtParams, "@lessorInfo", lessorTable);
                SQLconnect.PROCDataTablesCollection(dtParams, "@receivePersonInfo", receivePersonTable);
                SQLconnect.PROCDataTablesCollection(dtParams, "@landLeaseRate", landLeaseRateTable);
                SQLconnect.PROCDataTablesCollection(dtParams, "@deedOwnerInfo", deedOwnerTable);
                #endregion

                MessageModel ExecutedResult = conn.GetResultPROCWithDataTable<MessageModel>("CJ_SP_DOCUMENT_UPDATE_DOCUMENT_LAND_LEASE_AGREEMENT", dtParams, arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 16 March 2018> </Since>
        public MessageModel updateDocumentLicense(DocumentModel model)
        {
            try
            {
                RequestModel reqModel = model.REQUEST;
                DocumentLicenseModel licenseModel = model.DOCUMENT_LICENSE;

                ArrayList arLstParameter = new ArrayList();

                #region Request
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqModel.REQID, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.STORECODE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@storecode", reqModel.STORECODE, "NVARCHAR");
                if (reqModel.DOCTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
                if (reqModel.REQUESTSTATUS > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCreateDate", reqModel.DOC_CREATEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CREATEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docEffectiveDate", reqModel.DOC_EFFECTIVEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EFFECTIVEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docExpireDate", reqModel.DOC_EXPIREDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EXPIREDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCancelDate", reqModel.DOC_CANCELDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CANCELDATE), "NVARCHAR");
                if (reqModel.USERREQUESTID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqID", reqModel.USERREQUESTID.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.USERREQUESTNAME))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqName", reqModel.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Exp", reqModel.NOTICENUMBER_EXPIRE.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_EXPIRE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Exp", reqModel.NOTICEUNIT_EXPIRE, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_payout", reqModel.NOTICENUMBER_PAYOUT.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_PAYOUT))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_payout", reqModel.NOTICEUNIT_PAYOUT, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.REMARKS))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");
                #endregion

                #region License Document
                if (licenseModel.LICENSETYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@licenseTypeID", licenseModel.LICENSETYPEID.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(licenseModel.LICENSEBOOKNO))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@licenseBookNo", licenseModel.LICENSEBOOKNO, "NVARCHAR");
                if (!string.IsNullOrEmpty(licenseModel.LICENSEDOCNO))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@licenseDocNo", licenseModel.LICENSEDOCNO, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@feeAmount", licenseModel.FEEAMOUNT.ToString(), "NVARCHAR");
                if (licenseModel.HOUSEANDLANDTAX > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@houseAndLandTaxType", licenseModel.HOUSEANDLANDTAX.ToString(), "NVARCHAR");
                #endregion

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_UPDATE_DOCUMENT_LICENSE", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 18 April 2018> </Since>
        public MessageModel updateDocumentSpaceRental(DocumentModel model, DataTable lesseeTable, DataTable receiveAccountTable)
        {
            try
            {
                RequestModel reqModel = model.REQUEST;
                //DocumentLandLeaseAgreementModel llaModel = model.DOCUMENT_LANDLEASEAGREEMENT;
                DocumentSpaceRentalModel srModel = model.DOCUMENT_SPACERENTAL;

                ArrayList arLstParameter = new ArrayList();
                List<DataTableParameter> dtParams = new List<DataTableParameter>();

                #region Request
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqModel.REQID, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.STORECODE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@storecode", reqModel.STORECODE, "NVARCHAR");
                if (reqModel.DOCTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
                if (reqModel.REQUESTSTATUS > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCreateDate", reqModel.DOC_CREATEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CREATEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docEffectiveDate", reqModel.DOC_EFFECTIVEDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EFFECTIVEDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docExpireDate", reqModel.DOC_EXPIREDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_EXPIREDATE), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docCancelDate", reqModel.DOC_CANCELDATE == null ? "-" : String.Format(formatDate, reqModel.DOC_CANCELDATE), "NVARCHAR");
                if (reqModel.USERREQUESTID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqID", reqModel.USERREQUESTID.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.USERREQUESTNAME))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqName", reqModel.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_Exp", reqModel.NOTICENUMBER_EXPIRE.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_EXPIRE))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_Exp", reqModel.NOTICEUNIT_EXPIRE, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_PAYOUT))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeNumber_payout", reqModel.NOTICENUMBER_PAYOUT.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.NOTICEUNIT_PAYOUT))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@noticeUnit_payout", reqModel.NOTICEUNIT_PAYOUT, "NVARCHAR");
                if (!string.IsNullOrEmpty(reqModel.REMARKS))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");
                if (reqModel.DOC_INSURANCEREFUNDFLAG > 0)
                {
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@doc_insuranceRefundFlag", reqModel.DOC_INSURANCEREFUNDFLAG.ToString(), "NVARCHAR");
                }
                #endregion

                #region Space Rental Document
                if (!string.IsNullOrEmpty(srModel.SPACERENTAL_DOCNO))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@spaceRentalDocNo", srModel.SPACERENTAL_DOCNO.ToString(), "NVARCHAR");
                if (srModel.SPACERENTALTYPEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@spaceRentalTypeID", srModel.SPACERENTALTYPEID.ToString(), "NVARCHAR");
                if (srModel.SERVICECHARGETYPE > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@serviceChargeType", srModel.SERVICECHARGETYPE.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@serviceChargeAmount", srModel.SERVICECHARGEAMOUNT.ToString(), "NVARCHAR");
                if (srModel.SERVICECHARGETAXFLAG > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@serviceChargeTaxFlag", srModel.SERVICECHARGETAXFLAG.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@electricChargeAmount", srModel.ELECTRICCHARGEAMOUNT.ToString(), "NVARCHAR");
                if (srModel.ELECTRICCHARGETAXFLAG > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@electricChargeTaxFlag", srModel.ELECTRICCHARGETAXFLAG.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@waterChargeAmount", srModel.WATERCHARGEAMOUNT.ToString(), "NVARCHAR");
                if (srModel.WATERCHARGETAXFLAG > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@waterChargeTaxFlag", srModel.WATERCHARGETAXFLAG.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@insuranceChargeAmount", srModel.INSURANCECHARGEAMOUNT.ToString(), "NVARCHAR");
                if (srModel.INSURANCECHARGETAXFLAG > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@insuranceChargeTaxFlag", srModel.INSURANCECHARGETAXFLAG.ToString(), "NVARCHAR");
                if (srModel.HOUSEANDLANDTAXID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@houseAndLandTaxID", srModel.HOUSEANDLANDTAXID.ToString(), "NVARCHAR");
                if (srModel.BOARDTAXID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@boardTaxID", srModel.BOARDTAXID.ToString(), "NVARCHAR");
                if (srModel.RENTALNUMBER > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@rentalNumber", srModel.RENTALNUMBER.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(srModel.RENTALUNIT))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@rentalUnit", srModel.RENTALUNIT.ToString(), "NVARCHAR");
                if (srModel.PAYMENTOUTWITHINDATE > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@paymentOutWithInDate", srModel.PAYMENTOUTWITHINDATE.ToString(), "NVARCHAR");
                if (srModel.CANCELINFODATE > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@cancelInfoDate", srModel.CANCELINFODATE.ToString(), "NVARCHAR");
                if (srModel.SPACERENTALSIZEID > 0)
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@spaceRentalSizeID", srModel.SPACERENTALSIZEID.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(srModel.SPACERENTALDESC))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@spaceRentalDESC", srModel.SPACERENTALDESC.ToString(), "NVARCHAR");
                if (!string.IsNullOrEmpty(srModel.CJBANKACCOUNTLIST))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@cjBankAccountList", srModel.CJBANKACCOUNTLIST.ToString(), "NVARCHAR");

                SQLconnect.PROCDataTablesCollection(dtParams, "@lesseeInfo", lesseeTable);
                SQLconnect.PROCDataTablesCollection(dtParams, "@receiveAccountInfo", receiveAccountTable);
                #endregion

                MessageModel ExecutedResult = conn.GetResultPROCWithDataTable<MessageModel>("CJ_SP_DOCUMENT_UPDATE_DOCUMENT_SPACE_RENTAL", dtParams, arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Update document methods

        /// <Since 16 March 2018> </Since>
        public MessageModel approveDocumentLandLeaseAgreement(DocumentModel model)
        {
            try
            {
                RequestModel reqModel = model.REQUEST;
                DocumentLicenseModel licenseModel = model.DOCUMENT_LICENSE;

                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqModel.REQID, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@storecode", reqModel.STORECODE, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
                //SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userVerifyID", reqModel.USERVERIFYID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userVerifyName", reqModel.USERVERIFYNAME, "NVARCHAR");
                //SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_APPROVE_DOCUMENT_LAND_LEASE_AGREEMENT", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 16 March 2018> </Since>
        public MessageModel rejectDocumentLandLeaseAgreement(RequestModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", model.REQID, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userVerifyID", model.USERVERIFYID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userVerifyName", model.USERVERIFYNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", model.VERIFYREMARKS, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_REJECT_DOCUMENT_LAND_LEASE_AGREEMENT", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 16 March 2018> </Since>
        public MessageModel approveDocumentLicense(DocumentModel model)
        {
            try
            {
                RequestModel reqModel = model.REQUEST;
                DocumentLicenseModel licenseModel = model.DOCUMENT_LICENSE;

                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqModel.REQID, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@storecode", reqModel.STORECODE, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
                //SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userVerifyID", reqModel.USERVERIFYID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userVerifyName", reqModel.USERVERIFYNAME, "NVARCHAR");
                //SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_APPROVE_DOCUMENT_LICENSE", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 5 MaY 2018> </Since>
        public MessageModel approveDocumentSpaceRental(DocumentModel model)
        {
            try
            {
                RequestModel reqModel = model.REQUEST;
                DocumentLicenseModel licenseModel = model.DOCUMENT_LICENSE;

                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqModel.REQID, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@storecode", reqModel.STORECODE, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
                //SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userVerifyID", reqModel.USERVERIFYID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userVerifyName", reqModel.USERVERIFYNAME, "NVARCHAR");
                //SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_APPROVE_DOCUMENT_SPACERENTAL", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 3 May 2018> </Since>
        public MessageModel approveDocumentVehicleRental(DocumentModel model)
        {
            try
            {
                RequestModel reqModel = model.REQUEST;
                DocumentLicenseModel licenseModel = model.DOCUMENT_LICENSE;

                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqModel.REQID, "NVARCHAR");
                //SQLconnect.PROCArgumentsCollection(arLstParameter, "@storecode", reqModel.STORECODE, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@doctypeID", reqModel.DOCTYPEID.ToString(), "NVARCHAR");
                //SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqStatus", reqModel.REQUESTSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userVerifyID", reqModel.USERVERIFYID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userVerifyName", reqModel.USERVERIFYNAME, "NVARCHAR");
                //SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", reqModel.REMARKS, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_APPROVE_DOCUMENT_VEHICLERENTAL", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 23 March 2018> </Since>
        public MessageModel getNextRevisionDocument(RequestModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docrunno", model.DOCRUNNO, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_SYSTEM_DOCUMENT_REVISION_SHOW", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region Insert new revision document methods

        /// <Since 23 March 2018> </Since>
        public MessageModel insertNewRivisionDocumentLandLeaseAgreement(RequestModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docrunno", model.DOCRUNNO, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", model.REMARKS, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userid", model.USERREQUESTID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@revisiontype", model.REVISIONTYPE.ToString(), "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_INSERT_NEW_REVISION_DOCUMENT_LAND_LEASE_AGREEMENT", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 2 April 2018> </Since>
        public MessageModel insertNewRivisionDocumentLicense(RequestModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docrunno", model.DOCRUNNO, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", model.REMARKS, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userid", model.USERREQUESTID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@revisiontype", model.REVISIONTYPE.ToString(), "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_INSERT_NEW_REVISION_DOCUMENT_LICENSE", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 5 May 2018> </Since>
        public MessageModel insertNewRivisionDocumentVehicleRental(RequestModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docrunno", model.DOCRUNNO, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", model.REMARKS, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userid", model.USERREQUESTID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@revisiontype", model.REVISIONTYPE.ToString(), "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_INSERT_NEW_REVISION_DOCUMENT_VEHICLERENTAL", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Insert new revision document space rental.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public MessageModel InsertNewRivisionDocumentSpaceRental(RequestModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@docrunno", model.DOCRUNNO, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@remark", model.REMARKS, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userid", model.USERREQUESTID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERREQUESTNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@revisiontype", model.REVISIONTYPE.ToString(), "NVARCHAR");

                return conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_INSERT_NEW_REVISION_DOCUMENT_SPACE_RENTAL", arLstParameter).First<MessageModel>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Insert new revision document methods

        #region Delete Draft Document

        public MessageModel deleteDraftDocument(RequestModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", model.REQID, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqID", model.USERREQUESTID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userReqName", model.USERREQUESTNAME, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("CJ_SP_DOCUMENT_DELETE", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}
