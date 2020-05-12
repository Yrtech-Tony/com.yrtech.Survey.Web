var baseUrl = 'http://123.57.229.128:8001/';
//var easyPhotoUrl = 'http://localhost:57328/';
var easyPhotoUrl = 'http://123.57.229.128:8020/'

var baseApi = baseUrl + "survey/api/";

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

//加载登录用户
var loginUser;
if (window.localStorage.userJson) {
    loginUser = JSON.parse(window.localStorage.userJson);
} else {
    alert("没有登录用户，跳转到登录界面！");
    window.location.href="/Account/Login";
}

$.commonGet = function (url, params, callback, err) {
    $.get(baseApi + url, params, function (data) {
        if (data && data.Status) {
            if (data.Body) {
                var lst = JSON.parse(data.Body);
                if (callback) {
                    callback(lst);
                }
            } else {
                if (callback) {
                    callback();
                }
            }
        } else {
            if (err) {
                err();
            }
            console.log(url + " execute error " + data.Body);
            alert(data.Body);
        }
    }).error(function (jqXHR, textStatus, errorThrown) {
        console.log(url + " execute error ");
        if (err) {
            err();
        }
    })
}

$.commonPost = function (url, params, callback, err) {
    $.post(baseApi + url, params, function (data) {
        if (data && data.Status) {
            if (data.Body) {
                var lst = JSON.parse(data.Body);
                if (callback) {
                    callback(lst);
                }
            } else {
                if (callback) {
                    callback();
                }
            }
        } else {
            if (err) {
                err();
            }
            console.log(url + " execute error " + data.Body);
            alert(data.Body);
        }
    }).error(function (jqXHR, textStatus, errorThrown) {
        console.log(url + " execute error ");
        if (err) {
            err();
        }
    })
}

// 共同方法
function toNullString(str) {
    if (str)
        return str;
    return "";
}

function closeModel() {
    $("#Modal").modal("hide");
}

// 绑定品牌
function bindBrandSelect() {
    if (loginUser.BrandList) {
        loginUser.BrandList.forEach(function (brand) {
            $("#brand-sel").append($("<option>").val(brand.BrandId).text(brand.BrandName));
        })
        $("#brand-sel").change();
    }
}
// 绑定权限类型
function bindRoleTypeSelect(type) {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetRoleType", {
        type: type
    }, function (data) {
        data.forEach(function (role) {
            $("#role-sel").append($("<option>").val(role.RoleTypeCode).text(role.RoleTypeName));
        })
        $("#role-sel").change();       
    })
    $.ajaxSettings.async = true;
}
// 绑定区域类型
function bindAreaTypeSelect(type) {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetHiddenCode", {
        hiddenCodeGroup: '区域类型',
        hiddenCode:''
    }, function (data) {
        data.forEach(function (item) {
            $("#areaType-sel").append($("<option>").val(item.HiddenCode).text(item.HiddenName));
        })
        $("#areaType-sel").change();
    })
    $.ajaxSettings.async = true;
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