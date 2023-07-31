(function () {
    'use strict';

    angular
        .module('Application.AlertCtrl', [])
        .controller('ALERT_100_Ctrl', ['$scope', '$timeout', '$window', '$location', 'constants', 'Loading', 'Notification', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', 'NotificationAPI', ALERT_100_Ctrl])
        .controller('ALERT_200_Ctrl', ['$scope', '$timeout', '$window', '$location', 'constants', 'Loading', 'Notification', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', 'NotificationAPI', ALERT_200_Ctrl])
        .controller('ALERT_300_Ctrl', ['$scope', '$timeout', '$window', '$location', 'constants', 'Loading', 'Notification', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', 'NotificationAPI', ALERT_300_Ctrl])
        .controller('ALERT_400_Ctrl', ['$scope', '$timeout', '$window', '$location', 'constants', 'Loading', 'ValueMangement', 'Notification', 'Table', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', 'DocumentAPI', ALERT_400_Ctrl])
        .controller('ALERT_410_Ctrl', ['$scope', '$timeout', '$http', '$window', 'Loading', 'Notification', 'constants', 'config', 'Dropdownlist', 'ValueMangement', 'DocumentAPI', 'FileAttachmentAPI', 'RequestAPI', ALERT_410_Ctrl])
        .controller('ALERT_500_Ctrl', ['$scope', '$timeout', '$window', '$location', 'constants', 'Loading', 'Notification', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', 'NotificationAPI', ALERT_500_Ctrl])
        .controller('ALERT_600_Ctrl', ['$scope', '$timeout', '$window', '$location', 'constants', 'Loading', 'Notification', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', 'NotificationAPI', ALERT_600_Ctrl])
        .controller('ALERT_700_Ctrl', ['$scope', '$timeout', '$window', '$location', 'constants', 'Loading', 'Notification', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', 'NotificationAPI', ALERT_700_Ctrl])
        .controller('ALERT_800_Ctrl', ['$scope', '$timeout', '$window', '$location', 'constants', 'Loading', 'Notification', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', 'NotificationAPI', ALERT_800_Ctrl])
        .controller('ALERT_900_Ctrl', ['$scope', '$timeout', '$window', '$location', 'ValueMangement', 'Loading', 'Notification', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', 'NotificationAPI', ALERT_900_Ctrl])
        .controller('ALERT_910_Ctrl', ['$scope', '$timeout', '$http', '$window', 'Loading', 'Notification', 'constants', 'config', 'Dropdownlist', 'ValueMangement', 'DocumentAPI', 'FileAttachmentAPI', 'RequestAPI', ALERT_910_Ctrl])
        .controller('ALERT_1000_Ctrl', ['$scope', '$timeout', '$window', '$location', 'ValueMangement', 'Loading', 'Notification', 'Table', 'Dropdownlist', 'DatePicker', 'StoreAPI', 'PropertyAPI', 'UserAPI', 'SearchAPI', 'NotificationAPI', ALERT_1000_Ctrl])
        .controller('ALERT_1010_Ctrl', ['$scope', '$timeout', '$http', '$window', 'Loading', 'Notification', 'constants', 'config', 'Dropdownlist', 'ValueMangement', 'DocumentAPI', 'FileAttachmentAPI', 'RequestAPI', ALERT_1010_Ctrl]);

    ////////////===============================================================================

    function ALERT_100_Ctrl($scope, $timeout, $window, $location, constants, Loading, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, NotificationAPI) {

        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        $scope.selectAll = false;

        $scope.isAnyRequestChecked = false;

        $scope.search = {};

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.changeSelectAll = changeSelectAll;

        $scope.disableAlert = disableAlert;

        $scope.setupConfirmModal = setupConfirmModal;

        $scope.downloadAll = downloadAll;

        $scope.downloadSelection = downloadSelection;

        $scope.checkboxChange = checkboxChange

        init();

        angular.element(document).ready(domReady);

        $scope.$watch(selectionWatchFunc, selectionListenerFunc);

        ////////////===============================================================================

        function selectionWatchFunc(scope) {
            var list = $scope.requests || [];
            return list.length && ((list.length - list.filter(filterCheckedItem).length) === 0);
        }

        function selectionListenerFunc(newVal, oldVal) {
            $scope.selectAll = newVal;
        }

        function getRequestByProperty(search) {

            Loading.showLoad();

            var data = angular.copy(search || {});

            data.PAGE = 'ALERT_100';

            data.DOCTYPEID = 1;         // agreement type only
            data.REQUESTSTATUS = -1;    // TODO specify status 
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.EFFECTIVEDATE_FROM = reformatDate(data.EFFECTIVEDATE_FROM);
            data.EFFECTIVEDATE_TO = reformatDate(data.EFFECTIVEDATE_TO);
            data.EXPIREDATE_FROM = reformatDate(data.EXPIREDATE_FROM);
            data.EXPIREDATE_TO = reformatDate(data.EXPIREDATE_TO);
            data.UPDATEDATE_FROM = reformatDate(data.UPDATEDATE_FROM);
            data.UPDATEDATE_TO = reformatDate(data.UPDATEDATE_TO);

            return SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function changeSelectAll() {
            var listptr = $scope.requests || [];
            var len = listptr.length;
            var ischecked = $scope.selectAll;

            for (var i = 0; i < len; ++i) {
                listptr[i].checked = ischecked;
            }

            $scope.checkboxChange();
        }

        function disableAlert() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            var data = {
                DELETEUSER: userSession.USER.USERNAME,
                NOTIFICATIONIDLIST: checkedReqIdList
            };

            NotificationAPI.deleteNotificationList(data)
                .then(handleDeleteSuccess).then(refreshTable);

            ////////////===============================================================================

            function handleDeleteSuccess() {
                angular.element('#modal-confirm').modal('hide');
            }

            function refreshTable() {
                return getRequestByProperty();
            }
        }

        function setupConfirmModal(msg) {
            var list = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);
            var len = list.length;
            $scope.confirmMessage = msg.replace('{0}', len).replace('{1}', len > 1 ? 's' : '');
        }

        function downloadAll() {
            var checkedReqIdList = $scope.requests.map(mapToReqIdList);

            // TODO implement here

            $window.alert('DownloadAll: ' + checkedReqIdList);
        }

        function downloadSelection() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            // TODO implement here

            $window.alert('Download Selection: ' + checkedReqIdList);
        }

        function checkboxChange(row) {
            var len = $scope.requests.filter(filterCheckedItem).length;
            $scope.isAnyRequestChecked = len > 0;
        }

        function filterCheckedItem(x) {
            return !!x.checked;
        }

        function mapToReqIdList(y) {
            return y.NOTIFICATIONID;
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
            Dropdownlist.chnageUI('100%');
            DatePicker.datePicker('#content');

            angular.element.when(
                StoreAPI.getStoreList(),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLAGREEMENTTYPE'),
                SearchAPI.getRequestStatusList(),
                UserAPI.getUserList(),
                getRequestByProperty()
            ).then(handleInitControlsPromises).always(cleanup);

            ////////////===============================================================================

            function handleInitControlsPromises() {

                var dataarray = arguments;

                var idx = 0;

                $scope.stores = dataarray[idx++][0] || [];
                $scope.agreementTypes = dataarray[idx++][0] || [];
                $scope.requestStatuses = dataarray[idx++][0] || [];
                $scope.users = dataarray[idx++][0] || [];

                $scope.$apply(function applyUpdateControls() {
                    $timeout(updateControlsTimeout);
                });

                ////////////===============================================================================

                function updateControlsTimeout() {
                    Dropdownlist.updateUI('.chosen-select');
                }
            }
        }

        function domReady() {
            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            //angular.element(".chosen-select").chosen(dropdownProps);

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


        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;
                $scope.checkboxChange();

                $timeout(function () {
                    Table.tableWithCheckboxColumn('#dynamic-table');
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

    function ALERT_200_Ctrl($scope, $timeout, $window, $location, constants, Loading, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, NotificationAPI) {

        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        $scope.selectAll = false;

        $scope.isAnyRequestChecked = false;

        $scope.search = {};

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.changeSelectAll = changeSelectAll;

        $scope.disableAlert = disableAlert;

        $scope.setupConfirmModal = setupConfirmModal;

        $scope.downloadAll = downloadAll;

        $scope.downloadSelection = downloadSelection;

        $scope.checkboxChange = checkboxChange

        init();

        angular.element(document).ready(domReady);

        $scope.$watch(selectionWatchFunc, selectionListenerFunc);

        ////////////===============================================================================

        function selectionWatchFunc(scope) {
            var list = $scope.requests || [];
            return list.length && ((list.length - list.filter(filterCheckedItem).length) === 0);
        }

        function selectionListenerFunc(newVal, oldVal) {
            $scope.selectAll = newVal;
        }

        function getRequestByProperty(search) {

            Loading.showLoad();

            var data = angular.copy(search || {});

            data.PAGE = 'ALERT_200';

            data.DOCTYPEID = 1;         // agreement type only
            data.REQUESTSTATUS = -1;    // TODO specify status 
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            //data.EFFECTIVEDATE_FROM = reformatDate(data.EFFECTIVEDATE_FROM);
            //data.EFFECTIVEDATE_TO = reformatDate(data.EFFECTIVEDATE_TO);
            data.NOTICEDATE_FROM = reformatDate(data.NOTICEDATE_FROM);
            data.NOTICEDATE_TO = reformatDate(data.NOTICEDATE_TO);
            data.PAYMENTDATE_FROM = reformatDate(data.PAYMENTDATE_FROM);
            data.PAYMENTDATE_TO = reformatDate(data.PAYMENTDATE_TO);

            return SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function changeSelectAll() {
            var listptr = $scope.requests || [];
            var len = listptr.length;
            var ischecked = $scope.selectAll;

            for (var i = 0; i < len; ++i) {
                listptr[i].checked = ischecked;
            }

            $scope.checkboxChange();
        }

        function disableAlert() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            var data = {
                DELETEUSER: userSession.USER.USERNAME,
                PAYOUTDATE: reformatDate($scope.paidDate),
                NOTIFICATIONIDLIST: checkedReqIdList
            };

            NotificationAPI.deleteNotificationList(data)
                .then(handleDeleteSuccess).then(refreshTable);

            ////////////===============================================================================

            function handleDeleteSuccess() {
                angular.element('#modal-confirm').modal('hide');
            }

            function refreshTable() {
                return getRequestByProperty();
            }
        }

        function setupConfirmModal(msg) {
            var list = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);
            var len = list.length;
            $scope.confirmMessage = msg.replace('{0}', len).replace('{1}', len > 1 ? 's' : '');

            $scope.paidDate = null;
        }

        function downloadAll() {
            var checkedReqIdList = $scope.requests.map(mapToReqIdList);

            // TODO implement here

            $window.alert('DownloadAll: ' + checkedReqIdList);
        }

        function downloadSelection() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            // TODO implement here

            $window.alert('Download Selection: ' + checkedReqIdList);
        }

        function checkboxChange(row) {
            var len = $scope.requests.filter(filterCheckedItem).length;
            $scope.isAnyRequestChecked = len > 0;
        }

        function filterCheckedItem(x) {
            return !!x.checked;
        }

        function mapToReqIdList(y) {
            return y.NOTIFICATIONID;
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
            Dropdownlist.chnageUI('100%');
            DatePicker.datePicker('#content');

            angular.element.when(
                StoreAPI.getStoreList(),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLAGREEMENTTYPE'),
                SearchAPI.getRequestStatusList(),
                UserAPI.getUserList(),
                getRequestByProperty()
            ).then(handleInitControlsPromises).always(cleanup);

            ////////////===============================================================================

            function handleInitControlsPromises() {

                var dataarray = arguments;

                var idx = 0;

                $scope.stores = dataarray[idx++][0] || [];
                $scope.agreementTypes = dataarray[idx++][0] || [];
                $scope.requestStatuses = dataarray[idx++][0] || [];
                $scope.users = dataarray[idx++][0] || [];

                $scope.$apply(function applyUpdateControls() {
                    $timeout(updateControlsTimeout);
                });

                ////////////===============================================================================

                function updateControlsTimeout() {
                    Dropdownlist.updateUI('.chosen-select');
                }
            }
        }

        function domReady() {
            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            //angular.element(".chosen-select").chosen(dropdownProps);

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

                    case 'noticeDateRange':
                        searchModel.NOTICEDATE_FROM = fromDt;
                        searchModel.NOTICEDATE_TO = toDt;
                        break;

                    case 'conditionExpireDateRange':
                        searchModel.PAYMENTDATE_FROM = fromDt;
                        searchModel.PAYMENTDATE_TO = toDt;
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

                    case 'noticeDateRange':
                        searchModel.NOTICEDATE_FROM = null;
                        searchModel.NOTICEDATE_TO = null;
                        break;

                    case 'conditionExpireDateRange':
                        searchModel.PAYMENTDATE_FROM = null;
                        searchModel.PAYMENTDATE_TO = null;
                        break;
                }
            }
        }


        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;
                $scope.checkboxChange();

                $timeout(function () {
                    Table.tableWithCheckboxColumn('#dynamic-table');
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

    function ALERT_300_Ctrl($scope, $timeout, $window, $location, constants, Loading, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, NotificationAPI) {

        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        var fileName = "LICENSENOTICE.csv";

        $scope.selectAll = false;

        $scope.isAnyRequestChecked = false;

        $scope.search = {};

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.changeSelectAll = changeSelectAll;

        $scope.disableAlert = disableAlert;

        $scope.setupConfirmModal = setupConfirmModal;

        $scope.downloadAll = downloadAll;

        $scope.downloadSelection = downloadSelection;

        $scope.checkboxChange = checkboxChange;

        $scope.toCurrency = currency;

        init();

        angular.element(document).ready(domReady);

        $scope.$watch(selectionWatchFunc, selectionListenerFunc);

        ////////////===============================================================================

        function selectionWatchFunc(scope) {
            var list = $scope.requests || [];
            return list.length && ((list.length - list.filter(filterCheckedItem).length) === 0);
        }

        function selectionListenerFunc(newVal, oldVal) {
            $scope.selectAll = newVal;
        }

        function getRequestByProperty(search) {

            Loading.showLoad();

            var data = angular.copy(search || {});

            data.PAGE = 'ALERT_300';

            data.DOCTYPEID = 2;         // license type only
            data.REQUESTSTATUS = -1;    // TODO specify status 
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.EFFECTIVEDATE_FROM = reformatDate(data.EFFECTIVEDATE_FROM);
            data.EFFECTIVEDATE_TO = reformatDate(data.EFFECTIVEDATE_TO);
            data.EXPIREDATE_FROM = reformatDate(data.EXPIREDATE_FROM);
            data.EXPIREDATE_TO = reformatDate(data.EXPIREDATE_TO);
            data.UPDATEDATE_FROM = reformatDate(data.UPDATEDATE_FROM);
            data.UPDATEDATE_TO = reformatDate(data.UPDATEDATE_TO);

            return SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function changeSelectAll() {
            var listptr = $scope.requests || [];
            var len = listptr.length;
            var ischecked = $scope.selectAll;

            for (var i = 0; i < len; ++i) {
                listptr[i].checked = ischecked;
            }

            $scope.checkboxChange();
        }

        function disableAlert() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            var data = {
                DELETEUSER: userSession.USER.USERNAME,
                NOTIFICATIONIDLIST: checkedReqIdList
            };

            NotificationAPI.deleteNotificationList(data)
                .then(handleDeleteSuccess).then(refreshTable);

            ////////////===============================================================================

            function handleDeleteSuccess() {
                angular.element('#modal-confirm').modal('hide');
            }

            function refreshTable() {
                return getRequestByProperty();
            }
        }

        function setupConfirmModal(msg) {
            var list = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);
            var len = list.length;
            $scope.confirmMessage = msg.replace('{0}', len).replace('{1}', len > 1 ? 's' : '');
        }

        function downloadAll() {
            var checkedReqIdList = $scope.requests;

            // TODO implement here

            alasql("SELECT DOCRUNNO AS [เลขที่เอกสาร], [STORE] AS [สาขา], LICENSETYPE AS [ประเภทใบอนุญาต], BCDOC_EXPIREDATE AS [วันหมดอายุ] , FEEAMOUNT AS [ค่าธรรมเนียม] INTO CSV('" + fileName + "',{headers:true,separator:','}) FROM ? " , [checkedReqIdList]);

            //$window.alert('DownloadAll: ' + checkedReqIdList);
        }

        function downloadSelection() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem);

            // TODO implement here
            alasql("SELECT DOCRUNNO AS [เลขที่เอกสาร], [STORE] AS [สาขา], LICENSETYPE AS [ประเภทใบอนุญาต], BCDOC_EXPIREDATE AS [วันหมดอายุ] , FEEAMOUNT AS [ค่าธรรมเนียม] INTO CSV('" + fileName + "',{headers:true,separator:','}) FROM ? a", [checkedReqIdList]);

            //$window.alert('Download Selection: ' + checkedReqIdList);
        }

        function checkboxChange(row) {
            var len = $scope.requests.filter(filterCheckedItem).length;
            $scope.isAnyRequestChecked = len > 0;
        }

        function filterCheckedItem(x) {
            return !!x.checked;
        }

        function mapToReqIdList(y) {
            return y.NOTIFICATIONID;
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
            Dropdownlist.chnageUI('100%');
            DatePicker.datePicker('#content');

            angular.element.when(
                StoreAPI.getStoreList(),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLICENSETYPE'),
                SearchAPI.getRequestStatusList(),
                UserAPI.getUserList(),
                getRequestByProperty()
            ).then(handleInitControlsPromises).always(cleanup);

            ////////////===============================================================================

            function handleInitControlsPromises() {

                var dataarray = arguments;

                var idx = 0;

                $scope.stores = dataarray[idx++][0] || [];
                $scope.licenseTypes = dataarray[idx++][0] || [];
                $scope.requestStatuses = dataarray[idx++][0] || [];
                $scope.users = dataarray[idx++][0] || [];

                $scope.$apply(function applyUpdateControls() {
                    $timeout(updateControlsTimeout);
                });

                ////////////===============================================================================

                function updateControlsTimeout() {
                    Dropdownlist.updateUI('.chosen-select');
                }
            }
        }

        function domReady() {
            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            //angular.element(".chosen-select").chosen(dropdownProps);

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


        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;
                $scope.checkboxChange();

                $timeout(function () {
                    Table.tableWithCheckboxColumn('#dynamic-table');
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
        function currency(Num) { //function to add commas to textboxes
            Num += '';
            Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
            Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
            var x = Num.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1))
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            return x1 + x2;
        }

    }

    function ALERT_400_Ctrl($scope, $timeout, $window, $location, constants, Loading, ValueMangement, Notification, Table, StoreAPI, PropertyAPI, UserAPI, SearchAPI, DocumentAPI) {

        var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

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

            data.PAGE = 'ALERT_400';

            data.DOCTYPEID = 1;
            data.REQUESTSTATUS = data.REQUESTSTATUS || -1;
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

        function viewDetail(row) {
            var session = $window.sessionStorage;
            session.REQID = row.REQID;
            session.DOCTYPEID = row.DOCTYPEID;
            $window.location.assign('ALERT_410');
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

    function ALERT_410_Ctrl($scope, $timeout, $http, $window, Loading, Notification, constants, config, Dropdownlist, ValueMangement, DocumentAPI, FileAttachmentAPI, RequestAPI) {

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
                $scope.notice = response.REQUEST;
                $timeout(function () {
                    $('#NOTICEUNIT_PAYOUT').val(response.REQUEST.NOTICEUNIT_PAYOUT).trigger("chosen:updated");
                });
            }
        }

        function handleFileAttachmentResponse(response) {
            $scope.$apply(updateForFileAttachment);

            function updateForFileAttachment() {
                $scope.files = response;
                Dropdownlist.chnageUI('100%');
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

        $scope.setNotificationPayment = function (notice) {

            var data = {};

            if (notice == undefined) {
                Notification.notiFail("กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า");
                return;
            }
            else if (ValueMangement.NoneString(notice.NOTICENUMBER_PAYOUT) == "") {
                Notification.notiFail("กรุณากรอกจำนวนตั้งค่าการแจ้งเตือนล่วงหน้า");
                return;
            }
            else if (ValueMangement.NoneString(notice.NOTICEUNIT_PAYOUT) == "") {
                Notification.notiFail("กรุณากรอกหน่วยตั้งค่าการแจ้งเตือนล่วงหน้า");
                return;
            }

            Loading.showLoad();

            data.REQID = $scope.document.REQUEST.REQID;
            data.USERREQUESTNAME = userSession.USER.USERNAME;
            data.USERREQUESTID = userSession.USER.USERCLASS;
            data.NOTICENUMBER_PAYOUT = notice.NOTICENUMBER_PAYOUT;
            data.NOTICEUNIT_PAYOUT = notice.NOTICEUNIT_PAYOUT;

            RequestAPI.setNotificationPayment(data).then(function (response) {
                if (response.MSGSTATUS == 0) {
                    Notification.notiSuccess(response.MSGTEXT);
                }
                else {
                    Notification.notiFail(response.MSGTEXT);
                }
                Loading.hideLoad();
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

    function ALERT_500_Ctrl($scope, $timeout, $window, $location, constants, Loading, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, NotificationAPI) {

        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        $scope.selectAll = false;

        $scope.isAnyRequestChecked = false;

        $scope.search = {};

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.changeSelectAll = changeSelectAll;

        $scope.disableAlert = disableAlert;

        $scope.setupConfirmModal = setupConfirmModal;

        $scope.downloadAll = downloadAll;

        $scope.downloadSelection = downloadSelection;

        $scope.checkboxChange = checkboxChange

        init();

        angular.element(document).ready(domReady);

        $scope.$watch(selectionWatchFunc, selectionListenerFunc);

        ////////////===============================================================================

        function selectionWatchFunc(scope) {
            var list = $scope.requests || [];
            return list.length && ((list.length - list.filter(filterCheckedItem).length) === 0);
        }

        function selectionListenerFunc(newVal, oldVal) {
            $scope.selectAll = newVal;
        }

        function getRequestByProperty(search) {

            Loading.showLoad();

            var data = angular.copy(search || {});

            data.PAGE = 'ALERT_500';

            data.DOCTYPEID = 3;         // agreement type only

            data.REQUESTSTATUS = -1;    // TODO specify status 
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.EFFECTIVEDATE_FROM = reformatDate(data.EFFECTIVEDATE_FROM);
            data.EFFECTIVEDATE_TO = reformatDate(data.EFFECTIVEDATE_TO);
            data.EXPIREDATE_FROM = reformatDate(data.EXPIREDATE_FROM);
            data.EXPIREDATE_TO = reformatDate(data.EXPIREDATE_TO);
            data.UPDATEDATE_FROM = reformatDate(data.UPDATEDATE_FROM);
            data.UPDATEDATE_TO = reformatDate(data.UPDATEDATE_TO);

            return SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function changeSelectAll() {
            var listptr = $scope.requests || [];
            var len = listptr.length;
            var ischecked = $scope.selectAll;

            for (var i = 0; i < len; ++i) {
                listptr[i].checked = ischecked;
            }

            $scope.checkboxChange();
        }

        function disableAlert() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            var data = {
                DELETEUSER: userSession.USER.USERNAME,
                NOTIFICATIONIDLIST: checkedReqIdList
            };

            NotificationAPI.deleteNotificationList(data)
                .then(handleDeleteSuccess).then(refreshTable);

            ////////////===============================================================================

            function handleDeleteSuccess() {
                angular.element('#modal-confirm').modal('hide');
            }

            function refreshTable() {
                return getRequestByProperty();
            }
        }

        function setupConfirmModal(msg) {
            var list = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);
            var len = list.length;
            $scope.confirmMessage = msg.replace('{0}', len).replace('{1}', len > 1 ? 's' : '');
        }

        function downloadAll() {
            var checkedReqIdList = $scope.requests.map(mapToReqIdList);

            // TODO implement here

            $window.alert('DownloadAll: ' + checkedReqIdList);
        }

        function downloadSelection() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            // TODO implement here

            $window.alert('Download Selection: ' + checkedReqIdList);
        }

        function checkboxChange(row) {
            var len = $scope.requests.filter(filterCheckedItem).length;
            $scope.isAnyRequestChecked = len > 0;
        }

        function filterCheckedItem(x) {
            return !!x.checked;
        }

        function mapToReqIdList(y) {
            return y.NOTIFICATIONID;
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
            Dropdownlist.chnageUI('100%');
            DatePicker.datePicker('#content');

            angular.element.when(
                StoreAPI.getStoreList(),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSPACERENTALTYPE'),
                SearchAPI.getRequestStatusList(),
                UserAPI.getUserList(),
                getRequestByProperty()
            ).then(handleInitControlsPromises).always(cleanup);

            ////////////===============================================================================

            function handleInitControlsPromises() {

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
                }
            }
        }

        function domReady() {
            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            //angular.element(".chosen-select").chosen(dropdownProps);

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


        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;
                $scope.checkboxChange();

                $timeout(function () {
                    Table.tableWithCheckboxColumn('#dynamic-table');
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

    function ALERT_600_Ctrl($scope, $timeout, $window, $location, constants, Loading, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, NotificationAPI) {

        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        $scope.selectAll = false;

        $scope.isAnyRequestChecked = false;

        $scope.search = {};

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.changeSelectAll = changeSelectAll;

        $scope.disableAlert = disableAlert;

        $scope.setupConfirmModal = setupConfirmModal;

        $scope.downloadAll = downloadAll;

        $scope.downloadSelection = downloadSelection;

        $scope.checkboxChange = checkboxChange

        init();

        angular.element(document).ready(domReady);

        $scope.$watch(selectionWatchFunc, selectionListenerFunc);

        ////////////===============================================================================

        function selectionWatchFunc(scope) {
            var list = $scope.requests || [];
            return list.length && ((list.length - list.filter(filterCheckedItem).length) === 0);
        }

        function selectionListenerFunc(newVal, oldVal) {
            $scope.selectAll = newVal;
        }

        function getRequestByProperty(search) {

            Loading.showLoad();

            var data = angular.copy(search || {});

            data.PAGE = 'ALERT_600';

            data.DOCTYPEID = 3;         // space rental only

            data.REQUESTSTATUS = -1;    // TODO specify status 
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.NOTICEDATE_FROM = reformatDate(data.NOTICEDATE_FROM);
            data.NOTICEDATE_TO = reformatDate(data.NOTICEDATE_TO);
            data.PAYMENTDATE_FROM = reformatDate(data.PAYMENTDATE_FROM);
            data.PAYMENTDATE_TO = reformatDate(data.PAYMENTDATE_TO);

            return SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function changeSelectAll() {
            var listptr = $scope.requests || [];
            var len = listptr.length;
            var ischecked = $scope.selectAll;

            for (var i = 0; i < len; ++i) {
                listptr[i].checked = ischecked;
            }

            $scope.checkboxChange();
        }

        function disableAlert() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            var data = {
                DELETEUSER: userSession.USER.USERNAME,
                NOTIFICATIONIDLIST: checkedReqIdList
            };

            NotificationAPI.deleteNotificationList(data)
                .then(handleDeleteSuccess).then(refreshTable);

            ////////////===============================================================================

            function handleDeleteSuccess() {
                angular.element('#modal-confirm').modal('hide');
            }

            function refreshTable() {
                return getRequestByProperty();
            }
        }

        function setupConfirmModal(msg) {
            var list = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);
            var len = list.length;
            $scope.confirmMessage = msg.replace('{0}', len).replace('{1}', len > 1 ? 's' : '');
        }

        function downloadAll() {
            var checkedReqIdList = $scope.requests.map(mapToReqIdList);

            // TODO implement here

            $window.alert('DownloadAll: ' + checkedReqIdList);
        }

        function downloadSelection() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            // TODO implement here

            $window.alert('Download Selection: ' + checkedReqIdList);
        }

        function checkboxChange(row) {
            var len = $scope.requests.filter(filterCheckedItem).length;
            $scope.isAnyRequestChecked = len > 0;
        }

        function filterCheckedItem(x) {
            return !!x.checked;
        }

        function mapToReqIdList(y) {
            return y.NOTIFICATIONID;
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
            Dropdownlist.chnageUI('100%');
            DatePicker.datePicker('#content');

            angular.element.when(
                StoreAPI.getStoreList(),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSPACERENTALTYPE'),
                SearchAPI.getRequestStatusList(),
                UserAPI.getUserList(),
                getRequestByProperty()
            ).then(handleInitControlsPromises).always(cleanup);

            ////////////===============================================================================

            function handleInitControlsPromises() {

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
                }
            }
        }

        function domReady() {
            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            //angular.element(".chosen-select").chosen(dropdownProps);

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
                    case 'noticeDateRange':
                        searchModel.NOTICEDATE_FROM = fromDt;
                        searchModel.NOTICEDATE_TO = toDt;
                        break;

                    case 'conditionExpireDateRange':
                        searchModel.PAYMENTDATE_FROM = fromDt;
                        searchModel.PAYMENTDATE_TO = toDt;
                        break;
                }
            }

            function handleDateRangePickerCancel(ev, picker) {
                // clear field value
                angular.element(this).val('');

                // clear model values
                var searchModel = $scope.search;
                switch (this.id) {
                    case 'noticeDateRange':
                        searchModel.NOTICEDATE_FROM = null
                        searchModel.NOTICEDATE_TO = null;
                        break;

                    case 'conditionExpireDateRange':
                        searchModel.PAYMENTDATE_FROM = null;
                        searchModel.PAYMENTDATE_TO = null;
                        break;
                }
            }
        }


        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;
                $scope.checkboxChange();

                $timeout(function () {
                    Table.tableWithCheckboxColumn('#dynamic-table');
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

    function ALERT_700_Ctrl($scope, $timeout, $window, $location, constants, Loading, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, NotificationAPI) {

        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        var fileName = "VEHICLERENTALNOTICE.csv";

        $scope.selectAll = false;

        $scope.isAnyRequestChecked = false;

        $scope.search = {};

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.changeSelectAll = changeSelectAll;

        $scope.disableAlert = disableAlert;

        $scope.setupConfirmModal = setupConfirmModal;

        $scope.downloadAll = downloadAll;

        $scope.downloadSelection = downloadSelection;

        $scope.checkboxChange = checkboxChange

        init();

        angular.element(document).ready(domReady);

        $scope.$watch(selectionWatchFunc, selectionListenerFunc);

        ////////////===============================================================================

        function selectionWatchFunc(scope) {
            var list = $scope.requests || [];
            return list.length && ((list.length - list.filter(filterCheckedItem).length) === 0);
        }

        function selectionListenerFunc(newVal, oldVal) {
            $scope.selectAll = newVal;
        }

        function getRequestByProperty(search) {

            Loading.showLoad();

            var data = angular.copy(search || {});

            data.PAGE = 'ALERT_700';

            data.DOCTYPEID = 4;         // vehicle rental only

            data.REQUESTSTATUS = -1;    // TODO specify status 
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.RENTAL_EXPIREDATE_FROM = reformatDate(data.RENTAL_EXPIREDATE_FROM);
            data.RENTAL_EXPIREDATE_TO = reformatDate(data.RENTAL_EXPIREDATE_TO);

            data.INSURANCE_EXPIREDATE_FROM = reformatDate(data.INSURANCE_EXPIREDATE_FROM);
            data.INSURANCE_EXPIREDATE_TO = reformatDate(data.INSURANCE_EXPIREDATE_TO);

            data.CARACT_EXPIREDATE_FROM = reformatDate(data.CARACT_EXPIREDATE_FROM);
            data.CARACT_EXPIREDATE_TO = reformatDate(data.CARACT_EXPIREDATE_TO);

            data.VEHICLETAX_EXPIREDATE_FROM = reformatDate(data.VEHICLETAX_EXPIREDATE_FROM);
            data.VEHICLETAX_EXPIREDATE_TO = reformatDate(data.VEHICLETAX_EXPIREDATE_TO);

            return SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function changeSelectAll() {
            var listptr = $scope.requests || [];
            var len = listptr.length;
            var ischecked = $scope.selectAll;

            for (var i = 0; i < len; ++i) {
                listptr[i].checked = ischecked;
            }

            $scope.checkboxChange();
        }

        function disableAlert() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            var data = {
                DELETEUSER: userSession.USER.USERNAME,
                NOTIFICATIONIDLIST: checkedReqIdList
            };

            NotificationAPI.deleteNotificationList(data)
                .then(handleDeleteSuccess).then(refreshTable);

            ////////////===============================================================================

            function handleDeleteSuccess() {
                angular.element('#modal-confirm').modal('hide');
            }

            function refreshTable() {
                return getRequestByProperty();
            }
        }

        function setupConfirmModal(msg) {
            var list = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);
            var len = list.length;
            $scope.confirmMessage = msg.replace('{0}', len).replace('{1}', len > 1 ? 's' : '');
        }

        function downloadAll() {
            var checkedReqIdList = $scope.requests;/*.map(mapToReqIdList);*/

            // TODO implement here
            alasql("SELECT DOCRUNNO AS [เลขที่เอกสาร], LESSORNAME AS [ชื่อผู้ให้เช่า], VEHICLERENTAL_DOCNO AS [เลขที่สัญญาเช่า], " +
                "ENGINE_NUMBER AS [หมายเลขเครื่องยนต์], VEHICLE_LICENSE AS [ทะเบียนรถ], BCRENTAL_EFFECTIVEDATE AS [วันที่เริ่มสัญญา], " +
                "BCRENTAL_EXPIREDATE AS [วันที่สิ้นสุดสัญญา], BCCARACT_EFFECTIVEDATE AS [วันที่เริ่มคุ้มครอง พ.ร.บ.], " +
                "BCCARACT_EXPIREDATE AS [วันที่สิ้นสุดคุ้มครอง พ.ร.บ.], INSURANCEBROKER AS [บริษัทประกันภัย], " +
                "INSURANCENUMBER AS [เลขที่กรมธรรม์], BCINSURANCE_EFFECTIVEDATE AS [วันที่เริ่มเริ่มการคุ้มครองประกันภัย], " +
                "BCINSURANCE_EXPIREDATE AS [วันที่สิ้นสุดการคุ้มครองประกันภัย], BCVEHICLETAX_EFFECTIVEDATE AS [วันที่ดำเนินการต่ออายุภาษีรถยนต์], " +
                "BCVEHICLETAX_EXPIREDATE AS [วันที่หมดอายุภาษีรถยนต์], DEPARTMENT AS [แผนก], RENTAMOUNT AS [ค่าเช่า/เดือน], " +
                "VEHICLEALERTTYPE AS [ประเภทการแจ้งเตือน], BC_NOTICEDATE_STR AS [วันที่แจ้งเตือนหมดอายุ] INTO CSV('" + fileName + "', { headers: true, separator: ',' }) FROM ? ", [checkedReqIdList]);

            //$window.alert('DownloadAll: ' + checkedReqIdList);
        }

        function downloadSelection() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem);/*.map(mapToReqIdList);*/

            // TODO implement here
            alasql("SELECT DOCRUNNO AS [เลขที่เอกสาร], LESSORNAME AS [ชื่อผู้ให้เช่า], VEHICLERENTAL_DOCNO AS [เลขที่สัญญาเช่า], " +
                "ENGINE_NUMBER AS [หมายเลขเครื่องยนต์], VEHICLE_LICENSE AS [ทะเบียนรถ], BCRENTAL_EFFECTIVEDATE AS [วันที่เริ่มสัญญา], " +
                "BCRENTAL_EXPIREDATE AS [วันที่สิ้นสุดสัญญา], BCCARACT_EFFECTIVEDATE AS [วันที่เริ่มคุ้มครอง พ.ร.บ.], " +
                "BCCARACT_EXPIREDATE AS [วันที่สิ้นสุดคุ้มครอง พ.ร.บ.], INSURANCEBROKER AS [บริษัทประกันภัย], " +
                "INSURANCENUMBER AS [เลขที่กรมธรรม์], BCINSURANCE_EFFECTIVEDATE AS [วันที่เริ่มเริ่มการคุ้มครองประกันภัย], " +
                "BCINSURANCE_EXPIREDATE AS [วันที่สิ้นสุดการคุ้มครองประกันภัย], BCVEHICLETAX_EFFECTIVEDATE AS [วันที่ดำเนินการต่ออายุภาษีรถยนต์], " +
                "BCVEHICLETAX_EXPIREDATE AS [วันที่หมดอายุภาษีรถยนต์], DEPARTMENT AS [แผนก], RENTAMOUNT AS [ค่าเช่า/เดือน], " +
                "VEHICLEALERTTYPE AS [ประเภทการแจ้งเตือน], BC_NOTICEDATE_STR AS [วันที่แจ้งเตือนหมดอายุ] INTO CSV('" + fileName + "', { headers: true, separator: ',' }) FROM ? a", [checkedReqIdList]);
            
            //$window.alert('Download Selection: ' + checkedReqIdList);
        }

        function checkboxChange(row) {
            var len = $scope.requests.filter(filterCheckedItem).length;
            $scope.isAnyRequestChecked = len > 0;
        }

        function filterCheckedItem(x) {
            return !!x.checked;
        }

        function mapToReqIdList(y) {
            return y.NOTIFICATIONID;
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
            Dropdownlist.chnageUI('100%');
            DatePicker.datePicker('#content');

            angular.element.when(
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORNAME'),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLETYPE'),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLEALERTTYPE'),
                getRequestByProperty()
            ).then(handleInitControlsPromises).always(cleanup);

            ////////////===============================================================================

            function handleInitControlsPromises() {

                var dataarray = arguments;

                var idx = 0;

                $scope.lessorNames = dataarray[idx++][0] || [];
                $scope.vehicleRentalTypes = dataarray[idx++][0] || [];
                $scope.vehicleAlertTypes = dataarray[idx++][0] || [];

                $scope.$apply(function applyUpdateControls() {
                    $timeout(updateControlsTimeout);
                });

                ////////////===============================================================================

                function updateControlsTimeout() {
                    Dropdownlist.updateUI('.chosen-select');
                }
            }
        }

        function domReady() {
            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            //angular.element(".chosen-select").chosen(dropdownProps);

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
                    case 'rentalExpireDateRange':
                        searchModel.RENTAL_EXPIREDATE_FROM = fromDt
                        searchModel.RENTAL_EXPIREDATE_TO = toDt;
                        break;

                    case 'insuranceExpireDateRange':
                        searchModel.INSURANCE_EXPIREDATE_FROM = fromDt
                        searchModel.INSURANCE_EXPIREDATE_TO = toDt;
                        break;

                    case 'carActExpireDateRange':
                        searchModel.CARACT_EXPIREDATE_FROM = fromDt
                        searchModel.CARACT_EXPIREDATE_TO = toDt;
                        break;

                    case 'vehicleTaxExpireDateRange':
                        searchModel.VEHICLETAX_EXPIREDATE_FROM = fromDt
                        searchModel.VEHICLETAX_EXPIREDATE_TO = toDt;
                        break;
                }
            }

            function handleDateRangePickerCancel(ev, picker) {
                // clear field value
                angular.element(this).val('');

                // clear model values
                var searchModel = $scope.search;
                switch (this.id) {

                    case 'rentalExpireDateRange':
                        searchModel.RENTAL_EXPIREDATE_FROM = null
                        searchModel.RENTAL_EXPIREDATE_TO = null;
                        break;

                    case 'insuranceExpireDateRange':
                        searchModel.INSURANCE_EXPIREDATE_FROM = null
                        searchModel.INSURANCE_EXPIREDATE_TO = null;
                        break;

                    case 'carActExpireDateRange':
                        searchModel.CARACT_EXPIREDATE_FROM = null
                        searchModel.CARACT_EXPIREDATE_TO = null;
                        break;

                    case 'vehicleTaxExpireDateRange':
                        searchModel.VEHICLETAX_EXPIREDATE_FROM = null
                        searchModel.VEHICLETAX_EXPIREDATE_TO = null;
                        break;
                }
            }
        }


        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;
                $scope.checkboxChange();

                $timeout(function () {
                    Table.tableWithCheckboxColumn('#dynamic-table');
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

    function ALERT_800_Ctrl($scope, $timeout, $window, $location, constants, Loading, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, NotificationAPI) {

        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        $scope.selectAll = false;

        $scope.isAnyRequestChecked = false;

        $scope.search = {};

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.stringToDate = stringToDate;

        $scope.changeSelectAll = changeSelectAll;

        $scope.disableAlert = disableAlert;

        $scope.setupConfirmModal = setupConfirmModal;

        $scope.downloadAll = downloadAll;

        $scope.downloadSelection = downloadSelection;

        $scope.checkboxChange = checkboxChange

        init();

        angular.element(document).ready(domReady);

        $scope.$watch(selectionWatchFunc, selectionListenerFunc);

        ////////////===============================================================================

        function selectionWatchFunc(scope) {
            var list = $scope.requests || [];
            return list.length && ((list.length - list.filter(filterCheckedItem).length) === 0);
        }

        function selectionListenerFunc(newVal, oldVal) {
            $scope.selectAll = newVal;
        }

        function getRequestByProperty(search) {

            Loading.showLoad();

            var data = angular.copy(search || {});

            data.PAGE = 'ALERT_800';

            data.DOCTYPEID = 4;         // vehicle rental only

            data.REQUESTSTATUS = -1;    // TODO specify status 
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.NOTICEDATE_FROM = reformatDate(data.NOTICEDATE_FROM);
            data.NOTICEDATE_TO = reformatDate(data.NOTICEDATE_TO);

            data.PAYMENTDATE_FROM = reformatDate(data.PAYMENTDATE_FROM);
            data.PAYMENTDATE_TO = reformatDate(data.PAYMENTDATE_TO);

            return SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function stringToDate(str) {
            return !str ? null : new Date(str);
        }

        function changeSelectAll() {
            var listptr = $scope.requests || [];
            var len = listptr.length;
            var ischecked = $scope.selectAll;

            for (var i = 0; i < len; ++i) {
                listptr[i].checked = ischecked;
            }

            $scope.checkboxChange();
        }

        function disableAlert() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            var data = {
                DELETEUSER: userSession.USER.USERNAME,
                NOTIFICATIONIDLIST: checkedReqIdList
            };

            NotificationAPI.deleteNotificationList(data)
                .then(handleDeleteSuccess).then(refreshTable);

            ////////////===============================================================================

            function handleDeleteSuccess() {
                angular.element('#modal-confirm').modal('hide');
            }

            function refreshTable() {
                return getRequestByProperty();
            }
        }

        function setupConfirmModal(msg) {
            var list = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);
            var len = list.length;
            $scope.confirmMessage = msg.replace('{0}', len).replace('{1}', len > 1 ? 's' : '');
        }

        function downloadAll() {
            var checkedReqIdList = $scope.requests.map(mapToReqIdList);

            // TODO implement here

            $window.alert('DownloadAll: ' + checkedReqIdList);
        }

        function downloadSelection() {
            var checkedReqIdList = $scope.requests.filter(filterCheckedItem).map(mapToReqIdList);

            // TODO implement here

            $window.alert('Download Selection: ' + checkedReqIdList);
        }

        function checkboxChange(row) {
            var len = $scope.requests.filter(filterCheckedItem).length;
            $scope.isAnyRequestChecked = len > 0;
        }

        function filterCheckedItem(x) {
            return !!x.checked;
        }

        function mapToReqIdList(y) {
            return y.NOTIFICATIONID;
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
            Dropdownlist.chnageUI('100%');
            DatePicker.datePicker('#content');

            angular.element.when(
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORNAME'),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLETYPE'),
                //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLALERTVEHICLETYPE'),
                getRequestByProperty()
            ).then(handleInitControlsPromises).always(cleanup);

            ////////////===============================================================================

            function handleInitControlsPromises() {

                var dataarray = arguments;

                var idx = 0;

                $scope.lessorNames = dataarray[idx++][0] || [];
                $scope.vehicleRentalTypes = dataarray[idx++][0] || [];
                //$scope.alertVehicleTypes = dataarray[idx++][0] || [];

                $scope.$apply(function applyUpdateControls() {
                    $timeout(updateControlsTimeout);
                });

                ////////////===============================================================================

                function updateControlsTimeout() {
                    Dropdownlist.updateUI('.chosen-select');
                }
            }
        }

        function domReady() {
            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            //angular.element(".chosen-select").chosen(dropdownProps);

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
                    case 'noticeDateRange':
                        searchModel.NOTICEDATE_FROM = fromDt
                        searchModel.NOTICEDATE_TO = toDt;
                        break;

                    case 'conditionExpireDateRange':
                        searchModel.PAYMENTDATE_FROM = fromDt
                        searchModel.PAYMENTDATE_TO = toDt;
                        break;
                }
            }

            function handleDateRangePickerCancel(ev, picker) {
                // clear field value
                angular.element(this).val('');

                // clear model values
                var searchModel = $scope.search;
                switch (this.id) {

                    case 'noticeDateRange':
                        searchModel.NOTICEDATE_FROM = null
                        searchModel.NOTICEDATE_TO = null;
                        break;

                    case 'conditionExpireDateRange':
                        searchModel.PAYMENTDATE_FROM = null
                        searchModel.PAYMENTDATE_TO = null;
                        break;
                }
            }
        }


        ////////////===============================================================================

        function handleRequestSearchByPropertyResponse(response) {
            $scope.$apply(updateForResultChange);

            ////////////===============================================================================

            function updateForResultChange() {
                Table.tableDestroy('#dynamic-table');

                $scope.requests = response;
                $scope.checkboxChange();

                $timeout(function () {
                    Table.tableWithCheckboxColumn('#dynamic-table');
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

    function ALERT_900_Ctrl($scope, $timeout, $window, $location, ValueMangement, Loading, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, NotificationAPI) {

        var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

        Loading.showLoad();

        $scope.search = serchsession == null ? {} : serchsession;

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.viewDetail = viewDetail;

        $scope.stringToDate = stringToDate;

        init();

        angular.element(document).ready(domReady);

        function getRequestByProperty(search) {

            sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

            Loading.showLoad();

            var data = angular.copy(search || {});

            data.PAGE = 'ALERT_900';

            data.DOCTYPEID = 3;         // space rental only

            data.REQUESTSTATUS = -1;    // Approved only
            data.MENU = ValueMangement.getMenu(window.location.pathname);
            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.EFFECTIVEDATE_FROM = reformatDate(data.EFFECTIVEDATE_FROM);
            data.EFFECTIVEDATE_TO = reformatDate(data.EFFECTIVEDATE_TO);
            data.EXPIREDATE_FROM = reformatDate(data.EXPIREDATE_FROM);
            data.EXPIREDATE_TO = reformatDate(data.EXPIREDATE_TO);
            data.UPDATEDATE_FROM = reformatDate(data.UPDATEDATE_FROM);
            data.UPDATEDATE_TO = reformatDate(data.UPDATEDATE_TO);
            
            return SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function viewDetail(row) {
            var session = $window.sessionStorage;
            session.REQID = row.REQID;
            session.DOCTYPEID = row.DOCTYPEID;
            $window.location.assign('ALERT_910');
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
            Dropdownlist.chnageUI('100%');
            DatePicker.datePicker('#content');

            angular.element.when(
                StoreAPI.getStoreList(),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSPACERENTALTYPE'),
                SearchAPI.getRequestStatusList(),
                UserAPI.getUserList(),
                getRequestByProperty($scope.search)
            ).then(handleInitControlsPromises).always(cleanup);

            ////////////===============================================================================

            function handleInitControlsPromises() {

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
                }
            }
        }

        function domReady() {
            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            //angular.element(".chosen-select").chosen(dropdownProps);

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
        }

        function cleanup() {
            Loading.hideLoad();
        }
    }

    function ALERT_910_Ctrl($scope, $timeout, $http, $window, Loading, Notification, constants, config, Dropdownlist, ValueMangement, DocumentAPI, FileAttachmentAPI, RequestAPI) {

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
                $scope.notice = response.REQUEST;
                $timeout(function () {
                    $('#NOTICEUNIT_PAYOUT').val(response.REQUEST.NOTICEUNIT_PAYOUT).trigger("chosen:updated");
                });
            }
        }

        function handleFileAttachmentResponse(response) {
            $scope.$apply(updateForFileAttachment);

            function updateForFileAttachment() {
                $scope.files = response;
                Dropdownlist.chnageUI('100%');
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

        $scope.setNotificationPayment = function (notice) {

            var data = {};

            if (notice == undefined) {
                Notification.notiFail("กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า");
                return;
            }
            else if (ValueMangement.NoneString(notice.NOTICENUMBER_PAYOUT) == "") {
                Notification.notiFail("กรุณากรอกจำนวนตั้งค่าการแจ้งเตือนล่วงหน้า");
                return;
            }
            else if (ValueMangement.NoneString(notice.NOTICEUNIT_PAYOUT) == "") {
                Notification.notiFail("กรุณากรอกหน่วยตั้งค่าการแจ้งเตือนล่วงหน้า");
                return;
            }

            Loading.showLoad();

            data.REQID = $scope.document.REQUEST.REQID;
            data.USERREQUESTNAME = userSession.USER.USERNAME;
            data.USERREQUESTID = userSession.USER.USERCLASS;
            data.NOTICENUMBER_PAYOUT = notice.NOTICENUMBER_PAYOUT;
            data.NOTICEUNIT_PAYOUT = notice.NOTICEUNIT_PAYOUT;

            RequestAPI.setNotificationPaymentSpaceRental(data).then(function (response) {
                if (response.MSGSTATUS == 0) {
                    Notification.notiSuccess(response.MSGTEXT);
                }
                else {
                    Notification.notiFail(response.MSGTEXT);
                }
                Loading.hideLoad();
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

    function ALERT_1000_Ctrl($scope, $timeout, $window, $location, ValueMangement, Loading, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, NotificationAPI) {

        var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

        Loading.showLoad();

        $scope.search = serchsession == null ? {} : serchsession;

        $scope.getRequestByProperty = getRequestByProperty;

        $scope.viewDetail = viewDetail;

        $scope.stringToDate = stringToDate;

        init();

        angular.element(document).ready(domReady);

        function getRequestByProperty(search) {

            sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

            Loading.showLoad();

            var data = angular.copy(search || {});

            data.PAGE = 'ALERT_1000';

            data.DOCTYPEID = 4;         // vehicle rental only

            data.REQUESTSTATUS = -1;     // Approved only
            data.MENU = ValueMangement.getMenu(window.location.pathname);

            data.USERREQUESTID = data.USERREQUESTID || -1;
            data.USERVERIFYID = data.USERVERIFYID || -1;

            // convert dates to service-friendly format
            data.RENTAL_EFFECTIVEDATE_FROM = reformatDate(data.RENTAL_EFFECTIVEDATE_FROM);
            data.RENTAL_EFFECTIVEDATE_TO = reformatDate(data.RENTAL_EFFECTIVEDATE_TO);
            data.RENTAL_EXPIREDATE_FROM = reformatDate(data.RENTAL_EXPIREDATE_FROM);
            data.RENTAL_EXPIREDATE_TO = reformatDate(data.RENTAL_EXPIREDATE_TO);
            data.UPDATEDATE_FROM = reformatDate(data.UPDATEDATE_FROM);
            data.UPDATEDATE_TO = reformatDate(data.UPDATEDATE_TO);
            
            return SearchAPI.getRequestByProperty(data)
                .then(handleRequestSearchByPropertyResponse)
                .always(cleanup)
        }

        function viewDetail(row) {
            var session = $window.sessionStorage;
            session.REQID = row.REQID;
            session.DOCTYPEID = row.DOCTYPEID;
            $window.location.assign('ALERT_1010');
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
            Dropdownlist.chnageUI('100%');
            DatePicker.datePicker('#content');

            angular.element.when(
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLETYPE'),
                PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORNAME'),
                SearchAPI.getRequestStatusList(),
                UserAPI.getUserList(),
                getRequestByProperty($scope.search)
            ).then(handleInitControlsPromises).always(cleanup);

            ////////////===============================================================================

            function handleInitControlsPromises() {

                var dataarray = arguments;

                var idx = 0;

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
                }
            }
        }

        function domReady() {
            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };
            //angular.element(".chosen-select").chosen(dropdownProps);

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
                        searchModel.RENTAL_EFFECTIVEDATE_FROM = fromDt;
                        searchModel.RENTAL_EFFECTIVEDATE_TO = toDt;
                        break;

                    case 'expireDateRange':
                        searchModel.RENTAL_EXPIREDATE_FROM = fromDt;
                        searchModel.RENTAL_EXPIREDATE_TO = toDt;
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
                        searchModel.RENTAL_EFFECTIVEDATE_FROM = null
                        searchModel.RENTAL_EFFECTIVEDATE_TO = null;
                        break;

                    case 'expireDateRange':
                        searchModel.RENTAL_EXPIREDATE_FROM = null;
                        searchModel.RENTAL_EXPIREDATE_TO = null;
                        break;

                    case 'updateDateRange':
                        searchModel.UPDATEDATE_FROM = null;
                        searchModel.UPDATEDATE_TO = null;
                        break;
                }
            }
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
        }

        function cleanup() {
            Loading.hideLoad();
        }
    }

    function ALERT_1010_Ctrl($scope, $timeout, $http, $window, Loading, Notification, constants, config, Dropdownlist, ValueMangement, DocumentAPI, FileAttachmentAPI, RequestAPI) {

        Loading.showLoad();

        var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

        $scope.forkliftId = 3; // used for controlling UI elements

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
                $scope.notice = response.REQUEST;
                $timeout(function () {
                    $('#NOTICEUNIT_PAYOUT').val(response.REQUEST.NOTICEUNIT_PAYOUT).trigger("chosen:updated");
                });
            }
        }

        function handleFileAttachmentResponse(response) {
            $scope.$apply(updateForFileAttachment);

            function updateForFileAttachment() {
                $scope.files = response;
                Dropdownlist.chnageUI('100%');
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

        $scope.setNotificationPayment = function (notice) {

            var data = {};

            if (notice == undefined) {
                Notification.notiFail("กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า");
                return;
            }
            else if (ValueMangement.NoneString(notice.NOTICENUMBER_PAYOUT) == "") {
                Notification.notiFail("กรุณากรอกจำนวนตั้งค่าการแจ้งเตือนล่วงหน้า");
                return;
            }
            else if (ValueMangement.NoneString(notice.NOTICEUNIT_PAYOUT) == "") {
                Notification.notiFail("กรุณากรอกหน่วยตั้งค่าการแจ้งเตือนล่วงหน้า");
                return;
            }

            Loading.showLoad();

            data.REQID = $scope.document.REQUEST.REQID;
            data.USERREQUESTNAME = userSession.USER.USERNAME;
            data.USERREQUESTID = userSession.USER.USERCLASS;
            data.NOTICENUMBER_PAYOUT = notice.NOTICENUMBER_PAYOUT;
            data.NOTICEUNIT_PAYOUT = notice.NOTICEUNIT_PAYOUT;

            RequestAPI.setNotificationPaymentVehicleRental(data).then(function (response) {
                if (response.MSGSTATUS == 0) {
                    Notification.notiSuccess(response.MSGTEXT);
                }
                else {
                    Notification.notiFail(response.MSGTEXT);
                }
                Loading.hideLoad();
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

})();