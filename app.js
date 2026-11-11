// ===================== EDITABLE PORTFOLIO CONTENT =====================

const DEFAULT_CONTENT = {
  name: "Kanishka Senthilkumar",
  title: "Aspiring AI Engineer",
  titleLong: "Undergraduate Student | Aspiring AI Engineer",
  tagline: "“Curious Mind. Continuous Learning. Building the Future with AI.”",
  location: "Erode, Tamil Nadu, India",
  shortLocation: "ERODE, INDIA",
  email: "kanishka8740@gmail.com",
  phone: "",
  linkedin: "",
  github: "",
  instagram: "",
  degree: "B.Tech – Artificial Intelligence and Data Science",
  institution: "Velalar College of Engineering and Technology",
  eduLocation: "Erode, Tamil Nadu",
  studyYear: "[Add year]",
  graduationYear: "[Add year]",
  cgpa: "[Add CGPA]",
  aboutIntro: "Hello! I'm an enthusiastic Artificial Intelligence and Data Science undergraduate passionate about building intelligent solutions that solve real-world problems.",
  aboutBody1: "I'm currently pursuing my B.Tech in Artificial Intelligence and Data Science, where I'm developing my knowledge in programming, artificial intelligence, machine learning, and software development.",
  aboutBody2: "I enjoy exploring emerging technologies and transforming ideas into practical applications through continuous learning, experimentation, and hands-on projects.",
  belief: "I believe in learning by building, improving through challenges, and turning curiosity into meaningful innovation.",
  goal: "My goal is to become a skilled AI Engineer and contribute to innovative products that make a meaningful impact. I'm continuously strengthening my technical knowledge, problem-solving skills, and project-building experience.",
  connectText: "I'm open to connecting with developers, collaborating on innovative projects, learning from experienced professionals, and exploring internship opportunities.",
  experienceText: "Currently building my technical knowledge and practical experience through continuous learning and project development.",
  welcomeSpeech: "Hey there! Welcome to my portfolio! I'm Kanishka Senthilkumar, an Artificial Intelligence and Data Science undergraduate. I'm passionate about exploring AI, programming, and emerging technologies. Here, you'll get to know about my skills, education, projects, and my journey towards becoming an AI Engineer. Feel free to explore my portfolio. Thank you for visiting, and I hope you enjoy your experience!"
};

const INTERESTS = [
  "Artificial Intelligence & Machine Learning",
  "Python and Java Programming",
  "Data Science and Data Analytics",
  "Software Development",
  "Natural Language Processing",
  "AI-Powered Applications",
  "Hardware and Software Integration"
];

const SKILLS = [
  {
    category: "PROGRAMMING LANGUAGES",
    items: [["Py", "Python"], ["C", "C"], ["Ja", "Java"]]
  },
  {
    category: "WEB TECHNOLOGIES",
    items: [["⌘", "HTML"], ["#", "CSS"]]
  },
  {
    category: "ADDITIONAL TECHNICAL INTERESTS",
    items: [
      ["AI", "Artificial Intelligence"],
      ["ML", "Machine Learning"],
      ["DS", "Data Science"],
      ["NLP", "Natural Language Processing"],
      ["DA", "Data Analytics"]
    ]
  }
];

const PROJECTS = [1, 2, 3].map(n => ({
  name: `Project ${n} — Add your title`,
  description: "Add a short description of your real project, the problem it solves, and what you learned while building it.",
  technologies: "Add technologies",
  github: "",
  demo: "",
  placeholder: true
}));

const CERTIFICATES = [1, 2, 3].map(n => ({
  name: "Add certification name",
  organization: "Add issuing organization",
  date: "Add completion date",
  placeholder: true
}));

const STORAGE_KEY = "kanishkaPortfolioV1";

let content = { ...DEFAULT_CONTENT };
let photoData = "";
let avatarVideoData = "";
let resumeData = "";
let resumeName = "";
let speechUtterance = null;
let speechPaused = false;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function safeText(v) {
  return String(v ?? "");
}

