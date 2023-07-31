using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.UserClass.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.UserClass.DAO
{
    public class UserClassDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public UserClassDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 12 Febuary 2018> </Since>
        public List<UserClassModel> getUserClassList()
        {
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("SELECT * FROM dbo.ESN_USER_CLASS ORDER BY USERCLASS");

                List<UserClassModel> ExecutedResult = conn.GetSQLQueryStirng<UserClassModel>(sql.ToString());

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <Since 13 Febuary 2018> </Since>
        public MessageModel addUserClass(UserClassModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userClass", model.USERCLASSTEXT, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", model.LANGUAGE, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_USER_CLASS_INSERT", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 13 Febuary 2018> </Since>
        public MessageModel editUserClass(UserClassModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userClass", model.USERCLASS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userClassText", model.USERCLASSTEXT, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", model.LANGUAGE, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_USER_CLASS_EDIT", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 13 Febuary 2018> </Since>
        public MessageModel deleteUserClass(UserClassModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userClass", model.USERCLASS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", model.LANGUAGE, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_USER_CLASS_DELETE", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
