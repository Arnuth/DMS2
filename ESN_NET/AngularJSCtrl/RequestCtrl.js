angular.module('Application.RequestCtrl', [])

.controller('REQ_100_Ctrl', function ($scope, $window, $timeout, constants, regex, config, Loading, Notification, ValueMangement, Dropdownlist, FileInput, TextArea, DatePicker, Spinner, Tag, RequestAPI, StoreAPI, PropertyAPI, TaxTypeAPI, DocumentAPI) {

    /* The REQ_100_Ctrl(Variable Controller) sign at 08/03/2018 */
    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    var landleaseFiles = 0;
    var serviceFiles = 0;
    var evidenceFiles = 0;
    var otherFiles = 0;

    $scope.persons = [];
    $scope.namepersons = [];
    $scope.lessors = [];
    $scope.rents = [];
    $scope.req = {};
    $scope.doc = { FUTUREPAYMENTOUTFLAG: false, FUTURESERVICEPAYMENTOUTFLAG: false, SERVICEATTACHMENTFLAG: false, DEPOSITFLAG: false };
    $scope.lessorList = [];
    $scope.recieptInfo = [];
    $scope.rentList = [];
    $scope.setContactFlag = setContactFlag;

    DatePicker.datePicker();
    Tag.tag_input();

    Loading.showLoad();

    init();

    angular.element(document).ready(domReady);

    /* The REQ_100_Ctrl(PageLoad Controller) sign at 07/03/2018 */

    function init() {
        angular.element.when(
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLAGREEMENTTYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLPAYMENTERM'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLHOUSEANDLANDTAXTYPE'),
            TaxTypeAPI.getTaxTypeList(null),
            StoreAPI.getStoreByProperty({ ACTIVE: 1 }),
        ).done(handleInitPromises).always(cleanup);

        //StoreAPI.getStoreByProperty({ ACTIVE: 1 })
        //    .then(handleStoreListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLAGREEMENTTYPE')
        //    .then(handleAgreementTypeListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLPAYMENTERM')
        //    .then(handlePaymentTermListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLHOUSEANDLANDTAXTYPE')
        //    .then(handleHouseTaxTypeListResponse)
        //    .always(cleanup);

        //TaxTypeAPI.getTaxTypeList(null)
        //    .then(handleTaxTypeListResponse)
        //    .always(cleanup);
    }

    function domReady() {

        $scope.addLessor();
        $scope.addRent();
        $scope.pushRecievePersonNumber(1);

        var dropdownProps = {
            allow_single_deselect: true,
            width: '41.66%'
        };
   
        $("#RECEIVEPERSONNUMBER").val(1).trigger("chosen:updated");
        $("#PAYMENTOUTWITHINDATE").val(5).trigger("chosen:updated");
        $("#PAYMENTOUTTERM").val(1).trigger("chosen:updated");
        //$("#FUTUREPAYMENTOUTTERM").val(3).trigger("chosen:updated");
       
        $scope.setDepositFlag(false);
        $scope.setDisable();
        $scope.setDisableServicePayment();
        FileInput.single();
        FileInput.multi();

        setTimeout(function () {
            $scope.setIncludeTax("taxcal" + $scope.rents[0] + $scope.persons[0], false);
        }, true);

        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLBANK')
            .then(handleBankListResponse)
            .always(cleanup);

        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORTYPE')
            .then(handleLessorTypeListResponse)
            .always(cleanup);

        angular.element(".chosen-select").chosen(dropdownProps);
    }

    function handleInitPromises() {
        var dataarray = arguments;
        var idx = 0;
        $scope.agreementtypes = dataarray[idx++][0] || [];
        $scope.paymentoutterms = dataarray[idx++][0] || [];
        $scope.houselandtaxs = dataarray[idx++][0] || [];
        $scope.taxtypes = dataarray[idx++][0] || [];
        $scope.stores = dataarray[idx++][0] || [];

        $scope.$apply(function applyUpdateControls() {
            $timeout(updateControlsTimeout);
        });

        ////////////===============================================================================

        function updateControlsTimeout() {
            Dropdownlist.updateUI('.chosen-select');
            DatePicker.datePicker('#content');
        }
    }

    function handleStoreListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.stores = response;

            $timeout(function () {
                angular.element("#STORECODE").trigger("chosen:updated");
            });
        }
    }

    function handleAgreementTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.agreementtypes = response;

            $timeout(function () {
                angular.element("#AGREEMENTTYPEID").trigger("chosen:updated");
            });
        }
    }

    function handleBankListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.banks = response;

            $timeout(function () {
                angular.element("#bankperson0").trigger("chosen:updated");
            });
        }
    }

    function handlePaymentTermListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.paymentoutterms = response;

            $timeout(function () {
                angular.element("#PAYMENTOUTTERM").trigger("chosen:updated");
            });
        }
    }

    function handleLessorTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.lessortypes = response;

            $timeout(function () {
                angular.element("#typelessor0").trigger("chosen:updated");
            });
        }
    }

    function handleHouseTaxTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.houselandtaxs = response;

            $timeout(function () {
                angular.element("#HOUSEANDLANDTAX").trigger("chosen:updated");
            });
        }
    }

    function handleTaxTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.taxtypes = response;

            $timeout(function () {
                angular.element("#LANDLEASETAXTYPEID").trigger("chosen:updated");
                angular.element("#SERVICETAXTYPEID").trigger("chosen:updated");
            });
        }
    }

    /* The REQ_100_Ctrl(Event Controller) sign at 08/03/2018 */

    function setContactFlag(id, value) {
        var name = id.split('contactFlag')[1];
        if (value) {
            $("#contact" + name).val("");
            $("#contact" + name).prop('disabled', true);
        }
        else {
            $("#contact" + name).removeProp('disabled');
        }
    }

    $scope.validateAmountNumber = function ($event) {
        var value = ValueMangement.NoneString($event.target.value);
        var decision = value.split(".");
        var nPoint = (value.match(new RegExp("\\.", "g")) || []).length;
        if (isNaN(String.fromCharCode($event.keyCode)) && (String.fromCharCode($event.keyCode)) != '.') {
            $event.preventDefault();
        }
        if (decision.length > 1) {
            if ((String.fromCharCode($event.keyCode)) == '.') {
                $event.preventDefault();
            }
            if ($event.target.selectionStart > value.indexOf('.')) {
                if (decision[1].length >= 4) {
                    $event.preventDefault();
                }
            }

        }
    }

    $scope.currencyAmountNumber = function (value) {
        return currency(value);
    }

    function currency(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }

    $scope.setDateFutureEnd = function (datestart) {

        setTimeout(function () {
            $scope.$apply(function () {
                $('#FUTUREPAYMENTOUTENDDATE').datepicker({
                    autoclose: true,
                    todayHighlight: true,
                    endDate: new Date()
                })
                    //show datepicker when clicking on the icon
                    .next().on(ace.click_event, function () {
                        $(this).prev().focus();
                    });
            });
            $("#FUTUREPAYMENTOUTENDDATE").datepicker("destroy");
        }, true);
    }

    $scope.setDisable = function () {

        if ($scope.doc.FUTUREPAYMENTOUTFLAG) {
            $('#FUTUREPAYMENTOUTTERM').get(0).removeAttribute('disabled');
            $('#FUTUREPAYMENTOUTSTARTDATE').get(0).removeAttribute('disabled');
            $('#FUTUREPAYMENTOUTENDDATE').get(0).removeAttribute('disabled');
        }
        else {
            $('#FUTUREPAYMENTOUTTERM').get(0).setAttribute('disabled', 'disabled');
            $('#FUTUREPAYMENTOUTSTARTDATE').get(0).setAttribute('disabled', 'disabled');
            $('#FUTUREPAYMENTOUTENDDATE').get(0).setAttribute('disabled', 'disabled');
        }

    }

    $scope.setDisableServicePayment = function () {

        if ($scope.doc.FUTURESERVICEPAYMENTOUTFLAG) {
            $('#FUTURESERVICEPAYMENTOUTTERM').get(0).removeAttribute('disabled');
            $('#FUTURESERVICEPAYMENTOUTSTARTDATE').get(0).removeAttribute('disabled');
            $('#FUTURESERVICEPAYMENTOUTENDDATE').get(0).removeAttribute('disabled');
        }
        else {
            $('#FUTURESERVICEPAYMENTOUTTERM').get(0).setAttribute('disabled', 'disabled');
            $('#FUTURESERVICEPAYMENTOUTSTARTDATE').get(0).setAttribute('disabled', 'disabled');
            $('#FUTURESERVICEPAYMENTOUTENDDATE').get(0).setAttribute('disabled', 'disabled');
        }

    }

    $scope.setDisabledService = function (service) {
        if (service) {
            $('#SERVICETAXTYPEID').attr('disabled', true).trigger("chosen:updated");
            return true;
        }
        else {
            $('#SERVICETAXTYPEID').removeAttr('disabled').trigger("chosen:updated");
            return false;
        }
    }

    $scope.setDisabledLessor = function (name, value) {
        if (value == 3) {
            $('input[name="corporate' + name + '"]').removeAttr('disabled');
            $('#view' + name).attr('style', 'display:none');
        }
        else if (value == 4) {
            $('#view' + name).attr('style', 'display:');
            $('input[name="corporate' + name + '"]').attr('disabled', true);
            $('input[name="corporate' + name + '"]').removeAttr('checked');
        }
        else {
            $('#view' + name).attr('style', 'display:none');
            $('input[name="corporate' + name + '"]').attr('disabled', true);
            $('input[name="corporate' + name + '"]').removeAttr('checked');
        }
        $('#other' + name).val('');
    }

    $scope.setDepositFlag = function (value) {
        if (value == "true") {
            $('input[id=DEPOSITAMOUNT]').removeAttr('disabled');
            $('textarea[id=DEPOSITREMARKS]').removeAttr('disabled');
        }
        else {
            $('input[id=DEPOSITAMOUNT]').attr('disabled', true);
            $('textarea[id=DEPOSITREMARKS]').attr('disabled', true);
            //$('#DEPOSITAMOUNT').val("");
            //$('#DEPOSITREMARKS').val("");
        }
    }

    $scope.setIncludeTax = function (name, value) {
        name = name.split('taxcal')[1];
        if (value) {
            $('input[name="' + name + '"').removeAttr('disabled');
        }
        else {
            $('input[name="' + name + '"').attr('disabled', true);
            $('input[name="' + name + '"').removeAttr('checked');
            $('#tax' + name).val("");
        }
    }

    $scope.setTax = function (value) {
        var taxCalFlag = $('input[id=taxcal' + value.split(',')[0] + ']:checked').val();
        if (taxCalFlag != undefined && taxCalFlag != 'false') {
            if (value.split(',')[1] == 'false') {
                if (document.getElementById('service' + value.split(',')[0]).value != '') {
                    document.getElementById('tax' + value.split(',')[0]).value = $scope.currencyAmountNumber(parseFloat(document.getElementById('service' + value.split(',')[0]).value.replace(/,/g, "")) * 0.07);
                }
                else {
                    document.getElementById('tax' + value.split(',')[0]).value = '';
                }
            }
            else {
                document.getElementById('tax' + value.split(',')[0]).value = '';
            }
        }
    }

    $scope.setTaxCal = function (conid, currency) {
        var id = conid.split('service')[1];

        var taxCalFlag = $('input[id=taxcal' + id + ']:checked').val();
        var input = $('input[name=' + id + ']:checked').val();
        if (taxCalFlag != undefined && taxCalFlag != 'false') {
            if (input == undefined || input.split(id + ",")[1] == "false") {
                if (document.getElementById('service' + id).value != '') {
                    document.getElementById('tax' + id).value = document.getElementById('tax' + id).value = $scope.currencyAmountNumber(parseFloat(document.getElementById('service' + id).value.replace(/,/g, "")) * 0.07);
                }
                else {
                    document.getElementById('tax' + id).value = '';
                }
            }
        }
    }

    $scope.setPerson = function () {
        for (var i = 0; i < $scope.rents.length; i++) {
            for (var j = 0; j < $scope.persons.length; j++) {
                document.getElementById('person' + $scope.rents[i] + $scope.persons[j]).innerHTML = $('#name' + $scope.persons[j]).val();
            }
        }
    }

    $scope.addLessor = function () {
        var lessor = "lessor" + $scope.lessors.length;
        $scope.lessors.push(lessor);
        setTimeout(function () {
            $('input[name="corporate' + lessor + '"]').attr('disabled', true);
            $('input[name="corporate' + lessor + '"]').removeAttr('checked');
            Dropdownlist.chnageUI('41.66%');
            TextArea.inputLimit();
        }, true);
    }

    $scope.deleteLessor = function (lessor) {
        var index = $scope.lessors.indexOf(lessor);
        $scope.lessors.splice(index, 1);
    }

    $scope.pushRecievePersonNumber = function (number) {
        var numberpersons = [];

        for (var i = 0; i < number; i++) {
            numberpersons.push("person" + i);
        }
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.persons = numberpersons;
            });
            setTaxDefault();
            Dropdownlist.chnageUI('41.66%');
        }, true);
    }

    function setTaxDefault() {
        for (var i = 0; i < $scope.rents.length; i++) {
            for (var j = 0; j < $scope.persons.length; j++) {
                var id = "rents" + i + "person" + j;

                var taxCalFlag = $('input[id=taxcal' + id + ']:checked').val() != undefined ? true : false;
                
                $scope.setIncludeTax("taxcal" + id,taxCalFlag);
            }
        }
    }

    $scope.addRent = function () {
        var index = $scope.rents.length;

        $scope.rents.push("rents" + $scope.rents.length);

        var namepersons = [];

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.namepersons = namepersons;
            });

            for (var i = 0; i < $scope.persons.length; i++) {
                document.getElementById('person' + $scope.rents[$scope.rents.length - 1] + $scope.persons[i]).innerHTML = $('#name' + $scope.persons[i]).val();
                $('input[name="' + $scope.rents[$scope.rents.length - 1] + $scope.persons[i] + '"').attr('disabled', true);
            }

            Spinner.spinner("yearstartrents" + ($scope.rents.length - 1));
            Spinner.spinner("yearendrents" + ($scope.rents.length - 1));
            Dropdownlist.chnageUI('41.66%');
            DatePicker.datePicker();
        }, true);

    }

    $scope.deleteRent = function (rent) {
        var index = $scope.rents.indexOf(rent);
        $scope.rents.splice(index, 1);
    }

    $scope.saveDraft = function (req, doc) {
        landleaseFiles = 0;
        serviceFiles = 0;
        evidenceFiles = 0;
        otherFiles = 0

        $scope.req.REQUESTSTATUS = 1;

        var valiReq = validateRequest(req);
        var valiDoc = validateDocument(doc);

        if (!valiReq.flag) {
            Notification.notiWarn(valiReq.text);
            return;
        };

        if (!valiDoc.flag) {
            Notification.notiWarn(valiDoc.text);
            return;
        };

        var data = setData(Object.assign({}, req), Object.assign({}, doc), 1);

        Loading.showLoad();

        DocumentAPI.insertDocumentLandLeaseAgreement(data).then(function (response) {
            runno = response.MSGTEXT;

            if (response.MSGSTATUS == 0) {
                response.MSGTEXT = "สำเร็จ";

                cleanup();

                var session = $window.sessionStorage;
                session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                sessionStorage.setItem("alert", JSON.stringify(response));

                upLoadFile(runno);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    $scope.submitDocument = function (req, doc) {
        landleaseFiles = 0;
        serviceFiles = 0;
        evidenceFiles = 0;
        otherFiles = 0

        $scope.req.REQUESTSTATUS = 2;

        var valiReq = validateRequest(req);
        var valiDoc = validateDocument(doc);
        var valiSubmit = validateSubmit(req, doc);

        if (!valiReq.flag) {
            Notification.notiWarn(valiReq.text);
            return;
        };

        if (!valiDoc.flag) {
            Notification.notiWarn(valiDoc.text);
            return;
        };

        if (!valiSubmit.flag) {
            Notification.notiWarn(valiSubmit.text);
            return;
        };

        var data = setData(Object.assign({}, req), Object.assign({}, doc), 2);

        Loading.showLoad();

        DocumentAPI.insertDocumentLandLeaseAgreement(data).then(function (response) {
            runno = response.MSGTEXT;

            if (response.MSGSTATUS == 0) {
                response.MSGTEXT = "Success";

                cleanup();

                var session = $window.sessionStorage;
                session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                sessionStorage.setItem("alert", JSON.stringify(response));

                upLoadFile(runno);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    /* The REQ_100_Ctrl(Function Controller) sign at 08/03/2018 */

    function cleanup() {
        Loading.hideLoad();
    }

    function setData(req, doc, status) {

        lessorList = [];
        recieptInfo = [];
        rentList = [];

        doc.RECEIVEPERSONNUMBER = $('#RECEIVEPERSONNUMBER').val();
        doc.PAYMENTOUTTERM = $('#PAYMENTOUTTERM').val();
        doc.PAYMENTOUTWITHINDATE = $('#PAYMENTOUTWITHINDATE').val();
        doc.HOUSEANDLANDTAX = $('#HOUSEANDLANDTAX').val();

        var deedOwnerList = ValueMangement.NoneString($("#DEEDOWNER").val()).split(",");
        doc.DEEDOWNERINFO = [];
        for (deedOwner in deedOwnerList) {
            if (ValueMangement.NoneString(deedOwnerList[deedOwner].trim()) != '') {
                doc.DEEDOWNERINFO.push(
                    {
                        REQID: ValueMangement.NoneString(req.REQID),
                        DEEDOWNER: deedOwnerList[deedOwner].trim()
                    }
                );
            }
        }

        for (var i = 0; i < $scope.lessors.length; i++) {
            var lessorType = $('#type' + $scope.lessors[i]).val(); // 3 = นิติบุคคล
            var corporation = $('input[name=corporate' + $scope.lessors[i] + ']:checked').val()
            corporation = ValueMangement.NoneString(corporation);
            var contact = "";
            if (document.getElementById("contactFlag" + $scope.lessors[i]).checked) {
                contact = $('#address' + $scope.lessors[i]).val();
            }
            else {
                contact = $('#contact' + $scope.lessors[i]).val();
            }
            lessorList.push(
                {
                    VENDORID: $('#code' + $scope.lessors[i]).val(),
                    CITIZENID: $('#tax' + $scope.lessors[i]).val(),
                    VENDORNAME: $('#name' + $scope.lessors[i]).val(),
                    VENDORADDRESS: $('#address' + $scope.lessors[i]).val(),
                    LESSORTYPE: $('#type' + $scope.lessors[i]).val(),
                    CORPORATIONTYPE: corporation.split(",")[1] == "true" ? 1 : 0,
                    OTHERTYPE: $('#other' + $scope.lessors[i]).val(),
                    VENDORCONTACT: contact,
                    VENDORMOBILE: $('#tel' + $scope.lessors[i]).val()
                }
            );
        }

        for (var i = 0; i < $scope.persons.length; i++) {
            recieptInfo.push(
                {
                    RECEIVEPERSONID: $('#id' + $scope.persons[i]).val(),
                    REQID: $('#req' + $scope.persons[i]).val(),
                    RECEIVEPERSONNAME: $('#name' + $scope.persons[i]).val(),
                    BANKID: $('#bank' + $scope.persons[i]).val(),
                    BANKBRANCHNAME: $('#branch' + $scope.persons[i]).val(),
                    BANKACCOUNTNO: $('#book' + $scope.persons[i]).val()
                }
            );
        }

        for (var i = 0; i < $scope.rents.length; i++) {
            for (var j = 0; j < $scope.persons.length; j++) {
                if (doc.SERVICEATTACHMENTFLAG) {

                    var serviceflag = 1;
                    var taxFlag = $('input[id=taxcal' + $scope.rents[i] + $scope.persons[j] + ']:checked').length;
                    if ($('input[name=' + $scope.rents[i] + $scope.persons[j] + ']:checked').val() == undefined ||
                        $('input[name=' + $scope.rents[i] + $scope.persons[j] + ']:checked').val().split(',')[1] == "false") {
                        serviceflag = 0;
                    }

                    rentList.push(
                        {
                            STARTYEAR: $('#yearstart' + $scope.rents[i]).val(),
                            ENDYEAR: $('#yearend' + $scope.rents[i]).val(),
                            STARTDATE: ValueMangement.DateTime($('#startdate' + $scope.rents[i]).val(), "th"),
                            ENDDATE: ValueMangement.DateTime($('#enddate' + $scope.rents[i]).val(), "th"),
                            RECEIVEPERSONNAME: $('#name' + $scope.persons[j]).val(), //document.getElementById('person' + $scope.rents[i] + $scope.persons[j]).innerHTML,
                            LANDLEASEAMOUNT: $('#amount' + $scope.rents[i] + $scope.persons[j]).val().replace(/,/g, ""),
                            SERVICEAMOUNT: $('#service' + $scope.rents[i] + $scope.persons[j]).val().replace(/,/g, ""),
                            VATCALFLAG: taxFlag,
                            SERVICETAXFLAG: serviceflag,

                        }
                    );
                }
                else {
                    rentList.push(
                        {
                            STARTYEAR: $('#yearstart' + $scope.rents[i]).val(),
                            ENDYEAR: $('#yearend' + $scope.rents[i]).val(),
                            STARTDATE: ValueMangement.DateTime($('#startdate' + $scope.rents[i]).val(), "th"),
                            ENDDATE: ValueMangement.DateTime($('#enddate' + $scope.rents[i]).val(), "th"),
                            RECEIVEPERSONNAME: $('#name' + $scope.persons[j]).val(), //document.getElementById('person' + $scope.rents[i] + $scope.persons[j]).innerHTML,
                            LANDLEASEAMOUNT: $('#amount' + $scope.rents[i] + $scope.persons[j]).val().replace(/,/g, ""),
                        }
                    );
                }

            }
        }

        if (doc.FUTUREPAYMENTOUTFLAG) {
            doc.FUTUREPAYMENTOUTFLAG = doc.FUTUREPAYMENTOUTFLAG ? 1 : 0;
            doc.FUTUREPAYMENTOUTTERM = $('#FUTUREPAYMENTOUTTERM').val();
            doc.FUTUREPAYMENTOUTSTARTDATE = ValueMangement.DateTime($('#FUTUREPAYMENTOUTSTARTDATE').val(), "th");
            doc.FUTUREPAYMENTOUTENDDATE = ValueMangement.DateTime($('#FUTUREPAYMENTOUTENDDATE').val(), "th");
        }
        else {
            doc.FUTUREPAYMENTOUTTERM = null;
            doc.FUTUREPAYMENTOUTSTARTDATE = null;
            doc.FUTUREPAYMENTOUTENDDATE = null;
        }

        if (doc.FUTURESERVICEPAYMENTOUTFLAG && doc.SERVICEATTACHMENTFLAG) {
            doc.FUTURESERVICEPAYMENTOUTFLAG = doc.FUTURESERVICEPAYMENTOUTFLAG ? 1 : 0;
            doc.FUTURESERVICEPAYMENTOUTTERM = $('#FUTURESERVICEPAYMENTOUTTERM').val();
            doc.FUTURESERVICEPAYMENTOUTSTARTDATE = ValueMangement.DateTime($('#FUTURESERVICEPAYMENTOUTSTARTDATE').val(), "th");
            doc.FUTURESERVICEPAYMENTOUTENDDATE = ValueMangement.DateTime($('#FUTURESERVICEPAYMENTOUTENDDATE').val(), "th");
        }
        else {
            doc.FUTURESERVICEPAYMENTOUTTERM = null;
            doc.FUTURESERVICEPAYMENTOUTSTARTDATE = null;
            doc.FUTURESERVICEPAYMENTOUTENDDATE = null;
        }

        if ($('input[name=DEPOSITFLAG]:checked').val() == undefined || $('input[name=DEPOSITFLAG]:checked').val() == "false") {
            doc.DEPOSITFLAG = 0;
            doc.DEPOSITAMOUNT = 0;
            doc.DEPOSITREMARKS = "";
        }
        else {
            doc.DEPOSITFLAG = 1;
            doc.DEPOSITAMOUNT = doc.DEPOSITAMOUNT.toString().replace(/,/g, "");
        }


        doc.LESSORINFO = lessorList;
        doc.RECEIVEPERSONINFO = recieptInfo;
        doc.LANDLEASERATE = rentList;

        var data = {};
        data.REQUEST = req;
        data.DOCUMENT_LANDLEASEAGREEMENT = doc;

        data.REQUEST.DOCTYPEID = 1; //1> LL	เอกสารสัญญาเช่า	เอกสารสัญญาเช่า
        data.REQUEST.REQUESTSTATUS = status;  // 1>	Draft	แบบร่าง  |   2> Request New Document	รอเอกสารอนุมัติ

        data.REQUEST.USERREQUESTID = userSession.USER.USERID;
        data.REQUEST.USERREQUESTNAME = userSession.USER.USERNAME;
        data.REQUEST.DOC_CREATEDATE = ValueMangement.DateTime($("#DOC_CREATEDATE").val(), "th");
        data.REQUEST.DOC_EFFECTIVEDATE = ValueMangement.DateTime($("#DOC_EFFECTIVEDATE").val(), "th");
        data.REQUEST.DOC_EXPIREDATE = ValueMangement.DateTime($("#DOC_EXPIREDATE").val(), "th");
        data.REQUEST.DOC_CANCELDATE = ValueMangement.DateTime($("#DOC_CANCELDATE").val(), "th");
        data.DOCUMENT_LANDLEASEAGREEMENT.SERVICEATTACHMENTFLAG = data.DOCUMENT_LANDLEASEAGREEMENT.SERVICEATTACHMENTFLAG ? 1 : 0;
        data.DOCUMENT_LANDLEASEAGREEMENT.FIRSTPAYMENTOUTDATE = ValueMangement.DateTime($("#FIRSTPAYMENTOUTDATE").val(), "th");

        return data;
    }

    function validateRequest(req) {

        if (ValueMangement.NoneString(req.STORECODE) == "") {
            return { flag: false, text: "กรุณาเลือกสาขา" };
        }
        else {
            return { flag: true, text: "" };
        }

    }

    function validateDocument(doc) {

        if (ValueMangement.NoneString(doc.AGREEMENTTYPEID) == "") {
            return { flag: false, text: "กรุณาเลือกประเภทสัญญา" };
        }
        else {
            return { flag: true, text: "" };
        }

    }

    function validateSubmit(req, doc) {

        var result = { flag: true, text: "" };

        if ($scope.lessors.length < 1) {
            return { flag: false, text: "เพิ่มชุดรายละเอียดผู้ให้เช่าอย่างน้อยต้องมี 1 คน" };
        }

        //if (ValueMangement.NoneString(doc.AGREEMENTNO) == "") {
        //    return { flag: false, text: "กรุณากรอกเลขที่สัญญา" };
        //}

        if (ValueMangement.NoneString($("#DEEDOWNER").val()) == "") {
            return { flag: false, text: "กรุณากรอกชื่อเจ้าของโฉนด" };
        }

        //if (ValueMangement.DateTime(req.DOC_CREATEDATE) == "") {
        //    return { flag: false, text: "กรุณากรอกวันที่ทำสัญญา" };
        //}

        //if (ValueMangement.DateTime(req.DOC_EFFECTIVEDATE) == "") {
        //    return { flag: false, text: "กรุณากรอกวันที่เริ่มทำสัญญา" };
        //}

        //if (ValueMangement.DateTime(req.DOC_EXPIREDATE) == "") {
        //    return { flag: false, text: "กรุณากรอกวันที่สิ้นสุดสัญญา" };
        //}

        if (ValueMangement.DateTime($("#DOC_CREATEDATE").val()) == "") {
            return { flag: false, text: "กรุณากรอกวันที่ทำสัญญา" };
        }

        if (ValueMangement.DateTime($("#DOC_EFFECTIVEDATE").val()) == "") {
            return { flag: false, text: "กรุณากรอกวันที่เริ่มทำสัญญา" };
        }

        if (ValueMangement.DateTime($("#DOC_EXPIREDATE").val()) == "") {
            return { flag: false, text: "กรุณากรอกวันที่สิ้นสุดสัญญา" };
        }

        //if (ValueMangement.DateTime(doc.FIRSTPAYMENTOUTDATE) == "") {
        //    return { flag: false, text: "กรุณากรอกกำหนดชำระงวดแรก" };
        //}

        if (doc.FUTUREPAYMENTOUTFLAG) {
            if (ValueMangement.DateTime(doc.FUTUREPAYMENTOUTSTARTDATE) == "") {
                return { flag: false, text: "กรุณากรอกชำระค่าเช่าล่วงหน้าตั้งแต่วันที่" };
            }

            if (ValueMangement.DateTime(doc.FUTUREPAYMENTOUTENDDATE) == "") {
                return { flag: false, text: "กรุณากรอกชำระค่าเช่าล่วงหน้าถึงวันที่" };
            }

            if (ValueMangement.DateTime(doc.FUTUREPAYMENTOUTSTARTDATE) >= ValueMangement.DateTime(doc.FUTUREPAYMENTOUTENDDATE)) {
                return { flag: false, text: "กรุณากรอกชำระค่าเช่าล่วงหน้าถึงวันที่มากกว่าตั้งแต่วันที่" };
            }
        }

        if (doc.FUTURESERVICEPAYMENTOUTFLAG && doc.SERVICEATTACHMENTFLAG) {
            if (ValueMangement.DateTime(doc.FUTURESERVICEPAYMENTOUTSTARTDATE) == "") {
                return { flag: false, text: "กรุณากรอกชำระค่าบริการล่วงหน้าตั้งแต่วันที่" };
            }

            if (ValueMangement.DateTime(doc.FUTURESERVICEPAYMENTOUTENDDATE) == "") {
                return { flag: false, text: "กรุณากรอกชำระค่าบริการล่วงหน้าถึงวันที่" };
            }

            if (ValueMangement.DateTime(doc.FUTURESERVICEPAYMENTOUTSTARTDATE) >= ValueMangement.DateTime(doc.FUTURESERVICEPAYMENTOUTENDDATE)) {
                return { flag: false, text: "กรุณากรอกชำระค่าบริการล่วงหน้าถึงวันที่มากกว่าตั้งแต่วันที่" };
            }
        }

        for (var i = 0; i < $scope.lessors.length; i++) {

            //if ($('#code' + $scope.lessors[i]).val() == "") {
            //    result = { flag: false, text: "กรุณากรอกรหัสผู้ให้เช่า" };
            //    break;
            //}
            if ($('#tax' + $scope.lessors[i]).val() == "") {
                result = { flag: false, text: "กรุณากรอกเลขประจำตัวผู้เสียภาษี" };
                break;
            }
            if ($('#name' + $scope.lessors[i]).val() == "") {
                result = { flag: false, text: "กรุณากรอกชื่อผู้ให้เช่า" };
                break;
            }
            if ($('#address' + $scope.lessors[i]).val() == "") {
                result = { flag: false, text: "กรุณากรอกที่อยู่ของผู้ให้เช่า" };
                break;
            }
            if ($('#type' + $scope.lessors[i]).val() == "") {
                result = { flag: false, text: "กรุณาเลือกผู้รับภาระภาษีโรงเรือน และที่ดิน" };
                break;
            }
            if ($('#type' + $scope.lessors[i]).val() == "4" && $('#other' + $scope.lessors[i]).val() == "") {
                result = { flag: false, text: "กรุณากรอกหมายเหตุอื่น ๆ" };
                break;
            }

        }

        for (var i = 0; i < $scope.persons.length; i++) {
            if (ValueMangement.NoneString($('#name' + $scope.persons[i]).val()) == "") {
                result = { flag: false, text: "กรุณากรอกชื่อผู้รับเงิน" };
                break;
            }

            if (ValueMangement.NoneString($('#branch' + $scope.persons[i]).val()) == "") {
                result = { flag: false, text: "กรุณากรอกสาขาธนาคาร" };
                break;
            }

            if (regex.bookbank.test($('#book' + $scope.persons[i]).val()) == "") {
                result = { flag: false, text: "กรุณากรอกเลขบัญชี" };
                break;
            }

            if ($('#bank' + $scope.persons[i]).val() == "") {
                result = { flag: false, text: "กรุณาเลือกธนาคาร" };
                break;
            }
        }

        if ($scope.rents.length < 1) {
            return { flag: false, text: "เพิ่มชุดรายละเอียดอัตราค่าเช่าอย่างน้อยต้องมี 1 เงื่อนไข" };
        }

        for (var i = 0; i < $scope.rents.length; i++) {
            for (var j = 0; j < $scope.persons.length; j++) {

                if (ValueMangement.Number($('#yearstart' + $scope.rents[i]).val()) < 1 || ValueMangement.Number($('#yearend' + $scope.rents[i]).val()) < 1) {
                    result = { flag: false, text: "กรุณาใส่ปีมากกว่าหรือเท่ากับ 1" };
                    break;
                }

                //if (ValueMangement.Number($('#yearstart' + $scope.rents[i]).val()) >= ValueMangement.Number($('#yearend' + $scope.rents[i]).val())) {
                //    result = { flag: false, text: "กรุณาเลือกปีเริ่มต้น-สิ้นสุด ให้สัมพันธ์กับระยะเวลาการเช่าในแต่ละช่วง" };
                //    break;
                //}

                if (regex.number.test($('#amount' + $scope.rents[i] + $scope.persons[j]).val()) == "" && regex.number.test($('#service' + $scope.rents[i] + $scope.persons[j]).val()) == "") {
                    result = { flag: false, text: "กรุณาใส่อัตราค่าเช่าหรือ อัตราบริการ อย่างใดอย่างหนึ่ง" };
                    break;
                }

                if (ValueMangement.DateTime($('#startdate' + $scope.rents[i]).val()) == "") {
                    result = { flag: false, text: "กรุณาเลือกวันที่เริ่มต้น" };
                    break;
                }

                if (ValueMangement.DateTime($('#enddate' + $scope.rents[i]).val()) == "") {
                    result = { flag: false, text: "กรุณาเลือกวันที่สิ้นสุด" };
                    break;
                }

                if (new Date(ValueMangement.DateTime($('#startdate' + $scope.rents[i]).val())) >= new Date(ValueMangement.DateTime($('#enddate' + $scope.rents[i]).val()))) {
                    result = { flag: false, text: "กรุณาเลือกวันที่สิ้นสุดมากกว่าวันที่เริ่มต้น" };
                    break;
                }
            }
        }

        if (ValueMangement.NoneString($("#LANDLEASETAXTYPEID").val()) == "") {
            return { flag: false, text: "กรุณาเลือกการคำนวณภาษีอัตราค่าเช่า" };
        }

        if (doc.SERVICEATTACHMENTFLAG) {
            if (ValueMangement.NoneString($("#SERVICETAXTYPEID").val()) == "") {
                return { flag: false, text: "กรุณาเลือกการคำนวณภาษีค่าบริการ" };
            }
        }
        
        if ($("#landleaseFile")[0].files[0] == undefined) {
            return { flag: false, text: "เลือกไฟล์หนังสือสัญญาเช่า" };
        }
        if (ValueMangement.NoneString(req.NOTICENUMBER_EXPIRE) == "") {
            result = { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }
        if (ValueMangement.NoneString(req.NOTICEUNIT_EXPIRE) == "") {
            result = { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }

        return result;

    }

    function upLoadFile(reqno) {
        if ($("#landleaseFile")[0].files[0] != undefined) {
            document.getElementById("landleaseFileprogress").setAttribute("style", "display:");
            var landleaseUpload = new landleaseFile($("#landleaseFile")[0].files[0]);
            landleaseUpload.doUpload(reqno);
        }
        else {
            landleaseFiles = 1;
        }

        if ($("#serviceFile")[0].files[0] != undefined) {
            document.getElementById("serviceFileprogress").setAttribute("style", "display:");
            var serviceUpload = new serviceFile($("#serviceFile")[0].files[0]);
            serviceUpload.doUpload(reqno);
        }
        else {
            serviceFiles = 1;
        }

        if ($("#evidenceFile")[0].files[0] != undefined) {
            document.getElementById("evidenceFileprogress").setAttribute("style", "display:");
            var evidenceUpload = new evidenceFile($("#evidenceFile")[0].files[0]);
            evidenceUpload.doUpload(reqno);
        }
        else {
            evidenceFiles = 1;
        }

        if ($("#otherFile")[0].files[0] != undefined) {
            document.getElementById("otherFileprogress").setAttribute("style", "display:");
            var otherUpload = new otherFile($("#otherFile")[0].files);
            otherUpload.doUpload(reqno);
        }
        else {
            otherFiles = 1;
        }

        if ($scope.req.REQUESTSTATUS == 1 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
            $window.location.assign('../REQUEST/REQ_300');
        }
        else if ($scope.req.REQUESTSTATUS == 2 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
            $window.location.assign('../SEARCH/SEARCH_100');
        }
    }

    var landleaseFile = function (file) {
        this.file = file;
    };
    landleaseFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.name);
        formData.append("upload_file", true);

        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.landleaseFile + "&reqno=" + reqno + "&filetype=" + "landlease",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                landleaseFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../REQUEST/REQ_300');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_100');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                Notification.notiFail(err);
            }
        });
    };
    landleaseFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#landleaseFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    var serviceFile = function (file) {
        this.file = file;
    };
    serviceFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.name);
        formData.append("upload_file", true);

        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.landleaseFile + "&reqno=" + reqno + "&filetype=" + "service",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                serviceFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../REQUEST/REQ_300');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_100');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    serviceFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#serviceFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    var evidenceFile = function (file) {
        this.file = file;
    };
    evidenceFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.name);
        formData.append("upload_file", true);

        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.landleaseFile + "&reqno=" + reqno + "&filetype=" + "evidence",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                evidenceFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../REQUEST/REQ_300');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_100');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    evidenceFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#evidenceFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    var otherFile = function (file) {
        this.file = file;
    };
    otherFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        for (var i = 0; i < this.file.length; i++) {
            //add assoc key values, this will be posts values.file
            console.log(this.file[i]);
            console.log(this.file[i].name);

            formData.append("file" + i, this.file[i], this.file[i].name);
            formData.append("upload_file" + i, true);
        }


        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.landleaseFile + "&reqno=" + reqno + "&filetype=" + "other",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                otherFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../REQUEST/REQ_300');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_100');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    otherFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#otherFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };
})

