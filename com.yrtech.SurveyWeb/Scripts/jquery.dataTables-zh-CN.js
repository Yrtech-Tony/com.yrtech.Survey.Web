/**
 * Created by WP on 2018/1/16.
 */
(function () {
    var oLanguage = {
        "oAria": {
            "sSortAscending": ": 升序排列",
            "sSortDescending": ": 降序排列"
        },
        "oPaginate": {
            "sFirst": "首页",
            "sLast": "末页",
            "sNext": "下页",
            "sPrevious": "上页"
        },
        "sEmptyTable": "没有相关记录",
        "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
        "sInfoEmpty": "第 0 到 0 条记录，共 0 条",
        "sInfoFiltered": "(从 _MAX_ 条记录中检索)",
        "sInfoPostFix": "",
        "sDecimal": "",
        "sThousands": ",",
        "sLengthMenu": "每页显示条数: _MENU_",
        "sLoadingRecords": "正在载入...",
        "sProcessing": "正在载入...",
        "sSearch": "搜索:",
        "sSearchPlaceholder": "",
        "sUrl": "",
        "sZeroRecords": "没有相关记录"
    }
    $.fn.dataTable.defaults.oLanguage = oLanguage;

    // oSort是排序类型数组, 'chinese-asc'是自己定义的类型的排序(*-asc || *-desc)名称
    // 插件应该会根据表格中的内容的类型(string, number, chinese)进行比较排序，
    // 如果以chinese类型来排序则用oSort['chinese-asc']和oSort['chinese-desc']的方法
    // oSort对应的function里面自定义比较方法
    $.fn.dataTableExt.oSort['chinese-asc'] = function (x, y) {
        //javascript自带的中文比较函数，具体用法可自行查阅了解
        return x.localeCompare(y);
    };

    $.fn.dataTableExt.oSort['chinese-desc'] = function (x, y) {
        return y.localeCompare(x);
    };

    // aTypes是插件存放表格内容类型的数组
    // reg赋值的正则表达式，用来判断是否是中文字符
    // 返回值push到aTypes数组，排序时扫描该数组，'chinese'则调用上面两个方法。返回null默认是'string'
    $.fn.dataTableExt.aTypes.push(function (sData) {
        var reg = /^[\u4e00-\u9fa5]{0,}$/;
        if (reg.test(sData)) {
            return 'chinese';
        }
        return null;
    });
    //$.extend($.fn.dataTable.defaults.oLanguage,oLanguage)
})();