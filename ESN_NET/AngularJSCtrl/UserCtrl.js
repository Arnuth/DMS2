angular.module('Application.UserCtrl', [])

.controller('USER_100_Ctrl', function ($scope, $timeout, constants, language, Loading, Notification, ValueMangement, Dropdownlist, Table, UserAPI, UserClassAPI, PropertyAPI) {

    /* The USER_100_Ctrl(PageLoad Controller) sign at 27/02/2018 */

    $scope.loadingCounter = 0;

    try {
        Loading.showLoad();

        $scope.loadingCounter++;
        UserAPI.getUserList()
            .then(handleUserListResponse)
            .always(cleanup);

        $scope.loadingCounter++;
        UserClassAPI.getUserClassList()
            .then(handleUserClassResponse)
            .always(cleanup);

        $scope.loadingCounter++;
        PropertyAPI.getPropertyTopic("?language=" + sessionStorage.getItem(constants.culture) + '&type=USER')
            .then(handleTopicResponse)
            .always(cleanup);

        $scope.loadingCounter++;
        PropertyAPI.getPropertyList("?language=" + sessionStorage.getItem(constants.culture))
            .then(handlePropertyResponse)
            .always(cleanup);

    } catch (e) {
        Loading.hideLoad();
        Notification.notiFail(e);
    }

     ////////////===============================================================================

    function handleUserListResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            Table.tableDestroy('#dynamic-table');
            $scope.users = response;

            $timeout(function () {
                Table.tableDefault('#dynamic-table');

                angular.element(document)
                    .off('click touchstart', handleDocumentClickTouchStart)
                    .on('click touchstart', handleDocumentClickTouchStart);
            })
        }
    }

    function handleUserClassResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.classs = response;

            $timeout(function () {
                angular.element("#searchUserClass").trigger("chosen:updated");
                Dropdownlist.chnageUI('100%');
            })
        }
    }

    function handleTopicResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.topics = response;

            $timeout(function () {
                for (var i = 0; i < $scope.topics.length; i++) {
                    angular.element("#search" + $scope.topics[i].PROPERTY).trigger("chosen:updated");
                }
                
                Dropdownlist.chnageUI('100%');
            })
        }
    }

    function handlePropertyResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.properties = response;

            $timeout(function () {
                for (var i = 0; i < $scope.topics.length; i++) {
                    angular.element("#search" + $scope.topics[i].PROPERTY).trigger("chosen:updated");
                }

                Dropdownlist.chnageUI('100%');
            })
        }
    }

    function cleanup() {
        if (--$scope.loadingCounter === 0) {
            Loading.hideLoad();
        }
    }

    ////////////===============================================================================

    /* The USER_100_Ctrl(Event Controller) sign at 27/02/2018 */
    $scope.getUserPropertyByUser = function (event, data) {
        var thisEl = event.target;

        angular.element('.popover_parent > a').not(thisEl).parent().removeClass('active');
        angular.element(thisEl).parent().toggleClass('active');
        angular.element('.search input[type="text"]').focus();
        
        UserAPI.getUserPropertyByUser(data, sessionStorage.getItem(constants.culture)).then(function (response) {
            //setTimeout(function () {
            $scope.$apply(function () {
                $scope.userproperties = response;
            });
            //}, true);
        });
    }

    $scope.showProperty = function (langSession, langClient) {
        return langSession == langClient;
    }

    $scope.modalUser = function (data) {
        $scope.user = data;

        UserAPI.getUserPropertyByUser(data, sessionStorage.getItem(constants.culture)).then(handleGetUser);

        angular.element("#updUserclass").val(data.USERCLASS).trigger("chosen:updated");

        //==============================================================================================
        function handleGetUser(response) {

            var property = response.map(mapGetUserResponse).join('').split('|');
            $scope.topics.forEach(handleForEachTopic);

            //==============================================================================================
            function mapGetUserResponse(prop) {
                return '{ "TOPIC" : ' + prop.PROPERTY + ', "PROPERTY" : ' + prop.PROPERTYID + ' }|'
            }

            function handleForEachTopic(topic) {
                angular.element("#" + topic.PROPERTY).val(property).trigger("chosen:updated");
            }

        }
    }

    $scope.updateUser = function (data) {

        if (data == undefined) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillInformation, sessionStorage.getItem(constants.culture)));
            return;
        }

        if (ValueMangement.NoneString(data.USERNAME) == '') {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillUsername, sessionStorage.getItem(constants.culture)));
            return;
        }

        if (ValueMangement.NoneString(data.NAME_EN) == '') {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillName, sessionStorage.getItem(constants.culture)));
            return;
        }

        if (ValueMangement.NoneString(data.LASTNAME_EN) == '') {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillSurname, sessionStorage.getItem(constants.culture)));
            return;
        }

        if (ValueMangement.NoneString(data.USEREMAIL) == '') {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillEmail, sessionStorage.getItem(constants.culture)));
            return;
        }

        data.USERCLASS = $("#updUserclass").val();

        var listProperty = "";

        for (var i = 0; i < $scope.topics.length; i++) {
            if ($("#" + $scope.topics[i].PROPERTY).val() != null) {
                listProperty += $("#" + $scope.topics[i].PROPERTY).val() + ",";
            }
        }

        listProperty = listProperty.substring(0, listProperty.length - 1);

        var property = JSON.parse('[' + listProperty + "]");
        data.USERPROPERTY = property;

        Loading.showLoad();

        UserAPI.updateUser(data, sessionStorage.getItem(constants.culture)).then(function (response) {
            if (response.MSGSTATUS == 0) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        Loading.hideLoad();
                        getUserList();
                        Notification.notiSuccess(response.MSGTEXT);
                        $('#modal-table').modal('hide');
                    });
                }, true);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        });
    }

    $scope.inactiveUser = function (data) {

        data.USERSTATUS = 1;

        UserAPI.changestatusUser(data, sessionStorage.getItem(constants.culture)).then(function (response) {
            if (response.MSGSTATUS == 0) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        getUserList();
                        Notification.notiSuccess(response.MSGTEXT);
                    });
                }, true);
            }
            else {
                Notification.notiFail(response.MSGTEXT);
            }
        });
    }

    $scope.activeUser = function (data) {

        data.USERSTATUS = 0;

        UserAPI.changestatusUser(data, sessionStorage.getItem(constants.culture)).then(function (response) {
            if (response.MSGSTATUS == 0) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        getUserList();
                        Notification.notiSuccess(response.MSGTEXT);
                    });
                }, true);
            }
            else {
                Notification.notiFail(response.MSGTEXT);
            }
        });
    }

    $scope.getUserByProperty = function (data) {

        Loading.showLoad();

        if (data == undefined && $scope.search == undefined) {
            data = {};
        }
        else if (data == undefined) {
            data = $scope.search;
        }

        var listProperty = $scope.topics
            .map(function mapTopics(prop) {
                return angular.element('#search' + prop.PROPERTY).val();
            }).filter(function filterTopics(val) {
                return !!val;
            }).join(',');

        data.USERPROPERTY = JSON.parse('[' + listProperty + ']');;
        data.USERCLASS = angular.element('#searchUserClass').val();

        UserAPI.getUserByProperty(data).then(function (response) {
            $timeout(function () {
                $scope.$apply(function () {
                    Loading.hideLoad();
                    Table.tableDestroy('#dynamic-table');
                    $scope.users = response;
                });

                Table.tableDefault('#dynamic-table');

                angular.element(document)
                    .off('click touchstart', handleDocumentClickTouchStart)
                    .on('click touchstart', handleDocumentClickTouchStart);

            });
        });
    }


    /* The USER_100_Ctrl(Function Controller) sign at 27/02/2018 */
    function getUserList() {
        UserAPI.getUserList().then(function (response) {
            setTimeout(function () {
                $scope.$apply(function () {
                    Loading.hideLoad();
                    Table.tableDestroy('#dynamic-table');
                    $scope.users = response;
                });

                Table.tableDefault('#dynamic-table');

                angular.element(document)
                    .off('click touchstart', handleDocumentClickTouchStart)
                    .on('click touchstart', handleDocumentClickTouchStart);

            }, true);
        });
    }

    //-----------------------------------------------------------------------------

    function handleDocumentClickTouchStart(event) {
        if (!$(event.target).closest('.popover_parent').length) {
            $('.popover_parent.active').removeClass('active');
        }
    }
})

