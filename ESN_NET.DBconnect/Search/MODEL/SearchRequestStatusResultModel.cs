using ESN_NET.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.Request.MODEL
{
    public class SearchRequestStatusResultModel : RequestModel
    {
        public string STORE { get; set; }
        public string AGREEMENTTYPE { get; set; }
        public string LICENSETYPE { get; set; }
        public string VENDORNAMES { get; set; }
        public string STATUS { get; set; }
        public string USERREQUEST { get; set; }
        public string USERVERIFY { get; set; }
        public decimal? FEEAMOUNT { get; set; }

        // STBLNOTIFICATION
        public int? NOTIFICATIONID { get; set; }
        public string NOTICE_TYPE { get; set; }
        public int? NOTICE_USERCLASS { get; set; }
        public DateTime? NOTICEDATE { get; set; }
        public string NOTICEDATE_STR
        {
            get
            {
                return NOTICEDATE.HasValue ? String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), NOTICEDATE.Value) : String.Empty;
            }
        }
        public string BC_NOTICEDATE_STR
        {
            get
            {
                return NOTICEDATE.HasValue ? String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), NOTICEDATE.Value.AddYears(543)) : String.Empty;
            }
        }
        public DateTime? PAYMENTDATE { get; set; }
        public string PAYMENTDATE_STR
        {
            get
            {
                return PAYMENTDATE.HasValue ? String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), PAYMENTDATE.Value) : String.Empty;
            }
        }
        public string BC_PAYMENTDATE_STR
        {
            get
            {
                return PAYMENTDATE.HasValue ? String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), PAYMENTDATE.Value.AddYears(543)) : String.Empty;
            }
        }
        public DateTime? CONDITIONEXPIREDATE { get; set; }
        public string CONDITIONEXPIREDATE_STR
        {
            get
            {
                if(CONDITIONEXPIREDATE.HasValue)
                {
                    if(CONDITIONEXPIREDATE.Value.Year < 9000)
                    {
                        return String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), CONDITIONEXPIREDATE.Value);
                    }
                }
                return string.Empty;
            }
        }
        public string BC_CONDITIONEXPIREDATE_STR
        {
            get
            {
                if (CONDITIONEXPIREDATE.HasValue)
                {
                    if (CONDITIONEXPIREDATE.Value.Year < 9000)
                    {
                        return String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), CONDITIONEXPIREDATE.Value.AddYears(543));
                    }
                }
                return string.Empty;
            }
        }
        public int? LINETEMPLATETYPE { get; set; }
        public int? EMAILTEMPLATETYPE { get; set; }



        // STBLLANDLEASERATE
        public int? LANDLEASERATEID { get; set; }
        public int? RECEIVEPERSONID { get; set; }
        public int? STARTYEAR { get; set; }
        public int? ENDYEAR { get; set; }

        public DateTime? STARTDATE { get; set; }
        public string STARTDATE_STR
        {
            get
            {
                return STARTDATE.HasValue ? String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), STARTDATE.Value) : String.Empty;
            }
        }
        public string BC_STARTDATE_STR
        {
            get
            {
                return STARTDATE.HasValue ? String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), STARTDATE.Value.AddYears(543)) : String.Empty;
            }
        }
        public DateTime? ENDDATE { get; set; }
        public string ENDDATE_STR
        {
            get
            {
                return ENDDATE.HasValue ? String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), ENDDATE.Value) : String.Empty;
            }
        }
        public string BC_ENDDATE_STR
        {
            get
            {
                return ENDDATE.HasValue ? String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), ENDDATE.Value.AddYears(543)) : String.Empty;
            }
        }

        public string START_END_DATE_STR
        {
            get
            {
                if (STARTDATE == null || ENDDATE == null)
                {
                    return String.Empty;
                }
                return String.Format("{0} - {1}", STARTDATE_STR, ENDDATE_STR);
            }
        }
        public string BC_START_END_DATE_STR
        {
            get
            {
                if (STARTDATE == null || ENDDATE == null)
                {
                    return String.Empty;
                }
                return String.Format("{0} - {1}", BC_STARTDATE_STR, BC_ENDDATE_STR);
            }
        }

        public int? LANDLEASEAMOUNT { get; set; }
        public int? SERVICEAMOUNT { get; set; }
        public int? SERVICETAXFLAG { get; set; }
        public int? VATCALFLAG { get; set; }


        // STBLDOCUMENT_SPACERENTAL
        public string SPACERENTAL_DOCNO { get; set; }
        public string SPACERENTALTYPE { get; set; }

        // STBLDOCUMENT_VEHICLERENTAL
        public string VEHICLERENTAL_DOCNO { get; set; }
        public string VEHICLERENTALTYPE { get; set; }
        public string LESSORNAME { get; set; }
        public DateTime? RENTAL_EFFECTIVEDATE { get; set; }
        public string SRENTAL_EFFECTIVEDATE
        {
            get
            {
                return RENTAL_EFFECTIVEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), RENTAL_EFFECTIVEDATE);
            }
            set { }
        }
        public string BCRENTAL_EFFECTIVEDATE
        {
            get
            {
                return RENTAL_EFFECTIVEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), RENTAL_EFFECTIVEDATE.Value.AddYears(543));
            }
            set { }
        }
        public DateTime? RENTAL_EXPIREDATE { get; set; }
        public string SRENTAL_EXPIREDATE
        {
            get
            {
                return RENTAL_EXPIREDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), RENTAL_EXPIREDATE);
            }
            set { }
        }
        public string BCRENTAL_EXPIREDATE
        {
            get
            {
                return RENTAL_EXPIREDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), RENTAL_EXPIREDATE.Value.AddYears(543));
            }
            set { }
        }


        // ASSETINFO
        public string MODEL { get; set; }
        public string ENGINE_NUMBER { get; set; }
        public string VEHICLE_LICENSE { get; set; }
        public DateTime? INSURANCE_EXPIREDATE { get; set; }
        public string SINSURANCE_EXPIREDATE
        {
            get
            {
                return INSURANCE_EXPIREDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), INSURANCE_EXPIREDATE);
            }
            set { }
        }
        public string BCINSURANCE_EXPIREDATE
        {
            get
            {
                return INSURANCE_EXPIREDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), INSURANCE_EXPIREDATE.Value.AddYears(543));
            }
            set { }
        }
        public DateTime? INSURANCE_EFFECTIVEDATE { get; set; }
        public string SINSURANCE_EFFECTIVEDATE
        {
            get
            {
                return INSURANCE_EFFECTIVEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), INSURANCE_EFFECTIVEDATE);
            }
            set { }
        }
        public string BCINSURANCE_EFFECTIVEDATE
        {
            get
            {
                return INSURANCE_EFFECTIVEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), INSURANCE_EFFECTIVEDATE.Value.AddYears(543));
            }
            set { }
        }
        public DateTime? CARACT_EXPIREDATE { get; set; }
        public string SCARACT_EXPIREDATE
        {
            get
            {
                return CARACT_EXPIREDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), CARACT_EXPIREDATE);
            }
            set { }
        }
        public string BCCARACT_EXPIREDATE
        {
            get
            {
                return CARACT_EXPIREDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), CARACT_EXPIREDATE.Value.AddYears(543));
            }
            set { }
        }
        public string INSURANCEBROKER { get; set; }
        public string INSURANCENUMBER { get; set; }
        public DateTime? CARACT_EFFECTIVEDATE { get; set; }
        public string SCARACT_EFFECTIVEDATE
        {
            get
            {
                return CARACT_EFFECTIVEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), CARACT_EFFECTIVEDATE);
            }
            set { }
        }
        public string BCCARACT_EFFECTIVEDATE
        {
            get
            {
                return CARACT_EFFECTIVEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), CARACT_EFFECTIVEDATE.Value.AddYears(543));
            }
            set { }
        }
        public DateTime? VEHICLETAX_EXPIREDATE { get; set; }
        public string SVEHICLETAX_EXPIREDATE
        {
            get
            {
                return VEHICLETAX_EXPIREDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), VEHICLETAX_EXPIREDATE);
            }
            set { }
        }
        public string BCVEHICLETAX_EXPIREDATE
        {
            get
            {
                return VEHICLETAX_EXPIREDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), VEHICLETAX_EXPIREDATE.Value.AddYears(543));
            }
            set { }
        }
        public DateTime? VEHICLETAX_EFFECTIVEDATE { get; set; }
        public string SVEHICLETAX_EFFECTIVEDATE
        {
            get
            {
                return VEHICLETAX_EFFECTIVEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), VEHICLETAX_EFFECTIVEDATE);
            }
            set { }
        }
        public string BCVEHICLETAX_EFFECTIVEDATE
        {
            get
            {
                return VEHICLETAX_EFFECTIVEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), VEHICLETAX_EFFECTIVEDATE.Value.AddYears(543));
            }
            set { }
        }

        public string VEHICLEALERTTYPE { get; set; }
        public string DEPARTMENT { get; set; }
        public int? RENTAMOUNT { get; set; }
    }
}
