using ESN_NET.DBconnect.LandLeaseRate.DAO;
using ESN_NET.DBconnect.LandLeaseRate.MODEL;
using System;
using System.Collections.Generic;
using System.Data;

namespace ESN_NET.BO.Library.LandLeaseRate
{
    public class LandLeaseRateBO
    {
        /// <Since 14 March 2018> </Since>/
        public List<LandLeaseRateModel> getDocumentDetail(string reqID)
        {
            LandLeaseRateDAO daoClass = new LandLeaseRateDAO();
            return daoClass.getDocumentDetail(reqID);
        }

        /// <Since 16 March 2018> </Since>/
        public DataTable setLandLeaseRateDataTable(List<LandLeaseRateModel> model)
        {
            DataTable landLeaseRateDataTable = new DataTable("CJ_LAND_LEASE_RATE");
            landLeaseRateDataTable.Columns.Add("LANDLEASERATEID", typeof(int));
            landLeaseRateDataTable.Columns.Add("REQID", typeof(string));
            landLeaseRateDataTable.Columns.Add("RECEIVEPERSONID", typeof(int));
            landLeaseRateDataTable.Columns.Add("RECEIVEPERSONNAME", typeof(string));
            landLeaseRateDataTable.Columns.Add("STARTYEAR", typeof(int));
            landLeaseRateDataTable.Columns.Add("ENDYEAR", typeof(int));
            landLeaseRateDataTable.Columns.Add("STARTDATE", typeof(DateTime));
            landLeaseRateDataTable.Columns.Add("ENDDATE", typeof(DateTime));
            landLeaseRateDataTable.Columns.Add("LANDLEASEAMOUNT", typeof(Decimal));
            landLeaseRateDataTable.Columns.Add("SERVICEAMOUNT", typeof(Decimal));
            landLeaseRateDataTable.Columns.Add("SERVICETAXFLAG", typeof(int));
            landLeaseRateDataTable.Columns.Add("VATCALFLAG", typeof(int));

            foreach (LandLeaseRateModel landLeaseRateDatails in model)
            {
                landLeaseRateDataTable.Rows.Add(landLeaseRateDatails.LANDLEASERATEID, landLeaseRateDatails.REQID, landLeaseRateDatails.RECEIVEPERSONID,
                                                landLeaseRateDatails.RECEIVEPERSONNAME, landLeaseRateDatails.STARTYEAR, landLeaseRateDatails.ENDYEAR,
                                                landLeaseRateDatails.STARTDATE, landLeaseRateDatails.ENDDATE, landLeaseRateDatails.LANDLEASEAMOUNT,
                                                landLeaseRateDatails.SERVICEAMOUNT, landLeaseRateDatails.SERVICETAXFLAG, landLeaseRateDatails.VATCALFLAG);
            }

            return landLeaseRateDataTable;
        }
    }
}
