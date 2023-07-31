using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.FileAttachment.MODEL;
using ESN_NET.BO.Library.FileAttachment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class FileAttachmentAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public FileAttachmentAPIController()
        {
            logger = new Logger("FileAttachmentAPIController");
            line = new LineAPI();
        }

        /// <Since 19 March 2018> </Since>
        [ActionName("getFileAttachmentByRequest")]
        [HttpPost]
        public List<FileAttachmentModel> getFileAttachmentByRequest(FileAttachmentModel model)
        {
            List<FileAttachmentModel> result = new List<FileAttachmentModel>();
            FileAttachmentBO boClass = new FileAttachmentBO();

            try
            {
                result = boClass.getFileAttachmentByRequest(model);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getFileAttachmentByRequest : {0}", ex.Message));
                line.NotificationLine(string.Format("getFileAttachmentByRequest : {0}", ex.Message));
            }

            return result;
        }
    }
}
