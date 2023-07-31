using ESN_NET.DBconnect.LesseeInfo.MODEL;
using ESN_NET.DBconnect.ReceiveAccountInfo.MODEL;
using ESN_NET.DBconnect.CJBank.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.DocumentSpaceRental.MODEL
{
    public class DocumentSpaceRentalModel
    {
        private List<LesseeInfoModel> _LESSEEINFO;
        private List<ReceiveAccountInfoModel> _RECEIVEACCOUNTINFO;
        private List<CJBankModel> _CJBANKACCOUNT;
        public string REQID { get; set; }
        public string DOCRUNNO { get; set; }
        public string SPACERENTAL_DOCNO { get; set; }
        public int SPACERENTALTYPEID { get; set; }
        public string SPACERENTALTYPENAME { get; set; }
        public List<LesseeInfoModel> LESSEEINFO
        {
            get
            {
                return this._LESSEEINFO == null ? new List<LesseeInfoModel>() : this._LESSEEINFO;
            }
            set
            {
                this._LESSEEINFO = value;
            }
        }
        public int SERVICECHARGETYPE { get; set; }
        public string SERVICECHARGETYPENAME { get; set; }
        public Decimal SERVICECHARGEAMOUNT { get; set; }
        public string SERVICECHARGEAMOUNTTEXT
        {
            get { return SERVICECHARGEAMOUNT.ToString("#,##0.00"); }
            set { }
        }
        public int SERVICECHARGETAXFLAG { get; set; }
        public string SERVICECHARGETAXFLAGNAME
        {
            get
            {
                if (SERVICECHARGETAXFLAG == 1)
                {
                    return "ไม่รวมภาษีมูลค่าเพิ่ม";
                }
                else if (SERVICECHARGETAXFLAG == 2)
                {
                    return "รวมภาษีมูลค่าเพิ่ม";
                }
                else
                {
                    return "ไม่รวมภาษีมูลค่าเพิ่ม";
                }
            }
            set { }
        }
        public string SERVICECHARGETEXT
        {
            get
            {
                if (SERVICECHARGEAMOUNT > 0)
                {
                    if(SERVICECHARGETYPE == 1)
                    {
                        return SERVICECHARGEAMOUNTTEXT + " บาท (" + SERVICECHARGETAXFLAGNAME + ")";
                    }
                    else if(SERVICECHARGETYPE == 2)
                    {
                        return SERVICECHARGEAMOUNTTEXT + " % จากรายได้ (" + SERVICECHARGETAXFLAGNAME + ")";
                    }
                    else
                    {
                        return "-";
                    }
                }
                else
                {
                    return "-";
                }
            }
            set { }
        }
        public Decimal ELECTRICCHARGEAMOUNT { get; set; }
        public string ELECTRICCHARGEAMOUNTTEXT
        {
            get { return ELECTRICCHARGEAMOUNT.ToString("#,##0.00"); }
            set { }
        }
        public int ELECTRICCHARGETAXFLAG { get; set; }
        public string ELECTRICCHARGETAXFLAGNAME
        {
            get
            {
                if (ELECTRICCHARGETAXFLAG == 1)
                {
                    return "ไม่รวมภาษีมูลค่าเพิ่ม";
                }
                else if (ELECTRICCHARGETAXFLAG == 2)
                {
                    return "รวมภาษีมูลค่าเพิ่ม";
                }
                else
                {
                    return "ไม่รวมภาษีมูลค่าเพิ่ม";
                }
            }
            set { }
        }
        public string ELECTRICCHARGETEXT
        {
            get
            {
                if (ELECTRICCHARGEAMOUNT > 0)
                {
                    return ELECTRICCHARGEAMOUNTTEXT + " บาท (" + ELECTRICCHARGETAXFLAGNAME + ")";
                }
                else
                {
                    return "-";
                }
            }
            set { }
        }
        public Decimal WATERCHARGEAMOUNT { get; set; }
        public string WATERCHARGEAMOUNTTEXT
        {
            get { return WATERCHARGEAMOUNT.ToString("#,##0.00"); }
            set { }
        }
        public int WATERCHARGETAXFLAG { get; set; }
        public string WATERCHARGETAXFLAGNAME
        {
            get
            {
                if (WATERCHARGETAXFLAG == 1)
                {
                    return "ไม่รวมภาษีมูลค่าเพิ่ม";
                }
                else if (WATERCHARGETAXFLAG == 2)
                {
                    return "รวมภาษีมูลค่าเพิ่ม";
                }
                else
                {
                    return "ไม่รวมภาษีมูลค่าเพิ่ม";
                }
            }
            set { }
        }
        public string WATERCHARGETEXT
        {
            get
            {
                if (WATERCHARGEAMOUNT > 0)
                {
                    return WATERCHARGEAMOUNTTEXT + " บาท (" + WATERCHARGETAXFLAGNAME + ")";
                }
                else
                {
                    return "-";
                }
            }
            set { }
        }
        public Decimal INSURANCECHARGEAMOUNT { get; set; }
        public string INSURANCECHARGEAMOUNTTEXT
        {
            get { return INSURANCECHARGEAMOUNT.ToString("#,##0.00"); }
            set { }
        }
        public int INSURANCECHARGETAXFLAG { get; set; }
        public string INSURANCECHARGETAXFLAGNAME
        {
            get
            {
                if (INSURANCECHARGETAXFLAG == 1)
                {
                    return "ไม่รวมภาษีมูลค่าเพิ่ม";
                }
                else if (INSURANCECHARGETAXFLAG == 2)
                {
                    return "รวมภาษีมูลค่าเพิ่ม";
                }
                else
                {
                    return "ไม่รวมภาษีมูลค่าเพิ่ม";
                }
            }
            set { }
        }
        public string INSURANCECHARGETEXT
        {
            get
            {
                if (INSURANCECHARGEAMOUNT > 0)
                {
                    return INSURANCECHARGEAMOUNTTEXT + " บาท (" + INSURANCECHARGETAXFLAGNAME + ")";
                }
                else
                {
                    return "-";
                }
            }
            set { }
        }
        public int HOUSEANDLANDTAXID { get; set; }
        public string HOUSEANDLANDTAXNAME
        {
            get
            {
                if (HOUSEANDLANDTAXID == 1)
                {
                    return "ผู้ให้บริการ";
                }
                else if (HOUSEANDLANDTAXID == 2)
                {
                    return "ผู้รับบริการ";
                }
                else
                {
                    return "";
                }
            }
            set { }
        }
        public int BOARDTAXID { get; set; }
        public string BOARDTAXNAME
        {
            get
            {
                if (BOARDTAXID == 1)
                {
                    return "ผู้ให้บริการ";
                }
                else if (BOARDTAXID == 2)
                {
                    return "ผู้รับบริการ";
                }
                else
                {
                    return "";
                }
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
        public int PAYMENTOUTWITHINDATE { get; set; }
        public List<ReceiveAccountInfoModel> RECEIVEACCOUNTINFO
        {
            get
            {
                return this._RECEIVEACCOUNTINFO == null ? new List<ReceiveAccountInfoModel>() : this._RECEIVEACCOUNTINFO;
            }
            set
            {
                this._RECEIVEACCOUNTINFO = value;
            }
        }
        public int CANCELINFODATE { get; set; }
        public int SPACERENTALSIZEID { get; set; }
        public string SPACERENTALSIZENAME { get; set; }
        public string SPACERENTALDESC { get; set; }
        public string CJBANKACCOUNTLIST { get; set; }
        public List<CJBankModel> CJBANKACCOUNT
        {
            get
            {
                return this._CJBANKACCOUNT == null ? new List<CJBankModel>() : this._CJBANKACCOUNT;
            }
            set
            {
                this._CJBANKACCOUNT = value;
            }
        }
    }
}
