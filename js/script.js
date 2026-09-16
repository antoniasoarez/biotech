"use strict";

document.documentElement.classList.add("js");
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
const menuLinks = [...menu.querySelectorAll("a")];
const backTop = document.querySelector(".back-top");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function closeMenu(returnFocus = false) {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    if (returnFocus) menuToggle.focus();
}

menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("open", open);
});
menuLinks.forEach(link => link.addEventListener("click", () => {
    const mobile = menu.classList.contains("open");
    closeMenu();
    if (mobile) {
        const target = document.querySelector(link.hash);
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
    }
}));
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu.classList.contains("open")) closeMenu(true);
});
document.addEventListener("click", event => {
    if (!event.target.closest(".header")) closeMenu();
});
window.matchMedia("(min-width: 1201px)").addEventListener("change", event => {
    if (event.matches) closeMenu();
});

const sections = [...document.querySelectorAll("main > section")];
let scheduled = false;
let currentIndex = 0;
const previousButton = document.querySelector("#previous-section");
const nextButton = document.querySelector("#next-section");
document.querySelector(".presentation-bar").hidden = false;

function updateNavigation() {
    const offset = document.querySelector(".header").getBoundingClientRect().height + 80;
    let current = sections[0];
    for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) current = section;
    }
    if (Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) current = sections.at(-1);
    currentIndex = sections.indexOf(current);
    document.querySelector("#section-counter").textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(sections.length).padStart(2, "0")}`;
    document.querySelector("#section-name").textContent = current.dataset.title || current.querySelector("h2")?.textContent || "Início";
    document.querySelector("#section-speaker").textContent = current.dataset.speaker ? `AGORA · ${current.dataset.speaker}` : "SENAI · BIOMASSA";
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === sections.length - 1;
    const activeId = current.dataset.nav || current.id;
    menuLinks.forEach(link => {
        if (link.hash === "#" + activeId) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
    });
    backTop.hidden = window.scrollY < 500;
    scheduled = false;
}
window.addEventListener("scroll", () => {
    if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(updateNavigation);
    }
}, { passive: true });
window.addEventListener("resize", updateNavigation);
updateNavigation();

if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll(".section > .title-row, .section > .intro-grid, .section > .grid, .future-grid, .comparison, .team-grid").forEach(element => {
        element.classList.add("reveal-ready");
        observer.observe(element);
    });
}

const processDescriptions = [
    [
        "A energia está na matéria.",
        "Bagaço, madeira e resíduos agrícolas armazenam energia química, originada da energia solar captada pelas plantas."
    ],
    [
        "A queima libera calor.",
        "Na caldeira, a combustão transforma a energia química da biomassa em energia térmica. O processo exige controle de emissões."
    ],
    [
        "O calor aquece a água.",
        "A água recebe calor e se transforma em vapor sob pressão, que é direcionado à turbina."
    ],
    [
        "O vapor produz movimento.",
        "Ao passar pela turbina, o vapor movimenta suas pás e faz girar o eixo conectado ao gerador."
    ],
    [
        "O movimento vira eletricidade.",
        "O gerador converte energia mecânica em elétrica. Em sistemas de cogeração, parte do calor também é aproveitada na indústria."
    ]
];
const steps = [...document.querySelectorAll(".step")];
steps.forEach(step => {
    step.addEventListener("click", () => {
        const index = Number(step.dataset.step);
        steps.forEach(item => {
            const active = item === step;
            item.classList.toggle("active", active);
            item.setAttribute("aria-pressed", String(active));
        });
        document.querySelector("#detail-number").textContent = String(index + 1).padStart(2, "0") + " / 05";
        document.querySelector("#detail-title").textContent = processDescriptions[index][0];
        document.querySelector("#detail-text").textContent = processDescriptions[index][1];
        if (!reduceMotion.matches && typeof step.animate === "function") {
            step.animate([{ transform: "translateY(0)" }, { transform: "translateY(-4px)" }, { transform: "translateY(0)" }], { duration: 300 });
        }
    });
});

// Native anchors remain available without JavaScript. Buttons focus each new part.
function goToSection(index) {
    const target = sections[index];
    if (!target) return;
    closeMenu();
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reduceMotion.matches ? "instant" : "smooth", block: "start" });
}
previousButton.addEventListener("click", () => goToSection(currentIndex - 1));
nextButton.addEventListener("click", () => goToSection(currentIndex + 1));
