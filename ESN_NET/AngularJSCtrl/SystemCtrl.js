angular.module('Application.SystemCtrl', [])

.controller('SYS_100_Ctrl', function ($scope, constants, Loading, Notification, ValueMangement, Table, MenuAPI) {

    /* The SYS_100_Ctrl(PageLoad Controller) sign at 12/02/2018 */
    try {
        Loading.showLoad();
        MenuAPI.getMenuList(null).then(function (response) {
            setTimeout(function () {
                $scope.$apply(function () {
                    Loading.hideLoad();
                    $scope.menus = response;
                    $scope.chkMenu = false;
                });
            }, true);
        })
    } catch (e) {
        Loading.hideLoad();
        Notification.notiFail(e);
    }


    /* The SYS_100_Ctrl(Event Controller) sign at 13/02/2018 */
    $scope.setMenuConfig = function (userClass, menu, value, session) {
        var msg = "?userClass=" + userClass;
        msg += "&menu=" + menu;
        msg += "&status=" + value;
        msg += "&language=" + session;

        MenuAPI.setMenuConfig(msg).then(function (response) {
            $scope.$apply(function () {
                if (response.MSGSTATUS == 0) {
                    Notification.notiSuccess(response.MSGTEXT);
                }
                else {
                    Notification.notiWarn(response.MSGTEXT);
                }
            });
        });
    };

    $scope.setTextHeader = function (key) {
        if (key == 'MENU') {
            return "ลำดับ";
        }
        else if (key == 'MAINMENU') {
            return "เมนูหลัก";
        }
        else if (key == 'SUBMENUDESC_TH') {
            return "เมนูย่อย";
        }
        else {
            return key
        }
    }
})

.controller('SYS_200_Ctrl', function ($scope, constants, language, Loading, Notification, ValueMangement, Table, UserClassAPI) {

    /* The SYS_200_Ctrl(PageLoad Controller) sign at 12/02/2018 */
    try {
        Loading.showLoad();
        getUserClassList();
    } catch (e) {
        Loading.hideLoad();
        Notification.notiFail(e);
    }

  
    /* The SYS_200_Ctrl(Event Controller) sign at 13/02/2018 */

    $scope.addUserClass = function (culture) {
        bootbox.prompt({
            title: ValueMangement.CultureSetting(language.addUserClass, culture),
            callback: function (value) {
                if (ValueMangement.CheckValue(value)) {
                    Loading.showLoad();

                    var data = {
                        USERCLASSTEXT: value,
                        LANGUAGE: culture
                    }

                    UserClassAPI.addUserClass(data).then(function (response) {
                        setTimeout(function () {
                            $scope.$apply(function () {
                                getUserClassList();
                                response.MSGSTATUS == 0 ? Notification.notiSuccess(response.MSGTEXT) : Notification.notiFail(response.MSGTEXT);
                            });
                        }, true);
                    })
                }
            }
        });
    }

    $scope.editUserClass = function (culture, userClass) {
        bootbox.prompt({
            title: ValueMangement.CultureSetting(language.editUserClass, culture),
            value: userClass.USERCLASSTEXT,
            callback: function (value) {
                if (ValueMangement.CheckValue(value)) {
                    Loading.showLoad();

                    var data = {
                        USERCLASS: userClass.USERCLASS,
                        USERCLASSTEXT: value,
                        LANGUAGE: culture
                    }

                    UserClassAPI.editUserClass(data).then(function (response) {
                        setTimeout(function () {
                            $scope.$apply(function () {
                                getUserClassList();
                                response.MSGSTATUS == 0 ? Notification.notiSuccess(response.MSGTEXT) : Notification.notiFail(response.MSGTEXT);
                            });
                        }, true);
                    })
                }
            } 
        });
    }

    $scope.deleteUserClass = function (culture, userClass) {
        bootbox.dialog({
            message: "<span class='bigger-110'>" + ValueMangement.CultureSetting(language.deleteUserClass, culture) + "</span>",
            buttons:
            {
                "delete":
                {
                    "label": ValueMangement.CultureSetting(language.delete, culture),
                    "className": "btn-sm btn-danger",
                    "callback": function () {
                        Loading.showLoad();

                        var data = {
                            USERCLASS: userClass.USERCLASS,
                            LANGUAGE: culture
                        }

                        UserClassAPI.deleteUserClass(data).then(function (response) {
                            setTimeout(function () {
                                $scope.$apply(function () {
                                    getUserClassList();
                                    response.MSGSTATUS == 0 ? Notification.notiSuccess(response.MSGTEXT) : Notification.notiFail(response.MSGTEXT);
                                });
                            }, true);
                        })
                    }
                },
                "cancel":
                {
                    "label": ValueMangement.CultureSetting(language.cancel, culture),
                    "className": "btn-sm"
                }
            }
        });

    }


    /* The SYS_200_Ctrl(Function Controller) sign at 13/02/2018 */

    function getUserClassList() {
        UserClassAPI.getUserClassList(null).then(function (response) {
            setTimeout(function () {
                $scope.$apply(function () {
                    Loading.hideLoad();
                    Table.tableDestroy('#dynamic-table');
                    $scope.userClasss = response;
                });
                Table.tableDefault('#dynamic-table');
            }, true);
        })
    }
})

