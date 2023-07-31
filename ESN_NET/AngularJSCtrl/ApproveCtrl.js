(function () {
    'use strict';

    angular
        .module('Application.ApproveCtrl', [])
        .controller('APPROVE_100_Ctrl', ['$scope', '$timeout', '$window', 'Loading', 'Notification', 'ValueMangement', 'Table', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', APPROVE_100_Ctrl])
        .controller('APPROVE_110_Ctrl', ['$scope', '$http', '$window', 'Loading', 'Notification', 'constants', 'config', 'ValueMangement', 'DocumentAPI', 'FileAttachmentAPI', APPROVE_110_Ctrl])
        .controller('APPROVE_200_Ctrl', ['$scope', '$timeout', '$window', 'Loading', 'Notification', 'ValueMangement', 'Table', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', APPROVE_200_Ctrl])
        .controller('APPROVE_210_Ctrl', ['$scope', '$http', '$window', 'Loading', 'Notification', 'constants', 'config', 'ValueMangement', 'DocumentAPI', 'FileAttachmentAPI', APPROVE_210_Ctrl])
        .controller('APPROVE_300_Ctrl', ['$scope', '$timeout', '$window', 'Loading', 'Notification', 'ValueMangement', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', APPROVE_300_Ctrl])
        .controller('APPROVE_310_Ctrl', ['$scope', '$http', '$window', 'Loading', 'Notification', 'constants', 'config', 'ValueMangement', 'DocumentAPI', 'FileAttachmentAPI', APPROVE_310_Ctrl])
        .controller('APPROVE_400_Ctrl', ['$scope', '$timeout', '$window', 'Loading', 'Notification', 'ValueMangement', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', APPROVE_400_Ctrl])
        .controller('APPROVE_410_Ctrl', ['$scope', '$http', '$window', 'Loading', 'Notification', 'constants', 'config', 'ValueMangement', 'DocumentAPI', 'FileAttachmentAPI', APPROVE_410_Ctrl]);


    ////////////===============================================================================

    function APPROVE_100_Ctrl($scope, $timeout, $window, Loading, Notification, ValueMangement, Table, StoreAPI, PropertyAPI, UserAPI, SearchAPI) {

        var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

        Loading.showLoad();

        $scope.loadingCounter = 0;

        $scope.search = serchsession == null ? {} : serchsession;

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.viewDetail = viewDetail;

        init();

        angular.element(document).ready(domReady);


        ////////////===============================================================================

        function getRequestByProperty(search) {

            sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

            Loading.showLoad();

            var data = angular.copy(search || {});
            data.DOCTYPEID = 1;     // agreement only
            data.REQUESTSTATUS = 2; // pending for approval only
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.EFFECTIVEDATE_FROM = reformatDate(data.EFFECTIVEDATE_FROM);
            data.EFFECTIVEDATE_TO = reformatDate(data.EFFECTIVEDATE_TO);
            data.EXPIREDATE_FROM = reformatDate(data.EXPIREDATE_FROM);
            data.EXPIREDATE_TO = reformatDate(data.EXPIREDATE_TO);
            data.UPDATEDATE_FROM = reformatDate(data.UPDATEDATE_FROM);
            data.UPDATEDATE_TO = reformatDate(data.UPDATEDATE_TO);
            data.MENU = ValueMangement.getMenu(window.location.pathname);

            $scope.loadingCounter++;
            
            SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function reformatDate(date) {
            if (!date) {
                return null;
            }

            var split = date.split('/');
            return split[1] + '/' + split[0] + '/' + split[2];
        }

        function init() {
            // UI controls data

            $scope.loadingCounter++;
            StoreAPI.getStoreList()
                .then(handleStoreListResponse)
                .always(cleanup);

            $scope.loadingCounter++;
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLAGREEMENTTYPE')
                .then(handleAgreementTypeListResponse)
                .always(cleanup);

            $scope.loadingCounter++;
            SearchAPI.getRequestStatusList()
                .then(handleRequestStatusListResponse)
                .always(cleanup);

            $scope.loadingCounter++;
            UserAPI.getUserList()
                .then(handleUserListResponse)
                .always(cleanup);


            // Result table
            getRequestByProperty($scope.search);
        }

        function domReady() {
            Table.tableDefault('#dynamic-table');

            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            angular.element(".chosen-select").chosen(dropdownProps);

            var dateRangeProps = {
                autoUpdateInput: false,
                locale: {
                    cancelLabel: 'Clear',
                    format: 'DD/MM/YYYY'
                }
            };
            angular.element('.date-range-picker')
                .daterangepicker(dateRangeProps)
                .on('apply.daterangepicker', handleDateRangePickerApply)
                .on('cancel.daterangepicker', handleDateRangePickerCancel);

            ////////////===============================================================================

            function handleDateRangePickerApply(ev, picker) {
                var fromDt = picker.startDate.format('DD/MM/YYYY');
                var toDt = picker.endDate.format('DD/MM/YYYY');
                var val = fromDt + ' - ' + toDt;

                // set field value
                angular.element(this).val(val);

                // update model values
                var searchModel = $scope.search;
                switch (this.id) {
                    case 'effectiveDateRange':
                        searchModel.EFFECTIVEDATE_FROM = fromDt;
                        searchModel.EFFECTIVEDATE_TO = toDt;
                        break;

                    case 'expireDateRange':
                        searchModel.EXPIREDATE_FROM = fromDt;
                        searchModel.EXPIREDATE_TO = toDt;
                        break;

                    case 'updateDateRange':
                        searchModel.UPDATEDATE_FROM = fromDt;
                        searchModel.UPDATEDATE_TO = toDt;
                        break;
                }
            }

            function handleDateRangePickerCancel(ev, picker) {
                // clear field value
                angular.element(this).val('');

                // clear model values
                var searchModel = $scope.search;
                switch (this.id) {
                    case 'effectiveDateRange':
                        searchModel.EFFECTIVEDATE_FROM = null
                        searchModel.EFFECTIVEDATE_TO = null;
                        break;

                    case 'expireDateRange':
                        searchModel.EXPIREDATE_FROM = null;
                        searchModel.EXPIREDATE_TO = null;
                        break;

                    case 'updateDateRange':
                        searchModel.UPDATEDATE_FROM = null;
                        searchModel.UPDATEDATE_TO = null;
                        break;
                }
            }
        }

        function viewDetail(row) {
            var session = $window.sessionStorage;
            session.REQID = row.REQID;
            session.DOCTYPEID = row.DOCTYPEID;
            $window.location.assign('APPROVE_110');
        }

        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;

                $timeout(function () {
                    Table.tableDefault('#dynamic-table');
                });
            }
        }

        function handleStoreListResponse(response) {
            $scope.$apply(updateForListChange);

            ////////////===============================================================================

            function updateForListChange() {
                $scope.stores = response;

                $timeout(function () {
                    angular.element("#searchStore").trigger("chosen:updated");
                });
            }
        }

        function handleAgreementTypeListResponse(response) {
            $scope.$apply(updateForListChange);

            ////////////===============================================================================

            function updateForListChange() {
                $scope.agreementTypes = response;

                $timeout(function () {
                    angular.element("#searchAgreementType").trigger("chosen:updated");
                });
            }
        }

        function handleRequestStatusListResponse(response) {
            $scope.$apply(updateForListChange);

            ////////////===============================================================================

            function updateForListChange() {
                $scope.requestStatuses = response;

                $timeout(function () {
                    angular.element("#searchRequestStatus").trigger("chosen:updated");
                });
            }
        }

        function handleUserListResponse(response) {
            $scope.$apply(updateForListChange);

            ////////////===============================================================================

            function updateForListChange() {
                $scope.users = response;

                $timeout(function () {
                    angular.element("#searchUserRequestId").trigger("chosen:updated");
                    angular.element("#searchUserVerifyId").trigger("chosen:updated");
                });
            }
        }

        function handleMsgResponse(response) {
            if (!!response.MSGSTATUS) {
                Notification.notiFail(response.MSGTEXT);
                return false;
            }

            Notification.notiSuccess(response.MSGTEXT);
            angular.element('#modal-table').modal('hide');
        }

        function cleanup() {

            if (--$scope.loadingCounter === 0) {
                Loading.hideLoad();
            }
        }
    }

    function APPROVE_110_Ctrl($scope, $http, $window, Loading, Notification, constants, config, ValueMangement, DocumentAPI, FileAttachmentAPI) {
        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        $scope.init = init;

        angular.element(document).ready(domReady);

        ////////////===============================================================================

        function domReady() {
            init($window.sessionStorage.REQID, $window.sessionStorage.DOCTYPEID);
        }

        function init(reqId, docTypeId) {
            var doc = {
                REQUEST: {
                    REQID: reqId,
                    DOCTYPEID: docTypeId
                }
            };

            DocumentAPI.getDocumentDetail(doc)
                .then(handleDocumentDetailResponse)
                .always(cleanup);

            FileAttachmentAPI.getFileAttachmentByRequest(doc.REQUEST)
                .then(handleFileAttachmentResponse)
                .always(cleanup);
        }

        function handleDocumentDetailResponse(response) {
            $scope.$apply(updateForListChange);

            function updateForListChange() {
                $scope.document = response;
            }
        }

        function handleFileAttachmentResponse(response) {
            $scope.$apply(updateForFileAttachment);

            function updateForFileAttachment() {
                $scope.files = response;
            }
        }

        function cleanup() {
            Loading.hideLoad();
        }

        $scope.hideRentRows = function (index, length) {
            if (index % length == 0) {
                return false;
            }
            return true;
        }

        $scope.rejectDocument = function (reqid) {
            bootbox.prompt({
                title: "เหตุผลที่ส่งคืนส่งกลับแก้ไข",
                callback: function (value) {
                    if (ValueMangement.CheckValue(value)) {
                        if (ValueMangement.NoneString(value).length <= 1000) {
                            Loading.showLoad();

                            var data = {
                                REQID: reqid,
                                DOCTYPEID: 1,
                                USERVERIFYID: userSession.USER.USERID,
                                USERVERIFYNAME: userSession.USER.USERNAME,
                                VERIFYREMARKS: value
                            }

                            Loading.showLoad();

                            DocumentAPI.rejectDocumentLandLeaseAgreement(data).then(function (response) {
                                setTimeout(function () {
                                    $scope.$apply(function () {
                                        if (response.MSGSTATUS == 0) {

                                            sessionStorage.removeItem("/APPROVE/APPROVE_100");

                                            var session = $window.sessionStorage;
                                            session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                                            sessionStorage.setItem("alert", JSON.stringify(response));
                                            $window.location.assign('APPROVE_100');
                                        }
                                        else {
                                            Loading.hideLoad();
                                            Notification.notiFail(response.MSGTEXT);
                                        }
                                    });
                                }, true);
                            })
                        }
                        else {
                            Notification.notiWarn("เหตุผลที่ส่งคืนส่งกลับแก้ไขต้องมีความยาวไม่เกิน 1000 ตัวอักษร");
                        }
                    }
                }
            });
        }

        $scope.approveDocument = function (document) {

            document.REQUEST.USERVERIFYID = userSession.USER.USERID;
            document.REQUEST.USERVERIFYNAME = userSession.USER.USERNAME;

            Loading.showLoad();

            DocumentAPI.approveDocumentLandLeaseAgreement(document).then(function (response) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        if (response.MSGSTATUS == 0) {

                            sessionStorage.removeItem("/APPROVE/APPROVE_100");

                            var session = $window.sessionStorage;
                            session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                            sessionStorage.setItem("alert", JSON.stringify(response));
                            $window.location.assign('APPROVE_100');
                        }
                        else {
                            Loading.hideLoad();
                            Notification.notiFail(response.MSGTEXT);
                        }
                    });
                }, true);
            })
        }

        $scope.downloadDocumentFromServer = function (file, store, doctype) {
            file.STORECODE = store;
            file.DOCTYPE = doctype;

            $http({
                method: 'POST',
                url: config.apiUrl + 'FileTranferAPI/downloadDocumentFromServer',
                data: file,
                responseType: 'arraybuffer',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(successCallback, errorCallback);

            ////////////===============================================================================

            function successCallback(response) {
                try {
                    var blob = new Blob([response.data], { type: "application/octet-stream" });

                    //Check if user is using IE
                    var ua = window.navigator.userAgent;
                    var msie = ua.indexOf("MSIE ");

                    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                        window.navigator.msSaveBlob(blob, file.PATH);
                    }
                    else  // If another browser, return 0
                    {
                        //Create a url to the blob
                        var url = window.URL.createObjectURL(blob);
                        var linkElement = document.createElement('a');
                        linkElement.setAttribute('href', url);
                        linkElement.setAttribute("download", file.PATH);

                        //Force a download
                        var clickEvent = new MouseEvent("click", {
                            "view": window,
                            "bubbles": true,
                            "cancelable": false
                        });
                        linkElement.dispatchEvent(clickEvent);
                    }

                } catch (ex) {
                    Notification.notiFail(ex);
                }
            }
        }

        function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        }
    }

    function APPROVE_200_Ctrl($scope, $timeout, $window, Loading, Notification, ValueMangement, Table, StoreAPI, PropertyAPI, UserAPI, SearchAPI) {

        var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

        Loading.showLoad();

        $scope.loadingCounter = 0;

        $scope.search = serchsession == null ? {} : serchsession;

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.viewDetail = viewDetail;

        init();

        angular.element(document).ready(domReady);


        ////////////===============================================================================

        function getRequestByProperty(search) {

            sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

            Loading.showLoad();

            var data = angular.copy(search || {});
            data.DOCTYPEID = 2;     // license only
            data.REQUESTSTATUS = 2; // pending for approval only
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.EFFECTIVEDATE_FROM = reformatDate(data.EFFECTIVEDATE_FROM);
            data.EFFECTIVEDATE_TO = reformatDate(data.EFFECTIVEDATE_TO);
            data.EXPIREDATE_FROM = reformatDate(data.EXPIREDATE_FROM);
            data.EXPIREDATE_TO = reformatDate(data.EXPIREDATE_TO);
            data.UPDATEDATE_FROM = reformatDate(data.UPDATEDATE_FROM);
            data.UPDATEDATE_TO = reformatDate(data.UPDATEDATE_TO);

            $scope.loadingCounter++;
            
            SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function reformatDate(date) {
            if (!date) {
                return null;
            }

            var split = date.split('/');
            return split[1] + '/' + split[0] + '/' + split[2];
        }

        function init() {
            // UI controls data

            $scope.loadingCounter++;
            StoreAPI.getStoreList()
                .then(handleStoreListResponse)
                .always(cleanup);

            $scope.loadingCounter++;
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLICENSETYPE')
                .then(handleLicenseTypeListResponse)
                .always(cleanup);

            $scope.loadingCounter++;
            SearchAPI.getRequestStatusList()
                .then(handleRequestStatusListResponse)
                .always(cleanup);

            $scope.loadingCounter++;
            UserAPI.getUserList()
                .then(handleUserListResponse)
                .always(cleanup);


            // Result table
            getRequestByProperty($scope.search);
        }

        function domReady() {
            Table.tableDefault('#dynamic-table');

            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            angular.element(".chosen-select").chosen(dropdownProps);

            var dateRangeProps = {
                autoUpdateInput: false,
                locale: {
                    cancelLabel: 'Clear',
                    format: 'DD/MM/YYYY'
                }
            };
            angular.element('.date-range-picker')
                .daterangepicker(dateRangeProps)
                .on('apply.daterangepicker', handleDateRangePickerApply)
                .on('cancel.daterangepicker', handleDateRangePickerCancel);

            ////////////===============================================================================

            function handleDateRangePickerApply(ev, picker) {
                var fromDt = picker.startDate.format('DD/MM/YYYY');
                var toDt = picker.endDate.format('DD/MM/YYYY');
                var val = fromDt + ' - ' + toDt;

                // set field value
                angular.element(this).val(val);

                // update model values
                var searchModel = $scope.search;
                switch (this.id) {
                    case 'effectiveDateRange':
                        searchModel.EFFECTIVEDATE_FROM = fromDt;
                        searchModel.EFFECTIVEDATE_TO = toDt;
                        break;

                    case 'expireDateRange':
                        searchModel.EXPIREDATE_FROM = fromDt;
                        searchModel.EXPIREDATE_TO = toDt;
                        break;

                    case 'updateDateRange':
                        searchModel.UPDATEDATE_FROM = fromDt;
                        searchModel.UPDATEDATE_TO = toDt;
                        break;
                }
            }

            function handleDateRangePickerCancel(ev, picker) {
                // clear field value
                angular.element(this).val('');

                // clear model values
                var searchModel = $scope.search;
                switch (this.id) {
                    case 'effectiveDateRange':
                        searchModel.EFFECTIVEDATE_FROM = null
                        searchModel.EFFECTIVEDATE_TO = null;
                        break;

                    case 'expireDateRange':
                        searchModel.EXPIREDATE_FROM = null;
                        searchModel.EXPIREDATE_TO = null;
                        break;

                    case 'updateDateRange':
                        searchModel.UPDATEDATE_FROM = null;
                        searchModel.UPDATEDATE_TO = null;
                        break;
                }
            }
        }

        function viewDetail(row) {
            var session = $window.sessionStorage;
            session.REQID = row.REQID;
            session.DOCTYPEID = row.DOCTYPEID;
            $window.location.assign('APPROVE_210');
        }

        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;

                $timeout(function () {
                    Table.tableDefault('#dynamic-table');
                });
            }
        }

        function handleStoreListResponse(response) {
            $scope.$apply(updateForListChange);

            ////////////===============================================================================

            function updateForListChange() {
                $scope.stores = response;

                $timeout(function () {
                    angular.element("#searchStore").trigger("chosen:updated");
                });
            }
        }

        function handleLicenseTypeListResponse(response) {
            $scope.$apply(updateForListChange);

            ////////////===============================================================================

            function updateForListChange() {
                $scope.licenseTypes = response;

                $timeout(function () {
                    angular.element("#searchLicenseType").trigger("chosen:updated");
                });
            }
        }

        function handleRequestStatusListResponse(response) {
            $scope.$apply(updateForListChange);

            ////////////===============================================================================

            function updateForListChange() {
                $scope.requestStatuses = response;

                $timeout(function () {
                    angular.element("#searchRequestStatus").trigger("chosen:updated");
                });
            }
        }

        function handleUserListResponse(response) {
            $scope.$apply(updateForListChange);

            ////////////===============================================================================

            function updateForListChange() {
                $scope.users = response;

                $timeout(function () {
                    angular.element("#searchUserRequestId").trigger("chosen:updated");
                    angular.element("#searchUserVerifyId").trigger("chosen:updated");
                });
            }
        }



        function handleMsgResponse(response) {
            if (!!response.MSGSTATUS) {
                Notification.notiFail(response.MSGTEXT);
                return false;
            }

            Notification.notiSuccess(response.MSGTEXT);
            angular.element('#modal-table').modal('hide');
        }

        function cleanup() {

            if (--$scope.loadingCounter === 0) {
                Loading.hideLoad();
            }
        }
    }

    function APPROVE_210_Ctrl($scope, $http, $window, Loading, Notification, constants, config, ValueMangement, DocumentAPI, FileAttachmentAPI) {
        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        $scope.init = init;

        angular.element(document).ready(domReady);

        ////////////===============================================================================

        function domReady() {
            init($window.sessionStorage.REQID, $window.sessionStorage.DOCTYPEID);
        }

        function init(reqId, docTypeId) {
            var doc = {
                REQUEST: {
                    REQID: reqId, //reqId,
                    DOCTYPEID: docTypeId
                }
            };

            DocumentAPI.getDocumentDetail(doc)
                .then(handleDocumentDetailResponse)
                .always(cleanup);

            FileAttachmentAPI.getFileAttachmentByRequest(doc.REQUEST)
                .then(handleFileAttachmentResponse)
                .always(cleanup);
        }

        function handleDocumentDetailResponse(response) {
            $scope.$apply(updateForListChange);
            console.log(response);
            function updateForListChange() {
                $scope.document = response;
            }
        }

        function handleFileAttachmentResponse(response) {
            $scope.$apply(updateForFileAttachment);

            function updateForFileAttachment() {
                $scope.files = response;
            }
        }

        function cleanup() {
            Loading.hideLoad();
        }

        $scope.rejectDocument = function (reqid) {
            bootbox.prompt({
                title: "เหตุผลที่ส่งคืนส่งกลับแก้ไข",
                callback: function (value) {
                    if (ValueMangement.CheckValue(value)) {
                        if (ValueMangement.NoneString(value).length <= 1000) {
                            Loading.showLoad();

                            var data = {
                                REQID: reqid,
                                DOCTYPEID: 2,
                                USERVERIFYID: userSession.USER.USERID,
                                USERVERIFYNAME: userSession.USER.USERNAME,
                                VERIFYREMARKS: value
                            }

                            Loading.showLoad();

                            DocumentAPI.rejectDocumentLandLeaseAgreement(data).then(function (response) {
                                setTimeout(function () {
                                    $scope.$apply(function () {
                                        if (response.MSGSTATUS == 0) {

                                            sessionStorage.removeItem("/APPROVE/APPROVE_200");

                                            var session = $window.sessionStorage;
                                            session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                                            sessionStorage.setItem("alert", JSON.stringify(response));
                                            $window.location.assign('APPROVE_200');
                                        }
                                        else {
                                            Loading.hideLoad();
                                            Notification.notiFail(response.MSGTEXT);
                                        }
                                    });
                                }, true);
                            })
                        }
                        else {
                            Notification.notiWarn("เหตุผลที่ส่งคืนส่งกลับแก้ไขต้องมีความยาวไม่เกิน 1000 ตัวอักษร");
                        }
                    }
                }
            });
        }

        $scope.approveDocument = function (document) {

            document.REQUEST.USERVERIFYID = userSession.USER.USERID;
            document.REQUEST.USERVERIFYNAME = userSession.USER.USERNAME;

            Loading.showLoad();

            DocumentAPI.approveDocumentLicense(document).then(function (response) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        if (response.MSGSTATUS == 0) {

                            sessionStorage.removeItem("/APPROVE/APPROVE_200");

                            var session = $window.sessionStorage;
                            sessionStorage.setItem("alert", JSON.stringify(response));
                            $window.location.assign('APPROVE_200');
                        }
                        else {
                            Loading.hideLoad();
                            Notification.notiFail(response.MSGTEXT);
                        }
                    });
                }, true);
            })
        }

        $scope.downloadDocumentFromServer = function (file, store, doctype) {
            file.STORECODE = store;
            file.DOCTYPE = doctype;

            $http({
                method: 'POST',
                url: config.apiUrl + 'FileTranferAPI/downloadDocumentFromServer',
                data: file,
                responseType: 'arraybuffer',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(successCallback, errorCallback);

            ////////////===============================================================================

            function successCallback(response) {
                try {
                    var blob = new Blob([response.data], { type: "application/octet-stream" });

                    //Check if user is using IE
                    var ua = window.navigator.userAgent;
                    var msie = ua.indexOf("MSIE ");

                    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                        window.navigator.msSaveBlob(blob, file.PATH);
                    }
                    else  // If another browser, return 0
                    {
                        //Create a url to the blob
                        var url = window.URL.createObjectURL(blob);
                        var linkElement = document.createElement('a');
                        linkElement.setAttribute('href', url);
                        linkElement.setAttribute("download", file.PATH);

                        //Force a download
                        var clickEvent = new MouseEvent("click", {
                            "view": window,
                            "bubbles": true,
                            "cancelable": false
                        });
                        linkElement.dispatchEvent(clickEvent);
                    }

                } catch (ex) {
                    Notification.notiFail(ex);
                }
            }
        }

        function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        }
    }

    function APPROVE_300_Ctrl($scope, $timeout, $window, Loading, Notification, ValueMangement, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI) {

        var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

        Loading.showLoad();

        $scope.search = serchsession == null ? {} : serchsession;

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.viewDetail = viewDetail;

        init();

        angular.element(document).ready(domReady);


        ////////////===============================================================================

        function getRequestByProperty(search) {

            sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

            Loading.showLoad();

            var data = angular.copy(search || {});
            data.PAGE = 'APPROVE_300';
            data.DOCTYPEID = 3;     // space rental only
            data.REQUESTSTATUS = 2; // pending for approval only
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.EFFECTIVEDATE_FROM = reformatDate(data.EFFECTIVEDATE_FROM);
            data.EFFECTIVEDATE_TO = reformatDate(data.EFFECTIVEDATE_TO);
            data.EXPIREDATE_FROM = reformatDate(data.EXPIREDATE_FROM);
            data.EXPIREDATE_TO = reformatDate(data.EXPIREDATE_TO);
            data.UPDATEDATE_FROM = reformatDate(data.UPDATEDATE_FROM);
            data.UPDATEDATE_TO = reformatDate(data.UPDATEDATE_TO);
            data.MENU = ValueMangement.getMenu(window.location.pathname);
            
            SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function reformatDate(date) {
            if (!date) {
                return null;
            }

            var split = date.split('/');
            return split[1] + '/' + split[0] + '/' + split[2];
        }

        function init() {

            angular.element.when(
                StoreAPI.getStoreList(),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSPACERENTALTYPE'),
                SearchAPI.getRequestStatusList(),
                UserAPI.getUserList()
            ).done(handleInitPromises).always(cleanup);

            // Result table
            getRequestByProperty($scope.search);

            ////////////===============================================================================

            function handleInitPromises() {
                var dataarray = arguments;
                var idx = 0;
                $scope.stores = dataarray[idx++][0] || [];
                $scope.spaceRentalTypes = dataarray[idx++][0] || [];
                $scope.requestStatuses = dataarray[idx++][0] || [];
                $scope.users = dataarray[idx++][0] || [];

                $scope.$apply(function applyUpdateControls() {
                    $timeout(updateControlsTimeout);
                });

                ////////////===============================================================================

                function updateControlsTimeout() {
                    Dropdownlist.updateUI('.chosen-select');
                    DatePicker.datePicker('#content');
                }
            }
        }

        function domReady() {
            Table.tableDefault('#dynamic-table');

            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            angular.element(".chosen-select").chosen(dropdownProps);

            var dateRangeProps = {
                autoUpdateInput: false,
                locale: {
                    cancelLabel: 'Clear',
                    format: 'DD/MM/YYYY'
                }
            };
            angular.element('.date-range-picker')
                .daterangepicker(dateRangeProps)
                .on('apply.daterangepicker', handleDateRangePickerApply)
                .on('cancel.daterangepicker', handleDateRangePickerCancel);

            ////////////===============================================================================

            function handleDateRangePickerApply(ev, picker) {
                var fromDt = picker.startDate.format('DD/MM/YYYY');
                var toDt = picker.endDate.format('DD/MM/YYYY');
                var val = fromDt + ' - ' + toDt;

                // set field value
                angular.element(this).val(val);

                // update model values
                var searchModel = $scope.search;
                switch (this.id) {
                    case 'effectiveDateRange':
                        searchModel.EFFECTIVEDATE_FROM = fromDt;
                        searchModel.EFFECTIVEDATE_TO = toDt;
                        break;

                    case 'expireDateRange':
                        searchModel.EXPIREDATE_FROM = fromDt;
                        searchModel.EXPIREDATE_TO = toDt;
                        break;

                    case 'updateDateRange':
                        searchModel.UPDATEDATE_FROM = fromDt;
                        searchModel.UPDATEDATE_TO = toDt;
                        break;
                }
            }

            function handleDateRangePickerCancel(ev, picker) {
                // clear field value
                angular.element(this).val('');

                // clear model values
                var searchModel = $scope.search;
                switch (this.id) {
                    case 'effectiveDateRange':
                        searchModel.EFFECTIVEDATE_FROM = null
                        searchModel.EFFECTIVEDATE_TO = null;
                        break;

                    case 'expireDateRange':
                        searchModel.EXPIREDATE_FROM = null;
                        searchModel.EXPIREDATE_TO = null;
                        break;

                    case 'updateDateRange':
                        searchModel.UPDATEDATE_FROM = null;
                        searchModel.UPDATEDATE_TO = null;
                        break;
                }
            }
        }

        function viewDetail(row) {
            var session = $window.sessionStorage;
            session.REQID = row.REQID;
            session.DOCTYPEID = row.DOCTYPEID;
            $window.location.assign('APPROVE_310');
        }

        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;

                $timeout(function () {
                    Table.tableDefault('#dynamic-table');
                });
            }
        }

        function handleMsgResponse(response) {
            if (!!response.MSGSTATUS) {
                Notification.notiFail(response.MSGTEXT);
                return false;
            }

            Notification.notiSuccess(response.MSGTEXT);
            angular.element('#modal-table').modal('hide');
        }

        function cleanup() {
            Loading.hideLoad();
        }
    }

    function APPROVE_310_Ctrl($scope, $http, $window, Loading, Notification, constants, config, ValueMangement, DocumentAPI, FileAttachmentAPI) {
        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        $scope.approveDocument = approveDocument;

        $scope.rejectDocument = rejectDocument;

        $scope.init = init;

        angular.element(document).ready(domReady);

        ////////////===============================================================================

        function domReady() {
            init($window.sessionStorage.REQID, $window.sessionStorage.DOCTYPEID);
        }

        function init(reqId, docTypeId) {
            var doc = {
                REQUEST: {
                    REQID: reqId,
                    DOCTYPEID: docTypeId
                }
            };

            DocumentAPI.getDocumentDetail(doc)
                .then(handleDocumentDetailResponse)
                .always(cleanup);

            FileAttachmentAPI.getFileAttachmentByRequest(doc.REQUEST)
                .then(handleFileAttachmentResponse)
                .always(cleanup);
        }

        function handleDocumentDetailResponse(response) {
            $scope.$apply(updateForListChange);

            function updateForListChange() {
                $scope.document = response;
            }
        }

        function handleFileAttachmentResponse(response) {
            $scope.$apply(updateForFileAttachment);

            function updateForFileAttachment() {
                $scope.files = response;
            }
        }

        function cleanup() {
            Loading.hideLoad();
        }

        function approveDocument(doc) {

            doc.REQUEST.USERVERIFYID = userSession.USER.USERID;
            doc.REQUEST.USERVERIFYNAME = userSession.USER.USERNAME;

            Loading.showLoad();

            DocumentAPI.approveDocumentSpaceRental(doc).then(function (response) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        if (response.MSGSTATUS == 0) {

                            sessionStorage.removeItem("/APPROVE/APPROVE_300");

                            var session = $window.sessionStorage;
                            session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                            sessionStorage.setItem("alert", JSON.stringify(response));
                            $window.location.assign('APPROVE_300');
                        }
                        else {
                            Loading.hideLoad();
                            Notification.notiFail(response.MSGTEXT);
                        }
                    });
                }, true);
            })
        }

        function rejectDocument(reqid) {
            bootbox.prompt({
                title: "เหตุผลที่ส่งคืนส่งกลับแก้ไข",
                callback: callback
            });

            function callback(value) {
                if (ValueMangement.CheckValue(value)) {
                    if (ValueMangement.NoneString(value).length <= 1000) {
                        Loading.showLoad();

                        var data = {
                            REQID: reqid,
                            DOCTYPEID: 3,
                            USERVERIFYID: userSession.USER.USERID,
                            USERVERIFYNAME: userSession.USER.USERNAME,
                            VERIFYREMARKS: value
                        }

                        Loading.showLoad();

                        DocumentAPI.rejectDocumentLandLeaseAgreement(data).then(function (response) {
                            setTimeout(function () {
                                $scope.$apply(function () {
                                    if (response.MSGSTATUS == 0) {

                                        sessionStorage.removeItem("/APPROVE/APPROVE_300");

                                        var session = $window.sessionStorage;
                                        session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                                        sessionStorage.setItem("alert", JSON.stringify(response));
                                        $window.location.assign('APPROVE_300');
                                    }
                                    else {
                                        Loading.hideLoad();
                                        Notification.notiFail(response.MSGTEXT);
                                    }
                                });
                            }, true);
                        })
                    }
                    else {
                        Notification.notiWarn("เหตุผลที่ส่งคืนส่งกลับแก้ไขต้องมีความยาวไม่เกิน 1000 ตัวอักษร");
                    }
                }
            }
        }

        $scope.hideRentRows = function (index, length) {
            if (index % length == 0) {
                return false;
            }
            return true;
        }
        
        $scope.downloadDocumentFromServer = function (file, store, doctype) {
            file.STORECODE = store;
            file.DOCTYPE = doctype;

            $http({
                method: 'POST',
                url: config.apiUrl + 'FileTranferAPI/downloadDocumentFromServer',
                data: file,
                responseType: 'arraybuffer',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(successCallback, errorCallback);

            ////////////===============================================================================

            function successCallback(response) {
                try {
                    var blob = new Blob([response.data], { type: "application/octet-stream" });

                    //Check if user is using IE
                    var ua = window.navigator.userAgent;
                    var msie = ua.indexOf("MSIE ");

                    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                        window.navigator.msSaveBlob(blob, file.PATH);
                    }
                    else  // If another browser, return 0
                    {
                        //Create a url to the blob
                        var url = window.URL.createObjectURL(blob);
                        var linkElement = document.createElement('a');
                        linkElement.setAttribute('href', url);
                        linkElement.setAttribute("download", file.PATH);

                        //Force a download
                        var clickEvent = new MouseEvent("click", {
                            "view": window,
                            "bubbles": true,
                            "cancelable": false
                        });
                        linkElement.dispatchEvent(clickEvent);
                    }

                } catch (ex) {
                    Notification.notiFail(ex);
                }
            }
        }

        function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        }
    }

    function APPROVE_400_Ctrl($scope, $timeout, $window, Loading, Notification, ValueMangement, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI) {

        var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

        Loading.showLoad();

        $scope.search = serchsession == null ? {} : serchsession;

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.viewDetail = viewDetail;

        init();

        angular.element(document).ready(domReady);


        ////////////===============================================================================

        function getRequestByProperty(search) {

            sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

            Loading.showLoad();

            var data = angular.copy(search || {});
            data.PAGE = 'APPROVE_400';
            data.DOCTYPEID = 4;     // vehicle rental only
            data.REQUESTSTATUS = 2; // pending for approval only
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.EFFECTIVEDATE_FROM = reformatDate(data.EFFECTIVEDATE_FROM);
            data.EFFECTIVEDATE_TO = reformatDate(data.EFFECTIVEDATE_TO);
            data.EXPIREDATE_FROM = reformatDate(data.EXPIREDATE_FROM);
            data.EXPIREDATE_TO = reformatDate(data.EXPIREDATE_TO);
            data.UPDATEDATE_FROM = reformatDate(data.UPDATEDATE_FROM);
            data.UPDATEDATE_TO = reformatDate(data.UPDATEDATE_TO);
            data.MENU = ValueMangement.getMenu(window.location.pathname);
            
            SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function reformatDate(date) {
            if (!date) {
                return null;
            }

            var split = date.split('/');
            return split[1] + '/' + split[0] + '/' + split[2];
        }

        function init() {

            angular.element.when(
                StoreAPI.getStoreList(),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLETYPE'),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORNAME'),
                SearchAPI.getRequestStatusList(),
                UserAPI.getUserList()
            ).done(handleInitPromises).always(cleanup);

            // Result table
            getRequestByProperty($scope.search);

            ////////////===============================================================================

            function handleInitPromises() {
                var dataarray = arguments;
                var idx = 0;
                $scope.stores = dataarray[idx++][0] || [];
                $scope.vehicleRentalTypes = dataarray[idx++][0] || [];
                $scope.lessorNames = dataarray[idx++][0] || [];
                $scope.requestStatuses = dataarray[idx++][0] || [];
                $scope.users = dataarray[idx++][0] || [];

                $scope.$apply(function applyUpdateControls() {
                    $timeout(updateControlsTimeout);
                });

                ////////////===============================================================================

                function updateControlsTimeout() {
                    Dropdownlist.updateUI('.chosen-select');
                    DatePicker.datePicker('#content');
                }
            }
        }

        function domReady() {
            Table.tableDefault('#dynamic-table');

            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            angular.element(".chosen-select").chosen(dropdownProps);

            var dateRangeProps = {
                autoUpdateInput: false,
                locale: {
                    cancelLabel: 'Clear',
                    format: 'DD/MM/YYYY'
                }
            };
            angular.element('.date-range-picker')
                .daterangepicker(dateRangeProps)
                .on('apply.daterangepicker', handleDateRangePickerApply)
                .on('cancel.daterangepicker', handleDateRangePickerCancel);

            ////////////===============================================================================

            function handleDateRangePickerApply(ev, picker) {
                var fromDt = picker.startDate.format('DD/MM/YYYY');
                var toDt = picker.endDate.format('DD/MM/YYYY');
                var val = fromDt + ' - ' + toDt;

                // set field value
                angular.element(this).val(val);

                // update model values
                var searchModel = $scope.search;
                switch (this.id) {
                    case 'effectiveDateRange':
                        searchModel.EFFECTIVEDATE_FROM = fromDt;
                        searchModel.EFFECTIVEDATE_TO = toDt;
                        break;

                    case 'expireDateRange':
                        searchModel.EXPIREDATE_FROM = fromDt;
                        searchModel.EXPIREDATE_TO = toDt;
                        break;

                    case 'updateDateRange':
                        searchModel.UPDATEDATE_FROM = fromDt;
                        searchModel.UPDATEDATE_TO = toDt;
                        break;
                }
            }

            function handleDateRangePickerCancel(ev, picker) {
                // clear field value
                angular.element(this).val('');

                // clear model values
                var searchModel = $scope.search;
                switch (this.id) {
                    case 'effectiveDateRange':
                        searchModel.EFFECTIVEDATE_FROM = null
                        searchModel.EFFECTIVEDATE_TO = null;
                        break;

                    case 'expireDateRange':
                        searchModel.EXPIREDATE_FROM = null;
                        searchModel.EXPIREDATE_TO = null;
                        break;

                    case 'updateDateRange':
                        searchModel.UPDATEDATE_FROM = null;
                        searchModel.UPDATEDATE_TO = null;
                        break;
                }
            }
        }

        function viewDetail(row) {
            var session = $window.sessionStorage;
            session.REQID = row.REQID;
            session.DOCTYPEID = row.DOCTYPEID;
            $window.location.assign('APPROVE_410');
        }

        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;

                $timeout(function () {
                    Table.tableDefault('#dynamic-table');
                });
            }
        }

        function handleMsgResponse(response) {
            if (!!response.MSGSTATUS) {
                Notification.notiFail(response.MSGTEXT);
                return false;
            }

            Notification.notiSuccess(response.MSGTEXT);
            angular.element('#modal-table').modal('hide');
        }

        function cleanup() {
            Loading.hideLoad();
        }
    }

    function APPROVE_410_Ctrl($scope, $http, $window, Loading, Notification, constants, config, ValueMangement, DocumentAPI, FileAttachmentAPI) {
        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        $scope.forkliftId = 3; // used for controlling UI elements

        $scope.approveDocument = approveDocument;

        $scope.rejectDocument = rejectDocument;

        $scope.init = init;

        angular.element(document).ready(domReady);

        ////////////===============================================================================

        function domReady() {
            init($window.sessionStorage.REQID, $window.sessionStorage.DOCTYPEID);
        }

        function init(reqId, docTypeId) {
            var doc = {
                REQUEST: {
                    REQID: reqId,
                    DOCTYPEID: docTypeId
                }
            };

            DocumentAPI.getDocumentDetail(doc)
                .then(handleDocumentDetailResponse)
                .always(cleanup);

            FileAttachmentAPI.getFileAttachmentByRequest(doc.REQUEST)
                .then(handleFileAttachmentResponse)
                .always(cleanup);
        }

        function handleDocumentDetailResponse(response) {
            $scope.$apply(updateForListChange);

            function updateForListChange() {
                console.log(response)
                $scope.document = response;
            }
        }

        function handleFileAttachmentResponse(response) {
            $scope.$apply(updateForFileAttachment);

            function updateForFileAttachment() {
                console.log(response)
                $scope.files = response;
            }
        }

        function cleanup() {
            Loading.hideLoad();
        }

        function approveDocument(doc) {

            doc.REQUEST.USERVERIFYID = userSession.USER.USERID;
            doc.REQUEST.USERVERIFYNAME = userSession.USER.USERNAME;

            Loading.showLoad();

            DocumentAPI.approveDocumentVehicleRental(doc).then(function (response) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        if (response.MSGSTATUS == 0) {

                            sessionStorage.removeItem("/APPROVE/APPROVE_400");

                            var session = $window.sessionStorage;
                            session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                            sessionStorage.setItem("alert", JSON.stringify(response));
                            $window.location.assign('APPROVE_400');
                        }
                        else {
                            Loading.hideLoad();
                            Notification.notiFail(response.MSGTEXT);
                        }
                    });
                }, true);
            })
        }

        function rejectDocument(reqid) {
            bootbox.prompt({
                title: "เหตุผลที่ส่งคืนส่งกลับแก้ไข",
                callback: callback
            });

            function callback(value) {
                if (ValueMangement.CheckValue(value)) {
                    if (ValueMangement.NoneString(value).length <= 1000) {
                        Loading.showLoad();

                        var data = {
                            REQID: reqid,
                            DOCTYPEID: 4,
                            USERVERIFYID: userSession.USER.USERID,
                            USERVERIFYNAME: userSession.USER.USERNAME,
                            VERIFYREMARKS: value
                        }

                        Loading.showLoad();

                        DocumentAPI.rejectDocumentLandLeaseAgreement(data).then(function (response) {
                            setTimeout(function () {
                                $scope.$apply(function () {
                                    if (response.MSGSTATUS == 0) {

                                        sessionStorage.removeItem("/APPROVE/APPROVE_400");

                                        var session = $window.sessionStorage;
                                        session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                                        sessionStorage.setItem("alert", JSON.stringify(response));
                                        $window.location.assign('APPROVE_400');
                                    }
                                    else {
                                        Loading.hideLoad();
                                        Notification.notiFail(response.MSGTEXT);
                                    }
                                });
                            }, true);
                        })
                    }
                    else {
                        Notification.notiWarn("เหตุผลที่ส่งคืนส่งกลับแก้ไขต้องมีความยาวไม่เกิน 1000 ตัวอักษร");
                    }
                }
            }
        }

        $scope.hideRentRows = function (index, length) {
            if (index % length == 0) {
                return false;
            }
            return true;
        }

        $scope.downloadDocumentFromServer = function (file, store, doctype) {
            file.STORECODE = store;
            file.DOCTYPE = doctype;

            $http({
                method: 'POST',
                url: config.apiUrl + 'FileTranferAPI/downloadDocumentFromServer',
                data: file,
                responseType: 'arraybuffer',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(successCallback, errorCallback);

            ////////////===============================================================================

            function successCallback(response) {
                try {
                    var blob = new Blob([response.data], { type: "application/octet-stream" });

                    //Check if user is using IE
                    var ua = window.navigator.userAgent;
                    var msie = ua.indexOf("MSIE ");

                    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                        window.navigator.msSaveBlob(blob, file.PATH);
                    }
                    else  // If another browser, return 0
                    {
                        //Create a url to the blob
                        var url = window.URL.createObjectURL(blob);
                        var linkElement = document.createElement('a');
                        linkElement.setAttribute('href', url);
                        linkElement.setAttribute("download", file.PATH);

                        //Force a download
                        var clickEvent = new MouseEvent("click", {
                            "view": window,
                            "bubbles": true,
                            "cancelable": false
                        });
                        linkElement.dispatchEvent(clickEvent);
                    }

                } catch (ex) {
                    Notification.notiFail(ex);
                }
            }
        }

        function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        }
    }

})();