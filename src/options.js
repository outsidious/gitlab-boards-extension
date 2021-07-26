function save_options() {
    let token = document.getElementById("input_token").value;
    /*
    Надо сделать все необходимые url-паттерны
    */
    chrome.tabs.query({ url: "https://gitlab.com/*" }, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.executeScript(tabs[i].id, {
                code:
                    'window.localStorage["qoollab_user_token"] = ' +
                    JSON.stringify(token) +
                    ";",
            });
        }
    });

    let status = document.getElementById("status");
    status.innerHTML = "New token saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 1500);
}

document.querySelector("#save").addEventListener("click", save_options);
