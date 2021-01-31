import {removeAllBoards} from './remove-boards.js'
import * as gitlab from './gitlab-service.js'

removeAllBoards(document)

var pathName = window.location.pathname
var projectName = pathName.slice(1, pathName.indexOf('-') - 1)
console.log(projectName)
var origin = window.location.origin
var gitlabService = new gitlab.GitlabService(origin, projectName)
console.log(gitlabService)
gitlabService.getAllIssues()