using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Store.DAO;
using ESN_NET.DBconnect.Store.MODEL;
using System.Collections.Generic;

namespace ESN_NET.BO.Library.Store
{
    public class StoreBO
    {
        /// <summary>
        /// Get store list.
        /// </summary>
        /// <returns></returns>
        public List<StoreModel> GetStoreList()
        {
            using (var daoClass = new StoreDAO())
            {
                return daoClass.GetStoreList();
            }
        }

        /// <summary>
        /// Get stores by filter.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public List<StoreModel> GetStoreByProperty(StoreModel model)
        {
            using (var daoClass = new StoreDAO())
            {
                return daoClass.GetStoreByProperty(model);
            }
        }

        /// <summary>
        /// Insert a new store.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public MessageModel InsertStore(StoreModel model)
        {
            using (var daoClass = new StoreDAO())
            {
                return daoClass.InsertStore(model);
            }
        }

        /// <summary>
        /// Update the specified store.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public MessageModel UpdateStore(StoreModel model)
        {
            using (var daoClass = new StoreDAO())
            {
                return daoClass.UpdateStore(model);
            }
        }
    }
}
