using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.TaxType.MODEL;
using ESN_NET.BO.Library.TaxType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace ESN_NET.API.Controllers
{
    public class TaxTypeAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public TaxTypeAPIController()
        {
            logger = new Logger("TaxTypeAPIController");
            line = new LineAPI();
        }

        /// <Since 08 March 2018> </Since>
        [ActionName("getTaxTypeList")]
        [HttpGet]
        public List<TaxTypeModel> getTaxTypeList()
        {
            List<TaxTypeModel> result = new List<TaxTypeModel>();
            TaxTypeBO boClass = new TaxTypeBO();

            try
            {
                result = boClass.getTaxTypeList();
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getTaxTypeList : {0}", ex.Message));
                line.NotificationLine(string.Format("getTaxTypeList : {0}", ex.Message));
            }

            return result;
        }
    }
}
