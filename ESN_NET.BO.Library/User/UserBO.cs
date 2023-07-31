using ESN_NET.COMMON;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.User.DAO;
using ESN_NET.DBconnect.User.MODEL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace ESN_NET.BO.Library.User
{
    public class UserBO
    {
        /// <Since 9 Febuary 2018> </Since>
        public UserModel getUserInformation(string username)
        {
            UserDAO daoClass = new UserDAO();
            return daoClass.getUserInformation(username);
        }

        /// <Since 23 Febuary 2018> </Since>
        public List<UserModel> getUserList()
        {
            UserDAO daoClass = new UserDAO();
            return daoClass.getUserList();
        }

        /// <Since 26 Febuary 2018> </Since>
        public List<UserPropertyModel> getUserPropertyByUser(UserModel model, string language)
        {
            UserDAO daoClass = new UserDAO();
            return daoClass.getUserPropertyByUser(model, language);
        }

        /// <Since 23 Febuary 2018> </Since>
        public MessageModel insertUser(UserModel model, string language)
        {
            model.USERPASS = Encode.hashPassword("MD5I", model.USERPASS);
            model.NAME_TH = string.IsNullOrEmpty(model.NAME_TH) ? model.NAME_EN : model.NAME_TH;
            model.LASTNAME_TH = string.IsNullOrEmpty(model.LASTNAME_TH) ? model.LASTNAME_EN : model.LASTNAME_TH;

            UserDAO daoClass = new UserDAO();
            MessageModel result = daoClass.insertUser(model, language);

            if (result.MSGSTATUS == 0)
            {
                DataTable dataTable;

                dataTable = new DataTable("ESN_TYPE_USER_PROPERTY");
                dataTable.Columns.Add("USERNAME", typeof(string));
                dataTable.Columns.Add("TOPIC", typeof(int));
                dataTable.Columns.Add("PROPERTY", typeof(int));

                if (model.USERPROPERTY != null)
                {
                    for (int i = 0; i < model.USERPROPERTY.Count; i++)
                    {
                        dataTable.Rows.Add(model.USERNAME, model.USERPROPERTY[i].TOPIC, model.USERPROPERTY[i].PROPERTY);
                    }
                }

                daoClass.insertUserProperty(dataTable);
            }

            return result;
        }

        /// <Since 27 Febuary 2018> </Since>
        public MessageModel updateUser(UserModel model, string language)
        {
            model.NAME_TH = string.IsNullOrEmpty(model.NAME_TH) ? model.NAME_EN : model.NAME_TH;
            model.LASTNAME_TH = string.IsNullOrEmpty(model.LASTNAME_TH) ? model.LASTNAME_EN : model.LASTNAME_TH;

            UserDAO daoClass = new UserDAO();
            MessageModel result = daoClass.updateUser(model, language);

            if (result.MSGSTATUS == 0)
            {
                daoClass.deleteUserProperty(model.USERNAME);

                DataTable dataTable = new DataTable("ESN_TYPE_USER_PROPERTY");
                dataTable.Columns.Add("USERNAME", typeof(string));
                dataTable.Columns.Add("TOPIC", typeof(int));
                dataTable.Columns.Add("PROPERTY", typeof(int));

                if (model.USERPROPERTY != null)
                {
                    for (int i = 0; i < model.USERPROPERTY.Count; i++)
                    {
                        dataTable.Rows.Add(model.USERNAME, model.USERPROPERTY[i].TOPIC, model.USERPROPERTY[i].PROPERTY);
                    }
                }

                daoClass.insertUserProperty(dataTable);
            }

            return result;
        }

        /// <Since 27 Febuary 2018> </Since>
        public MessageModel changestatusUser(UserModel model, string language)
        {
            UserDAO daoClass = new UserDAO();
            return daoClass.changestatusUser(model, language);
        }

        /// <Since 28 Febuary 2018> </Since>
        public MessageModel changePasswordUser(string username, string oldpass, string newpass, string language)
        {
            UserDAO daoClass = new UserDAO();
            return daoClass.changePasswordUser(username, Encode.hashPassword("MD5I", oldpass), Encode.hashPassword("MD5I", newpass), language);
        }

        /// <Since 27 Febuary 2018> </Since>
        public List<UserModel> getUserByProperty(UserModel model)
        {
            DataTable dataTable = new DataTable("ESN_TYPE_USER_PROPERTY");
            dataTable.Columns.Add("USERNAME", typeof(string));
            dataTable.Columns.Add("TOPIC", typeof(int));
            dataTable.Columns.Add("PROPERTY", typeof(int));

            if (model.USERPROPERTY != null)
            {
                model.USERPROPERTY.ForEach(prop => dataTable.Rows.Add(model.USERNAME, prop.TOPIC, prop.PROPERTY));
            }

            UserDAO daoClass = new UserDAO();
            List<UserModel> users = daoClass.getUserByProperty(model, dataTable);

            var userList = from u in users
                           where (u.NAME_EN.ToUpper().Contains(model.NAME_EN == null ? u.NAME_EN.ToUpper() : model.NAME_EN.ToUpper())
                                 || u.NAME_TH.ToUpper().Contains(model.NAME_EN == null ? u.NAME_TH.ToUpper() : model.NAME_EN.ToUpper()))
                                 && (u.LASTNAME_EN.ToUpper().Contains(model.LASTNAME_EN == null ? u.NAME_EN.ToUpper() : model.LASTNAME_EN.ToUpper())
                                 || u.LASTNAME_TH.ToUpper().Contains(model.LASTNAME_EN == null ? u.LASTNAME_TH.ToUpper() : model.LASTNAME_EN.ToUpper()))
                           select u;

            return userList.ToList();
        }
    }
}
