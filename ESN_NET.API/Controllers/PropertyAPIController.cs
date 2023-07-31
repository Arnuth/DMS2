using ESN_NET.DBconnect.Common;
using ESN_NET.COMMON;
using ESN_NET.BO.Library.Property;
using ESN_NET.DBconnect.Property.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ESN_NET.API.Controllers
{
    public class PropertyAPIController : ApiController
    {
        #region Private variables
        private Logger logger;
        private LineAPI line;
        #endregion

        public PropertyAPIController()
        {
            logger = new Logger("PropertyAPIController");
            line = new LineAPI();
        }

        /// <Since 16 Febuary 2018> </Since>
        [ActionName("getPropertyTopic")]
        [HttpGet]
        public List<PropertyModel> getPropertyTopic(string language)
        {
            List<PropertyModel> result = new List<PropertyModel>();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.getPropertyTopic(language);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getPropertyTopic : {0}", ex.Message));
                line.NotificationLine(string.Format("getPropertyTopic : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 21 Febuary 2018> </Since>
        [ActionName("getPropertyTopic")]
        [HttpGet]
        public List<PropertyModel> getPropertyTopicByType(string language, string type)
        {
            List<PropertyModel> result = new List<PropertyModel>();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.getPropertyTopicByType(language, type);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getPropertyTopic : {0}", ex.Message));
                line.NotificationLine(string.Format("getPropertyTopic : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 14 Febuary 2018> </Since>
        [ActionName("getPropertyList")]
        [HttpGet]
        public List<PropertyModel> getPropertyList(string language)
        {
            List<PropertyModel> result = new List<PropertyModel>();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.getPropertyList(language);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getPropertyList : {0}", ex.Message));
                line.NotificationLine(string.Format("getPropertyList : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 07 March 2018> </Since>
        [ActionName("getPropertyListByPropertyName")]
        [HttpGet]
        public List<PropertyModel> getPropertyListByPropertyName(string propname)
        {
            List<PropertyModel> result = new List<PropertyModel>();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.getPropertyListByPropertyName(propname);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getPropertyListByPropertyName : {0}", ex.Message));
                line.NotificationLine(string.Format("getPropertyListByPropertyName : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 19 Febuary 2018> </Since>
        [ActionName("getPropertyCount")]
        [HttpGet]
        public IHttpActionResult getPropertyCount(string language)
        {
            PropertyBO boClass = new PropertyBO();
            List<dynamic> result = new List<dynamic>();

            try
            {
                result = boClass.getPropertyCount(language);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("getPropertyCount : {0}", ex.Message));
                line.NotificationLine(string.Format("getPropertyCount : {0}", ex.Message));
            }

            return Json<IEnumerable<object>>(result);
        }

        /// <Since 19 Febuary 2018> </Since>
        [ActionName("createNewProperty")]
        [HttpPost]
        public MessageModel createNewProperty(PropertyModel model, string language)
        {
            MessageModel result = new MessageModel();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.createNewProperty(model, language);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("createNewProperty : {0}", ex.Message));
                line.NotificationLine(string.Format("createNewProperty : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 21 Febuary 2018> </Since>
        [ActionName("setUserProperty")]
        [HttpGet]
        public MessageModel setUserProperty(string property, string status, string language)
        {
            MessageModel result = new MessageModel();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.setUserProperty(property, status, language);
            }
            catch (Exception ex)
            {
                logger.error(string.Format("setUserProperty : {0}", ex.Message));
                line.NotificationLine(string.Format("setUserProperty : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 21 Febuary 2018> </Since>
        [ActionName("setDocProperty")]
        [HttpGet]
        public MessageModel setDocProperty(string property, string status, string language)
        {
            MessageModel result = new MessageModel();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.setDocProperty(property, status, language);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("setDocProperty : {0}", ex.Message));
                line.NotificationLine(string.Format("setDocProperty : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 21 Febuary 2018> </Since>
        [ActionName("editPropertyTopicName")]
        [HttpPost]
        public MessageModel editPropertyTopicName(PropertyModel property, string language)
        {
            MessageModel result = new MessageModel();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.editPropertyTopicName(property, language);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("editPropertyName : {0}", ex.Message));
                line.NotificationLine(string.Format("editPropertyName : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 22 Febuary 2018> </Since>
        [ActionName("addSubProperty")]
        [HttpPost]
        public MessageModel addSubProperty(PropertyModel property, string language)
        {
            MessageModel result = new MessageModel();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.addSubProperty(property, language);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("addSubProperty : {0}", ex.Message));
                line.NotificationLine(string.Format("addSubProperty : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 22 Febuary 2018> </Since>
        [ActionName("editSubProperty")]
        [HttpPost]
        public MessageModel editSubProperty(PropertyModel property, string language)
        {
            MessageModel result = new MessageModel();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.editSubProperty(property, language);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("editSubProperty : {0}", ex.Message));
                line.NotificationLine(string.Format("editSubProperty : {0}", ex.Message));
            }

            return result;
        }

        /// <Since 22 Febuary 2018> </Since>
        [ActionName("deleteSubProperty")]
        [HttpPost]
        public MessageModel deleteSubProperty(PropertyModel property, string language)
        {
            MessageModel result = new MessageModel();
            PropertyBO boClass = new PropertyBO();

            try
            {
                result = boClass.deleteSubProperty(property, language);
            }
            catch (Exception ex)
            {
                result.MSGSTATUS = -201;
                result.MSGTEXT = ex.Message;
                logger.error(string.Format("deleteSubProperty : {0}", ex.Message));
                line.NotificationLine(string.Format("deleteSubProperty : {0}", ex.Message));
            }

            return result;
        }
    }
}
