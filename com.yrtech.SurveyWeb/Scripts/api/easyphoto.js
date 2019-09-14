//EasyPhoto 模块 **************** 开始

function loadEasyPhotoProjectDropList() {
    loadEasyPhotoMasterCommonGet("GetProject", {
        tenantId: loginUser.TenantId,
        projectId: '',
        year: '',
        expireDateTimeCheck: '',
        brandId:''
    }, function (data) {
        $("#project-sel").empty();
        $.each(data, function (i, item) {
            $("#project-sel").append($('<option>').val(item.ProjectId).text(item.ProjectName));
        })
        $("#project-sel").change();
    });
}
//轻松拍通用查询方法
function loadEasyPhotoMasterCommonGet(action, params, callback) {
    $.get(easyPhotoUrl + "easyPhoto/api/Master/" + action, params, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);
            if (callback) {
                callback(lst);
            }
        }
    })
}


//轻松拍通用保存方法
function saveEasyPhotoCommonObject(action, form, addDefObj, loadFun) {
    $("#save_button").button("loading");
    var params = $(form).serializeJson();
    var json = $(form).data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params = $.extend(addDefObj, params);
    }

    $.post(easyPhotoUrl + "easyPhoto/api/Master/" + action, params, function (data) {
        if (data && data.Status) {
            closeModel();
            if (loadFun)
                loadFun();
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}

//轻松拍通用批量保存方法
function saveEasyPhotoCommonList(action, form, addDefObj, loadFun) {
    $("#save_button").button("loading");
    var params = $(form).serializeJson();
    var json = $(form).data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params = $.extend(addDefObj, params);
    }

    $.post(easyPhotoUrl + "easyPhoto/api/Master/" + action, {
        AnswerListJson:JSON.stringify([params])
    }, function (data) {
        if (data && data.Status) {
            closeModel();
            if (loadFun)
                loadFun();
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}
//EasyPhoto 模块 **************** 结束
