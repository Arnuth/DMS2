using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Property.MODEL;
using ESN_NET.DBconnect.Property.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.BO.Library.Property
{
    public class PropertyBO
    {
        /// <Since 16 Febuary 2018> </Since>
        public List<PropertyModel> getPropertyTopic(string language)
        {
            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.getPropertyTopic(language);
        }

        /// <Since 21 Febuary 2018> </Since>
        public List<PropertyModel> getPropertyTopicByType(string language, string type)
        {
            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.getPropertyTopicByType(language, type);
        }

        /// <Since 14 Febuary 2018> </Since>
        public List<PropertyModel> getPropertyList(string language)
        {
            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.getPropertyList(language);
        }

        /// <Since 07 March 2018> </Since>
        public List<PropertyModel> getPropertyListByPropertyName(string propname)
        {
            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.getPropertyListByPropertyName(propname);
        }

        /// <Since 19 Febuary 2018> </Since>
        public List<dynamic> getPropertyCount(string language)
        {
            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.getPropertyCount(language);
        }

        /// <Since 19 Febuary 2018> </Since>
        public MessageModel createNewProperty(PropertyModel model, string language)
        {
            model.PROPERTYTYPE = model.PROPERTYTYPE.ToUpper();

            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.createNewProperty(model, language);
        }

        /// <Since 21 Febuary 2018> </Since>
        public MessageModel setUserProperty(string property, string status, string language)
        {
            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.setUserProperty(property, status, language);
        }

        /// <Since 21 Febuary 2018> </Since>
        public MessageModel setDocProperty(string property, string status, string language)
        {
            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.setDocProperty(property, status, language);
        }

        /// <Since 21 Febuary 2018> </Since>
        public MessageModel editPropertyTopicName(PropertyModel property, string language)
        {
            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.editPropertyTopicName(property, language);
        }

        /// <Since 22 Febuary 2018> </Since>
        public MessageModel addSubProperty(PropertyModel property, string language)
        {
            property.PROPERTYNAME = property.PROPERTYNAME.ToUpper();

            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.addSubProperty(property, language);
        }

        /// <Since 22 Febuary 2018> </Since>
        public MessageModel editSubProperty(PropertyModel property, string language)
        {
            property.PROPERTYNAME = property.PROPERTYNAME.ToUpper();

            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.editSubProperty(property, language);
        }

        /// <Since 22 Febuary 2018> </Since>
        public MessageModel deleteSubProperty(PropertyModel property, string language)
        {
            PropertyDAO daoClass = new PropertyDAO();
            return daoClass.deleteSubProperty(property, language);
        }
    }
}
