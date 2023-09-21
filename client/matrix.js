let matrixDeltaX = 0;
let matrixDeltaY = 0;

let matrixHoverActive = true;

const matrixH1Id = "ContactHeader"
const matrixContentId = "matrix-content"

function beginMatrix() {
    matrixHoverActive = false;
    const H1Element = document.getElementById(matrixH1Id);
    const iRect = H1Element.getBoundingClientRect();
    matrixDeltaX = iRect.left - (window.innerWidth / 2) + (iRect.width/2);
    matrixDeltaY = iRect.top - (window.innerHeight / 8);
    H1Element.style.transform = `translateX(${-matrixDeltaX}px) translateY(${-matrixDeltaY}px) scaleX(4) scaleY(0.2)`;
    H1Element.style.color = "var(--color-red)";
    H1Element.style.backgroundColor = "var(--color-red)";
    const matrixContent = document.getElementById(matrixContentId);
    
    setTimeout(() => {
        const newRect = document.getElementById(matrixH1Id).getBoundingClientRect();
        matrixContent.style.left = `${newRect.left - 1}px`;
        matrixContent.style.top = `${newRect.top - 1}px`;
        matrixContent.style.width = `${newRect.width + 2}px`;
        matrixContent.style.height = `75vh`;
    }, 300)
    setTimeout(() => {
        matrixContent.dataset.visible = "true";
    },600)
}

function peekMatrix() {
    if (!matrixHoverActive) {return}
    const H1Element = document.getElementById(matrixH1Id);
    const iRect = H1Element.getBoundingClientRect();
    matrixDeltaX = iRect.left - (window.innerWidth / 2) + (iRect.width/2);
    matrixDeltaY = iRect.top - (window.innerHeight / 8);
    H1Element.style.transform = `translateX(${-matrixDeltaX/15}px) translateY(${-matrixDeltaY/15}px) scaleX(1.2) scaleY(0.95)`;
    H1Element.style.color = "var(--color-red)";
}
function unPeekMatrix() {
    if (!matrixHoverActive) {return}
    const H1Element = document.getElementById(matrixH1Id);
    H1Element.style.transform = "";
    H1Element.style.color = "";
    H1Element.style.backgroundColor = "";
}

function hideMatrix() {
    const H1Element = document.getElementById(matrixH1Id);
    const matrixContent = document.getElementById(matrixContentId);
    matrixContent.dataset.visible = "false";
    setTimeout(() => {
        const H1Element = document.getElementById(matrixH1Id);
        H1Element.style.transform = "";
        H1Element.style.color = "";
        H1Element.style.backgroundColor = "";
        matrixHoverActive = true;
    }, 600)
}
function hideMatrixInstant() {
    const H1Element = document.getElementById(matrixH1Id);
    const matrixContent = document.getElementById(matrixContentId);
    matrixContent.dataset.visible = "false";
    H1Element.style.transform = "";
    H1Element.style.color = "";
    H1Element.style.backgroundColor = "";
    matrixHoverActive = true;
}

window.onresize = () => {
    hideMatrixInstant();
}