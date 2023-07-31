using ESN_NET.DBconnect.Request.MODEL;
using ESN_NET.DBconnect.Search.DAO;
using ESN_NET.DBconnect.Search.MODEL;
using System.Collections.Generic;

namespace ESN_NET.BO.Library.Search
{
    public class SearchBO
    {
        /// <summary>
        /// Get request by filter.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public List<SearchRequestStatusResultModel> GetRequestByProperty(SearchRequestStatusModel model)
        {
            using (var daoClass = new SearchDAO())
            {
                if (model.EFFECTIVEDATE_FROM.HasValue)
                    model.EFFECTIVEDATE_FROM = model.EFFECTIVEDATE_FROM.Value.AddYears(-543);

                if (model.EFFECTIVEDATE_TO.HasValue)
                    model.EFFECTIVEDATE_TO = model.EFFECTIVEDATE_TO.Value.AddYears(-543);

                if (model.EXPIREDATE_FROM.HasValue)
                    model.EXPIREDATE_FROM = model.EXPIREDATE_FROM.Value.AddYears(-543);

                if (model.EXPIREDATE_TO.HasValue)
                    model.EXPIREDATE_TO = model.EXPIREDATE_TO.Value.AddYears(-543);

                if (model.UPDATEDATE_FROM.HasValue)
                    model.UPDATEDATE_FROM = model.UPDATEDATE_FROM.Value.AddYears(-543);

                if (model.UPDATEDATE_TO.HasValue)
                    model.UPDATEDATE_TO = model.UPDATEDATE_TO.Value.AddYears(-543);

                if (model.NOTICEDATE_FROM.HasValue)
                    model.NOTICEDATE_FROM = model.NOTICEDATE_FROM.Value.AddYears(-543);

                if (model.NOTICEDATE_TO.HasValue)
                    model.NOTICEDATE_TO = model.NOTICEDATE_TO.Value.AddYears(-543);
                
                if (model.CONDITIONEXPIREDATE_FROM.HasValue)
                    model.CONDITIONEXPIREDATE_FROM = model.CONDITIONEXPIREDATE_FROM.Value.AddYears(-543);

                if (model.CONDITIONEXPIREDATE_TO.HasValue)
                    model.CONDITIONEXPIREDATE_TO = model.CONDITIONEXPIREDATE_TO.Value.AddYears(-543);

                if (model.PAYMENTDATE_FROM.HasValue)
                    model.PAYMENTDATE_FROM = model.PAYMENTDATE_FROM.Value.AddYears(-543);

                if (model.PAYMENTDATE_TO.HasValue)
                    model.PAYMENTDATE_TO = model.PAYMENTDATE_TO.Value.AddYears(-543);

                return daoClass.GetRequestSearchByProperty(model);
            }
        }

        /// <summary>
        /// Get request status list.
        /// </summary>
        /// <returns></returns>
        public List<RequestStatusModel> GetRequestStatusList()
        {
            using (var daoClass = new SearchDAO())
            {
                return daoClass.GetRequestStatusList();
            }
        }
    }
}
