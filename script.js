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

const tocLinks = document.querySelectorAll(".nav a");
const tocSections = Array.from(tocLinks)
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

tocLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

const tocObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      tocLinks.forEach(l => l.classList.remove("active"));
      const activeLink = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add("active");
    });
  },
  { threshold: 0.6 }
);

tocSections.forEach(section => tocObserver.observe(section));

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
