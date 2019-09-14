

//体系管理
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
        projectId: projectId || ""
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
        projectId: projectId || ''
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