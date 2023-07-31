angular.module('Application.ReportCtrl', [])

.controller('RPT_100_Ctrl', function ($scope, $timeout, constants, Loading, Notification, ValueMangement, Dropdownlist, DatePicker, ReportAPI, Report, StoreAPI, PropertyAPI) {

    /* The RPT_100_Ctrl(Variable Controller) sign at 02/04/2018 */
    $scope.loadingCounter = 0;

    DatePicker.datePicker();

    /* The RPT_100_Ctrl(PageLoad Controller) sign at 02/04/2018 */
    try {
        Loading.showLoad();

        init();

        angular.element(document).ready(domReady);

    } catch (e) {
        Loading.hideLoad();
        Notification.notiFail(e);
    }

    ////////////===============================================================================

    function init() {
        $scope.loadingCounter++;
        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLAGREEMENTTYPE')
            .then(handleAgreementTypeResponse)
            .always(cleanup);

        $scope.loadingCounter++;
        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLICENSETYPE')
            .then(handleLicenseTypeResponse)
            .always(cleanup);

        $scope.loadingCounter++;
        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSPACERENTALTYPE')
            .then(handleSpaceRentalTypeResponse)
            .always(cleanup);

        $scope.loadingCounter++;
        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLETYPE')
            .then(handleVehicleTypeResponse)
            .always(cleanup);

        $scope.loadingCounter++;
        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLDEPARTMENT')
            .then(handleDepartmentResponse)
            .always(cleanup);

        $scope.loadingCounter++;
        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORNAME')
            .then(handleLessorNameResponse)
            .always(cleanup);

        $scope.loadingCounter++;
        ReportAPI.getReportList(null)
            .then(handleReportListResponse)
            .always(cleanup);

        $scope.loadingCounter++;
        StoreAPI.getStoreList(null)
            .then(handleStoreListResponse)
            .always(cleanup);
    }

    function handleAgreementTypeResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.agreementtypes = response;

            $timeout(function () {
                angular.element("#agreementtype").trigger("chosen:updated");
            });
        }
    }

    function handleLicenseTypeResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.licenseTypes = response;

            $timeout(function () {
                angular.element("#licenseType").trigger("chosen:updated");
            });
        }
    }

    function handleSpaceRentalTypeResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.spaceTypes = response;

            $timeout(function () {
                angular.element("#spaceType").trigger("chosen:updated");
            });
        }
    }

    function handleVehicleTypeResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.vehicleTypes = response;
            console.log($scope.vehicleTypes);

            $timeout(function () {
                angular.element("#vehicleType").trigger("chosen:updated");
            });
        }
    }

    function handleDepartmentResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.departments = response;

            $timeout(function () {
                angular.element("#department").trigger("chosen:updated");
            });
        }
    }

    function handleLessorNameResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.lessorNames = response;

            $timeout(function () {
                angular.element("#lessorName").trigger("chosen:updated");
            });
        }
    }

    function handleReportListResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.groupreports = response;
            $scope.reports = response;
        }
    }

    function handleStoreListResponse(response) {
        $scope.$apply(updateForListChange);

        function updateForListChange() {
            $scope.stores = response;

            $timeout(function () {
                angular.element("#storecode").trigger("chosen:updated");
            });
        }
    }

    function domReady() {
        Dropdownlist.chnageUI('41.66%');
    }

    function cleanup() {
        if (--$scope.loadingCounter === 0) {
            Loading.hideLoad();
        }
    }

    ////////////===============================================================================

     /* The RPT_100_Ctrl(Event Controller) sign at 02/04/2018 */
    $scope.setReport = function (reportID, excel, reportEN, reportName, reportDesc, criteria) {
        $("#reportID").val(reportID);
        $("#excel").val(excel);
        $("#report_EN").val(reportEN);
        $("#reportName").val(reportName);
        $("#criteria").val(criteria);
        document.getElementById('reportHeader').innerHTML = reportDesc;
    }

    $scope.criteriaSearch = function (condition) {
        var criteria = $("#criteria").val();
        if (criteria.indexOf(condition) == -1) {
            return false;
        }
        return true;
    }
    
    $scope.report = function () {
        var validate = validateCriteria();

        if (!validate.flag) {
            Notification.notiWarn(validate.text);
            return;
        };

        var report = $("input[name=REPORT]:checked").val();
        if (report === "pdf") {
            pdf();
        }
        else if (report === "excel"){
            excel();
        }
    }

    function pdf() {
        var param = {
            REPORTNAME: $("#reportName").val(),
            REPORTPARAMETER: setParameterReport()
        };
        Report.ReportNewTab(param);
    }
   function excel() {
        var storedProc = "?storedProc=" + $("#excel").val();
        ReportAPI.getExcelReport(setParameterReport(), storedProc).then(function (response) {
            var filename = $("#report_EN").val() + ".csv"

            var sql = genarateExcel(filename);

            alasql(sql, [response]);
        })
    }

    function setParameterReport() {
        var reportID = $("#reportID").val();
        var criteria = [];
        
        if (reportID == 2) {
            criteria.push({
                "PARAMETER": "@branch", "VALUE": ValueMangement.NoneString($("#storecode").val()) });
            criteria.push({
                "PARAMETER": "@agreement", "VALUE": ValueMangement.NoneString($("#agreementtype").val())
            });
            criteria.push({
                "PARAMETER": "@reqstatus", "VALUE": ValueMangement.NoneString($("#status").val())
            });
        }
        else if (reportID == 3) {
            criteria.push({
                "PARAMETER": "@startdate", "VALUE": ValueMangement.DateTime($("#startDate").val(), "th")
            });
            criteria.push({
                "PARAMETER": "@enddate", "VALUE": ValueMangement.DateTime($("#endDate").val(), "th")
            });
        }
        else if (reportID == 4) {
            criteria.push({
                "PARAMETER": "@branch", "VALUE": ValueMangement.NoneString($("#storecode").val())
            });
            criteria.push({
                "PARAMETER": "@license", "VALUE": ValueMangement.NoneString($("#licenseType").val())
            });
            criteria.push({
                "PARAMETER": "@reqstatus", "VALUE": ValueMangement.NoneString($("#status").val())
            });
            criteria.push({
                "PARAMETER": "@startdate", "VALUE": ValueMangement.DateTime($("#startDate").val(), "th")
            });
            criteria.push({
                "PARAMETER": "@enddate", "VALUE": ValueMangement.DateTime($("#endDate").val(), "th")
            });
        }
        else if (reportID == 6) {
            criteria.push({
                "PARAMETER": "@storecode", "VALUE": ValueMangement.NoneString($("#storecode").val())
            });
            criteria.push({
                "PARAMETER": "@spacetype", "VALUE": ValueMangement.NoneString($("#spaceType").val())
            });
            criteria.push({
                "PARAMETER": "@status", "VALUE": ValueMangement.NoneString($("#status").val())
            });
        }
        else if (reportID == 7) {
            criteria.push({
                "PARAMETER": "@lessorname", "VALUE": ValueMangement.NoneString($("#lessorName").val())
            });
            criteria.push({
                "PARAMETER": "@department", "VALUE": ValueMangement.NoneString($("#department").val())
            });
            criteria.push({
                "PARAMETER": "@status", "VALUE": ValueMangement.NoneString($("#statusVehicle").val())
            });
            criteria.push({
                "PARAMETER": "@vehicle", "VALUE": ValueMangement.NoneString($("#vehicleType").val())
            });
        }
        
        return JSON.stringify(criteria);
    }

    function validateCriteria() {
        if (ValueMangement.NoneString($("#reportID").val()) == ""){
            return { flag: false, text: "กรุณาเลือกรายงาน" };
        }
        if ($("#reportID").val() == 3){
            if (ValueMangement.DateTime($('#startDate').val(), "th") == "") {
                return { flag: false, text: "กรุณาเลือกวันที่เริ่มต้น" };
            }

            if (ValueMangement.DateTime($('#endDate').val(), "th") == "") {
                return { flag: false, text: "กรุณาเลือกวันที่สิ้นสุด" };
            }

            if (new Date(ValueMangement.DateTime($('#startDate').val())) >= new Date(ValueMangement.DateTime($('#endDate').val()))) {
                return { flag: false, text: "กรุณาเลือกวันที่สิ้นสุดมากกว่าวันที่เริ่มต้น" };
            }
        }
        if ($("#reportID").val() == 4) {
            if (ValueMangement.DateTime($('#startDate').val(), "th") != "" && ValueMangement.DateTime($('#endDate').val(), "th") != ""){
                if (new Date(ValueMangement.DateTime($('#startDate').val())) >= new Date(ValueMangement.DateTime($('#endDate').val()))) {
                    return { flag: false, text: "กรุณาเลือกวันที่สิ้นสุดมากกว่าวันที่เริ่มต้น" };
                }
            }
            else if (ValueMangement.DateTime($('#startDate').val(), "th") == "" && ValueMangement.DateTime($('#endDate').val(), "th") != ""){
                return { flag: false, text: "กรุณาเลือกวันที่เริ่มต้น" };
            }
            else if (ValueMangement.DateTime($('#startDate').val(), "th") != "" && ValueMangement.DateTime($('#endDate').val(), "th") == "") {
                return { flag: false, text: "กรุณาเลือกวันที่สิ้นสุด" };
            }
        }

        return { flag: true, text: "" };
    }

    function genarateExcel(fileName) {
        var csv = "SELECT ";
        if ($("#reportID").val() == 2) {
            csv += "a.REQID AS [เลขที่เอกสาร], \
                    a.AGREEMENTNO AS[เลขที่สัญญา], \
                    a.STORENAME AS[สาขา], \
                    a.AGREEMENTTYPE AS[ประเภทสัญญา], \
                    a.VENDORNAMES AS[ชื่อผู้ให้เช่า], \
                    a.DOC_CREATEDATE AS[วันที่ทำสัญญา], \
                    a.DOC_EFFECTIVEDATE AS [วันที่เริ่มต้น], \
                    a.DOC_EXPIREDATE AS[วันที่สิ้นสุด], \
                    a.STARTYEAR AS[ช่วงเริ่มต้น], \
                    a.ENDYEAR AS[ช่วงสิ้นสุด], \
                    a.STARTDATE AS[ระยะเวลาเริ่มต้น], \
                    a.ENDDATE AS [ระยะเวลาสิ้นสุด], \
                    a.LANDLEASEAMOUNT AS [รวมค่าเช่า], \
                    a.SERVICEAMOUNT AS[รวมค่าบริการ] ";//b.TOTALLANDLEASEAMOUNT AS [รวมค่าเช่าทั้งหมด], b.TOTALSERVICEAMOUNT AS [รวมค่าบริการทั้งหมด], b.ALLTOTALAMOUNT AS [รวมจำนวนเงินที่ต้องจ่ายทั้งหมด]
        }
        else if ($("#reportID").val() == 3) {
            csv += "a.REQID AS [เลขที่เอกสาร], \
                    a.COSTCENTER AS [COSTCENTER], \
                    a.STORECODE + ' - ' + a.STORENAME_TH AS [สาขา], \
                    a.STARTDATE AS [ระยะเวลาเริ่มต้น], \
                    a.ENDDATE AS [ระยะเวลาสิ้นสุด], \
                    a.PAYMENTOUTTERMNAME AS [จ่ายค่าเช่า], \
                    a.PAYMENTOUTWITHINDATE AS [จ่ายทุกวันที่], \
                   "+ isNullString("a.VENDORNAMES") + " AS [รายชื่อผู้ให้เช่า (ตามสัญญา) / ผู้ถูกหักภาษี ณ ที่จ่าย], \
                    a.CITIZENID AS [เลขที่ผู้เสียภาษี], \
                    REPLACE(REPLACE(a.VENDORADDRESS, CHAR(13), ''), CHAR(10), '') AS [ที่อยู่ตามบัตรปชช.], \
                    REPLACE(REPLACE(a.VENDORCONTACT, CHAR(13), ''), CHAR(10), '')  AS [ที่อยู่-จัดส่งเอกสาร], \
                    a.LASTUPDATE AS [วันที่แก้ไขล่าสุด], \
                    a.VENDORMOBILE AS [เบอร์โทรศัพท์], \
                   "+ isNullString("a.VENDORS") + " AS[Vendor], \
                    a.LANDLEASEAMOUNT AS[ค่าเช่า], \
                    a.SERVICEAMOUNT AS [ค่าบริการ], \
                    a.INVAT AS [รวมภาษีมูลค่าเพิ่ม (VAT 7%)], \
                    a.NONVAT AS [ไม่รวมภาษีมูลค่าเพิ่ม (VAT 7%)], \
                    a.TOTALAMOUNT AS [รวม], \
                    a.LANDLEASETAX AS [ค่าเช่าหัก ณ ที่จ่าย 5%], \
                    a.SERVICETAX AS [ค่าบริการหัก ณ ที่จ่าย 3%], \
                    a.RECEIVEPERSONNAME AS [ผู้รับเงิน], a.BANK AS [ธนาคาร], \
                    a.BANKBRANCHNAME AS [สาขาธนาคาร], \
                    a.BANKACCOUNTNO AS [เลขที่บัญชี], \
                    a.TOTALLANDLEASEAMOUNT + a.TOTALSERVICEAMOUNT AS [ยอดเงินโอน], \
                   "+ isNullString("a.REMARKS") + " AS [Remark]";
        }
        else if ($("#reportID").val() == 4) {
            csv += "a.REQID AS [เลขที่เอกสาร], \
                    a.STORECODE + ' - ' + \
                    a.STORENAME AS [สาขา], \
                    a.LICENSETYPENAME AS [ประเภทใบอนุญาต], \
                    a.DOC_EFFECTIVEDATE AS [วันที่ดำเนินการต่ออายุ], \
                    a.LICENSEDOCNO AS [เลขที่ หรือ ฉบับที่], \
                    a.LICENSEBOOKNO AS [เล่มที่], \
                    a.DOC_EXPIREDATE AS [วันหมดอายุ], \
                    a.FEEAMOUNT AS [ค่าธรรมเนียม], \
                    a.NOTICENUMBER_EXPIRE + CASE a.NOTICEUNIT_EXPIRE WHEN 'DAY' THEN ' วัน' WHEN 'MONTH' THEN ' เดือน' WHEN 'YEAR' THEN ' ปี' END AS [วันที่แจ้งเตือนหมดอายุ], \
                    "+ isNullString("a.HOUSEANDLANDTAX") + " AS [ผู้รับภาระภาษีโรงเรือนและที่ดิน]";
        }
        else if ($("#reportID").val() == 6) {
            csv += "RUNNING_NO AS [ลำดับ] \
                    , COSTCENTER AS [Cost Center] \
                    , STORENAME AS [สาขา] \
                    , SPACERENTAL_TYPE AS [ประเภทการเช่า] \
                    , VENDORID AS [เลข Vendor] \
                    , VENDORNAME AS [ชื่อลูกค้า] \
                    , TELEPHONE AS [เบอร์โทรศัพท์] \
                    , LINEID AS [Line Id] \
                    , SPACERENTAL_DOCNO AS [เลขที่สัญญา] \
                    , DOC_CREATEDATE AS [วันที่ทำสัญญา] \
                    , DOC_EFFECTIVEDATE AS [วันที่เริ่มสัญญา] \
                    , DOC_EXPIREDATE AS [วันที่สิ้นสุดสัญญา] \
                    , PAYMENTOUTWITHINDATE AS [กำหนดชำระ] \
                    , INSURANCECHARGEAMOUNT AS [จำนวนเงินประกัน ตามสัญญา] \
                    , INSURANCECHARGEVAT AS [VAT] \
                    , CASE SERVICECHARGETYPE WHEN 2 THEN SERVICE_AMOUNT + ' % จากรายได้' ELSE SERVICE_AMOUNT END AS[ค่าบริการ ตามสัญญา] \
                    , SERVICECHARGEVAT AS [VAT] \
                    , ELECTRICCHARGEAMOUNT AS [ค่าไฟฟ้า] \
                    , ELECTRICCHARGEVAT AS [VAT] \
                    , TOTAL AS [รวม] \
                    , REQUESTSTATUSNAME AS [สถานะ] \
                    , F_REMARKS AS [หมายเหตุ] ";

        }
        else if ($("#reportID").val() == 7) {
            csv += "RUNNING_NO AS [ลำดับ] \
                    , PROPERTYDESC_TH AS [ชื่อผู้ให้เช่า] \
                    , LESSORCOSTCENTER AS [Vendor] \
                    , VEHICLERENTAL_DOCNO AS [เลขที่สัญญา] \
                    , MODEL AS [ยี่ห้อ / รุ่น] \
                    , VEHICLE_TYPE AS [ประเภทสินทรัพย์] \
                    , SEAT AS [จำนวนที่นั่ง] \
                    , ENGINE_NUMBER AS [หมายเลขเครื่องยนต์] \
                    ,"+ isNullString("VEHICLE_LICENSE") + " AS [ทะเบียน] \
                    ,"+ isNullString("PROVINCE") + " AS [จังหวัด] \
                    ,"+ isNullString("VEHICLEPLATETYPENAME") + " AS [ลักษณะป้าย] \
                    , DOC_CREATEDATE AS [วันที่ทำสัญญา] \
                    , RENTAL_EFFECTIVEDATE AS [วันที่เริ่มสัญญา] \
                    , RENTAL_EXPIREDATE AS [วันที่สิ้นสุดสัญญา] \
                    , RENTALPERIOD AS [ระยะเวลาเช่า] \
                    , PAYMENTOUTWITHINDATE AS [กำหนดชำระ] \
                    , RENTWITHOUTVAT AS [ค่าเช่าต่อเดือน(ไม่รวม VAT)] \
                    , VAT AS [VAT] \
                    , RENTWITHVAT AS [ค่าเช่าต่อเดือน(รวม VAT)] \
                    , BANKACCOUNTNO AS [เลขบัญชี] \
                    , RENTFORACCOUNT AS [ค่าเช่าสำหรับลงบัญชี] \
                    , VATFORACCOUNT AS [VAT สำหรับลงบัญชี] \
                    , FLEETCARDNUMBER AS [หมายเลขบัตรฟลีตการ์ด] \
                    , FLEETCARDBUDGET AS [วงเงินบัตรฟรีตการ์ด] \
                    ,"+ isNullString("COSTCENTER") + " AS [Cost Center] \
                    ,"+ isNullString("DEPARTMENT") + " AS [แผนก] \
                    ,"+ isNullString("POSITION") + " AS [ตำแหน่ง] \
                    ,"+ isNullString("FULLNAME") + " AS [ผู้ใช้รถ] \
                    , VERIFYDATE AS [วันที่อนุมัติ] \
                    , REQID AS [เลขที่เอกสาร] \
                    , NOTICE_EXPIRE AS [วันที่แจ้งเตือนหมดอายุ] \
                    ,"+ isNullString("REMARKS") + " AS [หมายเหตุ] ";
        }
        
        csv += "INTO CSV('" + fileName + "',{headers:true,separator:','}) ";
        csv += "FROM ? a ";
        
        return csv;
    }

    function isNullString(str) {
        return "CASE " + str + " WHEN NULL THEN '' ELSE " + str + " END";
    }
    
})