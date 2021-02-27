/*
function save_options() {
    var token = document.getElementById("input_token").value;
    localStorage["qoollab_user_token"] = token;

    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 1500);
    console.log(localStorage);
}

function restore_options() {
    var token = localStorage["qoollab_user_token"];
    if (!token) {
        return;
    }
    var input = document.getElementById("input_token");
    input.value = token;
}
document.addEventListener("DOMContentLoaded", restore_options);
document.querySelector("#save").addEventListener("click", save_options);
*/