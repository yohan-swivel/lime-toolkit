// src/dom.ts

import { getConfluencePage } from "./confluence-wrapper";
import { copyToClipboard } from "./util";

export function getAllIssueCards(): string[] {
  const host = window.location.host;
  const elements = document.querySelectorAll(
    '[data-component-selector="VersionDetailIssueListIssueCardContainer"]'
  );
  console.log(elements);

  return Array.from(elements).map((element: Element) => {
    const href = element.getAttribute("href");
    return href ? `${host}${href}` : "";
  });
}

export async function handleCopy() {
  const issueCards = getAllIssueCards();
  //   copyToClipboard(issueCards.join("\n"));
  console.log("issueCards", issueCards);

  const response = await getConfluencePage(591790169);
  console.log("conflunce page content", response.data.body.storage.value);
}

export function addCopyReleaseButton() {
  const targetContainer = document.querySelector(
    '[data-testid="atlassian-navigation--primary-actions"]'
  );

  if (targetContainer) {
    if (document.getElementById("copy-release-btn-wrapper")) {
      return;
    }

    const wrapperDiv = document.createElement("div");
    wrapperDiv.id = "copy-release-btn-wrapper";
    wrapperDiv.setAttribute("role", "listitem");
    wrapperDiv.setAttribute("data-testid", "copy-button-wrapper");
    wrapperDiv.className = "css-1ou36x4";

    const copyButton = document.createElement("button");
    copyButton.id = "copy-release-btn";
    copyButton.setAttribute("aria-label", "Copy release");
    copyButton.setAttribute("data-hide-on-smallscreens", "true");
    copyButton.className = "css-1g6jj8c";
    copyButton.setAttribute("data-testid", "atlassian-navigation--copy-button");
    copyButton.setAttribute("tabindex", "0");
    copyButton.setAttribute("type", "button");

    const buttonSpan = document.createElement("span");
    buttonSpan.className = "css-178ag6o";
    buttonSpan.textContent = "Copy Release";

    copyButton.appendChild(buttonSpan);
    wrapperDiv.appendChild(copyButton);

    copyButton.addEventListener("click", () => {
      handleCopy();
    });

    const createButtonWrapper = targetContainer.querySelector(
      '[data-testid="create-button-wrapper"]'
    );

    if (createButtonWrapper && createButtonWrapper.parentNode) {
      createButtonWrapper.parentNode.insertBefore(
        wrapperDiv,
        createButtonWrapper.nextSibling
      );
    } else {
      targetContainer.appendChild(wrapperDiv);
    }

    wrapperDiv.style.marginLeft = "8px";
  } else {
    setTimeout(addCopyReleaseButton, 500);
  }
}
