angular.module('Application.AccountCtrl', [])

.controller('LogInCtrl', function ($scope, constants, Loading, Notification, ValueMangement, AccountAPI) {

    /* The LogInCtrl(Event Controller) sign at 09/02/2018 */

    $scope.loginUser = function (user) {

        if (user == undefined || ValueMangement.NoneString(user.username) == '' || ValueMangement.NoneString(user.password) == '') {
            Notification.notiFail("Enter your user name and password.");
            return;
        }

        try {
            Loading.showLoad();
           
            var data = {
                USERNAME: user.username,
                USERPASS: user.password
            }

            AccountAPI.loginUser(data).then(function (response) {
                
                if (response.MESSAGE.MSGSTATUS == 0) {
                    sessionStorage.setItem(constants.usersession, JSON.stringify(response));
                    window.location.href = '../Search/SEARCH_100';
                }
                else {
                    Loading.hideLoad();
                    Notification.notiFail(response.MESSAGE.MSGTEXT);
                }

            })
        } catch (e) {
            Loading.hideLoad();
            Notification.notiFail(e);
        }
    }
})

.controller('ForgotCtrl', function ($scope, constants, Loading, Notification, ValueMangement, AccountAPI) {

    /* The ForgotCtrl(Event Controller) sign at 09/02/2018 */

    $scope.requestPassword = function (emailUser) {

        if (ValueMangement.NoneString(emailUser) == '') {
            Notification.notiFail("Enter your email address.");
            return;
        }

        try {
            Loading.showLoad();

            var data = {
                USEREMAIL: emailUser
            }

            AccountAPI.requestPassword(data).then(function (response) {

                if (response.MSGSTATUS == 0) {
                    $("#login-box").addClass("visible");
                    $("#forgot-box").removeClass("visible");
                    Notification.notiSuccess(response.MSGTEXT);
                }
                else {
                    Notification.notiFail(response.MSGTEXT);
                }

                Loading.hideLoad();
            })
        } catch (e) {
            Loading.hideLoad();
            Notification.notiFail(e);
        }

    }
})

.controller('MenuCtrl', function ($scope, constants, Notification) {

    /* The MenuCtrl(Load Controller) sign at 09/02/2018 */
    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));
    var urlSession = JSON.parse(sessionStorage.getItem(constants.sessionUrl));
    var alertSession = JSON.parse(sessionStorage.getItem("alert"));

    $scope.menus = userSession.LISTMENU;

    $scope.showMenu = function (langSession, langClient) {
        return langSession == langClient ? true : false;
    }

    $scope.setNavigation = function (data) {
        sessionStorage.removeItem(window.location.pathname);
        sessionStorage.setItem(constants.sessionUrl, JSON.stringify(data));
    }

    //Alert notification.
    if (alertSession != null) {
        Notification.notiSuccess(alertSession.MSGTEXT);
        sessionStorage.removeItem("alert");
    }

    setTimeout(function () {
        $scope.$apply(function () {
            $scope.navi = JSON.parse(sessionStorage.getItem(constants.sessionUrl));
        }, true);
    });

    getMenuDesciprtion(userSession.LISTMENU);

    function getMenuDesciprtion(listMenu) {
        if (window.location.pathname == "/REPORT/RPT_100") {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.navi = { MAINMENU_DESC: 'รายงาน' }
                }, true);
            });
        }
        else {
            for (var i = 0; i < listMenu.length; i++) {
                if (listMenu[i].MENUVIEWID == window.location.pathname.split('/')[2]) {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.navi = listMenu[i];
                        }, true);
                    });
                    break;
                }
            }
        }
    }

})

.controller('UserSettingCtrl', function ($scope, constants, Loading, Notification) {

    /* The UserSettingCtrl(Load Controller) sign at 09/02/2018 */
    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    if (userSession == null) {
        window.location.href = "../Account/LogIn";
    }

    sessionStorage.setItem(constants.culture, document.getElementById("culture").value);

    $scope.user = userSession.USER;

    $scope.showName = function (langSession,langClient) {
        return langSession == langClient ? true : false;
    }

    $scope.logout = function (data) {
        sessionStorage.removeItem(constants.usersession);
        window.location.href = '../Account/LogIn'
    }
})

//.controller('NotificationCtrl', function ($scope, constants, Loading, Notification) {

//    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));
//    if (userSession == null) {
//        window.location.href = "../Account/Logon";
//    }

//    //var starCountRef = firebase.database().ref(userSession.USER.USERNAME);
//    //starCountRef.on('value', function (snapshot) {
//    //    $scope.notis = [];
//    //    snapshot.forEach(function (childSnapshot) {
//    //        setTimeout(function () {
//    //            $scope.$apply(function () {
//    //                $scope.notiCount = snapshot.numChildren();
//    //                $scope.notis.push(childSnapshot.val());
//    //            });
//    //        }, true);
//    //    });
//    //});

//})
