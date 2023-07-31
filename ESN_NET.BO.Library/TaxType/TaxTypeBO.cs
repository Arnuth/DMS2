using ESN_NET.DBconnect.TaxType.DAO;
using ESN_NET.DBconnect.TaxType.MODEL;
using System.Collections.Generic;

namespace ESN_NET.BO.Library.TaxType
{
    public class TaxTypeBO
    {
        /// <Since 08 March 2018> </Since>
        public List<TaxTypeModel> getTaxTypeList()
        {
            TaxTypeDAO daoClass = new TaxTypeDAO();
            return daoClass.getTaxTypeList();
        }
    }
}
