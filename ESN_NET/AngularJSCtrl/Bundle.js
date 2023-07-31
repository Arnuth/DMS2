angular.module('Application.Bundle', [])

.factory('Notification', function () {
    return {
        notiFail: function (text) {
            $.gritter.add({
                title: "Fail",
                text: text,
                class_name: 'gritter-error'
            });
        },
        notiWarn: function (text) {
            $.gritter.add({
                title: "Warning",
                text: text,
                class_name: 'gritter-warning'
            });
        },
        notiInfo: function (text) {
            $.gritter.add({ 
                title: "Information",
                text: text,
                class_name: 'gritter-info'
            });
        },
        notiSuccess: function (text) {
            $.gritter.add({
                title: "Success",
                text: text,
                class_name: 'gritter-success'
            });
        },
        notiCenter: function (title, text) {
            $.gritter.add({
                title: title,
                text: text,
                class_name: 'gritter-info gritter-center'
            });
        },
        notiStick: function (title, text) {
            $.gritter.add({
                title: title,
                text: text,
                sticky: true,
                time: '',
                class_name: 'gritter-info'
            });
        },
        notiRemove: function () {
            $.gritter.removeAll();
        }
    };
})

.factory('Loading', function () {
    var loader = document.getElementById("loader");
    var content = document.getElementById("content");

    return {
        showLoad: function () {
            loader.style.display = "";
            content.style.display = "none";
        },
        hideLoad: function () {
            loader.style.display = "none";
            content.style.display = "block";
        }
    };
})

.factory('TextArea', function () {
    return {    
        inputLimit: function () {
            $('textarea.limited').inputlimiter({
                remText: '%n character%s remaining...',
                limitText: 'max allowed : %n.'
            });
        }
    };
})

.factory('DatePicker', function () {
    return {
        clear: dpClear,
        datePicker: dpCreate
    };

    ////////////===============================================================================

    function dpClear(selector) {
        angular.element(selector).datepicker('setDate', null);
    }

    function dpCreate() {

        var today = new Date();

        angular.element('.date-picker')
            .datepicker({
                autoclose: true,
                todayHighlight: true,
                format: "dd/mm/yyyy",
                yearOffset: 543,
                language: "th",
            })
            .next()
            .on(ace.click_event, handleAceClick);

        angular.element('.date-picker-max-today')
            .datepicker({
                autoclose: true,
                todayHighlight: true,
                format: "dd/mm/yyyy",
                yearOffset: 543,
                language: "th",
                endDate: "+0d", 
            })
            .next()
            .on(ace.click_event, handleAceClick);

        angular.element('.date-picker-max-today-3')
            .datepicker({
                autoclose: true,
                changeYear: true,
                todayHighlight: true,
                format: "dd/mm/yyyy",
                yearOffset: 543,
                language: "th",
                startDate: "-3y",
                endDate: "+0d", 
            })
            .next()
            .on(ace.click_event, handleAceClick);

        var date = today.getDate();
        var month = today.getMonth();
        var year = today.getFullYear();

        angular.element('.date-picker-max-year')
            .datepicker({
                autoclose: true,
                todayHighlight: true,
                format: "dd/mm/yyyy",
                yearOffset: 543,
                language: "th-th",
                endDate: "+1y",
            })
            .next()
            .on(ace.click_event, handleAceClick);

        angular.element('.date-picker-max-20')
            .datepicker({
                autoclose: true,
                todayHighlight: true,
                format: "dd/mm/yyyy",
                yearOffset: 543,
                language: "th-th",
                endDate: "+20y",
            })
            .next()
            .on(ace.click_event, handleAceClick);

        angular.element('.date-picker-max-3')
            .datepicker({
                autoclose: true,
                todayHighlight: true,
                format: "dd/mm/yyyy",
                yearOffset: 543,
                language: "th-th",
                startDate: "+0d",
                endDate: "+3y",
            })
            .next()
            .on(ace.click_event, handleAceClick);

        angular.element('.date-picker-max-10y')
            .datepicker({
                autoclose: true,
                todayHighlight: true,
                format: "dd/mm/yyyy",
                yearOffset: 543,
                language: "th-th",
                startDate: "+0d",
                endDate: "+10y"
            })
            .next()
            .on(ace.click_event, handleAceClick);

        angular.element('.date-picker-min-today-max-5y')
            .datepicker({
                autoclose: true,
                todayHighlight: true,
                format: "dd/mm/yyyy",
                yearOffset: 543,
                language: "th-th",
                startDate: "+0d",
                endDate: "+5y"
            })
            .next()
            .on(ace.click_event, handleAceClick);

        ////////////===============================================================================

        //show datepicker when clicking on the icon
        function handleAceClick() {
            angular.element(this).prev().focus();
        }
    }
})

