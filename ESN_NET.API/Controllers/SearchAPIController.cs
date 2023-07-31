using ESN_NET.BO.Library.Search;
using ESN_NET.COMMON;
using ESN_NET.DBconnect.Request.MODEL;
using ESN_NET.DBconnect.Search.MODEL;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class SearchAPIController : ApiController
    {
        #region Private variables

        private readonly Logger logger;
        private LineAPI line;

        #endregion Private variables

        #region Constructor

        /// <summary>
        /// Class constructor.
        /// </summary>
        public SearchAPIController()
        {
            logger = new Logger("SearchAPIController");
            line = new LineAPI();
        }

        #endregion Constructor

        #region Methods

        /// <summary>
        /// Get request by filter.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ActionName("getRequestByProperty")]
        [HttpPost]
        public List<SearchRequestStatusResultModel> GetRequestByProperty(SearchRequestStatusModel model)
        {
            try
            {
                var boClass = new SearchBO();
                return boClass.GetRequestByProperty(model);
            }
            catch (Exception ex)
            {
                var logMessage = string.Format("GetRequestByProperty : {0}", ex.ToString());
                logger.error(logMessage);
                line.NotificationLine(logMessage);
            }

            return new List<SearchRequestStatusResultModel>();
        }


        /// <summary>
        /// Get request status list.
        /// </summary>
        /// <returns></returns>
        [ActionName("getRequestStatusList")]
        [HttpPost]
        public List<RequestStatusModel> GetRequestStatusList()
        {
            try
            {
                var boClass = new SearchBO();
                return boClass.GetRequestStatusList();
            }
            catch (Exception ex)
            {
                var logMessage = string.Format("GetRequestStatusList : {0}", ex.ToString());
                logger.error(logMessage);
                line.NotificationLine(logMessage);
            }

            return new List<RequestStatusModel>();
        }

        #endregion Methods
    }
}