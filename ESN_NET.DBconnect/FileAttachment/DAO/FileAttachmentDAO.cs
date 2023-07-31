using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.FileAttachment.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.FileAttachment.DAO
{
    public class FileAttachmentDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public FileAttachmentDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 19 March 2018> </Since>
        public List<FileAttachmentModel> getFileAttachmentByRequest(FileAttachmentModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                if(!string.IsNullOrEmpty(model.REQID))
                    SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", model.REQID, "NVARCHAR");

                List<FileAttachmentModel> ExecutedResult = conn.GetResultPROC<FileAttachmentModel>("ESN_SP_FILEATTACHMENT_GETLIST", arLstParameter);
                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 27 Febuary 2018> </Since>
        public MessageModel insertPathFile(DataTable dataTable)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                List<DataTableParameter> dtParams = new List<DataTableParameter>();


                SQLconnect.PROCDataTablesCollection(dtParams, "@fileInfo", dataTable);

                MessageModel ExecutedResult = conn.GetResultPROCWithDataTable<MessageModel>("ESN_SP_FILETRANFER_INSERT_PATH", dtParams, arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
