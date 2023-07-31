using ESN_NET.BO.Library.Store;
using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Store.MODEL;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class StoreAPIController : ApiController
    {
        #region Private variables

        private readonly Logger logger;
        private LineAPI line;

        #endregion Private variables

        /// <summary>
        /// Class constructor.
        /// </summary>
        public StoreAPIController()
        {
            logger = new Logger("StoreAPIController");
            line = new LineAPI();
        }

        /// <summary>
        /// Get store list.
        /// </summary>
        /// <returns></returns>
        [ActionName("getStoreList")]
        [HttpPost]
        public List<StoreModel> GetStoreList()
        {
            try
            {
                var boClass = new StoreBO();
                return boClass.GetStoreList();
            }
            catch (Exception ex)
            {
                var logMessage = string.Format("GetStoreList : {0}", ex.ToString());
                logger.error(logMessage);
                line.NotificationLine(logMessage);
            }

            return new List<StoreModel>();
        }

        /// <summary>
        /// Get stores by filter.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ActionName("getStoreByProperty")]
        [HttpPost]
        public List<StoreModel> GetStoreByProperty(StoreModel model)
        {
            try
            {
                var boClass = new StoreBO();
                return boClass.GetStoreByProperty(model);
            }
            catch (Exception ex)
            {
                var logMessage = string.Format("GetStoreByProperty : {0}", ex.ToString());
                logger.error(logMessage);
                line.NotificationLine(logMessage);
            }

            return new List<StoreModel>();
        }

        /// <summary>
        /// Insert a new store.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ActionName("insertStore")]
        [HttpPost]
        public MessageModel InsertStore(StoreModel model)
        {
            try
            {
                var boClass = new StoreBO();
                return boClass.InsertStore(model);
            }
            catch (Exception ex)
            {
                var logMessage = string.Format("InsertUser : {0}", ex.ToString());
                logger.error(logMessage);
                line.NotificationLine(logMessage);

                var result = new MessageModel
                {
                    MSGSTATUS = -201,
                    MSGTEXT = ex.Message
                };
                return result;
            }
        }

        /// <summary>
        /// Update the store information.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ActionName("updateStore")]
        [HttpPost]
        public MessageModel UpdateStore(StoreModel model)
        {
            try
            {
                var boClass = new StoreBO();
                return boClass.UpdateStore(model);
            }
            catch (Exception ex)
            {
                var logMessage = string.Format("UpdateStore : {0}", ex.ToString());
                logger.error(logMessage);
                line.NotificationLine(logMessage);

                var result = new MessageModel
                {
                    MSGSTATUS = -201,
                    MSGTEXT = ex.Message
                };
                return result;
            }
        }
    }
}