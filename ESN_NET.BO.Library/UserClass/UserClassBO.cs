using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.UserClass.DAO;
using ESN_NET.DBconnect.UserClass.MODEL;
using System.Collections.Generic;

namespace ESN_NET.BO.Library.UserClass
{
    public class UserClassBO
    {
        /// <Since 12 Febuary 2018> </Since>
        public List<UserClassModel> getUserClassList()
        {
            UserClassDAO daoClass = new UserClassDAO();
            return daoClass.getUserClassList();
        }

        /// <Since 13 Febuary 2018> </Since>
        public MessageModel addUserClass(UserClassModel model)
        {
            UserClassDAO daoClass = new UserClassDAO();
            return daoClass.addUserClass(model);
        }

        /// <Since 13 Febuary 2018> </Since>
        public MessageModel editUserClass(UserClassModel model)
        {
            UserClassDAO daoClass = new UserClassDAO();
            return daoClass.editUserClass(model);
        }

        /// <Since 13 Febuary 2018> </Since>
        public MessageModel deleteUserClass(UserClassModel model)
        {
            UserClassDAO daoClass = new UserClassDAO();
            return daoClass.deleteUserClass(model);
        }
    }

}
