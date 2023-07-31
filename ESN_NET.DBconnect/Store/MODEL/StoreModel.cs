using ESN_NET.DBconnect.Property.MODEL;
using System;

namespace ESN_NET.DBconnect.Store.MODEL
{
    public class StoreModel
    {
        public int STOREID { get; set; }
        public string COSTCENTER { get; set; }
        public string STORECODE { get; set; }
        public string STORENAME_EN { get; set; }
        public string STORENAME_TH { get; set; }
        public int AGREEMENTDOCNO { get; set; }
        public int LICENSEDOCNO { get; set; }
        public int SPACERENTALDOCNO { get; set; }
        public DateTime CREATEDATE { get; set; }
        public string CREATEBY { get; set; }
        public DateTime LASTUPDATE { get; set; }
        public string LASTUPDATEBY { get; set; }
        public int ACTIVE { get; set; }
        public PropertyModel PROVINCE { get; set; }
    }
}
