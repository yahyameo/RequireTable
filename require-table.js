
    var FistPage = 0;
        var NextPage = 10;
        var PrevPage = 0;
        var LastPage = 0;
        var PerPage = 10;
        var TotalPages = 1;
        var PageNumber = 1;
        var Obj = {};
        var ArrLen = 0;
var BindPagingHtml = `   <div class="box-body">
                    <div class="col-md-4">
                        <span class="pull-left">Show</span>
                        <select class="col-sm-3" style='margin-left: 5px;' onchange="PerPageEntries()" id="ddlPerPage">
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                       
                       <strong> <span class="col-xs-offset-2" id="lblEntries"></span></strong>
                    </div>
                    <div style="top:-8px;" class="col-md-2.5 pull-right">
                        <table class="table">
                            <tr>
                                <td>
                                    <span onclick="GoFirstPage()" title="First page">
                                        <a href="#">
                                            <i class="fa fa-fast-backward" aria-hidden="true"></i>
                                        </a>
                                    </span>
                                </td>
                                <td>
                                    <span onclick="GoPrevPage();" title="Previous">
                                        <a href="#">
                                            <i class="fa fa-step-backward" aria-hidden="true"></i>

                                        </a>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <input style="width: 20px; border: none; text-align: right; background: white" readonly="readonly" type="text" value="1" id="txtPageNumber" />
                                    </span>
                                </td>
                                <td>
                                    <span>of</span>
                                </td>
                                <td>
                                    <span>
                                        <input style="width: 20px; border: none; background: white" readonly="readonly" type="text" id="txtTotalPages" name="name" value="10" />
                                    </span>
                                </td>
                                <td>
                                    <span title="Next" onclick="GoNextPage();">
                                        <a href="#">
                                            <i class="fa fa-step-forward" aria-hidden="true"></i>

                                        </a>
                                    </span>
                                </td>
                                <td>
                                    <span onclick="GoLastPage();" title="Last page">
                                        <a href="#">
                                            <i class="fa fa-fast-forward" aria-hidden="true"></i>

                                        </a>
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>`;

var JsonData = '[{ "UserId": 1402,"DateTime":"Wed Feb 28 2018 10:43:17", "Name": "FRANKLINE SEWE ", "EmailAddress": "semosh_2006@yahoo.com", "PhoneNo": "0725303137", "SkypeID": "", "PaypalID": null, "CountryName": "United States", "UserTypeDescription": "Foreign", "UserStatusDescription": "Payment Finalization", "Bank": null, "AccountNumber": null, "AccountTitle": null, "CountryCode": null, "UserStatusCode": null, "UserTypeCode": null, "BankCode": null, "Since": "\/Date(1469587433120)\/", "IsActive": true, "AllowedCategorories": [1] }, { "UserId": 5396,"DateTime":"Wed Feb 28 2018 10:43:17", "Name": "Sardar ali Khamosh", "EmailAddress": "skhamosh152@gmail.com", "PhoneNo": "923445540090", "SkypeID": "03445540090", "PaypalID": "-", "CountryName": "Pakistan", "UserTypeDescription": "Local", "UserStatusDescription": "SignUp", "Bank": "-", "AccountNumber": "-", "AccountTitle": "-", "CountryCode": null, "UserStatusCode": null, "UserTypeCode": null, "BankCode": null, "Since": "\/Date(1481432103610)\/", "IsActive": true, "AllowedCategorories": [] }]';
var DataSetColumns = [{ columns: { col1: "Name", col2: 'EmailAddress', col3: 'PhoneNo', col4: 'SkypeID', col5: 'CountryName', col6: 'DateTime' }, hyperLink: { col1: { domain: "www.google.com", name: 'Name' }, col7: {domain:'www.google.com'}} }];
var ApplyRequireTableTo = '';
function parseBoolean(str) {
    return /true/i.test(str);
}
$(function () {
    var id = 'data-table';
    RequireTable(id);
});
function RequireTable(id) {
     ApplyRequireTableTo = '#'+id;
    $(ApplyRequireTableTo + " tbody").html('');
    $(BindPagingHtml).insertBefore(ApplyRequireTableTo);

           DataSalesJson = JsonData;
            // DataSalesJson = response.d;
            var OrderList;
            try {
                OrderList = JSON.parse(DataSalesJson);
            } catch (e) { }
            FistPage = 0;
            NextPage = parseInt($("#ddlPerPage option:selected").text());;
            PrevPage = 0;
            LastPage = 0;
            PerPage = parseInt($("#ddlPerPage option:selected").text());;
            TotalPages = 1;
            PageNumber = 1;
            Obj = OrderList;
            if (Obj == null || (typeof Obj) === 'undefined') {
                ArrLen = 0;
            }
            else {
                ArrLen = Obj.length;
            }
            if (ArrLen > 0) {
                OnSuccessFull();
            }
        }
