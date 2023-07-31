using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.SpaceRentalSize.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.SpaceRentalSize.DAO
{
    public class SpaceRentalSizeDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public SpaceRentalSizeDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 08 March 2018> </Since>
        public List<SpaceRentalSizeModel> getSpaceRentalSizeList(string type)
        {
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("SELECT SPACERENTALSIZEID, SPACERENTALTYPEID, PROPERTYDESC_EN, PROPERTYDESC_TH, SERVICEAMOUNT, OTHERAMOUNT FROM ZTBLSPACERENTALSIZE");

                if(!String.IsNullOrEmpty(type))
                {
                    sql.Append(" WHERE SPACERENTALTYPEID = " + type.Split('-')[0].Trim());
                }
                sql.Append(" ORDER BY SPACERENTALSIZEID");
                List<SpaceRentalSizeModel> ExecutedResult = conn.GetSQLQueryStirng<SpaceRentalSizeModel>(sql.ToString());

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
