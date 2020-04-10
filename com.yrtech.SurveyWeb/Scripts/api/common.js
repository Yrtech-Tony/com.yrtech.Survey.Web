var baseUrl = 'http://123.57.229.128:8001/';
//var easyPhotoUrl = 'http://localhost:57328/';
var easyPhotoUrl = 'http://123.57.229.128:8020/'

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

// 共同方法
function toNullString(str) {
    if (str)
        return str;
    return "";
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
function closeModel() {
    $("#Modal").modal("hide");
}

// 绑定品牌
function loadBrandBindDropdownList(callback) {
    debugger
    $.get(baseUrl + "survey/api/Master/GetBrand", {
        tenantId: loginUser.TenantId,
        userId: loginUser.Id,
        roleType: loginUser.RoleType,
        brandId: ""
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
// 绑定期号
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
// 绑定权限类型
function loadRoleTypeBindDropdownList(callback) {
    $.get(baseUrl + "survey/api/Master/GetRoleType", {
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
// 绑定试卷类型
function loadSubjectTypeExamBindDropdownList(projectId, callback) {
    $.get(baseUrl + "survey/api/Master/GetSubjectTypeExam",
        {
            projectId: projectId,
            subjectTypeExamId: ""
        },
        function (data) {
            if (data && data.Status) {
                var lst = JSON.parse(data.Body);
                if (callback)
                    callback(lst);
            } else {
                alert(data.Body);
            }
        })
}