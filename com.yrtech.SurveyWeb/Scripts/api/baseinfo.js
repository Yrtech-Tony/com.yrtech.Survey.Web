// 账号信息管理
function loadAccount() {
    $.get(baseUrl + "survey/api/Account/GetUserInfo", {
        tenantId: loginUser.TenantId,
        userId: ""
    }, function (data) {
        if (data && data.Status) {
            var lst = JSON.parse(data.Body);

            var pageClick = function (curPage) {
                $("#account-table tbody").empty();

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
                        $("#Modal .modal-body").load("/Account/AccountEdit", {}, function () {
                            $("#account-form").setForm(item);
                            $("#account-form").data("json", JSON.stringify(item));
                        })
                        return false;
                    })
                    tr.append($("<td></td>").append(edit));
                    tr.append($("<td></td>").html(item.AccountId));
                    tr.append($("<td></td>").html(item.Password));
                    tr.append($("<td></td>").html(item.AccountName));
                    tr.append($("<td></td>").html(item.RoleType));
                    tr.append($("<td></td>").html(item.UseChk));
                    tr.append($("<td></td>").html(item.Email));
                    tr.append($("<td></td>").html(item.TelNO));
                    tr.append($("<td></td>").html(item.HeadPicUrl));
                    tr.append($("<td></td>").html(item.InDateTime.replace('T', ' ')));
                    tr.append($("<td></td>").html(item.ModifyDateTime.replace('T', ' ')));

                    $("#account-table tbody").append(tr);
                })
            }
            pageClick(curPageNum);
            createPage(lst.length, curPageNum, pageSize, pageClick);
        } else {
            alert(data.Body);
        }
    })
}


function saveAccount() {
    $("#save_button").button("loading");
    var params = $("#account-form").serializeJson();
    var json = $("#account-form").data("json");
    var brandId = $("#account-brand").val()
    if (json && json.length > 0) {
        //编辑
        json = JSON.parse(json);
        params = $.extend(json, params);
    } else {
        //新增
        params.TenantId = loginUser.TenantId;
        paras.BrandId = brandId;
        params.InUserId = loginUser.Id;
        params.ModifyUserId = loginUser.Id;
    }
    $.post(baseUrl + "survey/api/Account/SaveUserInfo", params, function (data) {
        if (data && data.Status) {
            closeModel();
            loadAccount();
        } else {
            alert(data.Body);
        }
        $("#save_button").button("reset");
    })
}