using ESN_NET.COMMON;
using ESN_NET.DBconnect.FileAttachment.MODEL;
using System;
using System.Collections.Generic;

namespace ESN_NET.DBconnect.Request.MODEL
{
    public class RequestModel
    {
        public string REQID { get; set; }
        public string DOCRUNNO { get; set; }
        public int? DOCNO { get; set; }
        public string STORECODE { get; set; }
        public string STORENAME { get; set; }
        public int DOCTYPEID { get; set; }
        public string DOCTYPENAME { get; set; }
        public int REQUESTSTATUS { get; set; }
        public string REQUESTSTATUSNAME { get; set; }
        public DateTime? REQUESTDATE { get; set; }
        public string SREQUESTDATE
        {
            get
            {
                return REQUESTDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), REQUESTDATE);
            }
            set { }
        }
        public DateTime? DOC_CREATEDATE { get; set; }
        public string SDOC_CREATEDATE
        {
            get
            {
                return DOC_CREATEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), DOC_CREATEDATE);
            }
            set { }
        }
        public string BCDOC_CREATEDATE
        {
            get
            {
                return DOC_CREATEDATE == null ? "-" : Constants.getDateBC(DOC_CREATEDATE);
            }
            set { }
        }
        public DateTime? DOC_EFFECTIVEDATE { get; set; }
        public string SDOC_EFFECTIVEDATE
        {
            get
            {
                return DOC_EFFECTIVEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), DOC_EFFECTIVEDATE);
            }
            set { }
        }
        public string BCDOC_EFFECTIVEDATE
        {
            get
            {
                return DOC_EFFECTIVEDATE == null ? "-" : Constants.getDateBC(DOC_EFFECTIVEDATE);
            }
            set { }
        }
        public DateTime? DOC_EXPIREDATE { get; set; }
        public string SDOC_EXPIREDATE
        {
            get
            {
                return DOC_EXPIREDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), DOC_EXPIREDATE);
            }
            set { }
        }
        public string BCDOC_EXPIREDATE
        {
            get
            {
                return DOC_EXPIREDATE == null ? "-" : Constants.getDateBC(DOC_EXPIREDATE);
            }
            set { }
        }
        public DateTime? DOC_CANCELDATE { get; set; }
        public string SDOC_CANCELDATE
        {
            get
            {
                return DOC_CANCELDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), DOC_CANCELDATE);
            }
            set { }
        }
        public string BCDOC_CANCELDATE
        {
            get
            {
                return DOC_CANCELDATE == null ? "-" : Constants.getDateBC(DOC_CANCELDATE);
            }
            set { }
        }
        public int USERREQUESTID { get; set; }
        public string USERREQUESTNAME { get; set; }
        public int USERVERIFYID { get; set; }
        public string USERVERIFYNAME { get; set; }
        public DateTime? VERIFYDATE { get; set; }
        public string SVERIFYDATE
        {
            get
            {
                return VERIFYDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), VERIFYDATE);
            }
            set { }
        }
        public int NOTICENUMBER_EXPIRE { get; set; }
        public string NOTICEUNIT_EXPIRE { get; set; }
        public string NOTICEDISPLAY_EXPIRE
        {
            get
            {
                if (NOTICEUNIT_EXPIRE == "DAY")
                {
                    return NOTICENUMBER_EXPIRE.ToString() + " วัน";
                }
                else if (NOTICEUNIT_EXPIRE == "MONTH")
                {
                    return NOTICENUMBER_EXPIRE.ToString() + " เดือน";
                }
                else if (NOTICEUNIT_EXPIRE == "YEAR")
                {
                    return NOTICENUMBER_EXPIRE.ToString() + " ปี";
                }
                else
                {
                    return "ไม่ได้ตั้งการแจ้งเตือน";
                }
            }
            set { }
        }
        public int NOTICENUMBER_PAYOUT { get; set; }
        public string NOTICEUNIT_PAYOUT { get; set; }
        public string NOTICEDISPLAY_PAYOUT
        {
            get
            {
                if (NOTICEUNIT_PAYOUT == "DAY")
                {
                    return NOTICENUMBER_PAYOUT.ToString() + " วัน";
                }
                else if (NOTICEUNIT_PAYOUT == "MONTH")
                {
                    return NOTICENUMBER_PAYOUT.ToString() + " เดือน";
                }
                else if (NOTICEUNIT_PAYOUT == "YEAR")
                {
                    return NOTICENUMBER_PAYOUT.ToString() + " ปี";
                }
                else
                {
                    return "ไม่ได้ตั้งการแจ้งเตือน";
                }
            }
            set { }
        }
        public int NOTICENUMBER_INSURANCE { get; set; }
        public string NOTICEUNIT_INSURANCE { get; set; }
        public string NOTICEDISPLAY_INSURANCE
        {
            get
            {
                if (NOTICEUNIT_INSURANCE == "DAY")
                {
                    return NOTICENUMBER_INSURANCE.ToString() + " วัน";
                }
                else if (NOTICEUNIT_INSURANCE == "MONTH")
                {
                    return NOTICENUMBER_INSURANCE.ToString() + " เดือน";
                }
                else if (NOTICEUNIT_PAYOUT == "YEAR")
                {
                    return NOTICENUMBER_INSURANCE.ToString() + " ปี";
                }
                else
                {
                    return "ไม่ได้ตั้งการแจ้งเตือน";
                }
            }
            set { }
        }
        public int NOTICENUMBER_CARACT { get; set; }
        public string NOTICEUNIT_CARACT { get; set; }
        public string NOTICEDISPLAY_CARACT
        {
            get
            {
                if (NOTICEUNIT_CARACT == "DAY")
                {
                    return NOTICENUMBER_CARACT.ToString() + " วัน";
                }
                else if (NOTICEUNIT_CARACT == "MONTH")
                {
                    return NOTICENUMBER_CARACT.ToString() + " เดือน";
                }
                else if (NOTICEUNIT_CARACT == "YEAR")
                {
                    return NOTICENUMBER_CARACT.ToString() + " ปี";
                }
                else
                {
                    return "ไม่ได้ตั้งการแจ้งเตือน";
                }
            }
            set { }
        }
        public int NOTICENUMBER_VEHICLETAX { get; set; }
        public string NOTICEUNIT_VEHICLETAX { get; set; }
        public string NOTICEDISPLAY_VEHICLETAX
        {
            get
            {
                if (NOTICEUNIT_VEHICLETAX == "DAY")
                {
                    return NOTICENUMBER_VEHICLETAX.ToString() + " วัน";
                }
                else if (NOTICEUNIT_VEHICLETAX == "MONTH")
                {
                    return NOTICENUMBER_VEHICLETAX.ToString() + " เดือน";
                }
                else if (NOTICEUNIT_VEHICLETAX == "YEAR")
                {
                    return NOTICENUMBER_VEHICLETAX.ToString() + " ปี";
                }
                else
                {
                    return "ไม่ได้ตั้งการแจ้งเตือน";
                }
            }
            set { }
        }

        public string DOCREFID { get; set; }
        public string DOCRUNNOOLD { get; set; }
        public int LASTREVISIONFLAG { get; set; }
        public string REMARKS { get; set; }
        public string VERIFYREMARKS { get; set; }
        public DateTime? CREATEDATE { get; set; }
        public string SCREATEDATE
        {
            get
            {
                return CREATEDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), CREATEDATE);
            }
            set { }
        }
        public DateTime? LASTUPDATE { get; set; }
        public string SLASTUPDATE
        {
            get
            {
                return LASTUPDATE == null ? "-" : String.Format(GetConfig.getAppSetting(Constants.FORMATDATE), LASTUPDATE);
            }
            set { }
        }
        public string BCLASTUPDATE
        {
            get
            {
                return LASTUPDATE == null ? "-" : Constants.getDateBC(LASTUPDATE);
            }
            set { }
        }
        public int REVISIONTYPE { get; set; }
        public string CREATEDBY { get; set; }
        public string LASTUPDATEBY { get; set; }
        public int DOC_INSURANCEREFUNDFLAG { get; set; }
        public string DOC_INSURANCEREFUNDFLAGTEXT
        {
            get
            {
                if (DOC_INSURANCEREFUNDFLAG == 1)
                {
                    return "ไม่คืนเงินประกัน";
                }
                else if (DOC_INSURANCEREFUNDFLAG == 2)
                {
                    return "คืนเงินประกัน";
                }
                return "";
            }
            set { }
        }
        public List<FileAttachmentModel> FILEATTACHMENT { get; set; }

        public string VEHICLEALERTTYPENAME { get; set; }
    }
}
