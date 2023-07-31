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
using ESN_NET.DBconnect.SpaceRentalSize.MODEL;
using ESN_NET.BO.Library.SpaceRentalSize;

namespace ESN_NET.API.Controllers
{
    public class SpaceRentalSizeAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public SpaceRentalSizeAPIController()
        {
            logger = new Logger("SpaceRentalSizeAPIController");
            line = new LineAPI();
        }

        /// <Since 08 March 2018> </Since>
        [ActionName("getSpaceRentalSizeList")]
        [HttpGet]
        public List<SpaceRentalSizeModel> getSpaceRentalSizeList(string type = null)
        {
            List<SpaceRentalSizeModel> result = new List<SpaceRentalSizeModel>();
            SpaceRentalSizeBO boClass = new SpaceRentalSizeBO();

            try
            {
                result = boClass.getSpaceRentalSizeList(type);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getSpaceRentalSizeList : {0}", ex.Message));
                line.NotificationLine(string.Format("getSpaceRentalSizeList : {0}", ex.Message));
            }

            return result;
        }
    }
}
