const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animatedSections = document.querySelectorAll("[data-animate]");

if (prefersReducedMotion) {
  animatedSections.forEach(section => section.classList.add("active"));
} else {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedSections.forEach(section => revealObserver.observe(section));
}

const typingName = document.querySelector(".typing-name");
if (typingName) {
  const fullText = typingName.dataset.text || typingName.textContent.trim();
  if (prefersReducedMotion) {
    typingName.textContent = fullText;
    typingName.classList.add("typed");
  } else {
    typingName.textContent = "";
    typingName.classList.remove("typed");
    let index = 0;
    const typeNext = () => {
      if (index < fullText.length) {
        typingName.textContent += fullText.charAt(index);
        index += 1;
        setTimeout(typeNext, 90);
      } else {
        typingName.classList.add("typed");
      }
    };
    typeNext();
  }
}

const tocLinks = Array.from(document.querySelectorAll(".nav a"))
  .filter(link => (link.getAttribute("href") || "").startsWith("#"));
const tocSections = tocLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveTocLink = id => {
  tocLinks.forEach(link => link.classList.remove("active"));
  if (!id) return;
  const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
  if (activeLink) activeLink.classList.add("active");
};

tocLinks.forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

const updateActiveFromScroll = () => {
  if (!tocSections.length) return;
  const offset = 120;
  let activeId = null;

  tocSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= offset && rect.bottom > offset) {
      activeId = section.id;
    }
  });

  if (!activeId && window.scrollY < tocSections[0].offsetTop + offset) {
    activeId = tocSections[0].id;
  }

  setActiveTocLink(activeId);
};

let tocRaf = null;
const handleTocScroll = () => {
  if (tocRaf) return;
  tocRaf = requestAnimationFrame(() => {
    updateActiveFromScroll();
    tocRaf = null;
  });
};

updateActiveFromScroll();
window.addEventListener("scroll", handleTocScroll, { passive: true });
window.addEventListener("resize", handleTocScroll);

const skillBars = document.querySelectorAll(".progress-bar");

const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const bar = entry.target;
      if (bar.classList.contains("animated")) return;

      bar.classList.add("animated");

      const level = parseInt(bar.dataset.level, 10);
      const percentEl = bar.closest(".skill").querySelector(".skill-percent");

      bar.style.width = level + "%";

      let count = 0;
      const duration = 1200;
      const step = Math.max(Math.floor(duration / level), 15);

      const counter = setInterval(() => {
        count++;
        percentEl.textContent = count + "%";

        if (count >= level) {
          percentEl.textContent = level + "%";
          clearInterval(counter);
        }
      }, step);
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach(bar => skillObserver.observe(bar));

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector(".lightbox-title");

const openLightbox = (src, title) => {
  if (!lightbox || !lightboxImage || !lightboxTitle) return;
  lightboxImage.src = src;
  lightboxImage.alt = title || "Project preview";
  lightboxTitle.textContent = title || "";
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lightboxImage) lightboxImage.src = "";
};

document.addEventListener("click", event => {
  const trigger = event.target.closest(".art-trigger");
  if (trigger) {
    const figure = trigger.closest(".art-piece");
    const bgValue = figure ? getComputedStyle(figure).getPropertyValue("--art-image") : "";
    const srcMatch = bgValue.match(/url\((['"]?)(.*)\1\)/);
    const src = srcMatch ? srcMatch[2] : "";
    const title = figure ? figure.querySelector(".art-title")?.textContent.trim() : "";
    if (src) openLightbox(src, title);
    return;
  }

  if (event.target.closest("[data-lightbox-close]")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && lightbox?.classList.contains("active")) {
    closeLightbox();
  }
});

const printButtons = document.querySelectorAll("[data-print]");
if (printButtons.length) {
  printButtons.forEach(button => {
    button.addEventListener("click", () => {
      window.print();
    });
  });
}
