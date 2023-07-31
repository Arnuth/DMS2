using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.User.MODEL
{
    public class UserModel
    {
        public int USERID { get; set; }
        public string USERNAME { get; set; }
        public string USERPASS { get; set; }
        public string NAME_EN { get; set; }
        public string NAME_TH { get; set; }
        public string LASTNAME_EN { get; set; }
        public string LASTNAME_TH { get; set; }
        public string USEREMAIL { get; set; }
        public int USERCLASS { get; set; }
        public string USERCLASSTEXT { get; set; }
        public int USERSTATUS { get; set; }
        public string USERSTATUSTEXT { get; set; }
        public DateTime CREATEDATE { get; set; }
        public DateTime LASTUPDATE { get; set; }
        public string LASTUPDATEBY { get; set; }
        public List<UserPropertyModel> USERPROPERTY { get; set; }
}

    public class UserPropertyModel
    {
        public int TOPIC { get; set; }
        public int PROPERTY { get; set; }
        public string PROPERTYTYPE { get; set; }
        public int PROPERTYID { get; set; }
        public string PROPERTYNAME { get; set; }
        public string PROPERTYDESC_EN { get; set; }
        public string PROPERTYDESC_TH { get; set; }
    }
}
