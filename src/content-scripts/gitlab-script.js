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
    }
}, 1000);
