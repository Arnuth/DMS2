using ESN_NET.BO.Library.FileTranfer;
using ESN_NET.COMMON;
using ESN_NET.DBconnect.FileAttachment.MODEL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class FileTranferAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        #region Constructor

        /// <summary>
        /// Class constructor.
        /// </summary>
        public FileTranferAPIController()
        {
            logger = new Logger("FileTranferAPIController");
            line = new LineAPI();
        }

        #endregion Constructor

        #region Upload

        /// <Since 14 March 2018> </Since>
        [ActionName("uploadDocumentToServer")]
        [HttpPost]
        public HttpResponseMessage uploadDocumentToServer(string store, string doctype, string reqno, string filetype)
        {
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;

            try
            {
                if (httpRequest.Files.Count > 0)
                {
                    //logger.info(string.Format("uploadDocumentToServer : {0}", "In Method."));

                    //Cerate Folder
                    FileTranferBO boClass = new FileTranferBO();
                    var bopath = boClass.createFolder(GetConfig.getAppSetting(Constants.FILE_PATH), store, doctype, reqno);

                    //logger.info(string.Format("uploadDocumentToServer : {0}", "Create Folder Complete."));

                    var docfiles = new List<FileAttachmentModel>();
                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];
                        var filePath = bopath + postedFile.FileName;

                        postedFile.SaveAs(filePath);

                        FileAttachmentModel fileAttachment = new FileAttachmentModel
                        {
                            REQID = reqno,
                            PATH = postedFile.FileName,
                            SIZE = postedFile.ContentLength,
                            DOCFILETYPE = filetype
                        };

                        docfiles.Add(fileAttachment);
                    }

                    //logger.info(string.Format("uploadDocumentToServer : {0}", "Add File Complete."));

                    boClass.insertPathFile(docfiles);
                    result = Request.CreateResponse(HttpStatusCode.Created, docfiles);

                    //logger.info(string.Format("uploadDocumentToServer : {0}", "Insert To DB Complete."));

                }
                else
                {
                    result = Request.CreateResponse(HttpStatusCode.BadRequest);
                    //logger.error(string.Format("uploadDocumentToServer : {0}", HttpStatusCode.BadRequest));
                    line.NotificationLine("uploadDocumentToServer : " + HttpStatusCode.BadRequest);
                }
            }
            catch (Exception ex)
            {
                line.NotificationLine("uploadDocumentToServer : " + ex.Message);
                logger.error(string.Format("uploadDocumentToServer : {0}", ex.Message));
                
            }

            return result;
        }

        /// <Since 28 Febuary 2018> </Since>
        [ActionName("fileTranferWithCheckByte")]
        [HttpPost]
        public async Task<HttpResponseMessage> fileTranferWithCheckByte()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                StringBuilder sb = new StringBuilder(); // Holds the response body

                // Read the form data and return an async task.
                await Request.Content.ReadAsMultipartAsync(provider);

                // This illustrates how to get the form data.
                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        sb.Append(string.Format("{0}: {1}\n", key, val));
                    }
                }

                // This illustrates how to get the file names for uploaded files.
                foreach (var file in provider.FileData)
                {
                    FileInfo fileInfo = new FileInfo(file.LocalFileName);
                    sb.Append(string.Format("Uploaded file: {0} ({1} bytes)\n", file.Headers.ContentDisposition.FileName, fileInfo.Length));
                }
                return new HttpResponseMessage()
                {
                    Content = new StringContent(sb.ToString())
                };
            }
            catch (System.Exception ex)
            {
                line.NotificationLine("fileTranferWithCheckByte : " + ex.Message);
                logger.error(string.Format("fileTranferWithCheckByte : {0}", ex.Message));
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        #endregion

        #region Download
        /// <Since 17 Janyuary 2018>
        /// WebApi Request File Form Server.
        /// Return Array Buffer Response.
        /// Change Method GET to POST for support " & " in file name.
        /// Clone API From Yusen.
        /// </Since>
        [ActionName("downloadDocumentFromServer")]
        [HttpPost]
        public HttpResponseMessage downloadDocumentFromServer(FileAttachmentModel model)
        {
            try
            {
                string path = GetConfig.getAppSetting(Constants.FILE_PATH) + "\\" + model.STORECODE + "\\" + model.DOCTYPE + "\\" + model.REQID + "\\" + model.PATH;

                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StreamContent(new FileStream(path, FileMode.Open, FileAccess.Read))
                };

                response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = model.PATH
                };

                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                response.Content.Headers.Add("x-filename", model.PATH); //We will use this below

                return response;
            }
            catch (Exception ex)
            {
                logger.error(string.Format("downloadDocumentFromServer : {0}", ex.Message));
                line.NotificationLine("downloadDocumentFromServer : " + ex.Message);
                return new HttpResponseMessage();
            }
        }
        #endregion
    }
}
