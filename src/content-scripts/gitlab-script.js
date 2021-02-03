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
        qoollabCard.setAttribute("issue-id", issueId);                                    // сохранили id isuue как аттрибут <qoollab-card>
        oldIssueIdElement.parentElement.removeChild(oldIssueIdElement);                   // удалили id isuue
        var cardHeader = qoollabCard.querySelector("li > div > div:nth-child(1)");
        var issueIdElement = document.createElement('div');
        issueIdElement.textContent = "#" + issueId;
        issueIdElement.style = "color: rgba(146, 146, 146, 1); font-size: small; padding-left: 10px";
        cardHeader.appendChild(issueIdElement);
        cardHeader.setAttribute("style", "justify-content: space-between");

        var assigneElement = qoollabCard.getElementsByClassName("avatar")[0];             // перемещаем assigne в один flex с лейблами и увеличиваем аватарку
        assigneElement.style = "width: 40px; height: 40px; margin-right: 0";
        var cardBodyDiv = document.createElement('div');
        cardBodyDiv.style = "padding-left: 20px; margin-left: auto; margin-right: 0; margin-top: auto; margin-bottom: auto;";
        cardBodyDiv.appendChild(assigneElement);
        var labelsDiv = qoollabCard.getElementsByClassName("board-card-labels")[0];
        var cardBody = document.createElement('div');
        cardBody.style = "display: flex; align-items: center; margin-top: 5px"
        labelsDiv.parentElement.appendChild(cardBody);
        cardBody.appendChild(labelsDiv);
        cardBody.appendChild(cardBodyDiv);
        
        var cardFooter = qoollabCard.getElementsByClassName("board-card-footer")[0];        // board-card-footer уплыл вверх из-за append-child
        cardFooter.parentElement.appendChild(cardFooter);
    }
}, 2000);
