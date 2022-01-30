var baseSurveyUrl = 'http://123.57.229.128:8003/';
var surveyApi = baseSurveyUrl + "survey/api/";
var baseEasyPhotoUrl = 'http://123.57.229.128:8020/';
//var baseEasyPhotoUrl = 'http://localhost:57328/';
var easyPhotoApi = baseEasyPhotoUrl + "easyPhoto/api/";
 
$.commonGet = function (url, params, callback, err) {
    $.get(surveyApi + url, params, function (data) {
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
    $.post(surveyApi + url, params, function (data) {
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

$.commonApi = function (option) {
    var url;
    if (option.apiType == 'easyPhoto') {
        url = easyPhotoApi + option.url;
    }else if(option.apiType == 'survey'){
        url= surveyApi+ option.url;
    }
    $.ajax({
        url: url,
        data: option.params,
        type: option.type == undefined ? 'get' : 'post',
        async: option.async != undefined ? option.async : 'true',
        success: function (data) {
            if (data && data.Status) {
                if (data.Body) {
                    var lst = JSON.parse(data.Body);
                    if (option.success) {
                        option.success(lst);
                    }
                } else {
                    if (option.success) {
                        option.success();
                    }
                }
            } else {
                if (option.complete) {
                    option.complete();
                }
                console.log(url + " execute error " + data.Body);
                alert(data.Body);
            }
        },
        complete: option.complete,
        error: function (jqXHR, textStatus, errorThrown) {
            if (option.error) {
                option.error();
            }
            console.log(url + " execute error ");
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
        parentId: '',
        useChk: 'true'
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
// 绑定隐藏字段
function bindHiddenColumn(hiddenCodeGroup) {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetHiddenCode", {
        hiddenCodeGroup: hiddenCodeGroup,
        hiddenCode: ''
    }, function (data) {
        data.forEach(function (hiddenCode) {
            $("#HiddenCode").append($("<option>").val(hiddenCode.HiddenCode).text(hiddenCode.HiddenName));
        })
    })
    $.ajaxSettings.async = true;

}
//  绑定标签
function bindLabel(labelType) {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetLabel", {
        brandId: $("#brand-sel").val(),
        labelId: '',
        labelType: labelType,
        useChk: true
    }, function (data) {
        $("#LabelId").append($("<option>").val('').text('请选择'));
        data.forEach(function (label) {
            $("#LabelId").append($("<option>").val(label.LabelId).text(label.LabelName));
        })
    })
    $.ajaxSettings.async = true;

}
/** easyphoto 模块*/
function bindEasyPhotoProjectSelect() {
    $.commonApi({
        apiType: 'easyPhoto',
        url: 'Master/GetProject',
        async: false,
        params: {
            tenantId: loginUser.TenantId,
            brandId: '',
            projectId: '',
            year: '',
            expireDateTimeCheck: ''
        },
        success: function (data) {
            $("#project-sel").empty();
            data.forEach(function (item) {
                $("#project-sel").append($("<option>").val(item.ProjectId).text(item.ProjectName));
            })
            projects = data;
        }
    })
}

function bindEasyPhotoCheckTypeSelect() {
    $.commonApi({
        apiType: 'easyPhoto',
        url: 'Master/GetCheckTypeList',
        async: false,
        params: {
            projectId: $("#project-sel").val(),
            checkTypeId: '',
            checkTypeName: '',
            useChk:'true'
        },
        success: function (data) {
            $("#checktype-sel").empty();
            data.forEach(function (item) {
                $("#checktype-sel").append($("<option>").val(item.CheckTypeId).text(item.CheckTypeName));
            })
        }
    })
}