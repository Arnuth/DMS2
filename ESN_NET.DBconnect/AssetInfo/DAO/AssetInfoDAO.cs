using ESN_NET.DBconnect.AssetInfo.MODEL;
using ESN_NET.DBconnect.Common;
using System.Collections;
using System.Collections.Generic;

namespace ESN_NET.DBconnect.AssetInfo.DAO
{
    public class AssetInfoDAO
    {
        #region Private variables

        private SQLconnect conn;

        #endregion

        #region Class constructor

        /// <summary>
        /// Class constructor
        /// </summary>
        public AssetInfoDAO()
        {
            conn = new SQLconnect();
        }

        #endregion Class constructor

        /// <summary>
        /// Get document details.
        /// </summary>
        /// <param name="reqId"></param>
        /// <returns></returns>
        public List<AssetInfoModel> GetDocumentDetails(string reqId)
        {
            var arLstParameter = new ArrayList();

            SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqId, "NVARCHAR");

            return conn.GetResultPROC<AssetInfoModel>("CJ_SP_ASSETINFO_GET_DOCUMENT_DETAILS", arLstParameter);
        }
    }
}
