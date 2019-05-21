﻿
//var baseUrl = 'http://123.57.229.128:8001/';
var baseUrl = 'http://localhost:57328/';

var dta = {};
var pageSize = 15;
var curPageNum = 1;

//var loginUser = {
//    TenantId: 1,
//    UserId: 1,
//    AccountId: 'sysadmin',
//    AccountName: '管理员'
//};
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

function login(params, success, error) {
    $.get(baseUrl + "survey/api/Account/Login", params, success).error(error);
}

//租户管理，没有使用
function loadTenant() {
    $.get(baseUrl + "survey/api/Master/GetTenant", {
        tenantId: "",
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
// 通用下拉框绑定方法
function loadBrandBindDropdownList(callback) {
    $.get(baseUrl + "survey/api/Master/GetBrand", {
        tenantId: loginUser.TenantId,
        userId: loginUser.Id,
        roleType:loginUser.RoleType,
        brandId: ""
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
            if (callback)
                callback(lst);                    
        }
    })
}
function loadProjectBindDropdownList(brandId, year, callback) {
    $.get(baseUrl + "survey/api/Master/GetProject", {
        brandId: brandId,
        year: year,
        projectId: ""
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
            if (callback)
                callback(lst);
        } else {
            alert(data.Body);
        }
    })
}
// 品牌管理
function loadBrand() {
    $.get(baseUrl + "survey/api/Master/GetBrand", {
        tenantId: loginUser.TenantId,
        userId: loginUser.Id,
        roleType: loginUser.RoleType,
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
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/System/BrandEdit", {}, function () {
                            $("#brand-form").setForm(item);
                            $("#brand-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));
                    tr.append($("<td></td>").html(item.BrandCode));
                    tr.append($("<td></td>").html(item.BrandName));
                    tr.append($("<td></td>").html(item.Remark));
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));
                    var userManager = $("<a href='#'>账号列表</a>");
                    userManager.click(function () {
                        $("#DetailModal").modal("show");
                        var params = {
                            BrandId: item.BrandId,
                            BrandCode: item.BrandCode,
                            BrandName: item.BrandName
                        };
                        $("#DetailModal .modal-body").load("/System/UserInfoForBrand", params, function () {
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
function saveBrand() {
    $("#save_button").button("loading");
    var params = $("#brand-form").serializeJson();
    var json = $("#brand-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.TenantId = loginUser.TenantId;
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }
    $.post(baseUrl + "survey/api/Master/SaveBrand", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadBrand();
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}
// 账号信息管理
function loadAccount() {
    $.get(baseUrl + "survey/api/Master/GetUserInfoByBrandId", {
        brandId: $("#account-brand").val()
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#account-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    //tr.append($('<td><input type="checkbox" id="check-all" class="flat"></td>'));
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/Account/AccountEdit", {}, function () {
                            $("#account-form").setForm(item);
                            $("#account-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));
                    tr.append($("<td></td>").html(item.AccountId));
                    tr.append($("<td></td>").html(item.Password));
                    tr.append($("<td></td>").html(item.AccountName));
                    tr.append($("<td></td>").html(item.RoleType));
                    tr.append($("<td></td>").html(item.UseChk));
                    tr.append($("<td></td>").html(item.Email));
                    tr.append($("<td></td>").html(item.TelNO));
                    tr.append($("<td></td>").html(item.HeadPicUrl));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));
                    
                    $("#account-table tbody").append(tr);
                })
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}
function saveAccount() {
    $("#save_button").button("loading");
    var params = $("#account-form").serializeJson();
    var json = $("#account-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.TenantId = loginUser.TenantId;
        paras.BrandId = loginUser.TenantId;
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }
    $.post(baseUrl + "survey/api/Account/SaveUserInfo", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadAccount();
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}
function toNullString(str) {
    if (str)
        return str;
    return "";
}

//查询申诉反馈
function loadAppeal(params) {
    var pageClick = function (curPage) {
        params.pageNum = curPage || 1;
        $("#appeal-table tbody").empty();

        $.get(baseUrl + "survey/api/Appeal/GetShopAppealInfoByPage", params, function (data) {
            $("#btnSearch").button('reset');
            if (data && data.Status) {
                var retArr = JSON.parse(data.Body);
                var total = retArr[0];
                var pageLst = retArr[1];
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    var edit = $("<a href='/Appeal/Edit?appealId=" + item.AppealId + "'>申诉/详细</a>");
                    tr.append($("<td></td>").append(edit));
                    var del = $("<a href='#'>删除</a>");
                    del.click(function () {
                        confirm("确定要删除该申诉反馈吗？", function () {
                            appealDelete(item.AppealId, function () {
                                pageClick(curPage);
                            })
                        })                        
                        return false;
                    })
                    tr.append($("<td></td>").append(del));

                    tr.append($("<td></td>").html(item.ShopCode));
                    tr.append($("<td></td>").html(item.ShopName));
                    tr.append($("<td></td>").html(item.SubjectCode));
                    tr.append($("<td></td>").html(item.CheckPoint));
                    tr.append($("<td></td>").html(item.Score));
                    tr.append($("<td></td>").html(item.AppealUserName));
                    tr.append($("<td></td>").html(toNullString(item.AppealDateTime).replace('T', ' ')));
                    tr.append($("<td></td>").html(item.AppealReason));
                    tr.append($("<td></td>").html(item.FeedBackStatusStr));
                    tr.append($("<td></td>").html(item.FeedBackReason));
                    tr.append($("<td></td>").html(item.FeedBackUserName));
                    tr.append($("<td></td>").html(toNullString(item.FeedBackDateTime).replace('T', ' ')));
                    
                    $("#appeal-table tbody").append(tr);
                })
               
                createPage(total, curPage, pageSize, pageClick);
            } else {
                alert(data.Body);
            }
        })
    }

    pageClick();
}

function appealDelete(appealId, callback) {
    $.post(baseUrl + "survey/api/Appeal/AppealDelete", {
        appealId: appealId
    }, function (data) {
        if (data && data.Status) {
            alert("删除成功");
            if (callback)
                callback();
        } else {
            alert(data.Body);
        }
    })
}

//获取某条申诉反馈详情
function getAppeal(appealId, callback) {
    $.get(baseUrl + "survey/api/Appeal/GetShopSubjectAppeal", {
        appealId: appealId
    }, function (data) {
        if (data && data.Status) {
            var objs = JSON.parse(data.Body);

            if (callback)
                callback(objs[0]);
        } else {
            alert(data.Body);
        }
    })
}

//提交申诉
function appealApply(params, callback) {
    $.post(baseUrl + "survey/api/Appeal/AppealApply", params, function (data) {
        if (data && data.Status) {
            if (callback)
                callback(data);
        } else {
            alert(data.Body);
        }
    })
}
//提交反馈
function appealFeedBack(params, callback) {
    $.post(baseUrl + "survey/api/Appeal/AppealFeedBack", params, function (data) {
        if (data && data.Status) {
            if (callback)
                callback(data);
        } else {
            alert(data.Body);
        }
    })
}

//提交申诉反馈附件
function appealFileSave(params, callback) {
    $.post(baseUrl + "survey/api/Appeal/AppealFileSave", params, function (data) {
        if (data && data.Status) {
            if (callback)
                callback(data);
        } else {
            alert(data.Body);
        }
    });
}

//获取申诉反馈附件
function loadFileList(params, callback) {
    $.get(baseUrl + "survey/api/Appeal/AppealFileSearch", params, function (data) {
        if (data && data.Status) {
            var objs = JSON.parse(data.Body);

            if (callback)
                callback(objs);
        } else {
            alert(data.Body);
        }
    });
}

//删除申诉反馈附件
function appealFileDelete(params, callback) {
    $.post(baseUrl + "survey/api/Appeal/AppealFileDelete", params, function (data) {
        if (data && data.Status) {
            if (callback)
                callback();
        } else {
            alert(data.Body);
        }
    });
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

//查询绑定申诉界面的期号列表


//查询期号
function loadProject(year) {
    var brandId = $("#brand-sel").val();
    $.get(baseUrl + "survey/api/Master/GetProject", {
        brandId: brandId||'',
        year: '',
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

                    tr.append($("<td></td>").html(item.ProjectCode));
                    tr.append($("<td></td>").html(item.ProjectName));
                    tr.append($("<td></td>").html(item.Year));
                    tr.append($("<td></td>").html(item.Quarter));
                    tr.append($("<td></td>").html(item.OrderNO));
                    tr.append($("<td></td>").html(item.DataScore));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
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
    $("#save_button").button("loading");
    var brandId = $("#brand-sel").val();
    var params = $("#project-form").serializeJson();
    var json = $("#project-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
        params.DataScore = $("#DataScore").val();
    } else {
        //新增
        params.TenantId = loginUser.TenantId;
        params.BrandId = brandId;
        params.DataScore = $("#DataScore").val();
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }

    $.post(baseUrl + "survey/api/Master/SaveProject", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadProject();
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}

var allShop;
function searchShop(key,projectId, callback) {
    if (allShop) {
        callback(allShop);
    } else {
        $.get(baseUrl + "survey/api/Master/GetShop", {
            projectId: "1",
            shopId: ""
        }, function (data) {
            if (data && data.Status) {
                allShop = JSON.parse(data.Body);
                callback(allShop);
            } else {
                alert(data.Body);
            }
        })
    }
    
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
    var projectId = $("#project-sel").val();
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
                        ProjectId: projectId,
                        SubjectId: item.SubjectId,
                        Page: curPageNum
                    }
                    var showDetail = $("<a href='/ProjectContent/SubjectDetail?" + parseParams(params) + "'>体系详情</a>");
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
function loadSubjectTypeExamDrop(select, callback) {
    $.get(baseUrl + "survey/api/Master/GetSubjectTypeExam", {}, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
            if (lst) {
                for (i in lst) {
                    $(select).append($("<option>").val(lst[i].SubjectTypeExamId).html(lst[i].SubjectTypeExamName));
                }
            }
            if (callback)
                callback();
        } else {
            alert(data.Body);
        }
    })
}

//体系保存
function saveSubject() {
    $("#save_button").button("loading");

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
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }

    $.post(baseUrl + "survey/api/Master/SaveSubject", params, function (data) {
        $("#save_button").button("loading");
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
    loadSubjectFile(projectId, subjectId);
    loadSubjectInspectionStandard(projectId, subjectId);
    loadSubjectLossResult(projectId, subjectId);
    loadSubjectTypeScoreRegion(projectId, subjectId);
}

//标准照片管理
function loadSubjectFile(projectId, subjectId) {
    $.get(baseUrl + "survey/api/Master/GetSubjectFile", {
        projectId: projectId,
        subjectId: subjectId
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
            $("#subject-file-table tbody").empty();
            var maxSeqNO = 0;
            $.each(lst, function (i, item) {
                maxSeqNO = Math.max(maxSeqNO, parseInt(item.SeqNO));

                var tr = $("<tr>");
                tr.append($("<td></td>").html(item.FileName));
                //tr.append($("<td></td>").html(item.FileType));
                tr.append($("<td></td>").html(item.SeqNO));
                //tr.append($("<td></td>").html(item.InUserId));
                tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                //tr.append($("<td></td>").html(item.ModifyUserId));
                tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));
                var edit = $("<a href='#'>编辑</a>");
                edit.click(function () {
                    $("#Modal").modal("show");
                    $("#Modal .modal-body").load("/ProjectContent/LoadPartial", { view: "_PartialSubjectFileEdit" }, function () {
                        $("#subject-file-form").setForm(item);
                        $("#subject-file-form").data("json", JSON.stringify(item));
                    })
                    return false;
                })
                tr.append($("<td></td>").append(edit));

                $("#subject-file-table tbody").append(tr);
            })

            $("#fileMaxSeqNO").val(maxSeqNO);
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
            $("#standard-table tbody").empty();
            var maxSeqNO = 0;
            $.each(lst, function (i, item) {
                maxSeqNO = Math.max(maxSeqNO, parseInt(item.SeqNO));
                var tr = $("<tr>");

                tr.append($("<td></td>").html(item.SeqNO));
                tr.append($("<td></td>").html(item.InspectionStandardName));
                //tr.append($("<td></td>").html(item.InUserId));
                tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                //tr.append($("<td></td>").html(item.ModifyUserId));
                tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));
                var edit = $("<a href='#'>编辑</a>");
                edit.click(function () {
                    $("#Modal").modal("show");
                    $("#Modal .modal-body").load("/ProjectContent/LoadPartial", { view: "_PartialSubjectInspectionStandardEdit" }, function () {
                        $("#subject-standard-form").setForm(item);
                        $("#subject-standard-form").data("json", JSON.stringify(item));
                    })
                    return false;
                })
                tr.append($("<td></td>").append(edit));

                $("#standard-table tbody").append(tr);
            })
            $("#standardMaxSeqNO").val(maxSeqNO);
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
            var maxSeqNO = 0;
            $("#loss-table tbody").empty();
            $.each(lst, function (i, item) {
                maxSeqNO = Math.max(maxSeqNO, parseInt(item.SeqNO));
                var tr = $("<tr>");

                tr.append($("<td></td>").html(item.SeqNO));
                tr.append($("<td></td>").html(item.LossResultName));
                //tr.append($("<td></td>").html(item.InUserId));
                tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                //tr.append($("<td></td>").html(item.ModifyUserId));
                tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));
                var edit = $("<a href='#'>编辑</a>");
                edit.click(function () {
                    $("#Modal").modal("show");
                    $("#Modal .modal-body").load("/ProjectContent/LoadPartial", { view: "_PartialSubjectLossResultEdit" }, function () {
                        $("#subject-loss-form").setForm(item);
                        $("#subject-loss-form").data("json", JSON.stringify(item));
                    })
                    return false;
                })
                tr.append($("<td></td>").append(edit));

                $("#loss-table tbody").append(tr);
            })
            $("#lossMaxSeqNO").val(maxSeqNO);
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
            $("#score-table tbody").empty();
            $.each(lst, function (i, item) {
                var tr = $("<tr>");

                tr.append($("<td></td>").html(item.SubjectTypeName));
                tr.append($("<td></td>").html(item.LowestScore));
                tr.append($("<td></td>").html(item.FullScore));
                //tr.append($("<td></td>").html(item.InUserId));
                tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                //tr.append($("<td></td>").html(item.ModifyUserId));
                tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));
                var edit = $("<a href='#'>编辑</a>");
                edit.click(function () {
                    $("#Modal").modal("show");
                    $("#Modal .modal-body").load("/ProjectContent/LoadPartial", { view: "_PartialSubjectTypeScoreRegionEdit" }, function () {
                        loadSubjectType($("#SubjectTypeId"), function () {
                            $("#subject-score-region-form").setForm(item);
                            $("#subject-score-region-form").data("json", JSON.stringify(item));
                        });
                    })
                    return false;
                })
                tr.append($("<td></td>").append(edit));

                $("#score-table tbody").append(tr);
            })
        } else {
            alert(data.Body);
        }
    })
}

