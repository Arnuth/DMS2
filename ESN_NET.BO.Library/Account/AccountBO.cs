using ESN_NET.BO.Library.Menu;
using ESN_NET.BO.Library.User;
using ESN_NET.COMMON;
using ESN_NET.DBconnect.Account.DAO;
using ESN_NET.DBconnect.Account.MODEL;
using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.User.MODEL;

namespace ESN_NET.BO.Library.Account
{
    public class AccountBO
    {
        /// <Since 8 Febuary 2018> </Since>
        public AccountModel loginUser(UserModel model)
        {
            AccountModel result = new AccountModel();

            AccountDAO daoClass = new AccountDAO();
            result.MESSAGE = daoClass.loginUser(model);

            if (result.MESSAGE.MSGSTATUS == 0)
            {
                UserBO boUser = new UserBO();
                result.USER = boUser.getUserInformation(model.USERNAME);

                MenuBO boMenu = new MenuBO();
                result.LISTMENU = boMenu.getMenuListByUser(result.USER.USERCLASS.ToString());
            }

            return result;
        }

        /// <Since 13 Febuary 2018> </Since>
        public MessageModel requestPassword(UserModel model)
        {
            AccountDAO daoClass = new AccountDAO();
            MessageModel result = daoClass.checkEmail(model.USEREMAIL);

            if (result.MSGSTATUS == 0)
            {
                string password = Encode.CreateRandomPassword(8);
                model.USERPASS = Encode.hashPassword("MD5I", password);

                EmailSmtp email = new EmailSmtp();
                if (email.sendEmail("Request New Password form system.", "Your new password is " + password, model.USEREMAIL))
                {
                    result = daoClass.requestPassword(model);
                }
            }

            return result;
        }
    }
}
