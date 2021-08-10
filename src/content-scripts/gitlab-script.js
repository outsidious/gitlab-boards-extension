import * as restruct from "./restruct-card";
import Vue from "vue";
import "vue-material-design-icons/styles.css";
import CardFooterComponent from "./components/CardFooterComponent";
import Milestone from "./components/Milestone";
import MergeRequest from "./components/MergeRequest";
import Approve from "./components/Approve";
import HiddenPart from "./components/HiddenPart";
import ButtonMore from "./components/ButtonMore";
import Actions from "./components/Actions";
import Details from "./components/Details";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Vue.use(VueMaterial);
Vue.component("milestone-component", Milestone);
Vue.component("merge-request", MergeRequest);
Vue.component("approve", Approve);
Vue.component("hidden-part", HiddenPart);
Vue.component("button-more", ButtonMore);
Vue.component("actions", Actions);
Vue.component("details-comp", Details);

chrome.extension.onMessage.addListener(function(msg) {
    if (msg.action == "move-card") {
        let elements = document.getElementsByClassName("board-card");
        for (let i = 0; i < elements.length; ++i) {
            if (elements[i].getAttribute("data-issue-id") === msg.issue)
                processCard(elements[i]);
        }
    }
});

function processCard(qoollabCard) {
    const issueId = restruct.setIssueIdAttribute(qoollabCard);
    if (issueId != -1) {
        restruct.addUpdateIconToCardHeader(document, qoollabCard);
        restruct.addIssueIdToCardHeader(document, qoollabCard, issueId);
        restruct.restructCardBody(document, qoollabCard);

        const cardFooter = qoollabCard.querySelector(".board-card-footer");
        cardFooter.setAttribute("id", "card-footer" + issueId);
        cardFooter.parentElement.appendChild(cardFooter);
        for (let child of cardFooter.children) {
            child.remove();
        }
        new Vue({
            el: "#card-footer" + issueId,
            render: (h) => h(CardFooterComponent),
        });
    }
}

setInterval(() => {
    let cards = document.getElementsByClassName("board-card");
    for (let card of cards) {
        /*let qoollabCard = restruct.addQoollabParentTag(document, elements[i]);*/
        processCard(card);
    }
}, 2000);