//流程类型管理
function loadSubjectLink() {
    var projectId = $("#project-sel").val();
    $.get(baseUrl + "survey/api/Master/GetSubjectLink", {
        projectId: projectId||""
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
                        $("#Modal .modal-body").load("/ProjectContent/SubjectLinkEdit", {}, function () {
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
function saveSubjectLink() {
    $("#save_button").button("loading");
    var projectId = $("#project-sel").val();
    var params = $("#subject-link-form").serializeJson();
    var json = $("#subject-link-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.ProjectId = projectId;
        params.InUserId = loginUser.Id;
    }

    $.post(baseUrl + "survey/api/Master/SaveSubjectLink", params, function (data) {
        $("#save_button").button("reset");
        if (data && data.Status) {
            closeModel();
            loadSubjectLink();
        } else {
            alert(data.Body);
        }
    })
}
//复审错误管理
function loadRecheckErrorType(projectId,recheckErrorTypeId) {
    $.get(baseUrl + "survey/api/Master/GetRecheckErrorType", {
        projectId: projectId,
        recheckErrorTypeId: recheckErrorTypeId
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#recheckErrorType-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/ProjectContent/RecheckErrorTypeEdit", {}, function () {
                            $("#recheckErrorType-form").setForm(item);
                            $("#recheckErrorType-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));
                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.RecheckErrorTypeId));
                    tr.append($("<td></td>").html(item.RecheckErrorName));
                    tr.append($("<td></td>").html(item.UseChk));
                    tr.append($("<td></td>").html(item.InDateTime ? item.InDateTime.replace('T', ' ') : ''));
                    tr.append($("<td></td>").html(item.ModifyDateTime ? item.ModifyDateTime.replace('T', ' ') : ''));
                    

                    $("#recheckErrorType-table tbody").append(tr);
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
function saveRecheckErrorType() {
    $("#save_button").button("loading");
    var projectId = $("#recheckErrorType-Project").val();
    var params = $("#recheckErrorType-form").serializeJson();
    var json = $("#recheckErrorType-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.ProjectId = projectId;
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }

    $.post(baseUrl + "survey/api/Master/SaveRecheckErrorType", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadRecheckErrorType(projectId,"");
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}
//复审类型管理
function loadRecheckType(projectId, subjectRecheckTypeId) {
    $.get(baseUrl + "survey/api/Master/GetSubjectRecheckType", {
        projectId: projectId,
        subjectRecheckTypeId: subjectRecheckTypeId
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#recheckType-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/ProjectContent/RecheckTypeEdit", {}, function () {
                            $("#recheckType-form").setForm(item);
                            $("#recheckType-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));
                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.RecheckTypeId));
                    tr.append($("<td></td>").html(item.RecheckTypeName));
                    tr.append($("<td></td>").html(item.UseChk));
                    tr.append($("<td></td>").html(item.InDateTime ? item.InDateTime.replace('T', ' ') : ''));
                    tr.append($("<td></td>").html(item.ModifyDateTime ? item.ModifyDateTime.replace('T', ' ') : ''));


                    $("#recheckType-table tbody").append(tr);
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
function saveRecheckType() {
    $("#save_button").button("loading");
    var projectId = $("#recheckType-Project").val();
    var params = $("#recheckType-form").serializeJson();
    var json = $("#recheckType-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.ProjectId = projectId;
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }

    $.post(baseUrl + "survey/api/Master/SaveSubjectRecheckType", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadRecheckType(projectId, "");
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}
//试卷类型
function loadSubjectTypeExam(projectId, subjectTypeExamId) {
    $.get(baseUrl + "survey/api/Master/GetSubjectTypeExam", {
        projectId: projectId,
        subjectTypeExamId: subjectTypeExamId
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#subjectTypeExam-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/ProjectContent/SubjectTypeExamEdit", {}, function () {
                            $("#subjectTypeExam-form").setForm(item);
                            $("#subjectTypeExam-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));
                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.SubjectTypeExamId));
                    tr.append($("<td></td>").html(item.SubjectTypeExamName));
                    tr.append($("<td></td>").html(item.InDateTime ? item.InDateTime.replace('T', ' ') : ''));
                    tr.append($("<td></td>").html(item.ModifyDateTime ? item.ModifyDateTime.replace('T', ' ') : ''));


                    $("#subjectTypeExam-table tbody").append(tr);
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
function saveSubjectTypeExam() {
    $("#save_button").button("loading");
    var projectId = $("#subjectTypeExam-Project").val();
    var params = $("#subjectTypeExam-form").serializeJson();
    var json = $("#subjectTypeExam-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.ProjectId = projectId;
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }

    $.post(baseUrl + "survey/api/Master/SaveSubjectTypeExam", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadSubjectTypeExam(projectId, "");
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}
//保存流程类型
function saveSubjectLink() {
    $("#save_button").button("loading");
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
        params.InUserId = loginUser.Id;
    }

    $.post(baseUrl + "survey/api/Master/SaveSubjectLink", params, function (data) {
        $("#save_button").button("reset");
        if (data && data.Status) {
            closeModel();
            loadSubjectLink();
        } else {
            alert(data.Body);
        }
    })
}
//经销商管理
function loadShopByProject() {
    var projectId = $("#project-sel").val();
    $.get(baseUrl + "survey/api/Master/GetShopByProjectId", {
        projectId: projectId||''
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

function loadSubjectType(select, callback) {
    $.get(baseUrl + "survey/api/Master/GetSubjectType", {
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
            $.each(lst, function (i, item) {
                $(select).append($("<option>").val(item.SubjectTypeId).html(item.SubjectTypeName));
            })
        }
        if (callback)
            callback();
    })
}
//复审状态查询
function loadRecheckStatus(params, callback) {
    $.get(baseUrl + "survey/api/Recheck/GetRecheckStatus",params, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
           
            if (callback)
                callback(lst);
        }else{
            alert(data.Body);
        }       
    })
}

//复审详细查询
function loadRecheckStatusDtl(params, callback) {
    $.get(baseUrl + "survey/api/Recheck/GetRecheckStatusDtl", params, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
           
            if (callback)
                callback(lst);
        }else{
            alert(data.Body);
        }       
    })
}

//复审详细
function getShopNeedRecheckSubject(params, callback) {
    $.get(baseUrl + "survey/api/Recheck/GetShopNeedRecheckSubject", params, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            if (callback)
                callback(lst);
        } else {
            alert(data.Body);
        }
    })
}


//申诉数据导入准备期号数据
function loadProjectForAppeal(brandId) {
    $.get(baseUrl + "survey/api/Master/GetProject", {       
        brandId: brandId,
        projectId: '',
        year: ''
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
            $("#appeal-table tbody").empty();

            $.each(lst, function (i, item) {
                var tr = $("<tr>");

                tr.append($("<td></td>").html(item.ProjectId));
                tr.append($("<td></td>").html(item.ProjectCode));
                tr.append($("<td></td>").html(item.ProjectName));
                tr.append($("<td></td>").html(item.Year));
                tr.append($("<td></td>").html(item.Quarter));
                tr.append($("<td></td>").html(item.DataScore));

                var uploadBtn = $("<a href='#'>上传</a>");
                uploadBtn.click(function () {
                    $("#UpProjectId").val(item.ProjectId);
                    $("#uploadFile").click();
                    return false;
                })
                tr.append($("<td></td>").append(uploadBtn));

                var applyBtn = $("<a href='#'>开始申诉</a>");
                applyBtn.click(function () {
                    createAppealInfoByProject({
                        ProjectId: item.ProjectId
                    }, function () {
                        loadProjectForAppeal(brandId);
                    })
                    return false;
                })
                tr.append($("<td></td>").append(applyBtn));

                if (item.AppealStartDate) {
                    tr.append($("<td></td>").html(item.AppealStartDate.replace('T', ' ')));
                } else {
                    tr.append($("<td></td>").html(''));
                }


                $("#appeal-table tbody").append(tr);

            })

        } else {
            alert(data.Body);
        }
    })
}

//生成申诉数据
function importAnswer(params, callback) {
    $.post(baseUrl + "survey/api/Answer/ImportAnswer", params, function (data) {
        if (data && data.Status) {
            alert("申述数据上传成功！");
            if (callback)
                callback();
        } else {
            alert(data.Body);
        }
    })
}

//开始申诉
function createAppealInfoByProject(params, callback) {
    $.get(baseUrl + "survey/api/Appeal/CreateAppealInfoByProject", params, function (data) {
        if (data && data.Status) {
            alert(data.Body);
            if (callback)
                callback();
        } else {
            alert(data.Body);
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