.controller('REQ_200_Ctrl', function ($scope, $window, $timeout, constants, config, Loading, Notification, ValueMangement, Dropdownlist, FileInput, TextArea, DatePicker, RequestAPI, StoreAPI, PropertyAPI, DocumentAPI) {

    /* The REQ_200_Ctrl(Variable Controller) sign at 12/03/2018 */
    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    var licenseFiles = 0;
    var otherFiles = 0;

    $scope.req = {};
    $scope.doc = {};

    DatePicker.datePicker();

    /* The REQ_200_Ctrl(PageLoad Controller) sign at 12/03/2018 */

    Loading.showLoad();

    init();

    angular.element(document).ready(domReady);

    ///////////////====================================================================

    function domReady() {
        
        var dropdownProps = {
            allow_single_deselect: true,
            width: '41.66%'
        };
        
        FileInput.single();
        FileInput.multi();
        
        angular.element(".chosen-select").chosen(dropdownProps);
    }

    function init(){
        angular.element.when(
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLICENSETYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLHOUSEANDLANDTAXTYPE'),
            StoreAPI.getStoreByProperty({ ACTIVE: 1 }),
        ).done(handleInitPromises).always(cleanup);
    }

    function handleInitPromises() {
        var dataarray = arguments;
        var idx = 0;
        $scope.licenseTypes = dataarray[idx++][0] || [];
        $scope.houseAndLandTaxTypes = dataarray[idx++][0] || [];
        $scope.stores = dataarray[idx++][0] || [];

        $scope.$apply(function applyUpdateControls() {
            $timeout(updateControlsTimeout);
        });

        ////////////===============================================================================

        function updateControlsTimeout() {
            Dropdownlist.updateUI('.chosen-select');
            DatePicker.datePicker('#content');
        }
    }

    function cleanup() {
        Loading.hideLoad();
    }

    ///////////////====================================================================

    $scope.validateAmountNumber = function ($event) {
        var value = ValueMangement.NoneString($event.target.value);
        var decision = value.split(".");
        var nPoint = (value.match(new RegExp("\\.", "g")) || []).length;
        if (isNaN(String.fromCharCode($event.keyCode)) && (String.fromCharCode($event.keyCode)) != '.') {
            $event.preventDefault();
        }
        if (decision.length > 1) {
            if ((String.fromCharCode($event.keyCode)) == '.') {
                $event.preventDefault();
            }
            if ($event.target.selectionStart > value.indexOf('.')) {
                if (decision[1].length >= 4) {
                    $event.preventDefault();
                }
            }

        }
    }

    $scope.currencyAmountNumber = function (value) {
        return currency(value);
    }

    function currency(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }

    $scope.saveDraft = function (req, doc, status) {

        licenseFiles = 0;
        otherFiles = 0;

        $scope.req.REQUESTSTATUS = 1;

        var data = {};
        req = Object.assign({}, req);
        doc = Object.assign({}, doc);

        var validraft = validateDraft(req, doc);

        if (!validraft.flag) {
            Notification.notiWarn(validraft.text);
            return;
        };

        data = setData(req, doc, 1);

        Loading.showLoad();

        DocumentAPI.insertDocumentLicense(data).then(function (response) {
            runno = response.MSGTEXT;

            if (response.MSGSTATUS == 0) {
                response.MSGTEXT = "Success";

                cleanup();

                var session = $window.sessionStorage;
                session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                sessionStorage.setItem("alert", JSON.stringify(response));

                upLoadFile(runno);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    $scope.submitDocument = function (req, doc) {

        licenseFiles = 0;
        otherFiles = 0;

        var data = {};

        $scope.req.REQUESTSTATUS = 2;

        req = Object.assign({}, req);
        doc = Object.assign({}, doc);

        var validraft = validateDraft(req, doc);
        var valireq = validateRequest(req);
        var validoc = validateDocument(doc);

        if (!validraft.flag) {
            Notification.notiWarn(validraft.text);
            return;
        };

        if (!valireq.flag) {
            Notification.notiWarn(valireq.text);
            return;
        };

        if (!validoc.flag) {
            Notification.notiWarn(validoc.text);
            return;
        };

        if ($("#licenseFile")[0].files[0] == undefined) {
            Notification.notiWarn("กรุณาแนบไฟล์ใบอนุญาต");
            return;
        }

        Loading.showLoad();

        data = setData(req, doc, 2);

        DocumentAPI.insertDocumentLicense(data).then(function (response) {
            runno = response.MSGTEXT;

            if (response.MSGSTATUS == 0) {
                response.MSGTEXT = "สำเร็จ";

                cleanup();

                var session = $window.sessionStorage;
                session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
                sessionStorage.setItem("alert", JSON.stringify(response));

                upLoadFile(runno);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    /* The REQ_200_Ctrl(Function Controller) sign at 12/03/2018 */

    function setData(req, doc, status) {
        var data = {};
        req.DOCTYPEID = 2;
        req.REQUESTSTATUS = status;
        req.USERREQUESTID = userSession.USER.USERID;
        req.USERREQUESTNAME = userSession.USER.USERNAME;
        req.DOC_EFFECTIVEDATE = ValueMangement.DateTime($("#DOC_EFFECTIVEDATE").val(), "th");
        req.DOC_EXPIREDATE = ValueMangement.DateTime($("#DOC_EXPIREDATE").val(), "th");

        //doc.FEEAMOUNT = doc.FEEAMOUNT.replace(/,/g, "");
        doc.FEEAMOUNT = ValueMangement.NoneString(doc.FEEAMOUNT).replace(/,/g, "")

        data.REQUEST = req;
        data.DOCUMENT_LICENSE = doc;

        return data;
    }

    function validateDraft(req, doc) {

        if (ValueMangement.NoneString(req) == "") {
            return { flag: false, text: "กรุณาเลือกร้านค้า" };
        }

        if (ValueMangement.NoneString(req.STORECODE) == "") {
            return { flag: false, text: "กรุณาเลือกร้านค้า" };
        }

        if (ValueMangement.NoneString(doc) == "") {
            return { flag: false, text: "กรุณาเลือกประเภทใบอนุญาต" };
        }

        if (ValueMangement.NoneString(doc.LICENSETYPEID) == "") {
            return { flag: false, text: "กรุณาเลือกประเภทใบอนุญาต" };
        }

        return { flag: true, text: "สำเร็จ" };
    }

    function validateRequest(req) {

        if (ValueMangement.NoneString(req.DOC_EFFECTIVEDATE) == "") {
            return { flag: false, text: "กรุณาเลือกวันที่ดำเนินการต่ออายุ" };
        }

        if (ValueMangement.NoneString(req.DOC_EXPIREDATE) == "") {
            return { flag: false, text: "กรุณาเลือกวันที่หมดอายุสัญญาเช่าที่" };
        }

        if (ValueMangement.NoneString(req.NOTICENUMBER_EXPIRE) == "") {
            return { flag: false, text: "กรุณากรอกจำนวนแจ้งเตือนหมดอายุ" };
        }

        if (ValueMangement.NoneString(req.NOTICEUNIT_EXPIRE) == "") {
            return { flag: false, text: "กรุณาเลือกหน่วยแจ้งเตือนหมดอายุ" };
        }
        if (ValueMangement.NoneString(req.NOTICENUMBER_EXPIRE) == "") {
            return { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }
        if (ValueMangement.NoneString(req.NOTICEUNIT_EXPIRE) == "") {
            return { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }

        return { flag: true, text: "สำเร็จ" };

    }

    function validateDocument(doc) {

        if (ValueMangement.NoneString(doc.LICENSEBOOKNO) == "") {
            return { flag: false, text: "กรุณากรอก เล่มที่ ของใบอนุญาต" };
        }

        else if (ValueMangement.NoneString(doc.LICENSEDOCNO) == "") {
            return { flag: false, text: "กรุณากรอก เลขที่ หรือฉบับที่ ของใบอนุญาต" };
        }

        else if (ValueMangement.NoneString(doc.FEEAMOUNT) + "".replace(/,/g, "") == "" && doc.LICENSETYPEID != "9") {
            return { flag: false, text: "กรุณากรอก ค่าธรรมเนียม (฿) ของใบอนุญาต" };
        }

        return { flag: true, text: "สำเร็จ" };

    }

    function cleanup() {
        Loading.hideLoad();
    }

    function upLoadFile(reqno) {
        if ($("#licenseFile")[0].files[0] != undefined) {
            document.getElementById("licenseFileprogress").setAttribute("style", "display:");
            var licenseUpload = new licenseFile($("#licenseFile")[0].files[0]);
            licenseUpload.doUpload(reqno);
        }
        else {
            licenseFiles = 1;
        }

        if ($("#otherFile")[0].files[0] != undefined) {
            document.getElementById("otherFileprogress").setAttribute("style", "display:");
            var otherUpload = new otherFile($("#otherFile")[0].files);
            otherUpload.doUpload(reqno);
        }
        else {
            otherFiles = 1;
        }

        if ($scope.req.REQUESTSTATUS == 1 && licenseFiles == 1 && otherFiles == 1) {
            $window.location.assign('../REQUEST/REQ_400');
        }
        else if ($scope.req.REQUESTSTATUS == 2 && licenseFiles == 1 && otherFiles == 1) {
            $window.location.assign('../SEARCH/SEARCH_200');
        }
    }

    var licenseFile = function (file) {
        this.file = file;
    };
    licenseFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.name);
        formData.append("upload_file", true);

        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.licenseFile + "&reqno=" + reqno + "&filetype=" + "license",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                licenseFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && licenseFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../REQUEST/REQ_400');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && licenseFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_200');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    licenseFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#licenseFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    var otherFile = function (file) {
        this.file = file;
    };
    otherFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        for (var i = 0; i < this.file.length; i++) {
            //add assoc key values, this will be posts values.file
            console.log(this.file[i]);
            console.log(this.file[i].name);

            formData.append("file" + i, this.file[i], this.file[i].name);
            formData.append("upload_file" + i, true);
        }


        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.licenseFile + "&reqno=" + reqno + "&filetype=" + "other",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                otherFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && licenseFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../REQUEST/REQ_400');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && licenseFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_200');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    otherFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#otherFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

})

.controller('REQ_300_Ctrl', function ($scope, $timeout, $window, constants, Loading, Notification, ValueMangement, Table, StoreAPI, PropertyAPI, UserAPI, SearchAPI, DocumentAPI) {

    var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

    Loading.showLoad();

    $scope.loadingCounter = 0;

    $scope.search = serchsession == null ? {} : serchsession;

    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    $scope.getRequestByProperty = getRequestByProperty;

    $scope.stringToDate = stringToDate;

    $scope.viewDetail = viewDetail;

    $scope.confirmDeleteDraft = confirmDeleteDraft;

    init();

    angular.element(document).ready(domReady);


    ////////////===============================================================================

    function getRequestByProperty(search) {

        sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

        Loading.showLoad();

        var data = angular.copy(search || {});
        data.DOCTYPEID = 1;     // agreement only
        data.REQUESTSTATUS = -1; // pending for approval only
        data.USERREQUESTID = userSession.USER.USERID; /*data.USERREQUESTID || -1;*/
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

    function deleteDraft(data) {
        Loading.showLoad();
        $scope.loadingCounter++;

        DocumentAPI.deleteDraftDocument(data)
            .then(handleMsgResponse)
            .always(cleanup);

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
        $window.location.assign('REQ_310');
    }

    function confirmDeleteDraft(row) {

        bootbox.dialog({
            message: "<span class='bigger-110'>คุณต้องการลบแบบร่าง " + row.REQID + " ใช่หรือไม่ ?</span>",
            data: row,
            buttons:
                {
                    "delete":
                        {
                            "label": "ใช่",
                            "className": "btn-sm btn-danger",
                            "callback": confirmedDeleteDraftCallBack
                        },
                    "cancel":
                        {
                            "label": "ไม่",
                            "className": "btn-sm"
                        }
                }
        });

        function confirmedDeleteDraftCallBack() {
            deleteDraft(row);
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
        getRequestByProperty($scope.search);
        angular.element('#modal-table').modal('hide');
    }

    function cleanup() {

        if (--$scope.loadingCounter === 0) {
            Loading.hideLoad();
        }
    }
})

.controller('REQ_310_Ctrl', function ($scope, $window, $timeout, $http, constants, regex, config, Loading, Notification, ValueMangement, Dropdownlist, FileInput, TextArea, DatePicker, Tag, Spinner, RequestAPI, StoreAPI, PropertyAPI, TaxTypeAPI, DocumentAPI, FileAttachmentAPI) {

    /* The REQ_110_Ctrl(Variable Controller) sign at 13/03/2018 */

    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));
    var connt = 0;

    var request = {
        REQUEST: {
            REQID: $window.sessionStorage.REQID, //REQ18030088  REQ18030153
            DOCTYPEID: $window.sessionStorage.DOCTYPEID
        }
    };

    var landleaseFiles = 0;
    var serviceFiles = 0;
    var evidenceFiles = 0;
    var otherFiles = 0;

    $scope.persons = ["person1"];
    $scope.namepersons = [];
    $scope.lessors = [];
    $scope.rents = [];
    $scope.req = {};
    $scope.doc = { FUTUREPAYMENTOUTFLAG: false, FUTURESERVICEPAYMENTOUTFLAG: false, SERVICEATTACHMENTFLAG: false, DEPOSITFLAG: false };
    $scope.lessorList = [];
    $scope.recieptInfo = [];
    $scope.rentList = [];
    $scope.setContactFlag = setContactFlag;

    DatePicker.datePicker();
    Tag.tag_input();

    Loading.showLoad();

    init();

    angular.element(document).ready(domReady);

    /* The REQ_100_Ctrl(PageLoad Controller) sign at 07/03/2018 */

    function init() {
        angular.element.when(
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLAGREEMENTTYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLPAYMENTERM'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLHOUSEANDLANDTAXTYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLBANK'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORTYPE'),
            TaxTypeAPI.getTaxTypeList(null),
            StoreAPI.getStoreByProperty({ ACTIVE: 1 }),
            FileAttachmentAPI.getFileAttachmentByRequest(request.REQUEST),
            DocumentAPI.getDocumentDetail(request)
        ).done(handleInitPromises).always(cleanup);

        //StoreAPI.getStoreList()
        //    .then(handleStoreListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLAGREEMENTTYPE')
        //    .then(handleAgreementTypeListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLBANK')
        //    .then(handleBankListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLPAYMENTERM')
        //    .then(handlePaymentTermListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORTYPE')
        //    .then(handleLessorTypeListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLHOUSEANDLANDTAXTYPE')
        //    .then(handleHouseTaxTypeListResponse)
        //    .always(cleanup);

        //TaxTypeAPI.getTaxTypeList(null)
        //    .then(handleTaxTypeListResponse)
        //    .always(cleanup);

        //FileAttachmentAPI.getFileAttachmentByRequest(request.REQUEST)
        //    .then(handleFileAttachmentResponse)
        //    .always(cleanup);

        //DocumentAPI.getDocumentDetail(request)
        //    .then(handleDocumentResponse)
        //    .always(cleanup);
    }

    function domReady() {
        //setDocDetail($scope.req, $scope.doc)
        //updateData($scope.req, $scope.doc);
        //DatePicker.datePicker();
        //FileInput.single();
        //FileInput.multi();
        //$scope.setDisable();

        var dropdownProps = {
            allow_single_deselect: true,
            width: '41.66%'
        };
        angular.element(".chosen-select").chosen(dropdownProps);

        //$("#RECEIVEPERSONNUMBER").val(1).trigger("chosen:updated");
        //$("#PAYMENTOUTWITHINDATE").val(5).trigger("chosen:updated");
        //$("#PAYMENTOUTTERM").val(1).trigger("chosen:updated");
        //$("#FUTUREPAYMENTOUTTERM").val(3).trigger("chosen:updated");

        //$scope.addLessor();
        //$scope.addRent();
        //$scope.pushRecievePersonNumber(1);
        //$scope.setDepositFlag(false);
        //$scope.setDisable();
        //FileInput.single();
        //FileInput.multi();

    }

    function handleInitPromises() {
        var dataarray = arguments;
        var idx = 0;
        $scope.agreementtypes = dataarray[idx++][0] || [];
        $scope.paymentoutterms = dataarray[idx++][0] || [];
        $scope.houselandtaxs = dataarray[idx++][0] || [];
        $scope.banks = dataarray[idx++][0] || [];
        $scope.lessortypes = dataarray[idx++][0] || [];
        $scope.taxtypes = dataarray[idx++][0] || [];
        $scope.stores = dataarray[idx++][0] || [];
        $scope.files = dataarray[idx++][0] || [];
        var model = dataarray[idx++][0] || [];
        
        $scope.req = model.REQUEST;
        $scope.doc = model.DOCUMENT_LANDLEASEAGREEMENT;
        
        setDocDetail($scope.req, $scope.doc);

        $scope.$apply(function applyUpdateControls() {
            $timeout(updateControlsTimeout);
        });

        ////////////===============================================================================

        function updateControlsTimeout() {
            updateData($scope.req, $scope.doc);

            Dropdownlist.updateUI('.chosen-select');
            DatePicker.datePicker('#content');
           
            DatePicker.datePicker();
            FileInput.single();
            FileInput.multi();
            $scope.setDisable();
            $scope.setDisableServicePayment();
            Dropdownlist.chnageUI('41.66%');
        }
    }

    function handleDocumentResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.req = response.REQUEST;
            $scope.doc = response.DOCUMENT_LANDLEASEAGREEMENT;
            setDocDetail($scope.req, $scope.doc);

            $timeout(function () {
                updateData($scope.req, $scope.doc);
                DatePicker.datePicker();
                FileInput.single();
                FileInput.multi();
                $scope.setDisable();
                $scope.setDisableServicePayment();
                Dropdownlist.chnageUI('41.66%');
            });
        }
    }

    function handleStoreListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.stores = response;

            $timeout(function () {
                angular.element("#STORECODE").trigger("chosen:updated");
            });
        }
    }

    function handleAgreementTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.agreementtypes = response;

            $timeout(function () {
                angular.element("#AGREEMENTTYPEID").trigger("chosen:updated");
            });
        }
    }

    function handleBankListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.banks = response;
        }
    }

    function handlePaymentTermListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.paymentoutterms = response;

            $timeout(function () {
                angular.element("#PAYMENTOUTTERM").trigger("chosen:updated");
            });
        }
    }

    function handleLessorTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.lessortypes = response;
        }
    }

    function handleHouseTaxTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.houselandtaxs = response;

            $timeout(function () {
                angular.element("#HOUSEANDLANDTAX").trigger("chosen:updated");
            });
        }
    }

    function handleTaxTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.taxtypes = response;

            $timeout(function () {
                angular.element("#LANDLEASETAXTYPEID").trigger("chosen:updated");
                angular.element("#SERVICETAXTYPEID").trigger("chosen:updated");
            });
        }
    }


    /* The REQ_110_Ctrl(PageLoad Controller) sign at 13/03/2018 */
    //try {
    //    Loading.showLoad();
    //    PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLAGREEMENTTYPE').then(function (response) { $scope.agreementtypes = response; })

    //    PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLBANK').then(function (response) { $scope.banks = response; })

    //    PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLPAYMENTERM').then(function (response) { $scope.paymentoutterms = response; })

    //    PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORTYPE').then(function (response) { $scope.lessortypes = response; })

    //    PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLHOUSEANDLANDTAXTYPE').then(function (response) { $scope.houselandtaxs = response; })

    //    TaxTypeAPI.getTaxTypeList(null).then(function (response) { $scope.taxtypes = response; })

    //    StoreAPI.getStoreList(null).then(function (response) {
    //        $scope.stores = response;
    //        DocumentAPI.getDocumentDetail(request).then(function (response) {
    //            setTimeout(function () {
    //                $scope.$apply(function () {
    //                    $scope.req = response.REQUEST;
    //                    $scope.doc = response.DOCUMENT_LANDLEASEAGREEMENT;
    //                    console.log($scope.req, $scope.doc);
    //                    setDocDetail($scope.req, $scope.doc);
    //                });

    //                updateData($scope.req, $scope.doc);
    //                Dropdownlist.chnageUI('41.66%');
    //                DatePicker.datePicker();
    //                FileInput.single();
    //                FileInput.multi();
    //                $scope.setDisable();
    //            }, true);
    //        })

    //    })

    //    FileAttachmentAPI.getFileAttachmentByRequest(request.REQUEST).then(handleFileAttachmentResponse).always(function () { Loading.hideLoad(); });

    //} catch (e) {
    //    Loading.hideLoad();
    //    Notification.notiFail(e);
    //}


    /* The REQ_110_Ctrl(Event Controller) sign at 13/03/2018 */

    function handleFileAttachmentResponse(response) {
        $scope.$apply(updateForFileAttachment);

        function updateForFileAttachment() {
            $scope.files = response;
        }
    }

    function setContactFlag(id, value) {
        var name = id.split('contactFlag')[1];
        if (value) {
            $("#contact" + name).val("");
            $("#contact" + name).prop('disabled', true);
        }
        else {
            $("#contact" + name).removeProp('disabled');
        }
    }

    $scope.validateAmountNumber = function ($event) {
        var value = ValueMangement.NoneString($event.target.value);
        var decision = value.split(".");
        var nPoint = (value.match(new RegExp("\\.", "g")) || []).length;
        if (isNaN(String.fromCharCode($event.keyCode)) && (String.fromCharCode($event.keyCode)) != '.') {
            $event.preventDefault();
        }
        if (decision.length > 1) {
            if ((String.fromCharCode($event.keyCode)) == '.') {
                $event.preventDefault();
            }
            if ($event.target.selectionStart > value.indexOf('.')) {
                if (decision[1].length >= 4) {
                    $event.preventDefault();
                }
            }

        }
    }

    $scope.currencyAmountNumber = function (value) {
        return currency(value);
    }

    function currency(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }

    $scope.setDateFutureEnd = function (datestart) {

        setTimeout(function () {
            $scope.$apply(function () {
                $('#FUTUREPAYMENTOUTENDDATE').datepicker({
                    autoclose: true,
                    todayHighlight: true,
                    endDate: new Date()
                })
                    //show datepicker when clicking on the icon
                    .next().on(ace.click_event, function () {
                        $(this).prev().focus();
                    });
            });
            $("#FUTUREPAYMENTOUTENDDATE").datepicker("destroy");
        }, true);
    }

    $scope.setDisable = function () {

        if ($scope.doc.FUTUREPAYMENTOUTFLAG) {
            $('#FUTUREPAYMENTOUTTERM').get(0).removeAttribute('disabled');
            $('#FUTUREPAYMENTOUTSTARTDATE').get(0).removeAttribute('disabled');
            $('#FUTUREPAYMENTOUTENDDATE').get(0).removeAttribute('disabled');
        }
        else {
            $('#FUTUREPAYMENTOUTTERM').get(0).setAttribute('disabled', 'disabled');
            $('#FUTUREPAYMENTOUTSTARTDATE').get(0).setAttribute('disabled', 'disabled');
            $('#FUTUREPAYMENTOUTENDDATE').get(0).setAttribute('disabled', 'disabled');
        }

    }

    $scope.setDisableServicePayment = function () {

        if ($scope.doc.FUTURESERVICEPAYMENTOUTFLAG) {
            $('#FUTURESERVICEPAYMENTOUTTERM').get(0).removeAttribute('disabled');
            $('#FUTURESERVICEPAYMENTOUTSTARTDATE').get(0).removeAttribute('disabled');
            $('#FUTURESERVICEPAYMENTOUTENDDATE').get(0).removeAttribute('disabled');
        }
        else {
            $('#FUTURESERVICEPAYMENTOUTTERM').get(0).setAttribute('disabled', 'disabled');
            $('#FUTURESERVICEPAYMENTOUTSTARTDATE').get(0).setAttribute('disabled', 'disabled');
            $('#FUTURESERVICEPAYMENTOUTENDDATE').get(0).setAttribute('disabled', 'disabled');
        }

    }

    $scope.setDisabledLessor = function (name, value) {
        if (value == 3) {
            $('input[name="corporate' + name + '"]').removeAttr('disabled');
            $('#view' + name).attr('style', 'display:none');
        }
        else if (value == 4) {
            $('#view' + name).attr('style', 'display:');
            $('input[name="corporate' + name + '"]').attr('disabled', true);
            $('input[name="corporate' + name + '"]').removeAttr('checked');
        }
        else {
            $('#view' + name).attr('style', 'display:none');
            $('input[name="corporate' + name + '"]').attr('disabled', true);
            $('input[name="corporate' + name + '"]').removeAttr('checked');
        }

        if (connt != 0) {
            $('#other' + name).val('');
        }
        connt++;
    }

    $scope.setDisabledService = function (service) {
        if (service) {
            $('#SERVICETAXTYPEID').attr('disabled', true).trigger("chosen:updated");
            return true;
        }
        else {
            $('#SERVICETAXTYPEID').removeAttr('disabled').trigger("chosen:updated");
            return false;
        }
    }

    $scope.setDepositFlag = function (value) {
        if (value === "true" || value === true) {
            $('input[id=DEPOSITAMOUNT]').removeAttr('disabled');
            $('textarea[id=DEPOSITREMARKS]').removeAttr('disabled');
        }
        else {
            $('input[id=DEPOSITAMOUNT]').attr('disabled', true);
            $('textarea[id=DEPOSITREMARKS]').attr('disabled', true);
            //$('#DEPOSITAMOUNT').val("");
            //$('#DEPOSITREMARKS').val("");
        }
    }

    $scope.setIncludeTax = function (name, value) {
        name = name.split('taxcal')[1];
        if (value) {
            $('input[name="' + name + '"').removeAttr('disabled');
        }
        else {
            $('input[name="' + name + '"').attr('disabled', true);
            $('input[name="' + name + '"').removeAttr('checked');
            $('#tax' + name).val("");
        }
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
        }).then(function successCallback(response) {
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
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.setTax = function (value) {
        var taxCalFlag = $('input[id=taxcal' + value.split(',')[0] + ']:checked').val();
        if (taxCalFlag != undefined && taxCalFlag != 'false') {
            if (value.split(',')[1] == 'false') {
                if (document.getElementById('service' + value.split(',')[0]).value != '') {
                    document.getElementById('tax' + value.split(',')[0]).value = $scope.currencyAmountNumber(parseFloat(document.getElementById('service' + value.split(',')[0]).value.replace(/,/g, "")) * 0.07);
                }
                else {
                    document.getElementById('tax' + value.split(',')[0]).value = '';
                }
            }
            else {
                document.getElementById('tax' + value.split(',')[0]).value = '';
            }
        }
    }

    $scope.setTaxCal = function (conid, currency) {
        var id = conid.split('service')[1];

        var taxCalFlag = $('input[id=taxcal' + id + ']:checked').val();
        var input = $('input[name=' + id + ']:checked').val();
        if (taxCalFlag != undefined && taxCalFlag != 'false') {
            if (input == undefined || input.split(id + ",")[1] == "false") {
                if (document.getElementById('service' + id).value != '') {
                    document.getElementById('tax' + id).value = $scope.currencyAmountNumber(parseFloat(document.getElementById('service' + id).value.replace(/,/g, "")) * 0.07);
                }
                else {
                    document.getElementById('tax' + id).value = '';
                }
            }
        }
    }

    $scope.setPerson = function () {
        for (var i = 0; i < $scope.rents.length; i++) {
            for (var j = 0; j < $scope.persons.length; j++) {
                document.getElementById('person' + $scope.rents[i] + $scope.persons[j]).innerHTML = $('#name' + $scope.persons[j]).val();
            }
        }
    }

    $scope.addLessor = function () {
        var lessor = "lessor" + $scope.lessors.length;
        $scope.lessors.push(lessor);
        setTimeout(function () {
            $('input[name="corporate' + lessor + '"]').attr('disabled', true);
            $('input[name="corporate' + lessor + '"]').removeAttr('checked');
            Dropdownlist.chnageUI('41.66%');
            TextArea.inputLimit();
        }, true);
    }

    $scope.deleteLessor = function (lessor) {
        var index = $scope.lessors.indexOf(lessor);
        $scope.lessors.splice(index, 1);
    }

    $scope.pushRecievePersonNumber = function (number) {
        var numberpersons = [];

        for (var i = 0; i < number; i++) {
            numberpersons.push("person" + i);
        }
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.persons = numberpersons;
            });
            setTaxDefault();
            Dropdownlist.chnageUI('41.66%');
        }, true);
    }

    function setTaxDefault() {
        for (var i = 0; i < $scope.rents.length; i++) {
            for (var j = 0; j < $scope.persons.length; j++) {
                var id = "rents" + i + "person" + j;

                var taxCalFlag = $('input[id=taxcal' + id + ']:checked').val() != undefined ? true : false;

                $scope.setIncludeTax("taxcal" + id, taxCalFlag);
            }
        }
    }

    $scope.addRent = function () {
        var index = $scope.rents.length;

        $scope.rents.push("rents" + $scope.rents.length);

        var namepersons = [];

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.namepersons = namepersons;
            });

            for (var i = 0; i < $scope.persons.length; i++) {
                document.getElementById('person' + $scope.rents[$scope.rents.length - 1] + $scope.persons[i]).innerHTML = $('#name' + $scope.persons[i]).val();
                $('input[name="' + $scope.rents[$scope.rents.length - 1] + $scope.persons[i] + '"').attr('disabled', true);
            }

            Spinner.spinner("yearstartrents" + ($scope.rents.length - 1));
            Spinner.spinner("yearendrents" + ($scope.rents.length - 1));
            Dropdownlist.chnageUI('41.66%');
            DatePicker.datePicker();
        }, true);

    }

    $scope.deleteRent = function (rent) {
        var index = $scope.rents.indexOf(rent);
        $scope.rents.splice(index, 1);
    }

    $scope.saveDraft = function (req, doc) {
        landleaseFiles = 0;
        serviceFiles = 0;
        evidenceFiles = 0;
        otherFiles = 0

        $scope.req.REQUESTSTATUS = 1;

        var valiReq = validateRequest(req);
        var valiDoc = validateDocument(doc);

        if (!valiReq.flag) {
            Notification.notiWarn(valiReq.text);
            return;
        };

        if (!valiDoc.flag) {
            Notification.notiWarn(valiDoc.text);
            return;
        };

        var data = setData(Object.assign({}, req), Object.assign({}, doc), 1);

        Loading.showLoad();

        DocumentAPI.updateDocumentLandLeaseAgreement(data).then(function (response) {
            cleanup();
            var session = $window.sessionStorage;
            session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
            sessionStorage.setItem("alert", JSON.stringify(response));
            if (response.MSGSTATUS == 0) {
                clearSessionSearch(userSession);
                upLoadFile($scope.req.REQID);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    $scope.submitDocument = function (req, doc) {
        landleaseFiles = 0;
        serviceFiles = 0;
        evidenceFiles = 0;
        otherFiles = 0

        $scope.req.REQUESTSTATUS = 2;

        var valiReq = validateRequest(req);
        var valiDoc = validateDocument(doc);
        var valiSubmit = validateSubmit(req, doc);

        if (!valiReq.flag) {
            Notification.notiWarn(valiReq.text);
            return;
        };

        if (!valiDoc.flag) {
            Notification.notiWarn(valiDoc.text);
            return;
        };

        if (!valiSubmit.flag) {
            Notification.notiWarn(valiSubmit.text);
            return;
        };

        //Check When Revios
        if (req.REVISIONTYPE == '1' || req.REVISIONTYPE == '2' || req.REVISIONTYPE == '3') {
            if ($("#landleaseFile")[0].files[0] == undefined) {
                Notification.notiWarn("กรุณาแนบไฟล์หนังสือสัญญาเช่า");
                return;
            }
        }

        if (req.REVISIONTYPE == '3') {
            if (ValueMangement.NoneString(req.DOC_CANCELDATE) == "") {
                Notification.notiWarn("กรุณากรอกวันหมดอายุ");
                return;
            }
        }

        Loading.showLoad();

        var data = setData(Object.assign({}, req), Object.assign({}, doc), 2);

        DocumentAPI.updateDocumentLandLeaseAgreement(data).then(function (response) {
            cleanup();
            var session = $window.sessionStorage;
            session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
            sessionStorage.setItem("alert", JSON.stringify(response));
            if (response.MSGSTATUS == 0) {
                clearSessionSearch(userSession);
                upLoadFile($scope.req.REQID);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }
    /* The REQ_110_Ctrl(Function Controller) sign at 13/03/2018 */

    function setData(req, doc, status) {

        lessorList = [];
        recieptInfo = [];
        rentList = [];

        doc.RECEIVEPERSONNUMBER = $('#RECEIVEPERSONNUMBER').val();
        doc.PAYMENTOUTTERM = $('#PAYMENTOUTTERM').val();
        doc.PAYMENTOUTWITHINDATE = $('#PAYMENTOUTWITHINDATE').val();
        doc.HOUSEANDLANDTAX = $('#HOUSEANDLANDTAX').val();

        var deedOwnerList = ValueMangement.NoneString($("#DEEDOWNER").val()).split(",");

        doc.DEEDOWNERINFO = [];
        for (deedOwner in deedOwnerList) {
            if (ValueMangement.NoneString(deedOwnerList[deedOwner].trim()) != '') {
                doc.DEEDOWNERINFO.push(
                    {
                        REQID: ValueMangement.NoneString(req.REQID),
                        DEEDOWNER: deedOwnerList[deedOwner].trim()
                    }
                );
            }
        }

        for (var i = 0; i < $scope.lessors.length; i++) {
            var lessorType = $('#type' + $scope.lessors[i]).val(); // 3 = นิติบุคคล
            var corporation = $('input[name=corporate' + $scope.lessors[i] + ']:checked').val()
            corporation = ValueMangement.NoneString(corporation);
            var contact = "";
            if (document.getElementById("contactFlag" + $scope.lessors[i]).checked) {
                contact = $('#address' + $scope.lessors[i]).val();
            }
            else {
                contact = $('#contact' + $scope.lessors[i]).val();
            }
            lessorList.push(
                {
                    LESSORINFOID: $('#id' + $scope.lessors[i]).val(),
                    REQID: $('#req' + $scope.lessors[i]).val(),
                    VENDORID: $('#code' + $scope.lessors[i]).val(),
                    CITIZENID: $('#tax' + $scope.lessors[i]).val(),
                    VENDORNAME: $('#name' + $scope.lessors[i]).val(),
                    VENDORADDRESS: $('#address' + $scope.lessors[i]).val(),
                    LESSORTYPE: $('#type' + $scope.lessors[i]).val(),
                    CORPORATIONTYPE: corporation.split(",")[1] == "true" ? 1 : 0,
                    OTHERTYPE: $('#other' + $scope.lessors[i]).val(),
                    VENDORCONTACT: contact,
                    VENDORMOBILE: $('#tel' + $scope.lessors[i]).val()
                }
            );
        }

        for (var i = 0; i < $scope.persons.length; i++) {
            recieptInfo.push(
                {
                    RECEIVEPERSONID: $('#id' + $scope.persons[i]).val(),
                    REQID: $('#req' + $scope.persons[i]).val(),
                    RECEIVEPERSONNAME: $('#name' + $scope.persons[i]).val(),
                    BANKID: $('#bank' + $scope.persons[i]).val(),
                    BANKBRANCHNAME: $('#branch' + $scope.persons[i]).val(),
                    BANKACCOUNTNO: $('#book' + $scope.persons[i]).val()
                }
            );
        }

        for (var i = 0; i < $scope.rents.length; i++) {
            for (var j = 0; j < $scope.persons.length; j++) {
                if (doc.SERVICEATTACHMENTFLAG) {

                    var serviceflag = 1;
                    var taxFlag = $('input[id=taxcal' + $scope.rents[i] + $scope.persons[j] + ']:checked').length;
                    if ($('input[name=' + $scope.rents[i] + $scope.persons[j] + ']:checked').val() == undefined ||
                        $('input[name=' + $scope.rents[i] + $scope.persons[j] + ']:checked').val().split(',')[1] == "false") {
                        serviceflag = 0;
                    }

                    rentList.push(
                        {
                            LANDLEASERATEID: $('#id' + $scope.rents[i] + $scope.persons[j]).val(),
                            REQID: $('#req' + $scope.rents[i] + $scope.persons[j]).val(),
                            RECEIVEPERSONID: $('#personid' + $scope.rents[i] + $scope.persons[j]).val(),
                            STARTYEAR: $('#yearstart' + $scope.rents[i]).val(),
                            ENDYEAR: $('#yearend' + $scope.rents[i]).val(),
                            STARTDATE: ValueMangement.DateTime($('#startdate' + $scope.rents[i]).val(), "th"),
                            ENDDATE: ValueMangement.DateTime($('#enddate' + $scope.rents[i]).val(), "th"),
                            RECEIVEPERSONNAME: $('#name' + $scope.persons[j]).val(),//document.getElementById('person' + $scope.rents[i] + $scope.persons[j]).innerHTML,
                            LANDLEASEAMOUNT: $('#amount' + $scope.rents[i] + $scope.persons[j]).val().replace(/,/g, ""),
                            SERVICEAMOUNT: $('#service' + $scope.rents[i] + $scope.persons[j]).val().replace(/,/g, ""),
                            VATCALFLAG: taxFlag,
                            SERVICETAXFLAG: serviceflag,

                        }
                    );
                }
                else {
                    rentList.push(
                        {
                            LANDLEASERATEID: $('#id' + $scope.rents[i] + $scope.persons[j]).val(),
                            REQID: $('#req' + $scope.rents[i] + $scope.persons[j]).val(),
                            RECEIVEPERSONID: $('#personid' + $scope.rents[i] + $scope.persons[j]).val(),
                            STARTYEAR: $('#yearstart' + $scope.rents[i]).val(),
                            ENDYEAR: $('#yearend' + $scope.rents[i]).val(),
                            STARTDATE: ValueMangement.DateTime($('#startdate' + $scope.rents[i]).val(), "th"),
                            ENDDATE: ValueMangement.DateTime($('#enddate' + $scope.rents[i]).val(), "th"),
                            RECEIVEPERSONNAME: $('#name' + $scope.persons[j]).val(),//document.getElementById('person' + $scope.rents[i] + $scope.persons[j]).innerHTML,
                            LANDLEASEAMOUNT: $('#amount' + $scope.rents[i] + $scope.persons[j]).val().replace(/,/g, ""),
                        }
                    );
                }

            }
        }

        if (doc.FUTUREPAYMENTOUTFLAG) {
            doc.FUTUREPAYMENTOUTFLAG = doc.FUTUREPAYMENTOUTFLAG ? 1 : 0;
            doc.FUTUREPAYMENTOUTTERM = $('#FUTUREPAYMENTOUTTERM').val();
            doc.FUTUREPAYMENTOUTSTARTDATE = ValueMangement.DateTime($('#FUTUREPAYMENTOUTSTARTDATE').val(), "th");
            doc.FUTUREPAYMENTOUTENDDATE = ValueMangement.DateTime($('#FUTUREPAYMENTOUTENDDATE').val(), "th");
        }
        else {
            doc.FUTUREPAYMENTOUTTERM = null;
            doc.FUTUREPAYMENTOUTSTARTDATE = null;
            doc.FUTUREPAYMENTOUTENDDATE = null;
        }

        if (doc.FUTURESERVICEPAYMENTOUTFLAG && doc.SERVICEATTACHMENTFLAG) {
            doc.FUTURESERVICEPAYMENTOUTFLAG = doc.FUTURESERVICEPAYMENTOUTFLAG ? 1 : 0;
            doc.FUTURESERVICEPAYMENTOUTTERM = $('#FUTURESERVICEPAYMENTOUTTERM').val();
            doc.FUTURESERVICEPAYMENTOUTSTARTDATE = ValueMangement.DateTime($('#FUTURESERVICEPAYMENTOUTSTARTDATE').val(), "th");
            doc.FUTURESERVICEPAYMENTOUTENDDATE = ValueMangement.DateTime($('#FUTURESERVICEPAYMENTOUTENDDATE').val(), "th");
        }
        else {
            doc.FUTURESERVICEPAYMENTOUTTERM = null;
            doc.FUTURESERVICEPAYMENTOUTSTARTDATE = null;
            doc.FUTURESERVICEPAYMENTOUTENDDATE = null;
        }

        if ($('input[name=DEPOSITFLAG]:checked').val() == undefined || $('input[name=DEPOSITFLAG]:checked').val() == "false") {
            doc.DEPOSITFLAG = 0;
            doc.DEPOSITAMOUNT = 0;
            doc.DEPOSITREMARKS = "";
        }
        else {
            doc.DEPOSITFLAG = 1;
            doc.DEPOSITAMOUNT = doc.DEPOSITAMOUNT.toString().replace(/,/g, "");
        }


        doc.LESSORINFO = lessorList;
        doc.RECEIVEPERSONINFO = recieptInfo;
        doc.LANDLEASERATE = rentList;

        var data = {};
        data.REQUEST = req;
        data.DOCUMENT_LANDLEASEAGREEMENT = doc;

        data.REQUEST.DOCTYPEID = 1; //1> LL	เอกสารสัญญาเช่า	เอกสารสัญญาเช่า
        data.REQUEST.REQUESTSTATUS = status;  // 1>	Draft	แบบร่าง  |   2> Request New Document	รอเอกสารอนุมัติ

        data.REQUEST.USERREQUESTID = userSession.USER.USERID;
        data.REQUEST.USERREQUESTNAME = userSession.USER.USERNAME;
        data.REQUEST.DOC_CREATEDATE = ValueMangement.DateTime($("#DOC_CREATEDATE").val(), "th");
        data.REQUEST.DOC_EFFECTIVEDATE = ValueMangement.DateTime($("#DOC_EFFECTIVEDATE").val(), "th");
        data.REQUEST.DOC_EXPIREDATE = ValueMangement.DateTime($("#DOC_EXPIREDATE").val(), "th");
        data.REQUEST.DOC_CANCELDATE = ValueMangement.DateTime($("#DOC_CANCELDATE").val(), "th");
        data.DOCUMENT_LANDLEASEAGREEMENT.SERVICEATTACHMENTFLAG = data.DOCUMENT_LANDLEASEAGREEMENT.SERVICEATTACHMENTFLAG ? 1 : 0;
        data.DOCUMENT_LANDLEASEAGREEMENT.FIRSTPAYMENTOUTDATE = ValueMangement.DateTime($("#FIRSTPAYMENTOUTDATE").val(), "th");

        return data;
    }

    /* The REQ_110_Ctrl(Function Controller) sign at 13/03/2018 */
    function validateRequest(req) {

        if (ValueMangement.NoneString(req.STORECODE) == "") {
            return { flag: false, text: "กรุณาเลือกสาขา" };
        }
        else {
            return { flag: true, text: "" };
        }

    }

    function validateDocument(doc) {

        if (ValueMangement.NoneString(doc.AGREEMENTTYPEID) == "") {
            return { flag: false, text: "กรุณาเลือกประเภทสัญญา" };
        }
        else {
            return { flag: true, text: "" };
        }

    }

    function validateSubmit(req, doc) {

        var result = { flag: true, text: "" };

        if ($scope.lessors.length < 1) {
            return { flag: false, text: "เพิ่มชุดรายละเอียดผู้ให้เช่าอย่างน้อยต้องมี 1 คน" };
        }

        //if (ValueMangement.NoneString(doc.AGREEMENTNO) == "") {
        //    return { flag: false, text: "กรุณากรอกเลขที่สัญญา" };
        //}

        if (ValueMangement.NoneString($("#DEEDOWNER").val()) == "") {
            return { flag: false, text: "กรุณากรอกชื่อเจ้าของโฉนด" };
        }

        //if (ValueMangement.DateTime(req.DOC_CREATEDATE) == "") {
        //    return { flag: false, text: "กรุณากรอกวันที่ทำสัญญา" };
        //}

        //if (ValueMangement.DateTime(req.DOC_EFFECTIVEDATE) == "") {
        //    return { flag: false, text: "กรุณากรอกวันที่เริ่มทำสัญญา" };
        //}

        //if (ValueMangement.DateTime(req.DOC_EXPIREDATE) == "") {
        //    return { flag: false, text: "กรุณากรอกวันที่สิ้นสุดสัญญา" };
        //}

        if (ValueMangement.DateTime($("#DOC_CREATEDATE").val()) == "") {
            return { flag: false, text: "กรุณากรอกวันที่ทำสัญญา" };
        }

        if (ValueMangement.DateTime($("#DOC_EFFECTIVEDATE").val()) == "") {
            return { flag: false, text: "กรุณากรอกวันที่เริ่มทำสัญญา" };
        }

        if (ValueMangement.DateTime($("#DOC_EXPIREDATE").val()) == "") {
            return { flag: false, text: "กรุณากรอกวันที่สิ้นสุดสัญญา" };
        }

        //if (ValueMangement.DateTime(doc.FIRSTPAYMENTOUTDATE) == "") {
        //    return { flag: false, text: "กรุณากรอกกำหนดชำระงวดแรก" };
        //}

        if (doc.FUTUREPAYMENTOUTFLAG) {
            if (ValueMangement.DateTime($("#FUTUREPAYMENTOUTSTARTDATE").val()) == "") {
                return { flag: false, text: "กรุณากรอกชำระค่าเช่าล่วงหน้าตั้งแต่วันที่" };
            }

            if (ValueMangement.DateTime($("#FUTUREPAYMENTOUTENDDATE").val()) == "") {
                return { flag: false, text: "กรุณากรอกชำระค่าเช่าล่วงหน้าถึงวันที่" };
            }

            if (ValueMangement.DateTime($("#FUTUREPAYMENTOUTSTARTDATE").val()) >= ValueMangement.DateTime($("#FUTUREPAYMENTOUTENDDATE").val())) {
                return { flag: false, text: "กรุณากรอกชำระค่าเช่าล่วงหน้าถึงวันที่มากกว่าตั้งแต่วันที่" };
            }
        }

        if (doc.FUTURESERVICEPAYMENTOUTFLAG && doc.SERVICEATTACHMENTFLAG) {
            if (ValueMangement.DateTime($("#FUTURESERVICEPAYMENTOUTSTARTDATE").val()) == "") {
                return { flag: false, text: "กรุณากรอกชำระค่าบริการล่วงหน้าตั้งแต่วันที่" };
            }

            if (ValueMangement.DateTime($("#FUTURESERVICEPAYMENTOUTENDDATE").val()) == "") {
                return { flag: false, text: "กรุณากรอกชำระค่าบริการล่วงหน้าถึงวันที่" };
            }

            if (ValueMangement.DateTime($("#FUTURESERVICEPAYMENTOUTSTARTDATE").val()) >= ValueMangement.DateTime($("#FUTURESERVICEPAYMENTOUTENDDATE").val())) {
                return { flag: false, text: "กรุณากรอกชำระค่าบริการล่วงหน้าถึงวันที่มากกว่าตั้งแต่วันที่" };
            }
        }

        for (var i = 0; i < $scope.lessors.length; i++) {

            //if ($('#code' + $scope.lessors[i]).val() == "") {
            //    result = { flag: false, text: "กรุณากรอกรหัสผู้ให้เช่า" };
            //    break;
            //}
            if ($('#tax' + $scope.lessors[i]).val() == "") {
                result = { flag: false, text: "กรุณากรอกเลขประจำตัวผู้เสียภาษี" };
                break;
            }
            if ($('#name' + $scope.lessors[i]).val() == "") {
                result = { flag: false, text: "กรุณากรอกชื่อผู้ให้เช่า" };
                break;
            }
            if ($('#address' + $scope.lessors[i]).val() == "") {
                result = { flag: false, text: "กรุณากรอกที่อยู่ของผู้ให้เช่า" };
                break;
            }
            if ($('#type' + $scope.lessors[i]).val() == "") {
                result = { flag: false, text: "กรุณาเลือกผู้รับภาระภาษีโรงเรือน และที่ดิน" };
                break;
            }
            if ($('#type' + $scope.lessors[i]).val() == "4" && $('#other' + $scope.lessors[i]).val() == "") {
                result = { flag: false, text: "กรุณากรอกหมายเหตุอื่น ๆ" };
                break;
            }

        }

        for (var i = 0; i < $scope.persons.length; i++) {
            if (ValueMangement.NoneString($('#name' + $scope.persons[i]).val()) == "") {
                result = { flag: false, text: "กรุณากรอกชื่อผู้รับเงิน" };
                break;
            }

            if (ValueMangement.NoneString($('#branch' + $scope.persons[i]).val()) == "") {
                result = { flag: false, text: "กรุณากรอกสาขาธนาคาร" };
                break;
            }

            if (regex.bookbank.test($('#book' + $scope.persons[i]).val()) == "") {
                result = { flag: false, text: "กรุณากรอกเลขบัญชี" };
                break;
            }

            if ($('#bank' + $scope.persons[i]).val() == "") {
                result = { flag: false, text: "กรุณาเลือกธนาคาร" };
                break;
            }
        }

        if ($scope.rents.length < 1) {
            return { flag: false, text: "เพิ่มชุดรายละเอียดอัตราค่าเช่าอย่างน้อยต้องมี 1 เงื่อนไข" };
        }

        for (var i = 0; i < $scope.rents.length; i++) {
            for (var j = 0; j < $scope.persons.length; j++) {

                if (ValueMangement.Number($('#yearstart' + $scope.rents[i]).val()) < 1 || ValueMangement.Number($('#yearend' + $scope.rents[i]).val()) < 1) {
                    result = { flag: false, text: "กรุณาใส่ปีมากกว่าหรือเท่ากับ 1" };
                    break;
                }

                //if (ValueMangement.Number($('#yearstart' + $scope.rents[i]).val()) >= ValueMangement.Number($('#yearend' + $scope.rents[i]).val())) {
                //    result = { flag: false, text: "กรุณาเลือกปีเริ่มต้น-สิ้นสุด ให้สัมพันธ์กับระยะเวลาการเช่าในแต่ละช่วง" };
                //    break;
                //}

                if (regex.number.test($('#amount' + $scope.rents[i] + $scope.persons[j]).val()) == "" && regex.number.test($('#service' + $scope.rents[i] + $scope.persons[j]).val()) == "") {
                    result = { flag: false, text: "กรุณาใส่อัตราค่าเช่าหรือ อัตราบริการ อย่างใดอย่างหนึ่ง" };
                    break;
                }

                if (ValueMangement.DateTime($('#startdate' + $scope.rents[i]).val()) == "") {
                    result = { flag: false, text: "กรุณาเลือกวันที่เริ่มต้น" };
                    break;
                }

                if (ValueMangement.DateTime($('#enddate' + $scope.rents[i]).val()) == "") {
                    result = { flag: false, text: "กรุณาเลือกวันที่สิ้นสุด" };
                    break;
                }

                if (new Date(ValueMangement.DateTime($('#startdate' + $scope.rents[i]).val())) >= new Date(ValueMangement.DateTime($('#enddate' + $scope.rents[i]).val()))) {
                    result = { flag: false, text: "กรุณาเลือกวันที่สิ้นสุดมากกว่าวันที่เริ่มต้น" };
                    break;
                }
            }
        }

        if (ValueMangement.NoneString($("#LANDLEASETAXTYPEID").val()) == "") {
            return { flag: false, text: "กรุณาเลือกการคำนวณภาษีอัตราค่าเช่า" };
        }

        if (doc.SERVICEATTACHMENTFLAG) {
            if (ValueMangement.NoneString($("#SERVICETAXTYPEID").val()) == "") {
                return { flag: false, text: "กรุณาเลือกการคำนวณภาษีค่าบริการ" };
            }
        }

        //if ($("#landleaseFile")[0].files[0] == undefined) {
        //    result = { flag: false, text: "เลือกไฟล์หนังสือสัญญาเช่า" };
        //}

        if ($("#landleaseFile")[0].files[0] == undefined) {
            var chklandleaseFile = false;
            for (var i = 0; i < $scope.files.length; i++) {
                if ($scope.files[i].DOCFILETYPE == "หนังสือสัญญาเช่า") {
                    chklandleaseFile = true;
                    break;
                }
            }
            if (!chklandleaseFile) {
                Notification.notiWarn("กรุณาแนบไฟล์หนังสือสัญญาเช่า");
                return;
            }
        }

        if (ValueMangement.NoneString(req.NOTICENUMBER_EXPIRE) == "") {
            result = { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }
        if (ValueMangement.NoneString(req.NOTICEUNIT_EXPIRE) == "") {
            result = { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }

        return result;


    }

    function upLoadFile(reqno) {
        if ($("#landleaseFile")[0].files[0] != undefined) {
            document.getElementById("landleaseFileprogress").setAttribute("style", "display:");
            var landleaseUpload = new landleaseFile($("#landleaseFile")[0].files[0]);
            landleaseUpload.doUpload(reqno);
        }
        else {
            landleaseFiles = 1;
        }

        if ($("#serviceFile")[0].files[0] != undefined) {
            document.getElementById("serviceFileprogress").setAttribute("style", "display:");
            var serviceUpload = new serviceFile($("#serviceFile")[0].files[0]);
            serviceUpload.doUpload(reqno);
        }
        else {
            serviceFiles = 1;
        }

        if ($("#evidenceFile")[0].files[0] != undefined) {
            document.getElementById("evidenceFileprogress").setAttribute("style", "display:");
            var evidenceUpload = new evidenceFile($("#evidenceFile")[0].files[0]);
            evidenceUpload.doUpload(reqno);
        }
        else {
            evidenceFiles = 1;
        }

        if ($("#otherFile")[0].files[0] != undefined) {
            document.getElementById("otherFileprogress").setAttribute("style", "display:");
            var otherUpload = new otherFile($("#otherFile")[0].files);
            otherUpload.doUpload(reqno);
        }
        else {
            otherFiles = 1;
        }

        if ($scope.req.REQUESTSTATUS == 1 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
            $window.location.assign('REQ_300');
        }
        else if ($scope.req.REQUESTSTATUS == 2 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
            $window.location.assign('../SEARCH/SEARCH_100');
        }
    }

    function setDocDetail(req, doc) {
        doc.FUTUREPAYMENTOUTFLAG = doc.FUTUREPAYMENTOUTFLAG == 1 ? true : false;
        doc.FUTURESERVICEPAYMENTOUTFLAG = doc.FUTURESERVICEPAYMENTOUTFLAG == 1 ? true : false;
        doc.SERVICEATTACHMENTFLAG = doc.SERVICEATTACHMENTFLAG == 1 ? true : false;

        var lessors = doc.LESSORINFO == undefined ? [] : doc.LESSORINFO;
        for (var i = 0; i < lessors.length; i++) {
            var lessor = "lessor" + i;
            $scope.lessors.push(lessor);
        }

        var receivePersons = doc.RECEIVEPERSONINFO == undefined ? [] : doc.RECEIVEPERSONINFO;
        var persons = [];
        for (var i = 0; i < receivePersons.length; i++) {
            var person = "person" + i;
            persons.push(person);
        }
        $scope.persons = persons;

        var landLeaseRates = doc.LANDLEASERATE == undefined ? [] : doc.LANDLEASERATE;
        for (var i = 0; i < (landLeaseRates.length / receivePersons.length); i++) {
            var landLeaseRate = "rents" + i;
            $scope.rents.push(landLeaseRate);
        }

    }

    function updateData(req, doc) {

        if (req.DOC_CREATEDATE != null)
            $('#DOC_CREATEDATE').datepicker("setDate", new Date(req.DOC_CREATEDATE));
        $('#DOC_CREATEDATE').datepicker("update");
        if (req.DOC_EFFECTIVEDATE != null)
            $('#DOC_EFFECTIVEDATE').datepicker("setDate", new Date(req.DOC_EFFECTIVEDATE));
        $('#DOC_EFFECTIVEDATE').datepicker("update");
        if (req.DOC_EXPIREDATE != null)
            $('#DOC_EXPIREDATE').datepicker("setDate", new Date(req.DOC_EXPIREDATE));
        $('#DOC_EXPIREDATE').datepicker("update");
        if (req.DOC_CANCELDATE != null)
            $('#DOC_CANCELDATE').datepicker("setDate", new Date(req.DOC_CANCELDATE));
        $('#DOC_CANCELDATE').datepicker("update");

        if (doc.FIRSTPAYMENTOUTDATE != null)
            $('#FIRSTPAYMENTOUTDATE').datepicker("setDate", new Date(doc.FIRSTPAYMENTOUTDATE));
        $('#FIRSTPAYMENTOUTDATE').datepicker("update");
        if (doc.FUTUREPAYMENTOUTSTARTDATE != null)
            $('#FUTUREPAYMENTOUTSTARTDATE').datepicker("setDate", new Date(doc.FUTUREPAYMENTOUTSTARTDATE));
        $('#FUTUREPAYMENTOUTSTARTDATE').datepicker("update");
        if (doc.FUTUREPAYMENTOUTENDDATE != null)
            $('#FUTUREPAYMENTOUTENDDATE').datepicker("setDate", new Date(doc.FUTUREPAYMENTOUTENDDATE));
        $('#FUTUREPAYMENTOUTENDDATE').datepicker("update");
        if (doc.FUTURESERVICEPAYMENTOUTSTARTDATE != null)
            $('#FUTURESERVICEPAYMENTOUTSTARTDATE').datepicker("setDate", new Date(doc.FUTURESERVICEPAYMENTOUTSTARTDATE));
        $('#FUTURESERVICEPAYMENTOUTSTARTDATE').datepicker("update");
        if (doc.FUTURESERVICEPAYMENTOUTENDDATE != null)
            $('#FUTURESERVICEPAYMENTOUTENDDATE').datepicker("setDate", new Date(doc.FUTURESERVICEPAYMENTOUTENDDATE));
        $('#FUTURESERVICEPAYMENTOUTENDDATE').datepicker("update");
        var depositFlag = doc.DEPOSITFLAG == 0 ? false : true;
        $('input:radio[name=DEPOSITFLAG]').filter('[value=' + depositFlag + ']').prop('checked', true);
        $scope.setDepositFlag(depositFlag);

        $("#STORECODE").val(req.STORECODE == 0 ? "" : req.STORECODE).trigger("chosen:updated");
        $("#AGREEMENTTYPEID").val(doc.AGREEMENTTYPEID == 0 ? "" : doc.AGREEMENTTYPEID).trigger("chosen:updated");
        $("#RECEIVEPERSONNUMBER").val(doc.RECEIVEPERSONNUMBER).trigger("chosen:updated");
        $("#PAYMENTOUTWITHINDATE").val(doc.PAYMENTOUTWITHINDATE).trigger("chosen:updated");
        $("#PAYMENTOUTTERM").val(doc.PAYMENTOUTTERM).trigger("chosen:updated");
        $("#FUTUREPAYMENTOUTTERM").val(doc.FUTUREPAYMENTOUTTERM).trigger("chosen:updated");
        $("#FUTURESERVICEPAYMENTOUTTERM").val(doc.FUTURESERVICEPAYMENTOUTTERM).trigger("chosen:updated");
        $("#LANDLEASETAXTYPEID").val(doc.LANDLEASETAXTYPEID).trigger("chosen:updated");
        $("#SERVICETAXTYPEID").val(doc.SERVICETAXTYPEID).trigger("chosen:updated");
        $('#HOUSEANDLANDTAX').val(doc.HOUSEANDLANDTAX).trigger("chosen:updated");
        $('#NOTICEUNIT_EXPIRE').val($scope.req.NOTICEUNIT_EXPIRE).trigger("chosen:updated");

        var deedOwners = $scope.doc.DEEDOWNERINFO == undefined ? [] : $scope.doc.DEEDOWNERINFO;

        for (var i = 0; i < deedOwners.length; i++) {
            $("#DEEDOWNER").data('tag').add(deedOwners[i].DEEDOWNER);
        }

        var lessors = $scope.doc.LESSORINFO == undefined ? [] : $scope.doc.LESSORINFO;

        for (var i = 0; i < lessors.length; i++) {
            TextArea.inputLimit();
            var lessor = lessors[i];
            $('#id' + $scope.lessors[i]).val(lessor.LESSORINFOID);
            $('#req' + $scope.lessors[i]).val(lessor.REQID);
            $('#code' + $scope.lessors[i]).val(lessor.VENDORID);
            $('#tax' + $scope.lessors[i]).val(lessor.CITIZENID);
            $('#name' + $scope.lessors[i]).val(lessor.VENDORNAME);
            $('#address' + $scope.lessors[i]).val(lessor.VENDORADDRESS);
            $("#type" + $scope.lessors[i]).val(lessor.LESSORTYPE).trigger("chosen:updated");
            $('#other' + $scope.lessors[i]).val(lessor.OTHERTYPE);

            if (ValueMangement.NoneString(lessor.VENDORADDRESS) != "" && ValueMangement.NoneString(lessor.VENDORCONTACT) != "") {
                if (ValueMangement.NoneString(lessor.VENDORADDRESS) === ValueMangement.NoneString(lessor.VENDORCONTACT)) {
                    $("#contactFlag" + $scope.lessors[i]).prop('checked', true);
                    $('#contact' + $scope.lessors[i]).prop('disabled', true);
                }
                else {
                    $('#contact' + $scope.lessors[i]).val(lessor.VENDORCONTACT);
                }
            }
            else {
                $('#contact' + $scope.lessors[i]).val(lessor.VENDORCONTACT);
            }
            $('#tel' + $scope.lessors[i]).val(lessor.VENDORMOBILE);

            $scope.setDisabledLessor($scope.lessors[i], lessor.LESSORTYPE);
            if (lessor.LESSORTYPE == 3) {
                var corporationType = lessor.CORPORATIONTYPE == 0 ? false : true;
                var $radio = $('input:radio[name="corporate' + $scope.lessors[i] + '"]')
                $radio.filter('[value="' + $scope.lessors[i] + ',' + corporationType + '"]').prop('checked', true);
            }

        }

        var receivePersons = $scope.doc.RECEIVEPERSONINFO == undefined ? [] : $scope.doc.RECEIVEPERSONINFO;

        for (var i = 0; i < receivePersons.length; i++) {
            var person = receivePersons[i];
            $('#id' + $scope.persons[i]).val(person.RECEIVEPERSONID);
            $('#req' + $scope.persons[i]).val(person.REQID);
            $('#name' + $scope.persons[i]).val(person.RECEIVEPERSONNAME);
            $('#bank' + $scope.persons[i]).val(person.BANKID);
            $('#branch' + $scope.persons[i]).val(person.BANKBRANCHNAME);
            $('#book' + $scope.persons[i]).val(person.BANKACCOUNTNO);
        }

        var landLeaseRates = $scope.doc.LANDLEASERATE == undefined ? [] : $scope.doc.LANDLEASERATE;

        for (var i = 0; i < landLeaseRates.length; i++) {
            var index = (i / receivePersons.length | 0);
            var landLeaseRate = landLeaseRates[i];

            var j = i % receivePersons.length;

            Spinner.spinner("yearstart" + ($scope.rents[index]));
            Spinner.spinner("yearend" + ($scope.rents[index]));
            DatePicker.datePicker();
            $('#yearstart' + $scope.rents[index]).val(landLeaseRate.STARTYEAR);
            $('#yearend' + $scope.rents[index]).val(landLeaseRate.ENDYEAR);
            if (landLeaseRate.STARTDATE != null)
                $('#startdate' + $scope.rents[index]).datepicker("setDate", new Date(landLeaseRate.STARTDATE));
            $('#startdate' + $scope.rents[index]).datepicker("update");
            if (landLeaseRate.ENDDATE != null)
                $('#enddate' + $scope.rents[index]).datepicker("setDate", new Date(landLeaseRate.ENDDATE));
            $('#enddate' + $scope.rents[index]).datepicker("update");
            $('#id' + $scope.rents[index] + $scope.persons[j]).val(landLeaseRate.LANDLEASERATEID);
            $('#req' + $scope.rents[index] + $scope.persons[j]).val(landLeaseRate.REQID);
            $('#personid' + $scope.rents[index] + $scope.persons[j]).val(landLeaseRate.RECEIVEPERSONID);
            document.getElementById('person' + $scope.rents[index] + $scope.persons[j]).innerHTML = $('#name' + $scope.persons[j]).val();
            $('#amount' + $scope.rents[index] + $scope.persons[j]).val(landLeaseRate.SLANDLEASEAMOUNT == "-" ? "" : landLeaseRate.SLANDLEASEAMOUNT);
            $('#service' + $scope.rents[index] + $scope.persons[j]).val(landLeaseRate.SSERVICEAMOUNT == "-" ? "" : landLeaseRate.SSERVICEAMOUNT);
            $('input:checkbox[id="taxcal' + $scope.rents[index] + $scope.persons[j] + '"]').prop('checked', landLeaseRate.VATCALFLAG == 0 ? false : true);
            var serviceflag = landLeaseRate.SERVICETAXFLAG == 0 ? false : true;
            var $radio = $('input:radio[name="' + $scope.rents[index] + $scope.persons[j] + '"]')
            $radio.filter('[value="' + $scope.rents[index] + $scope.persons[j] + ',' + serviceflag + '"]').prop('checked', true);
            $scope.setTax($scope.rents[index] + $scope.persons[j] + "," + serviceflag);
            $scope.setIncludeTax("taxcal" + $scope.rents[index] + $scope.persons[j], landLeaseRate.VATCALFLAG == 0 ? false : true);
        }
    }

    var landleaseFile = function (file) {
        this.file = file;
    };
    landleaseFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.name);
        formData.append("upload_file", true);

        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.landleaseFile + "&reqno=" + reqno + "&filetype=" + "landlease",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                landleaseFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('REQ_300');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_100');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    landleaseFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#landleaseFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    var serviceFile = function (file) {
        this.file = file;
    };
    serviceFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.name);
        formData.append("upload_file", true);

        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.landleaseFile + "&reqno=" + reqno + "&filetype=" + "service",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                serviceFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('REQ_300');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_100');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    serviceFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#serviceFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    var evidenceFile = function (file) {
        this.file = file;
    };
    evidenceFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.name);
        formData.append("upload_file", true);

        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.landleaseFile + "&reqno=" + reqno + "&filetype=" + "evidence",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                evidenceFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('REQ_300');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_100');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    evidenceFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#evidenceFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    var otherFile = function (file) {
        this.file = file;
    };
    otherFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        for (var i = 0; i < this.file.length; i++) {
            //add assoc key values, this will be posts values.file
            console.log(this.file[i]);
            console.log(this.file[i].name);

            formData.append("file" + i, this.file[i], this.file[i].name);
            formData.append("upload_file" + i, true);
        }


        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.landleaseFile + "&reqno=" + reqno + "&filetype=" + "other",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                otherFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('REQ_300');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && landleaseFiles == 1 && serviceFiles == 1 && evidenceFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_100');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    otherFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#otherFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    function cleanup() {
        Loading.hideLoad();
    }
})