function OnSuccessFull() {

           
            var html = '';
            PerPage = parseInt($("#ddlPerPage option:selected").text());
            $("#lblEntries").text("Entries:" + ArrLen);
            TotalPages = ArrLen / PerPage;
            if (typeof TotalPages === 'number') {
                if (TotalPages % 1 !== 0) {
                    TotalPages = parseInt(TotalPages);
                    TotalPages = TotalPages + 1;
                }
            }
            if (TotalPages == 1) {
                NextPage = ArrLen;
            }
            $("#txtPageNumber").val(PageNumber);
            $("#txtTotalPages").val(TotalPages);
            var LastIndex = NextPage;
            if (LastIndex > ArrLen) {
                LastIndex = ArrLen;
            }
            var isHypherLink;
            var htmlTag;
            for (var i = PrevPage; i < LastIndex; i++) {

                var arr = Obj[i];
               
                html += '<tr>';
                html += '<td>' + (i + 1) + '</td>'
                for (var k = 0; k < Object.keys(DataSetColumns[0].columns).length; k++) {
                    var columnNumber = Object.keys(DataSetColumns[0].columns)[k];
                    var column = DataSetColumns[0].columns[columnNumber];
                    isHypherLink = Object.keys(DataSetColumns[0].hyperLink)[k];
                    if (columnNumber == isHypherLink) {
                        var hypherLink = DataSetColumns[0].hyperLink[columnNumber];
                        var domain = DataSetColumns[0].hyperLink['col1'].domain;
                        for (var p = 1; p <= Object.keys(DataSetColumns[0].hyperLink.col1).length - 1; p++) {
                            var QueryString = Object.keys(DataSetColumns[0].hyperLink.col1)[p];
                            domain += '?'+QueryString + '=' + arr[DataSetColumns[0].hyperLink[columnNumber][QueryString]];
                        }
                       
                        htmlTag = '<a href="' + domain + '">' + arr[column] + '</a>';
                    }
                    else {
                        htmlTag = '<span>' + arr[column]+'</span>'
                    }
                    var time_ago = parseBoolean($(ApplyRequireTableTo + " >thead>tr >th:eq(" + (k + 1) + ")").attr('time-ago'))
                    if (time_ago) {
                        htmlTag += '<br/><span class="label label-danger"><i>' + jQuery.timeago(arr[column]) + '</i></span>'
                    }
                    html += '<td>' + htmlTag + '</td>'
                }

                html += '</tr>';
            }

            $(ApplyRequireTableTo + "> tbody").html(html)
        
        }

        function RemoveObjElement(index) {
            delete Obj[index]
            ArrLen = ArrLen - 1;
            var len = ArrLen;
            var _PerPage = parseInt($("#ddlPerPage option:selected").text());
            if (ArrLen % _PerPage == 0 && index == ArrLen) {
                PageNumber = PageNumber - 1;
            }
            if (index == 0) {
                var inc = 0;
                //Delete first element from array object
                for (var i = 0; i < len; i++) {
                    inc = i + 1;
                    Obj[i] = Obj[inc];
                }
            }
            else if (index == ArrLen) {
                NextPage = NextPage - 1;
                PrevPage = PrevPage - _PerPage;
            }
            else if (index > 0 && index < ArrLen) {
                //Delete  element somewhere in the list from array object
                var inc = 0;
                for (var i = index; i < len; ++i) {
                    inc = i + 1;
                    Obj[i] = Obj[inc];
                }
            }
            OnSuccessFull();
        }
        function Delete(index) {
            var orderID = Obj[index].CustomerOrder_ID;
            var Comments = $("#Cmnt" + index).val();
            var MyOrder_ID = parseInt(Obj[index].MyOrder_ID);
            // var Comments = Obj[index].Comments;
            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: 'sales-order-review.aspx/Delete',
                data: "{'orderID':'" + orderID + "','Comments':'" + Comments + "','MyOrder_ID':'" + MyOrder_ID + "'}",
                async: false,
                success: function (response) {
                    RemoveObjElement(index);
                    alert("Successfully Rejected")
        
                },
                error: function () {
                    alert("Error");
                }
        
        
            })
        }
        function GoLastPage() {
            if (PageNumber == TotalPages) {
                return false;
            }
            PageNumber = TotalPages;
            $("#txtPageNumber").val(PageNumber);
        
            NextPage = ArrLen;
            var PageEntry = parseInt($("#ddlPerPage option:selected").text());
            var temp = (parseInt(NextPage / PageEntry)) * PageEntry;
            var isInteger = NextPage / PageEntry;
            if (typeof isInteger === 'number') {
                if (isInteger % 1 !== 0) {
                    PrevPage = temp;
                }
                else {
                    PrevPage = NextPage - PageEntry;
                }
            }
        
        
            OnSuccessFull();
        }
        function GoFirstPage() {
            if (PageNumber == 1) {
                return false;
            }
            PageNumber = 1;
            $("#txtPageNumber").val(PageNumber);
            PrevPage = 0;
            NextPage = parseInt($("#ddlPerPage option:selected").text());
            OnSuccessFull();
        
        }
        function GoPrevPage() {
            if (PageNumber == 1) {
                return false;
            }
            PageNumber = PageNumber - 1;
            $("#txtPageNumber").val(PageNumber);
            NextPage = PrevPage;
            PrevPage = PrevPage - parseInt($("#ddlPerPage option:selected").text());
            OnSuccessFull();
        
        }
        function GoNextPage() {
        
            if (PageNumber == TotalPages) {
                return false;
            }
            PageNumber = PageNumber + 1;
            $("#txtPageNumber").val(PageNumber);
            PrevPage = NextPage;
            NextPage = NextPage + parseInt($("#ddlPerPage option:selected").text());
            OnSuccessFull();
        
        }
        function PerPageEntries() {
            $("#spiner").show();
            PerPage = parseInt($("#ddlPerPage option:selected").text());
            TotalPages = ArrLen / PerPage;
            if (typeof TotalPages === 'number') {
                if (TotalPages % 1 !== 0) {
                    TotalPages = parseInt(TotalPages);
                    TotalPages = TotalPages + 1;
                }
            }
            PageNumber = 1;
            PrevPage = 0;
            $("#txtPageNumber").val(PageNumber);
            $("#txtTotalPages").val(TotalPages);
            NextPage = parseInt($("#ddlPerPage option:selected").text())
            OnSuccessFull();
            $("#spiner").hide();
        }
        
