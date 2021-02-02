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
        var wrapper = document.createElement('qoollab-card');
        elements[i].parentNode.insertBefore(wrapper, elements[i]);
        wrapper.appendChild(elements[i]);
        var children = elements[i].getElementsByClassName("board-card-number");
        var strIssueId = children[0].innerHTML.toString().replace(/[^\d]/g, ''); // удаляем из innerHTML всё кроме цифр
        var issueId = Number.parseInt(strIssueId);
        wrapper.setAttribute("issue-id", issueId)
    }
}, 10000);
