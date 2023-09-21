let growthActivated = false;
let underlineHovered = false;

const underlinedElementId = "projectHeader";
const growingContentId = "growing-content";
const underlineTempId = "tempUnderline"

function peekUnderline() {
    if (growthActivated) {return}
    underlineHovered = true;
    const growingContent = document.getElementById(growingContentId);
    const underlineH1 = document.getElementById(underlinedElementId);
    const tempUnderline = document.getElementById(underlineTempId);
    let underlineH1Rect = underlineH1.getBoundingClientRect();

    let x0 = underlineH1Rect.left + underlineH1Rect.width / 2;
    let y0 = underlineH1Rect.bottom;
    growingContent.dataset.transition = "instant";
    tempUnderline.dataset.transition = "instant";
    document.documentElement.style.setProperty("--growing-polygon", `polygon(${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px)`);
    document.documentElement.style.setProperty("--temp-underline-polygon", `polygon(${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px)`);

    setTimeout(() => {
        if (!underlineHovered) {return}
        growingContent.dataset.transition = "fastEaseOut";
        tempUnderline.dataset.transition = "fastEaseOut";
        let x1 = underlineH1Rect.left;
        let y1 = underlineH1Rect.bottom;
        let x2 = underlineH1Rect.right;
        let y2 = underlineH1Rect.bottom + 3;
        document.documentElement.style.setProperty("--growing-polygon", `polygon(${x1}px ${y1}px,${x1}px ${y2}px,${x2}px ${y2}px,${x2}px ${y1}px)`);
        document.documentElement.style.setProperty("--temp-underline-polygon", `polygon(${x1}px ${y1}px,${x1}px ${y2}px,${x2}px ${y2}px,${x2}px ${y1}px)`);
    }, 100)
    
}

function unPeekUnderline() {
    underlineHovered = false;
    if (growthActivated) {return}
    const underlineH1 = document.getElementById(underlinedElementId);
    let underlineH1Rect = underlineH1.getBoundingClientRect();

    let x0 = underlineH1Rect.left + underlineH1Rect.width / 2;
    let y0 = underlineH1Rect.bottom;
    document.documentElement.style.setProperty("--growing-polygon", `polygon(${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px)`);
    document.documentElement.style.setProperty("--temp-underline-polygon", `polygon(${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px,${x0}px ${y0}px)`);
}

function activateGrowingContent() {
    growthActivated = true;
    const growingContent = document.getElementById(growingContentId);
    const underlineH1 = document.getElementById(underlinedElementId);
    const tempUnderline = document.getElementById(underlineTempId);
    underlineH1.dataset.clickable = "false";
    let underlineH1Rect = underlineH1.getBoundingClientRect();
    growingContent.dataset.transition = "slow";
    let x0 = underlineH1Rect.left + underlineH1Rect.width / 2;
    let y0 = underlineH1Rect.bottom;
    document.documentElement.style.setProperty("--temp-underline-polygon", `polygon(${x0}px ${y0}px,${x0}px ${y0+3}px,${x0}px ${y0+3}px,${x0}px ${y0}px)`);

    setTimeout(() => {
        let x1 = 0;
        let y1 = underlineH1Rect.bottom;
        let x2 = 100;
        let y2 = underlineH1Rect.bottom + 3;
        document.documentElement.style.setProperty("--growing-polygon", `polygon(${x1}px ${y1}px,${x1}px ${y2}px,${x2}% ${y2}px,${x2}% ${y1}px)`);
    }, 100)
    setTimeout(() => {
        document.documentElement.style.setProperty("--growing-polygon", `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)`);
    }, 900)
}

function deactivateGrowingContent() {
    const growingContent = document.getElementById(growingContentId);
    const underlineH1 = document.getElementById(underlinedElementId);
    const tempUnderline = document.getElementById(underlineTempId);
    tempUnderline.dataset.active = "true";
    underlineH1.dataset.clickable = "true";
    let underlineH1Rect = underlineH1.getBoundingClientRect();
    growingContent.dataset.transition = "slow";

    let x0 = underlineH1Rect.left + underlineH1Rect.width / 2;
    let y0 = underlineH1Rect.bottom;

    setTimeout(() => {
        let x1 = 0;
        let y1 = underlineH1Rect.bottom;
        let x2 = 100;
        let y2 = underlineH1Rect.bottom + 3;
        document.documentElement.style.setProperty("--growing-polygon", `polygon(${x1}px ${y1}px,${x1}px ${y2}px,${x2}% ${y2}px,${x2}% ${y1}px)`);
    }, 100)
    setTimeout(() => {
        growthActivated = false;
        document.documentElement.style.setProperty("--growing-polygon", `polygon(${x0}px ${y0}px,${x0}px ${y0+3}px,${x0}px ${y0+3}px,${x0}px ${y0}px)`);
    }, 900)
}