.controller('SYS_300_Ctrl', function ($scope, $timeout, constants, language, Loading, Notification, ValueMangement, Table, Chart, PropertyAPI) {

    /* The SYS_300_Ctrl(PageLoad Controller) sign at 12/02/2018 */
    try {
        Loading.showLoad();
        getPropertyCount();
        getPropertyTopic();
    } catch (e) {
        Loading.hideLoad();
        Notification.notiFail(e);
    }


    /* The SYS_300_Ctrl(Event Controller) sign at 20/02/2018 */
    //$scope.filterProperty = function (criteria) {
    //    return function (property) {
    //        if (property.PROPERTY === criteria) {
    //            return true;
    //        }
    //        return false;
    //    };
    //}

    $scope.createNewProperty = function (data, lang) {
        if (data == undefined){
            Notification.notiWarn(ValueMangement.CultureSetting(language.validatePropertyTopic, lang));
        }
        else if (ValueMangement.NoneString(data.PROPERTYTYPE).length < 3) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.validatePropertyTopic, lang));
        }
        else if (ValueMangement.NoneString(data.PROPERTYDESC_EN).length < 3)  {
            Notification.notiWarn(ValueMangement.CultureSetting(language.validatePropertyTopicNameEN, lang));
        }
        else if (ValueMangement.NoneString(data.PROPERTYDESC_TH).length < 3) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.validatePropertyTopicNameTH, lang));
        }
        else {
            Loading.showLoad();
            PropertyAPI.createNewProperty(data, lang).then(function (response) {
                console.log(response);
                if (response.MSGSTATUS == 0) {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            getPropertyTopic();
                        });
                    }, true);
                    getPropertyCount('Set');
                    Notification.notiSuccess(response.MSGTEXT);
                }
                else {
                    Notification.notiFail(response.MSGTEXT);
                    Loading.hideLoad();
                }
            })
        }
    }

    $scope.clearCreateNewProperty = function () {
        $scope.create = undefined;
    }

    $scope.setUserProperty = function (property, status) {
        var data = "?property=" + property;
        data += "&status=" + (status ? '0' : 1);
        data += "&language=EN";
        
        PropertyAPI.setUserProperty(data).then(function (response) {
            if (response.MSGSTATUS == 0) {
                Notification.notiSuccess(response.MSGTEXT);
            }
            else {
                Notification.notiWarn(response.MSGTEXT);
            }
        });
    }

    $scope.setDocProperty = function (property, status) {
        var data = "?property=" + property;
        data += "&status=" + (status ? '0' : 1);
        data += "&language=EN";

        PropertyAPI.setDocProperty(data).then(function (response) {
            if (response.MSGSTATUS == 0) {
                Notification.notiSuccess(response.MSGTEXT);
            }
            else {
                Notification.notiWarn(response.MSGTEXT);
            }
        });
    }

    $scope.setEditPropertyTopicName = function (language, prop) {
        $scope.edit = Object.assign({}, prop);
    }

    $scope.editPropertyTopicName = function (property, lang) {
        if (ValueMangement.NoneString(property.PROPERTYDESC_EN).length < 3) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.validatePropertyTopicNameEN, lang));
        }
        else if (ValueMangement.NoneString(property.PROPERTYDESC_TH).length < 3) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.validatePropertyTopicNameTH, lang));
        }
        else {
            Loading.showLoad();
            PropertyAPI.editPropertyTopicName(property, lang).then(function (response) {
                if (response.MSGSTATUS == 0) {
                    getPropertyCount();
                    getPropertyTopic();
                    Notification.notiSuccess(response.MSGTEXT);
                }
                else {
                    Notification.notiFail(response.MSGTEXT);
                    Loading.hideLoad();
                }
            });
        }
    }

    $scope.setAddSubProperty = function (property) {
        $scope.createSub = Object.assign({}, property);
        $scope.createSub.PROPERTYDESC_EN = "";
        $scope.createSub.PROPERTYDESC_TH = "";
    }

    $scope.addSubProperty = function (property, lang) {
        if (ValueMangement.NoneString(property.PROPERTYNAME) < 3) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.validateSubPropertyName, lang));
        }
        else if (ValueMangement.NoneString(property.PROPERTYDESC_EN) < 3){
            Notification.notiWarn(ValueMangement.CultureSetting(language.validateSubPropertyTopicNameEN, lang));
        }
        else if (ValueMangement.NoneString(property.PROPERTYDESC_TH) < 3){
            Notification.notiWarn(ValueMangement.CultureSetting(language.validateSubPropertyTopicNameTH, lang));
        }
        else {
            Loading.showLoad();
            PropertyAPI.addSubProperty(property, lang).then(function (response) {
                if (response.MSGSTATUS == 0) {
                    getPropertyCount();
                    getPropertyTopic();
                    Notification.notiSuccess(response.MSGTEXT);
                }
                else {
                    Notification.notiFail(response.MSGTEXT);
                    Loading.hideLoad();
                }
            })
        }
    }

    $scope.setEditSubProperty = function (property) {
        $scope.editSub = Object.assign({}, property);
    }

    $scope.editSubProperty = function (property, lang) {
        if (ValueMangement.NoneString(property.PROPERTYNAME) < 3) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.validateSubPropertyName, lang));
        }
        else if (ValueMangement.NoneString(property.PROPERTYDESC_EN) < 3) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.validateSubPropertyTopicNameEN, lang));
        }
        else if (ValueMangement.NoneString(property.PROPERTYDESC_TH) < 3) {
            Notification.notiWarn(ValueMangement.CultureSetting(language.validateSubPropertyTopicNameTH, lang));
        }
        else {
            PropertyAPI.editSubProperty(property, lang).then(function (response) {
                if (response.MSGSTATUS == 0) {
                    getPropertyCount();
                    getPropertyTopic();
                    Notification.notiSuccess(response.MSGTEXT);
                }
                else {
                    Notification.notiFail(response.MSGTEXT);
                    Loading.hideLoad();
                }
            })
        }
    }

    $scope.setDeleteSubProperty = function (property) {
        $scope.deleteSub = Object.assign({}, property);
    }

    $scope.deleteSubProperty = function (property, lang) {
        bootbox.dialog({
            message: "<span class='bigger-110'>" + ValueMangement.CultureSetting(language.deleteSubProperty, lang) + " \"" + property.PROPERTYTYPE + " - " + property.PROPERTYNAME + "\" ?</span>",
            buttons:
            {
                "delete":
                {
                    "label": ValueMangement.CultureSetting(language.delete, lang),
                    "className": "btn-sm btn-danger",
                    "callback": function () {
                        Loading.showLoad();
                        
                        PropertyAPI.deleteSubProperty(property, lang).then(function (response) {
                            if (response.MSGSTATUS == 0) {
                                getPropertyCount();
                                getPropertyTopic();
                                Notification.notiSuccess(response.MSGTEXT);
                            }
                            else {
                                Notification.notiFail(response.MSGTEXT);
                                Loading.hideLoad();
                            }
                        })
                    }
                },
                "cancel":
                {
                    "label": ValueMangement.CultureSetting(language.cancel, lang),
                    "className": "btn-sm"
                }
            }
        });
        
    }
    

    /* The SYS_300_Ctrl(Function Controller) sign at 19/02/2018 */

    function getPropertyTopic() {
        PropertyAPI.getPropertyTopic("?language=" + sessionStorage.getItem(constants.culture)).then(function (response) {
            $timeout(function () {
                $scope.$apply(function () {
                    $scope.topics = response;
                    $scope.ckUser = false;
                    $scope.ckDoc = false;
                    getPropertyList();
                });
            });
        })
    }

    function getPropertyList() {
        PropertyAPI.getPropertyList("?language=" + sessionStorage.getItem(constants.culture))
            .then(function (response) {
                $timeout(function () {
                    // reconstruct data instead of using filter in page for performance reason
                    $scope.propertys = {};

                    var item, lid;
                    while (response.length) {
                        item = response.shift();
                        lid = '' + item.PROPERTY;

                        $scope.propertys[lid] = $scope.propertys[lid] || [];
                        $scope.propertys[lid].push(item);
                    }
                    Loading.hideLoad();
                });
            });
    }

    function getPropertyCount(checkSet) {
        PropertyAPI.getPropertyCount("?language=" + sessionStorage.getItem(constants.culture)).then(function (response) {
            $scope.$apply(function () {
                if (checkSet != undefined) {
                    Chart.setChart(response);
                }
                else {
                    Chart.wrtieChart(response, 'column');
                }
            });
        });
    }
})