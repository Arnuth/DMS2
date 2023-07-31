using ESN_NET.DBconnect.LessorInfo.MODEL;
using ESN_NET.DBconnect.ReceivePersonInfo.MODEL;
using ESN_NET.COMMON;
using ESN_NET.DBconnect.LandLeaseRate.MODEL;
using ESN_NET.DBconnect.DeedOwnerInfo.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.DocumentLandLeaseAgreement.MODEL
{
    public class DocumentLandLeaseAgreementModel
    {
        private List<LessorInfoModel> _LESSORINFO;
        private List<ReceivePersonInfoModel> _RECEIVEPERSONINFO;
        private List<LandLeaseRateModel> _LANDLEASERATE;
        private List<DeedOwnerInfoModel> _DEEDOWNERINFO;

        public string REQID { get; set; }
        public string DOCRUNNO { get; set; }
        public string AGREEMENTNO { get; set; }
        public int AGREEMENTTYPEID { get; set; }
        public string AGREEMENTTYPENAME { get; set; }
        public int RECEIVEPERSONNUMBER { get; set; }
        public int SERVICEATTACHMENTFLAG { get; set; }
        public int PAYMENTOUTTERM { get; set; }
        public string PAYMENTOUTTERMTEXT { get; set; }
        public DateTime? FIRSTPAYMENTOUTDATE { get; set; }
        public string SFIRSTPAYMENTOUTDATE
        {
            get
            {
                return FIRSTPAYMENTOUTDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), FIRSTPAYMENTOUTDATE);
            }
            set { }
        }
        public string BCFIRSTPAYMENTOUTDATE
        {
            get
            {
                return FIRSTPAYMENTOUTDATE == null ? "-" : Constants.getDateBC(FIRSTPAYMENTOUTDATE);
            }
            set { }
        }
        public int PAYMENTOUTWITHINDATE { get; set; }
        public int LANDLEASETAXTYPEID { get; set; }
        public string LANDLEASETAXTYPETEXT { get; set; }
        public int SERVICETAXTYPEID { get; set; }
        public string SERVICETAXTYPETEXT { get; set; }
        public int FUTUREPAYMENTOUTFLAG { get; set; }
        public int FUTUREPAYMENTOUTTERM { get; set; }
        public DateTime? FUTUREPAYMENTOUTSTARTDATE { get; set; }
        public string SFUTUREPAYMENTOUTSTARTDATE
        {
            get
            {
                return FUTUREPAYMENTOUTSTARTDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), FUTUREPAYMENTOUTSTARTDATE);
            }
            set { }
        }
        public string BCFUTUREPAYMENTOUTSTARTDATE
        {
            get
            {
                return FUTUREPAYMENTOUTSTARTDATE == null ? "-" : Constants.getDateBC(FUTUREPAYMENTOUTSTARTDATE);
            }
            set { }
        }
        public DateTime? FUTUREPAYMENTOUTENDDATE { get; set; }
        public string SFUTUREPAYMENTOUTENDDATE
        {
            get
            {
                return FUTUREPAYMENTOUTENDDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), FUTUREPAYMENTOUTENDDATE);
            }
            set { }
        }
        public string BCFUTUREPAYMENTOUTENDDATE
        {
            get
            {
                return FUTUREPAYMENTOUTENDDATE == null ? "-" : Constants.getDateBC(FUTUREPAYMENTOUTENDDATE);
            }
            set { }
        }
        public int FUTURESERVICEPAYMENTOUTFLAG { get; set; }
        public int FUTURESERVICEPAYMENTOUTTERM { get; set; }
        public DateTime? FUTURESERVICEPAYMENTOUTSTARTDATE { get; set; }
        public string SFUTURESERVICEPAYMENTOUTSTARTDATE
        {
            get
            {
                return FUTURESERVICEPAYMENTOUTSTARTDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), FUTURESERVICEPAYMENTOUTSTARTDATE);
            }
            set { }
        }
        public string BCFUTURESERVICEPAYMENTOUTSTARTDATE
        {
            get
            {
                return FUTURESERVICEPAYMENTOUTSTARTDATE == null ? "-" : Constants.getDateBC(FUTURESERVICEPAYMENTOUTSTARTDATE);
            }
            set { }
        }
        public DateTime? FUTURESERVICEPAYMENTOUTENDDATE { get; set; }
        public string SFUTURESERVICEPAYMENTOUTENDDATE
        {
            get
            {
                return FUTURESERVICEPAYMENTOUTENDDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), FUTURESERVICEPAYMENTOUTENDDATE);
            }
            set { }
        }
        public string BCFUTURESERVICEPAYMENTOUTENDDATE
        {
            get
            {
                return FUTURESERVICEPAYMENTOUTENDDATE == null ? "-" : Constants.getDateBC(FUTURESERVICEPAYMENTOUTENDDATE);
            }
            set { }
        }
        public List<LessorInfoModel> LESSORINFO
        {
            get
            {
                return this._LESSORINFO == null ? new List<LessorInfoModel>() : this._LESSORINFO;
            }
            set
            {
                this._LESSORINFO = value;
            }
        }
        public List<ReceivePersonInfoModel> RECEIVEPERSONINFO
        {
            get
            {
                return this._RECEIVEPERSONINFO == null ? new List<ReceivePersonInfoModel>() : this._RECEIVEPERSONINFO;
            }
            set
            {
                this._RECEIVEPERSONINFO = value;
            }
        }
        public List<LandLeaseRateModel> LANDLEASERATE
        {
            get
            {
                return this._LANDLEASERATE == null ? new List<LandLeaseRateModel>() : this._LANDLEASERATE;
            }
            set
            {
                this._LANDLEASERATE = value;
            }
        }
        public string DEEDOWNER { get; set; }
        public List<DeedOwnerInfoModel> DEEDOWNERINFO {
            get
            {
                return this._DEEDOWNERINFO == null ? new List<DeedOwnerInfoModel>() : this._DEEDOWNERINFO;
            }
            set
            {
                this._DEEDOWNERINFO = value;
            }
        }
        public int HOUSEANDLANDTAX { get; set; }
        public string HOUSEANDLANDTAXNAME { get; set; }
        public int DEPOSITFLAG { get; set; }
        public string DEPOSITFLAGNAME {
            set { }
            get
            {
                return DEPOSITFLAG == 0 ? "ไม่ได้วางเงินประกัน" : "วางเงินประกัน";
            }
        }
        public Decimal DEPOSITAMOUNT { get; set; }
        public string SDEPOSITAMOUNT {
            set { }
            get
            {
                return DEPOSITAMOUNT.ToString("#,##0.00");
            }
        }
        public string DEPOSITREMARKS { get; set; }
        public int CANCELINFODATE { get; set; }

    }
}
