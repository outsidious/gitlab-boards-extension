document.addEventListener("DOMContentLoaded", function() {
    const icon = chrome.extension.getURL(require(`./assets/logo3.svg`));
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = "url(" + "'" + icon + "')";
    body.style.backgroundRepeat = "repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "100% 100%";

    let input = document.getElementById("input_token");
    if (
        window.localStorage["qoollab_user_token"] &&
        window.localStorage["qoollab_user_token"] != ""
    ) {
        input.value = window.localStorage["qoollab_user_token"].slice(1, -1);
    }

    function save_options() {
        const inputField = document.getElementById("input_token");
        let token = inputField.value;
        window.localStorage["qoollab_user_token"] = JSON.stringify(token);
        /*
    Надо сделать все необходимые url-паттерны
    */
        chrome.tabs.query({ url: "https://git.iu7.bmstu.ru/*" }, function(tabs) {
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
        }, 2000);
    }

    document.querySelector("#save").addEventListener("click", save_options);
});
