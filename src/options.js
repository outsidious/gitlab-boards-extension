function save_options() {
    let token = document.getElementById("input_token").value;
    chrome.tabs.query({ url: "https://git.iu7.bmstu.ru/*" }, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            console.log(token);
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
