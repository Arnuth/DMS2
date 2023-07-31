using ESN_NET.DBconnect.Request.MODEL;
using System;

namespace ESN_NET.DBconnect.Search.MODEL
{
    public class SearchRequestStatusModel : RequestModel
    {
        #region Vehicle Rental Search
        public string VEHICLERENTAL_DOCNO { get; set; }
        public int? VEHICLERENTALTYPEID { get; set; }
        public string LESSORNAME { get; set; }
        public string MODEL { get; set; }
        public string ENGINE_NUMBER { get; set; }
        public string VEHICLE_LICENSE { get; set; }
        #endregion

        public string SPACERENTAL_DOCNO { get; set; }
        public int? SPACERENTALTYPEID { get; set; }

        public string PAGE { get; set; }

        public int? AGREEMENTTYPEID { get; set; }
        public int? LICENSETYPEID { get; set; }

        public string VENDORNAME { get; set; }

        public DateTime? EFFECTIVEDATE_FROM { get; set; }
        public DateTime? EFFECTIVEDATE_TO { get; set; }

        public DateTime? EXPIREDATE_FROM { get; set; }
        public DateTime? EXPIREDATE_TO { get; set; }

        public DateTime? PAYMENTDATE_FROM { get; set; }
        public DateTime? PAYMENTDATE_TO { get; set; }

        public DateTime? UPDATEDATE_FROM { get; set; }
        public DateTime? UPDATEDATE_TO { get; set; }

        public DateTime? NOTICEDATE_FROM { get; set; }
        public DateTime? NOTICEDATE_TO { get; set; }

        public DateTime? CONDITIONEXPIREDATE_FROM { get; set; }
        public DateTime? CONDITIONEXPIREDATE_TO { get; set; }

        public DateTime? RENTAL_EFFECTIVEDATE_FROM { get; set; }
        public DateTime? RENTAL_EFFECTIVEDATE_TO { get; set; }

        public DateTime? RENTAL_EXPIREDATE_FROM { get; set; }
        public DateTime? RENTAL_EXPIREDATE_TO { get; set; }

        public DateTime? INSURANCE_EXPIREDATE_FROM { get; set; }
        public DateTime? INSURANCE_EXPIREDATE_TO { get; set; }

        public DateTime? CARACT_EXPIREDATE_FROM { get; set; }
        public DateTime? CARACT_EXPIREDATE_TO { get; set; }

        public DateTime? VEHICLETAX_EXPIREDATE_FROM { get; set; }
        public DateTime? VEHICLETAX_EXPIREDATE_TO { get; set; }

        public string MENU { get; set; }

        public int? LESSORNAMEID { get; set; }
    }
}
