(function () {
    'use strict';

    angular
        .module('Application.MasterCtrl', [])
        .controller('MASTER_100_Ctrl', ['$scope', '$timeout', 'constants', 'language', 'Loading',
            'Notification', 'ValueMangement', 'Dropdownlist', 'Table', 'StoreAPI', 'PropertyAPI', MASTER_100_Ctrl]);

    ////////////===============================================================================

    function MASTER_100_Ctrl($scope, $timeout, constants, language, Loading, Notification, ValueMangement, Dropdownlist, Table, StoreAPI, PropertyAPI) {

        Loading.showLoad();

        loadStoreList();

        $scope.search = {
            ACTIVE: null
        };

        $scope.modalAddStore = modalAddStore;
        $scope.modalEditStore = modalEditStore;

        $scope.addStore = addStore;
        $scope.updateStore = updateStore;
        $scope.getStoreByProperty = getStoreByProperty;

        $scope.modal = {
            mode: '',
            model: {}
        };

        $scope.activeFlags = [
            {
                LABEL: ValueMangement.CultureSetting(language.active, culture),
                VALUE: 1
            },
            {
                LABEL: ValueMangement.CultureSetting(language.inactive, culture),
                VALUE: 0
            }
        ];

        angular.element(document).ready(documentReadySetup);

        ////////////===============================================================================

        function documentReadySetup() {
            // search filter dropdown
            var dropdownProps = {
                allow_single_deselect: true,
                width: '100%'
            };

            angular.element("#searchStatus").chosen(dropdownProps);

            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLPROVINCE')
                .then(handleProvinceListResponse)
                .always(cleanup);
            angular.element("#searchProvince").chosen(dropdownProps);

            // modal dropdown
            angular.element("#modalProvince").chosen(dropdownProps);
            angular.element("#modalStatus").chosen({ width: '100%' });


            // bind document events
            $(document).on('click touchstart', handleDocumentClickTouch);

            ////////////===============================================================================

            function handleProvinceListResponse(response) {
                $scope.$apply(updateForListChange);

                ////////////===============================================================================

                function updateForListChange() {
                    $scope.provinces = response;

                    $timeout(function () {
                        angular.element("#searchProvince").trigger("chosen:updated");
                        angular.element("#modalProvince").trigger("chosen:updated");
                    });
                }
            }

            function handleDocumentClickTouch(event) {
                if (!angular.element(event.target).closest('.popover_parent').length) {
                    angular.element('.popover_parent.active').removeClass('active');
                }
            }
        }

        ////////////===============================================================================

        function loadStoreList() {
            StoreAPI.getStoreList()
                .then(handleSearchResponse)
                .always(cleanup);
        }

        function modalAddStore() {
            $scope.store = {
                ACTIVE: 1
            };

            $scope.modal.mode = 'add';
            $scope.modal.model = angular.copy($scope.store);

            $timeout(function () {
                angular.element("#modalProvince").trigger("chosen:updated");
                angular.element("#modalStatus").trigger("chosen:updated");
            });
        }

        function modalEditStore(data) {
            $scope.store = data;

            $scope.modal.mode = 'edit';
            $scope.modal.model = angular.copy($scope.store);

            $timeout(function () {
                angular.element("#modalProvince").trigger("chosen:updated");
                angular.element("#modalStatus").trigger("chosen:updated");
            });
        }

        function addStore(data) {
            if (!validateInputs(data)) {
                return false;
            }

            Loading.showLoad();

            StoreAPI.insertStore(data)
                .then(handleMsgResponse)
                .always(cleanup);
        }

        function updateStore(data) {
            if (!validateInputs(data)) {
                return false;
            }

            Loading.showLoad();

            StoreAPI.updateStore(data)
                .then(handleMsgResponse)
                .always(cleanup);
        }

        function getStoreByProperty(data) {
            Loading.showLoad();

            var data = angular.copy(data);
            data.ACTIVE = angular.isNumber(data.ACTIVE) ? data.ACTIVE : -1;

            StoreAPI.getStoreByProperty(data)
                .then(handleSearchResponse)
                .always(cleanup);
        }

        ////////////===============================================================================

        function validateInputs(data) {
            var culture = sessionStorage.getItem(constants.culture);

            if (!data) {
                Notification.notiWarn(ValueMangement.CultureSetting(language.fillInformation, culture));
                return false;
            }

            if (!ValueMangement.CheckValue(data.STORECODE)) {
                Notification.notiWarn(ValueMangement.CultureSetting(language.fillStoreCode, culture));
                return false;
            }

            if (!ValueMangement.CheckValue(data.COSTCENTER)) {
                Notification.notiWarn(ValueMangement.CultureSetting(language.fillCostCenter, culture));
                return false;
            }

            if (!ValueMangement.CheckValue(data.STORENAME_TH)) {
                Notification.notiWarn(ValueMangement.CultureSetting(language.fillStoreNameTH, culture));
                return false;
            }

            if (!data.PROVINCE || !ValueMangement.CheckValue(data.PROVINCE.PROPERTYID)) {
                Notification.notiWarn(ValueMangement.CultureSetting(language.selectProvince, culture));
                return false;
            }

            return true;
        }

        function handleSearchResponse(response) {
            $scope.$apply(function () {
                Table.tableDestroy('#dynamic-table');
                $scope.stores = response;
            });

            Table.tableDefault('#dynamic-table');
        }

        function handleMsgResponse(response) {
            if (!!response.MSGSTATUS) {
                Notification.notiFail(response.MSGTEXT);
                return false;
            }

            $scope.getStoreByProperty($scope.search);

            Notification.notiSuccess(response.MSGTEXT);
            angular.element('#modal-table').modal('hide');
        }

        function cleanup() {
            Loading.hideLoad();
        }
    }
})();