.controller('REQ_400_Ctrl', function ($scope, $timeout, $window, constants, Loading, Notification, ValueMangement, Table, StoreAPI, PropertyAPI, UserAPI, SearchAPI, DocumentAPI) {

    var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

    Loading.showLoad();

    $scope.loadingCounter = 0;

    $scope.search = serchsession == null ? {} : serchsession;

    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    $scope.getRequestByProperty = getRequestByProperty;

    $scope.stringToDate = stringToDate;

    $scope.viewDetail = viewDetail;

    $scope.confirmDeleteDraft = confirmDeleteDraft;

    init();

    angular.element(document).ready(domReady);


    ////////////===============================================================================

    function getRequestByProperty(search) {

        sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

        Loading.showLoad();

        var data = angular.copy(search || {});
        data.DOCTYPEID = 2;     // license only
        data.REQUESTSTATUS = -1; // pending for approval only
        data.USERREQUESTID = userSession.USER.USERID;
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

    function deleteDraft(data) {
        Loading.showLoad();
        $scope.loadingCounter++;

        DocumentAPI.deleteDraftDocument(data)
            .then(handleMsgResponse)
            .always(cleanup);

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
        $window.location.assign('REQ_410');
    }

    function confirmDeleteDraft(row) {

        bootbox.dialog({
            message: "<span class='bigger-110'>คุณต้องการลบแบบร่าง " + row.REQID + " ใช่หรือไม่ ?</span>",
            data: row,
            buttons:
                {
                    "delete":
                        {
                            "label": "ใช่",
                            "className": "btn-sm btn-danger",
                            "callback": confirmedDeleteDraftCallBack
                        },
                    "cancel":
                        {
                            "label": "ไม่",
                            "className": "btn-sm"
                        }
                }
        });

        function confirmedDeleteDraftCallBack() {
            deleteDraft(row);
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
        getRequestByProperty($scope.search);
        angular.element('#modal-table').modal('hide');
    }

    function cleanup() {

        if (--$scope.loadingCounter === 0) {
            Loading.hideLoad();
        }
    }
})

.controller('REQ_410_Ctrl', function ($scope, $window, $http, $timeout, constants, config, Loading, Notification, ValueMangement, Dropdownlist, FileInput, TextArea, DatePicker, RequestAPI, StoreAPI, PropertyAPI, DocumentAPI, FileAttachmentAPI) {

    /* The REQ_210_Ctrl(Variable Controller) sign at 16/03/2018 */
    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));
    var licenseFiles = 0;
    var otherFiles = 0;

    var request = {
        REQUEST: {
            REQID: $window.sessionStorage.REQID, //REQ18030088  REQ18030153
            DOCTYPEID: $window.sessionStorage.DOCTYPEID
        }
    };

    Loading.showLoad();

    init();

    angular.element(document).ready(domReady);

    function init() {
        angular.element.when(
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLICENSETYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLHOUSEANDLANDTAXTYPE'),
            StoreAPI.getStoreByProperty({ ACTIVE: 1 }),
            FileAttachmentAPI.getFileAttachmentByRequest(request.REQUEST),
            DocumentAPI.getDocumentDetail(request),
        ).done(handleInitPromises).always(cleanup);

        //StoreAPI.getStoreList()
        //    .then(handleStoreListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLICENSETYPE')
        //    .then(handleLisenceTypeListResponse)
        //    .always(cleanup);


        //DocumentAPI.getDocumentDetail(request)
        //    .then(handleDocumentResponse)
        //    .always(cleanup);

        //FileAttachmentAPI.getFileAttachmentByRequest(request.REQUEST)
        //    .then(handleFileAttachmentResponse)
        //    .always(cleanup);
    }
    
    function domReady() {

        DatePicker.datePicker();
        FileInput.single();
        FileInput.multi();

        var dropdownProps = {
            allow_single_deselect: true,
            width: '41.66%'
        };
        angular.element(".chosen-select").chosen(dropdownProps);
    }

    function handleInitPromises() {
        var dataarray = arguments;
        var idx = 0;
        $scope.licenseTypes = dataarray[idx++][0] || [];
        $scope.houseAndLandTaxTypes = dataarray[idx++][0] || [];
        $scope.stores = dataarray[idx++][0] || [];
        $scope.files = dataarray[idx++][0] || [];
        var model = dataarray[idx++][0] || [];

        $scope.req = model.REQUEST;
        $scope.doc = model.DOCUMENT_LICENSE;
        
        $scope.$apply(function applyUpdateControls() {
            $timeout(updateControlsTimeout);
        });

        ////////////===============================================================================

        function updateControlsTimeout() {
            updateDocument($scope.req, $scope.doc);
            Dropdownlist.updateUI('.chosen-select');
            DatePicker.datePicker('#content');

        }
    }

    function handleStoreListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.stores = response;

            $timeout(function () {
                $("#STORECODE").val($scope.req.STORECODE == 0 ? "" : $scope.req.STORECODE).trigger("chosen:updated");
            });
        }
    }

    function handleLisenceTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.licenseTypes = response;

            $timeout(function () {
                $("#LICENSETYPEID").val($scope.doc.LICENSETYPEID == 0 ? "" : $scope.doc.LICENSETYPEID).trigger("chosen:updated");
            });
        }
    }

    function handleHouseAndLandTaxTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.houseAndLandTaxTypes = response;

            $timeout(function () {
                $("#HOUSEANDLANDTAX").val($scope.doc.HOUSEANDLANDTAX == 0 ? "" : $scope.doc.HOUSEANDLANDTAX).trigger("chosen:updated");
            });
        }
    }

    function handleDocumentResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.req = response.REQUEST;
            $scope.doc = response.DOCUMENT_LICENSE;

            $timeout(function () {
                $scope.doc.FEEAMOUNT = $scope.doc.FEEAMOUNTTEXT;
                if ($scope.req.DOC_CREATEDATE != null)
                    $('#DOC_CREATEDATE').datepicker("setDate", new Date($scope.req.DOC_CREATEDATE));
                $('#DOC_CREATEDATE').datepicker("update");
                if ($scope.req.DOC_EFFECTIVEDATE != null)
                    $('#DOC_EFFECTIVEDATE').datepicker("setDate", new Date($scope.req.DOC_EFFECTIVEDATE));
                $('#DOC_EFFECTIVEDATE').datepicker("update");
                if ($scope.req.DOC_EXPIREDATE != null)
                    $('#DOC_EXPIREDATE').datepicker("setDate", new Date($scope.req.DOC_EXPIREDATE));
                $('#DOC_EXPIREDATE').datepicker("update");
                if ($scope.req.DOC_CANCELDATE != null)
                    $('#DOC_CANCELDATE').datepicker("setDate", new Date($scope.req.DOC_CANCELDATE));
                $('#DOC_CANCELDATE').datepicker("update");

                $('#NOTICEUNIT_EXPIRE').val($scope.req.NOTICEUNIT_EXPIRE).trigger("chosen:updated");
            });
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

    /* The REQ_210_Ctrl(Event Controller) sign at 16/03/2018 */

    $scope.validateAmountNumber = function ($event) {
        var value = ValueMangement.NoneString($event.target.value);
        var decision = value.split(".");
        var nPoint = (value.match(new RegExp("\\.", "g")) || []).length;
        if (isNaN(String.fromCharCode($event.keyCode)) && (String.fromCharCode($event.keyCode)) != '.') {
            $event.preventDefault();
        }
        if (decision.length > 1) {
            if ((String.fromCharCode($event.keyCode)) == '.') {
                $event.preventDefault();
            }
            if ($event.target.selectionStart > value.indexOf('.')) {
                if (decision[1].length >= 4) {
                    $event.preventDefault();
                }
            }
        }
    }

    $scope.currencyAmountNumber = function (value) {
        return currency(value);
    }

    function currency(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
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
        }).then(function successCallback(response) {
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
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.saveDraft = function (req, doc) {

        $scope.req.REQUESTSTATUS = 1;

        licenseFiles = 0;
        otherFiles = 0;

        var data = {};
        req = Object.assign({}, req);
        doc = Object.assign({}, doc);

        var validraft = validateDraft(req, doc);

        if (!validraft.flag) {
            Notification.notiWarn(validraft.text);
            return;
        };

        req.REQUESTSTATUS = 1;
        data = setData(req, doc, 1);

        Loading.showLoad();

        DocumentAPI.updateDocumentLicense(data).then(function (response) {

            cleanup();

            var session = $window.sessionStorage;
            session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
            sessionStorage.setItem("alert", JSON.stringify(response));
            if (response.MSGSTATUS == 0) {

                clearSessionSearch(userSession);

                upLoadFile(req.REQID);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    $scope.submitDocument = function (req, doc) {

        licenseFiles = 0;
        otherFiles = 0;

        var data = {};

        $scope.req.REQUESTSTATUS = 2;

        req = Object.assign({}, req);
        doc = Object.assign({}, doc);

        var validraft = validateDraft(req, doc);
        var valireq = validateRequest(req);
        var validoc = validateDocument(doc);

        if (!validraft.flag) {
            Notification.notiWarn(validraft.text);
            return;
        };

        if (!valireq.flag) {
            Notification.notiWarn(valireq.text);
            return;
        };

        if (!validoc.flag) {
            Notification.notiWarn(validoc.text);
            return;
        };

        if ($("#licenseFile")[0].files[0] == undefined) {
            var chkLicenseFile = false;
            for (var i = 0; i < $scope.files.length; i++) {
                if ($scope.files[i].DOCFILETYPE == constants.licenseFile) {
                    chkLicenseFile = true;
                    break;
                }
            }
            if (!chkLicenseFile) {
                Notification.notiWarn("กรุณาแนบไฟล์ใบอนุญาต");
                return;
            }
        }

        req.REQUESTSTATUS = 2;
        data = setData(req, doc, 2);

        Loading.showLoad();

        DocumentAPI.updateDocumentLicense(data).then(function (response) {

            cleanup();

            var session = $window.sessionStorage;
            session.APPROVE_DOCUMENT_LANDLEASEAGREEMENT = response;
            sessionStorage.setItem("alert", JSON.stringify(response));
            if (response.MSGSTATUS == 0) {

                clearSessionSearch(userSession);

                upLoadFile(req.REQID);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    /* The REQ_210_Ctrl(Function Controller) sign at 16/03/2018 */

    function setData(req, doc, status) {
        var data = {};

        req.DOCTYPEID = 2;
        req.REQUESTSTATUS = status;
        req.USERREQUESTID = userSession.USER.USERID;
        req.USERREQUESTNAME = userSession.USER.USERNAME;
        req.DOC_EFFECTIVEDATE = ValueMangement.DateTime($("#DOC_EFFECTIVEDATE").val(), "th");
        req.DOC_EXPIREDATE = ValueMangement.DateTime($("#DOC_EXPIREDATE").val(), "th");

        doc.FEEAMOUNT = doc.FEEAMOUNT.toString().replace(/,/g, "");

        data.REQUEST = req;
        data.DOCUMENT_LICENSE = doc;

        return data;
    }

    function updateDocument(req, doc) {

        /** set LICENSETYPEID **/
        $('#LICENSETYPEID').val(doc.LICENSETYPEID).trigger("chosen:updated");

        /** set FEEAMOUNT **/
        $scope.doc.FEEAMOUNT = doc.FEEAMOUNTTEXT;

        /** set DOC_CREATEDATE **/
        if (req.DOC_CREATEDATE != null)
            $('#DOC_CREATEDATE').datepicker("setDate", new Date(req.DOC_CREATEDATE));
        $('#DOC_CREATEDATE').datepicker("update");

        /** set DOC_EFFECTIVEDATE **/
        if (req.DOC_EFFECTIVEDATE != null)
            $('#DOC_EFFECTIVEDATE').datepicker("setDate", new Date(req.DOC_EFFECTIVEDATE));
        $('#DOC_EFFECTIVEDATE').datepicker("update");

        /** set DOC_EXPIREDATE **/
        if (req.DOC_EXPIREDATE != null)
            $('#DOC_EXPIREDATE').datepicker("setDate", new Date(req.DOC_EXPIREDATE));
        $('#DOC_EXPIREDATE').datepicker("update");

        /** set DOC_CANCELDATE **/
        if (req.DOC_CANCELDATE != null)
            $('#DOC_CANCELDATE').datepicker("setDate", new Date(req.DOC_CANCELDATE));
        $('#DOC_CANCELDATE').datepicker("update");

        /** set NOTICEUNIT_EXPIRE **/
        $('#NOTICEUNIT_EXPIRE').val(req.NOTICEUNIT_EXPIRE).trigger("chosen:updated");

        /** set HOUSEANDLANDTAX **/
        $('#HOUSEANDLANDTAX').val(doc.HOUSEANDLANDTAX).trigger("chosen:updated");
    }

    function validateDraft(req, doc) {

        if (ValueMangement.NoneString(req) == "") {
            return { flag: false, text: "กรุณาเลือกร้านค้า" };
        }

        if (ValueMangement.NoneString(req.STORECODE) == "") {
            return { flag: false, text: "กรุณาเลือกร้านค้า" };
        }

        if (ValueMangement.NoneString(doc) == "") {
            return { flag: false, text: "กรุณาเลือกประเภทใบอนุญาต" };
        }

        if (ValueMangement.NoneString(doc.LICENSETYPEID) == "") {
            return { flag: false, text: "กรุณาเลือกประเภทใบอนุญาต" };
        }

        if (req.REVISIONTYPE == '3') {
            if (ValueMangement.NoneString(req.DOC_CANCELDATE) == "") {
                Notification.notiWarn("กรุณากรอกวันหมดอายุ");
                return;
            }
        }

        return { flag: true, text: "สำเร็จ" };
    }

    function validateRequest(req) {

        if (ValueMangement.DateTime($("#DOC_EFFECTIVEDATE").val(), "th") == "") {
            return { flag: false, text: "กรุณาเลือกวันที่ดำเนินการต่ออายุ" };
        }

        if (ValueMangement.DateTime($("#DOC_EXPIREDATE").val(), "th") == "") {
            return { flag: false, text: "กรุณาเลือกวันที่หมดอายุสัญญาเช่าที่" };
        }

        if (ValueMangement.NoneString(req.NOTICENUMBER_EXPIRE) == "") {
            return { flag: false, text: "กรุณากรอกจำนวนแจ้งเตือนหมดอายุ" };
        }

        if (ValueMangement.NoneString(req.NOTICEUNIT_EXPIRE) == "") {
            return { flag: false, text: "กรุณาเลือกหน่วยแจ้งเตือนหมดอายุ" };
        }
        if (ValueMangement.NoneString(req.NOTICENUMBER_EXPIRE) == "") {
            return { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }
        if (ValueMangement.NoneString(req.NOTICEUNIT_EXPIRE) == "") {
            return { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }

        return { flag: true, text: "สำเร็จ" };

    }

    function validateDocument(doc) {

        if (ValueMangement.NoneString(doc.LICENSEBOOKNO) == "") {
            return { flag: false, text: "กรุณากรอก เล่มที่ ของใบอนุญาต" };
        }

        else if (ValueMangement.NoneString(doc.LICENSEDOCNO) == "") {
            return { flag: false, text: "กรุณากรอก เลขที่ หรือฉบับที่ ของใบอนุญาต" };
        }

        else if (ValueMangement.NoneString(doc.FEEAMOUNT) + "".replace(/,/g, "") == "" && doc.LICENSETYPEID != "9") {
            return { flag: false, text: "กรุณากรอก ค่าธรรมเนียม (฿) ของใบอนุญาต" };
        }

        return { flag: true, text: "สำเร็จ" };

    }

    function upLoadFile(reqno) {

        if ($("#licenseFile")[0].files[0] != undefined) {
            document.getElementById("licenseFileprogress").setAttribute("style", "display:");
            var licenseUpload = new licenseFile($("#licenseFile")[0].files[0]);
            licenseUpload.doUpload(reqno);
        }
        else {
            licenseFiles = 1;
        }

        if ($("#otherFile")[0].files[0] != undefined) {
            document.getElementById("otherFileprogress").setAttribute("style", "display:");
            var otherUpload = new otherFile($("#otherFile")[0].files);
            otherUpload.doUpload(reqno);
        }
        else {
            otherFiles = 1;
        }

        if ($scope.req.REQUESTSTATUS == 1 && licenseFiles == 1 && otherFiles == 1) {
            $window.location.assign('REQ_400');
        }
        else if ($scope.req.REQUESTSTATUS == 2 && licenseFiles == 1 && otherFiles == 1) {
            $window.location.assign('../SEARCH/SEARCH_200');
        }
    }

    var licenseFile = function (file) {
        this.file = file;
    };
    licenseFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.name);
        formData.append("upload_file", true);

        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.licenseFile + "&reqno=" + reqno + "&filetype=" + "license",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                console.log($scope.req.REQUESTSTATUS);
                licenseFiles = 1;
                console.log("license", licenseFiles == 1, otherFiles == 1, licenseFiles);
                if ($scope.req.REQUESTSTATUS == 1 && licenseFiles == 1 && otherFiles == 1) {
                    $window.location.assign('REQ_400');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && licenseFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_200');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    licenseFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#licenseFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    var otherFile = function (file) {
        this.file = file;
    };
    otherFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        for (var i = 0; i < this.file.length; i++) {
            //add assoc key values, this will be posts values.file
            console.log(this.file[i]);
            console.log(this.file[i].name);

            formData.append("file" + i, this.file[i], this.file[i].name);
            formData.append("upload_file" + i, true);
        }


        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + $scope.req.STORECODE + "&doctype=" + constants.licenseFile + "&reqno=" + reqno + "&filetype=" + "other",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                console.log($scope.req.REQUESTSTATUS);
                otherFiles = 1;
                console.log("other", licenseFiles == 1, otherFiles == 1, licenseFiles);
                if ($scope.req.REQUESTSTATUS == 1 && licenseFiles == 1 && otherFiles == 1) {
                    $window.location.assign('REQ_400');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && licenseFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_200');
                }

            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    otherFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#otherFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

})

.controller('REQ_500_Ctrl', function ($scope, $timeout, $window, $location, constants, Loading, ValueMangement, Notification, Table, StoreAPI, PropertyAPI, UserAPI, SearchAPI, DocumentAPI) {

    var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

    Loading.showLoad();

    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    $scope.loadingCounter = 0;

    $scope.search = serchsession == null ? {} : serchsession;

    $scope.getRequestByProperty = getRequestByProperty;

    $scope.stringToDate = stringToDate;

    $scope.viewDetail = viewDetail;

    $scope.setRequestRevision = function (doc) {
        DocumentAPI.getNextRevisionDocument({ DOCRUNNO: doc.DOCREFID }).then(function (response) {
            $scope.$apply(function () {
                $scope.revisionNew = response.MSGTEXT;
                $scope.revisionOld = doc.DOCRUNNO;
            });
        })
    }

    $scope.insertNewRevision = function (docrunno, remark) {

        var cause = $('input[name=rdoCause]:checked').val();
        var data = {};

        if (cause.split(",")[0] == "4" && ValueMangement.NoneString(remark) == "") {
            Notification.notiFail("กรุณากรอกหมายเหตุ");
            return;
        }

        data.DOCRUNNO = docrunno;
        data.USERREQUESTID = userSession.USER.USERID;
        data.USERREQUESTNAME = userSession.USER.USERNAME;
        data.REMARKS = cause.split(",")[1] + " : " + ValueMangement.NoneString(remark);
        data.REVISIONTYPE = cause.split(",")[0];

        DocumentAPI.insertNewRivisionDocumentLandLeaseAgreement(data).then(function (response) {
            if (response.MSGSTATUS == 0) {
                sessionStorage.setItem("alert", JSON.stringify(response));
                var session = $window.sessionStorage;
                session.REQID = response.MSGTEXT;
                session.DOCTYPEID = 1;
                $window.location.assign('REQ_310');
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })

    }

    init();

    angular.element(document).ready(domReady);

    ////////////===============================================================================

    function getRequestByProperty(search) {

        sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

        Loading.showLoad();

        var data = angular.copy(search || {});
        data.DOCTYPEID = 1;
        data.REQUESTSTATUS = data.REQUESTSTATUS || -1;
        data.USERREQUESTID = data.USERREQUESTID || -1;
        data.USERVERIFYID = data.USERVERIFYID || -1;
        data.LASTREVISIONFLAG = 1

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
        $window.location.assign('SEARCH_110');
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

        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLREVISIONTYPE')
            .then(handleRevisionTypeListResponse)
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

    function handleRevisionTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.revisiontypes = response;
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

        //if (--$scope.loadingCounter === 0) {
        //    console.log('cleand');
        Loading.hideLoad();
        //}
    }

})

.controller('REQ_600_Ctrl', function ($scope, $timeout, $window, $location, constants, Loading, ValueMangement, Notification, Table, StoreAPI, PropertyAPI, UserAPI, SearchAPI, DocumentAPI) {

    var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

    Loading.showLoad();

    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    $scope.loadingCounter = 0;

    $scope.search = serchsession == null ? {} : serchsession;

    $scope.getRequestByProperty = getRequestByProperty;

    $scope.stringToDate = stringToDate;

    $scope.viewDetail = viewDetail;

    $scope.setRequestRevision = function (doc) {
        DocumentAPI.getNextRevisionDocument({ DOCRUNNO: doc.DOCREFID }).then(function (response) {
            $scope.$apply(function () {
                $scope.revisionNew = response.MSGTEXT;
                $scope.revisionOld = doc.DOCRUNNO;
            });
        })
    }

    $scope.insertNewRevision = function (docrunno, remark) {

        var cause = $('input[name=rdoCause]:checked').val();
        var data = {};

        if (cause.split(",")[0] == "4" && ValueMangement.NoneString(remark) == "") {
            Notification.notiFail("กรุณากรอกหมายเหตุ");
            return;
        }

        data.DOCRUNNO = docrunno;
        data.USERREQUESTID = userSession.USER.USERID;
        data.USERREQUESTNAME = userSession.USER.USERNAME;
        data.REMARKS = cause.split(",")[1] + " : " + ValueMangement.NoneString(remark);
        data.REVISIONTYPE = cause.split(",")[0];

        DocumentAPI.insertNewRivisionDocumentLicense(data).then(function (response) {
            if (response.MSGSTATUS == 0) {
                sessionStorage.setItem("alert", JSON.stringify(response));
                var session = $window.sessionStorage;
                session.REQID = response.MSGTEXT;
                session.DOCTYPEID = 2;
                $window.location.assign('REQ_410');
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })

    }

    init();

    angular.element(document).ready(domReady);

    ////////////===============================================================================

    function getRequestByProperty(search) {

        sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

        Loading.showLoad();

        var data = angular.copy(search || {});
        data.DOCTYPEID = 2;
        data.REQUESTSTATUS = data.REQUESTSTATUS || -1;
        data.USERREQUESTID = data.USERREQUESTID || -1;
        data.USERVERIFYID = data.USERVERIFYID || -1;
        data.LASTREVISIONFLAG = 1

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
        $window.location.assign('SEARCH_110');
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

        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLREVISIONLICENSETYPE')
            .then(handleRevisionTypeListResponse)
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

    function handleRevisionTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.revisiontypes = response;
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

        //if (--$scope.loadingCounter === 0) {
        Loading.hideLoad();
        //}
    }

})

.controller('REQ_777_Ctrl', function ($scope, FileAttachmentAPI) {


    init();

    function init() {
        var doc = {
            REQUEST: {
                REQID: "",
                DOCTYPEID: 1
            }
        };

        FileAttachmentAPI.getFileAttachmentByRequest(doc.REQUEST)
            .then(handleFileAttachmentResponse)
            .always();
    }

    function handleFileAttachmentResponse(response) {
        $scope.$apply(updateForFileAttachment);

        function updateForFileAttachment() {
            console.log(response);
        }
    }
    var sampleData = initiateDemoData();//see below

    console.log(sampleData);
    console.log(sampleData['dataSource2']);

    $('#tree2').ace_tree({
        dataSource: sampleData['dataSource2'],
        loadingHTML: '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
        'open-icon': 'ace-icon fa fa-folder-open',
        'close-icon': 'ace-icon fa fa-folder',
        'selectable': false,
        multiSelect: false,
        'selected-icon': null,
        'unselected-icon': null
    });

    function initiateDemoData() {
        var tree_data = {
            'for-sale': { text: 'For Sale', type: 'folder' },
            'vehicles': { text: 'Vehicles', type: 'folder' },
            'rentals': { text: 'Rentals', type: 'folder' },
            'real-estate': { text: 'Real Estate', type: 'folder' },
            'pets': { text: 'Pets', type: 'folder' },
            'tickets': { text: 'Tickets', type: 'item' },
            'services': { text: 'Services', type: 'item' },
            'personals': { text: 'Personals', type: 'item' }
        }
        tree_data['for-sale']['additionalParameters'] = {
            'children': {
                'appliances': { text: 'Appliances', type: 'item' },
                'arts-crafts': { text: 'Arts & Crafts', type: 'item' },
                'clothing': { text: 'Clothing', type: 'item' },
                'computers': { text: 'Computers', type: 'item' },
                'jewelry': { text: 'Jewelry', type: 'item' },
                'office-business': { text: 'Office & Business', type: 'item' },
                'sports-fitness': { text: 'Sports & Fitness', type: 'item' }
            }
        }
        tree_data['vehicles']['additionalParameters'] = {
            'children': {
                'cars': { text: 'Cars', type: 'folder' },
                'motorcycles': { text: 'Motorcycles', type: 'item' },
                'boats': { text: 'Boats', type: 'item' }
            }
        }
        tree_data['vehicles']['additionalParameters']['children']['cars']['additionalParameters'] = {
            'children': {
                'classics': { text: 'Classics', type: 'item' },
                'convertibles': { text: 'Convertibles', type: 'item' },
                'coupes': { text: 'Coupes', type: 'item' },
                'hatchbacks': { text: 'Hatchbacks', type: 'item' },
                'hybrids': { text: 'Hybrids', type: 'item' },
                'suvs': { text: 'SUVs', type: 'item' },
                'sedans': { text: 'Sedans', type: 'item' },
                'trucks': { text: 'Trucks', type: 'item' }
            }
        }

        tree_data['rentals']['additionalParameters'] = {
            'children': {
                'apartments-rentals': { text: 'Apartments', type: 'item' },
                'office-space-rentals': { text: 'Office Space', type: 'item' },
                'vacation-rentals': { text: 'Vacation Rentals', type: 'item' }
            }
        }
        tree_data['real-estate']['additionalParameters'] = {
            'children': {
                'apartments': { text: 'Apartments', type: 'item' },
                'villas': { text: 'Villas', type: 'item' },
                'plots': { text: 'Plots', type: 'item' }
            }
        }
        tree_data['pets']['additionalParameters'] = {
            'children': {
                'cats': { text: 'Cats', type: 'item' },
                'dogs': { text: 'Dogs', type: 'item' },
                'horses': { text: 'Horses', type: 'item' },
                'reptiles': { text: 'Reptiles', type: 'item' }
            }
        }

        var dataSource1 = function (options, callback) {
            var $data = null
            if (!("text" in options) && !("type" in options)) {
                $data = tree_data;//the root tree
                callback({ data: $data });
                return;
            }
            else if ("type" in options && options.type == "folder") {
                if ("additionalParameters" in options && "children" in options.additionalParameters)
                    $data = options.additionalParameters.children || {};
                else $data = {}//no data
            }

            if ($data != null)//this setTimeout is only for mimicking some random delay
                setTimeout(function () { callback({ data: $data }); }, parseInt(Math.random() * 500) + 200);

            //we have used static data here
            //but you can retrieve your data dynamically from a server using ajax call
            //checkout examples/treeview.html and examples/treeview.js for more info
        }




        var tree_data_2 = {
            'pictures': { text: 'Pictures', type: 'folder', 'icon-class': 'red' },
            'music': { text: 'Music', type: 'folder', 'icon-class': 'orange' },
            'video': { text: 'Video', type: 'folder', 'icon-class': 'blue' },
            'documents': { text: 'Documents', type: 'folder', 'icon-class': 'green' },
            'backup': { text: 'Backup', type: 'folder' },
            'readme': { text: '<i class="ace-icon fa fa-file-text grey"></i> ReadMe.txt', type: 'item' },
            'manual': { text: '<i class="ace-icon fa fa-book blue"></i> Manual.html', type: 'item' }
        }
        tree_data_2['music']['additionalParameters'] = {
            'children': [
                { text: '<i class="ace-icon fa fa-music blue"></i> song1.ogg', type: 'item' },
                { text: '<i class="ace-icon fa fa-music blue"></i> song2.ogg', type: 'item' },
                { text: '<i class="ace-icon fa fa-music blue"></i> song3.ogg', type: 'item' },
                { text: '<i class="ace-icon fa fa-music blue"></i> song4.ogg', type: 'item' },
                { text: '<i class="ace-icon fa fa-music blue"></i> song5.ogg', type: 'item' }
            ]
        }
        tree_data_2['video']['additionalParameters'] = {
            'children': [
                { text: '<i class="ace-icon fa fa-film blue"></i> movie1.avi', type: 'item' },
                { text: '<i class="ace-icon fa fa-film blue"></i> movie2.avi', type: 'item' },
                { text: '<i class="ace-icon fa fa-film blue"></i> movie3.avi', type: 'item' },
                { text: '<i class="ace-icon fa fa-film blue"></i> movie4.avi', type: 'item' },
                { text: '<i class="ace-icon fa fa-film blue"></i> movie5.avi', type: 'item' }
            ]
        }
        tree_data_2['pictures']['additionalParameters'] = {
            'children': {
                'wallpapers': { text: 'Wallpapers', type: 'folder', 'icon-class': 'pink' },
                'camera': { text: 'Camera', type: 'folder', 'icon-class': 'pink' }
            }
        }
        tree_data_2['pictures']['additionalParameters']['children']['wallpapers']['additionalParameters'] = {
            'children': [
                { text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper1.jpg', type: 'item' },
                { text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper2.jpg', type: 'item' },
                { text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper3.jpg', type: 'item' },
                { text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper4.jpg', type: 'item' }
            ]
        }
        tree_data_2['pictures']['additionalParameters']['children']['camera']['additionalParameters'] = {
            'children': [
                { text: '<i class="ace-icon fa fa-picture-o green"></i> photo1.jpg', type: 'item' },
                { text: '<i class="ace-icon fa fa-picture-o green"></i> photo2.jpg', type: 'item' },
                { text: '<i class="ace-icon fa fa-picture-o green"></i> photo3.jpg', type: 'item' },
                { text: '<i class="ace-icon fa fa-picture-o green"></i> photo4.jpg', type: 'item' },
                { text: '<i class="ace-icon fa fa-picture-o green"></i> photo5.jpg', type: 'item' },
                { text: '<i class="ace-icon fa fa-picture-o green"></i> photo6.jpg', type: 'item' }
            ]
        }


        tree_data_2['documents']['additionalParameters'] = {
            'children': [
                { text: '<i class="ace-icon fa fa-file-text red"></i> document1.pdf', type: 'item' },
                { text: '<i class="ace-icon fa fa-file-text grey"></i> document2.doc', type: 'item' },
                { text: '<i class="ace-icon fa fa-file-text grey"></i> document3.doc', type: 'item' },
                { text: '<i class="ace-icon fa fa-file-text red"></i> document4.pdf', type: 'item' },
                { text: '<i class="ace-icon fa fa-file-text grey"></i> document5.doc', type: 'item' }
            ]
        }

        tree_data_2['backup']['additionalParameters'] = {
            'children': [
                { text: '<i class="ace-icon fa fa-archive brown"></i> backup1.zip', type: 'item' },
                { text: '<i class="ace-icon fa fa-archive brown"></i> backup2.zip', type: 'item' },
                { text: '<i class="ace-icon fa fa-archive brown"></i> backup3.zip', type: 'item' },
                { text: '<i class="ace-icon fa fa-archive brown"></i> backup4.zip', type: 'item' }
            ]
        }

        var dataSource2 = function (options, callback) {
            var $data = null
            if (!("text" in options) && !("type" in options)) {
                $data = tree_data_2;//the root tree
                callback({ data: $data });
                return;
            }
            else if ("type" in options && options.type == "folder") {
                if ("additionalParameters" in options && "children" in options.additionalParameters)
                    $data = options.additionalParameters.children || {};
                else $data = {}//no data
            }

            if ($data != null)//this setTimeout is only for mimicking some random delay
                setTimeout(function () { callback({ data: $data }); }, parseInt(Math.random() * 500) + 200);

            //we have used static data here
            //but you can retrieve your data dynamically from a server using ajax call
            //checkout examples/treeview.html and examples/treeview.js for more info
        }


        return { 'dataSource1': dataSource1, 'dataSource2': dataSource2 }
    }
})

.controller('REQ_800_Ctrl', function ($scope, $window, $timeout, constants, regex, config, Loading, Notification, ValueMangement, Dropdownlist, FileInput, TextArea, DatePicker, Spinner, RequestAPI, StoreAPI, PropertyAPI, TaxTypeAPI, DocumentAPI, SpaceRentalSizeAPI, CJBankAPI) {

    /* The REQ_800_Ctrl(Variable Controller) sign at 02/04/2018 */
    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    var spaceRentalFiles = 0;
    var otherFiles = 0;

    $scope.persons = [];
    $scope.lessees = [];
    $scope.req = {};
    $scope.doc = { PAYMENTOUTWITHINDATE: 1 };
    $scope.store = [];
    $scope.lesseeList = [];
    $scope.personList = [];

    DatePicker.datePicker();

    Loading.showLoad();

    init();

    angular.element(document).ready(domReady);

    function init() {
        angular.element.when(
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSPACERENTALTYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSERVICECHARGETYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLBANK'),
            //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLPAYMENTERM'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORTYPE'),
            //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLHOUSEANDLANDTAXTYPE'),
            TaxTypeAPI.getTaxTypeList(null),
            SpaceRentalSizeAPI.getSpaceRentalSizeList(null),
            CJBankAPI.getCJBankList(null),
            StoreAPI.getStoreByProperty({ ACTIVE: 1 }),
        ).done(handleInitPromises).always(cleanup);

        //StoreAPI.getStoreByProperty({ ACTIVE: 1 })
        //    .then(handleStoreListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSPACERENTALTYPE')
        //    .then(handleSpaceRentalTypeListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSERVICECHARGETYPE')
        //    .then(handleServiceChargeTypeListResponse)
        //    .always(cleanup);

        //TaxTypeAPI.getTaxTypeList(null)
        //    .then(handleTaxTypeListResponse)
        //    .always(cleanup);

        //SpaceRentalSizeAPI.getSpaceRentalSizeList(null)
        //    .then(handleSpaceRentalSizeListResponse)
        //    .always(cleanup);

        //CJBankAPI.getCJBankList(null)
        //    .then(handleCJBankListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLBANK')
        //    .then(handleBankListResponse)
        //    .always(cleanup);

        //PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORTYPE')
        //    .then(handleLessorTypeListResponse)
        //    .always(cleanup);
    }

    function handleInitPromises() {
        var dataarray = arguments;
        var idx = 0;
        $scope.spacerentaltypes = dataarray[idx++][0] || [];
        $scope.servicechangetypes = dataarray[idx++][0] || [];
        $scope.banks = dataarray[idx++][0] || [];
        //$scope.paymentoutterms = dataarray[idx++][0] || [];
        $scope.lessortypes = dataarray[idx++][0] || [];
        //$scope.houselandtaxs = dataarray[idx++][0] || [];
        $scope.taxtypes = dataarray[idx++][0] || [];
        $scope.spacerentalsizelist = dataarray[idx++][0] || [];
        $scope.cjbanklist = dataarray[idx++][0] || [];
        $scope.stores = dataarray[idx++][0] || [];

        //$("#PAYMENTOUTWITHINDATE").val(5).trigger("chosen:updated");
        $scope.addLessee();
        $scope.addReceivePersonNumber();
        $scope.addReceivePersonNumber();

        //updateDocument($scope.req, $scope.doc);
        $scope.$apply(function applyUpdateControls() {
            $timeout(updateControlsTimeout);
        });

        ////////////===============================================================================

        function updateControlsTimeout() {
            Dropdownlist.chnageUI('41.66%');
            Dropdownlist.updateUI('.chosen-select');
            DatePicker.datePicker();
            FileInput.single();
            FileInput.multi();
        }
    }

    function handleTaxTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.taxtypes = response;

            $timeout(function () {
                angular.element("#LANDLEASETAXTYPEID").trigger("chosen:updated");
                angular.element("#SERVICETAXTYPEID").trigger("chosen:updated");
            });
        }
    }

    function handleSpaceRentalTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.spacerentaltypes = response;

            $timeout(function () {
                angular.element("#SPACERENTALTYPEID").trigger("chosen:updated");
            });
        }
    }

    function handleServiceChargeTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.servicechangetypes = response;
        }
    }

    function handleSpaceRentalSizeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.spacerentalsizelist = response;

            $timeout(function () {
                angular.element("#spaceRentalSizeDDL").trigger("chosen:updated");
            });
        }
    }

    function handleCJBankListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.cjbanklist = response;
        }
    }

    function handleStoreListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.stores = response;

            $timeout(function () {
                angular.element("#STORECODE").trigger("chosen:updated");
            });
        }
    }

    function handleLessorTypeListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.lessortypes = response;

            $timeout(function () {
                angular.element("#typelessee0").trigger("chosen:updated");
            });
        }
    }

    function handleBankListResponse(response) {
        $scope.$apply(updateForListChange);

        ////////////===============================================================================

        function updateForListChange() {
            $scope.banks = response;

            $timeout(function () {

                var dropdownProps = {
                    allow_single_deselect: true,
                    width: '41.66%'
                };

                angular.element(".chosen-select").chosen(dropdownProps);
            });
        }
    }
    
    function domReady() {

        $("#PAYMENTOUTWITHINDATE").val(1).trigger("chosen:updated");

        //$scope.addLessee();
        $scope.addReceivePersonNumber();
       
        var dropdownProps = {
            allow_single_deselect: true,
            width: '41.66%'
        };

        FileInput.single();
        FileInput.multi();

        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLBANK')
            .then(handleBankListResponse)
            .always(cleanup);

        PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORTYPE')
            .then(handleLessorTypeListResponse)
            .always(cleanup);
    
        angular.element(".chosen-select").chosen(dropdownProps);
    }

    function cleanup() {
        Loading.hideLoad();
    }

    /* The REQ_800_Ctrl(Event Controller) sign at 02/04/2018 */
    $scope.setDisabledLessee = function (name, value) {
        if (value == 3) {
            $('input[name="corporate' + name + '"]').removeAttr('disabled');
            $('#view' + name).attr('style', 'display:none');
        }
        else if (value == 4) {
            $('#view' + name).attr('style', 'display:');
            $('input[name="corporate' + name + '"]').attr('disabled', true);
            $('input[name="corporate' + name + '"]').removeAttr('checked');
        }
        else {
            $('#view' + name).attr('style', 'display:none');
            $('input[name="corporate' + name + '"]').attr('disabled', true);
            $('input[name="corporate' + name + '"]').removeAttr('checked');
        }
        $('#otherType' + name).val('');
    }

    $scope.validateStoreCodeRequireBySpaceRentalType = function (name) {
        if (ValueMangement.NoneString($scope.doc.SPACERENTALTYPEID).toUpperCase().includes("XX")) {
            return true;
        }
        return false;
    }

    $scope.validateSpaceRentalSizeRequireBySpaceRentalType = function (name) {
        if (ValueMangement.NoneString($scope.doc.SPACERENTALTYPEID).toUpperCase().includes("SS")) {
            $('#spaceRentalSizeDDL').removeAttr('disabled').trigger("chosen:updated");
            return false;
        }
        else {
            $('#spaceRentalSizeDDL').val("");
            $('#spaceRentalSizeDDL').attr('disabled', true).trigger("chosen:updated");
            return true;
        }
    }

    $scope.validateServiceChargeRequireBySpaceRentalType = function (name) {
        if (ValueMangement.NoneString($scope.doc.SPACERENTALTYPEID).toUpperCase().includes("XX") &&
            ValueMangement.NoneString($scope.doc.SPACERENTALTYPEID).toUpperCase().includes("Y")) {
            return true;
        }
        return false;
    }

    $scope.selectSize = function (spaceRentalTypeID) {
        SpaceRentalSizeAPI.getSpaceRentalSizeList('?type=' + spaceRentalTypeID).then(function (response) {
            $scope.$apply(function () {
                $scope.spacerentalsizelist = response;
            });
            $scope.doc.SPACERENTALSIZEID = "";
            $('#spaceRentalSizeDDL').val("").trigger("chosen:updated");
            console.log(ValueMangement.NoneString($scope.doc.SPACERENTALSIZEID));
            //$("#spaceRentalSizeDDL")
        });
    }

    $scope.selectLesseeVendor = function (name, value) {
        var lesseeNo = name.split('-')[1];
        if (value == "1") {
            $('input[name="vendorName-' + lesseeNo + '"]').val("");
            $('input[name="vendorName-' + lesseeNo + '"]').attr('disabled', true);
            $('select[name="bank-' + lesseeNo + '"]').removeAttr('disabled').trigger("chosen:updated");
        }
        else if (value == "2") {
            $('select[name="bank-' + lesseeNo + '"]').val("");
            $('select[name="bank-' + lesseeNo + '"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="vendorName-' + lesseeNo + '"]').removeAttr('disabled');
        }
        else {
            $('select[name="bank-' + lesseeNo + '"]').val("");
            $('input[name="vendorName-' + lesseeNo + '"]').val("");
            $('select[name="bank-' + lesseeNo + '"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="vendorName-' + lesseeNo + '"]').attr('disabled', true);
        }
    }

    $scope.selectLesseeType = function (value) {
        $('input[name="renterTypeOther"]').attr('disabled', true).trigger("chosen:updated");
        if (ValueMangement.NoneString(value).toUpperCase().includes("SM")) {
            //$('input[name="renterTypeOther"]').removeAttr('disabled');
            $('input[name="renterType"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="renterType"]').attr('checked', false).trigger("chosen:updated");
        }
        else if (ValueMangement.NoneString(value).toUpperCase().includes("SP")) {
            $('input[name="renterType"]').removeAttr('disabled');
            //$('input[name="renterTypeOther"]').attr('disabled', true).trigger("chosen:updated");
        }
        else if (ValueMangement.NoneString(value).toUpperCase().includes("OT")) {
            $('input[name="renterTypeOther"]').removeAttr('disabled');
            $('input[name="renterType"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="renterType"]').attr('checked', false).trigger("chosen:updated");
        }
        else {
            $('input[name="renterTypeOther"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="renterType"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="renterType"]').attr('checked', false).trigger("chosen:updated");
        }
    }

    $scope.validatePhoneNumber = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode)) && (String.fromCharCode($event.keyCode)) != '-') {
            $event.preventDefault();
        }
    };

    $scope.validateAmountNumber = function ($event) {
        var value = ValueMangement.NoneString($event.target.value);
        var decision = value.split(".");
        var nPoint = (value.match(new RegExp("\\.", "g")) || []).length;
        if (isNaN(String.fromCharCode($event.keyCode)) && (String.fromCharCode($event.keyCode)) != '.') {
            $event.preventDefault();
        }
        if (decision.length > 1) {
            if ((String.fromCharCode($event.keyCode)) == '.') {
                $event.preventDefault();
            }
            if ($event.target.selectionStart > value.indexOf('.')) {
                if (decision[1].length >= 4) {
                    $event.preventDefault();
                }
            }

        }
    }

    $scope.currencyAmountNumber = function (value) {
        return currency(value);
    }

    function currency(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }

    $scope.validateNumber = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };

    $scope.addLessee = function () {
        var lessee = "lessee" + $scope.lessees.length;
        $scope.lessees.push(lessee);
        setTimeout(function () {
            $('input[name="corporate' + lessee + '"]').attr('disabled', true);
            $('input[name="corporate' + lessee + '"]').removeAttr('checked');
            $('select[name="bank-' + lessee + '"]').val("");
            $('input[name="vendorName-' + lessee + '"]').val("");
            $('select[name="bank-' + lessee + '"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="vendorName-' + lessee + '"]').attr('disabled', true);
            Dropdownlist.chnageUI('41.66%');
            TextArea.inputLimit();
        }, true);
    }

    $scope.addReceivePersonNumber = function () {
        var person = "person" + $scope.persons.length;
        $scope.persons.push(person);
        setTimeout(function () {
            Dropdownlist.chnageUI('41.66%');
        }, true);
    }

    $scope.deleteReceivePersonNumber = function (person) {
        var index = $scope.persons.indexOf(person);
        $scope.persons.splice(index, 1);
    }

    $scope.saveDraft = function (req, doc) {
        spaceRentalFiles = 0;
        otherFiles = 0

        $scope.req.REQUESTSTATUS = 1;

        var valiReq = validateRequest(req, doc);
        var valiDoc = validateDocument(doc);

        if (!valiReq.flag) {
            Notification.notiWarn(valiReq.text);
            return;
        };

        if (!valiDoc.flag) {
            Notification.notiWarn(valiDoc.text);
            return;
        };

        var data = setData(Object.assign({}, req), Object.assign({}, doc), 1);

        Loading.showLoad();

        DocumentAPI.insertDocumentSpaceRental(data).then(function (response) {
            runno = response.MSGTEXT;

            if (response.MSGSTATUS == 0) {

                response.MSGTEXT = "สำเร็จ";

                var session = $window.sessionStorage;
                session.APPROVE_DOCUMENT_SPACERENTAL = response;
                sessionStorage.setItem("alert", JSON.stringify(response));

                upLoadFile(runno);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    $scope.submitDocument = function (req, doc) {
        spaceRentalFiles = 0;
        otherFiles = 0

        $scope.req.REQUESTSTATUS = 2;

        //var valiReq = validateRequest(req, doc);
        //var valiDoc = validateDocument(doc);
        var valiSubmit = validateSubmit(req, doc);

        //if (!valiReq.flag) {
        //    Notification.notiWarn(valiReq.text);
        //    return;   
        //};

        //if (!valiDoc.flag) {
        //    Notification.notiWarn(valiDoc.text);
        //    return;
        //};

        if (!valiSubmit.flag) {
            Notification.notiWarn(valiSubmit.text);
            return;
        };

        var data = setData(Object.assign({}, req), Object.assign({}, doc), 2);

        Loading.showLoad();

        DocumentAPI.insertDocumentSpaceRental(data).then(function (response) {
            runno = response.MSGTEXT;

            if (response.MSGSTATUS == 0) {

                response.MSGTEXT = "สำเร็จ";

                var session = $window.sessionStorage;
                session.APPROVE_DOCUMENT_SPACERENTAL = response;
                sessionStorage.setItem("alert", JSON.stringify(response));

                upLoadFile(runno);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    /* The REQ_FS_100_Ctrl(Function Controller) sign at 02/04/2018 */
    function setData(req, doc, status) {

        lesseeList = [];
        //personList = [];
        cjBankList = [];
        for (var i = 0; i < $scope.lessees.length; i++) {
            var lesseeType = $('#type' + $scope.lessees[i]).val(); // 3 = นิติบุคคล
            var corporation = $('input[name=corporate' + $scope.lessees[i] + ']:checked').val();
            var vendorFlag = $('input[name=vendorFlag-' + $scope.lessees[i] + ']:checked').val();
            corporation = ValueMangement.NoneString(corporation);
            vendorFlag = ValueMangement.NoneString(vendorFlag);
            var bankId = "";
            var vendorName = "";
            if (vendorFlag == 1) {
                bankId = $('select[name="bank-' + $scope.lessees[i] + '"]').find(":selected").val();
                vendorName = $('select[name="bank-' + $scope.lessees[i] + '"]').find(":selected").text();
            }
            else if (vendorFlag == 2) {
                bankId = "";
                vendorName = $('#vendorName' + $scope.lessees[i]).val();
            }
            lesseeList.push(
                {
                    VENDORID: $('#code' + $scope.lessees[i]).val(),
                    CITIZENID: $('#citizenid' + $scope.lessees[i]).val(),
                    VENDORFLAG: vendorFlag,
                    VENDORNAME: vendorName,
                    VENDORBANKID: ValueMangement.NoneString(bankId),
                    LESSEETYPE: $('#type' + $scope.lessees[i]).val(),
                    CORPORATIONTYPE: corporation.split(",")[1] == "true" ? 1 : 0,
                    OTHERTYPE: $('#otherType' + $scope.lessees[i]).val(),
                    ADDRESS: $('#address' + $scope.lessees[i]).val(),
                    TELEPHONE: $('#tel' + $scope.lessees[i]).val(),
                    LINEID: $('#lineID' + $scope.lessees[i]).val()
                }
            );
        }

        //for (var i = 0; i < $scope.persons.length; i++) {
        //    personList.push(
        //        {
        //            RECEIVEACCOUNTINFOID: $('#id' + $scope.persons[i]).val(),
        //            REQID: $('#req' + $scope.persons[i]).val(),
        //            RECEIVEACCOUNTNAME: $scope.receiverName,
        //            BANKID: $('#bank' + $scope.persons[i]).val(),
        //            BANKBRANCHNAME: $('#branch' + $scope.persons[i]).val(),
        //            BANKACCOUNTNO: $('#book' + $scope.persons[i]).val()
        //        }
        //    );
        //}

        if (ValueMangement.NoneString(doc.SPACERENTALTYPEID).toUpperCase().includes("SS")) {
            for (var i = 0; i < $scope.cjbanklist.length; i++) {
                cjBankList.push($scope.cjbanklist[i].CJBANKACCOUNTINFOID);
            }
        }
        else {
            cjBankList.push("");
        }
        doc.SPACERENTALTYPEID = doc.SPACERENTALTYPEID.split(" - ")[0];

        doc.SPACERENTALSIZEID = ValueMangement.NoneString(doc.SPACERENTALSIZEID);
        doc.SPACERENTALDESC = ValueMangement.NoneString(doc.SPACERENTALDESC);
        doc.SPACERENTAL_DOCNO = ValueMangement.NoneString(doc.SPACERENTAL_DOCNO);
        doc.SERVICECHARGETYPE = ValueMangement.NoneString(doc.SERVICECHARGETYPE);
        doc.SERVICECHARGETAXFLAG = ValueMangement.NoneString(doc.SERVICECHARGETAXFLAG);
        doc.ELECTRICCHARGETAXFLAG = ValueMangement.NoneString(doc.ELECTRICCHARGETAXFLAG);
        doc.WATERCHARGETAXFLAG = ValueMangement.NoneString(doc.WATERCHARGETAXFLAG);
        doc.INSURANCECHARGETAXFLAG = ValueMangement.NoneString(doc.INSURANCECHARGETAXFLAG);
        doc.HOUSEANDLANDTAXID = ValueMangement.NoneString(doc.HOUSEANDLANDTAXID);
        doc.BOARDTAXID = ValueMangement.NoneString(doc.BOARDTAXID);

        doc.SERVICECHARGEAMOUNT = ValueMangement.NoneString(doc.SERVICECHARGEAMOUNT).replace(/,/g, '');
        doc.ELECTRICCHARGEAMOUNT = ValueMangement.NoneString(doc.ELECTRICCHARGEAMOUNT).replace(/,/g, '');
        doc.WATERCHARGEAMOUNT = ValueMangement.NoneString(doc.WATERCHARGEAMOUNT).replace(/,/g, '');
        doc.INSURANCECHARGEAMOUNT = ValueMangement.NoneString(doc.INSURANCECHARGEAMOUNT).replace(/,/g, '');
        doc.PAYMENTOUTWITHINDATE = $("#PAYMENTOUTWITHINDATE").val();

        doc.LESSEEINFO = lesseeList;
        //doc.RECEIVEACCOUNTINFO = personList;
        doc.CJBANKACCOUNTLIST = cjBankList.join(',');

        var data = {};
        data.REQUEST = req;
        data.DOCUMENT_SPACERENTAL = doc;

        data.REQUEST.DOCTYPEID = 3; //1> LL	เอกสารสัญญาเช่า	เอกสารสัญญาเช่า
        data.REQUEST.REQUESTSTATUS = status;  // 1>	Draft	แบบร่าง  |   2> Request New Document	รอเอกสารอนุมัติ

        data.REQUEST.USERREQUESTID = userSession.USER.USERID;
        data.REQUEST.USERREQUESTNAME = userSession.USER.USERNAME;
        data.REQUEST.DOC_CREATEDATE = ValueMangement.DateTime(data.REQUEST.DOC_CREATEDATE);
        data.REQUEST.DOC_EFFECTIVEDATE = ValueMangement.DateTime(data.REQUEST.DOC_EFFECTIVEDATE);
        data.REQUEST.DOC_EXPIREDATE = ValueMangement.DateTime(data.REQUEST.DOC_EXPIREDATE);

        return data;
    }

    function validateRequest(req, doc) {
        if (ValueMangement.NoneString(doc.SPACERENTALTYPEID).toUpperCase().includes("XX")) {
            return { flag: true, text: "" };
        }
        if (ValueMangement.NoneString(req.STORECODE) == "") {
            return { flag: false, text: "กรุณาเลือกสาขา" };
        }
        else {
            return { flag: true, text: "" };
        }


    }

    function validateDocument(doc) {

        if (ValueMangement.NoneString(doc.SPACERENTALTYPEID) == "") {
            return { flag: false, text: "กรุณาเลือกประเภทการเช่าพื้นที่หน้าร้าน" };
        }
        else {
            return { flag: true, text: "" };
        }

    }

    function validateSubmit(req, doc) {

        var result = { flag: true, text: "" };

        if ($scope.lessees.length < 1) {
            return { flag: false, text: "กรุณากรอกรายละเอียดผู้เช่า" };
        }

        if (ValueMangement.NoneString(doc.SPACERENTAL_DOCNO) == "") {
            return { flag: false, text: "กรุณากรอกเลขที่สัญญา" };
        }

        if (ValueMangement.NoneString(doc.SPACERENTALTYPEID) == "") {
            return { flag: false, text: "กรุณาเลือกประเภทการเช่าพื้นที่หน้าร้าน" };
        }
        else {
            if (!doc.SPACERENTALTYPEID.toUpperCase().includes("XX")) {
                if (ValueMangement.NoneString(req.STORECODE) == "") {
                    return { flag: false, text: "กรุณาเลือกสาขา" };
                }
                if (doc.SPACERENTALTYPEID.toUpperCase().includes("SS")) {
                    if (ValueMangement.NoneString(doc.SPACERENTALSIZEID) == "") {
                        return { flag: false, text: "กรุณาเลือกขนาดพื้นที่เช่า" };
                    }
                }
            }
        }

        if (!(doc.SPACERENTALTYPEID.toUpperCase().includes("XX") && doc.SPACERENTALTYPEID.toUpperCase().includes("Y"))) {
            if (ValueMangement.NoneString(doc.SERVICECHARGETYPE) == "") {
                return { flag: false, text: "กรุณาเลือกประเภทค่าบริการ" };
            }
        }

        if (!(doc.SPACERENTALTYPEID.toUpperCase().includes("XX") && doc.SPACERENTALTYPEID.toUpperCase().includes("Y"))) {
            if (ValueMangement.NoneString(doc.SERVICECHARGEAMOUNT) == "") {
                return { flag: false, text: "กรุณากรอกค่าบริการ" };
            }
        }

        if (!(doc.SPACERENTALTYPEID.toUpperCase().includes("XX") && doc.SPACERENTALTYPEID.toUpperCase().includes("Y"))) {
            if (ValueMangement.NoneString(doc.SERVICECHARGETAXFLAG) == "") {
                return { flag: false, text: "กรุณาเลือกว่าค่าบริการรวมภาษีหรือไม่" }
            }
        }

        if (ValueMangement.NoneString(doc.HOUSEANDLANDTAXID) == "") {
            return { flag: false, text: "กรุณาเลือกผู้รับภาระภาษีโรงเรือนและที่ดิน" };
        }

        if (ValueMangement.NoneString(doc.BOARDTAXID) == "") {
            return { flag: false, text: "กรุณาเลือกผู้รับภาระภาษีป้าย" };
        }

        if (ValueMangement.NoneString(doc.RENTALNUMBER) == "") {
            return { flag: false, text: "กรุณาใส่จำนวนระยะเวลาการเช่า" };
        }

        if (ValueMangement.NoneString(doc.RENTALUNIT) == "") {
            return { flag: false, text: "กรุณาเลือกหน่วยระยะเวลาการเช่า" };
        }

        if (ValueMangement.DateTime(req.DOC_CREATEDATE) == "") {
            return { flag: false, text: "กรุณากรอกวันที่ทำสัญญา" };
        }

        if (ValueMangement.DateTime(req.DOC_EFFECTIVEDATE) == "") {
            return { flag: false, text: "กรุณากรอกวันที่เริ่มสัญญา" };
        }

        if (ValueMangement.DateTime(req.DOC_EXPIREDATE) == "") {
            return { flag: false, text: "กรุณากรอกวันที่สิ้นสุดสัญญา" };
        }

        if (ValueMangement.NoneString($("#PAYMENTOUTWITHINDATE").val()) == "") {
            return { flag: false, text: "กรุณาเลือกวันที่กำหนดเก็บค่าบริการในแต่ละเดือน" };
        }

        if (ValueMangement.NoneString(doc.CANCELINFODATE) == "") {
            return { flag: false, text: "กรุณากรอกจำนวนวันที่ต้องแจ้งล่วงหน้า กรณียกเลิกสัญญา" };
        }

        if (ValueMangement.NoneString(req.NOTICENUMBER_EXPIRE) == "" ||
            ValueMangement.NoneString(req.NOTICEUNIT_EXPIRE) == "") {
            return { flag: false, text: "กรุณาตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }

        for (var i = 0; i < $scope.lessees.length; i++) {
            if (ValueMangement.NoneString($('input[name=vendorFlag-' + $scope.lessees[i] + ']:checked').val()) == "") {
                result = { flag: false, text: "กรุณาเลือกประเภทผู้เช่า" };
                break;
            }
            else {
                if (ValueMangement.NoneString($('#bank' + $scope.lessees[i]).val()) == "" && $('#vendorName' + $scope.lessees[i]).val() == "") {
                    result = { flag: false, text: "กรุณากรอกชื่อผู้เช่า" };
                    break;
                }
            }
            if (ValueMangement.NoneString($('#type' + $scope.lessees[i]).val()) == "") {
                result = { flag: false, text: "กรุณาเลือกลักษณะผู้เช่า" };
                break;
            }

        }

        //for (var i = 0; i < $scope.persons.length; i++) {
        //    if ($('#name' + $scope.persons[i]).text() == "") {
        //        result = { flag: false, text: "กรุณากรอกชื่อผู้รับเงิน" };
        //        break;
        //    }

        //    if (ValueMangement.NoneString($('#bank' + $scope.persons[i]).val()) == "") {
        //        result = { flag: false, text: "กรุณาเลือกธนาคาร" };
        //        break;
        //    }

        //    if ($('#branch' + $scope.persons[i]).val() == "") {
        //        result = { flag: false, text: "กรุณากรอกสาขา" };
        //        break;
        //    }

        //    if ($('#book' + $scope.persons[i]).val() == "") {
        //        result = { flag: false, text: "กรุณากรอกเลขบัญชี" };
        //        break;
        //    }
        //}

        //for (var i = 0; i < $scope.persons.length; i++) {
        //    if (regex.text.test($('#name' + $scope.persons[i]).val()) == "") {
        //        console.log(regex.text.test($('#name' + $scope.persons[i]).val()));
        //        result = { flag: false, text: "กรุณากรอกชื่อผู้รับเงิน" };
        //        break;
        //    }

        //    if (regex.text.test($('#branch' + $scope.persons[i]).val()) == "") {
        //        result = { flag: false, text: "กรุณากรอกสาขา" };
        //        break;
        //    }

        //    if (regex.bookbank.test($('#book' + $scope.persons[i]).val()) == "") {
        //        result = { flag: false, text: "กรุณากรอกเลขบัญชี" };
        //        break;
        //    }

        //    if ($('#bank' + $scope.persons[i]).val() == "") {
        //        result = { flag: false, text: "กรุณาเลือกธนาคาร" };
        //        break;
        //    }
        //}

        if ($("#spaceRentalFile")[0].files[0] == undefined) {
            return { flag: false, text: "เลือกไฟล์หนังสือสัญญาเช่า" };
        }
        if (ValueMangement.NoneString(req.NOTICENUMBER_EXPIRE) == "") {
            result = { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }
        if (ValueMangement.NoneString(req.NOTICEUNIT_EXPIRE) == "") {
            result = { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }

        return result;

    }

    function upLoadFile(reqno) {
        if ($("#spaceRentalFile")[0].files[0] != undefined) {
            document.getElementById("spaceRentalFileprogress").setAttribute("style", "display:");
            var spaceRentalUpload = new spaceRentalFile($("#spaceRentalFile")[0].files[0]);
            spaceRentalUpload.doUpload(reqno);
        }
        else {
            spaceRentalFiles = 1;
        }

        if ($("#otherFile")[0].files[0] != undefined) {
            document.getElementById("otherFileprogress").setAttribute("style", "display:");
            var otherUpload = new otherFile($("#otherFile")[0].files);
            otherUpload.doUpload(reqno);
        }
        else {
            otherFiles = 1;
        }

        if ($scope.req.REQUESTSTATUS == 1 && spaceRentalFiles == 1 && otherFiles == 1) {
            $window.location.assign('../REQUEST/REQ_1200');
        }
        else if ($scope.req.REQUESTSTATUS == 2 && spaceRentalFiles == 1 && otherFiles == 1) {
            $window.location.assign('../SEARCH/SEARCH_300');
        }
    }

    function toDate(dateStr) {
        var parts = dateStr.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    var spaceRentalFile = function (file) {
        this.file = file;
    };
    spaceRentalFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.name);
        formData.append("upload_file", true);

        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + "Non-Store" + "&doctype=" + constants.spaceRentalFile + "&reqno=" + reqno + "&filetype=" + "spaceRental",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                spaceRentalFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && spaceRentalFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../REQUEST/REQ_1200');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && spaceRentalFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_300');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    spaceRentalFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#spaceRentalFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    var otherFile = function (file) {
        this.file = file;
    };
    otherFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        for (var i = 0; i < this.file.length; i++) {
            //add assoc key values, this will be posts values.file

            formData.append("file" + i, this.file[i], this.file[i].name);
            formData.append("upload_file" + i, true);
        }


        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + "Non-Store" + "&doctype=" + constants.spaceRentalFile + "&reqno=" + reqno + "&filetype=" + "other",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                otherFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && spaceRentalFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../REQUEST/REQ_1200');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && spaceRentalFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_300');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    otherFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#otherFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };
})

.controller('REQ_900_Ctrl', function ($scope, $timeout, $window, constants, regex, config, Loading, Notification, ValueMangement, Dropdownlist, FileInput, TextArea, DatePicker, Spinner, RequestAPI, StoreAPI, PropertyAPI, TaxTypeAPI, DocumentAPI, UserAPI) {

    Loading.showLoad();

    /* The REQ_900_Ctrl(Variable Controller) sign at 08/03/2018 */
    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    // scope functions
    $scope.addAssetDetail = addAssetDetail;
    $scope.deleteAssetDetail = deleteAssetDetail
    $scope.updateVehicleTypeInfo = updateVehicleTypeInfo;
    $scope.saveDraft = saveDraft;
    $scope.submitDocument = submitDocument;
    $scope.getUserProperty = getUserProperty;

    // constants
    $scope.regex = {
        //bankBranch: /^[A-Za-z ก-๙]+$/,
        bankAccount: /^[\d\-]+$/
    };
    $scope.forkliftId = 3; // used for controlling UI elements

    $scope.validateAmountNumber = function ($event) {
        var value = ValueMangement.NoneString($event.target.value);
        var decision = value.split(".");
        var nPoint = (value.match(new RegExp("\\.", "g")) || []).length;
        if (isNaN(String.fromCharCode($event.keyCode)) && (String.fromCharCode($event.keyCode)) != '.') {
            $event.preventDefault();
        }
        if (decision.length > 1) {
            if ((String.fromCharCode($event.keyCode)) == '.') {
                $event.preventDefault();
            }
            if ($event.target.selectionStart > value.indexOf('.')) {
                if (decision[1].length >= 4) {
                    $event.preventDefault();
                }
            }

        }
    }

    $scope.currencyAmountNumber = function (value) {
        return currency(value);
    }

    function currency(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }

    angular.element(document).ready(domReady);

    initModel();

    ////////////===============================================================================

    function addAssetDetail() {
        var assetInfos = $scope.model.DOCUMENT_VEHICLERENTAL.ASSETINFOS;
        var lastAssetInfo = assetInfos[assetInfos.length - 1];

        // copy values from previous asset
        $scope.model.DOCUMENT_VEHICLERENTAL.ASSETINFOS.push({
            MODEL: lastAssetInfo.MODEL,
            ENGINE_SIZE: lastAssetInfo.ENGINE_SIZE,
            VEHICLE_COLOR_ID: lastAssetInfo.VEHICLE_COLOR_ID,
            VEHICLE_SEATTYPE_ID: lastAssetInfo.VEHICLE_SEATTYPE_ID,

            RENTALNUMBER: lastAssetInfo.RENTALNUMBER,
            RENTALUNIT: lastAssetInfo.RENTALUNIT,
            RENTAL_EFFECTIVEDATE: lastAssetInfo.RENTAL_EFFECTIVEDATE,
            RENTAL_EXPIREDATE: lastAssetInfo.RENTAL_EXPIREDATE,

            RENTAMOUNT: lastAssetInfo.RENTAMOUNT,
            RENTTAXFLAG: lastAssetInfo.RENTTAXFLAG,
            INSURANCECHARGEAMOUNT: lastAssetInfo.INSURANCECHARGEAMOUNT
        });

        // update controls style
        $timeout(updateControlsTimeout);
    }

    function deleteAssetDetail(index) {
        $scope.model.DOCUMENT_VEHICLERENTAL.ASSETINFOS.splice(index, 1);
    }

    function updateVehicleTypeInfo() {
        Loading.showLoad();

        var model = $scope.model;

        var newTypeId = ($scope.tmpVehicleType || {}).PROPERTYID || 0;

        model.DOCUMENT_VEHICLERENTAL = $scope.model.DOCUMENT_VEHICLERENTAL || {};
        model.DOCUMENT_VEHICLERENTAL.LESSORNAME = ($scope.tmplessorName || {}).PROPERTYID;
        model.DOCUMENT_VEHICLERENTAL.VEHICLERENTALTYPEID = newTypeId;
        model.DOCUMENT_VEHICLERENTAL.ASSETINFOS = [{}];

        if (newTypeId <= $scope.forkliftId) {
            var req = $scope.model.REQUEST;
            req.NOTICENUMBER_INSURANCE = null;
            req.NOTICEUNIT_INSURANCE = null;
            req.NOTICENUMBER_CARACT = null;
            req.NOTICEUNIT_CARACT = null;
            req.NOTICENUMBER_VEHICLETAX = null;
            req.NOTICEUNIT_VEHICLETAX = null;
        }

        $timeout(updateControlsTimeout);
    }

    function getUserProperty(asset, id) {
        var user = getUserByUserID($scope.drivers, id) || { USERID: 0 };
  
        Loading.showLoad();
        UserAPI.getUserPropertyByUser(user, sessionStorage.getItem(constants.culture))
            .then(handleDriverReponse)
            .always(cleanup);

        function handleDriverReponse(response) {
            $scope.$apply(updateDriver);

            function updateDriver() {
                var department = getPropertyByType(response, "แผนก") || {};
                asset.COSTCENTER = ValueMangement.NoneString(department.PROPERTYNAME);
                asset.DEPARTMENT = ValueMangement.NoneString(department.PROPERTYDESC_TH);

                var position = getPropertyByType(response, "ตำแหน่ง") || {};
                asset.POSITION = ValueMangement.NoneString(position.PROPERTYDESC_TH);
            }
        }

        function getUserByUserID(users, id) {
            if (users == undefined || id == undefined) {
                return { USERID: 0 };
            }
            return users.find(filterProperty);

            function filterProperty(element) {
                return element.USERID == id;
            }
        }

    }
    
    function cleanup(){
        Loading.hideLoad();
    }

    function getPropertyByID(propertys, id) {
        if (propertys == undefined || id == undefined) {
            return {};
        }
        return propertys.find(filterProperty);

        function filterProperty(element) {
            return element.PROPERTYID == id;
        }
    }

    function getPropertyByType(propertys, type) {
        if (propertys == undefined || type == undefined) {
            return {};
        }
        return propertys.find(filterProperty);

        function filterProperty(element) {
            return element.PROPERTYTYPE == type;
        }
    }

    function saveDraft() {

        $scope.model.REQUEST.REQUESTSTATUS = 1;

        processFormSubmission(1, validateDraftModelFunc);

        //////////////===============================================================================

        function validateDraftModelFunc() {
            var form = $scope.pageForm;

            // lessor name
            if (form.lessorName.$invalid) {
                return {
                    flag: false,
                    text: form.lessorName.$$element.data().errorRequired
                }
            }

            // vehicle type
            if (form.vehicleType.$invalid) {
                return {
                    flag: false,
                    text: form.vehicleType.$$element.data().errorRequired
                }
            }

            return {
                flag: true,
                text: ''
            };
        }
    }

    function submitDocument() {
        
        $scope.model.REQUEST.REQUESTSTATUS = 2;

        processFormSubmission(2, validateModelFunc);

        //////////////===============================================================================

        function validateModelFunc() {
            var form = $scope.pageForm;

            if (!checkReceive($scope.model.RECEIVEPERSONINFO)) {
                return {
                    flag: false,
                    text: "กรุณากรอกรายละเอียดผู้รับเงินให้ถูกต้องครบถ้วน"
                }
            }

            if (form.$valid) {
                // validate file input
                var aceFiles = angular.element('#vehicleRentalFile').data('ace_input_files');
                if (!aceFiles || !aceFiles.length) {
                    return {
                        flag: false,
                        text: 'เลือกไฟล์หนังสือสัญญาเช่ารถ'
                    };
                }

                return {
                    flag: true,
                    text: ''
                };
            }

            // get first invalid element message
            var invalidEls = angular.element('.ng-invalid:enabled');
            var requiredEls = invalidEls.filter('.ng-invalid-required:first');
            var patternEls = invalidEls.filter('.ng-invalid-pattern:first');

            var msg = requiredEls.data('errorRequired') || patternEls.data('errorPattern');
            return {
                flag: false,
                text: msg
            };

            function checkReceive(value) {
                if (value == undefined) {
                    return true;
                }

                if (ValueMangement.NoneString(value.RECEIVEPERSONNAME) != "" &&
                    ValueMangement.NoneString(value.BANKID) != "" &&
                    ValueMangement.NoneString(value.BANKBRANCHNAME) != "" &&
                    ValueMangement.NoneString(value.BANKACCOUNTNO) != "") {
                    return true;
                }
                else if (ValueMangement.NoneString(value.RECEIVEPERSONNAME) == "" &&
                    ValueMangement.NoneString(value.BANKID) == "" &&
                    ValueMangement.NoneString(value.BANKBRANCHNAME) == "" &&
                    ValueMangement.NoneString(value.BANKACCOUNTNO) == "") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }

    function processFormSubmission(reqStatus, validateFunc) {
        // prepare data
        var postModel = angular.copy($scope.model);
        postModel.DOCUMENT_VEHICLERENTAL.LESSORNAME = ($scope.tmplessorName || {}).PROPERTYID;

        // set request status flag
        postModel.REQUEST.REQUESTSTATUS = reqStatus;

        // convert all dates
        postModel.DOCUMENT_VEHICLERENTAL.ASSETINFOS.forEach(convertAssetInfosDates);
        postModel.DOCUMENT_VEHICLERENTAL.RECEIVEPERSONINFO = postModel.RECEIVEPERSONINFO;
        postModel.REQUEST.DOC_CREATEDATE = ValueMangement.DateTime(postModel.REQUEST.DOC_CREATEDATE);

        // Inputs validation
        var validateResult = validateFunc();
        if (!validateResult.flag) {
            Loading.hideLoad();
            Notification.notiWarn(validateResult.text);
            return false;
        }

        // post data to back-end

        Loading.showLoad();

        DocumentAPI.insertDocumentVehicleRental(postModel)
            .then(handleInsertDocumentPost)
            .then(uploadVehicleRentalDocument)
            .then(uploadOtherFilesDocument)
            .then(successRedirect)
            .fail(handleFail)
            .always(handleCleanup);

        ////////////===============================================================================

        function handleInsertDocumentPost(response) {
            if (response.MSGSTATUS !== 0) {
                return angular.element.Deferred().reject(response);
            }

            response.REQID = response.MSGTEXT; // save reqId
            response.MSGTEXT = "สำเร็จ";

            var session = $window.sessionStorage;
            session.APPROVE_DOCUMENT_VEHICLERENTAL = response;
            sessionStorage.setItem("alert", JSON.stringify(response));

            Loading.hideLoad();

            return response;
        }

        function uploadVehicleRentalDocument(response) {
            var aceFiles = angular.element('#vehicleRentalFile').data('ace_input_files');
            if (!aceFiles || !aceFiles.length) {
                // vehicle rental file not selected
                $scope.vehicleRentalFile = 1;
                return response;
            }

            $scope.vehicleRentalFile = 0;

            // vehicle rental file
            var reqId = response.REQID;

            var url = config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + 'vehicleRentalDir' + "&doctype=" + constants.vihecleFile + "&reqno=" + reqId + "&filetype=" + "vehicleRental";

            var formData = new FormData();

            var file = aceFiles[0];

            formData.append('file', file, file.name);
            formData.append('upload_file', true);

            var progressBarEl = angular.element('#vehicleRentalFileProgress');

            return postFilesToServer(url, formData, progressBarEl, "vehicleRentalFile");
        }

        function uploadOtherFilesDocument(response) {
            var aceFiles = angular.element('#otherFiles').data('ace_input_files');
            if (!aceFiles || !aceFiles.length) {
                // other files not selected
                $scope.otherFiles = 1;
                return response;
            }

            $scope.otherFiles = 0;

            // other files
            var resp = response[0] || response;
            var reqId = resp.REQID;

            var url = config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + 'vehicleRentalDir' + "&doctype=" + constants.vihecleFile + "&reqno=" + reqId + "&filetype=" + "other";

            var formData = new FormData();

            for (var i = 0; i < aceFiles.length; ++i) {
                var file = aceFiles[i];
                formData.append('file' + i, file, file.name);
                formData.append('upload_file' + i, true);
            }

            var progressBarEl = angular.element('#otherFilesProgress');

            return postFilesToServer(url, formData, progressBarEl, "otherFiles");
        }

        ////////////===============================================================================

        function postFilesToServer(url, formData, progressBarEl, fileType) {
            // reset progress bar
            var percent = 0;
            progressBarEl.find('.progress-bar').css('width', +percent + '%');
            progressBarEl.find('.status').text(percent + '%');
            progressBarEl.show();

            return angular.element.ajax({
                type: "POST",
                cache: false,
                url: url,
                contentType: false,
                processData: false,
                data: formData,
                xhr: handleAjaxXhr,
                async: true
            });

            ////////////===============================================================================

            function handleAjaxXhr() {
                var myXhr = angular.element.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', progressHandling, false);
                }
                return myXhr;
            }

            function progressHandling(event) {
                var percent = 0;
                var position = event.loaded || event.position;
                var total = event.total;
                if (event.lengthComputable) {
                    percent = Math.ceil(position / total * 100);
                }

                if (percent == 100) {
                    if (fileType == "vehicleRentalFile") {
                        $scope.vehicleRentalFile = 1;
                    }
                    else if (fileType == "otherFiles") {
                        $scope.otherFiles = 1;
                    }
                }
                // update progressbars classes so it fits your code
                progressBarEl.find('.progress-bar').css('width', +percent + '%');
                progressBarEl.find('.status').text(percent + '%');
            }
        }

        function handleFail(response) {
            Notification.notiFail(response.MSGTEXT);
        }

        function successRedirect(response) {

            if ($scope.vehicleRentalFile !== 1 || $scope.otherFiles !== 1) {
                return false;
            }

            switch ($scope.model.REQUEST.REQUESTSTATUS) {

                // submit success
                case 2:
                    $window.location.assign('../SEARCH/SEARCH_400');
                    break;

                // save draft success
                case 1:
                default:
                    $window.location.assign('../REQUEST/REQ_1300');
                    break;
            }
        }

        function handleCleanup() {
            Loading.hideLoad();
        }

        // Convert date format strings
        function convertAssetInfosDates(assetDetail) {
            assetDetail.RENTAL_EFFECTIVEDATE = ValueMangement.DateTime(assetDetail.RENTAL_EFFECTIVEDATE);
            assetDetail.RENTAL_EXPIREDATE = ValueMangement.DateTime(assetDetail.RENTAL_EXPIREDATE);

            assetDetail.INSURANCE_EFFECTIVEDATE = ValueMangement.DateTime(assetDetail.INSURANCE_EFFECTIVEDATE);
            assetDetail.INSURANCE_EXPIREDATE = ValueMangement.DateTime(assetDetail.INSURANCE_EXPIREDATE);
            assetDetail.CARACT_EFFECTIVEDATE = ValueMangement.DateTime(assetDetail.CARACT_EFFECTIVEDATE);
            assetDetail.CARACT_EXPIREDATE = ValueMangement.DateTime(assetDetail.CARACT_EXPIREDATE);
            assetDetail.VEHICLETAX_EFFECTIVEDATE = ValueMangement.DateTime(assetDetail.VEHICLETAX_EFFECTIVEDATE);
            assetDetail.VEHICLETAX_EXPIREDATE = ValueMangement.DateTime(assetDetail.VEHICLETAX_EXPIREDATE);

            assetDetail.ENGINE_SIZE = ValueMangement.NoneString(assetDetail.ENGINE_SIZE).toString().replace(/,/g, '');
            assetDetail.RENTAMOUNT = ValueMangement.NoneString(assetDetail.RENTAMOUNT).toString().replace(/,/g, '');
            assetDetail.INSURANCECHARGEAMOUNT = ValueMangement.NoneString(assetDetail.INSURANCECHARGEAMOUNT).toString().replace(/,/g, '');
            assetDetail.FLEETCARDBUDGET = ValueMangement.NoneString(assetDetail.FLEETCARDBUDGET).toString().replace(/,/g, '');
        }
    }

    function initModel() {
        $scope.model = {
            DOCUMENT_VEHICLERENTAL: {
                VEHICLERENTALTYPE: {},
                PAYMENTOUTWITHINDATE: 25,                       // default pay date
                ASSETINFOS: [{
                    RENTTAXFLAG: 0
                }],
            },
            REQUEST: {
                DOCTYPEID: 4,                                   // vehicle rental
                REQUESTSTATUS: 1,                               // 1: draft -- 2: submit
                USERREQUESTID: userSession.USER.USERID,
                USERREQUESTNAME: userSession.USER.USERNAME,
                CREATEDBY: userSession.USER.USERNAME
            }
        };

        // Create range array
        // ref: http://www.jstips.co/en/javascript/create-range-0...n-easily-using-one-line/
        $scope.monthDates = Array.apply(null, { length: 31 }).map(Function.call, Number).slice(1);
    }

    function domReady() {

        initControls();

        FileInput.single();
        FileInput.multi();
    }

    function initControls() {
        // use $.when to join promises
        angular.element.when(
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORNAME'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLETYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLECOLOR'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLESEATTYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLEPLATETYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLPROVINCE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLBANK'),
            UserAPI.getUserList()
        ).done(handleInitControlsPromises);

        ////////////===============================================================================

        function handleInitControlsPromises() {

            var dataarray = arguments;

            var idx = 0;

            $scope.lessorNames = dataarray[idx++][0] || [];
            $scope.vehicleTypes = dataarray[idx++][0] || [];
            $scope.colors = dataarray[idx++][0] || [];
            $scope.seatTypes = dataarray[idx++][0] || [];
            $scope.vehiclePlateTypes = dataarray[idx++][0] || [];
            $scope.provinces = dataarray[idx++][0] || [];
            $scope.banks = dataarray[idx++][0] || [];
            $scope.drivers = dataarray[idx++][0] || [];

            $scope.$apply(function applyUpdateControls() {
                $timeout(updateControlsTimeout);
            });
        }
    }

    function updateControlsTimeout() {
        Dropdownlist.chnageUI('41.66%');
        Dropdownlist.updateUI('.chosen-select');
        DatePicker.datePicker('#content');

        Loading.hideLoad();
    }
})

.controller('REQ_1000_Ctrl', function ($scope, $timeout, $window, $location, constants, Loading, ValueMangement, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, DocumentAPI) {

    var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

    Loading.showLoad();

    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    $scope.search = serchsession == null ? {} : serchsession;

    $scope.getRequestByProperty = getRequestByProperty;

    $scope.stringToDate = stringToDate;

    $scope.viewDetail = viewDetail;

    $scope.setRequestRevision = function (doc) {
        DocumentAPI.getNextRevisionDocument({ DOCRUNNO: doc.DOCREFID }).then(function (response) {
            $scope.$apply(function () {
                $scope.revisionNew = response.MSGTEXT;
                $scope.revisionOld = doc.DOCRUNNO;
            });
        })
    }

    $scope.insertNewRevision = function (docrunno, remark) {

        var cause = angular.element('input[name=rdoCause]:checked').val();
        var data = {};

        if (cause.split(",")[0] == "4" && ValueMangement.NoneString(remark) == "") {
            Notification.notiFail("กรุณากรอกหมายเหตุ");
            return;
        }

        data.DOCRUNNO = docrunno;
        data.USERREQUESTID = userSession.USER.USERID;
        data.USERREQUESTNAME = userSession.USER.USERNAME;
        data.REMARKS = cause.split(",")[1] + " : " + ValueMangement.NoneString(remark);
        data.REVISIONTYPE = cause.split(",")[0];

        DocumentAPI.insertNewRivisionDocumentSpaceRental(data).then(function (response) {
            if (response.MSGSTATUS == 0) {
                sessionStorage.setItem("alert", JSON.stringify(response));
                var session = $window.sessionStorage;
                session.REQID = response.MSGTEXT;
                session.DOCTYPEID = 3;  // space rental
                $window.location.assign('REQ_1210');
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })

    }

    init();

    angular.element(document).ready(domReady);

    ////////////===============================================================================

    function getRequestByProperty(search) {

        sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

        Loading.showLoad();

        var data = angular.copy(search || {});
        data.PAGE = 'REQ_1000';
        data.DOCTYPEID = 3;
        data.REQUESTSTATUS = data.REQUESTSTATUS || -1;
        data.USERREQUESTID = data.USERREQUESTID || -1;
        data.USERVERIFYID = data.USERVERIFYID || -1;
        data.LASTREVISIONFLAG = 1

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

    function viewDetail(row) {
        var session = $window.sessionStorage;
        session.REQID = row.REQID;
        session.DOCTYPEID = row.DOCTYPEID;
        $window.location.assign('SEARCH_1010');
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
        angular.element.when(
            StoreAPI.getStoreList(),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSPACERENTALTYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLREVISIONSPACERENTALTYPE'),
            SearchAPI.getRequestStatusList(),
            UserAPI.getUserList(),
            getRequestByProperty($scope.search)
        ).done(handleInitPromises).always(cleanup);

        ////////////===============================================================================

        function handleInitPromises() {
            var dataarray = arguments;
            var idx = 0;
            $scope.stores = dataarray[idx++][0] || [];
            $scope.spaceRentalTypes = dataarray[idx++][0] || [];
            $scope.revisiontypes = dataarray[idx++][0] || [];
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

        Dropdownlist.chnageUI('100%');

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
        angular.element('#modal-table').modal('hide');
    }

    function cleanup() {
        Loading.hideLoad();
    }

})

.controller('REQ_1100_Ctrl', function ($scope, $timeout, $window, $location, constants, Loading, ValueMangement, Notification, Table, Dropdownlist, DatePicker, DocumentAPI, PropertyAPI, UserAPI, SearchAPI) {

    var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

    Loading.showLoad();

    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    $scope.search = serchsession == null ? {} : serchsession;

    $scope.getRequestByProperty = getRequestByProperty;

    $scope.stringToDate = stringToDate;

    $scope.setRequestRevision = setRequestRevision;

    $scope.insertNewRevision = insertNewRevision;

    init();

    angular.element(document).ready(domReady);

    ////////////===============================================================================

    function getRequestByProperty(search) {

        sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

        Loading.showLoad();

        var data = angular.copy(search || {});
        data.PAGE = 'REQ_1100';
        data.DOCTYPEID = 4;
        data.REQUESTSTATUS = data.REQUESTSTATUS || -1;
        data.USERREQUESTID = data.USERREQUESTID || -1;
        data.USERVERIFYID = data.USERVERIFYID || -1;
        data.LASTREVISIONFLAG = 1

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

    function setRequestRevision(row) {
        DocumentAPI.getNextRevisionDocument({ DOCRUNNO: row.DOCREFID }).then(function (response) {
            $scope.$apply(function () {
                $scope.revisionNew = response.MSGTEXT;
                $scope.revisionOld = row.DOCRUNNO;
            });
        })
    }

    function insertNewRevision(docrunno, remark) {

        var cause = angular.element('input[name=rdoCause]:checked').val();
        var data = {};

        if (cause.split(",")[0] == "4" && ValueMangement.NoneString(remark) == "") {
            Notification.notiFail("กรุณากรอกหมายเหตุ");
            return;
        }

        data.DOCRUNNO = docrunno;
        data.USERREQUESTID = userSession.USER.USERID;
        data.USERREQUESTNAME = userSession.USER.USERNAME;
        data.REMARKS = cause.split(",")[1] + " : " + ValueMangement.NoneString(remark);
        data.REVISIONTYPE = cause.split(",")[0];

        DocumentAPI.insertNewRivisionDocumentVehicleRental(data).then(function (response) {
            if (response.MSGSTATUS == 0) {
                sessionStorage.setItem("alert", JSON.stringify(response));
                var session = $window.sessionStorage;
                session.REQID = response.MSGTEXT;
                session.DOCTYPEID = 4;  // space rental
                $window.location.assign('REQ_1310');
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })

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

        angular.element.when(
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLETYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLREVISIONVEHICLERENTALTYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORNAME'),
            SearchAPI.getRequestStatusList(),
            UserAPI.getUserList(),
            getRequestByProperty($scope.search)
        ).done(handleInitPromises).always(cleanup);

        ////////////===============================================================================

        function handleInitPromises() {
            var dataarray = arguments;
            var idx = 0;
            $scope.vehicleRentalTypes = dataarray[idx++][0] || [];
            $scope.revisiontypes = dataarray[idx++][0] || [];
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
})

.controller('REQ_1200_Ctrl', function ($scope, $timeout, $window, $location, constants, Loading, ValueMangement, Notification, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, DocumentAPI) {

    var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

    Loading.showLoad();

    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    $scope.search = serchsession == null ? {} : serchsession;

    $scope.getRequestByProperty = getRequestByProperty;

    $scope.stringToDate = stringToDate;

    $scope.loadingCounter = 0;

    $scope.viewDetail = viewDetail;

    $scope.confirmDeleteDraft = confirmDeleteDraft;

    init();

    angular.element(document).ready(domReady);

    ////////////===============================================================================

    function getRequestByProperty(search) {

        sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

        Loading.showLoad();

        var data = angular.copy(search || {});
        data.PAGE = 'REQ_1200';
        data.DOCTYPEID = 3;
        data.REQUESTSTATUS = -1;
        data.USERREQUESTID = userSession.USER.USERID; //data.USERREQUESTID || -1;
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

    function viewDetail(row) {
        var session = $window.sessionStorage;
        session.REQID = row.REQID;
        session.DOCTYPEID = row.DOCTYPEID;
        $window.location.assign('REQ_1210');
    }

    function confirmDeleteDraft(row) {
        bootbox.dialog({
            message: "<span class='bigger-110'>คุณต้องการลบแบบร่าง " + row.REQID + " ใช่หรือไม่ ?</span>",
            data: row,
            buttons:
                {
                    "delete":
                        {
                            "label": "ใช่",
                            "className": "btn-sm btn-danger",
                            "callback": confirmedDeleteDraftCallBack
                        },
                    "cancel":
                        {
                            "label": "ไม่",
                            "className": "btn-sm"
                        }
                }
        });

        function confirmedDeleteDraftCallBack() {
            deleteDraft(row);
        }
    }

    function deleteDraft(data) {
        Loading.showLoad();
        $scope.loadingCounter++;

        DocumentAPI.deleteDraftDocument(data)
            .then(handleMsgResponse)
            .always(cleanup);
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
        angular.element.when(
            StoreAPI.getStoreList(),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSPACERENTALTYPE'),
            SearchAPI.getRequestStatusList(),
            UserAPI.getUserList(),
            getRequestByProperty($scope.search)
        ).done(handleInitPromises).always(cleanup);

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

        Dropdownlist.chnageUI('100%');

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
        getRequestByProperty($scope.search);
        angular.element('#modal-table').modal('hide');
    }

    function cleanup() {
        Loading.hideLoad();
    }
})

.controller('REQ_1210_Ctrl', function ($scope, $window, $timeout, $http, constants, regex, config, Loading, Notification, ValueMangement, Dropdownlist, FileInput, TextArea, DatePicker, Spinner, RequestAPI, StoreAPI, PropertyAPI, TaxTypeAPI, DocumentAPI, SpaceRentalSizeAPI, CJBankAPI, FileAttachmentAPI) {

    /* The REQ_1210_Ctrl(Variable Controller) sign at 02/04/2018 */
    Loading.showLoad();
    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    var connt = 0;

    var request = {
        REQUEST: {
            REQID: $window.sessionStorage.REQID, //REQ18030088  REQ18030153
            DOCTYPEID: $window.sessionStorage.DOCTYPEID
        }
    };

    var spaceRentalFiles = 0;
    var otherFiles = 0;


    $scope.persons = [];
    $scope.lessees = [];
    $scope.req = {};
    $scope.doc = {};
    $scope.store = [];
    $scope.lesseeList = [];
    $scope.personList = [];

    $scope.downloadDocumentFromServer = downloadDocumentFromServer;
    //init();

    DatePicker.datePicker();

    /* The REQ_1210_Ctrl(PageLoad Controller) sign at 02/04/2018 */
    try {
        Loading.showLoad();
        init();

    } catch (e) {
        Loading.hideLoad();
        Notification.notiFail(e);
    }

    /* The REQ_1210_Ctrl(Event Controller) sign at 02/04/2018 */

    function init() {
        // UI controls data
        angular.element.when(
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSPACERENTALTYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLSERVICECHARGETYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLBANK'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLPAYMENTERM'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORTYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLHOUSEANDLANDTAXTYPE'),
            TaxTypeAPI.getTaxTypeList(null),
            SpaceRentalSizeAPI.getSpaceRentalSizeList(null),
            CJBankAPI.getCJBankList(null),
            StoreAPI.getStoreByProperty({ ACTIVE: 1 }),
            FileAttachmentAPI.getFileAttachmentByRequest(request.REQUEST),
            DocumentAPI.getDocumentDetail(request)
        ).done(handleInitPromises).always(cleanup);

        ////////////===============================================================================

        function handleInitPromises() {
            var dataarray = arguments;
            var idx = 0;
            $scope.spacerentaltypes = dataarray[idx++][0] || [];
            $scope.servicechangetypes = dataarray[idx++][0] || [];
            $scope.banks = dataarray[idx++][0] || [];
            $scope.paymentoutterms = dataarray[idx++][0] || [];
            $scope.lessortypes = dataarray[idx++][0] || [];
            $scope.houselandtaxs = dataarray[idx++][0] || [];
            $scope.taxtypes = dataarray[idx++][0] || [];
            $scope.spacerentalsizelist = dataarray[idx++][0] || [];
            $scope.cjbanklist = dataarray[idx++][0] || [];
            $scope.stores = dataarray[idx++][0] || [];
            $scope.files = dataarray[idx++][0] || [];
            var model = dataarray[idx++][0] || [];

            $scope.req = model.REQUEST;
            $scope.doc = model.DOCUMENT_SPACERENTAL;

            //$("#PAYMENTOUTWITHINDATE").val(5).trigger("chosen:updated");
            $scope.addLessee();
            $scope.addReceivePersonNumber();
            $scope.addReceivePersonNumber();

            //updateDocument($scope.req, $scope.doc);
            $scope.$apply(function applyUpdateControls() {
                $timeout(updateControlsTimeout);
            });

            ////////////===============================================================================

            function updateControlsTimeout() {
                updateDocument($scope.req, $scope.doc);
                Dropdownlist.chnageUI('41.66%');
                Dropdownlist.updateUI('.chosen-select');
                DatePicker.datePicker();
                FileInput.single();
                FileInput.multi();
            }
        }
    }

    function cleanup() {
        Loading.hideLoad();
    }

    $scope.setDisabledLessee = function (name, value) {
        if (value == 3) {
            $('input[name="corporate' + name + '"]').removeAttr('disabled');
            $('#view' + name).attr('style', 'display:none');
        }
        else if (value == 4) {
            $('#view' + name).attr('style', 'display:');
            $('input[name="corporate' + name + '"]').attr('disabled', true);
            $('input[name="corporate' + name + '"]').removeAttr('checked');
        }
        else {
            $('#view' + name).attr('style', 'display:none');
            $('input[name="corporate' + name + '"]').attr('disabled', true);
            $('input[name="corporate' + name + '"]').removeAttr('checked');
        }
        $('#otherType' + name).val('');
    }

    $scope.validateStoreCodeRequireBySpaceRentalType = function (name) {
        var spaceRentalType = getPropertyByID($scope.spacerentaltypes, ValueMangement.NoneString($scope.doc.SPACERENTALTYPEID));
        if (ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toString().toUpperCase().includes("XX")) {
            return true;
        }
        return false;
    }

    $scope.validateSpaceRentalSizeRequireBySpaceRentalType = function (name) {
        var spaceRentalType = getPropertyByID($scope.spacerentaltypes, ValueMangement.NoneString($scope.doc.SPACERENTALTYPEID));
        if (ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toString().toUpperCase().includes("SS")) {
            $('#spaceRentalSizeDDL').removeAttr('disabled').trigger("chosen:updated");
            return false;
        }
        else {
            $('#spaceRentalSizeDDL').val("");
            $('#spaceRentalSizeDDL').attr('disabled', true).trigger("chosen:updated");
            return true;
        }
    }

    $scope.validateServiceChargeRequireBySpaceRentalType = function (name) {
        var spaceRentalType = getPropertyByID($scope.spacerentaltypes, ValueMangement.NoneString($scope.doc.SPACERENTALTYPEID));
        if (ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toString().toUpperCase().includes("XX") &&
            ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toString().toUpperCase().includes("Y")) {
            return true;
        }
        return false;
    }

    $scope.selectSize = function (spaceRentalTypeID, id) {
        SpaceRentalSizeAPI.getSpaceRentalSizeList('?type=' + spaceRentalTypeID).then(function (response) {
            $scope.$apply(function () {
                $scope.spacerentalsizelist = response;
            });

            if (id == undefined) {
                $scope.doc.SPACERENTALSIZEID = "";
                $('#spaceRentalSizeDDL').val("").trigger("chosen:updated");
            }
            else {
                $scope.doc.SPACERENTALSIZEID = id;
                $('#spaceRentalSizeDDL').val(id).trigger("chosen:updated");
            }
        });
    }

    $scope.selectLesseeVendor = function (name, value) {
        var lesseeNo = name.split('-')[1];
        if (value == "1") {
            $('input[name="vendorName-' + lesseeNo + '"]').val("");
            $('input[name="vendorName-' + lesseeNo + '"]').attr('disabled', true);
            $('select[name="bank-' + lesseeNo + '"]').removeAttr('disabled').trigger("chosen:updated");
        }
        else if (value == "2") {
            $('select[name="bank-' + lesseeNo + '"]').val("");
            $('select[name="bank-' + lesseeNo + '"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="vendorName-' + lesseeNo + '"]').removeAttr('disabled');
        }
        else {
            $('select[name="bank-' + lesseeNo + '"]').val("");
            $('input[name="vendorName-' + lesseeNo + '"]').val("");
            $('select[name="bank-' + lesseeNo + '"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="vendorName-' + lesseeNo + '"]').attr('disabled', true);
        }
    }

    $scope.selectLesseeType = function (value) {
        $('input[name="renterTypeOther"]').attr('disabled', true).trigger("chosen:updated");
        if (ValueMangement.NoneString(value).toUpperCase().includes("SM")) {
            //$('input[name="renterTypeOther"]').removeAttr('disabled');
            $('input[name="renterType"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="renterType"]').attr('checked', false).trigger("chosen:updated");
        }
        else if (ValueMangement.NoneString(value).toUpperCase().includes("SP")) {
            $('input[name="renterType"]').removeAttr('disabled');
            //$('input[name="renterTypeOther"]').attr('disabled', true).trigger("chosen:updated");
        }
        else if (ValueMangement.NoneString(value).toUpperCase().includes("OT")) {
            $('input[name="renterTypeOther"]').removeAttr('disabled');
            $('input[name="renterType"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="renterType"]').attr('checked', false).trigger("chosen:updated");
        }
        else {
            $('input[name="renterTypeOther"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="renterType"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="renterType"]').attr('checked', false).trigger("chosen:updated");
        }
    }

    $scope.validatePhoneNumber = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode)) && (String.fromCharCode($event.keyCode)) != '-') {
            $event.preventDefault();
        }
    };

    $scope.validateAmountNumber = function ($event) {
        var value = ValueMangement.NoneString($event.target.value);
        var decision = value.split(".");
        var nPoint = (value.match(new RegExp("\\.", "g")) || []).length;
        if (isNaN(String.fromCharCode($event.keyCode)) && (String.fromCharCode($event.keyCode)) != '.') {
            $event.preventDefault();
        }
        if (decision.length > 1) {
            if ((String.fromCharCode($event.keyCode)) == '.') {
                $event.preventDefault();
            }
            if ($event.target.selectionStart > value.indexOf('.')) {
                if (decision[1].length >= 4) {
                    $event.preventDefault();
                }
            }

        }
    }

    $scope.currencyAmountNumber = function (value) {
        return currency(value);
    }

    function currency(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }

    $scope.validateNumber = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };

    $scope.addLessee = function () {
        var lessee = "lessee" + $scope.lessees.length;
        $scope.lessees.push(lessee);
        setTimeout(function () {
            $('input[name="corporate' + lessee + '"]').attr('disabled', true);
            $('input[name="corporate' + lessee + '"]').removeAttr('checked');
            $('select[name="bank-' + lessee + '"]').val("");
            $('input[name="vendorName-' + lessee + '"]').val("");
            $('select[name="bank-' + lessee + '"]').attr('disabled', true).trigger("chosen:updated");
            $('input[name="vendorName-' + lessee + '"]').attr('disabled', true);
            Dropdownlist.chnageUI('41.66%');
            TextArea.inputLimit();
        }, true);
    }

    $scope.addReceivePersonNumber = function () {
        var person = "person" + $scope.persons.length;
        $scope.persons.push(person);
        setTimeout(function () {
            Dropdownlist.chnageUI('41.66%');
        }, true);
    }

    $scope.deleteReceivePersonNumber = function (person) {
        var index = $scope.persons.indexOf(person);
        $scope.persons.splice(index, 1);
    }

    $scope.saveDraft = function (req, doc) {
        spaceRentalFiles = 0;
        otherFiles = 0

        $scope.req.REQUESTSTATUS = 1;

        var valiReq = validateRequest(req, doc);
        var valiDoc = validateDocument(doc);

        if (!valiReq.flag) {
            Notification.notiWarn(valiReq.text);
            return;
        };

        if (!valiDoc.flag) {
            Notification.notiWarn(valiDoc.text);
            return;
        };

        var data = setData(Object.assign({}, req), Object.assign({}, doc), 1);
        Loading.showLoad();
        DocumentAPI.updateDocumentSpaceRental(data).then(function (response) {
            runno = response.MSGTEXT;

            if (response.MSGSTATUS == 0) {

                clearSessionSearch(userSession);

                response.MSGTEXT = "สำเร็จ";

                var session = $window.sessionStorage;
                session.APPROVE_DOCUMENT_SPACERENTAL = response;
                sessionStorage.setItem("alert", JSON.stringify(response));

                upLoadFile(runno);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    $scope.submitDocument = function (req, doc) {
        spaceRentalFiles = 0;
        otherFiles = 0

        $scope.req.REQUESTSTATUS = 2;

        //var valiReq = validateRequest(req, doc);
        //var valiDoc = validateDocument(doc);
        var valiSubmit = validateSubmit(req, doc);

        //if (!valiReq.flag) {
        //    Notification.notiWarn(valiReq.text);
        //    return;   
        //};

        //if (!valiDoc.flag) {
        //    Notification.notiWarn(valiDoc.text);
        //    return;
        //};

        if (!valiSubmit.flag) {
            Notification.notiWarn(valiSubmit.text);
            return;
        };
        
        var data = setData(Object.assign({}, req), Object.assign({}, doc), 2);
        Loading.showLoad();
        DocumentAPI.updateDocumentSpaceRental(data).then(function (response) {
            runno = response.MSGTEXT;

            if (response.MSGSTATUS == 0) {

                clearSessionSearch(userSession);

                response.MSGTEXT = "สำเร็จ";

                var session = $window.sessionStorage;
                session.APPROVE_DOCUMENT_SPACERENTAL = response;
                sessionStorage.setItem("alert", JSON.stringify(response));

                upLoadFile(runno);
            }
            else {
                Loading.hideLoad();
                Notification.notiFail(response.MSGTEXT);
            }
        })
    }

    /* The REQ_1210_Ctrl(Function Controller) sign at 02/04/2018 */
    function updateDocument(req, doc) {
        // Set Store Code Disabled
        if (ValueMangement.NoneString(req.STORECODE) != "") {
            $('select[name="STORECODE"]').attr('disabled', true).trigger("chosen:updated");
        }

        // Set Space Rental Size  
        var spaceRentalSize = doc.SPACERENTALSIZEID
        $scope.selectSize(doc.SPACERENTALTYPEID, doc.SPACERENTALSIZEID);

        //Set Service Charge Type 
        var serviceChangeType = getPropertyByID($scope.servicechangetypes, doc.SERVICECHARGETYPE) || {};
        var serviceChangeTypeRadio = $('input:radio[id="' + ValueMangement.NoneString(serviceChangeType.PROPERTYNAME) + "_" + ValueMangement.NoneString(serviceChangeType.PROPERTYID) + '"]')
        serviceChangeTypeRadio.filter('[value="' + serviceChangeType.PROPERTYID + '"]').prop('checked', true);

        // Set Service Charge tax Flag
        var serviceChargeTaxFlagRadio = $('input:radio[name="SERVICECHARGETAXFLAG"]')
        serviceChargeTaxFlagRadio.filter('[value="' + doc.SERVICECHARGETAXFLAG + '"]').prop('checked', true);
        doc.SERVICECHARGEAMOUNT = $scope.currencyAmountNumber(doc.SERVICECHARGEAMOUNT);

        // Set Electric Charge Tax Flag
        var electricChargeTaxFlagRadio = $('input:radio[name="ELECTRICCHARGETAXFLAG"]')
        electricChargeTaxFlagRadio.filter('[value="' + doc.ELECTRICCHARGETAXFLAG + '"]').prop('checked', true);
        doc.ELECTRICCHARGEAMOUNT = $scope.currencyAmountNumber(doc.ELECTRICCHARGEAMOUNT);

        // Set Water Charge Tax Flag
        var waterChargeTaxFlagRadio = $('input:radio[name="WATERCHARGETAXFLAG"]')
        waterChargeTaxFlagRadio.filter('[value="' + doc.WATERCHARGETAXFLAG + '"]').prop('checked', true);
        doc.WATERCHARGEAMOUNT = $scope.currencyAmountNumber(doc.WATERCHARGEAMOUNT);

        // Set Insurance Tax Flag
        var insuranceChargeTaxFlagRadio = $('input:radio[name="INSURANCECHARGETAXFLAG"]')
        insuranceChargeTaxFlagRadio.filter('[value="' + doc.INSURANCECHARGETAXFLAG + '"]').prop('checked', true);
        doc.INSURANCECHARGEAMOUNT = $scope.currencyAmountNumber(doc.INSURANCECHARGEAMOUNT);

        // Set House And Land Tax
        var houseAndLandTaxFlagRadio = $('input:radio[name="HOUSEANDLANDTAXID"]')
        houseAndLandTaxFlagRadio.filter('[value="' + doc.HOUSEANDLANDTAXID + '"]').prop('checked', true);

        // Set Board Tax
        var boardTaxFlagRadio = $('input:radio[name="BOARDTAXID"]')
        boardTaxFlagRadio.filter('[value="' + doc.BOARDTAXID + '"]').prop('checked', true);

        // Set Payment out within date of Document space rental 
        $("#PAYMENTOUTWITHINDATE").val(doc.PAYMENTOUTWITHINDATE).trigger("chosen:updated");

        // Set Document Create Date
        if (req.DOC_CREATEDATE != null)
            $('#DOC_CREATEDATE').datepicker("setDate", new Date(req.DOC_CREATEDATE));
        $('#DOC_CREATEDATE').datepicker("update");

        // Set Document Effective Date
        if (req.DOC_EFFECTIVEDATE != null)
            $('#DOC_EFFECTIVEDATE').datepicker("setDate", new Date(req.DOC_EFFECTIVEDATE));
        $('#DOC_EFFECTIVEDATE').datepicker("update");

        // Set Document Expire Date
        if (req.DOC_EXPIREDATE != null)
            $('#DOC_EXPIREDATE').datepicker("setDate", new Date(req.DOC_EXPIREDATE));
        $('#DOC_EXPIREDATE').datepicker("update");

        // Set Lessee Info 
        for (var i = 0; i < doc.LESSEEINFO.length; i++) {
            if (i != 0)
                $scope.addLessee();

            var lessee = doc.LESSEEINFO[i]
            var lesseeTag = $scope.lessees[i];

            $("#id" + lesseeTag).val(lessee.LESSEEINFOID);
            $("#code" + lesseeTag).val(lessee.VENDORID);
            $("#citizenid" + lesseeTag).val(lessee.CITIZENID);
            $("#address" + lesseeTag).val(lessee.ADDRESS);
            $("#tel" + lesseeTag).val(lessee.TELEPHONE);
            $("#lineID" + lesseeTag).val(lessee.LINEID);

            // Set Vendor Name
            var vendorFlagRadio = $('input:radio[name="vendorFlag-' + lesseeTag + '"]')
            vendorFlagRadio.filter('[value="' + lessee.VENDORFLAG + '"]').prop('checked', true);
            $scope.selectLesseeVendor("vendorFlag-" + lesseeTag, lessee.VENDORFLAG)
            if (lessee.VENDORFLAG == 2) {
                $("#vendorName" + lesseeTag).val(lessee.VENDORNAME);
            }
            $("#bank" + lesseeTag).val(lessee.VENDORBANKID).trigger("chosen:updated");

            // Set Vendor Type
            $("#type" + lesseeTag).val(lessee.LESSEETYPE).trigger("chosen:updated");
            $scope.setDisabledLessee(lesseeTag, lessee.LESSEETYPE);
            // Set Corporate Flag
            if (lessee.LESSEETYPE == 3) {
                var corporateFlag = (lessee.CORPORATIONTYPE == 0 ? "false" : "true");
                var corporateFlagRadio = $('input:radio[name="corporate' + lesseeTag + '"]')
                corporateFlagRadio.filter('[value="' + lesseeTag + ',' + corporateFlag + '"]').prop('checked', true);
            }
            $("#otherType" + lesseeTag).val(lessee.OTHERTYPE);

        }

        // Set Cancel Date Remarks 
        if (req.REVISIONTYPE == 3) {
            if (req.DOC_CANCELDATE != null)
                $('#DOC_CANCELDATE').datepicker("setDate", new Date(req.DOC_CANCELDATE));
            $('#DOC_CANCELDATE').datepicker("update");
            var insuranceRefundFlagRadio = $('input:radio[name="DOC_INSURANCEREFUNDFLAG"]');
            insuranceRefundFlagRadio.filter('[value="' + req.DOC_INSURANCEREFUNDFLAG + '"]').prop('checked', true);
        }
        
    }

    function getPropertyByID(propertys, id) {
        if (propertys == undefined || id == undefined) {
            return {};
        }
        return propertys.find(filterProperty);

        function filterProperty(element) {
            return element.PROPERTYID == id;
        }
    }

    function setData(req, doc, status) {

        lesseeList = [];
        //personList = [];
        cjBankList = [];
        for (var i = 0; i < $scope.lessees.length; i++) {
            var lesseeType = $('#type' + $scope.lessees[i]).val(); // 3 = นิติบุคคล
            var corporation = $('input[name=corporate' + $scope.lessees[i] + ']:checked').val();
            var vendorFlag = $('input[name=vendorFlag-' + $scope.lessees[i] + ']:checked').val();
            corporation = ValueMangement.NoneString(corporation);
            vendorFlag = ValueMangement.NoneString(vendorFlag);
            var bankId = "";
            var vendorName = "";
            if (vendorFlag == 1) {
                bankId = $('select[name="bank-' + $scope.lessees[i] + '"]').find(":selected").val();
                vendorName = $('select[name="bank-' + $scope.lessees[i] + '"]').find(":selected").text();
            }
            else if (vendorFlag == 2) {
                bankId = "";
                vendorName = $('#vendorName' + $scope.lessees[i]).val();
            }
            lesseeList.push(
                {
                    LESSEEINFOID: $('#id' + $scope.lessees[i]).val(),
                    REQID: req.REQID,
                    VENDORID: $('#code' + $scope.lessees[i]).val(),
                    CITIZENID: $('#citizenid' + $scope.lessees[i]).val(),
                    VENDORFLAG: vendorFlag,
                    VENDORNAME: vendorName,
                    VENDORBANKID: ValueMangement.NoneString(bankId),
                    LESSEETYPE: $('#type' + $scope.lessees[i]).val(),
                    CORPORATIONTYPE: corporation.split(",")[1] == "true" ? 1 : 0,
                    OTHERTYPE: $('#otherType' + $scope.lessees[i]).val(),
                    ADDRESS: $('#address' + $scope.lessees[i]).val(),
                    TELEPHONE: $('#tel' + $scope.lessees[i]).val(),
                    LINEID: $('#lineID' + $scope.lessees[i]).val()
                }
            );
        }

        //for (var i = 0; i < $scope.persons.length; i++) {
        //    personList.push(
        //        {
        //            RECEIVEACCOUNTINFOID: $('#id' + $scope.persons[i]).val(),
        //            REQID: $('#req' + $scope.persons[i]).val(),
        //            RECEIVEACCOUNTNAME: $scope.receiverName,
        //            BANKID: $('#bank' + $scope.persons[i]).val(),
        //            BANKBRANCHNAME: $('#branch' + $scope.persons[i]).val(),
        //            BANKACCOUNTNO: $('#book' + $scope.persons[i]).val()
        //        }
        //    );
        //}

        var spaceRentalType = getPropertyByID($scope.spacerentaltypes, ValueMangement.NoneString(doc.SPACERENTALTYPEID));
        if (ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toString().toUpperCase().includes("SS")) {
            for (var i = 0; i < $scope.cjbanklist.length; i++) {
                cjBankList.push($scope.cjbanklist[i].CJBANKACCOUNTINFOID);
            }
        }
        else {
            cjBankList.push("");
        }

        doc.SPACERENTALSIZEID = ValueMangement.NoneString(doc.SPACERENTALSIZEID);
        doc.SPACERENTALDESC = ValueMangement.NoneString(doc.SPACERENTALDESC);
        doc.SPACERENTAL_DOCNO = ValueMangement.NoneString(doc.SPACERENTAL_DOCNO);
        doc.SERVICECHARGETYPE = ValueMangement.NoneString(doc.SERVICECHARGETYPE);
        doc.SERVICECHARGETAXFLAG = ValueMangement.NoneString(doc.SERVICECHARGETAXFLAG);
        doc.ELECTRICCHARGETAXFLAG = ValueMangement.NoneString(doc.ELECTRICCHARGETAXFLAG);
        doc.WATERCHARGETAXFLAG = ValueMangement.NoneString(doc.WATERCHARGETAXFLAG);
        doc.INSURANCECHARGETAXFLAG = ValueMangement.NoneString(doc.INSURANCECHARGETAXFLAG);
        doc.HOUSEANDLANDTAXID = ValueMangement.NoneString(doc.HOUSEANDLANDTAXID);
        doc.BOARDTAXID = ValueMangement.NoneString(doc.BOARDTAXID);

        doc.SERVICECHARGEAMOUNT = ValueMangement.NoneString(doc.SERVICECHARGEAMOUNT).toString().replace(/,/g, '');
        doc.ELECTRICCHARGEAMOUNT = ValueMangement.NoneString(doc.ELECTRICCHARGEAMOUNT).toString().replace(/,/g, '');
        doc.WATERCHARGEAMOUNT = ValueMangement.NoneString(doc.WATERCHARGEAMOUNT).toString().replace(/,/g, '');
        doc.INSURANCECHARGEAMOUNT = ValueMangement.NoneString(doc.INSURANCECHARGEAMOUNT).toString().replace(/,/g, '');
        doc.PAYMENTOUTWITHINDATE = $("#PAYMENTOUTWITHINDATE").val();

        doc.LESSEEINFO = lesseeList;
        //doc.RECEIVEACCOUNTINFO = personList;
        doc.CJBANKACCOUNTLIST = cjBankList.join(',');

        var data = {};
        data.REQUEST = req;
        data.DOCUMENT_SPACERENTAL = doc;

        data.REQUEST.DOCTYPEID = 3; //1> LL	เอกสารสัญญาเช่า	เอกสารสัญญาเช่า
        data.REQUEST.REQUESTSTATUS = status;  // 1>	Draft	แบบร่าง  |   2> Request New Document	รอเอกสารอนุมัติ

        data.REQUEST.USERREQUESTID = userSession.USER.USERID;
        data.REQUEST.USERREQUESTNAME = userSession.USER.USERNAME;
        data.REQUEST.DOC_CREATEDATE = ValueMangement.DateTime($("#DOC_CREATEDATE").val());
        data.REQUEST.DOC_EFFECTIVEDATE = ValueMangement.DateTime($("#DOC_EFFECTIVEDATE").val());
        data.REQUEST.DOC_EXPIREDATE = ValueMangement.DateTime($("#DOC_EXPIREDATE").val());

        data.REQUEST.DOC_CANCELDATE = ValueMangement.DateTime($("#DOC_CANCELDATE").val());
        data.REQUEST.DOC_INSURANCEREFUNDFLAG = ValueMangement.NoneString($('input:radio[name="DOC_INSURANCEREFUNDFLAG"]:checked').val())

        return data;
    }

    function validateRequest(req, doc) {
        var spaceRentalType = getPropertyByID($scope.spacerentaltypes, ValueMangement.NoneString($scope.doc.SPACERENTALTYPEID));
        if (ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toUpperCase().includes("XX")) {
            return { flag: true, text: "" };
        }
        if (ValueMangement.NoneString(req.STORECODE) == "") {
            return { flag: false, text: "กรุณาเลือกร้านค้า" };
        }
        else {
            return { flag: true, text: "" };
        }


    }

    function validateDocument(doc) {

        if (ValueMangement.NoneString(doc.SPACERENTALTYPEID) == "") {
            return { flag: false, text: "กรุณาเลือกประเภทการเช่าพื้นที่หน้าร้าน" };
        }
        else {
            return { flag: true, text: "" };
        }

    }

    function validateSubmit(req, doc) {

        var result = { flag: true, text: "" };
        var spaceRentalType = getPropertyByID($scope.spacerentaltypes, ValueMangement.NoneString($scope.doc.SPACERENTALTYPEID));

        if ($scope.lessees.length < 1) {
            return { flag: false, text: "กรุณากรอกรายละเอียดผู้เช่า" };
        }

        if (ValueMangement.NoneString(doc.SPACERENTAL_DOCNO) == "") {
            return { flag: false, text: "กรุณากรอกเลขที่สัญญา" };
        }

        if (ValueMangement.NoneString(doc.SPACERENTALTYPEID) == "") {
            return { flag: false, text: "กรุณาเลือกประเภทการเช่าพื้นที่หน้าร้าน" };
        }
        else {

            if (!ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toUpperCase().includes("XX")) {
                if (ValueMangement.NoneString(req.STORECODE) == "") {
                    return { flag: false, text: "กรุณาเลือกร้านค้า" };
                }
                if (ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toUpperCase().includes("SS")) {
                    if (ValueMangement.NoneString(doc.SPACERENTALSIZEID) == "") {
                        return { flag: false, text: "กรุณาเลือกขนาดพื้นที่เช่า" };
                    }
                }
            }
        }

        if (!(ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toUpperCase().includes("XX") && ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toUpperCase().includes("Y"))) {
            if (ValueMangement.NoneString(doc.SERVICECHARGETYPE) == "") {
                return { flag: false, text: "กรุณาเลือกประเภทค่าบริการ" };
            }
        }

        if (!(ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toUpperCase().includes("XX") && ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toUpperCase().includes("Y"))) {
            if (ValueMangement.NoneString(doc.SERVICECHARGEAMOUNT) == "") {
                return { flag: false, text: "กรุณากรอกค่าบริการ" };
            }
        }

        if (!(ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toUpperCase().includes("XX") && ValueMangement.NoneString(spaceRentalType.PROPERTYNAME).toUpperCase().includes("Y"))) {
            if (ValueMangement.NoneString(doc.SERVICECHARGETAXFLAG) == "") {
                return { flag: false, text: "กรุณาเลือกว่าค่าบริการรวมภาษีหรือไม่" }
            }
        }

        if (ValueMangement.NoneString(doc.HOUSEANDLANDTAXID) == "") {
            return { flag: false, text: "กรุณาเลือกผู้รับภาระภาษีโรงเรือนและที่ดิน" };
        }

        if (ValueMangement.NoneString(doc.BOARDTAXID) == "") {
            return { flag: false, text: "กรุณาเลือกผู้รับภาระภาษีป้าย" };
        }

        if (ValueMangement.NoneString(doc.RENTALNUMBER) == "") {
            return { flag: false, text: "กรุณาใส่จำนวนระยะเวลาการเช่า" };
        }

        if (ValueMangement.NoneString(doc.RENTALUNIT) == "") {
            return { flag: false, text: "กรุณาเลือกหน่วยระยะเวลาการเช่า" };
        }

        if (ValueMangement.DateTime($("#DOC_CREATEDATE").val()) == "") {
            return { flag: false, text: "กรุณากรอกวันที่ทำสัญญา" };
        }

        if (ValueMangement.DateTime($("#DOC_EFFECTIVEDATE").val()) == "") {
            return { flag: false, text: "กรุณากรอกวันที่เริ่มสัญญา" };
        }

        if (ValueMangement.DateTime($("#DOC_EXPIREDATE").val()) == "") {
            return { flag: false, text: "กรุณากรอกวันที่สิ้นสุดสัญญา" };
        }

        if (ValueMangement.NoneString($("#PAYMENTOUTWITHINDATE").val()) == "") {
            return { flag: false, text: "กรุณาเลือกวันที่กำหนดเก็บค่าบริการในแต่ละเดือน" };
        }

        if (ValueMangement.NoneString(doc.CANCELINFODATE) == "") {
            return { flag: false, text: "กรุณากรอกจำนวนวันที่ต้องแจ้งล่วงหน้า กรณียกเลิกสัญญา" };
        }

        if (ValueMangement.NoneString(req.NOTICENUMBER_EXPIRE) == "" ||
            ValueMangement.NoneString(req.NOTICEUNIT_EXPIRE) == "") {
            return { flag: false, text: "กรุณาตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }

        for (var i = 0; i < $scope.lessees.length; i++) {
            if (ValueMangement.NoneString($('input[name=vendorFlag-' + $scope.lessees[i] + ']:checked').val()) == "") {
                result = { flag: false, text: "กรุณาเลือกประเภทผู้เช่า" };
                break;
            }
            else {
                if (ValueMangement.NoneString($('#bank' + $scope.lessees[i]).val()) == "" && $('#vendorName' + $scope.lessees[i]).val() == "") {
                    result = { flag: false, text: "กรุณากรอกชื่อผู้เช่า" };
                    break;
                }
            }
            if (ValueMangement.NoneString($('#type' + $scope.lessees[i]).val()) == "") {
                result = { flag: false, text: "กรุณาเลือกลักษณะผู้เช่า" };
                break;
            }

        }

        if ($("#spaceRentalFile")[0].files[0] == undefined) {
            var chkLicenseFile = false;
            for (var i = 0; i < $scope.files.length; i++) {
                if ($scope.files[i].DOCFILETYPE == "หนังสือสัญญาเช่าพื้นที่หน้าร้าน" && $scope.files[i].REQID == req.REQID || (req.REVISIONTYPE == '4')) {
                    chkLicenseFile = true;
                    break;
                }
            }
            if (!chkLicenseFile) {
                return { flag: false, text: "กรุณาแนบไฟล์หนังสือสัญญาเช่าพื้นที่หน้าร้าน" };
            }
        }
        
        if (req.REVISIONTYPE == '3') {
            if (ValueMangement.NoneString($("#DOC_CANCELDATE").val()) == "") {
                return { flag: false, text: "กรุณากรอกวันหมดอายุ" };
            }

            if (ValueMangement.NoneString($('input:radio[name="DOC_INSURANCEREFUNDFLAG"]:checked').val()) == "") {
                return { flag: false, text: "กรุณาเลือกรายละเอียดการคืนเงินประกัน" };
            }


            if (ValueMangement.NoneString(req.REMARKS) == "") {
                return { flag: false, text: "กรุณากรอกหมายเหตุการขอยกเลิก" };
            }
        }

        //for (var i = 0; i < $scope.persons.length; i++) {
        //    if ($('#name' + $scope.persons[i]).text() == "") {
        //        result = { flag: false, text: "กรุณากรอกชื่อผู้รับเงิน" };
        //        break;
        //    }

        //    if (ValueMangement.NoneString($('#bank' + $scope.persons[i]).val()) == "") {
        //        result = { flag: false, text: "กรุณาเลือกธนาคาร" };
        //        break;
        //    }

        //    if ($('#branch' + $scope.persons[i]).val() == "") {
        //        result = { flag: false, text: "กรุณากรอกสาขา" };
        //        break;
        //    }

        //    if ($('#book' + $scope.persons[i]).val() == "") {
        //        result = { flag: false, text: "กรุณากรอกเลขบัญชี" };
        //        break;
        //    }
        //}

        //for (var i = 0; i < $scope.persons.length; i++) {
        //    if (regex.text.test($('#name' + $scope.persons[i]).val()) == "") {
        //        console.log(regex.text.test($('#name' + $scope.persons[i]).val()));
        //        result = { flag: false, text: "กรุณากรอกชื่อผู้รับเงิน" };
        //        break;
        //    }

        //    if (regex.text.test($('#branch' + $scope.persons[i]).val()) == "") {
        //        result = { flag: false, text: "กรุณากรอกสาขา" };
        //        break;
        //    }

        //    if (regex.bookbank.test($('#book' + $scope.persons[i]).val()) == "") {
        //        result = { flag: false, text: "กรุณากรอกเลขบัญชี" };
        //        break;
        //    }

        //    if ($('#bank' + $scope.persons[i]).val() == "") {
        //        result = { flag: false, text: "กรุณาเลือกธนาคาร" };
        //        break;
        //    }
        //}

        if (ValueMangement.NoneString(req.NOTICENUMBER_EXPIRE) == "") {
            result = { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }
        if (ValueMangement.NoneString(req.NOTICEUNIT_EXPIRE) == "") {
            result = { flag: false, text: "กรุณากรอกตั้งค่าการแจ้งเตือนล่วงหน้า" };
        }

        return result;

    }

    function downloadDocumentFromServer(file, store, doctype) {
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

        function errorCallback(response) {

        }
    }

    function upLoadFile(reqno) {
        if ($("#spaceRentalFile")[0].files[0] != undefined) {
            document.getElementById("spaceRentalFileprogress").setAttribute("style", "display:");
            var spaceRentalUpload = new spaceRentalFile($("#spaceRentalFile")[0].files[0]);
            spaceRentalUpload.doUpload(reqno);
        }
        else {
            spaceRentalFiles = 1;
        }

        if ($("#otherFile")[0].files[0] != undefined) {
            document.getElementById("otherFileprogress").setAttribute("style", "display:");
            var otherUpload = new otherFile($("#otherFile")[0].files);
            otherUpload.doUpload(reqno);
        }
        else {
            otherFiles = 1;
        }

        if ($scope.req.REQUESTSTATUS == 1 && spaceRentalFiles == 1 && otherFiles == 1) {
            $window.location.assign('../REQUEST/REQ_1200');
        }
        else if ($scope.req.REQUESTSTATUS == 2 && spaceRentalFiles == 1 && otherFiles == 1) {
            $window.location.assign('../SEARCH/SEARCH_300');
        }
    }

    function toDate(dateStr) {
        var parts = dateStr.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    var spaceRentalFile = function (file) {
        this.file = file;
    };
    spaceRentalFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.name);
        formData.append("upload_file", true);

        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + "Non-Store" + "&doctype=" + constants.spaceRentalFile + "&reqno=" + reqno + "&filetype=" + "spaceRental",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                spaceRentalFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && spaceRentalFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../REQUEST/REQ_1200');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && spaceRentalFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_300');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    spaceRentalFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#spaceRentalFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    var otherFile = function (file) {
        this.file = file;
    };
    otherFile.prototype.doUpload = function (reqno) {
        var that = this;
        var formData = new FormData();

        for (var i = 0; i < this.file.length; i++) {
            //add assoc key values, this will be posts values.file

            formData.append("file" + i, this.file[i], this.file[i].name);
            formData.append("upload_file" + i, true);
        }


        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');

        $.ajax({
            type: "POST",
            cache: false,
            url: config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + "Non-Store" + "&doctype=" + constants.spaceRentalFile + "&reqno=" + reqno + "&filetype=" + "other",
            contentType: false,
            processData: false,
            data: formData,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            async: true,
            success: function (result) {
                otherFiles = 1;
                if ($scope.req.REQUESTSTATUS == 1 && spaceRentalFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../REQUEST/REQ_1200');
                }
                else if ($scope.req.REQUESTSTATUS == 2 && spaceRentalFiles == 1 && otherFiles == 1) {
                    $window.location.assign('../SEARCH/SEARCH_300');
                }
                //insertintoDB();
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    Notification.notiFail(err);
            }
        });
    };
    otherFile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#otherFileprogress";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };
})

.controller('REQ_1300_Ctrl', function ($scope, $timeout, $window, constants, Loading, Notification, ValueMangement, Table, Dropdownlist, DatePicker, StoreAPI, PropertyAPI, UserAPI, SearchAPI, DocumentAPI) {

    var serchsession = JSON.parse(sessionStorage.getItem(window.location.pathname));

    Loading.showLoad();

    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    $scope.search = serchsession == null ? {} : serchsession;

    $scope.getRequestByProperty = getRequestByProperty;

    $scope.stringToDate = stringToDate;

    $scope.viewDetail = viewDetail;

    $scope.confirmDeleteDraft = confirmDeleteDraft;

    init();

    angular.element(document).ready(domReady);


    ////////////===============================================================================

    function getRequestByProperty(search) {

        sessionStorage.setItem(window.location.pathname, JSON.stringify(search));

        Loading.showLoad();

        var data = angular.copy(search || {});
        data.PAGE = ValueMangement.getMenu(window.location.pathname);
        data.DOCTYPEID = 4;     // vehicle rental only
        data.REQUESTSTATUS = -1;
        data.USERVERIFYID = data.USERVERIFYID || -1;
        data.USERREQUESTID = userSession.USER.USERID;

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
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORNAME'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLETYPE'),
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
            $scope.lessorNames = dataarray[idx++][0] || [];
            $scope.vehicleRentalTypes = dataarray[idx++][0] || [];
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
        $window.location.assign('REQ_1310');
    }

    function confirmDeleteDraft(row) {

        bootbox.dialog({
            message: "<span class='bigger-110'>คุณต้องการลบแบบร่าง " + row.REQID + " ใช่หรือไม่ ?</span>",
            data: row,
            buttons:
                {
                    "delete":
                        {
                            "label": "ใช่",
                            "className": "btn-sm btn-danger",
                            "callback": confirmedDeleteDraftCallBack
                        },
                    "cancel":
                        {
                            "label": "ไม่",
                            "className": "btn-sm"
                        }
                }
        });

        ////////////===============================================================================

        function confirmedDeleteDraftCallBack() {
            deleteDraft(row);
        }
    }

    function deleteDraft(data) {
        Loading.showLoad();

        DocumentAPI.deleteDraftDocument(data)
            .then(handleMsgResponse)
            //.then(getRequestByProperty)
            .always(cleanup);
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

        getRequestByProperty($scope.search);
        Notification.notiSuccess(response.MSGTEXT);
        angular.element('#modal-table').modal('hide');
    }

    function cleanup() {
        Loading.hideLoad();
    }

})

.controller('REQ_1310_Ctrl', function ($scope, $timeout, $window, $http, constants, regex, config, Loading, Notification, ValueMangement, Dropdownlist, FileInput, TextArea, DatePicker, Spinner, RequestAPI, StoreAPI, PropertyAPI, TaxTypeAPI, DocumentAPI, UserAPI, FileAttachmentAPI) {

    Loading.showLoad();

    /* The REQ_1310_Ctrl(Variable Controller) sign at 08/03/2018 */
    var userSession = JSON.parse(sessionStorage.getItem(constants.usersession));

    // scope functions
    $scope.addAssetDetail = addAssetDetail;
    $scope.deleteAssetDetail = deleteAssetDetail
    $scope.updateVehicleTypeInfo = updateVehicleTypeInfo;
    $scope.saveDraft = saveDraft;
    $scope.submitDocument = submitDocument;
    $scope.getUserProperty = getUserProperty;
    $scope.downloadDocumentFromServer = downloadDocumentFromServer;

    // constants
    $scope.regex = {
        //bankBranch: /^[A-Za-z ก-๙]+$/,
        bankAccount: /^[\d\-]+$/
    };
    $scope.forkliftId = 3; // used for controlling UI elements

    $scope.validateAmountNumber = function ($event) {
        var value = ValueMangement.NoneString($event.target.value);
        var decision = value.split(".");
        var nPoint = (value.match(new RegExp("\\.", "g")) || []).length;
        if (isNaN(String.fromCharCode($event.keyCode)) && (String.fromCharCode($event.keyCode)) != '.') {
            $event.preventDefault();
        }
        if (decision.length > 1) {
            if ((String.fromCharCode($event.keyCode)) == '.') {
                $event.preventDefault();
            }
            if ($event.target.selectionStart > value.indexOf('.')) {
                if (decision[1].length >= 4) {
                    $event.preventDefault();
                }
            }

        }
    }

    $scope.currencyAmountNumber = function (value) {
        return currency(value);
    }

    function currency(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }

    angular.element(document).ready(domReady);

    initModel();

    ////////////===============================================================================

    function addAssetDetail() {
        var assetInfos = $scope.model.DOCUMENT_VEHICLERENTAL.ASSETINFOS;
        var lastAssetInfo = assetInfos[assetInfos.length - 1];

        // copy values from previous asset
        $scope.model.DOCUMENT_VEHICLERENTAL.ASSETINFOS.push({
            MODEL: lastAssetInfo.MODEL,
            ENGINE_SIZE: lastAssetInfo.ENGINE_SIZE,
            VEHICLE_COLOR_ID: lastAssetInfo.VEHICLE_COLOR_ID,
            VEHICLE_SEATTYPE_ID: lastAssetInfo.VEHICLE_SEATTYPE_ID,

            RENTALNUMBER: lastAssetInfo.RENTALNUMBER,
            RENTALUNIT: lastAssetInfo.RENTALUNIT,
            BCRENTAL_EFFECTIVEDATE: lastAssetInfo.BCRENTAL_EFFECTIVEDATE,
            BCRENTAL_EXPIREDATE: lastAssetInfo.BCRENTAL_EXPIREDATE,

            RENTAMOUNT: lastAssetInfo.RENTAMOUNT,
            RENTTAXFLAG: lastAssetInfo.RENTTAXFLAG,
            INSURANCECHARGEAMOUNT: lastAssetInfo.INSURANCECHARGEAMOUNT
        });

        // update controls style
        $timeout(updateControlsTimeout);
    }

    function deleteAssetDetail(index) {
        $scope.model.DOCUMENT_VEHICLERENTAL.ASSETINFOS.splice(index, 1);
    }

    function updateVehicleTypeInfo() {
        Loading.showLoad();

        $scope.model.DOCUMENT_VEHICLERENTAL = $scope.model.DOCUMENT_VEHICLERENTAL || {};
        $scope.model.DOCUMENT_VEHICLERENTAL.LESSORNAME = ($scope.tmplessorName || {}).PROPERTYID;
        $scope.model.DOCUMENT_VEHICLERENTAL.VEHICLERENTALTYPEID = ($scope.tmpVehicleType || {}).PROPERTYID;
        $scope.model.DOCUMENT_VEHICLERENTAL.ASSETINFOS = [{}];

        $timeout(updateControlsTimeout);
    }

    function getUserProperty(asset, id) {
        var user = getUserByUserID($scope.drivers, id) || { USERID: 0 };

        Loading.showLoad();
        UserAPI.getUserPropertyByUser(user, sessionStorage.getItem(constants.culture))
            .then(handleDriverReponse)
            .always(cleanup);

        function handleDriverReponse(response) {
            $scope.$apply(updateDriver);

            function updateDriver() {
                var department = getPropertyByType(response, "แผนก") || {};
                asset.COSTCENTER = ValueMangement.NoneString(department.PROPERTYNAME);
                asset.DEPARTMENT = ValueMangement.NoneString(department.PROPERTYDESC_TH);

                var position = getPropertyByType(response, "ตำแหน่ง") || {};
                asset.POSITION = ValueMangement.NoneString(position.PROPERTYDESC_TH);
            }
        }

        function getUserByUserID(users, id) {
            if (users == undefined || id == undefined) {
                return { USERID: 0 };
            }
            return users.find(filterProperty);

            function filterProperty(element) {
                return element.USERID == id;
            }
        }

    }

    function cleanup() {
        Loading.hideLoad();
    }

    function getPropertyByID(propertys, id) {
        if (propertys == undefined || id == undefined) {
            return {};
        }
        return propertys.find(filterProperty);

        function filterProperty(element) {
            return element.PROPERTYID == id;
        }
    }

    function getPropertyByType(propertys, type) {
        if (propertys == undefined || type == undefined) {
            return {};
        }
        return propertys.find(filterProperty);

        function filterProperty(element) {
            return element.PROPERTYTYPE == type;
        }
    }

    function saveDraft() {

        $scope.model.REQUEST.REQUESTSTATUS = 1;

        clearSessionSearch(userSession);

        processFormSubmission(1, validateDraftModelFunc);

        //////////////===============================================================================

        function validateDraftModelFunc() {

            var form = $scope.pageForm;

            // lessor name
            //if (form.lessorName.$invalid) {
            //    return {
            //        flag: false,
            //        text: form.lessorName.$$element.data().errorRequired
            //    }
            //}

            // vehicle type
            //if (form.vehicleType.$invalid) {
            //    return {
            //        flag: false,
            //        text: form.vehicleType.$$element.data().errorRequired
            //    }
            //}

            return {
                flag: true,
                text: ''
            };
        }
    }

    function submitDocument() {
        
        $scope.model.REQUEST.REQUESTSTATUS = 2;

        clearSessionSearch(userSession);

        processFormSubmission(2, validateModelFunc);

        //////////////===============================================================================

        function validateModelFunc() {
            var form = $scope.pageForm;

            if (!checkReceive($scope.model.RECEIVEPERSONINFO)) {
                return {
                    flag: false,
                    text: "กรุณากรอกรายละเอียดผู้รับเงินให้ถูกต้องครบถ้วน"
                }
            }

            if (form.$valid) {
                // validate file input
                var aceFiles = angular.element('#vehicleRentalFile').data('ace_input_files');
                if (!aceFiles || !aceFiles.length) {

                    if ($scope.model.REQUEST.REVISIONTYPE != 4) {

                        if (!chkFile()) {
                            return {
                                flag: false,
                                text: 'เลือกไฟล์หนังสือสัญญาเช่ารถ'
                            };
                        }

                    }
                    
                }

                if ($scope.model.REQUEST.REVISIONTYPE == 3) {
                    if (ValueMangement.DateTime($scope.model.REQUEST.BCDOC_CANCELDATE) == '') {
                        return {
                            flag: false,
                            text: 'กรุณาเลือกกำหนดการยกเลิกเอกสาร'
                        }
                    }
                    else if (ValueMangement.NoneString($scope.model.REQUEST.REMARKS) == '') {
                        return {
                            flag: false,
                            text: 'กรุณกรอกหมายเหตุ'
                        }
                    }
                }

                if ($scope.model.REQUEST.REVISIONTYPE == 2) {
                    if (!chkEditAsset()) {
                        return {
                            flag: false,
                            text: 'กรุณาเลือกกำหนดการยกเลิกวันเช่ารถ'
                        }
                    }
                }

                return {
                    flag: true,
                    text: ''
                };
            }

            // get first invalid element message
            var invalidEls = angular.element('.ng-invalid:enabled');
            var requiredEls = invalidEls.filter('.ng-invalid-required:first');
            var patternEls = invalidEls.filter('.ng-invalid-pattern:first');

            var msg = requiredEls.data('errorRequired') || patternEls.data('errorPattern');
            return {
                flag: false,
                text: msg
            };

            function chkFile() {
                for (var i = 0; i < $scope.files.length; i++) {
                    if ($scope.files[i].DOCFILETYPE == "เอกสารสัญญาเช่ารถ" && $scope.files[i].REQID == $scope.model.REQUEST.REQID) {
                        return true;
                    }
                }

                return false;
            }

            function chkEditAsset() {
                for (var i = 0; i < $scope.model.DOCUMENT_VEHICLERENTAL.ASSETINFOS.length; i++) {
                    if (ValueMangement.DateTime($scope.model.DOCUMENT_VEHICLERENTAL.ASSETINFOS[i].BCRENTAL_CANCELDATE) != "") {
                        return true;
                    }
                }

                return false;
            }

            function checkReceive(value) {
                if (value == undefined) {
                    return true;
                }

                if (ValueMangement.NoneString(value.RECEIVEPERSONNAME) != "" &&
                    ValueMangement.NoneString(value.BANKID) != "" &&
                    ValueMangement.NoneString(value.BANKBRANCHNAME) != "" &&
                    ValueMangement.NoneString(value.BANKACCOUNTNO) != "") {
                    return true;
                }
                else if (ValueMangement.NoneString(value.RECEIVEPERSONNAME) == "" &&
                    ValueMangement.NoneString(value.BANKID) == "" &&
                    ValueMangement.NoneString(value.BANKBRANCHNAME) == "" &&
                    ValueMangement.NoneString(value.BANKACCOUNTNO) == "") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }

    function processFormSubmission(reqStatus, validateFunc) {
        // prepare data
        var postModel = angular.copy($scope.model);

        // set request status flag
        postModel.REQUEST.REQUESTSTATUS = reqStatus;

        // convert all dates
        postModel.DOCUMENT_VEHICLERENTAL.ASSETINFOS.forEach(convertAssetInfosDates);
        postModel.REQUEST.DOC_CREATEDATE = ValueMangement.DateTime(postModel.REQUEST.BCDOC_CREATEDATE);
        postModel.REQUEST.DOC_CANCELDATE = ValueMangement.DateTime(postModel.REQUEST.BCDOC_CANCELDATE);

        // Inputs validation
        var validateResult = validateFunc();
        if (!validateResult.flag) {
            Notification.notiWarn(validateResult.text);
            return false;
        }
        // post data to back-end

        Loading.showLoad();

        DocumentAPI.updateDocumentVehicleRental(postModel)
            .then(handleInsertDocumentPost)
            .then(uploadVehicleRentalDocument)
            .then(uploadOtherFilesDocument)
            .then(successRedirect)
            .fail(handleFail)
            .always(handleCleanup);

        ////////////===============================================================================

        function handleInsertDocumentPost(response) {
            if (response.MSGSTATUS !== 0) {
                return angular.element.Deferred().reject(response);
            }

            response.REQID = response.MSGTEXT; // save reqId
            response.MSGTEXT = "สำเร็จ";

            var session = $window.sessionStorage;
            session.APPROVE_DOCUMENT_VEHICLERENTAL = response;
            sessionStorage.setItem("alert", JSON.stringify(response));

            Loading.hideLoad();

            return response;
        }

        function uploadVehicleRentalDocument(response) {
            var aceFiles = angular.element('#vehicleRentalFile').data('ace_input_files');
            if (!aceFiles || !aceFiles.length) {
                // vehicle rental file not selected
                $scope.vehicleRentalFile = 1;
                return response;
            }

            $scope.vehicleRentalFile = 0;

            // vehicle rental file
            var reqId = response.REQID;

            var url = config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + 'vehicleRentalDir' + "&doctype=" + "เอกสารสัญญาเช่ารถ" + "&reqno=" + reqId + "&filetype=" + "vehicleRental";

            var formData = new FormData();

            var file = aceFiles[0];

            formData.append('file', file, file.name);
            formData.append('upload_file', true);

            var progressBarEl = angular.element('#vehicleRentalFileProgress');

            return postFilesToServer(url, formData, progressBarEl, "vehicleRentalFile");
        }

        function uploadOtherFilesDocument(response) {
            var aceFiles = angular.element('#otherFiles').data('ace_input_files');
            if (!aceFiles || !aceFiles.length) {
                // other files not selected
                $scope.otherFiles = 1;
                return response;
            }

            $scope.otherFiles = 0;

            // other files
            var resp = response[0] || response;
            var reqId = resp.REQID;

            var url = config.apiUrl + "FileTranferAPI/uploadDocumentToServer?store=" + 'vehicleRentalDir' + "&doctype=" + "เอกสารสัญญาเช่ารถ" + "&reqno=" + reqId + "&filetype=" + "other";

            var formData = new FormData();

            for (var i = 0; i < aceFiles.length; ++i) {
                var file = aceFiles[i];
                formData.append('file' + i, file, file.name);
                formData.append('upload_file' + i, true);
            }

            var progressBarEl = angular.element('#otherFilesProgress');

            return postFilesToServer(url, formData, progressBarEl, "otherFiles");
        }

        ////////////===============================================================================

        function postFilesToServer(url, formData, progressBarEl, fileType) {
            // reset progress bar
            var percent = 0;
            progressBarEl.find('.progress-bar').css('width', +percent + '%');
            progressBarEl.find('.status').text(percent + '%');
            progressBarEl.show();

            return angular.element.ajax({
                type: "POST",
                cache: false,
                url: url,
                contentType: false,
                processData: false,
                data: formData,
                xhr: handleAjaxXhr,
                async: true
            });

            ////////////===============================================================================

            function handleAjaxXhr() {
                var myXhr = angular.element.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', progressHandling, false);
                }
                return myXhr;
            }

            function progressHandling(event) {
                var percent = 0;
                var position = event.loaded || event.position;
                var total = event.total;
                if (event.lengthComputable) {
                    percent = Math.ceil(position / total * 100);
                }

                if (percent == 100) {
                    if (fileType == "vehicleRentalFile") {
                        $scope.vehicleRentalFile = 1;
                    }
                    else if (fileType == "otherFiles") {
                        $scope.otherFiles = 1;
                    }
                }
                // update progressbars classes so it fits your code
                progressBarEl.find('.progress-bar').css('width', +percent + '%');
                progressBarEl.find('.status').text(percent + '%');
            }
        }

        function handleFail(response) {
            Notification.notiFail(response.MSGTEXT);
        }

        function successRedirect() {
            if ($scope.vehicleRentalFile !== 1 || $scope.otherFiles !== 1) {
                return false;
            }

            switch ($scope.model.REQUEST.REQUESTSTATUS) {

                // submit success
                case 2:
                    $window.location.assign('../SEARCH/SEARCH_400');
                    break;

                // save draft success
                case 1:
                default:
                    $window.location.assign('../REQUEST/REQ_1300');
                    break;
            }
        }

        function handleCleanup() {
            Loading.hideLoad();
        }

        // Convert date format strings
        function convertAssetInfosDates(assetDetail) {
            assetDetail.RENTAL_CANCELDATE = ValueMangement.DateTime(assetDetail.BCRENTAL_CANCELDATE);
            assetDetail.RENTAL_EFFECTIVEDATE = ValueMangement.DateTime(assetDetail.BCRENTAL_EFFECTIVEDATE);
            assetDetail.RENTAL_EXPIREDATE = ValueMangement.DateTime(assetDetail.BCRENTAL_EXPIREDATE);

            assetDetail.INSURANCE_EFFECTIVEDATE = ValueMangement.DateTime(assetDetail.BCINSURANCE_EFFECTIVEDATE);
            assetDetail.INSURANCE_EXPIREDATE = ValueMangement.DateTime(assetDetail.BCINSURANCE_EXPIREDATE);
            assetDetail.CARACT_EFFECTIVEDATE = ValueMangement.DateTime(assetDetail.BCCARACT_EFFECTIVEDATE);
            assetDetail.CARACT_EXPIREDATE = ValueMangement.DateTime(assetDetail.BCCARACT_EXPIREDATE);
            assetDetail.VEHICLETAX_EFFECTIVEDATE = ValueMangement.DateTime(assetDetail.BCVEHICLETAX_EFFECTIVEDATE);
            assetDetail.VEHICLETAX_EXPIREDATE = ValueMangement.DateTime(assetDetail.BCVEHICLETAX_EXPIREDATE);

            assetDetail.ENGINE_SIZE = ValueMangement.NoneString(assetDetail.ENGINE_SIZE).toString().replace(/,/g, '');
            assetDetail.RENTAMOUNT = ValueMangement.NoneString(assetDetail.RENTAMOUNT).toString().replace(/,/g, '');
            assetDetail.INSURANCECHARGEAMOUNT = ValueMangement.NoneString(assetDetail.INSURANCECHARGEAMOUNT).toString().replace(/,/g, '');
            assetDetail.FLEETCARDBUDGET = ValueMangement.NoneString(assetDetail.FLEETCARDBUDGET).toString().replace(/,/g, '');
        }
    }

    function downloadDocumentFromServer(file, store, doctype) {
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

        function errorCallback(response) {

        }
    }

    function initModel() {
        // ref: http://www.jstips.co/en/javascript/create-range-0...n-easily-using-one-line/
        $scope.monthDates = Array.apply(null, { length: 31 }).map(Function.call, Number).slice(1);
    }

    function domReady() {

        initControls();

        FileInput.single();
        FileInput.multi();
    }

    function initControls() {

        var request = {
            REQUEST: {
                REQID: $window.sessionStorage.REQID,
                DOCTYPEID: $window.sessionStorage.DOCTYPEID
            }
        };

        // use $.when to join promises
        angular.element.when(
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLLESSORNAME'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLETYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLECOLOR'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLESEATTYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLVEHICLEPLATETYPE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLPROVINCE'),
            PropertyAPI.getPropertyListByPropertyName('?propname=ZTBLBANK'),
            UserAPI.getUserList(),
            FileAttachmentAPI.getFileAttachmentByRequest(request.REQUEST),
            DocumentAPI.getDocumentDetail(request)
        ).done(handleInitControlsPromises);

        ////////////===============================================================================

        function handleInitControlsPromises() {

            var dataarray = arguments;

            var idx = 0;

            $scope.lessorNames = dataarray[idx++][0] || [];
            $scope.vehicleTypes = dataarray[idx++][0] || [];
            $scope.colors = dataarray[idx++][0] || [];
            $scope.seatTypes = dataarray[idx++][0] || [];
            $scope.vehiclePlateTypes = dataarray[idx++][0] || [];
            $scope.provinces = dataarray[idx++][0] || [];
            $scope.banks = dataarray[idx++][0] || [];
            $scope.drivers = dataarray[idx++][0] || [];
            $scope.files = dataarray[idx++][0] || {};
            $scope.model = dataarray[idx++][0] || {};
            $scope.model.RECEIVEPERSONINFO = $scope.model.DOCUMENT_VEHICLERENTAL.RECEIVEPERSONINFO;
         
            $scope.$apply(function applyUpdateControls() {
                $timeout(updateControlsTimeout);
            });

        }
    }

    function updateControlsTimeout() {
        updateDocument($scope.model);

        Dropdownlist.chnageUI('41.66%');
        DatePicker.datePicker('#content');
        TextArea.inputLimit();

        Loading.hideLoad();

    }

    function updateDocument(model) {

        for (var i = 0; i < model.DOCUMENT_VEHICLERENTAL.ASSETINFOS.length; i++) {
            var engineSize = ValueMangement.NoneString(model.DOCUMENT_VEHICLERENTAL.ASSETINFOS[i].ENGINE_SIZE);
            model.DOCUMENT_VEHICLERENTAL.ASSETINFOS[i].ENGINE_SIZE = $scope.currencyAmountNumber(engineSize);

            var rentAmount = ValueMangement.NoneString(model.DOCUMENT_VEHICLERENTAL.ASSETINFOS[i].RENTAMOUNT);
            model.DOCUMENT_VEHICLERENTAL.ASSETINFOS[i].RENTAMOUNT = $scope.currencyAmountNumber(rentAmount);

            var insuranceChargeAmount = ValueMangement.NoneString(model.DOCUMENT_VEHICLERENTAL.ASSETINFOS[i].INSURANCECHARGEAMOUNT);
            model.DOCUMENT_VEHICLERENTAL.ASSETINFOS[i].INSURANCECHARGEAMOUNT = $scope.currencyAmountNumber(insuranceChargeAmount);

            var fleetCardBudget = ValueMangement.NoneString(model.DOCUMENT_VEHICLERENTAL.ASSETINFOS[i].FLEETCARDBUDGET);
            model.DOCUMENT_VEHICLERENTAL.ASSETINFOS[i].FLEETCARDBUDGET = $scope.currencyAmountNumber(fleetCardBudget);
        }
    }
})