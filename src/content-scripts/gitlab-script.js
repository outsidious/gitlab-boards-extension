import * as gitlab from "./gitlab-service.js";
import * as restruct from "./restruct-card";
import Vue from "vue";
import "vue-material-design-icons/styles.css";
import CardFooterComponent from "./components/CardFooterComponent";
import Milestone from "./components/Milestone";
import MergeRequest from "./components/MergeRequest";
import Approve from "./components/Approve";
import VueMaterial from 'vue-material'

var pathName = window.location.pathname;
var projectName = pathName.slice(1, pathName.indexOf("/-/"));
//console.log(projectName);
var origin = window.location.origin;
var gitlabService = new gitlab.GitlabService(origin, projectName);
//console.log(gitlabService);
gitlabService.getAllIssues();

setTimeout(() => {
    var elements = document.getElementsByClassName("board-card");
    for (var i = 0; i < elements.length; ++i) {
        var qoollabCard = restruct.addQoollabParentTag(document, elements[i]);
        var issueId = restruct.setIssueIdAttribute(qoollabCard, elements[i]);
        restruct.addIssueIdToCardHeader(document, qoollabCard, issueId);
        restruct.restructCardBody(document, qoollabCard);

        var cardFooter = qoollabCard.getElementsByClassName(
            "board-card-footer"
        )[0]; // board-card-footer уплыл вверх из-за append-child
        cardFooter.setAttribute("id", "card-footer" + issueId);
        cardFooter.parentElement.appendChild(cardFooter);
        while (cardFooter.firstChild) {
            cardFooter.removeChild(cardFooter.firstChild);
        }

        //var milestoneElement = document.createElement("div");
        //milestoneElement.setAttribute("id", "app");
        //cardFooter.appendChild(milestoneElement);

        
        Vue.use(VueMaterial);
        Vue.component("milestone-component", Milestone);
        Vue.component("merge-request", MergeRequest);
        Vue.component("approve", Approve);
        new Vue({
            el: "#card-footer" + issueId,
            render: (h) => h(CardFooterComponent),
        });

        
    }
}, 3000);
