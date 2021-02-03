import * as gitlab from "./gitlab-service.js";

var pathName = window.location.pathname;
var projectName = pathName.slice(1, pathName.indexOf("/-/"));
//console.log(projectName);
var origin = window.location.origin;
var gitlabService = new gitlab.GitlabService(origin, projectName);
//console.log(gitlabService);
gitlabService.getAllIssues()


setTimeout(() => {
    var elements = document.getElementsByClassName("board-card");
    for (var i = 0; i < elements.length; ++i) {
        var qoollabCard = document.createElement('qoollab-card');
        elements[i].parentNode.insertBefore(qoollabCard, elements[i]);
        qoollabCard.appendChild(elements[i]);
        var oldIssueIdElement = elements[i].getElementsByClassName("board-card-number")[0];
        var strIssueId = oldIssueIdElement.innerHTML.toString().replace(/[^\d]/g, '');    // удаляем из innerHTML всё кроме цифр
        var issueId = Number.parseInt(strIssueId);
        qoollabCard.setAttribute("issue-id", issueId);                                // сохранили id isuue как аттрибут <qoollab-card>
        oldIssueIdElement.parentElement.removeChild(oldIssueIdElement);                          // удалили id isuue
        var cardHeader = qoollabCard.querySelector("li > div > div:nth-child(1)");
        var issueIdElement = document.createElement('div');
        issueIdElement.textContent = "#" + issueId;
        issueIdElement.style = "color: rgba(146, 146, 146, 1); font-size: small; padding-left: 10px";
        cardHeader.appendChild(issueIdElement);
        cardHeader.setAttribute("style", "justify-content: space-between");
    }
}, 2000);
