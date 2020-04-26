

function loadRecheckStatus(params, callback) {
    ReportFileListUploadSearch
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
