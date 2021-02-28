import * as restruct from "./restruct-card";
import Vue from "vue";
import "vue-material-design-icons/styles.css";
import CardFooterComponent from "./components/CardFooterComponent";
import Milestone from "./components/Milestone";
import MergeRequest from "./components/MergeRequest";
import Approve from "./components/Approve";
import HiddenPart from "./components/HiddenPart";
import VueMaterial from "vue-material";

setTimeout(() => {
    let elements = document.getElementsByClassName("board-card");
    for (let i = 0; i < elements.length; ++i) {
        let qoollabCard = restruct.addQoollabParentTag(document, elements[i]);
        let issueId = restruct.setIssueIdAttribute(qoollabCard, elements[i]);
        restruct.addIssueIdToCardHeader(document, qoollabCard, issueId);
        restruct.restructCardBody(document, qoollabCard);

        let cardFooter = qoollabCard.getElementsByClassName(
            "board-card-footer"
        )[0];
        cardFooter.setAttribute("id", "card-footer" + issueId);
        cardFooter.parentElement.appendChild(cardFooter);
        while (cardFooter.firstChild) {
            cardFooter.removeChild(cardFooter.firstChild);
        }

        Vue.use(VueMaterial);
        Vue.component("milestone-component", Milestone);
        Vue.component("merge-request", MergeRequest);
        Vue.component("approve", Approve);
        Vue.component("hidden-part", HiddenPart);
        new Vue({
            el: "#card-footer" + issueId,
            render: (h) => h(CardFooterComponent),
        });
    }
}, 1000);
