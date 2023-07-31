using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Menu.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.Menu.DAO
{
    public class MenuDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public MenuDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 12 Febuary 2018> </Since>
        public List<dynamic> getMenuList()
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                IEnumerable<dynamic> ExecutedResult = conn.GetResultPROCDYNAMICRESULT("ESN_SP_MENU_GETLIST", arLstParameter);
                return ExecutedResult.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 9 Febuary 2018> </Since>
        public List<MenuModel> getMenuListByUser(string userclass)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userclass", userclass, "NVARCHAR");

                List<MenuModel> ExecutedResult = conn.GetResultPROC<MenuModel>("ESN_SP_MENU_GETLIST_BY_USERCLASS", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 12 Febuary 2018> </Since>
        public MessageModel addMenuUserClass(string userClass, string menu, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userClass", userClass, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@menu", menu, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_MENU_ADD_USERCLASS", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 12 Febuary 2018> </Since>
        public MessageModel removeMenuUserClass(string userClass, string menu, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userClass", userClass, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@menu", menu, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_MENU_REMOVE_USERCLASS", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
