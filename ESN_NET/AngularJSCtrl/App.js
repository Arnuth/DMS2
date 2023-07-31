angular.module('Application', ['Application.Bundle', 'Application.WebAPI', 'Application.AccountCtrl', 'Application.MasterCtrl', 'Application.SystemCtrl', 'Application.UserCtrl', 'Application.RequestCtrl', 'Application.ReportCtrl', 'Application.SearchCtrl', 'Application.ApproveCtrl', 'Application.AlertCtrl'])

.constant('config', {
    apiUrl: 'http://localhost:5308/api/' ,//'http://' + window.location.hostname + ":8008/api/",
    reportUrl: 'http://localhost:5308/'
})

.constant('constants', {
    usersession: 'AccountSession',
    usercookie: 'AccountCookie',
    culture: 'CultureSession',
    sessionUrl: 'UrlSession',
    landleaseFile: "เอกสารสัญญาเช่า",
    licenseFile: "ใบอนุญาต",
    spaceRentalFile: "เอกสารสัญญาเช่าพื้นที่หน้าร้าน",
    vihecleFile: "เอกสารสัญญาเช่ารถ"
})
    
.constant('regex', {
    text: /^[A-Za-z ก-๙0-9() \-]+$/,
    number: /^[0-9]/,
    bookbank: /^[0-9.\- ]/
})

.constant('language', {
    cancel: ["Cancel", "ยกเลิก"],
    delete: ["Delete", "ลบ"],
    active: ["active", "เปิดการใช้งาน"],
    inactive: ["inactive", "ปิดการใช้งาน"],
    addUserClass: ["Add User Class.", "เพิ่มประเภทผู้ใช้ระบบ"],
    editUserClass: ["Do you want to edit User Class?", "แก้ไขประเภทผู้ใช้ระบบ"],
    deleteUserClass: ["Do you want to delete User Class?", "ลบประเภทผู้ใช้ระบบ"],
    fillInformation: ["Please fill Information.", "กรุณากรอกข้อมูล"],
    fillUsername: ["Please fill Username.", "กรุณากรอกชื่อผู้ใช้ระบบ"],
    fillPassword: ["Please fill Password.", "กรุณากรอกรหัสผ่าน"],
    fillEmail: ["Please fill Email.", "กรุณากรอกอีเมลล์"],
    fillName: ["Please fill Name.", "กรุณากรอกชื่อ"],
    fillSurname: ["Please fill Surname.", "กรุณากรอกนามสกุล"],
    correctPassword: ["Please fill same password.", "กรุณากรอกรหัสผ่านให้เหมือนกัน"],
    validatePropertyTopicNameEN: ["Property description EN must length > 2", "รายละเอียดคุณสมบัติ(EN)ต้องมีความยาวมากว่า 2 อักขระ"],
    validatePropertyTopicNameTH: ["Property description TH must length > 2", "รายละเอียดคุณสมบัติ(TH)ต้องมีความยาวมากว่า 2 อักขระ"],
    validatePropertyTopic: ["Property name must length > 2", "ชื่อคุณสมบัติต้องมีความยาวมากว่า 2 อักขระ"],
    validateSubPropertyName: ["Sub Property name must length > 2", "ชื่อคุณสมบัติย่อยต้องมีความยาวมากว่า 2 อักขระ"],
    validateSubPropertyTopicNameEN: ["Sub Property description EN must length > 2", "รายละเอียดคุณสมบัติย่อย(EN)ต้องมีความยาวมากว่า 2 อักขระ"],
    validateSubPropertyTopicNameTH: ["Sub Property description TH must length > 2", "รายละเอียดคุณสมบัติย่อย(TH)ต้องมีความยาวมากว่า 2 อักขระ"],
    deleteSubProperty: ["Do you want to delete Sub Property", "คุณต้องการลบคุณสมบัติย่อย"],
    fillCostCenter: ["Please fill Cost Center.", "กรุณากรอก Cost Center"],
    fillStoreCode: ["Please fill Store Code.", "กรุณากรอกรหัสสาขา"],
    fillStoreNameTH: ["Please fill Store Name TH.", "กรุณากรอกชื่อสาขา (TH)"],
    fillAgreementDocNo: ["Please fill Agreement Doc No.", "กรุณากรอก Agreement Doc No"],
    fillLicenseDocNo: ["Please fill License Doc No.", "กรุณากรอก License Doc No"],
    selectProvince: ["Please select Province.", "กรุณาเลือกจังหวัด"],
    selectStatus: ["Please select Status.", "กรุณาเลือกสถานะ"]
})

.directive('focusme', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            $timeout(function () {
                element[0].focus();
            });
        }
    };
})

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };

})

.directive('formatDate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, modelCtrl) {
            modelCtrl.$formatters.push(function (modelValue) {
                if (modelValue) {
                    return new Date(modelValue);
                }
                else {
                    return null;
                }
            });
        }
    };
})