.factory('Tag', function () {
    return {
        tag_input: function () {
            var tag_input = $('.form-field-tags');
            document.getElementsByClassName("tags").width = "41.66%";
            tag_input.tag(
                {
                    placeholder: tag_input.attr('placeholder'),
                    //enable typeahead by specifying the source array
                    //source: ace.vars['US_STATES'],//defined in ace.js >> ace.enable_search_ahead
                    /**
                    //or fetch data from database, fetch those that match "query"
                    source: function(query, process) {
                      $.ajax({url: 'remote_source.php?q='+encodeURIComponent(query)})
                      .done(function(result_items){
                        process(result_items);
                      });
                    }
                    */
                }
            )
        }
    }
})

.factory('Spinner', function () {
    return {
        spinner: function (id) {
            var spinner = $("#" + id).spinner({
                create: function (event, ui) {
                    //add custom classes and icons
                    $(this)
                        .next().addClass('btn btn-success').html('<i class="ace-icon fa fa-plus"></i>')
                        .next().addClass('btn btn-danger').html('<i class="ace-icon fa fa-minus"></i>')

                    //larger buttons on touch devices
                    if ('touchstart' in document.documentElement)
                        $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
                }
            });
        }
    };
    })

.factory('FileInput', function (Notification) {
    return {
        single: function () {
            $('.file_input').ace_file_input({
                no_file: 'No File ...',
                btn_choose: 'Choose',
                btn_change: 'Change',
                onchange: null,
                droppable: true,
                maxSize: 31457280,
                allowExt: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'bmp']
            }).on('file.error.ace', function (ev, info) {
                if (info.error_count['ext'] || info.error_count['mime']) Notification.notiWarn(info.error_list.ext["0"] + " : allow file type in['jpg', 'jpeg', 'png', 'gif', 'pdf', 'bmp'].");
                if (info.error_count['size']) Notification.notiWarn(info.error_list.ext["0"] + ' : invalid file size! Maximum 30 MB.');
            });
        
        },
        multi: function ($scope) {
            $('.file-input-multi').ace_file_input({
                style: 'well',
                btn_choose: 'Drop files here or click to choose',
                btn_change: null,
                no_icon: 'ace-icon fa fa-cloud-upload',
                droppable: true,
                thumbnail: 'small', //large | fit | small
                allowExt: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'bmp'],
                preview_error: function (filename, error_code) {
                    //name of the file that failed
                    //error_code values
                    //1 = 'FILE_LOAD_FAILED',
                    //2 = 'IMAGE_LOAD_FAILED',
                    //3 = 'THUMBNAIL_FAILED'
                    //alert(error_code);
                }
            }).on('file.error.ace', function (ev, info) {
                for (var i = 0; i < info.file_count; i++) {
                    if (info.error_count['ext'] || info.error_count['mime']) Notification.notiWarn(info.error_list.ext[i] + " : allow file type in['jpg', 'jpeg', 'png', 'gif', 'pdf', 'bmp'].");
                    if (info.error_count['size']) Notification.notiWarn(info.error_list.ext[i] + ' : invalid file size! Maximum 30 MB.');
                }
                setTimeout(function () {
                    $scope.$apply(function () {
                        $('.file-input-multi').ace_file_input('reset_input');
                    });
                }, true);
            });;
        }
    };
})

.factory('Table', function () {
    return {
        tableDefault: tableDefault,
        tableWithScroll: tableWithScroll,
        tableWithCheckboxColumn: tableWithCheckboxColumn,
        tableDestroy: tableDestroy
    };

    ////////////===============================================================================

    function tableDefault(table) {
        angular.element(table)
            //.wrap("<div class='dataTables_borderWrap' />")   //if you are applying horizontal scrolling (sScrollX)
            .dataTable({
                bAutoWidth: false,
                //"aoColumns": [
                //  null, null, null, null, null, null,
                //  null, null, null
                //],
                "aaSorting": [],

                //,
                //"sScrollY": "200px",
                //"bPaginate": false,

                //"sScrollX": "100%",
                //"sScrollXInner": "120%",
                //"bScrollCollapse": true,
                //Note: if you are applying horizontal scrolling (sScrollX) on a ".table-bordered"
                //you may want to wrap the table inside a "div.dataTables_borderWrap" element

                //"iDisplayLength": 50
            });
        //oTable1.fnAdjustColumnSizing();
    }

    function tableWithScroll(table, scrollX) {
        angular.element(table).dataTable({
            bAutoWidth: false,
            "aaSorting": [],
            "sScrollX": "100%",
            "sScrollXInner": scrollX,
        });
    }

    function tableWithCheckboxColumn(table) {
        angular.element('#dynamic-table').dataTable({
            "order": [],
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            }]
        });
    }

    function tableDestroy(table) {
        angular.element(table).dataTable().fnDestroy();
    }
})

