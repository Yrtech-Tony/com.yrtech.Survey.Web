// 品牌管理
function loadBrand() {
    $.get(baseUrl + "survey/api/Master/GetBrand", {
        tenantId: loginUser.TenantId,
        userId: loginUser.Id,
        roleType: loginUser.RoleType,
        brandId: ""
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#brand-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    //tr.append($('<td><input type="checkbox" id="check-all" class="flat"></td>'));
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/System/BrandEdit", {}, function () {
                            $("#brand-form").setForm(item);
                            $("#brand-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));
                    tr.append($("<td></td>").html(item.BrandCode));
                    tr.append($("<td></td>").html(item.BrandName));
                    tr.append($("<td></td>").html(item.Remark));
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));
                    var userManager = $("<a href='#'>账号列表</a>");
                    userManager.click(function () {
                        $("#DetailModal").modal("show");
                        var params = {
                            BrandId: item.BrandId,
                            BrandCode: item.BrandCode,
                            BrandName: item.BrandName
                        };
                        $("#DetailModal .modal-body").load("/System/UserInfoForBrand", params, function () {
                            loadUserInfoByBrandId(params);
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(userManager));

                    $("#brand-table tbody").append(tr);
                })

                //$("#brand-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}
function saveBrand() {
    $("#save_button").button("loading");
    var params = $("#brand-form").serializeJson();
    var json = $("#brand-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.TenantId = loginUser.TenantId;
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }
    $.post(baseUrl + "survey/api/Master/SaveBrand", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadBrand();
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}

//期号管理
function loadProject(year) {
    var brandId = $("#brand-sel").val();
    $.get(baseUrl + "survey/api/Master/GetProject", {
        brandId: brandId || '',
        year: '',
        projectId: ""
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#project-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");

                    tr.append($("<td></td>").html(item.ProjectCode));
                    tr.append($("<td></td>").html(item.ProjectName));
                    tr.append($("<td></td>").html(item.Year));
                    tr.append($("<td></td>").html(item.Quarter));
                    tr.append($("<td></td>").html(item.OrderNO));
                    tr.append($("<td></td>").html(item.DataScore));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/BrandContent/ProjectEdit", {}, function () {
                            $("#project-form").setForm(item);
                            $("#project-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));

                    $("#project-table tbody").append(tr);
                })

                //$("#project-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}
function saveProject() {
    $("#save_button").button("loading");
    var brandId = $("#brand-sel").val();
    var params = $("#project-form").serializeJson();
    var json = $("#project-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
        params.DataScore = $("#DataScore").val();
    } else {
        //新增
        params.TenantId = loginUser.TenantId;
        params.BrandId = brandId;
        params.DataScore = $("#DataScore").val();
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }

    $.post(baseUrl + "survey/api/Master/SaveProject", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadProject();
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}

//经销商管理
function loadShop() {
    $.get(baseUrl + "survey/api/Master/GetShop", {
        brandId: $("#shop-brand").val(),
        shopId: "",
        key: $("#ShopKey").val()
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#shop-table tbody").empty();

                curPageNum = curPage;
                var pageLst = lst.filter(function (item, i, self) {
                    var start = curPage > 0 ? (curPage - 1) * pageSize : 0;
                    return (i >= start && i < (start + pageSize));
                })
                $.each(pageLst, function (i, item) {
                    //page
                    var tr = $("<tr>");
                    var edit = $("<a href='#'>编辑</a>");
                    edit.click(function () {
                        $("#Modal").modal("show");
                        $("#Modal .modal-body").load("/BrandContent/ShopEdit", {}, function () {
                            $("#shop-form").setForm(item);
                            $("#shop-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));
                    //tr.append($('<input type="checkbox" id="check-all" class="flat">'));
                    tr.append($("<td></td>").html(item.ShopCode));
                    tr.append($("<td></td>").html(item.ShopName));
                    tr.append($("<td></td>").html(item.ShopShortName));
                    tr.append($("<td></td>").html(item.Province));
                    tr.append($("<td></td>").html(item.City));
                    tr.append($("<td></td>").html(item.UseChk ? '是' : '否'));
                    //tr.append($("<td></td>").html(item.InUserId));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    //tr.append($("<td></td>").html(item.ModifyUserId));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#shop-table tbody").append(tr);
                })

                //$("#project-table tbody [type=checkbox]").iCheck();
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}
function saveShop() {
    $("#save_button").button("loading");
    var brandId = $("#shop-brand").val();
    var params = $("#shop-form").serializeJson();
    var json = $("#shop-form").data("json");
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.TenantId = loginUser.TenantId;
        params.BrandId = brandId;
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }

    $.post(baseUrl + "survey/api/Master/SaveShop", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadShop();
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}
