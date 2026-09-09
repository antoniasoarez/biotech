"use strict";

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
window.matchMedia("(min-width: 801px)").addEventListener("change", event => {
    if (event.matches) closeMenu();
});

const sections = [...document.querySelectorAll("main > section")];
let scheduled = false;

function updateNavigation() {
    const offset = document.querySelector(".header").getBoundingClientRect().height + 80;
    let current = sections[0];
    for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) current = section;
    }
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
    ["Tudo começa com a matéria orgânica.", "Resíduos vegetais ou animais são coletados e selecionados conforme o processo de aproveitamento."],
    ["Preparar para aproveitar melhor.", "O material pode passar por separação, trituração e secagem. A preparação depende da matéria-prima e da tecnologia utilizada."],
    ["A matéria se transforma.", "Na combustão, a queima libera calor para produzir vapor. Na digestão anaeróbia, microrganismos produzem biogás sem a presença de oxigênio."],
    ["Do movimento à eletricidade.", "O vapor movimenta uma turbina ligada ao gerador. Em outro caminho, o biogás pode alimentar um motor conectado a um gerador."],
    ["Energia para novos usos.", "A eletricidade pode abastecer equipamentos e instalações. O calor também pode ser aproveitado em processos industriais."]
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
