export function addQoollabParentTag(document, element) {
    let qoollabCard = document.createElement("qoollab-card");
    element.parentNode.insertBefore(qoollabCard, element);
    qoollabCard.appendChild(element);
    return qoollabCard;
}

export function setIssueIdAttribute(qoollabCard, element) {
    let oldIssueIdElement = element.getElementsByClassName(
        "board-card-number"
    )[0];
    let strIssueId = oldIssueIdElement.innerHTML
        .toString()
        .replace(/[^\d]/g, ""); // удаляем из innerHTML всё кроме цифр
    let issueId = Number.parseInt(strIssueId);
    qoollabCard.setAttribute("issue-id", issueId); // сохранили id isuue как аттрибут <qoollab-card>
    oldIssueIdElement.parentElement.removeChild(oldIssueIdElement); // удалили id isuue
    return issueId;
}

export function addIssueIdToCardHeader(document, qoollabCard, issueId) {
    let cardHeader = qoollabCard.querySelector("li > div > div:nth-child(1)");
    let issueIdElement = document.createElement("div");
    issueIdElement.textContent = "#" + issueId;
    issueIdElement.style =
        "color: rgba(146, 146, 146, 1); font-size: small; padding-left: 10px";
    cardHeader.appendChild(issueIdElement);
    cardHeader.setAttribute("style", "justify-content: space-between");
}

export function restructCardBody(document, qoollabCard) {
    let assigneElement = qoollabCard.getElementsByClassName("avatar")[0]; // перемещаем assigne в один flex с лейблами и увеличиваем аватарку
    if (assigneElement) {
        assigneElement.style =
            "width: 40px; height: 40px; margin-right: 0; max-width: none";
        //assigneElement.querySelector("img").style = "max-width: innerhit"
        let cardBodyDiv = document.createElement("div");
        cardBodyDiv.style =
            "padding-left: 20px; margin-left: auto; margin-right: 0; margin-top: auto; margin-bottom: auto;";
        cardBodyDiv.appendChild(assigneElement);
        let labelsDiv = qoollabCard.getElementsByClassName(
            "board-card-labels"
        )[0];
        let cardBody = document.createElement("div");
        cardBody.style = "display: flex; align-items: center; margin-top: 5px";
        let labelsDivParent = qoollabCard.querySelector("li > div");
        labelsDivParent.appendChild(cardBody);
        if (labelsDiv) cardBody.appendChild(labelsDiv);
        cardBody.appendChild(cardBodyDiv);
    }
}
