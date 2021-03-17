function save_options() {
    let token = document.getElementById("input_token").value;
    window.localStorage["qoollab_user_token"] = token;
    chrome.tabs.query({ url: "https://git.iu7.bmstu.ru/*" }, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        console.log(token);
        chrome.tabs.executeScript(tabs[i].id, {
            code: 'window.localStorage["qoollab_user_token"] = '+ JSON.stringify(token) + ';',
        });
    }
});

    let status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 1500);
    //console.log(chrome.tabs);
}

function restore_options() {
    let token = window.localStorage["qoollab_user_token"];
    if (!token) {
        return;
    }
    let input = document.getElementById("input_token");
    input.value = token;
}
document.addEventListener("DOMContentLoaded", restore_options);
document.querySelector("#save").addEventListener("click", save_options);
