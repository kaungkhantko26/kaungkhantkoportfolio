const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const translations = {
  en: {
    nav_about: "About",
    nav_skills: "Top Skills",
    nav_languages: "Languages",
    nav_programming: "Programming",
    nav_certifications: "Certifications",
    nav_honors: "Honors",
    nav_experience: "Experience",
    nav_education: "Education",
    nav_contact: "Contact",
    nav_home: "Home",
    nav_gallery: "Gallery",
    hero_eyebrow: "Junior Graphic Designer · Yangon, Myanmar",
    hero_lead:
      "Creative Junior Graphic Designer and student at Auston College with strong skills in visual design, branding, and programming. Experienced in social media, packaging, and poster design, with a strong interest in combining technology and design to create effective digital solutions. Brings a responsible and reliable work ethic, strong creative problem solving abilities, and effective team collaboration skills.",
    cta_email: "Email Me",
    cta_contact: "Contact Details",
    cta_gallery: "View Gallery",
    cta_download: "Download PDF",
    stat_skills: "Top Skills",
    stat_certifications: "Certifications",
    stat_languages: "Languages",
    stat_honors: "Honors",
    summary_title: "Summary",
    summary_body:
      "Creative Junior Graphic Designer and student at Auston College with strong skills in visual design, branding, and programming. Experienced in social media, packaging, and poster design, with a strong interest in combining technology and design to create effective digital solutions. Brings a responsible and reliable work ethic, strong creative problem solving abilities, and effective team collaboration skills.",
    focus_areas: "Focus Areas",
    skills_title: "Top Skills",
    languages_title: "Languages",
    programming_title: "Programming Languages",
    certifications_title: "Certifications",
    certifications_subtitle: "Professional learning and certification highlights.",
    honors_title: "Honors & Awards",
    experience_title: "Experience",
    education_title: "Education",
    contact_title: "Contact",
    contact_mobile: "Mobile",
    contact_email: "Email",
    contact_linkedin: "LinkedIn",
    contact_portfolio: "Portfolio",
    gallery_title: "Project Gallery"
  },
  zh: {
    nav_about: "关于",
    nav_skills: "主要技能",
    nav_languages: "语言",
    nav_programming: "编程",
    nav_certifications: "证书",
    nav_honors: "荣誉",
    nav_experience: "经验",
    nav_education: "教育",
    nav_contact: "联系",
    nav_home: "首页",
    nav_gallery: "画廊",
    hero_eyebrow: "初级平面设计师 · 缅甸仰光",
    hero_lead:
      "创意型初级平面设计师，Auston College 学生，具备扎实的视觉设计、品牌与编程能力。擅长社交媒体、包装与海报设计，关注将技术与设计结合以创造高效的数字解决方案。工作认真负责，善于创造性解决问题并具备良好的团队协作能力。",
    cta_email: "发送邮件",
    cta_contact: "联系方式",
    cta_gallery: "查看作品集",
    cta_download: "下载 PDF",
    stat_skills: "主要技能",
    stat_certifications: "证书",
    stat_languages: "语言",
    stat_honors: "荣誉",
    summary_title: "简介",
    summary_body:
      "创意型初级平面设计师，Auston College 学生，具备扎实的视觉设计、品牌与编程能力。擅长社交媒体、包装与海报设计，关注将技术与设计结合以创造高效的数字解决方案。工作认真负责，善于创造性解决问题并具备良好的团队协作能力。",
    focus_areas: "重点方向",
    skills_title: "主要技能",
    languages_title: "语言",
    programming_title: "编程语言",
    certifications_title: "证书",
    certifications_subtitle: "专业学习与认证亮点。",
    honors_title: "荣誉与奖项",
    experience_title: "工作经验",
    education_title: "教育背景",
    contact_title: "联系方式",
    contact_mobile: "手机",
    contact_email: "邮箱",
    contact_linkedin: "领英",
    contact_portfolio: "作品集",
    gallery_title: "项目画廊"
  }
};

const resolveDefaultLang = () => {
  const saved = localStorage.getItem("site-lang");
  if (saved && translations[saved]) return saved;
  const browserLang = (navigator.language || "en").toLowerCase();
  if (browserLang.startsWith("zh")) return "zh";
  return "en";
};

const applyLanguage = lang => {
  const dict = translations[lang] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-lang]").forEach(button => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
  localStorage.setItem("site-lang", lang);
};

const langButtons = document.querySelectorAll("[data-lang]");
if (langButtons.length) {
  const initialLang = resolveDefaultLang();
  applyLanguage(initialLang);
  langButtons.forEach(button => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });
}

const registerServiceWorker = () => {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker
    .register("sw.js", { updateViaCache: "none" })
    .then(registration => {
      registration.update().catch(() => {});
    })
    .catch(() => {});
};

registerServiceWorker();

const updateAge = () => {
  const ageEl = document.querySelector("#age-value");
  if (!ageEl) return;
  const birthDate = new Date(2006, 0, 6); // Jan 6, 2006
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }
  ageEl.textContent = age.toString();
};

updateAge();

