/* ======================================================
   THEME TOGGLE (DARK / LIGHT)
   ====================================================== */
   const themeToggle = document.getElementById("theme-toggle");

   if (themeToggle) {
     themeToggle.addEventListener("click", () => {
       const currentTheme = document.documentElement.getAttribute("data-theme");
       const isLight = currentTheme === "light";
   
       document.documentElement.setAttribute(
         "data-theme",
         isLight ? "dark" : "light"
       );
   
       themeToggle.setAttribute("aria-pressed", String(!isLight));
     });
   }
   
   /* ======================================================
      SCROLL REVEAL ANIMATION
      ====================================================== */
   const animatedSections = document.querySelectorAll("[data-animate]");
   
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
   
   /* ======================================================
      LEFT TOC — ACTIVE SECTION + SMOOTH SCROLL
      ====================================================== */
   const tocLinks = document.querySelectorAll(".toc-body a");
   const tocSections = Array.from(tocLinks)
     .map(link => document.querySelector(link.getAttribute("href")))
     .filter(Boolean);
   
   // Smooth scroll on click
   tocLinks.forEach(link => {
     link.addEventListener("click", e => {
       e.preventDefault();
       document
         .querySelector(link.getAttribute("href"))
         .scrollIntoView({ behavior: "smooth" });
     });
   });
   
   // Active section highlight
   const tocObserver = new IntersectionObserver(
     entries => {
       entries.forEach(entry => {
         if (!entry.isIntersecting) return;
   
         tocLinks.forEach(l => l.classList.remove("active"));
   
         const activeLink = document.querySelector(
           `.toc-body a[href="#${entry.target.id}"]`
         );
   
         if (activeLink) activeLink.classList.add("active");
       });
     },
     { threshold: 0.6 }
   );
   
   tocSections.forEach(section => tocObserver.observe(section));
   
   /* ======================================================
      SKILL BARS + COUNT-UP ANIMATION
      ====================================================== */
   const skillBars = document.querySelectorAll(".progress-bar");
   
   const skillObserver = new IntersectionObserver(
     entries => {
       entries.forEach(entry => {
         if (!entry.isIntersecting) return;
   
         const bar = entry.target;
         if (bar.classList.contains("animated")) return;
   
         bar.classList.add("animated");
   
         const level = parseInt(bar.dataset.level, 10);
         const percentEl = bar
           .closest(".skill")
           .querySelector(".skill-percent");
   
         // Animate bar width
         bar.style.width = level + "%";
   
         // Count-up animation
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
   
   /* ======================================================
      TYPING ANIMATION — TRIGGER ON SCROLL
      ====================================================== */
   const typingElements = document.querySelectorAll(".typing-on-scroll");
   
   const typingObserver = new IntersectionObserver(
     entries => {
       entries.forEach(entry => {
         if (!entry.isIntersecting) return;
   
         const el = entry.target;
         if (el.classList.contains("typed")) return;
   
         el.classList.add("typed");
   
         const text = el.dataset.text || "";
         let index = 0;
   
         function type() {
           if (index < text.length) {
             el.textContent += text.charAt(index);
             index++;
             setTimeout(type, 80);
           }
         }
   
         type();
       });
     },
     { threshold: 0.6 }
   );
   
   typingElements.forEach(el => typingObserver.observe(el));

   /* ======================================================
   CUSTOM CURSOR — SAFARI FIX
   ====================================================== */
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

if (cursorDot && cursorRing) {
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  // Pointer move (Safari-safe)
  window.addEventListener("pointermove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.transform =
      `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // Smooth trailing ring
  function animate() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorRing.style.transform =
      `translate3d(${ringX}px, ${ringY}px, 0)`;

    requestAnimationFrame(animate);
  }
  animate();

  // Hover detection (Safari compatible)
  const hoverTargets = document.querySelectorAll("a, button");

  hoverTargets.forEach(el => {
    el.addEventListener("pointerenter", () => {
      cursorRing.classList.add("hover");
    });

    el.addEventListener("pointerleave", () => {
      cursorRing.classList.remove("hover");
    });
  });
}