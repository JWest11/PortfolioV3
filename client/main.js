const PI = 3.14159

function changeActiveColor(color) {
    colors = {
        red: "var(--color-red)",
        blue: "var(--color-blue)",
        green: "var(--color-green)"
    }

    document.documentElement.style.setProperty("--color-active", colors[color]);
}

function focusProject(id) {
    const project = document.getElementById(id);
    if (project.dataset.focused !== "false") {return;}
    project.dataset.focused = "true";
    focusStatus = true;
}

function deFocusProject(id) {
    const project = document.getElementById(id);
    project.dataset.focused = "leaving";
    setTimeout(() => {
        project.dataset.focused = "false"
    }, 300)
}

function deFocusAllProjects() {
    const projects = document.querySelectorAll(".project");
    projects.forEach(project => {
        if (project.dataset.focused == "true") {
            deFocusProject(project.id);
        };
    })
}

const growingContent = document.getElementById("growing-content");
growingContent.addEventListener("click", (e) => {
    if (e.target === growingContent) {deFocusAllProjects()};
})

function renderSkillsCircle(circleRotationRadians) {
    const skillsContainer = document.getElementById("skillsContainer");
    const skills = document.querySelectorAll(".skill");
    const skillsContainerRect = skillsContainer.getBoundingClientRect();
    let radius = Math.min(skillsContainerRect.width/2, skillsContainerRect.height/2);
    document.documentElement.style.setProperty("--skills-circle-radius", radius + "px");
    let center = {x: skillsContainerRect.width/2, y: skillsContainerRect.height/2};
    
    let deltaRadians = PI * 2 /skills.length;
    let iterationRadians = circleRotationRadians;
    
    
    skills.forEach(skillNode => {
        let nodeX = Math.cos(iterationRadians) * radius + center.x;
        let nodeY = Math.sin(iterationRadians) * radius + center.y;
        iterationRadians += deltaRadians;
        skillNode.style.left = nodeX + "px";
        skillNode.style.top = nodeY + "px";
    })
};

let skillMouseDown = false;
let startingX = 0;
let startingY = 0;
let tangentVector = {
    x: 0,
    y: 0,
}

let circleRotation = 0;

let skillsIntervalId;
let currentClientX = 0;
let currentClientY = 0;
let circleVelocity = 0;

function applySkillsClickListeners() {

    const dotProductScalar = 2000000;

    const skills = document.querySelectorAll(".skill");
    skills.forEach(skill => {
        skill.addEventListener("mousedown", (e) => {
            if (skillMouseDown) {return;}

            document.body.style.cursor = "grabbing";
            startingX = e.clientX;
            startingY = e.clientY;

            const skillsContainer = document.getElementById("skillsContainer");
            const skillsContainerRect = skillsContainer.getBoundingClientRect();
            let center = {x: skillsContainerRect.x + skillsContainerRect.width/2, y: skillsContainerRect.y + skillsContainerRect.height/2};
            
            let V = {x: startingX - center.x, y: startingY - center.y};
            tangentVector = {x: -V.y, y: V.x};


            skillMouseDown = true;
            skillsIntervalId = setInterval(() => {

                const deltaX = startingX - currentClientX;
                const deltaY =  startingY - currentClientY;

                const dotProduct = -1 * (tangentVector.x * deltaX + tangentVector.y * deltaY);
                if (dotProduct < 0) {
                    circleVelocity = Math.max(dotProduct, -100000);
                } else {
                    circleVelocity = Math.min(dotProduct, 100000);
                }
                

                circleRotation += circleVelocity / dotProductScalar;
                circleRotation %= PI * 2;
                renderSkillsCircle(circleRotation);
            },10)
        });
    });
    window.addEventListener("mouseup", (e) => {
        document.body.style.cursor = "";
        skillMouseDown = false;
        const slowDownIntervalId = setInterval(() => {
            circleVelocity *= 0.9;
            if (Math.abs(circleVelocity) < 0.01) {
                clearInterval(slowDownIntervalId);
            }
            circleRotation += circleVelocity / dotProductScalar;
            circleRotation %= PI * 2;
            renderSkillsCircle(circleRotation);
        
        }, 10);
        clearInterval(skillsIntervalId);
    });
    window.addEventListener("mousemove", (e) => {
        currentClientX = e.clientX;
        currentClientY = e.clientY;
    })
};



applySkillsClickListeners();
renderSkillsCircle(0);

window.addEventListener("resize", () => {
    renderSkillsCircle(0);
})
