
//var baseUrl = 'http://123.57.229.128:8001/';
var baseUrl = 'http://localhost:57328/';

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

function loadTenant() {
    $.get(baseUrl + "survey/api/Master/GetTenant", {
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
                    tr.append($("<td></td>").html(item.TenantCode));
                    tr.append($("<td></td>").html(item.TenantName));
                    tr.append($("<td></td>").html(item.Email));
                    tr.append($("<td></td>").html(item.TelNo));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#brand-table tbody").append(tr);
                })

                //$("#brand-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        }
    })
}

function loadBrand() {
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

                    //tr.append($('<td><input type="checkbox" id="check-all" class="flat"></td>'));
                    tr.append($("<td></td>").html(item.BrandCode));
                    tr.append($("<td></td>").html(item.BrandName));
                    tr.append($("<td></td>").html(item.Remark));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#brand-table tbody").append(tr);
                })

                $("#brand-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        }        
    })
}

function loadProject() {
    $.get(baseUrl + "survey/api/Master/GetProject", {
        brandId: "1",
        projectId: ""
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#project-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.ProjectCode));
                    tr.append($("<td></td>").html(item.ProjectName));
                    tr.append($("<td></td>").html(item.Year));
                    tr.append($("<td></td>").html(item.Quarter));
                    tr.append($("<td></td>").html(item.OrderNO));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyUserId));                    
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#project-table tbody").append(tr);
                })

                //$("#project-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        }
    })
}

//经销商管理
function loadShop() {
    $.get(baseUrl + "survey/api/Master/GetShop", {
        projectId: "1",
        shopId: ""
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#shop-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.ShopCode));
                    tr.append($("<td></td>").html(item.ShopName));
                    tr.append($("<td></td>").html(item.ShopShortName));
                    tr.append($("<td></td>").html(item.Province));
                    tr.append($("<td></td>").html(item.City));
                    tr.append($("<td></td>").html(item.UseChk?'是':'否'));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#shop-table tbody").append(tr);
                })

                //$("#project-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        }
    })
}

//体系管理
function loadSubject() {
    $.get(baseUrl + "survey/api/Master/GetSubject", {
        projectId: "1",
        subjectId: ""
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#subject-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.SubjectCode));
                    tr.append($("<td></td>").html(item.SubjectTypeExamName));
                    tr.append($("<td></td>").html(item.SubjectLinkName));
                    tr.append($("<td></td>").html(item.OrderNO));
                    tr.append($("<td></td>").html(item.Implementation));
                    tr.append($("<td></td>").html(item.CheckPoint));
                    //tr.append($("<td></td>").html(item.Desc.replace(/\n/g,'<br>')));
                    tr.append($("<td></td>").html(item.InspectionDesc));

                    $("#subject-table tbody").append(tr);
                })

                //$("#subject-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        }
    })
}

//标准照片管理
function loadSubjectFile() {
    $.get(baseUrl + "survey/api/Master/GetSubjectFile", {
        projectId: "1",
        subjectId: "29"
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#subject-file-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.FileName));
                    tr.append($("<td></td>").html(item.FileType));
                    tr.append($("<td></td>").html(item.SeqNO));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#subject-file-table tbody").append(tr);
                })

                //$("#subject-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        }
    })
}

//检查标准管理
function loadSubjectInspectionStandard() {
    $.get(baseUrl + "survey/api/Master/GetSubjectInspectionStandard", {
        projectId: "1",
        subjectId: "29"
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#standard-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.SeqNO));
                    tr.append($("<td></td>").html(item.InspectionStandardName));                   
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#standard-table tbody").append(tr);
                })

                //$("#subject-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        }
    })
}

//失分描述管理
function loadSubjectLossResult() {
    $.get(baseUrl + "survey/api/Master/GetSubjectLossResult", {
        projectId: "1",
        subjectId: "29"
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#loss-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.SeqNO));
                    tr.append($("<td></td>").html(item.LossResultName));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#loss-table tbody").append(tr);
                })

                //$("#loss-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        }
    })
}

//失分描述管理
function loadSubjectTypeScoreRegion() {
    $.get(baseUrl + "survey/api/Master/GetSubjectTypeScoreRegion", {
        projectId: "1",
        subjectId: "29"
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#score-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.LowestScore));
                    tr.append($("<td></td>").html(item.FullScore));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#score-table tbody").append(tr);
                })

                //$("#loss-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        }
    })
}


//流程类型管理
function loadSubjectLink() {
    $.get(baseUrl + "survey/api/Master/GetSubjectLink", {
        projectId: "1"
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#subjectlink-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.SubjectLinkCode));
                    tr.append($("<td></td>").html(item.SubjectLinkName));
                    tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#subjectlink-table tbody").append(tr);
                })

                //$("#subjectlink-table tbody [type=checkbox]").iCheck();
            }
            pageClick(1);
            createPage(lst.length, curPageNum, pageSize, pageClick);
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


function createPage(total, curPageNum, pageSize, pageClick) {
    var pageCount = total % pageSize == 0 ? Math.floor(total / pageSize) : Math.floor(total / pageSize + 1);
    createPageNav({ $container: $("#pagination"), pageCount: pageCount, currentNum: curPageNum, afterFun: pageClick });
}
