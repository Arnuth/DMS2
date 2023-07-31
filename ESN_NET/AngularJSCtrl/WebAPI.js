angular.module('Application.WebAPI', [])

.factory('AccountAPI', function (callWebAPI, config, Notification, Loading) {
    return {
        loginUser: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'AccountAPI/loginUser', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        requestPassword: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'AccountAPI/requestPassword', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
})

.factory('UserAPI', function (callWebAPI, config, Notification, Loading) {
    return {
        getUserList: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'UserAPI/getUserList', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        getUserPropertyByUser: function (data, language) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'UserAPI/getUserPropertyByUser', data, language)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        insertUser: function (data, language) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'UserAPI/insertUser', data, language)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        updateUser: function (data, language) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'UserAPI/updateUser', data, language)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        changestatusUser: function (data, language) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'UserAPI/changestatusUser', data, language)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        changePasswordUser: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'UserAPI/changePasswordUser', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        getUserByProperty: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'UserAPI/getUserByProperty', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
    };
})

.factory('UserClassAPI', function (callWebAPI, config, Notification, Loading) {
    return {
        getUserClassList: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'UserClassAPI/getUserClassList', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        addUserClass: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'UserClassAPI/addUserClass', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        editUserClass: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'UserClassAPI/editUserClass', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        deleteUserClass: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'UserClassAPI/deleteUserClass', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
})

.factory('MenuAPI', function (callWebAPI, config, Notification, Loading) {
    return {
        getMenuList: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'MenuAPI/getMenuList', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        setMenuConfig: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'MenuAPI/setMenuConfig', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
 })

.factory('PropertyAPI', function (callWebAPI, config, Notification, Loading) {
    return {
        getPropertyTopic: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'PropertyAPI/getPropertyTopic', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        getPropertyList: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'PropertyAPI/getPropertyList', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                }); 
        },
        getPropertyListByPropertyName: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'PropertyAPI/getPropertyListByPropertyName', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                }); 
        },
        getPropertyCount: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'PropertyAPI/getPropertyCount', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        createNewProperty: function (data, language) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'PropertyAPI/createNewProperty', data, language)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        setUserProperty: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'PropertyAPI/setUserProperty', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        setDocProperty: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'PropertyAPI/setDocProperty', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        editPropertyTopicName: function (data, language) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'PropertyAPI/editPropertyTopicName', data, language)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        addSubProperty: function (data, language) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'PropertyAPI/addSubProperty', data, language)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        editSubProperty: function (data, language) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'PropertyAPI/editSubProperty', data, language)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        deleteSubProperty: function (data, language) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'PropertyAPI/deleteSubProperty', data, language)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
    })

