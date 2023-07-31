using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.User.MODEL;
using ESN_NET.DBconnect.Menu.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.Account.MODEL
{
    public class AccountModel
    {
        public UserModel USER { get; set; }
        public List<MenuModel> LISTMENU { get; set; }
        public MessageModel MESSAGE { get; set; }
    }
}
