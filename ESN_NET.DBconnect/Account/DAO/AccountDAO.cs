using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.User.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.Account.DAO
{
    public class AccountDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public AccountDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 8 Febuary 2018> </Since>
        public MessageModel loginUser(UserModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@password",  Encode.hashPassword("MD5I", model.USERPASS), "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_ACCOUNT_LOGIN", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 8 Febuary 2018> </Since>
        public MessageModel requestPassword(UserModel model)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@email", model.USEREMAIL, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@password", model.USERPASS, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_ACCOUNT_REQUEST_NEW_PASSWORD", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 12 Febuary 2018> </Since>
        public MessageModel checkEmail(string email)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@email", email, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_ACCOUNT_CHECK_EMAIL", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
