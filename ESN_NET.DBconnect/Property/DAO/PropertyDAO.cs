using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Property.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.Property.DAO
{
    public class PropertyDAO
    {
        #region Private variables
        private SQLconnect conn;
        #endregion

        public PropertyDAO()
        {
            conn = new SQLconnect();
        }

        /// <Since 16 Febuary 2018> </Since>
        public List<PropertyModel> getPropertyTopic(string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                List<PropertyModel> ExecutedResult = conn.GetResultPROC<PropertyModel>("ESN_SP_PROPERTY_GETTOPIC", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 21 Febuary 2018> </Since>
        public List<PropertyModel> getPropertyTopicByType(string language, string type)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@type", type, "NVARCHAR");
                
                List<PropertyModel> ExecutedResult = conn.GetResultPROC<PropertyModel>("ESN_SP_PROPERTY_GETTOPIC", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 14 Febuary 2018> </Since>
        public List<PropertyModel> getPropertyList(string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                List<PropertyModel> ExecutedResult = conn.GetResultPROC<PropertyModel>("ESN_SP_PROPERTY_GETLIST", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 07 March 2018> </Since>
        public List<PropertyModel> getPropertyListByPropertyName(string propname)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@propname", propname, "NVARCHAR");

                List<PropertyModel> ExecutedResult = conn.GetResultPROC<PropertyModel>("ESN_SP_PROPERTY_GETLIST_BY_PROPNAME", arLstParameter);

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 19 Febuary 2018> </Since>
        public List<dynamic> getPropertyCount(string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                IEnumerable<dynamic> ExecutedResult = conn.GetResultPROCDYNAMICRESULT("ESN_SP_PROPERTY_COUNT", arLstParameter);
                return ExecutedResult.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 19 Febuary 2018> </Since>
        public MessageModel createNewProperty(PropertyModel model, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@property", model.PROPERTYTYPE, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@desc_en", model.PROPERTYDESC_EN, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@desc_th", model.PROPERTYDESC_TH, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_PROPERTY_GENARATE_NEW_PROPERTY", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 21 Febuary 2018> </Since>
        public MessageModel setUserProperty(string property, string status, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@property", property, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@status", status, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_PROPERTY_SET_USER_PROPERTY", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 21 Febuary 2018> </Since>
        public MessageModel setDocProperty(string property, string status, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@property", property, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@status", status, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_PROPERTY_SET_DOCUMENT_PROPERTY", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 21 Febuary 2018> </Since>
        public MessageModel editPropertyTopicName(PropertyModel property, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@property", property.PROPERTY.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_en", property.PROPERTYDESC_EN, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_th", property.PROPERTYDESC_TH, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_PROPERTY_EDIT_PROPERTY_TOPIC_NAME", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 22 Febuary 2018> </Since>
        public MessageModel addSubProperty(PropertyModel property, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@property", property.PROPERTY.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@propertyName", property.PROPERTYNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_en", property.PROPERTYDESC_EN, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_th", property.PROPERTYDESC_TH, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_PROPERTY_ADD_SUB_PROPERTY", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 22 Febuary 2018> </Since>
        public MessageModel editSubProperty(PropertyModel property, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@property", property.PROPERTY.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@propertyID", property.PROPERTYID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@propertyName", property.PROPERTYNAME, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_en", property.PROPERTYDESC_EN, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@name_th", property.PROPERTYDESC_TH, "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_PROPERTY_EDIT_SUB_PROPERTY", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <Since 22 Febuary 2018> </Since>
        public MessageModel deleteSubProperty(PropertyModel property, string language)
        {
            try
            {
                ArrayList arLstParameter = new ArrayList();
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@property", property.PROPERTY.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@propertyID", property.PROPERTYID.ToString(), "NVARCHAR");
                SQLconnect.PROCArgumentsCollection(arLstParameter, "@language", language, "NVARCHAR");

                MessageModel ExecutedResult = conn.GetResultPROC<MessageModel>("ESN_SP_PROPERTY_DELETE_SUB_PROPERTY", arLstParameter).First<MessageModel>();

                return ExecutedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
