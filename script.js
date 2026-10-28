console.log("Portfolio website loaded successfully!");

// ===== Feature 1: Dark/Light Theme Toggle =====
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

function updateThemeButton() {
    const isLightMode = document.body.classList.contains("light-theme");

    if (isLightMode) {
        themeIcon.textContent = "☾";
        themeLabel.textContent = "Dark Mode";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    } else {
        themeIcon.textContent = "☀";
        themeLabel.textContent = "Light Mode";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    }
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
    updateThemeButton();
});

updateThemeButton();

// ===== Feature 2: Back to Top Button =====
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
    } else {
        backToTopButton.classList.remove("visible");
    }
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", function () {
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollProgress =
        (window.scrollY / scrollableHeight) * 100;

    progressBar.style.width = scrollProgress + "%";
});

const revealElements = document.querySelectorAll(
    ".section, .placeholder-section"
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});

const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const level = entry.target.dataset.level;
            entry.target.style.setProperty("--skill-level", level + "%");
            entry.target.classList.add("animate");
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(function (bar) {
    skillObserver.observe(bar);
});

const skillButtons = document.querySelectorAll(".skill-toggle");

skillButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".skill-card");
        const details = card.querySelector(".skill-details");

        details.hidden = !details.hidden;

        button.setAttribute(
            "aria-expanded",
            String(!details.hidden)
        );

        if (details.hidden) {
            button.textContent = "More about this skill +";
        } else {
            button.textContent = "Show less −";
        }
    });
});

const menuToggle = document.getElementById("menu-toggle");
const navigation = document.querySelector(".navbar nav");

menuToggle.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        menuToggle.textContent = "✕";
    } else {
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    }
});

navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});
// ===== Feature 8: Active Navigation Highlight =====
const pageSections = document.querySelectorAll(
    "#home, #about, #skills, #projects, #contact"
);

const navLinks = document.querySelectorAll(".navbar nav a");

function updateActiveNavigation() {
    let currentSection = "";

    pageSections.forEach(function (section) {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();
// ===== Feature 9: Copy Email Button =====
const copyEmailButton = document.getElementById("copy-email");
const contactEmail = document.getElementById("contact-email");

copyEmailButton.addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(
            contactEmail.textContent.trim()
        );

        copyEmailButton.textContent = "✓ Email Copied!";
    } catch (error) {
        copyEmailButton.textContent = "Copy Failed — Select Email";
    }
});
// ===== Feature 10: Typing Animation =====
const typingText = document.getElementById("typing-text");

const typingPhrases = [
    "Multimedia Computing Student",
    "Aspiring Front-End Developer",
    "Lifelong Learner"
];

let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentPhrase.substring(
        0,
        characterIndex
    );

    let delay = isDeleting ? 45 : 90;

    if (!isDeleting && characterIndex === currentPhrase.length) {
        delay = 1500;
        isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();


