let previewArr = [
    {
        boardsPageURL:
            "https://git.qoollo.com/rosstat/frontend/web-client/-/boards",
        backendURL: "http://10.5.5.56:8081",
    },
];
window.localStorage["qoollab_preview_arr"] = JSON.stringify(previewArr);

const deleteIcon = chrome.extension.getURL(require(`./assets/delete.svg`));
const addIcon = chrome.extension.getURL(require(`./assets/add.svg`));

document.addEventListener("DOMContentLoaded", function() {
    const icon = chrome.extension.getURL(require(`./assets/logo3.svg`));
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = "url(" + "'" + icon + "')";
    body.style.backgroundRepeat = "repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "100% 100%";

    const addIconButton = document.getElementById("add-image");
    addIconButton.src = addIcon;
    addIconButton.parentElement.addEventListener("click", addButtonHandler);

    let inputTokenField = document.getElementById("input_token");
    let inputTimeField = document.getElementById("input_time");
    if (
        window.localStorage["qoollab_user_token"] &&
        window.localStorage["qoollab_user_token"] != ""
    ) {
        inputTokenField.value = window.localStorage["qoollab_user_token"].slice(
            1,
            -1
        );
    }
    if (!window.localStorage["qoollab_update_time"]) {
        window.localStorage["qoollab_update_time"] = 60;
    }
    inputTimeField.value = window.localStorage["qoollab_update_time"];
    let previewTable = document.getElementById("preview-table");
    if (window.localStorage["qoollab_preview_arr"]) {
        processPreviewTable(
            previewTable,
            JSON.parse(window.localStorage["qoollab_preview_arr"])
        );
    }

    function processPreviewTable(table, arr) {
        arr.forEach((elem) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            td3.classList.add("table-button");
            td1.innerHTML = elem.boardsPageURL;
            td2.innerHTML = elem.backendURL;
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-button");
            removeButton.innerHTML = "<img src='" + deleteIcon + "'>";
            td3.appendChild(removeButton);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            table.appendChild(tr);
            removeButton.addEventListener("click", removeButtonHandler, false);
        });
    }

    function removeButtonHandler(e) {
        const tr = e.path[3];
        const i = tr.rowIndex;
        tr.parentElement.deleteRow(i);
    }

    function addButtonHandler() {
        const table = document.getElementById("preview-table");
        const qua = table.rows.length;
        const raw = table.insertRow(qua);
        const cell1 = raw.insertCell(0);
        const cell2 = raw.insertCell(1);
        const cell3 = raw.insertCell(2);
        cell3.classList.add("table-button");
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.innerHTML = "<img src='" + deleteIcon + "'>";
        cell3.appendChild(removeButton);
        removeButton.addEventListener("click", removeButtonHandler, false);

        const inputUrlPage = document.createElement("input");
        inputUrlPage.classList.add("table-input");
        cell1.appendChild(inputUrlPage);
        const inputUrlBackend = document.createElement("input");
        inputUrlBackend.classList.add("table-input");
        cell2.appendChild(inputUrlBackend);
    }

    function savePreviewTable() {
        const table = document.getElementById("preview-table");
        previewArr = [];
        for (let i = 1; i < table.rows.length; ++i) {
            let row = table.rows[i];
            if (
                row.cells[0].innerHTML === "" ||
                row.cells[1].innerHTML === ""
            ) {
                let i = row.rowIndex;
                table.deleteRow(i);
            }
            previewArr.push({
                boardsPageURL:
                    row.cells[0].innerHTML,
                backendURL: row.cells[1].innerHTML,
            });
        }
        window.localStorage["qoollab_preview_arr"] = JSON.stringify(previewArr);
    }

    function save_options() {
        const inputTokenField = document.getElementById("input_token");
        const inputTimeField = document.getElementById("input_time");
        const arr = Array.from(document.getElementsByClassName("table-input"));
        arr.forEach((input) => {
            input.parentElement.innerHTML = input.value;
        });
        savePreviewTable();
        const token = inputTokenField.value;
        const time = Number(inputTimeField.value);
        window.localStorage["qoollab_user_token"] = JSON.stringify(token);
        window.localStorage["qoollab_update_time"] = time;
        /*
        Надо сделать все необходимые url-паттерны
        */
        chrome.tabs.query({ url: "https://git.iu7.bmstu.ru/*" }, function(
            tabs
        ) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {
                    code:
                        'window.localStorage["qoollab_user_token"] = ' +
                        JSON.stringify(token) +
                        ";" +
                        'window.localStorage["qoollab_update_time"] = ' +
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
