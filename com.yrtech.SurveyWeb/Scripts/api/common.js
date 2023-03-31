//var baseSurveyUrl = 'http://123.57.229.128:8001/';
var baseSurveyUrl = 'http://localhost:57328/';
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
        complete: option.complete || function () { },
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
        type: type,
        roleTypeCode: loginUser.RoleType
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
    var brandId = $("#brand-sel").val();
    if (!brandId) {
        alert("请选择品牌！");
        return
    }
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

// 绑定经销商
function bindShopSelect(isAll) {
    $.ajaxSettings.async = false;
    $.commonGet("Shop/GetProjectShopExamType", {
        brandId: $("#brand-sel").val(),
        projectId: $("#project-sel").val(),
        shopId: '',
        userId: loginUser.Id
    }, function (data) {
        $("#shop-sel").empty();
        if (isAll) {
            $("#shop-sel").append($("<option>").val("").text("全部"));
        }
        data.forEach(function (item) {
            $("#shop-sel").append($("<option>").val(item.ShopId).text(item.ShopName));
        })

        $("#shop-sel").addClass("selectpicker").prop("title", "").data("live-search", true).selectpicker("refresh"); 
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
function bindHiddenColumn(hiddenCodeGroup,dropEl) {
    $.ajaxSettings.async = false;
    if (dropEl) {
        $(dropEl).empty()
    }
    $.commonGet("Master/GetHiddenCode", {
        hiddenCodeGroup: hiddenCodeGroup,
        hiddenCode: ''
    }, function (data) {
        data.forEach(function (hiddenCode) {
            if (dropEl) {
                $(dropEl).append($("<option>").val(hiddenCode.HiddenCode).text(hiddenCode.HiddenName));
            } else {
                $("#HiddenCode").append($("<option>").val(hiddenCode.HiddenCode).text(hiddenCode.HiddenName));
            } 
        })
    })
    $.ajaxSettings.async = true;

}
// 绑定隐藏字段-题目类型
function bindHiddenColumnSubjectType(hiddenCodeGroup) {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetHiddenCodeSubjectTye", {
        hiddenCodeGroup: hiddenCodeGroup,
        hiddenCode: ''
    }, function (data) {
        $("#HiddenCode_SubjectType").append($("<option>").val('').text('请选择'));
        data.forEach(function (hiddenCode) {
            $("#HiddenCode_SubjectType").append($("<option>").val(hiddenCode.HiddenCode_SubjectType).text(hiddenCode.HiddenName));
        })
    })
    $.ajaxSettings.async = true;

}
//  绑定标签-通用
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
//  绑定标签-审核类型
function bindLabelRecheck(labelType) {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetLabelRecheckType", {
        brandId: $("#brand-sel").val(),
        labelId: '',
        labelType: labelType,
        useChk: true
    }, function (data) {
        $("#LabelId_RecheckType").append($("<option>").val('').text('请选择'));
        data.forEach(function (label) {
            $("#LabelId_RecheckType").append($("<option>").val(label.LabelId_RecheckType).text(label.LabelName));
        })
    })
    $.ajaxSettings.async = true;
}
// 绑定文件重命名选项
function bindFileOptionSelect(fileTypeCode,projectId) {
    $.commonApi({
        apiType: 'survey',
        url: 'Master/GetFileNameOption',
        async: false,
        params: {
            fileTypeCode: fileTypeCode
        },
        success: function (data) {
            $("#fileNameOption-sel").empty();
            data.forEach(function (item) {
                $("#fileNameOption-sel").append($("<option>").val(item.OptionCode).text(item.OptionName));
            })
        }
    })
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
function bindEasyPhotoFileOptionSelect(projectId) {
    $.commonApi({
        apiType: 'easyPhoto',
        url: 'Master/GetFileNameOption',
        async: false,
        params: {
            ProjectId:projectId
        },
        success: function (data) {
            $("#fileNameOption-sel").empty();
            data.forEach(function (item) {
                $("#fileNameOption-sel").append($("<option>").val(item.OptionCode).text(item.OptionName));
            })
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

function openNewPage(url,callback) {
    if (url) {
        $(".right_col div").remove();
        $(".right_col").append($("<div>"));
        $(".right_col div").load(url, {}, function () {

        })
    }
}
 

function viewPicutes(url) {
    let fileList = url ? url.split(';') : []
    if (!fileList || fileList.length == 0) {
        alert("没有照片！")
        return;
    } 
    var galley = document.getElementById('galley');
    var count = fileList.length;
    $("#galley").empty()
    $.each(fileList, function (i, item) {
        var imgUrl = loginUser.ossInfo.osshost + item;
        var imgThumbUrl = imgUrl + '?x-oss-process=image/resize,m_fill,h_180,w_240';
        var imagA = $('<li></li>');
        let name = item.substr(item.lastIndexOf('/') + 1);
        var img = $('<img>').attr('src', imgThumbUrl).attr("alt", (i + 1) + "/" + count + "   " + name);
        img.attr('data-original', imgUrl)
        $(imagA).append(img);

        $("#galley").append(imagA);
    })  
    setTimeout(function () {
        if (!viewer) {
           var viewer = new Viewer(galley, {
                url: 'data-original',
                title: function (image) {
                    return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
                },
                hidden: function () {
                    viewer.destroy();
                },
            }); 
        }
        $("#galley img:first").click()
    },200) 
}
 
function closePhotoModel() {
    $("#photoModal").modal("hide")
}