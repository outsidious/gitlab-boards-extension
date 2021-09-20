let previewArr = [
    {
        boardsPageURL:
            "https://git.qoollo.com/rosstat/frontend/web-client/-/boards",
        backendURL: "http://10.5.5.56:8081",
    },
];
let domainsArr = ["git.qoollo.com", "gitlab.com"];

window.localStorage["qoollab_preview_arr"] = JSON.stringify(previewArr);
window.localStorage["qoollab_domains_arr"] = JSON.stringify(domainsArr);

const deleteIcon = chrome.extension.getURL(require(`./assets/delete.svg`));
const addIcon = chrome.extension.getURL(require(`./assets/add.svg`));

document.addEventListener("DOMContentLoaded", function() {
    const icon = chrome.extension.getURL(require(`./assets/logo3.svg`));
    const body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = `url('${icon}')`;
    body.style.backgroundRepeat = "repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "100% 100%";

    const addIconButtons = document.getElementsByClassName("add-image");
    addIconButtons.forEach((button) => {
        button.src = addIcon;
        button.parentElement.addEventListener("click", addButtonHandler);
    });
    const inputTokenField = document.getElementById("input_token");
    const inputTimeField = document.getElementById("input_time");
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
    const previewTable = document.getElementById("preview-table");
    const domainsTable = document.getElementById("domains-table");
    if (window.localStorage["qoollab_preview_arr"]) {
        processPreviewTable(
            previewTable,
            JSON.parse(window.localStorage["qoollab_preview_arr"])
        );
    }
    if (window.localStorage["qoollab_domains_arr"]) {
        processDomainsTable(
            domainsTable,
            JSON.parse(window.localStorage["qoollab_domains_arr"])
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
            removeButton.innerHTML = `<img src='${deleteIcon}'>`;
            td3.appendChild(removeButton);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            table.appendChild(tr);
            removeButton.addEventListener("click", removeButtonHandler, false);
        });
    }

    function processDomainsTable(table, arr) {
        arr.forEach((elem) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            td2.classList.add("table-button");
            td1.innerHTML = elem;
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-button");
            removeButton.innerHTML = `<img src='${deleteIcon}'>`;
            td2.appendChild(removeButton);
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
            removeButton.addEventListener("click", removeButtonHandler, false);
        });
    }

    function removeButtonHandler(e) {
        let tr = e.path[3];
        if (e.path[0].tagName == "BUTTON") tr = e.path[2];
        const i = tr.rowIndex;
        tr.parentElement.deleteRow(i);
    }

    function addButtonHandler(e) {
        const table = e.path[0].closest("table");
        const qua = table.rows.length;
        const rawSize = table.rows[0].cells.length;
        const raw = table.insertRow(qua);
        for (let i = 0; i < rawSize; ++i) {
            const cell = raw.insertCell(i);
            if (i == rawSize - 1) {
                cell.classList.add("table-button");
                const removeButton = document.createElement("button");
                removeButton.classList.add("remove-button");
                removeButton.innerHTML = `<img src='${deleteIcon}'>`;
                cell.appendChild(removeButton);
                removeButton.addEventListener(
                    "click",
                    removeButtonHandler,
                    false
                );
            } else {
                const inputUrlPage = document.createElement("input");
                inputUrlPage.classList.add("table-input");
                cell.appendChild(inputUrlPage);
            }
        }
    }

    function savePreviewTable() {
        const table = document.getElementById("preview-table");
        previewArr = [];
        let i = 1;
        while (i < table.rows.length) {
            const row = table.rows[i];
            if (
                !row.cells[0].innerHTML.includes("/boards") ||
                row.cells[1].innerHTML === ""
            ) {
                table.deleteRow(i);
                i = i - 1;
            } else {
                let pageUrl = row.cells[0].innerHTML;
                const index = pageUrl.indexOf("/boards") + "/boards".length;
                pageUrl = pageUrl.slice(0, index);
                row.cells[0].innerHTML = pageUrl;
                previewArr.push({
                    boardsPageURL: pageUrl,
                    backendURL: row.cells[1].innerHTML,
                });
            }
            i += 1;
        }
        window.localStorage["qoollab_preview_arr"] = JSON.stringify(previewArr);
    }

    function saveDomainsTable() {
        const table = document.getElementById("domains-table");
        domainsArr = [];
        let i = 1;
        while (i < table.rows.length) {
            const row = table.rows[i];
            if (row.cells[0].innerHTML === "") {
                table.deleteRow(i);
                i = i - 1;
            } else {
                domainsArr.push(row.cells[0].innerHTML);
            }
            i += 1;
        }
        window.localStorage["qoollab_domains_arr"] = JSON.stringify(domainsArr);
    }

    function save_options() {
        const inputTokenField = document.getElementById("input_token");
        const inputTimeField = document.getElementById("input_time");
        const arr = [...document.getElementsByClassName("table-input")];
        arr.forEach((input) => {
            input.parentElement.innerHTML = input.value;
        });
        savePreviewTable();
        saveDomainsTable();
        const token = inputTokenField.value;
        const time = Number(inputTimeField.value);
        window.localStorage["qoollab_user_token"] = JSON.stringify(token);
        window.localStorage["qoollab_update_time"] = time;
        chrome.tabs.query({ url: "https://*/*/boards*" }, function(tabs) {
            tabs.forEach((tab) => {
                chrome.tabs.executeScript(tab.id, {
                    code: `window.localStorage["qoollab_user_token"] = ${JSON.stringify(
                        token
                    )};\n
                        window.localStorage["qoollab_update_time"] = ${time};\n
                        window.localStorage["qoollab_preview_arr"] = ${JSON.stringify(
                            window.localStorage["qoollab_preview_arr"]
                        )};\n
                        window.localStorage["qoollab_domains_arr"] = ${JSON.stringify(
                            window.localStorage["qoollab_domains_arr"]
                        )};\n`,
                });
            });
        });

        const status = document.getElementById("status");
        status.innerHTML = "Info was updated.";
        setTimeout(function() {
            status.innerHTML = "";
        }, 2000);
    }

    document.querySelector("#save").addEventListener("click", save_options);
});
