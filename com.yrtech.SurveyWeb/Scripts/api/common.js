var baseUrl = 'http://123.57.229.128:8003/';
//var easyPhotoUrl = 'http://localhost:57328/';
var easyPhotoUrl = 'http://123.57.229.128:8020/'

var baseApi = baseUrl + "survey/api/";
var ossUrlRoot = 'https://yrsurvey.oss-cn-beijing.aliyuncs.com/';

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
        $("#brand-sel").empty();
        loginUser.BrandList.forEach(function (brand) {
            $("#brand-sel").append($("<option>").val(brand.BrandId).text(brand.BrandName));
        })
    }
}
// 绑定权限类型
function bindRoleTypeSelect(type) {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetRoleType", {
        type: type
    }, function (data) {
        $("#role-sel").empty();
        data.forEach(function (role) {
            $("#role-sel").append($("<option>").val(role.RoleTypeCode).text(role.RoleTypeName));
        })     
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
        $("#areaType-sel").empty();
        data.forEach(function (item) {
            $("#areaType-sel").append($("<option>").val(item.HiddenCode).text(item.HiddenName));
        })
    })
    $.ajaxSettings.async = true;
}

// 绑定期号
function bindProjectSelect() {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetProject", {
        brandId: $("#brand-sel").val(),
        year: $("#year-sel").val(),
        projectId: ""
    }, function (data) {
        $("#project-sel").empty();
        data.forEach(function (item) {
            $("#project-sel").append($("<option>").val(item.ProjectId).text(item.ProjectName));
        })
    })
    $.ajaxSettings.async = true;
}

// 绑定业务类型
function bindBussinessSelect() {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetArea", {
        brandId: $("#brand-sel").val(),
        areaId: '',
        areaCode: '',
        areaType: 'Bussiness',
        areaName: '',
        parentId: ''
    }, function (data) {
        $("#bussiness-type-sel").empty();
        data.forEach(function (item) {
            $("#bussiness-type-sel").append($("<option>").val(item.AreaId).text(item.AreaName));
        })
    });
    $.ajaxSettings.async = true;
}

// 绑定集团
function bindGroupSel() {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetGroup", {
        brandId: $("#brand-sel").val(),
        groupId: '',
        groupCode: '',
        groupName: ''
    }, function (data) {
        $("#GroupId").append($("<option>").val('').text('请选择'));
        data.forEach(function (group) {
            $("#GroupId").append($("<option>").val(group.GroupId).text(group.GroupName));
        })
    })
    $.ajaxSettings.async = true;

}