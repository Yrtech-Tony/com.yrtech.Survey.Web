
//var baseUrl = 'http://123.57.229.128:8001/';
var baseUrl = 'http://192.168.1.102/SurveyAPI/';
var dta = {};
var pageSize = 15;
var curPageNum = 1;
//加载列表
function exeQuery(data) {
    $.ajax({
        "dataType": 'json',
        "type": "GET",
        "url": data.sSource,
        "data": data.aoData,
        "success": data.fnCallback
    });
}

function loadTenand() {
    $.get(baseUrl + "survey/api/Master/GetTenand", {
        tenantId: "1",
        brandId: ""
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#brand-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.BrandCode));
                    tr.append($("<td></td>").html(item.BrandName));
                    tr.append($("<td></td>").html(item.Remark));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.EndDate));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#brand-table tbody").append(tr);
                })

                //$("#brand-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageClick);
        }
    })
}

function loadTrand() {
    $.get(baseUrl + "survey/api/Master/GetBrand", {
        tenantId: "1",
        brandId:""
    }, function (data) {
        if (data && data.Status) {            
            var lst = JSON.parse(data.Body);
           
            var pageClick = function (curPage) {
                $("#brand-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item,i,self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.BrandCode));
                    tr.append($("<td></td>").html(item.BrandName));
                    tr.append($("<td></td>").html(item.Remark));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.EndDate));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#brand-table tbody").append(tr);
                })

                //$("#brand-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageClick);            
        }        
    })
}

function loadProject() {
    $.get(baseUrl + "survey/api/Master/GetProject", {
        tenantId: "1",
        brandId: ""
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#brand-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.BrandCode));
                    tr.append($("<td></td>").html(item.BrandName));
                    tr.append($("<td></td>").html(item.Remark));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.EndDate));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#project-table tbody").append(tr);
                })

                //$("#project-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageClick);
        }
    })
}



function parseParams(data) {
    try {
        var tempArr = [];
        for (var i in data) {
            var key = encodeURIComponent(i);
            var value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        var urlParamsStr = tempArr.join('&');
        return urlParamsStr;
    } catch (err) {
        return '';
    }
}


function createPage(total, curPageNum, pageClick) {
    var pageCount = total % pageSize == 0 ? Math.ceil(total / pageSize) : Math.ceil(total / pageSize + 1);
    createPageNav({ $container: $("#pagination"), pageCount: pageCount, currentNum: curPageNum, afterFun: pageClick });
}
