
function OSSClient(options) {
    if (!options) {
        console.log("初始化OSSClient，options不能为空");
        return;
    } 
    if (!options.complete) {
        options.complete = function () {
            if (options.postfiles) {
                $("#" + options.postfiles).attr("disabled", false);
            }
            if (options.selectfiles) {
                $("#" + options.selectfiles).attr("disabled", false);
            }
            $("#ossfile").empty();
        };
    }  
    var uploader = init_uploader(options);
    if (options.postfiles) {
        $("#" + options.postfiles).click(function () {
            uploader.start();
            $(this).attr("disabled", true);
            if (options.selectfiles) {
                $("#" + options.selectfiles).attr("disabled", true);
            }
        });
    }

    return uploader;    
}

var osshost;
function init_uploader(options) {
    var policyText = {
        "expiration": "2028-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        "conditions": [
        ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
        ]
    };
    
    accessid = loginUser.ossInfo.AccessId;
    accesskey = loginUser.ossInfo.AccessKey; 
    osshost = loginUser.ossInfo.osshost;

    var policyBase64 = Base64.encode(JSON.stringify(policyText))
    message = policyBase64
    var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true });
    var signature = Crypto.util.bytesToBase64(bytes);
    var time1 = new Date().Format("yyyyMMddhhmmssS");
    var filename = time1+"_" +'${filename}';
    var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: options.selectfiles,
        //runtimes : 'flash',
        container: document.getElementById('upload-container'),
        flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',

        url: osshost,

        multipart_params: {
            'Filename': filename,
            'key': options.osspath + filename,
            'policy': policyBase64,
            'OSSAccessKeyId': accessid,
            'success_action_status': '200', //让服务端返回200,不然，默认会返回204
            'signature': signature,
        },

        init: {
            PostInit: function () {
                document.getElementById('ossfile').innerHTML = '';
            },

            FilesAdded: function (up, files) {              
                if (options.fileAddCheck) {
                    if (!options.fileAddCheck()) {
                        alert(options.fileAddCheckMsg);
                        return;
                    }
                }
                $("#ossfile").empty();
                plupload.each(files, function (file) {
                   var item = $('<div id="' + file.id + '" class="col-md-12 upload-item">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                    + '<div class="progress"><div class="progress-bar progress-bar-success" style="width: 0%;text-align:right;padding-right:10px;"></div></div>'
                    + '</div>');                   

                   $("#ossfile").append(item);
                });

                if ($("#ossfile div.progress").length > 0) {
                    if (options.autoupload) {
                        uploader.start();
                    }
                    if (options.FilesAddComplete) {
                        files.forEach(function (file) {
                            if (file.name && file.name.lastIndexOf("_") > 0) {
                                file.shopCode = file.name.substr(0,file.name.lastIndexOf("_"));
                            }
                        });
                        options.FilesAddComplete(files);
                    }
                }
            },

            UploadProgress: function (up, file) {                
                var d = document.getElementById(file.id);
                if (!d) {                   
                    return;
                }
                d.getElementsByClassName('progress-bar')[0].innerHTML = '<span>' + file.percent + "%</span>";

                var prog = d.getElementsByTagName('div')[0];
                var progBar = prog.getElementsByTagName('div')[0]
                progBar.style.width =  file.percent + '%';
                progBar.setAttribute('aria-valuenow', file.percent);
            },

            FileUploaded: function (up, file, info) {
                if (info.status == 200) {
                }
                else {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                }                
            },
            UploadComplete: function (up, files) {
                var filesSuccess = files.filter(function (file) {
                    if (file.status == 5) {
                        var osspath = up.settings.multipart_params.key.replace("${filename}", file.name);
                        file.osspath = osspath;
                        file.fileName = file.name;
                        return true;
                    } else {
                        false;
                    }
                })
                if (options.success) {
                    options.success(filesSuccess);
                }
                if (options.complete) {
                    options.complete();
                }
                uploader.splice();
            },
            Error: function (up, err) {
                //document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
                if (options.complete) {
                    options.complete();
                }
            }
        }
    });

    uploader.init();

    return uploader;
}
