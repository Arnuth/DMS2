using ESN_NET.DBconnect.SpaceRentalSize.DAO;
using ESN_NET.DBconnect.SpaceRentalSize.MODEL;
using System.Collections.Generic;

namespace ESN_NET.BO.Library.SpaceRentalSize
{
    public class SpaceRentalSizeBO
    {
        /// <Since 08 March 2018> </Since>
        public List<SpaceRentalSizeModel> getSpaceRentalSizeList(string type)
        {
            SpaceRentalSizeDAO daoClass = new SpaceRentalSizeDAO();
            return daoClass.getSpaceRentalSizeList(type);
        }
    }
}
