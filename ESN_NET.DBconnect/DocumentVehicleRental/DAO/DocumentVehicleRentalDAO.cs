using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.DocumentVehicleRental.MODEL;
using System.Collections;
using System.Linq;

namespace ESN_NET.DBconnect.DocumentVehicleRental.DAO
{
    public class DocumentVehicleRentalDAO
    {
        #region Private variables

        private SQLconnect conn;

        #endregion Private variables

        #region Constructor

        /// <summary>
        /// Class constructor
        /// </summary>
        public DocumentVehicleRentalDAO()
        {
            conn = new SQLconnect();
        }

        #endregion Constructor

        /// <summary>
        /// Get document detail
        /// </summary>
        /// <param name="reqId"></param>
        /// <returns></returns>
        public DocumentVehicleRentalModel GetDocumentDetail(string reqId)
        {
            var arLstParameter = new ArrayList();

            SQLconnect.PROCArgumentsCollection(arLstParameter, "@reqid", reqId, "NVARCHAR");

            return conn.GetResultPROC<DocumentVehicleRentalModel>("CJ_SP_DOCUMENTVEHICLERENTAL_GET_DOCUMENT_DETAILS", arLstParameter).First<DocumentVehicleRentalModel>();
        }
    }
}
