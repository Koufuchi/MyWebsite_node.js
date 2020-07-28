$("document").ready(function () {
    if (!$.cookie('admin') || $.cookie('admin') == null) {
        $('#loginModal').modal('show');
    } else {
        $("#content-wrapper").load("user.html", function () {
            getUser();
        });
    }
});

function login() {
    var username = $("#username").val();
    var password = $("#password").val();
    if (username == "" || password == "") {
        alert("請輸入使用者名稱及密碼！");
        return;
    }
    var data = {
        username: username,
        password: password
    }
    $.post("/auth/login", data, function (res) {
        if (res.status == 0) {
            $.cookie('admin', res.data._id);
            alert("登入成功");
            $('#loginModal').modal('hide');
            $("#username").val("");
            $("#password").val("");
            $("#content-wrapper").load("user.html", function () {
                getUser();
            });
        } else {
            alert(res.msg);
        }
    });
}

function logout() {
    $.get("/auth/logout", function (res) {
        $.removeCookie("admin");
        $('#loginModal').modal('show');
        $("#content-wrapper div").remove();
        alert("登出成功");
    });
}

//==============使用者=================
$("#user").on("click", function (e) {
    $("#content-wrapper").load("user.html", function () {
        getUser();
    });
});

function getUser() {
    $.ajax({
        url: "/user",
        contentType: "application/x-www-form-urlencoded",
        data: {
            cookie: $.cookie('admin')
        },
        type: "POST",
        datatype: "json",
        success: function (res) {
            $("#username").val(res.data.username);
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

function changePassword() {
    var password = $("#password").val();
    var passwordConfirm = $("#passwordConfirm").val();
    if (password != passwordConfirm) {
        alert("密碼不同");
        return;
    }
    $.ajax({
        url: "/user",
        contentType: "application/x-www-form-urlencoded",
        data: {
            password: password,
            cookie: $.cookie('admin')
        },
        type: "PATCH",
        datatype: "json",
        success: function () {
            alert("修改成功");
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

//==============輪播圖=================
$("#carousel").on("click", function (e) {
    $("#content-wrapper").load("carousel.html", function () {
        getCarousel();
    });
});
function getCarousel() {
    $.get("/carousel", function (res) {
        for (var i = 0; i < res.data.length; i++) {
            var content =
                `<div class="col-lg-3 col-md-4 col-xs-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail my-img" src="/images${res.data[i].image}">
                    <input type="text" class="form-control" id="t-${res.data[i]._id}" placeholder="標題" value="${res.data[i].title}">
                    <button type="button" class="btn btn-primary" onclick="carouselEdit('${res.data[i]._id}')">修改</button>
                    <button type="button" class="btn btn-danger" onclick="carouselDelete('${res.data[i]._id}')">刪除</button>
                </div>
            </div>`;
            $("#carousel-content").append(content);
        }
    });
}
$(document).on('change', "#carousel_img_file", function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#preview_img").attr("src", e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});
function carouselInsert() {
    var title = $("#insert_title").val();
    var img = document.getElementById('carousel_img_file');
    if (!/.(gif|jpg|jpeg|png|GIF|JPG|PNG|JEPG)$/.test(img.value)) {
        alert("圖片類型不正確!");
        return;
    }
    var formData = new FormData();
    formData.append('title', title);
    formData.append('file', img.files[0]);
    formData.append('cookie', $.cookie('admin'));
    $.ajax({
        url: "/carousel",
        type: "PUT",
        data: formData,
        processData: false,
        contentType: false,
        success: function (e) {
            alert("上傳成功!");
            $("#content-wrapper").load("carousel.html",
                function () {
                    getCarousel();
                });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function carouselEdit(id) {
    var title = $("#t-" + id).val();
    $.ajax({
        url: "/carousel/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: {
            title: title,
            cookie: $.cookie('admin')
        },
        type: "PATCH",
        datatype: "json",
        success: function (res) {
            alert("成功修改");
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function carouselDelete(id) {
    $.ajax({
        url: "/carousel/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: {
            cookie: $.cookie('admin')
        },
        type: "DELETE",
        datatype: "json",
        success: function (res) {
            alert("成功刪除");
            $("#content-wrapper").load("carousel.html",
                function () {
                    getCarousel();
                });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

//==============負責人介紹=================
$("#owner").on("click", function (e) {
    $("#content-wrapper").load("owner.html", function () {
        getOwner();
    });
});

function getOwner() {
    $.get("/owner", function (res) {
        $("#name").val(res.data.name);
        $("#job").val(res.data.job);
        $("#phone").val(res.data.phone);
        $("#email").val(res.data.email);
        $("#owner_img").attr("src", "/images" + res.data.image);
    });
}
$(document).on('change', "#owner_img_file", function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#owner_img").attr("src", e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});
function ownerEdit() {
    var name = $("#name").val();
    var job = $("#job").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var img = document.getElementById('owner_img_file');
    if (img.files[0]) {
        if (!/.(gif|jpg|jpeg|png|GIF|JPG|PNG|JEPG)$/.test(img.value)) {
            alert("圖片類型不正確!");
            return;
        }
    }
    var formData = new FormData();
    formData.append('name', name);
    formData.append('job', job);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('file', img.files[0]);
    formData.append('cookie', $.cookie('admin'));
    $.ajax({
        url: "/owner",
        type: "PATCH",
        data: formData,
        processData: false,
        contentType: false,
        success: function (e) {
            alert("修改成功!");
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

//==============業務範圍=================
$("#business").on("click", function (e) {
    $("#content-wrapper").load("business.html", function () {
        getBusiness();
    });
});
function getBusiness() {
    $.get("/business", function (res) {
        for (var i = 0; i < res.data.length; i++) {
            var content =
                `<div class="col-lg-3 col-md-4 col-xs-6">
                <div class="d-block mb-4 h-100">
                    <input type="text" class="form-control" placeholder="業務名稱" id="n-${res.data[i]._id}" value="${res.data[i].name}">
                    <textarea class="form-control" id="c-${res.data[i]._id}" rows="8">${res.data[i].content}</textarea>
                    <button type="button" class="btn btn-primary" onclick="businessEdit('${res.data[i]._id}')">修改</button> 
                </div>
            </div>`;
            $("#business-content").prepend(content);
        }
    });
}
function businessEdit(id) {
    var name = $("#n-" + id).val();
    var content = $("#c-" + id).val();
    $.ajax({
        url: "/business/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: {
            name: name,
            content: content,
            cookie: $.cookie('admin')
        },
        type: "PATCH",
        datatype: "json",
        success: function (res) {
            alert("成功修改")
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

//==============公司環境=================
$("#environment").on("click", function (e) {
    $("#content-wrapper").load("environment.html", function () {
        getEnvironment();
    });
});
function getEnvironment() {
    $.get("/environment", function (res) {
        for (var i = 0; i < res.data.length; i++) {
            var content =
                `<div class="col-lg-3 col-md-4 col-xs-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail my-img" src="/images${res.data[i].image}">
                    <input type="text" class="form-control" id="t-${res.data[i]._id}" placeholder="標題" value="${res.data[i].title}">
                    <button type="button" class="btn btn-primary" onclick="environmentEdit('${res.data[i]._id}')">修改</button>
                    <button type="button" class="btn btn-danger" onclick="environmentDelete('${res.data[i]._id}')">刪除</button>
                </div>
            </div>`;
            $("#environment-content").append(content);
        }
    });
}
$(document).on('change', "#environment_img_file", function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#preview_img").attr("src", e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});
function environmentInsert() {
    var title = $("#insert_title").val();
    var img = document.getElementById('environment_img_file');
    if (!/.(gif|jpg|jpeg|png|GIF|JPG|PNG|JEPG)$/.test(img.value)) {
        alert("圖片類型不正確!");
        return;
    }
    var formData = new FormData();
    formData.append('title', title);
    formData.append('file', img.files[0]);
    formData.append('cookie', $.cookie('admin'));
    $.ajax({
        url: "/environment",
        type: "PUT",
        data: formData,
        processData: false,
        contentType: false,
        success: function (e) {
            alert("上傳成功!");
            $("#content-wrapper").load("environment.html",
                function () {
                    getEnvironment();
                });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function environmentEdit(id) {
    var title = $("#t-" + id).val();
    $.ajax({
        url: "/environment/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: {
            title: title,
            cookie: $.cookie('admin')
        },
        type: "PATCH",
        datatype: "json",
        success: function (res) {
            alert("成功修改");
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function environmentDelete(id) {
    $.ajax({
        url: "/environment/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: {
            cookie: $.cookie('admin')
        },
        type: "DELETE",
        datatype: "json",
        success: function (res) {
            alert("刪除成功");
            $("#content-wrapper").load("environment.html",
                function () {
                    getEnvironment();
                });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

//==============技術領域=================
$("#skill").on("click", function (e) {
    $("#content-wrapper").load("skill.html", function () {
        getSkill();
    });
});
function getSkill() {
    $.get("/skill", function (res) {
        for (var i = 0; i < res.data.length; i++) {
            var content =
                `<div class="col-lg-3 col-md-4 col-xs-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail my-img" src="/images${res.data[i].image}">
                    <input type="text" class="form-control" placeholder="技術標題" id="t-${res.data[i]._id}" value="${res.data[i].title}">
                    <textarea class="form-control" rows="5" id="c-${res.data[i]._id}">${res.data[i].content}</textarea>    
                    <button type="button" class="btn btn-primary" onclick="skillEdit('${res.data[i]._id}')">修改</button>                  
                    <button type="button" class="btn btn-danger" onclick="skillDelete('${res.data[i]._id}')">刪除</button>
                </div>
            </div>`;
            $("#skill-content").append(content);
        }
    });
}
$(document).on('change', "#skill_img_file", function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#preview_img").attr("src", e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});
function skillInsert() {
    var title = $("#insert_title").val();
    var content = $("#insert_content").val();
    var img = document.getElementById('skill_img_file');
    if (!/.(gif|jpg|jpeg|png|GIF|JPG|PNG|JEPG)$/.test(img.value)) {
        alert("圖片類型不正確!")
        return;
    }
    var formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', img.files[0]);
    formData.append('cookie', $.cookie('admin'));
    $.ajax({
        url: "/skill",
        type: "PUT",
        data: formData,
        processData: false,
        contentType: false,
        success: function (e) {
            alert("上傳成功!");
            $("#content-wrapper").load("skill.html",
                function () {
                    getSkill();
                });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

function skillEdit(id) {
    var title = $("#t-" + id).val();
    var content = $("#c-" + id).val();
    $.ajax({
        url: "/skill/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: {
            title: title,
            content: content,
            cookie: $.cookie('admin')
        },
        type: "PATCH",
        datatype: "json",
        success: function (res) {
            alert("修改成功");
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function skillDelete(id) {
    $.ajax({
        url: "/skill/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: { cookie: $.cookie('admin') },
        type: "DELETE",
        datatype: "json",
        success: function (res) {
            alert("刪除成功");
            $("#content-wrapper").load("skill.html", function () {
                getSkill();
            });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

//==============研究室成果=================
$("#gain").on("click", function (e) {
    $("#content-wrapper").load("gain.html", function () {
        getGain();
    });
});
function getGain() {
    $.get("/gain", function (res) {
        for (var i = 0; i < res.data.length; i++) {
            var content = 
            `<div class="col-lg-3 col-md-4 col-xs-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail my-img" src="/images${res.data[i].image}">
                    <input type="text" class="form-control" placeholder="成果標題" id="t-${res.data[i]._id}" value="${res.data[i].title}">
                    <textarea class="form-control" rows="5" id="c-${res.data[i]._id}">${res.data[i].content}</textarea>      
                    <button type="button" class="btn btn-primary" onclick="gainEdit('${res.data[i]._id}')">修改</button> 
                    <button type="button" class="btn btn-danger" onclick="gainDelete('${res.data[i]._id}')">刪除</button>
                </div>
            </div>`;
            $("#gain-content").append(content);
        }
    });
}
$(document).on('change',"#gain_img_file", function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#preview_img").attr("src", e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});
function gainInsert() {
    var title = $("#insert_title").val();
    var content = $("#insert_content").val();
    var img = document.getElementById('gain_img_file');
    if (!/.(gif|jpg|jpeg|png|GIF|JPG|PNG|JEPG)$/.test(img.value))    {
        alert("圖片類型不正確!");
        return;
    }
    var formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', img.files[0]);
    formData.append('cookie', $.cookie('admin'));
    $.ajax({
        url: "/gain",
        type: "PUT",
        data: formData,
        processData: false,
        contentType: false,
        success: function (e) {
            alert("上傳成功!");
            $("#content-wrapper").load("gain.html", function () {
                getGain();
            });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function gainEdit(id) {
    var title = $("#t-" + id).val();
    var content = $("#c-" + id).val();
    $.ajax({
        url: "/gain/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: { title: title, content: content, cookie: $.cookie('admin') },
        type: "PATCH",
        datatype: "json",
        success: function (res) {
            alert("修改成功");
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function gainDelete(id) {
    $.ajax({
        url: "/gain/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: { cookie: $.cookie('admin') },
        type: "DELETE",
        datatype: "json",
        success: function (res) {
            alert("刪除成功");
            $("#content-wrapper").load("gain.html", function () {
                getGain();
            });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

//==============團隊成員=================
$("#team").on("click", function (e) {
    $("#content-wrapper").load("team.html", function () {
        getTeam();
    });
})
function getTeam() {
    $.get("/team", function (res) {
        for (var i = 0; i < res.data.length; i++) {
            var content = 
            `<div class="col-lg-3 col-md-4 col-xs-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail my-img" src="/images${res.data[i].avatar}">
                    <input type="text" class="form-control" placeholder="姓名" id="n-${res.data[i]._id}" value="${res.data[i].name}">
                    <button type="button" class="btn btn-primary" onclick="teamEdit('${res.data[i]._id}')">修改</button> 
                    <button type="button" class="btn btn-danger" onclick="teamDelete('${res.data[i]._id}')">刪除</button>
                </div>
            </div>`;
            $("#team-content").append(content);
        }
    });
}
$(document).on('change',"#team_img_file", function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#preview_img").attr("src", e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});
function teamInsert() {
    var name = $("#insert_name").val();
    var img = document.getElementById('team_img_file');
    if (!/.(gif|jpg|jpeg|png|GIF|JPG|PNG|JEPG)$/.test(img.value))    {
        alert("圖片類型不正確!");
        return;
    }
    var formData = new FormData();
    formData.append('name', name);
    formData.append('file', img.files[0]);
    formData.append('cookie', $.cookie('admin'));
    $.ajax({
        url: "/team",
        type: "PUT",
        data: formData,
        processData: false,
        contentType: false,
        success: function (e) {
            alert("上傳成功!");
            $("#content-wrapper").load("team.html", 
         function () {
                getTeam();
            });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function teamEdit(id) {
    var name = $("#n-" + id).val();
    $.ajax({
        url: "/team/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: { name: name, cookie: $.cookie('admin') },
        type: "PATCH",
        datatype: "json",
        success: function (res) {
            alert("修改成功");
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function teamDelete(id) {
    $.ajax({
        url: "/team/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: { cookie: $.cookie('admin') },
        type: "DELETE",
        datatype: "json",
        success: function (res) {
            alert("刪除成功");
            $("#content-wrapper").load("team.html", 
             function () {
                getTeam();
            });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

//==============活動紀錄=================
$("#activity").on("click", function (e) {
    $("#content-wrapper").load("activity.html", function () {
        getActivity();
    });
});
function getActivity() {
    $.get("/activity", function (res) {
        for (var i = 0; i < res.data.length; i++) {
            var content = 
            `<div class="col-lg-3 col-md-4 col-xs-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail my-img" src="/images${res.data[i].image}">
                    <input type="text" class="form-control" placeholder="活動標題" id="t-${res.data[i]._id}" value="${res.data[i].title}">
                    <textarea class="form-control" rows="5" id="c-${res.data[i]._id}">${res.data[i].content}</textarea>     
                    <button type="button" class="btn btn-primary" onclick="activityEdit('${res.data[i]._id}')">修改</button>                      
                    <button type="button" class="btn btn-danger" onclick="activityDelete('${res.data[i]._id}')">刪除</button>
                </div>
            </div>`;
            $("#activity-content").append(content);
        }
    });
}
$(document).on('change',"#activity_img_file", function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#preview_img").attr("src", e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});
function activityInsert() {
    var title = $("#insert_title").val();
    var content = $("#insert_content").val();
    var img = document.getElementById('activity_img_file');
    if (!/.(gif|jpg|jpeg|png|GIF|JPG|PNG|JEPG)$/.test(img.value))    {
        alert("圖片類型不正確!");
        return;
    }
    var formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', img.files[0]);
    formData.append('cookie', $.cookie('admin'));
    $.ajax({
        url: "/activity",
        type: "PUT",
        data: formData,
        processData: false,
        contentType: false,
        success: function (e) {
            alert("上傳成功!");
            $("#content-wrapper").load("activity.html", 
             function () {
                getActivity();
            });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function activityEdit(id) {
    var title = $("#t-" + id).val();
    var content = $("#c-" + id).val();
    $.ajax({
        url: "/activity/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: { title: title, content: content, cookie: $.cookie('admin') },
        type: "PATCH",
        datatype: "json",
        success: function (res) {
            alert("修改成功");
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
function activityDelete(id) {
    $.ajax({
        url: "/activity/" + id,
        contentType: "application/x-www-form-urlencoded",
        data: { cookie: $.cookie('admin') },
        type: "DELETE",
        datatype: "json",
        success: function (res) {
            alert("刪除成功");
            $("#content-wrapper").load("activity.html", 
             function () {
                getActivity();
            });
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}

//==============連絡我們=================
$("#contact").on("click", function (e) {
    $("#content-wrapper").load("contact.html", function () {
        getContact();
    });
});
function getContact() {
    $.get("/contact", function (res) {
        $("#address").val(res.data.address);
        $("#phone").val(res.data.phone);
        $("#email").val(res.data.email);
    });
}
function contactEdit() {
    var address = $("#address").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    $.ajax({
        url: "/contact",
        contentType: "application/x-www-form-urlencoded",
        data: { address: address, phone: phone, email: email, cookie: $.cookie('admin') },
        type: "PATCH",
        datatype: "json",
        success: function (res) {
            alert("修改成功");
        },
        error: function (err) {
            if (err.status == "401") {
                $.removeCookie("admin");
                $('#loginModal').modal('show');
                $("#content-wrapper div").remove();
            }
        }
    });
}
