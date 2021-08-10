document.addEventListener("DOMContentLoaded", function() {
    const icon = chrome.extension.getURL(require(`./assets/logo3.svg`));
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = "url(" + "'" + icon + "')";
    body.style.backgroundRepeat = "repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "100% 100%";

    let inputTokenField = document.getElementById("input_token");
    let inputTimeField = document.getElementById("input_time");
    if (
        window.localStorage["qoollab_user_token"] &&
        window.localStorage["qoollab_user_token"] != ""
    ) {
        inputTokenField.value = window.localStorage["qoollab_user_token"].slice(1, -1);
    }
    if (window.localStorage["qoollab_update_time"]) {
        inputTimeField.value = window.localStorage["qoollab_update_time"];
    }

    function save_options() {
        const inputTokenField = document.getElementById("input_token");
        const inputTimeField = document.getElementById("input_time");
        const token = inputTokenField.value;
        const time = Number(inputTimeField.value);
        window.localStorage["qoollab_user_token"] = JSON.stringify(token);
        window.localStorage["qoollab_update_time"] = time;
        /*
        Надо сделать все необходимые url-паттерны
        */
        chrome.tabs.query({ url: "https://git.iu7.bmstu.ru/*" }, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {
                    code:
                        'window.localStorage["qoollab_user_token"] = ' +
                        JSON.stringify(token) +
                        ";"
                        + 'window.localStorage["qoollab_update_time"] = ' +
                        time +
                        ";",
                });
            }
        });

        let status = document.getElementById("status");
        status.innerHTML = "Info was updated.";
        setTimeout(function() {
            status.innerHTML = "";
        }, 2000);
    }

    document.querySelector("#save").addEventListener("click", save_options);
});
