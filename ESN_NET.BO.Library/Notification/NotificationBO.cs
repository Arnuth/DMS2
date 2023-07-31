using ESN_NET.BO.Library.Document;
using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Document.MODEL;
using ESN_NET.DBconnect.Notification.DAO;
using ESN_NET.DBconnect.Notification.MODEL;
using ESN_NET.DBconnect.Status.DAO;
using ESN_NET.DBconnect.UserClass.DAO;
using ESN_NET.DBconnect.UserClass.MODEL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace ESN_NET.BO.Library.Notification
{
    public class NotificationBO
    {
        #region Constants

        private const string DATATYPE_NOTIFICATION = "ESN_TYPE_NOTIFICATION";

        #endregion Constants

        #region Class members

        UserClassDAO userclassdao;
        StatusDAO statusdao;
        LineAPI line;
        EmailSmtp email;
        DocumentBO documentBo;

        #endregion Class members

        #region Constructor

        /// <summary>
        /// Class constructor.
        /// </summary>
        public NotificationBO()
        {
            userclassdao = new UserClassDAO();
            statusdao = new StatusDAO();
            line = new LineAPI();
            email = new EmailSmtp();
            documentBo = new DocumentBO();
        }

        #endregion Constructor

        #region Methods

        /// <summary>
        /// Alert.
        /// </summary>
        /// <param name="model"></param>
        /// <param name="status"></param>
        public void Alert(DocumentModel model, int status)
        {
            var userclassList = userclassdao.getUserClassList();

            var statusList = statusdao.getStatusById(status);
            string[] alertList = statusList.ALERT_TO.Split(',');
            string msg = "", subject = "";

            UserClassModel userClassModel;
            foreach (var item in alertList)
            {
                userClassModel = userclassList.Where(obj => obj.USERCLASS == int.Parse(item)).First<UserClassModel>();

                string token = userClassModel.LINE_TOKEN;
                string emailto = userClassModel.EMAIL_ALERT;
                string userclass = userClassModel.USERCLASSTEXT;

                switch (status)
                {
                    case 2:
                        subject = "คำร้องขอสร้างเอกสาร";
                        if (model.REQUEST.DOCTYPEID == 3)
                        {
                            msg = string.Format("คำร้องขอสร้างเอกสาร \n เรียน : {0} \n หมายเลขเอกสาร : {1} \n สาขา : {2} \n ประเภทเอกสาร : {3} \n ชนิด : {4}", userclass, model.REQUEST.REQID, String.IsNullOrEmpty(model.REQUEST.STORECODE) ? " - " : model.REQUEST.STORECODE + " - " + model.REQUEST.STORENAME, model.REQUEST.DOCTYPENAME, model.DOCUMENT_SPACERENTAL.SPACERENTALTYPENAME);
                        }
                        else if (model.REQUEST.DOCTYPEID == 4)
                        {
                            msg = string.Format("คำร้องขอสร้างเอกสาร \n เรียน : {0} \n หมายเลขเอกสาร : {1} \n ประเภทเอกสาร : {2} \n ผู้ให้เช่า : {3} \n ชนิด : {4}", userclass, model.REQUEST.REQID, model.REQUEST.DOCTYPENAME, model.DOCUMENT_VEHICLERENTAL.LESSORNAME_TH, model.DOCUMENT_VEHICLERENTAL.VEHICLERENTALTYPE);
                        }
                        else
                        {
                            msg = string.Format("คำร้องขอสร้างเอกสาร \n เรียน : {0} \n หมายเลขเอกสาร : {1} \n สาขา : {2} \n ประเภทเอกสาร : {3} \n ชนิด : {4}", userclass, model.REQUEST.REQID, model.REQUEST.STORECODE + " - " + model.REQUEST.STORENAME, model.REQUEST.DOCTYPENAME, model.REQUEST.DOCTYPEID == 1 ? model.DOCUMENT_LANDLEASEAGREEMENT.AGREEMENTTYPENAME : model.DOCUMENT_LICENSE.LICENSETYPENAME);
                        }
                        break;

                    case 3:
                        subject = "อนุมัติเอกสาร";
                        if (model.REQUEST.DOCTYPEID == 3)
                        {
                            msg = string.Format("อนุมัติเอกสาร \n เรียน : {0} \n หมายเลขเอกสาร : {1} \n สาขา : {2} \n ประเภทเอกสาร : {3} \n ชนิด : {4}", userclass, model.REQUEST.REQID, String.IsNullOrEmpty(model.REQUEST.STORECODE) ? " - " : model.REQUEST.STORECODE + " - " + model.REQUEST.STORENAME, model.REQUEST.DOCTYPENAME, model.DOCUMENT_SPACERENTAL.SPACERENTALTYPENAME);
                        }
                        else if (model.REQUEST.DOCTYPEID == 4)
                        {
                            msg = string.Format("อนุมัติเอกสาร \n เรียน : {0} \n หมายเลขเอกสาร : {1} \n ประเภทเอกสาร : {2} \n ผู้ให้เช่า : {3} \n ชนิด : {4}", userclass, model.REQUEST.REQID, model.REQUEST.DOCTYPENAME, model.DOCUMENT_VEHICLERENTAL.LESSORNAME_TH, model.DOCUMENT_VEHICLERENTAL.VEHICLERENTALTYPE);
                        }
                        else
                        {
                            msg = string.Format("อนุมัติเอกสาร \n เรียน : {0} \n หมายเลขเอกสาร : {1} \n สาขา : {2} \n ประเภทเอกสาร : {3} \n ชนิด : {4}", userclass, model.REQUEST.REQID, model.REQUEST.STORECODE + " - " + model.REQUEST.STORENAME, model.REQUEST.DOCTYPENAME, model.REQUEST.DOCTYPEID == 1 ? model.DOCUMENT_LANDLEASEAGREEMENT.AGREEMENTTYPENAME : model.DOCUMENT_LICENSE.LICENSETYPENAME);
                        }
                        break;

                    case 4:
                        subject = "คืนคำร้อง";
                        if (model.REQUEST.DOCTYPEID == 3)
                        {
                            msg = string.Format("คืนคำร้อง \n เรียน : {0} \n หมายเลขเอกสาร : {1} \n สาขา : {2} \n ประเภทเอกสาร : {3} \n ชนิด : {4}", userclass, model.REQUEST.REQID, String.IsNullOrEmpty(model.REQUEST.STORECODE) ? " - " : model.REQUEST.STORECODE + " - " + model.REQUEST.STORENAME, model.REQUEST.DOCTYPENAME, model.DOCUMENT_SPACERENTAL.SPACERENTALTYPENAME);
                        }
                        else if (model.REQUEST.DOCTYPEID == 4)
                        {
                            msg = string.Format("คืนคำร้อง \n เรียน : {0} \n หมายเลขเอกสาร : {1} \n ประเภทเอกสาร : {2} \n ผู้ให้เช่า : {3} \n ชนิด : {4}", userclass, model.REQUEST.REQID, model.REQUEST.DOCTYPENAME, model.DOCUMENT_VEHICLERENTAL.LESSORNAME_TH, model.DOCUMENT_VEHICLERENTAL.VEHICLERENTALTYPE);
                        }
                        else
                        {
                            msg = string.Format("คืนคำร้อง \n เรียน : {0} \n สาขา : {1} \n ประเภทเอกสาร : {2} \n ชนิด : {3}", userclass, model.REQUEST.STORECODE + " - " + model.REQUEST.STORENAME, model.REQUEST.DOCTYPENAME, model.REQUEST.DOCTYPEID == 1 ? model.DOCUMENT_LANDLEASEAGREEMENT.AGREEMENTTYPENAME : model.DOCUMENT_LICENSE.LICENSETYPENAME);
                        }
                        break;

                    default:
                        msg = string.Format("เรียน : {0} \n หมายเลขเอกสาร : {1} \n สาขา : {2} \n ประเภทเอกสาร : {3} \n ชนิด : {4}", userclass, model.REQUEST.REQID, model.REQUEST.STORECODE + " - " + model.REQUEST.STORENAME, model.REQUEST.DOCTYPENAME, model.REQUEST.DOCTYPEID == 1 ? model.DOCUMENT_LANDLEASEAGREEMENT.AGREEMENTTYPENAME : model.DOCUMENT_LICENSE.LICENSETYPENAME);
                        break;
                }

                line.CJNotificationLine(token, msg);
                email.sendEmail(subject, msg, emailto);
            }
        }

        /// <summary>
        /// Delete notifications by IDs.
        /// </summary>
        /// <param name="notificationIdArray"></param>
        /// <returns></returns>
        public MessageModel DeleteNotificationList(NotificationRequestModel model)
        {
            var dataTable = SetNotificationDataTable(model.NOTIFICATIONIDLIST);

            var daoClass = new NotificationDAO();
            return daoClass.DeleteNotifications(model, dataTable);
        }

        #endregion Methods

        #region Helper methods

        /// <summary>
        /// Set notification data table.
        /// </summary>
        /// <param name="notificationIdList"></param>
        /// <returns></returns>
        private DataTable SetNotificationDataTable(List<string> notificationIdList)
        {
            var dataTable = new DataTable(DATATYPE_NOTIFICATION);

            #region Prepare column header

            var cols = dataTable.Columns;
            cols.Add("NOTIFICATIONID", typeof(int));
            cols.Add("REQID", typeof(string));
            cols.Add("NOTICE_TYPE", typeof(string));
            cols.Add("NOTICE_USERCLASS", typeof(int));
            cols.Add("NOTICEDATE", typeof(DateTime));
            cols.Add("PAYMENTDATE", typeof(DateTime));
            cols.Add("CONDITIONEXPIREDATE", typeof(DateTime));
            cols.Add("LINETEMPLATETYPE", typeof(int));
            cols.Add("EMAILTEMPLATETYPE", typeof(int));
            cols.Add("CREATEDATE", typeof(DateTime));
            cols.Add("CREATEDBY", typeof(string));

            #endregion Prepare column header

            #region Add rows

            var rows = dataTable.Rows;
            notificationIdList.ForEach(id => rows.Add(id));

            #endregion Add rows

            return dataTable;
        }

        #endregion Helper methods
    }
}