.controller('USER_200_Ctrl', function ($scope, constants, language, Loading, Notification, ValueMangement, Dropdownlist, UserAPI, UserClassAPI, PropertyAPI) {

    /* The USER_200_Ctrl(PageLoad Controller) sign at 23/02/2018 */
    try {
        Loading.showLoad();

        UserClassAPI.getUserClassList().then(function (response) { $scope.classs = response; });

        PropertyAPI.getPropertyTopic("?language=" + sessionStorage.getItem(constants.culture) + '&type=USER').then(function (response) { $scope.topics = response; });

        PropertyAPI.getPropertyList("?language=" + sessionStorage.getItem(constants.culture)).then(function (response) {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.properties = response;
                    Loading.hideLoad();
                });
                Dropdownlist.chnageUI('41.66%');
            }, true);
        });
    } catch (e) {
        Loading.hideLoad();
        Notification.notiFail(e);
    }


    /* The USER_200_Ctrl(Event Controller) sign at 23/02/2018 */
    $scope.showProperty = function (langSession, langClient) {
        return langSession == langClient ? true : false;
    }

    $scope.insertUser = function (data) {

        if (data == undefined) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillInformation, sessionStorage.getItem(constants.culture)));
            return;
        }

        if (ValueMangement.NoneString(data.USERNAME) == '') {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillUsername, sessionStorage.getItem(constants.culture)));
            return;
        }

        if (ValueMangement.NoneString(data.USERPASS) == '') {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillPassword, sessionStorage.getItem(constants.culture)));
            return;
        }

        if (ValueMangement.NoneString(data.USERPASS) != ValueMangement.NoneString(data.USERREPASS)) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.correctPassword, sessionStorage.getItem(constants.culture)));
            return;
        }

        if (ValueMangement.NoneString(data.NAME_EN) == '') {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillName, sessionStorage.getItem(constants.culture)));
            return;
        }

        if (ValueMangement.NoneString(data.LASTNAME_EN) == '') {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillSurname, sessionStorage.getItem(constants.culture)));
            return;
        }

        if (ValueMangement.NoneString(data.USEREMAIL) == '') {
            Notification.notiWarn(ValueMangement.CultureSetting(language.fillEmail, sessionStorage.getItem(constants.culture)));
            return;
        }

        var listProperty = "";

        for (var i = 0; i < $scope.topics.length; i++) {
            if ($("#" + $scope.topics[i].PROPERTY).val() != null) {
                listProperty += $("#" + $scope.topics[i].PROPERTY).val() + ",";
            }
        }

        data.USERCLASS = $("#USERCLASS").val();

        listProperty = listProperty.substring(0, listProperty.length - 1);

        var property = JSON.parse('[' + listProperty + "]");
        data.USERPROPERTY = property;

        Loading.showLoad();

        UserAPI.insertUser(data, sessionStorage.getItem(constants.culture)).then(function (response) {
            if (response.MSGSTATUS == 0) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.clearData();
                        Loading.hideLoad();
                        Notification.notiSuccess(response.MSGTEXT);
                    });
                }, true);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        });
    }

    $scope.clearData = function () {
        $scope.user = undefined;

        for (var i = 0; i < $scope.topics.length; i++) {
            $("#" + $scope.topics[i].PROPERTY).val('').trigger("chosen:updated");
        }
    }
})

