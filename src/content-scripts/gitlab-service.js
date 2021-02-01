var $ = require("jquery");
 
export function GitlabService(urlOrigin, projectName) {
    this.origin = urlOrigin;
    this.projectId = projectName.replace("/", "%2F"); //formated project name might be used as id
    this.apiURL = "/api/v4/projects/";

    this.getAllIssues = function() {
        var url =
            this.origin + this.apiURL + this.projectId + "/issues/?scope=all";
        $.get(url, function(data) {
            //console.log(data)
            data.toString
        });
    };
}
