using ESN_NET.COMMON;
using System;

namespace ESN_NET.DBconnect.AssetInfo.MODEL
{
    public class AssetInfoModel
    {
        public int ASSETINFOID { get; set; }
        public string REQID { get; set; }
        public string MODEL { get; set; }
        public string ENGINE_SIZE { get; set; }
        public int VEHICLE_COLOR_ID { get; set; }
        public string VEHICLE_COLOR { get; set; }
        public int VEHICLE_SEATTYPE_ID { get; set; }
        public string VEHICLE_SEAT { get; set; }
        public string ENGINE_NUMBER { get; set; }
        public string VEHICLEBODY_NUMBER { get; set; }
        public string VEHICLE_LICENSE { get; set; }
        public int VEHICLEPLATETYPEID { get; set; }
        public string VEHICLEPLATE { get; set; }
        public int PROVINCEID { get; set; }
        public string PROVINCE { get; set; }
        public string VEHICLEPLATEFULLNAME
        {
            get
            {
                return VEHICLE_LICENSE + " " + PROVINCE;
            }
            set { }
        }
        public int RENTALNUMBER { get; set; }
        public string RENTALUNIT { get; set; }
        public string DISPLAY_RENTAL
        {
            get
            {
                if (RENTALUNIT == "DAY")
                {
                    return RENTALNUMBER.ToString() + " วัน";
                }
                else if (RENTALUNIT == "MONTH")
                {
                    return RENTALNUMBER.ToString() + " เดือน";
                }
                else if (RENTALUNIT == "YEAR")
                {
                    return RENTALNUMBER.ToString() + " ปี";
                }
                else
                {
                    return "ไม่ได้ตั้งการแจ้งเตือน";
                }
            }
            set { }
        }
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
                return RENTAL_EFFECTIVEDATE == null ? "-" : Constants.getDateBC(RENTAL_EFFECTIVEDATE);
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
                return RENTAL_EXPIREDATE == null ? "-" : Constants.getDateBC(RENTAL_EXPIREDATE);
            }
            set { }
        }
        public Decimal RENTAMOUNT { get; set; }
        public string SRENTAMOUNT
        {
            set { }
            get
            {
                return RENTAMOUNT.ToString("#,##0.00");
            }
        }
        public int RENTTAXFLAG { get; set; }
        public string SRENTTAXFLAG
        {
            get
            {
                return RENTTAXFLAG == 0 ? "ไม่รวมภาษีมูลค่าเพิ่ม" : "รวมภาษีมูลค่าเพิ่ม";
            }
            set { }
        }
        public Decimal INSURANCECHARGEAMOUNT { get; set; }
        public string SINSURANCECHARGEAMOUNT
        {
            set { }
            get
            {
                return INSURANCECHARGEAMOUNT.ToString("#,##0.00");
            }
        }
        public string INSURANCEBROKER { get; set; }
        public string INSURANCENUMBER { get; set; }
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
                return INSURANCE_EFFECTIVEDATE == null ? "-" : Constants.getDateBC(INSURANCE_EFFECTIVEDATE);
            }
            set { }
        }
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
                return INSURANCE_EXPIREDATE == null ? "-" : Constants.getDateBC(INSURANCE_EXPIREDATE);
            }
            set { }
        }
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
                return CARACT_EFFECTIVEDATE == null ? "-" : Constants.getDateBC(CARACT_EFFECTIVEDATE);
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
                return CARACT_EXPIREDATE == null ? "-" : Constants.getDateBC(CARACT_EXPIREDATE);
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
                return VEHICLETAX_EFFECTIVEDATE == null ? "-" : Constants.getDateBC(VEHICLETAX_EFFECTIVEDATE);
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
                return VEHICLETAX_EXPIREDATE == null ? "-" : Constants.getDateBC(VEHICLETAX_EXPIREDATE);
            }
            set { }
        }
        public string FLEETCARDNUMBER { get; set; }
        public Decimal FLEETCARDBUDGET { get; set; }
        public string SFLEETCARDBUDGET
        {
            set { }
            get
            {
                return FLEETCARDBUDGET.ToString("#,##0.00");
            }
        }
        public int DRIVERID { get; set; }
        public string DRVIERNAME { get; set; }
        public string COSTCENTER { get; set; }
        public string DEPARTMENT { get; set; }
        public string POSITION { get; set; }
        public string REMARKS { get; set; }
        public DateTime? RENTAL_CANCELDATE { get; set; }
        public string SRENTAL_CANCELDATE
        {
            get
            {
                return RENTAL_CANCELDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), RENTAL_CANCELDATE);
            }
            set { }
        }
        public string BCRENTAL_CANCELDATE
        {
            get
            {
                return RENTAL_CANCELDATE == null ? "-" : Constants.getDateBC(RENTAL_CANCELDATE);
            }
            set { }
        }
    }
}
