// =====================================================
// J.H DESIGN — INTERAÇÕES
// =====================================================

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");


// -----------------------------
// TEMA CLARO / ESCURO
// -----------------------------

function updateThemeButton() {
    const isLight = body.classList.contains("light-theme");

    if (isLight) {
        themeIcon.textContent = "☀";
        themeText.textContent = "Claro";
        themeToggle.setAttribute("aria-label", "Ativar tema escuro");
    } else {
        themeIcon.textContent = "☾";
        themeText.textContent = "Escuro";
        themeToggle.setAttribute("aria-label", "Ativar tema claro");
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem("jh-theme");

    if (savedTheme === "light") {
        body.classList.add("light-theme");
    }

    updateThemeButton();
}

themeToggle.addEventListener("click", function () {
    body.classList.toggle("light-theme");

    const currentTheme = body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("jh-theme", currentTheme);
    updateThemeButton();
});

loadTheme();


// -----------------------------
// MENU MOBILE
// -----------------------------

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

const navLinks = navMenu.querySelectorAll("a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// -----------------------------
// FORMULÁRIO → WHATSAPP
// -----------------------------

const budgetForm = document.getElementById("budgetForm");

budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    // TROQUE PELO SEU NÚMERO.
    // Exemplo para Florianópolis:
    // 5548999999999
    const phone = "5500000000000";

    const whatsappMessage =
        "Olá! Gostaria de solicitar um orçamento.%0A%0A" +
        "Nome: " + encodeURIComponent(name) + "%0A" +
        "E-mail: " + encodeURIComponent(email) + "%0A" +
        "Serviço: " + encodeURIComponent(service) + "%0A%0A" +
        "Descrição do projeto:%0A" +
        encodeURIComponent(message);

    const whatsappUrl =
        "https://wa.me/" + phone + "?text=" + whatsappMessage;

    window.open(whatsappUrl, "_blank");
});


// -----------------------------
// BOTÃO VOLTAR AO TOPO
// -----------------------------

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// -----------------------------
// ANIMAÇÃO DOS CARDS
// -----------------------------

const animatedItems = document.querySelectorAll(
    ".service-card, .project-card"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    animatedItems.forEach(function (item) {
        item.style.opacity = "0";
        item.style.transform = "translateY(25px)";
        item.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(item);
    });
}


// -----------------------------
// ANO DO RODAPÉ
// -----------------------------

const copyright = document.getElementById("copyright");

copyright.textContent =
    "© " + new Date().getFullYear() +
    " J.H Design. Todos os direitos reservados.";
