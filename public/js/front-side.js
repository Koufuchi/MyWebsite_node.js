getCarousel();        //呼叫getCarousel()方法
getGain();
getTeam();
getActivity();
getAllActivity();
getContact();
getOwner();
getBusiness();
getEnvironment();
getSkill();

var i;
//取得輪播圖內容
function getCarousel() {  
    $.get("/carousel", function (res, status) {  //使用GET方法取得輪播圖的Carousel API
        for (i = 0; i < res.data.length; i++) {  //for迴圈取得輪播圖資料
            if (i == 0) {             //若為第一筆資料，將預設的第一張圖片路徑與標題內容改為第一筆資料
                $("#carousel-img0").css("background-image",　						`url('../images${res.data[i].image}')`);
                $("#carousel-title0").text(res.data[i].title);
            }
            else{                     //不只一筆則生成新的輪播圖片、按鈕、標題
                $("#carousel-li").append(
　　　　　　　　　`<li data-target="#carouselExampleIndicators" data-slide-to=${i}"></li>`);
                $("#carousel-row").append(
                   `<div class="carousel-item" style="background-image: url('../images${res.data[i].image}');">
	                    <div class="carousel-caption d-none d-md-block">
	                        <h3>${res.data[i].title}</h3>
	                    </div>
	                </div>`);
	        }
	    }
	});
}

//取得公司成果
function getGain() {
    $.get("/gain", function (res, status) {
        for (i = 0; i < res.data.length; i++) {
            $("#gain").append(
                `<div class="row">
                    <div class="col-md-5">
                        <img class="img-set" src="../images${res.data[i].image}">
                    </div>
                    <div class="col-md-7">
                        <h3>${res.data[i].title}</h3>
                        <p>${res.data[i].content}</p>
                    </div>
                </div>`
            );
            if(i != (res.data.length - 1)){
                $("#gain").append(`<hr>`);
            }
        }
    });
}

//取得團隊成員
function getTeam() {
    $.get("/team", function (res, status) {        //使用GET方法取得團隊成員的team API
        for (i = 0; i < res.data.length; i++) {    //for迴圈逐一取得
            $("#team").append(                     //使用append()方法生成成員頭像&姓名
                `<div class="col">
                    <a href="#"><img class="rounded-circle img-fluid d-block mx-auto" src="../images${res.data[i].avatar}"></a>
                    <br>
                    <h4 class="text-center">${res.data[i].name}
                </div>`
            );
        }
    });
}

//取得首頁活動紀錄(4筆)
function getActivity() {
    $.get("/activity", function (res, status) {
        for (i = 0; i < 4; i++) {
            $("#activity").append(
                `<div class="col-lg-6 portfolio-item">
                    <div class="card h-100">
                        <img class="card-img-top" src="../images${res.data[i].image}">
                        <div class="card-body">
                            <h4 class="card-title">${res.data[i].title}</h4>
                            <p class="card-text">${res.data[i].content}</p>
                        </div>
                    </div>
                </div>`
            );
        }
    });
}

//取得全部活動紀錄
function getAllActivity() {
    $.get("/activity", function (res, status) {
        for (i = 0; i < res.data.length; i++) {
            $("#activity-row").append(`
            <div class="col-lg-6 portfolio-item">
                <div class="card h-100"><img class="card-img-top" src="../images${res.data[i].image}" alt="">
                    <div class="card-body">
                        <h4 class="card-title">${res.data[i].title}</h4>
                        <p class="card-text">${res.data[i].content}</p>
                    </div>
                </div>
            </div>`);
        }
    });
}

//取得聯絡資訊
function getContact() {
    $.get("/contact", function (res, status) {
        console.log(res.data);
        $("#address").text(res.data.address);
        $("#phone").text(res.data.phone);
        $("#email").text(res.data.email);
    });
}

//取得負責人資訊
function getOwner() {
    $.get("/owner", function (res, status) {
        console.log(res.data);
        $("#o_image").attr("src", `../images${res.data.image}`);
        $("#o_name").text(res.data.name);
        $("#o_job").text(res.data.job);
        $("#o_phone").text(res.data.phone);
        $("#o_email").text(res.data.email);
    });
}

//取得業務範圍
function getBusiness() {
    $.get("/business", function (res, status) {
        for (i = 0; i < res.data.length; i++) {
            $("#business-row").append(`
            <div class="col-lg-5 col-md-6 mb-2">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">${res.data[i].name}</h4>
                        <p class="card-text">${res.data[i].content}</p>
                    </div>
                </div>
            </div>`);
        }
    });
}

//取得公司環境
function getEnvironment() {
    $.get("/environment", function (res, status) {
        for (i = 0; i < res.data.length; i++) {
            $("#environment-row").append(`
            <div class="col-lg-3 col-md-4 col-xs-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="../images${res.data[i].image}">
                    <p>${res.data[i].title}</p>
                </div>
            </div>`);
        }
    })
}

//取得技術領域
function getSkill() {
    $.get("/skill", function (res, status) {
        for (i = 0; i < res.data.length; i++) {
            $("#skill-row").append(`
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <img class="card-img-top" src="../images${res.data[i].image}">
                    <div class="card-body">
                        <h4 class="card-title">${res.data[i].title}</h4>
                        <p class="card-text">${res.data[i].content}</p>
                    </div>
                </div>
            </div>`);
        }
    })
}