const initChatbot = () => {
  const widget = document.querySelector("#chatbot-widget");
  if (!widget) return;

  const toggle = widget.querySelector(".chatbot-toggle");
  const panel = widget.querySelector(".chatbot-panel");
  const closeBtn = widget.querySelector(".chatbot-close");
  const form = widget.querySelector(".chatbot-form");
  const input = widget.querySelector(".chatbot-input");
  const messages = widget.querySelector(".chatbot-messages");
  let hideTimer = null;

  const addMessage = (text, role = "bot") => {
    const bubble = document.createElement("div");
    bubble.className = `chatbot-bubble ${role}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  };

  const botReply = message => {
    const query = message.toLowerCase();
    if (query.includes("about") || query.includes("who") || query.includes("summary")) {
      return "Kaung Khant Ko is a junior graphic designer and Auston College student focused on visual design, branding, and digital solutions.";
    }
    if (query.includes("skill")) {
      return "Top skills include graphic design, communication, and electronics. Focus areas: visual design, branding, social media, packaging, and poster design.";
    }
    if (query.includes("language")) {
      return "Languages: Chinese (limited working), English (professional working), Myanmar and Rakhine (native or bilingual).";
    }
    if (query.includes("program")) {
      return "Programming languages: Python, Java, JavaScript, HTML, CSS, Tailwind, and Bootstrap.";
    }
    if (query.includes("cert") || query.includes("certificate")) {
      return "Certifications include Adobe Illustrator, Graphic Design Master Class, Security Principles, Adobe Photoshop, CodinGame Python 3, Ethical Hacker, and EF SET English (B2).";
    }
    if (query.includes("honor") || query.includes("award")) {
      return "Honors include People's Choice Award and nominations for MAI and MAP.";
    }
    if (query.includes("experience")) {
      return "Experience includes Student Ambassador at KBZPay, freelance graphic design at ATTAM, and junior graphic designer at Fuxing Brothers Company Ltd.";
    }
    if (query.includes("education")) {
      return "Education: Higher National Diploma in Computer Science at Auston College, High School Diploma (Biology), and Diploma of English at Wall Street English Myanmar.";
    }
    if (query.includes("contact") || query.includes("email") || query.includes("phone")) {
      return "You can contact Kaung via email at kaungkkhant06@gmail.com or phone at +959889750033.";
    }
    if (query.includes("work") || query.includes("project") || query.includes("gallery")) {
      return "Featured works include 'Monster Energy Drink Manipulation' and 'Pyit Tine htaung'. See the gallery for more visuals.";
    }
    return "Ask me about: about, skills, programming, certifications, honors, experience, education, contact, or works.";
  };

  const openChat = () => {
    panel.classList.add("active");
    panel.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    if (!messages.childElementCount) {
      addMessage("Hi! I am your offline guide. Ask about me or my work.");
    }
    input.focus();
  };

  const closeChat = () => {
    panel.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
  };

  const revealChat = () => {
    widget.classList.remove("is-hidden");
  };

  const hideChat = () => {
    if (panel.classList.contains("active")) return;
    widget.classList.add("is-hidden");
  };

  toggle.addEventListener("click", () => {
    if (panel.classList.contains("active")) {
      closeChat();
    } else {
      revealChat();
      openChat();
    }
  });

  closeBtn.addEventListener("click", closeChat);

  form.addEventListener("submit", event => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addMessage(value, "user");
    input.value = "";
    const response = botReply(value);
    addMessage(response, "bot");
  });

  window.addEventListener(
    "scroll",
    () => {
      hideChat();
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        revealChat();
      }, 180);
    },
    { passive: true }
  );
};

initChatbot();
const animatedSections = document.querySelectorAll("[data-animate]");

if (prefersReducedMotion) {
  animatedSections.forEach(section => section.classList.add("active"));
} else {
  animatedSections.forEach(section => {
    const children = Array.from(section.children);
    children.forEach((child, index) => {
      child.style.transitionDelay = `${Math.min(index * 0.08, 0.4)}s`;
    });
  });

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

const initRotatingSlider = () => {
  const slider = document.querySelector("[data-rotating-slider]");
  if (!slider) return;

  const baseItems = Array.from(slider.querySelectorAll(".item"));
  if (!baseItems.length) return;

  const isMobileViewport = window.matchMedia("(max-width: 600px)").matches;
  const minSlides = isMobileViewport ? 5 : 8;
  if (baseItems.length < minSlides) {
    for (let i = baseItems.length; i < minSlides; i += 1) {
      const source = baseItems[i % baseItems.length];
      const clone = source.cloneNode(true);
      slider.appendChild(clone);
    }
  }

  const items = Array.from(slider.querySelectorAll(".item"));

  slider.style.setProperty("--quantity", String(items.length));

  items.forEach((item, index) => {
    item.style.setProperty("--position", String(index + 1));
  });

  const normalizeAngle = angle => {
    let normalized = ((angle % 360) + 360) % 360;
    if (normalized > 180) normalized -= 360;
    return normalized;
  };

  const readSliderYRotation = () => {
    const transform = getComputedStyle(slider).transform;
    if (!transform || transform === "none" || !transform.startsWith("matrix3d(")) return 0;
    const values = transform
      .slice(9, -1)
      .split(",")
      .map(value => parseFloat(value.trim()));
    if (values.length !== 16 || values.some(Number.isNaN)) return 0;
    const m11 = values[0];
    const m31 = values[8];
    return Math.atan2(m31, m11) * (180 / Math.PI);
  };

  let activeCenterIndex = -1;
  const updateCenterGlow = () => {
    const sliderAngle = readSliderYRotation();
    let closestIndex = 0;
    let smallestDelta = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const baseAngle = (index * 360) / items.length;
      const facingAngle = normalizeAngle(baseAngle + sliderAngle);
      const delta = Math.abs(facingAngle);
      if (delta < smallestDelta) {
        smallestDelta = delta;
        closestIndex = index;
      }
      item.classList.remove("is-center");
    });

    if (closestIndex !== activeCenterIndex) {
      activeCenterIndex = closestIndex;
    }
    items[activeCenterIndex]?.classList.add("is-center");

    requestAnimationFrame(updateCenterGlow);
  };

  updateCenterGlow();
};

initRotatingSlider();

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
