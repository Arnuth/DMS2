using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Menu.MODEL;
using ESN_NET.DBconnect.Menu.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.BO.Library.Menu
{
    public class MenuBO
    {
        /// <Since 12 Febuary 2018> </Since>
        public List<dynamic> getMenuList()
        {
            MenuDAO daoClass = new MenuDAO();
            return daoClass.getMenuList();
        }

        /// <Since 9 Febuary 2018> </Since>
        public List<MenuModel> getMenuListByUser(string userclass)
        {
            MenuDAO daoClass = new MenuDAO();
            return daoClass.getMenuListByUser(userclass);
        }

        /// <Since 12 Febuary 2018> </Since>
        public MessageModel setMenuConfig(string userClass, string menu, bool status, string language)
        {
            MenuDAO daoClass = new MenuDAO();
            if (status)
            {
                return daoClass.addMenuUserClass(userClass, menu, language);
            }
            else
            {
                return daoClass.removeMenuUserClass(userClass, menu, language);
            }
        }
    }
}
