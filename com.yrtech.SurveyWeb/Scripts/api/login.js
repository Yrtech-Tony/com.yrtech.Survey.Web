
// 登陆
function login(params, success, error) {
    $.get(baseUrl + "survey/api/Account/Login", params, success).error(error);
}
