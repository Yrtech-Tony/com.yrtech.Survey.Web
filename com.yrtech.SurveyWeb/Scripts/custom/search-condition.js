$("input[type=checkbox]").iCheckParser();
for (var i = 2019; i < 2030; i++) {
    $("#year").append($("<option>").text(i + "").val(i + ""));
}
loadBrandBindDropdownList(function (data) {
    $.each(data, function () {
        $("#brand-sel").append($("<option>").val(this.BrandId).text(this.BrandName));
    })
    $("#brand-sel").change();
});

$("#year").change(function () {
    loadProjectBindDropdownList($("#brand-sel").val(), $("#year").val(), function (data) {
        $("#project-sel").empty();
        $.each(data, function (i, item) {
            $("#project-sel").append($('<option>').val(item.ProjectId).text(item.ProjectName));
        })
        $("#project-sel").change();
    });
})
$("#year").change();
$("#project-sel").change(function () {
    if ($("#checktype-sel").length > 0) {
        loadCheckType();
    }else {
        loadEasyPhotoMasterCommonGet("GetOtherPropertyType", {
            projectId: $("#project-sel").val()
        }, function (data) {
            $("#othertype-sel").empty();
            if (data) {
                $.each(data, function () {
                    $("#othertype-sel").append($("<option>").val(this.OtherType).text(this.OtherType));
                });
            }
        })
    }
})

function loadCheckType() {   
    loadEasyPhotoMasterCommonGet("GetCheckTypeList", {
        projectId: $("#project-sel").val(),
        checkTypeId: '',
        checkTypeName: '',
    }, function (data) {
        $("#checktype-sel").empty();
        if (data) {
            $.each(data, function () {
                $("#checktype-sel").append($("<option>").val(this.CheckTypeId).text(this.CheckTypeName));
            });
        }
    })
} 