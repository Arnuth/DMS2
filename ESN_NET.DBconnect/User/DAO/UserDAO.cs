using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.User.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.User.DAO
{
    public class UserDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public UserDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 9 Febuary 2018> </Since>
        public UserModel getUserInformation(string username)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", username, "NVARCHAR");

                UserModel ExecutedResult = conn.GetResultPROC<UserModel>("ESN_SP_USER_GET_INFORMATION", arLstParameter).First<UserModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 23 Febuary 2018> </Since>
        public List<UserModel> getUserList()
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();

                List<UserModel> ExecutedResult = conn.GetResultPROC<UserModel>("ESN_SP_USER_GETLIST", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 26 Febuary 2018> </Since>
        public List<UserPropertyModel> getUserPropertyByUser(UserModel model, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                string username = String.IsNullOrEmpty(model.USERNAME) ? "" : model.USERNAME;

                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", username, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                List<UserPropertyModel> ExecutedResult = conn.GetResultPROC<UserPropertyModel>("ESN_SP_USER_PROPERTY_GETLIST_BY_USER", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 23 Febuary 2018> </Since>
        public MessageModel insertUser(UserModel model, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@password", model.USERPASS, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_en", model.NAME_EN, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_th", model.NAME_TH, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@surname_en", model.LASTNAME_EN, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@surname_th", model.LASTNAME_TH, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@email", model.USEREMAIL, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userclass", model.USERCLASS.ToString(), "INT");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");


                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_USER_INSERT", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 27 Febuary 2018> </Since>
        public MessageModel updateUser(UserModel model, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_en", model.NAME_EN, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_th", model.NAME_TH, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@surname_en", model.LASTNAME_EN, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@surname_th", model.LASTNAME_TH, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@email", model.USEREMAIL, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@userclass", model.USERCLASS.ToString(), "INT");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@lastupdate_user", model.USERNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");


                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_USER_UPDATE", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 27 Febuary 2018> </Since>
        public MessageModel changestatusUser(UserModel model, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@status", model.USERSTATUS.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_USER_CHANGE_STATUS", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 28 Febuary 2018> </Since>
        public MessageModel changePasswordUser(string username, string oldpass, string newpass, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", username, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@oldpass", oldpass, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@newpass", newpass, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_USER_CHANGE_PASSWORD", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 27 Febuary 2018> </Since>
        public List<UserModel> getUserByProperty(UserModel model, DataTable dataTable)
        {
            try
            {
                try
                {
                    ArrayList arLstParameter = new ArrayList();
                    List<DataTableParameter> dtParams = new List<DataTableParameter>();

                    if (!string.IsNullOrEmpty(model.USERNAME))
                        SQLconnect.PROCArgumentsCollection(arLstParameter, "@username", model.USERNAME, "NVARCHAR");

                    //if (!string.IsNullOrEmpty(model.NAME_EN))
                    //    SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_en", model.NAME_EN, "NVARCHAR");

                    //if (!string.IsNullOrEmpty(model.NAME_TH))
                    //    SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_th", model.NAME_TH, "NVARCHAR");

                    //if (!string.IsNullOrEmpty(model.LASTNAME_EN))
                    //    SQLconnect.PROCArgumentsCollection(arLstParameter, "@surname_en", model.LASTNAME_EN, "NVARCHAR");

                    //if (!string.IsNullOrEmpty(model.LASTNAME_TH))
                    //    SQLconnect.PROCArgumentsCollection(arLstParameter, "@surname_th", model.LASTNAME_TH, "NVARCHAR");

                    if (!string.IsNullOrEmpty(model.USEREMAIL))
                        SQLconnect.PROCArgumentsCollection(arLstParameter, "@email", model.USEREMAIL, "NVARCHAR");

                    if (model.USERCLASS >= 0)
                        SQLconnect.PROCArgumentsCollection(arLstParameter, "@userclass", model.USERCLASS.ToString(), "NVARCHAR");

                    SQLconnect.PROCDataTablesCollection(dtParams, "@propertyList", dataTable);

                    List<UserModel> ExecutedResult = conn.GetResultPROCWithDataTable<UserModel>("ESN_SP_USER_GETLIST_BY_PROPERTY", dtParams, arLstParameter);

                    return ExecutedResult;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 23 Febuary 2018> </Since>
        public MessageModel insertUserProperty(DataTable dataTable)
        {
            try
            {
                List<DataTableParameter> dtParams = new List<DataTableParameter>();

                SQLconnect.PROCDataTablesCollection(dtParams, "@propertyList", dataTable);

                MessageModel ExecutedResult = conn.GetResultPROCWithDataTable<MessageModel>("ESN_SP_USER_PROPERTY_INSERT", dtParams).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 27 Febuary 2018> </Since>
        public int deleteUserProperty(string username)
        {
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("DELETE dbo.ESN_USER_PROPERTY WHERE USERNAME = '" + username + "'");

                int ExecutedResult = conn.GetRowEffect(sql.ToString());

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
