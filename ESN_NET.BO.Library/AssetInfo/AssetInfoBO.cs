using ESN_NET.DBconnect.AssetInfo.DAO;
using ESN_NET.DBconnect.AssetInfo.MODEL;
using System;
using System.Collections.Generic;
using System.Data;

namespace ESN_NET.BO.Library.AssetInfo
{
    public class AssetInfoBO
    {
        /// <summary>
        /// Get document details.
        /// </summary>
        /// <param name="reqId"></param>
        /// <returns></returns>
        public List<AssetInfoModel> GetDocumentDetails(string reqId)
        {
            var daoClass = new AssetInfoDAO();
            return daoClass.GetDocumentDetails(reqId);
        }

        /// <summary>
        /// Set assetInfo DataTable.
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public DataTable SetAssetInfoDataTable(List<AssetInfoModel> list)
        {
            var assetInfoDataTable = new DataTable("CJ_ASSET_INFO");

            #region Define columns

            var columns = assetInfoDataTable.Columns;
            columns.Add("ASSETINFOID", typeof(int));
            columns.Add("REQID", typeof(string));
            columns.Add("MODEL", typeof(string));
            columns.Add("ENGINE_SIZE", typeof(string));
            columns.Add("VEHICLE_COLOR_ID", typeof(int));
            columns.Add("VEHICLE_SEATTYPE_ID", typeof(int));
            columns.Add("ENGINE_NUMBER", typeof(string));
            columns.Add("VEHICLEBODY_NUMBER", typeof(string));
            columns.Add("VEHICLE_LICENSE", typeof(string));
            columns.Add("VEHICLEPLATETYPEID", typeof(int));
            columns.Add("PROVINCEID", typeof(int));
            columns.Add("RENTALNUMBER", typeof(int));
            columns.Add("RENTALUNIT", typeof(string));
            columns.Add("RENTAL_EFFECTIVEDATE", typeof(DateTime));
            columns.Add("RENTAL_EXPIREDATE", typeof(DateTime));
            columns.Add("RENTAMOUNT", typeof(Decimal));
            columns.Add("RENTTAXFLAG", typeof(int));
            columns.Add("INSURANCECHARGEAMOUNT", typeof(Decimal));
            columns.Add("INSURANCEBROKER", typeof(string));
            columns.Add("INSURANCENUMBER", typeof(string));
            columns.Add("INSURANCE_EFFECTIVEDATE", typeof(DateTime));
            columns.Add("INSURANCE_EXPIREDATE", typeof(DateTime));
            columns.Add("CARACT_EFFECTIVEDATE", typeof(DateTime));
            columns.Add("CARACT_EXPIREDATE", typeof(DateTime));
            columns.Add("VEHICLETAX_EFFECTIVEDATE", typeof(DateTime));
            columns.Add("VEHICLETAX_EXPIREDATE", typeof(DateTime));
            columns.Add("FLEETCARDNUMBER", typeof(string));
            columns.Add("FLEETCARDBUDGET", typeof(Decimal));
            columns.Add("DRIVERID", typeof(int));
            columns.Add("REMARKS", typeof(string));
            columns.Add("RENTAL_CANCELDATE", typeof(DateTime));

            #endregion Define columns

            #region Add rows

            var rows = assetInfoDataTable.Rows;
            foreach (var assetInfo in list)
            {
                rows.Add(
                    assetInfo.ASSETINFOID,
                    assetInfo.REQID,
                    assetInfo.MODEL,
                    assetInfo.ENGINE_SIZE,
                    assetInfo.VEHICLE_COLOR_ID,
                    assetInfo.VEHICLE_SEATTYPE_ID,
                    assetInfo.ENGINE_NUMBER,
                    assetInfo.VEHICLEBODY_NUMBER,
                    assetInfo.VEHICLE_LICENSE,
                    assetInfo.VEHICLEPLATETYPEID,
                    assetInfo.PROVINCEID,
                    assetInfo.RENTALNUMBER,
                    assetInfo.RENTALUNIT,
                    assetInfo.RENTAL_EFFECTIVEDATE,
                    assetInfo.RENTAL_EXPIREDATE,
                    assetInfo.RENTAMOUNT,
                    assetInfo.RENTTAXFLAG,
                    assetInfo.INSURANCECHARGEAMOUNT,
                    assetInfo.INSURANCEBROKER,
                    assetInfo.INSURANCENUMBER,
                    assetInfo.INSURANCE_EFFECTIVEDATE,
                    assetInfo.INSURANCE_EXPIREDATE,
                    assetInfo.CARACT_EFFECTIVEDATE,
                    assetInfo.CARACT_EXPIREDATE,
                    assetInfo.VEHICLETAX_EFFECTIVEDATE,
                    assetInfo.VEHICLETAX_EXPIREDATE,
                    assetInfo.FLEETCARDNUMBER,
                    assetInfo.FLEETCARDBUDGET,
                    assetInfo.DRIVERID,
                    assetInfo.REMARKS,
                    assetInfo.RENTAL_CANCELDATE
                    );
            }

            #endregion Add rows

            return assetInfoDataTable;
        }
    }
}
