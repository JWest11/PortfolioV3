let ihovered = false;

const expandingElementId = "expanding-i";
const expandingContentId = "expanded-content";

function activateIExpansion() {
    const iElement = document.getElementById(expandingElementId);
    const iRect = iElement.getBoundingClientRect();
    let deltaX = iRect.x + iRect.width / 1.8;
    let deltaY = iRect.y + iRect.height / 4;
    document.documentElement.style.setProperty("--dot-x-offset", deltaX + "px");
    document.documentElement.style.setProperty("--dot-y-offset", deltaY + "px");
    document.documentElement.style.setProperty("--circle-scale", Math.max(window.innerHeight, window.innerWidth) + "px");

    const expandedContentElement = document.getElementById(expandingContentId);
    
    setTimeout(() => {
        expandedContentElement.dataset.transition = "slow";
        expandedContentElement.dataset.visible = "true";
    }, 100)
    
}

function deactivateIExpansion() {
    const expandedContentElement = document.getElementById(expandingContentId);
    setTimeout(() => {
        expandedContentElement.dataset.visible = "false";
    }, 100)
}

function peekIExpansion() {
    ihovered = true;
    const expandedContentElement = document.getElementById(expandingContentId);
    expandedContentElement.dataset.transition = "instant";
    const iElement = document.getElementById(expandingElementId);
    const iRect = iElement.getBoundingClientRect();
    let deltaX = iRect.x + iRect.width / 2;
    let deltaY = iRect.y + iRect.height / 5;
    document.documentElement.style.setProperty("--dot-x-offset", deltaX + "px");
    document.documentElement.style.setProperty("--dot-y-offset", deltaY + "px");
    
    setTimeout(() => {
        if (!ihovered) {return}
        expandedContentElement.dataset.transition = "fast";
        expandedContentElement.dataset.peek = "true";
    })
}

function unPeekIExpansion() {
    ihovered = false;
    const expandedContentElement = document.getElementById(expandingContentId);
    expandedContentElement.dataset.peek = "false";
}

window.addEventListener("resize", () => {
    const iElement = document.getElementById(expandingElementId);
    const iRect = iElement.getBoundingClientRect();
    let deltaX = iRect.x + iRect.width / 1.8;
    let deltaY = iRect.y + iRect.height / 4;
    document.documentElement.style.setProperty("--dot-x-offset", deltaX + "px");
    document.documentElement.style.setProperty("--dot-y-offset", deltaY + "px");
    document.documentElement.style.setProperty("--circle-scale", Math.max(window.innerHeight, window.innerWidth) + "px");
})