function renderContent() {
  $$("[data-edit]").forEach(el => {
    const key = el.dataset.edit;
    if (content[key] !== undefined) {
      el.textContent = content[key];
    }
  });

  $("#emailLink").href =
    "mailto:" + encodeURIComponent(content.email || "");

  $("#miniAvatar").innerHTML = photoData
    ? `<img src="${photoData}" alt="">`
    : "<span>KS</span>";

  if (photoData) {
    $("#profileImage").src = photoData;
  }

  $("#welcomeSpeech").textContent = content.welcomeSpeech;

  $("#interestList").innerHTML = INTERESTS.map(x =>
    `<div class="interest-item">${escapeHTML(x)}</div>`
  ).join("");

  $("#skillsGrid").innerHTML = SKILLS.map(group =>
    group.items.map(([symbol, name]) =>
      `<article class="skill-card">
        <div class="skill-symbol">${escapeHTML(symbol)}</div>
        <b>${escapeHTML(name)}</b>
        <small>${escapeHTML(group.category)}</small>
      </article>`
    ).join("")
  ).join("");

  $("#projectsGrid").innerHTML = PROJECTS.map((p, i) =>
    `<article class="project-card">
      <div class="project-art">
        <span>⌘</span>
        <small class="placeholder-label">
          PROJECT ${String(i + 1).padStart(2, "0")} / EDITABLE
        </small>
      </div>
      <div class="project-body">
        <div class="placeholder-status">
          ◌ PLACEHOLDER — ADD YOUR PROJECT
        </div>
        <h3>${escapeHTML(p.name)}</h3>
        <p>${escapeHTML(p.description)}</p>
        <div class="tech-tags">
          <span>${escapeHTML(p.technologies)}</span>
        </div>
        <div class="project-links">
          ${p.github
            ? `<a href="${escapeAttr(p.github)}" target="_blank" rel="noopener">GitHub ↗</a>`
            : "<span>GitHub link pending</span>"}
          ${p.demo
            ? `<a href="${escapeAttr(p.demo)}" target="_blank" rel="noopener">Live demo ↗</a>`
            : "<span>Live demo pending</span>"}
        </div>
      </div>
    </article>`
  ).join("");

  $("#certGrid").innerHTML = CERTIFICATES.map(c =>
    `<article class="cert-card">
      <div class="cert-art">✧</div>
      <div class="cert-body">
        <small>EDITABLE PLACEHOLDER</small>
        <h3>${escapeHTML(c.name)}</h3>
        <p>${escapeHTML(c.organization)} · ${escapeHTML(c.date)}</p>
      </div>
    </article>`
  ).join("");

  const socials = [
    ["LinkedIn", content.linkedin],
    ["GitHub", content.github],
    ["Instagram", content.instagram]
  ].filter(x => x[1]);

  $("#socialLinks").innerHTML = socials.length
    ? socials.map(([n, u]) =>
        `<a href="${escapeAttr(u)}" target="_blank" rel="noopener">${n} ↗</a>`
      ).join("")
    : '<span class="muted-note">Add your social profile URLs in Edit mode.</span>';

  if (avatarVideoData) {
    $("#avatarVideo").src = avatarVideoData;
    $("#avatarVideo").style.display = "block";
    $("#avatarEmpty").style.display = "none";
    $("#avatarVideo").poster =
      photoData || "assets/profile-placeholder.svg";
    $("#avatarStatus").textContent =
      "Your uploaded AI talking video is ready. Video controls include play, pause, replay and mute.";
  } else {
    $("#avatarVideo").removeAttribute("src");
    $("#avatarVideo").style.display = "none";
    $("#avatarEmpty").style.display = "block";
  }

  $("#year").textContent =
    $("#footerYear").textContent = new Date().getFullYear();
}