.factory('RequestAPI', function (callWebAPI, config, Notification) {
    return {
        setNotificationPayment: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'RequestAPI/setNotificationPayment', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        setNotificationPaymentSpaceRental: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'RequestAPI/setNotificationPaymentSpaceRental', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        setNotificationPaymentVehicleRental: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'RequestAPI/setNotificationPaymentVehicleRental', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
})

.factory('TaxTypeAPI', function (callWebAPI, config, Notification) {
    return {
        getTaxTypeList: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'TaxTypeAPI/getTaxTypeList', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
})

.factory('SpaceRentalSizeAPI', function (callWebAPI, config, Notification) {
    return {
        getSpaceRentalSizeList: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'SpaceRentalSizeAPI/getSpaceRentalSizeList', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
})

.factory('CJBankAPI', function (callWebAPI, config, Notification) {
    return {
        getCJBankList: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'CJBankAPI/getCJBankList', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
})

.factory('ReportAPI', function (callWebAPI, config, Notification) {
    return {
        getReportList: function (data) {
            return callWebAPI.getjQueryAjaxGet(config.apiUrl + 'ReportAPI/getReportList', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        getExcelReport: function (data, param) {
            return callWebAPI.getjQueryAjaxPostContenType(config.apiUrl + 'ReportAPI/getExcelReport', data, param)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
})

.factory('Report', function (callReportView, config, Notification) {
    return {
        ReportNewTab: function (data) {
            return callReportView.OpenWindowWithPost(config.reportUrl + 'Report/ReportNewTab', "", "NewFile", data);
        },
        ReportDownload: function (data) {
            return callReportView.OpenWindowWithPost(config.reportUrl + 'Report/ReportDownload', "", "NewFile", data);
        }
    };
})

.factory('DocumentAPI', function (callWebAPI, config, Notification) {
    return {
        insertDocumentLandLeaseAgreement: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/insertDocumentLandLeaseAgreement', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        insertDocumentLicense: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/insertDocumentLicense', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        insertDocumentSpaceRental: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/insertDocumentSpaceRental', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        insertDocumentVehicleRental: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/insertDocumentVehicleRental', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        updateDocumentLandLeaseAgreement: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/updateDocumentLandLeaseAgreement', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        updateDocumentLicense: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/updateDocumentLicense', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        updateDocumentSpaceRental: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/updateDocumentSpaceRental', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        updateDocumentVehicleRental: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/updateDocumentVehicleRental', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        approveDocumentLandLeaseAgreement: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/approveDocumentLandLeaseAgreement', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        approveDocumentLicense: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/approveDocumentLicense', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        approveDocumentSpaceRental: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/approveDocumentSpaceRental', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        approveDocumentVehicleRental: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/approveDocumentVehicleRental', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        rejectDocumentLandLeaseAgreement: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/rejectDocumentLandLeaseAgreement', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        getDocumentDetail: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/getDocumentDetail', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        getNextRevisionDocument: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/getNextRevisionDocument', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        insertNewRivisionDocumentLandLeaseAgreement: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/insertNewRivisionDocumentLandLeaseAgreement', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        insertNewRivisionDocumentLicense: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/insertNewRivisionDocumentLicense', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        insertNewRivisionDocumentVehicleRental: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/insertNewRivisionDocumentVehicleRental', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        deleteDraftDocument: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/deleteDraftDocument', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        },
        insertNewRivisionDocumentSpaceRental: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'DocumentAPI/insertNewRivisionDocumentSpaceRental', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
})

.factory('FileAttachmentAPI', function (callWebAPI, config, Notification) {
    return {
        getFileAttachmentByRequest: function (data) {
            return callWebAPI.getjQueryAjaxPost(config.apiUrl + 'FileAttachmentAPI/getFileAttachmentByRequest', data)
                .success(function (response) {
                    return response;
                }).error(function (error) {
                    Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
                    return error;
                });
        }
    };
})

.factory('SearchAPI', function (callWebAPI, config, Notification, Loading) {
    return {
        getRequestByProperty: getRequestByProperty,
        getRequestStatusList: getRequestStatusList
    };

    ////////////===============================================================================

    function getRequestByProperty(data) {
        return queryHelper('SearchAPI/getRequestByProperty', data);
    }

    function getRequestStatusList(data) {
        return queryHelper('SearchAPI/getRequestStatusList', data);
    }

    function queryHelper(url, data) {
        return callWebAPI.getjQueryAjaxPost(config.apiUrl + url, data)
            .success(querySuccess)
            .error(queryError);

        ////////////===============================================================================

        function querySuccess(response) {
            return response;
        }

        function queryError(error) {
            Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
            return error;
        }
    }
})

.factory('StoreAPI', function (callWebAPI, config, Notification, Loading) {
    return {
        getStoreList: getStoreList,
        insertStore: insertStore,
        updateStore: updateStore,
        getStoreByProperty: getStoreByProperty
    };

    ////////////===============================================================================

    function getStoreList(data) {
        return queryHelper('StoreAPI/getStoreList', data);
    }

    function insertStore(data) {
        return queryHelper('StoreAPI/insertStore', data);
    }

    function updateStore(data) {
        return queryHelper('StoreAPI/updateStore', data);
    }

    function getStoreByProperty(data) {
        return queryHelper('StoreAPI/getStoreByProperty', data);
    }

    function queryHelper(url, data) {
        return callWebAPI.getjQueryAjaxPost(config.apiUrl + url, data)
            .success(querySuccess)
            .error(queryError);

        ////////////===============================================================================

        function querySuccess(response) {
            return response;
        }

        function queryError(error) {
            Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
            return error;
        }
    }
})

.factory('NotificationAPI', function (callWebAPI, config, Notification, Loading) {
    return {
        deleteNotificationList: deleteNotificationList
    }

    ////////////===============================================================================

    function deleteNotificationList(data) {
        return queryHelper('NotificationAPI/deleteNotificationList', data);
    }

    function queryHelper(url, data) {
        return callWebAPI.getjQueryAjaxPost(config.apiUrl + url, data)
            .success(querySuccess)
            .error(queryError);

        ////////////===============================================================================

        function querySuccess(response) {
            return response;
        }

        function queryError(error) {
            Notification.notiFail(error.responseJSON != undefined ? error.status + " : " + error.responseJSON.MessageDetail : "ERR_CONNECTION_REFUSED API.");
            return error;
        }
    }
})

.factory('callWebAPI', function () {
    return {
        getjQueryAjaxPost: function (url, obj, language) {
            if (language != undefined) {
                return $.ajax({
                    type: 'POST',
                    url: url + '?language=' + language,
                    dataType: 'json',
                    data: obj,
                    async: true
                });
            }
            else {
                return $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    data: obj,
                    async: true
                });
            }
        },
        getjQueryAjaxPostContenType: function (url, obj, param, language) {
            if (language != undefined) {
                if (param != undefined) {
                    return $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        type: 'POST',
                        url: url + param + '?language=' + language,
                        dataType: 'json',
                        data: obj,
                        async: true
                    });
                }
                else {
                    return $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        type: 'POST',
                        url: url + '&language=' + language,
                        dataType: 'json',
                        data: obj,
                        async: true
                    });
                }
            }
            else {
                if (param != undefined) {
                    return $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        type: 'POST',
                        url: url + param,
                        dataType: 'json',
                        data: obj,
                        async: true
                    });
                }
                else {
                    return $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        type: 'POST',
                        url: url,
                        dataType: 'json',
                        data: obj,
                        async: true
                    });
                }
            }
        },
        getjQueryAjaxGet: function (url, obj) {
            if (obj == null) {
                return $.ajax({
                    type: 'GET',
                    url: url,
                    async: true
                });
            }
            else {
                return $.ajax({
                    type: 'GET',
                    url: url + obj,
                    data: obj,
                    async: true
                });
            }

        }
    };
})

.factory('callReportView', function () {
    return {
        OpenWindowWithPost: function (url, windowoption, name, params) {
            var form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", url);
            form.setAttribute("target", name);

            for (var i in params) {
                if (params.hasOwnProperty(i)) {
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = i;
                    input.value = params[i];
                    form.appendChild(input);
                }
            }

            document.body.appendChild(form);

            //note I am using a post.htm page since I did not want to make double request to the page 
            //it might have some Page_Load call which might screw things up.
            window.open("post.htm", name, windowoption);

            form.submit();

            document.body.removeChild(form);
            return;
        }
    }
})