.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9.]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})

.directive('price', [function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            attrs.$set('ngTrim', "false");

            var formatter = function (str, isNum) {
                str = String(Number(str || 0) / (isNum ? 1 : 100));
                str = (str == '0' ? '0.0' : str).split('.');
                str[1] = str[1] || '0';
                return str[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '.' + (str[1].length == 1 ? str[1] + '0' : str[1]);
            }
            var updateView = function (val) {
                scope.$applyAsync(function () {
                    ngModel.$setViewValue(val || '');
                    ngModel.$render();
                });
            }
            var parseNumber = function (val) {
                var modelString = formatter(ngModel.$modelValue, true);
                var sign = {
                    pos: /[+]/.test(val),
                    neg: /[-]/.test(val)
                }
                sign.has = sign.pos || sign.neg;
                sign.both = sign.pos && sign.neg;

                if (!val || sign.has && val.length == 1 || ngModel.$modelValue && Number(val) === 0) {
                    var newVal = (!val || ngModel.$modelValue && Number() === 0 ? '' : val);
                    if (ngModel.$modelValue !== newVal)
                        updateView(newVal);

                    return '';
                }
                else {
                    var valString = String(val || '');
                    var newSign = (sign.both && ngModel.$modelValue >= 0 || !sign.both && sign.neg ? '-' : '');
                    var newVal = valString.replace(/[^0-9]/g, '');
                    var viewVal = newSign + formatter(angular.copy(newVal));

                    if (modelString !== valString)
                        updateView(viewVal);

                    return (Number(newSign + newVal) / 100) || 0;
                }
            }
            var formatNumber = function (val) {
                if (val) {
                    var str = String(val).split('.');
                    str[1] = str[1] || '0';
                    val = str[0] + '.' + (str[1].length == 1 ? str[1] + '0' : str[1]);
                }
                return parseNumber(val);
            }

            ngModel.$parsers.push(parseNumber);
            ngModel.$formatters.push(formatNumber);
        }
    };
}])

.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
})

.directive('exportToCsv', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var el = element[0];
            element.bind('click', function (e) {
                var table = e.target.nextElementSibling;
                var csvString = '';
                for (var i = 0; i < table.rows.length; i++) {
                    var rowData = table.rows[i].cells;
                    for (var j = 0; j < rowData.length; j++) {
                        csvString = csvString + rowData[j].innerHTML + ",";
                    }
                    csvString = csvString.substring(0, csvString.length - 1);
                    csvString = csvString + "\n";
                }
                csvString = csvString.substring(0, csvString.length - 1);
                var a = $('<a/>', {
                    style: 'display:none',
                    href: 'data:application/octet-stream;base64,' + btoa(csvString),
                    download: 'emailStatistics.csv'
                }).appendTo('body')
                a[0].click()
                a.remove();
            });
        }
    }
})

.directive('tabsSwipable', ['$ionicGesture', function ($ionicGesture) {
    //
    // make ionTabs swipable. leftswipe -> nextTab, rightswipe -> prevTab
    // Usage: just add this as an attribute in the ionTabs tag
    // <ion-tabs tabs-swipable> ... </ion-tabs>
    //
    return {
        restrict: 'A',
        require: 'ionTabs',
        link: function (scope, elm, attrs, tabsCtrl) {
            var onSwipeLeft = function () {
                var target = tabsCtrl.selectedIndex() + 1;
                if (target < tabsCtrl.tabs.length) {
                    scope.$apply(tabsCtrl.select(target));
                }
            };
            var onSwipeRight = function () {
                var target = tabsCtrl.selectedIndex() - 1;
                if (target >= 0) {
                    scope.$apply(tabsCtrl.select(target));
                }
            };

            var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm).on('swiperight', onSwipeRight);
            scope.$on('$destroy', function () {
                $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
                $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
            });
        }
    };
}])

.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
})

.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        // If we want 1 decimal place, we want to mult/div by 10
        // If we want 2 decimal places, we want to mult/div by 100, etc
        // So use the following to create that factor
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0"); // defalue 1
        return Math.floor(input * factor) / factor;
        //return Math.round(input * factor) / factor;
    };
})

.filter('dropDigits', function () {
    return function (floatNum) {
        return String(floatNum)
            .split('.')
            .map(function (d, i) { return i ? d.substr(0, 2) : d; })
            .join('.');
    };
})

.filter('decimalNotRound', function () {
    var originalRound = Math.round;
    return function (number, precision) {
        precision = Math.abs(parseInt(precision)) || 0;
        var multiplier = Math.pow(10, precision);
        return (originalRound(number * multiplier) / multiplier);
    };
})

.filter('text_truncate', function () {
    return function (str) {
        //if (length == null) {
        length = 70;
        //}
        //if (ending == null) {
        ending = '...';
        //}
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    };
});
