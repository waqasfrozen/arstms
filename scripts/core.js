var userid = '';
var userData = '';
var urlToPass = "http://devlabx.com/tms_upd_forAndroid/index.php/";
var urlForAssets = "http://devlabx.com/tms_upd/";
setTimeout(function(){
    var userValidation = window.localStorage.getItem("tms_user");
    if(userValidation == "" || userValidation == null){
        window.location.href = "login.html";
    }else{
        userData = JSON.parse(userValidation);
        userid = userData[0].id;
        if(userData[0].availablity_status == 'online'){
            $("#availabilityStatusAvailable").css("font-weight","bolder !important")
            $("#availabilityStatusAvailable").css("color","green")
            $("#availabilityStatusNotAvailable").css("font-weight","400")
            $("#availabilityStatusNotAvailable").css("color","#6B757D")
        }else{
            $("#availabilityStatusNotAvailable").css("font-weight","bolder !important")
            $("#availabilityStatusNotAvailable").css("color","green")
            $("#availabilityStatusAvailable").css("font-weight","400")
            $("#availabilityStatusAvailable").css("color","#6B757D")
        }
        $("#qualification").html(userData[0].qualification);
        $(".status_availability").html(userData[0].availablity_status);
        $("#joiningDate").html(userData[0].joining);
        $("#tutorGender").html(userData[0].gender);
        $("#tutorSubject").html(userData[0].subjects);
        $(".tutorName").html(userData[0].name + " " + userData[0].lname);
        $(".tutorImage").attr("data-original",urlForAssets + userData[0].profile_pic);
        $(".tutorImage").attr("src",urlForAssets + userData[0].profile_pic);
        sendingLoc();
    }
    var pageValidation = window.location.hash;
    if(pageValidation == ''){

    }else{
        var newPage = pageValidation.replace("#","");
        loadPage(newPage);
    }
},1000);

function logout(){
    $.post(urlToPass + "android/ajax/changeStatus",{id : userData[0].id , status:status},function(e){
        window.localStorage.clear();
        window.location.reload();
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    $.post(urlToPass + "android/ajax/SendLocation",{ id : userid , lat:position.coords.latitude,lon:position.coords.longitude},function(e){
        //console.log(e);
    });
}
function getInboxMsg(){
    var id = window.location.hash;
    id = id.replace("#","");
    $.post(urlToPass + "android/tutor_chat/tutor_message_detail",{other : id , me : userData[0].id},function(e){
        $(".msg").html(e);
    });
}
function sendMsg(){
    var id = window.location.hash;
    id = id.replace("#","");
    var msg = $("#newMsg").val();
    $.post(urlToPass + "android/tutor_chat/sendMessage",{msg:msg,to:id,from:userData[0].id},function(a){
        $("#newMsg").val(" ");
    });
}
function getInbox(){
    $.post(urlToPass + "android/tutor_chat/getRecepients",{id : userData[0].id},function(e){
        $("#msgs").html(e);
    });
}

$.post('header.html',{},function(e){
    $(".appNavigationBar").html(e);
})

function changeStatus(status){
    $.post(urlToPass + "android/ajax/changeStatus",{id : userData[0].id , status:status},function(e){
        console.log(e);
        e = e.trim();
        window.localStorage.setItem("tms_user",e);
        window.location.reload();
    });
}