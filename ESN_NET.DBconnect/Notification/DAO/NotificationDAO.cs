using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Notification.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace ESN_NET.DBconnect.Notification.DAO
{
    public class NotificationDAO : IDisposable
    {
        #region Constants

        private const string PROCNAME_NOTIFICATION_DELETE_LIST = "CJ_SP_NOTIFICATION_DELETE_LIST";
        private const string DB_DATE_FORMAT = "yyyy-MM-dd";

        #endregion Constants

        #region Private variables

        private SQLconnect conn;
        private string formatDate;

        #endregion Private variables

        #region Constructor

        /// <summary>
        /// Class constructor.
        /// </summary>
        public NotificationDAO()
        {
            conn = new SQLconnect();
            formatDate = GetConfig.getAppSetting(Constants.FORMATDATEDB);
        }

        #endregion Constructor

        #region Methods

        /// <summary>
        /// Delete notifications.
        /// </summary>
        /// <param name="dataTable"></param>
        /// <returns></returns>
        public MessageModel DeleteNotifications(NotificationRequestModel model, DataTable dataTable)
        {
            var dtParams = new List<DataTableParameter>();
            SQLconnect.PROCDataTablesCollection(dtParams, "@notifications", dataTable);

            var arLstParameter = new ArrayList();
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@deleteUser", model.DELETEUSER, "NVARCHAR");

            if (model.PAYOUTDATE.HasValue)
            {
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@payoutDate", model.PAYOUTDATE.Value.ToString(DB_DATE_FORMAT), "DATETIME");
            }

            var result = conn.GetResultPROCWithDataTable<MessageModel>(PROCNAME_NOTIFICATION_DELETE_LIST, dtParams, arLstParameter);
            return result.DefaultIfEmpty(new MessageModel
            {
                MSGSTATUS = 0,
                MSGTEXT = "Success"
            }).First();
        }

        #endregion Methods

        #region IDisposable Support

        private bool disposedValue = false; // To detect redundant calls

        /// <summary>
        /// Dispose.
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    conn.Dispose();
                }

                disposedValue = true;
            }
        }

        /// <summary>
        /// This code added to correctly implement the disposable pattern.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
        }

        #endregion
    }
}
