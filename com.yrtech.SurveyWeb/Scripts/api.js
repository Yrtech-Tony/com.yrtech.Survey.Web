
//var baseUrl = 'http://123.57.229.128:8001/';
var baseUrl = 'http://localhost:57328/';

var dta = {};
var pageSize = 15;
var curPageNum = 1;

var loginUser = {
    TenantId: 1,
    UserId:1,
    AccountId:'sysadmin',
    AccountName:'管理员'
};

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

function login(params,success,error) {
    $.get(baseUrl + "survey/api/Account/Login",params,success).error(error);
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
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#brand-table tbody").append(tr);
                })

                //$("#brand-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        }
    })
}

function loadBrand() {
    $.get(baseUrl + "survey/api/Master/GetBrand", {
        tenantId: loginUser.TenantId,
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

                    //tr.append($('<td><input type="checkbox" id="check-all" class="flat"></td>'));
                    tr.append($("<td></td>").html(item.BrandCode));
                    tr.append($("<td></td>").html(item.BrandName));
                    tr.append($("<td></td>").html(item.Remark));
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));
                    var userManager = $("<a href='#'>账号管理</a>");
                    userManager.click(function () {
                        $("#Modal").modal("show");
                        var params = {
                            BrandId: item.BrandId,
                            BrandCode: item.BrandCode,
                            BrandName: item.BrandName
                        };
                        $("#Modal .modal-body").load("/System/UserInfoForBrand", params, function () {
                            loadUserInfoByBrandId(params);
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(userManager));

                    $("#brand-table tbody").append(tr);
                })

                //$("#brand-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}

function closeModel() {
    $("#Modal").modal("hide");
}

function loadUserInfoByBrandId(obj) {
    $.get(baseUrl + "survey/api/Master/GetUserInfoByBrandId", {
        brandId: obj.BrandId
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
            $.each(lst, function (i, item) {
                var tr = $("<tr>");

                tr.append($("<td></td>").html(obj.BrandName));
                tr.append($("<td></td>").html(item.AccountName));
                tr.append($("<td></td>").html(item.UserType));
                tr.append($("<td></td>").html(item.RoleType));
                tr.append($("<td></td>").html(item.Email));
                tr.append($("<td></td>").html(item.TelNO));

                $("#brand-user-table tbody").append(tr);
            })
        } else {
            alert(data.Body);
        }
    })
}
//查询期号
function loadProject() {
    var brandId = $("#brand-sel").val();
    $.get(baseUrl + "survey/api/Master/GetProject", {
        tenantId:loginUser.TenantId,
        brandId: brandId,
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
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/BrandContent/ProjectEdit", {}, function () {
                            $("#project-form").setForm(item);
                            $("#project-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));

                    $("#project-table tbody").append(tr);
                })

                //$("#project-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}
//保存期号
function saveProject() {
    var brandId = $("#brand-sel").val();
    var params = $("#project-form").serializeJson();
    var json = $("#project-form").data("json");
    if (json && json.length>0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.TenantId = loginUser.TenantId;
        params.BrandId = brandId;
        params.InUserId = loginUser.UserId;
        params.ModifyUserId = loginUser.UserId;
    }

    $.post(baseUrl + "survey/api/Master/SaveProject", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadProject();
        } else {
            alert(data.Body);
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
                    tr.append($("<td></td>").html(item.UseChk ? '是' : '否'));
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#shop-table tbody").append(tr);
                })

                //$("#project-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}

//体系查询
function loadSubject() {
    var projectId = "1";
    $.get(baseUrl + "survey/api/Master/GetSubject", {
        projectId: projectId,
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
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/ProjectContent/SubjectEdit", {}, function () {                            
                            loadSubjectTypeExamDrop($("#SubjectTypeExamId"), function () {
                                $("#subject-form").setForm(item);
                                $("#subject-form").data("json", JSON.stringify(item));
                            });
                        })
                        return false;
                    })                   
                    tr.append($("<td></td>").append(edit));
                    //体系详情
                    var params = {
                        ProjectId : projectId,
                        SubjectId: item.SubjectId,
                        Page : curPageNum
                    }
                    var showDetail = $("<a href='/ProjectContent/SubjectDetail?" + parseParams(params)+ "'>体系详情</a>");
                    tr.append($("<td></td>").append(showDetail));

                    $("#subject-table tbody").append(tr);
                })

                //$("#subject-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}

