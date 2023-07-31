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
using ESN_NET.DBconnect.CJBank.MODEL;
using ESN_NET.BO.Library.CJBank;

namespace ESN_NET.API.Controllers
{
    public class CJBankAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public CJBankAPIController()
        {
            logger = new Logger("CJBankAPIController");
            line = new LineAPI();
        }

        /// <Since 02 May 2018> </Since>
        [ActionName("getCJBankList")]
        [HttpGet]
        public List<CJBankModel> getCJBankList()
        {
            List<CJBankModel> result = new List<CJBankModel>();
            CJBankBO boClass = new CJBankBO();

            try
            {
                result = boClass.getCJBankList();
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