.controller('USER_003_Ctrl', function ($scope, constants, language, Loading, Notification, ValueMangement, UserAPI) {

    $scope.changePasswordUser = function (oldpass, newpass, confirmpass) {

        try {
            if (ValueMangement.NoneString(oldpass) == '') {
                Notification.notiWarn(ValueMangement.CultureSetting(language.fillPassword, sessionStorage.getItem(constants.culture)));
                return;
            }

            if (ValueMangement.NoneString(newpass) == '') {
                Notification.notiWarn(ValueMangement.CultureSetting(language.fillPassword, sessionStorage.getItem(constants.culture)));
                return;
            }

            if (ValueMangement.NoneString(newpass) != ValueMangement.NoneString(confirmpass)) {
                Notification.notiWarn(ValueMangement.CultureSetting(language.correctPassword, sessionStorage.getItem(constants.culture)));
                return;
            }

            Loading.showLoad();
            var data = '?username=' + JSON.parse(sessionStorage.getItem(constants.usersession)).USER.USERNAME + '&oldpass=' + oldpass + '&newpass=' + newpass + '&language=' + sessionStorage.getItem(constants.culture);

            UserAPI.changePasswordUser(data).then(function (response) {
                if (response.MSGSTATUS == 0) {
                    Loading.hideLoad();

                    $scope.$apply(function () {
                        $scope.oldpass = '';
                        $scope.newpass = '';
                        $scope.confirmnewpass = '';
                    });
                    Notification.notiSuccess(response.MSGTEXT);
                }
                else {
                    Loading.hideLoad();
                    Notification.notiWarn(response.MSGTEXT);
                }
            });
        } catch (e) {
            Loading.hideLoad();
            Notification.notiWarn(e);
        }
    }

})