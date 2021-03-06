export function addQoollabParentTag(document, element) {
    const qoollabCard = document.createElement("qoollab-card");
    element.parentNode.insertBefore(qoollabCard, element);
    qoollabCard.appendChild(element);
    return qoollabCard;
}

export function setIssueIdAttribute(qoollabCard) {
    const oldIssueIdElement = qoollabCard.getElementsByClassName(
        "board-card-number"
    )[0];
    if (oldIssueIdElement && qoollabCard) {
        const strIssueId = oldIssueIdElement.innerHTML
            .toString()
            .split("#")[1]
            .replace(/[^\d]/g, ""); // удаляем из innerHTML всё кроме цифр
        const issueId = Number.parseInt(strIssueId);
        qoollabCard.setAttribute("issue-id", issueId); // сохранили id isuue как аттрибут <qoollab-card>
        oldIssueIdElement.parentElement.removeChild(oldIssueIdElement); // удалили id isuue
        return issueId;
    }
    return -1;
}

export function addIssueIdToCardHeader(document, qoollabCard, issueId) {
    const cardHeader = qoollabCard.querySelector("div > div:nth-child(1)");
    const issueIdElement = document.createElement("div");
    issueIdElement.textContent = `#${issueId}`;
    issueIdElement.style =
        "color: rgba(146, 146, 146, 1); font-size: small; padding-left: 10px;";
    issueIdElement.classList.add("board-card-number");
    cardHeader.appendChild(issueIdElement);
    cardHeader.setAttribute("style", "justify-content: space-between");
}

export function addLinkPreviewToCard(card) {
    const issueId = card.querySelector(".board-card-number");
    const issueIdCon = issueId.parentElement;
    const newIdAndLinkCon = document.createElement("div");
    issueIdCon.removeChild(issueId);
    newIdAndLinkCon.appendChild(issueId);
    newIdAndLinkCon.style = "display: flex; align-items: center";
    const link = document.createElement("a");
    link.style.pointerEvents = "none";
    link.style.cursor = "default";
    link.style.display = "inline-flex";
    link.target = "_blank";
    link.classList.add("preview-link");
    const imgDiv = document.createElement("div");
    imgDiv.style =
        "display: flex; width: 100%; height: 100%; align-items: center";
    link.appendChild(imgDiv);
    const img = document.createElement("img");
    img.style.height = "12px";
    img.style.width = "12px";
    img.style.marginLeft = "7px";
    img.style.opacity = "0.5";
    img.src = "https://static.thenounproject.com/png/3629744-200.png";
    imgDiv.append(img);
    newIdAndLinkCon.appendChild(link);
    issueIdCon.appendChild(newIdAndLinkCon);
}

export function addUpdateIconToCardHeader(document, qoollabCard) {
    const icon = chrome.extension.getURL(
        require(`../assets/sprite_icons/retry.svg`)
    );
    const cardHeader = qoollabCard.querySelector("div > div:nth-child(1)");
    const issueLink = cardHeader.querySelector(".board-card-title");
    issueLink.style.fontSize = "15px";
    issueLink.parentElement.removeChild(issueLink);
    const elemIcon = document.createElement("img");
    elemIcon.src = icon;
    elemIcon.style =
        "width: 14px; height: 14px; min-width: 14px; min-height: 14px";
    const divIcon = document.createElement("div");
    divIcon.classList.add("retry-icon");
    divIcon.style = "margin-left: 8px;";
    divIcon.appendChild(elemIcon);
    const divIconLink = document.createElement("div");
    divIconLink.style =
        "display: flex; align-items: center; cursor: pointer; max-width: 80%";
    divIconLink.appendChild(issueLink);
    divIconLink.appendChild(divIcon);
    cardHeader.appendChild(divIconLink);
}

export function restructCardBody(document, qoollabCard) {
    const assigneElement = qoollabCard.getElementsByClassName("avatar")[0]; // перемещаем assigne в один flex с лейблами и увеличиваем аватарку
    if (assigneElement) {
        assigneElement.style =
            "width: 40px; height: 40px; margin-right: 0; max-width: none";
        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.style =
            "padding-left: 20px; margin-left: auto; margin-right: 0; margin-top: auto; margin-bottom: auto;";
        cardBodyDiv.appendChild(assigneElement);
        const labelsDiv = qoollabCard.querySelector(".board-card-labels");
        const cardBody = document.createElement("div");
        cardBody.style = "display: flex; align-items: center; margin-top: 5px";
        const labelsDivParent = qoollabCard.querySelector("div");
        labelsDivParent.appendChild(cardBody);
        if (labelsDiv) cardBody.appendChild(labelsDiv);
        cardBody.appendChild(cardBodyDiv);
    }
}