//加载试卷类型下拉列表
function loadSubjectTypeExamDrop(select,callback) {
    $.get(baseUrl + "survey/api/Master/GetSubjectTypeExam", {}, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
            if (lst) {
                for (i in lst) {
                    $(select).append($("<option>").val(lst[i].SubjectTypeExamId).html(lst[i].SubjectTypeExamName));
                }
            }
            callback();
        } else {
            alert(data.Body);
        }
    })
}

//体系保存
function saveSubject() {
    var projectId = $("#project-sel").val();
    var params = $("#subject-form").serializeJson();
    var json = $("#subject-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.ProjectId = projectId;
        params.InUserId = loginUser.UserId;
        params.ModifyUserId = loginUser.UserId;
    }

    $.post(baseUrl + "survey/api/Master/SaveSubject", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadSubject();
        } else {
            alert(data.Body);
        }
    })
}



//查询体系详情
function loadSubjectDetail() {
    var projectId = $("#ProjectId").val();
    var subjectId = $("#SubjectId").val();
    loadSubjectFile(projectId,subjectId);
    loadSubjectInspectionStandard(projectId, subjectId);
    loadSubjectLossResult(projectId, subjectId);
    loadSubjectTypeScoreRegion(projectId, subjectId);
    loadSubjectLink(projectId, subjectId);
}

//标准照片管理
function loadSubjectFile(projectId, subjectId) {
    $.get(baseUrl + "survey/api/Master/GetSubjectFile", {
        projectId: projectId,
        subjectId: subjectId
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
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#subject-file-table tbody").append(tr);
                })

                //$("#subject-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}

//检查标准管理
function loadSubjectInspectionStandard(projectId, subjectId) {
    $.get(baseUrl + "survey/api/Master/GetSubjectInspectionStandard", {
        projectId: projectId,
        subjectId: subjectId
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
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#standard-table tbody").append(tr);
                })

                //$("#subject-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}

//失分描述管理
function loadSubjectLossResult(projectId, subjectId) {
    $.get(baseUrl + "survey/api/Master/GetSubjectLossResult", {
        projectId: projectId,
        subjectId: subjectId
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
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#loss-table tbody").append(tr);
                })

                //$("#loss-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}

//体系分数管理
function loadSubjectTypeScoreRegion(projectId, subjectId) {
    $.get(baseUrl + "survey/api/Master/GetSubjectTypeScoreRegion", {
        projectId: projectId,
        subjectId: subjectId,
        subjectTypeId: ""
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
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#score-table tbody").append(tr);
                })

                //$("#loss-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
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
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime ? item.InDateTime.replace('T', ' ') : ''));
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/ProjectContent/SubjectIndexEdit", {}, function () {
                            $("#subject-link-form").setForm(item);
                            $("#subject-link-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));

                    $("#subjectlink-table tbody").append(tr);
                })

                //$("#subjectlink-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}
//保存流程类型
function saveSubjectIndex() {
    var projectId = "1";
    var params = $("#subject-link-form").serializeJson();
    var json = $("#subject-link-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.ProjectId = projectId;
        params.InUserId = loginUser.UserId;        
    }

    $.post(baseUrl + "survey/api/Master/SaveSubjectIndex", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadSubjectIndex();
        } else {
            alert(data.Body);
        }
    })
}
//经销商管理
function loadShopByProject() {
    $.get(baseUrl + "survey/api/Master/GetShopByProjectId", {
        projectId: "1"
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
                    tr.append($("<td></td>").html(item.SubjectTypeExamName));
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));

                    $("#shop-table tbody").append(tr);
                })

                //$("#project-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
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
    createPageNav({ $container: $("#pagination"), pageCount: pageCount, currentNum: curPageNum, totalCount: total, afterFun: pageClick });
}
