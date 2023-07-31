using ESN_NET.DBconnect.FileAttachment.DAO;
using ESN_NET.DBconnect.FileAttachment.MODEL;
using System.Collections.Generic;


namespace ESN_NET.BO.Library.FileAttachment
{
    public class FileAttachmentBO
    {
        /// <Since 19 March 2018> </Since>
        public List<FileAttachmentModel> getFileAttachmentByRequest(FileAttachmentModel model)
        {
            FileAttachmentDAO daoClass = new FileAttachmentDAO();
            return daoClass.getFileAttachmentByRequest(model);
        }
    }
}