.factory('Dropdownlist', function () {
    return {
        chnageUI: dropdownListChangeUI,
        updateUI: dropdownListUpdateUI
    };

    ////////////===============================================================================

    function dropdownListChangeUI(width) {
        var elements = $('.chosen-select');
        //var elements = $(document.getElementsByClassName('chosen-select'));

        elements.chosen({ allow_single_deselect: true });
        //resize the chosen on window resize

        $(window)
            .off('resize.chosen')
            .on('resize.chosen', handleResizeChosen)
            .trigger('resize.chosen');

        //resize chosen on sidebar collapse/expand
        //$(document).on('settings.ace.chosen', handleSettingAceChosen);

        ////////////===============================================================================

        function handleResizeChosen() {
            $('.chosen-select').each(setToInputWidth);
        }

        function handleSettingAceChosen(e, event_name, event_val) {
            if (event_name != 'sidebar_collapsed') return;
            $('.chosen-select').each(setToParentWidth);
        }

        function setToInputWidth() {
            var $this = $(this);
            $this.next().css({ 'width': width });
        }

        function setToParentWidth() {
            var $this = $(this);
            $this.next().css({ 'width': $this.parent().width() });
        }
    }

    function dropdownListUpdateUI(selector) {
        angular.element(selector).trigger('chosen:updated');
    }
})

.factory('Chart', function () {
    var chart;
    return {
        wrtieChart: function (data, type) {
         
            var graph;
            var categoryAxis;

            AmCharts.ready(function () {
                chart = new AmCharts.AmSerialChart();
                chart.dataProvider = data;
                chart.categoryField = "PROPERTY";
                chart.position = "left";
                chart.angle = 30;
                chart.depth3D = 15;
                chart.startDuration = 1;

                categoryAxis = chart.categoryAxis;
                categoryAxis.labelRotation = 45;
                categoryAxis.dashLength = 5; //
                categoryAxis.gridPosition = "start";
                categoryAxis.autoGridCount = false;
                categoryAxis.gridCount = data.length;


                graph = new AmCharts.AmGraph();
                graph.valueField = "TOTAL";
                graph.type = type;
                graph.COLORField = "COLOR";
                graph.lineAlpha = 0;
                graph.fillAlphas = 0.8;
                graph.balloonText = "[[category]]: <b>[[value]]</b>";

                chart.addGraph(graph);
                chart.write('chartdiv');
            });

        },
        setChart: function (data) {
            chart.dataProvider = data;
            chart.validateData();
        }
    };
})

.factory('ValueMangement', function () {
     return {
         CultureSetting: function (value, culture) {
             return culture == 'en' ? value[0] : value[1];
         },
         NoneString: function (value) {
             return (value == "" || value == 'undefined' || value == undefined) ? "" : value;
         },
         CheckValue: function (value) {
             return (value == null || value == 'undefined' || value == undefined || value == '') ? false : true;
         },
         DateTime: function (date, lang) {
             if (date == undefined || date == "") {
                 return "";
             }
             if (date.split('/')[2] != undefined && date.split('/')[2] != 'undefined') {
                 var d = date.split('/')[0];
                 var m = date.split('/')[1];
                 var y = lang === "en" ? date.split('/')[2] : parseInt(date.split('/')[2]) - 543;
                 return y + '-' + m + '-' + d;
             }
             else {
                 return "";
             }
         },
         Number: function (value) {
             if (value == undefined || value == "") {
                 return 0;
             }
             if (parseInt(value) == NaN) {
                 return 0;
             }
             else {
                 return parseInt(value);
             }
         },
         getMenu: function (menu) {
             var index = menu.lastIndexOf('/') + 1;
             return menu.substring(index, menu.length);
         }
     }
})

function clearSessionSearch(userSession) {
    var menuList = userSession.LISTMENU;

    for (var i = 0; i < menuList.length; i++) {
        var menu = menuList[i];
        sessionStorage.removeItem("/" + menu.MAINMENU + "/" + menu.MENUVIEWID);
    }
}