//Time ago plug in
        /**
         * Timeago is a jQuery plugin that makes it easy to support automatically
         * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
         *
         * @name timeago
         * @version 1.6.3
         * @requires jQuery v1.2.3+
         * @author Ryan McGeary
         * @license MIT License - http://www.opensource.org/licenses/mit-license.php
         *
         * For usage and examples, visit:
         * http://timeago.yarp.com/
         *
         * Copyright (c) 2008-2017, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
         */

        (function (factory) {
            if (typeof define === 'function' && define.amd) {
                // AMD. Register as an anonymous module.
                define(['jquery'], factory);
            } else if (typeof module === 'object' && typeof module.exports === 'object') {
                factory(require('jquery'));
            } else {
                // Browser globals
                factory(jQuery);
            }
        }(function ($) {
            $.timeago = function (timestamp) {
                if (timestamp instanceof Date) {
                    return inWords(timestamp);
                } else if (typeof timestamp === "string") {
                    return inWords($.timeago.parse(timestamp));
                } else if (typeof timestamp === "number") {
                    return inWords(new Date(timestamp));
                } else {
                    return inWords($.timeago.datetime(timestamp));
                }
            };
            var $t = $.timeago;

            $.extend($.timeago, {
                settings: {
                    refreshMillis: 60000,
                    allowPast: true,
                    allowFuture: false,
                    localeTitle: false,
                    cutoff: 0,
                    autoDispose: true,
                    strings: {
                        prefixAgo: null,
                        prefixFromNow: null,
                        suffixAgo: "ago",
                        suffixFromNow: "from now",
                        inPast: 'any moment now',
                        seconds: "less than a minute",
                        minute: "about a minute",
                        minutes: "%d minutes",
                        hour: "about an hour",
                        hours: "about %d hours",
                        day: "a day",
                        days: "%d days",
                        month: "about a month",
                        months: "%d months",
                        year: "about a year",
                        years: "%d years",
                        wordSeparator: " ",
                        numbers: []
                    }
                },

                inWords: function (distanceMillis) {
                    if (!this.settings.allowPast && !this.settings.allowFuture) {
                        throw 'timeago allowPast and allowFuture settings can not both be set to false.';
                    }

                    var $l = this.settings.strings;
                    var prefix = $l.prefixAgo;
                    var suffix = $l.suffixAgo;
                    if (this.settings.allowFuture) {
                        if (distanceMillis < 0) {
                            prefix = $l.prefixFromNow;
                            suffix = $l.suffixFromNow;
                        }
                    }

                    if (!this.settings.allowPast && distanceMillis >= 0) {
                        return this.settings.strings.inPast;
                    }

                    var seconds = Math.abs(distanceMillis) / 1000;
                    var minutes = seconds / 60;
                    var hours = minutes / 60;
                    var days = hours / 24;
                    var years = days / 365;

                    function substitute(stringOrFunction, number) {
                        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                        var value = ($l.numbers && $l.numbers[number]) || number;
                        return string.replace(/%d/i, value);
                    }

                    var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
                        seconds < 90 && substitute($l.minute, 1) ||
                        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
                        minutes < 90 && substitute($l.hour, 1) ||
                        hours < 24 && substitute($l.hours, Math.round(hours)) ||
                        hours < 42 && substitute($l.day, 1) ||
                        days < 30 && substitute($l.days, Math.round(days)) ||
                        days < 45 && substitute($l.month, 1) ||
                        days < 365 && substitute($l.months, Math.round(days / 30)) ||
                        years < 1.5 && substitute($l.year, 1) ||
                        substitute($l.years, Math.round(years));

                    var separator = $l.wordSeparator || "";
                    if ($l.wordSeparator === undefined) { separator = " "; }
                    return $.trim([prefix, words, suffix].join(separator));
                },

                parse: function (iso8601) {
                    var s = $.trim(iso8601);
                    s = s.replace(/\.\d+/, ""); // remove milliseconds
                    s = s.replace(/-/, "/").replace(/-/, "/");
                    s = s.replace(/T/, " ").replace(/Z/, " UTC");
                    s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
                    s = s.replace(/([\+\-]\d\d)$/, " $100"); // +09 -> +0900
                    return new Date(s);
                },
                datetime: function (elem) {
                    var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
                    return $t.parse(iso8601);
                },
                isTime: function (elem) {
                    // jQuery's `is()` doesn't play well with HTML5 in IE
                    return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
                }
            });

            // functions that can be called via $(el).timeago('action')
            // init is default when no action is given
            // functions are called with context of a single element
            var functions = {
                init: function () {
                    functions.dispose.call(this);
                    var refresh_el = $.proxy(refresh, this);
                    refresh_el();
                    var $s = $t.settings;
                    if ($s.refreshMillis > 0) {
                        this._timeagoInterval = setInterval(refresh_el, $s.refreshMillis);
                    }
                },
                update: function (timestamp) {
                    var date = (timestamp instanceof Date) ? timestamp : $t.parse(timestamp);
                    $(this).data('timeago', { datetime: date });
                    if ($t.settings.localeTitle) {
                        $(this).attr("title", date.toLocaleString());
                    }
                    refresh.apply(this);
                },
                updateFromDOM: function () {
                    $(this).data('timeago', { datetime: $t.parse($t.isTime(this) ? $(this).attr("datetime") : $(this).attr("title")) });
                    refresh.apply(this);
                },
                dispose: function () {
                    if (this._timeagoInterval) {
                        window.clearInterval(this._timeagoInterval);
                        this._timeagoInterval = null;
                    }
                }
            };

            $.fn.timeago = function (action, options) {
                var fn = action ? functions[action] : functions.init;
                if (!fn) {
                    throw new Error("Unknown function name '" + action + "' for timeago");
                }
                // each over objects here and call the requested function
                this.each(function () {
                    fn.call(this, options);
                });
                return this;
            };

            function refresh() {
                var $s = $t.settings;

                //check if it's still visible
                if ($s.autoDispose && !$.contains(document.documentElement, this)) {
                    //stop if it has been removed
                    $(this).timeago("dispose");
                    return this;
                }

                var data = prepareData(this);

                if (!isNaN(data.datetime)) {
                    if ($s.cutoff === 0 || Math.abs(distance(data.datetime)) < $s.cutoff) {
                        $(this).text(inWords(data.datetime));
                    } else {
                        if ($(this).attr('title').length > 0) {
                            $(this).text($(this).attr('title'));
                        }
                    }
                }
                return this;
            }

            function prepareData(element) {
                element = $(element);
                if (!element.data("timeago")) {
                    element.data("timeago", { datetime: $t.datetime(element) });
                    var text = $.trim(element.text());
                    if ($t.settings.localeTitle) {
                        element.attr("title", element.data('timeago').datetime.toLocaleString());
                    } else if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
                        element.attr("title", text);
                    }
                }
                return element.data("timeago");
            }

            function inWords(date) {
                return $t.inWords(distance(date));
            }

            function distance(date) {
                return (new Date().getTime() - date.getTime());
            }

            // fix for IE6 suckage
            document.createElement("abbr");
            document.createElement("time");
        }));
