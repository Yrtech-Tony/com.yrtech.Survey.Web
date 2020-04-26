
//复审状态查询
function loadRecheckStatus(params, callback) {
    $.get(baseUrl + "survey/api/Recheck/GetRecheckStatus", params, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            if (callback)
                callback(lst);
        } else {
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
        } else {
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

//复审错误管理
function loadRecheckErrorType(projectId, recheckErrorTypeId) {
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
            loadRecheckErrorType(projectId, "");
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
