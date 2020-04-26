
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

                    var edit = $('<a href="#">申诉/详细</a>');
                    edit.click(function () {
                        $(".right_col").load("/Appeal/Edit?appealId=" + item.AppealId, {}, function () {

                        })                        
                    })
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
