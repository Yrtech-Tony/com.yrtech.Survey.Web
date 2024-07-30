var baseSurveyUrl = 'http://123.57.229.128:8001/';
//var baseSurveyUrl = 'http://123.57.229.128:8003/';
var surveyApi = baseSurveyUrl + "survey/api/";
var baseEasyPhotoUrl = 'http://123.57.229.128:8002/';
//var baseEasyPhotoUrl = 'http://localhost:57328/';
var easyPhotoApi = baseEasyPhotoUrl + "easyPhoto/api/";
 
$.commonGet = function (url, params, callback, err) {
    return $.get(surveyApi + url, params, function (data) {
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
    return $.post(surveyApi + url, params, function (data) {
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
function getDateDiff(startDate, endDate)
{
    var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
    return dates;
}
// 根据选择的项目类型，查询条件日期和年份显示
function projectTypeDateShow() {
    debugger
    if ($("#projectType-sel").val() == "自检") {
        $('#startDate-div').show();
        $('#endDate-div').show();
        $("#startDate-sel").val(new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd"));
        $("#endDate-sel").val(new Date().Format("yyyy-MM-dd"));
        $('#year-div').hide();
        $('#year-sel').val("");
    }
    else {
        $('#startDate-div').hide();
        $('#endDate-div').hide();
        $('#startDate-sel').val("");
        $('#endDate-sel').val("");
        $('#year-div').show();
        var tYear = new Date().getFullYear();
        $("#year-sel").val(tYear);
        $("#year-sel").change();
    }
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
    if ($("#projectType-sel").val() == "自检") {
        if ($("#startDate-sel").val() > $("#endDate-sel").val()) {
            alert("开始日期不能大于结束日期！");
            return
        }
        if (getDateDiff($("#startDate-sel").val(), $("#endDate-sel").val()) > 2) {
            alert("开始日期和结束日期相差不能超过2天！");
            return
        }
        
    }
    debugger
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetProject", {
        brandId: $("#brand-sel").val(),
        year: $("#year-sel").val(),
        projectId: "",
        projectType: $("#projectType-sel").val(),
        startDate: $("#startDate-sel").val(),
        endDate: $("#endDate-sel").val()
    }, function (data) {
        $("#project-sel").empty();
        data.forEach(function (item) {
            $("#project-sel").append($("<option>").val(item.ProjectId).text(item.ProjectName));
        });
        $("#project-sel").addClass("selectpicker").prop("title", "").data("live-search", true).selectpicker("refresh");
    })
    $.ajaxSettings.async = true;
}

function bindProjectAutocomplete() {
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
        $("#project-sel").autocomplete({
            source: data.map(function(item){
                return {
                    label: item.ProjectName,
                    value: item.ProjectName,
                }
            })
        }) 
    })
    $.ajaxSettings.async = true;
}

// 绑定经销商
// projectIdUseChk=0 不传ProjectId
function bindShopSelect(isAll, projectIdUseChk) {
    debugger
    $.ajaxSettings.async = false;
    var projectId = "";
    if (projectIdUseChk!="0") {
        projectId = $("#project-sel").val();
    }
    $.commonGet("Shop/GetProjectShopExamType", {
        brandId: $("#brand-sel").val(),
        projectId: projectId,
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
// 绑定省份
function bindProvinceSelect() {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetProvince", {
        provinceId: '',
        provinceName: ''
    }, function (data) {
        $("#ProvinceId").append($("<option>").val('').text('请选择'));
        data.forEach(function (province) {
            $("#ProvinceId").append($("<option>").val(province.ProvinceId).text(province.ProvinceName));
        })
    })
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
       // $("#LabelId").addClass("selectpicker").prop("title", "").prop("multiple", true).data("live-search", true).selectpicker("refresh");
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
// 绑定标签-题目模式
function bindLabelSubjectPattern(labelType) {
    $.ajaxSettings.async = false;
    $.commonGet("Master/GetLabelSubjectPattern", {
        brandId: $("#brand-sel").val(),
        labelId: '',
        labelType: labelType,
        useChk: true
    }, function (data) {
        $("#LabelId_SubjectPattern").append($("<option>").val('').text('请选择'));
        data.forEach(function (label) {
            $("#LabelId_SubjectPattern").append($("<option>").val(label.LabelId_SubjectPattern).text(label.LabelName));
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
function viewPicutesList(fileList) {
    debugger
    if (!fileList || fileList.length == 0) {
        alert("没有照片！")
        return;
    }
    var galley = document.getElementById('galley');
    var count = fileList.length;
    $("#galley").empty()
    $.each(fileList, function (i, item) {
        
        var imgUrl = loginUser.ossInfo.osshost + item;
        if (item.indexOf("https")!= -1) {
            imgUrl = item;
        }
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
    }, 200)
}

function viewPicutes(url) {
    let fileList = url ? url.split(';') : []
    viewPicutesList(fileList)
}
 
function closePhotoModel() {
    $("#photoModal").modal("hide")
}

function isVideoFile(filename) {
    const videoExtensions = ['.mp4', '.mov', '.webm', '.mkv', '.avi', '.mpg', '.wmv', '.flv', '.3gp'];
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
    return videoExtensions.includes(extension);
}

function playVideo(url) {
    window.open(url)
}


function downloadFile(url) {
    var fileName = url.slice(url.lastIndexOf('/')+1)
    window.open('/Base/DownloadFile?ossPath=' + url + '&fileName=' + fileName)
}