function escapeHTML(s) {
  return safeText(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function escapeAttr(s) {
  return escapeHTML(s).replace(/`/g, "&#96;");
}

function showToast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2400);
}

function loadSaved() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );

    content = { ...DEFAULT_CONTENT, ...saved.content };
    photoData = saved.photo || "";
    avatarVideoData = saved.video || "";
    resumeData = saved.resume || "";
    resumeName = saved.resumeName || "";
  } catch (e) {
    content = { ...DEFAULT_CONTENT };
  }
}

function persist() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        content,
        photo: photoData,
        video: avatarVideoData,
        resume: resumeData,
        resumeName
      })
    );

    showToast("Portfolio changes saved in this browser.");
  } catch (e) {
    showToast("Storage is full. Try a smaller image or video file.");
  }
}

function openEditor() {
  document.body.classList.add("editor-open");

  $$("[data-field]").forEach(el => {
    el.value = content[el.dataset.field] || "";
  });
}

function closeEditor() {
  document.body.classList.remove("editor-open");
}

function saveEditor() {
  $$("[data-field]").forEach(el => {
    content[el.dataset.field] = el.value.trim();
  });

  renderContent();
  persist();
  closeEditor();
}

$("#editToggle").addEventListener("click", openEditor);
$("#closeEditor").addEventListener("click", closeEditor);
$("#editBackdrop").addEventListener("click", closeEditor);
$("#saveEdits").addEventListener("click", saveEditor);
$("#saveEditsBottom").addEventListener("click", saveEditor);

$("#resetEdits").addEventListener("click", () => {
  if (confirm("Reset all text and uploaded media to the original placeholders?")) {
    content = { ...DEFAULT_CONTENT };
    photoData = "";
    avatarVideoData = "";
    resumeData = "";
    resumeName = "";

    localStorage.removeItem(STORAGE_KEY);
    renderContent();
    openEditor();
    showToast("Portfolio reset.");
  }
});

function readUpload(input, callback, maxMB) {
  const f = input.files?.[0];

  if (!f) return;

  if (f.size > maxMB * 1024 * 1024) {
    showToast(`Please choose a file smaller than ${maxMB} MB.`);
    input.value = "";
    return;
  }

  const r = new FileReader();

  r.onload = () => {
    callback(r.result, f);
    persist();
    renderContent();
  };

  r.readAsDataURL(f);
}

$("#photoUpload").addEventListener("change", e =>
  readUpload(e.target, data => {
    photoData = data;
    showToast("Profile photo updated.");
  }, 5)
);

$("#videoUpload").addEventListener("change", e =>
  readUpload(e.target, data => {
    avatarVideoData = data;
    showToast("Avatar video uploaded.");
  }, 25)
);

$("#resumeUpload").addEventListener("change", e =>
  readUpload(e.target, (data, file) => {
    resumeData = data;
    resumeName = file.name;
    $("#resumeStatus").textContent = `Ready: ${resumeName}`;
    showToast("Resume PDF added.");
  }, 8)
);

$("#resumeButton").addEventListener("click", () => {
  if (!resumeData) {
    showToast("Upload your resume PDF in Edit portfolio first.");
    return;
  }

  const a = document.createElement("a");
  a.href = resumeData;
  a.download = resumeName || "Kanishka-Senthilkumar-Resume.pdf";
  a.click();
});

// ===================== FEMALE-SOUNDING ENGLISH VOICE =====================

function getFemaleEnglishVoice() {
  const voices = window.speechSynthesis.getVoices();

  const englishVoices = voices.filter(voice =>
    /^en([-_]|$)/i.test(voice.lang)
  );

  const femaleNames =
    /zira|samantha|aria|jenny|susan|ava|karen|moira|tessa|veena|lekha|female/i;

  return (
    englishVoices.find(voice => femaleNames.test(voice.name)) ||
    englishVoices.find(voice => /^en-IN/i.test(voice.lang)) ||
    englishVoices.find(voice => /^en-US/i.test(voice.lang)) ||
    englishVoices[0] ||
    null
  );
}

function speak() {
  if (avatarVideoData) {
    const v = $("#avatarVideo");
    v.muted = false;
    v.play().catch(() =>
      showToast("Tap play on the video to start.")
    );
    return;
  }

  if (!("speechSynthesis" in window)) {
    showToast("Speech playback is not supported in this browser.");
    return;
  }

  speechSynthesis.cancel();

  speechUtterance =
    new SpeechSynthesisUtterance(content.welcomeSpeech);

  const femaleVoice = getFemaleEnglishVoice();

  if (femaleVoice) {
    speechUtterance.voice = femaleVoice;
    speechUtterance.lang = femaleVoice.lang;
  } else {
    speechUtterance.lang = "en-IN";
    showToast(
      "No matching female English voice found. Using the default English voice."
    );
  }

  speechUtterance.rate = 0.94;
  speechUtterance.pitch = 1.08;

  speechUtterance.onstart = () => {
    $("#avatarStatus").textContent = femaleVoice
      ? `Playing voice preview: ${femaleVoice.name}`
      : "Playing browser-generated voice preview.";
  };

  speechUtterance.onend = () => {
    $("#avatarStatus").textContent =
      "Voice preview finished. Upload an AI talking video for synchronized lip movement.";
  };

  speechSynthesis.speak(speechUtterance);
}

// Load available browser voices.
if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
  };
}

// ===================== VOICE BUTTON CONTROLS =====================

$("#meetButton").addEventListener("click", speak);

$("#pauseButton").addEventListener("click", () => {
  if (avatarVideoData) {
    const v = $("#avatarVideo");

    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  } else if ("speechSynthesis" in window) {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      speechPaused = true;
    } else if (speechPaused) {
      speechSynthesis.resume();
      speechPaused = false;
    } else {
      speak();
    }
  }
});

$("#replayButton").addEventListener("click", () => {
  if (avatarVideoData) {
    const v = $("#avatarVideo");
    v.currentTime = 0;
    v.play().catch(() => {});
  } else {
    speak();
  }
});

$("#muteButton").addEventListener("click", () => {
  if (avatarVideoData) {
    const v = $("#avatarVideo");
    v.muted = !v.muted;
    $("#muteButton").textContent = v.muted ? "×" : "♫";
  } else if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
    $("#avatarStatus").textContent =
      "Voice preview stopped.";
  }
});

// ===================== CONTACT FORM =====================

$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const d = new FormData(e.currentTarget);
  const subject = encodeURIComponent(d.get("subject"));

  const body = encodeURIComponent(
    `Name: ${d.get("name")}\nEmail: ${d.get("email")}\n\n${d.get("message")}`
  );

  window.location.href =
    `mailto:${content.email}?subject=${subject}&body=${body}`;
});

// ===================== NAVIGATION =====================

$("#mobileMenu").addEventListener("click", () =>
  $("#sidebar").classList.toggle("mobile-open")
);

$$(".side-nav a").forEach(a =>
  a.addEventListener("click", () =>
    $("#sidebar").classList.remove("mobile-open")
  )
);

const sections = $$(".main-content section[id]");
const navLinks = $$(".side-nav a");

const observer = new IntersectionObserver(entries =>
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a =>
        a.classList.toggle(
          "active",
          a.getAttribute("href") === "#" + e.target.id
        )
      );

      $("#currentSection").textContent =
        e.target.id.toUpperCase();
    }
  }),
  { rootMargin: "-30% 0px -60% 0px" }
);

sections.forEach(s => observer.observe(s));

// ===================== ANIMATIONS =====================

const revealObserver = new IntersectionObserver(entries =>
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

$$(".hero-copy,.hero-visual").forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ===================== START PORTFOLIO =====================

loadSaved();
renderContent();