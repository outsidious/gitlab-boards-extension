import * as restruct from "./restruct-card";
import "vue-material-design-icons/styles.css";
import "vue-material/dist/vue-material.min.css";
import Vue from "vue";
import VueMaterial from "vue-material";
import CardFooterComponent from "./components/CardFooterComponent";
import Milestone from "./components/Milestone";
import MergeRequest from "./components/MergeRequest";
import Approve from "./components/Approve";
import HiddenPart from "./components/HiddenPart";
import ButtonMore from "./components/ButtonMore";
import Actions from "./components/Actions";
import Details from "./components/Details";

Vue.use(VueMaterial);
Vue.component("milestone-component", Milestone);
Vue.component("merge-request", MergeRequest);
Vue.component("approve", Approve);
Vue.component("hidden-part", HiddenPart);
Vue.component("button-more", ButtonMore);
Vue.component("actions", Actions);
Vue.component("details-comp", Details);

function processCard(qoollabCard) {
    const issueId = restruct.setIssueIdAttribute(qoollabCard);
    if (issueId != -1) {
        restruct.addUpdateIconToCardHeader(document, qoollabCard);
        restruct.addIssueIdToCardHeader(document, qoollabCard, issueId);
        restruct.addLinkPreviewToCard(qoollabCard);
        restruct.restructCardBody(document, qoollabCard);
        const cardFooter = qoollabCard.querySelector(".board-card-footer");
        cardFooter.setAttribute("id", `card-footer${issueId}`);
        cardFooter.parentElement.appendChild(cardFooter);
        cardFooter.children.forEach((child) => {
            child.remove();
        });
        new Vue({
            el: `#card-footer${issueId}`,
            render: (h) => h(CardFooterComponent),
        });
    }
}

function processCards() {
    const cards = document.getElementsByClassName("board-card");
    cards.forEach((card) => {
        const board = card.parentElement.parentElement.parentElement;
        const title = board.querySelector(
            "header > h3 > div.board-title-text > span"
        );
        if (title.getAttribute("title") !== "Closed") processCard(card);
    });
}

export function startRendering() {
    const timerId = setInterval(() => {
        const cards = document.getElementsByClassName("board-card");
        let loaded = true;
        cards.forEach((card) => {
            if (
                card.querySelectorAll("span[aria-label='Loading']").length != 0
            ) {
                loaded = false;
            }
        });
        if (loaded) {
            clearInterval(timerId);
            setTimeout(() => {
                processCards();
            }, 300);
        }
    }, 1000);

    chrome.extension.onMessage.addListener(function(msg) {
        if (msg.action === "move-card") {
            const elements = document.getElementsByClassName("board-card");
            elements.forEach((elem) => {
                if (elem.getAttribute("data-issue-id") === msg.issue)
                    processCard(elem);
            });
        }
    });
}
