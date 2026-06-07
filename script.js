/* ═══════════════════════════════════════════════════════
   RAJ VERMA — PORTFOLIO JAVASCRIPT
   Animations · Scroll Effects · Navigation · Interactivity
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. FLOATING PARTICLES ────────────────────────────
  const particleContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 40;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 8) + 's';
    p.style.animationDelay = (Math.random() * 6) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    p.style.opacity = 0;
    particleContainer.appendChild(p);
  }


  // ── 2. NAVBAR — Scroll effect & Active link ──────────
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section');

  function handleNavScroll() {
    const scrollY = window.scrollY;

    // Add/remove scrolled class
    navbar.classList.toggle('scrolled', scrollY > 60);

    // Update active link
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  // ── 3. MOBILE NAV TOGGLE ─────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });


  // ── 4. SCROLL REVEAL (Intersection Observer) ─────────
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ── 5. SKILL BAR ANIMATION ───────────────────────────
  const skillFills = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        skillFills.forEach(bar => {
          const target = bar.getAttribute('data-width');
          // Slight stagger
          setTimeout(() => {
            bar.style.width = target + '%';
          }, Math.random() * 400);
        });
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillObserver.observe(skillsSection);


  // ── 6. STATS COUNTER ANIMATION ───────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + '+';
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(num => animateCounter(num));
      }
    });
  }, { threshold: 0.3 });

  const achievementsSection = document.getElementById('achievements');
  if (achievementsSection) statsObserver.observe(achievementsSection);


  // ── 7. CERTIFICATE MODAL (Lightbox) ──────────────────
  const certModal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  const certCards = document.querySelectorAll('.cert-card');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.querySelector('.cert-image-wrapper img')?.src;
      if (imgSrc) {
        modalImg.src = imgSrc;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });


  // ── 8. CONTACT FORM HANDLING ─────────────────────────
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Open Gmail compose in a new tab with pre-written contact information
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=i.rajverma8423@gmail.com&su=${encodeURIComponent(subject || 'Portfolio Contact: ' + name)}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    window.open(gmailLink, '_blank');

    // Visual feedback
    const btn = contactForm.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!`;
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });


  // ── 9. SMOOTH SCROLL (with offset) ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ── 10. TILT EFFECT ON GLASS CARDS ───────────────────
  const cards = document.querySelectorAll('.glass-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ── 11. TYPING EFFECT FOR DESIGNATIONS ───────────────
  const designations = ['Software Engineer', 'AI/ML Developer', 'Open Source Contributor'];
  const designationEl = document.querySelector('.hero-designations');

  if (designationEl) {
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    // Keep the cursor
    const cursor = designationEl.querySelector('.typing-cursor');

    function typeDesignation() {
      const current = designations[currentIndex];

      if (isDeleting) {
        charIndex--;
        typingSpeed = 40;
      } else {
        charIndex++;
        typingSpeed = 80;
      }

      // Build display string with all previous completed designations
      let display = '';
      for (let i = 0; i < currentIndex; i++) {
        display += designations[i] + ' <span>·</span> ';
      }
      display += current.substring(0, charIndex);

      // If current word is complete and there are more
      if (!isDeleting && charIndex === current.length) {
        if (currentIndex < designations.length - 1) {
          // Pause, then move to next word
          setTimeout(() => {
            currentIndex++;
            charIndex = 0;
            typeDesignation();
          }, 1200);
          designationEl.innerHTML = display + (cursor ? '<span class="typing-cursor"></span>' : '');
          return;
        } else {
          // All done — show final result
          designationEl.innerHTML = designations.join(' <span>·</span> ');
          return;
        }
      }

      designationEl.innerHTML = display + (cursor ? '<span class="typing-cursor"></span>' : '');

      setTimeout(typeDesignation, typingSpeed);
    }

    // Start typing after hero animations finish
    setTimeout(() => {
      designationEl.innerHTML = '<span class="typing-cursor"></span>';
      typeDesignation();
    }, 1800);
  }


  // ── 12. PARALLAX SUBTLE EFFECT ON HERO ───────────────
  const hero = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      const heroContent = hero.querySelector('.container');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
      }
    }
  }, { passive: true });


  // ── 13. PAGE LOAD ANIMATION ──────────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });


  // ── 14. THEME SWITCHER ──────────────────────────────
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeDropdown = document.getElementById('themeDropdown');
  const themeOptions = document.querySelectorAll('.theme-option');

  // Load saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'navy-gold';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('open');
    // Close lang dropdown if open
    document.getElementById('langDropdown').classList.remove('open');
  });

  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      applyTheme(theme);
      localStorage.setItem('portfolio-theme', theme);
      themeDropdown.classList.remove('open');
    });
  });

  function applyTheme(theme) {
    if (theme === 'navy-gold') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }

    // Update active state in dropdown
    themeOptions.forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-theme') === theme);
    });
  }


  // ── 15. LANGUAGE TOGGLE ─────────────────────────────
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langDropdown = document.getElementById('langDropdown');
  const langOptions = document.querySelectorAll('.lang-option');
  const langLabel = document.getElementById('langLabel');

  const translations = {
    en: {
      // Nav
      nav_home: 'Home', nav_about: 'About', nav_experience: 'Experience',
      nav_education: 'Education', nav_projects: 'Projects', nav_skills: 'Skills',
      nav_certifications: 'Certifications', nav_achievements: 'Achievements',
      nav_contact: 'Contact', resume: 'Resume',
      // Hero
      hero_cta1: 'Learn More About Me', hero_cta2: 'Get In Touch',
      // Section labels
      label_about: 'Get To Know Me', title_about: 'About',
      label_experience: "Where I've Worked", title_experience: 'Work',
      label_education: 'Academic Background', title_education: 'My',
      label_projects: "What I've Built", title_projects: 'Featured',
      label_skills: 'Technical Proficiency', title_skills: 'My',
      label_certifications: 'Professional Development', title_certifications: 'My',
      label_achievements: 'Recognition & Awards', title_achievements: 'My',
      label_contact: 'Reach Out', title_contact: "Let's",
      // Contact
      contact_heading: "Let's Build Something",
      contact_heading_gold: 'Great Together',
      contact_desc: "I'm always open to discussing new opportunities, collaborations, or just chatting about tech. Feel free to reach out!",
      contact_name: 'Your Name', contact_email: 'Your Email',
      contact_subject: 'Subject', contact_message: 'Message',
      contact_send: 'Send Message',
      // Footer
      footer_tagline: '"Engineering intelligent systems, one commit at a time."',
      // About
      about_who: '// who_i_am',
      about_mission: '🎯 Mission',
      about_vision: '🔭 Vision',
      about_btn_exp: 'Work Experience', about_btn_edu: 'Education',
      about_btn_proj: 'Projects', about_btn_skills: 'Skills',
      about_btn_cert: 'Certifications',
      // Stats
      stat_exp: 'Years Experience', stat_cert: 'Certifications',
      stat_proj: 'Projects', stat_awards: 'Awards',
      // Exp
      exp_responsibilities: 'Key Responsibilities', exp_achievements: 'Key Achievements',
      // Project
      proj_outcomes: 'Key Outcomes',
    },
    hi: {
      // Nav
      nav_home: 'होम', nav_about: 'परिचय', nav_experience: 'अनुभव',
      nav_education: 'शिक्षा', nav_projects: 'प्रोजेक्ट्स', nav_skills: 'कौशल',
      nav_certifications: 'प्रमाणपत्र', nav_achievements: 'उपलब्धियाँ',
      nav_contact: 'संपर्क', resume: 'रिज़्यूमे',
      // Hero
      hero_cta1: 'मेरे बारे में जानें', hero_cta2: 'संपर्क करें',
      // Section labels
      label_about: 'मुझे जानिए', title_about: 'मेरे बारे',
      label_experience: 'मैंने कहाँ काम किया', title_experience: 'कार्य',
      label_education: 'शैक्षिक पृष्ठभूमि', title_education: 'मेरी',
      label_projects: 'मैंने क्या बनाया', title_projects: 'प्रमुख',
      label_skills: 'तकनीकी दक्षता', title_skills: 'मेरे',
      label_certifications: 'व्यावसायिक विकास', title_certifications: 'मेरे',
      label_achievements: 'मान्यता और पुरस्कार', title_achievements: 'मेरी',
      label_contact: 'संपर्क करें', title_contact: 'आइए',
      // Contact
      contact_heading: 'आइए कुछ शानदार',
      contact_heading_gold: 'साथ बनाएँ',
      contact_desc: 'मैं हमेशा नए अवसरों, सहयोग या तकनीक पर चर्चा करने के लिए तैयार हूँ। बेझिझक संपर्क करें!',
      contact_name: 'आपका नाम', contact_email: 'आपका ईमेल',
      contact_subject: 'विषय', contact_message: 'संदेश',
      contact_send: 'संदेश भेजें',
      // Footer
      footer_tagline: '"बुद्धिमान सिस्टम बनाना, एक कमिट एक बार।"',
      // About
      about_who: '// मैं_कौन_हूँ',
      about_mission: '🎯 मिशन',
      about_vision: '🔭 विज़न',
      about_btn_exp: 'कार्य अनुभव', about_btn_edu: 'शिक्षा',
      about_btn_proj: 'प्रोजेक्ट्स', about_btn_skills: 'कौशल',
      about_btn_cert: 'प्रमाणपत्र',
      // Stats
      stat_exp: 'वर्ष अनुभव', stat_cert: 'प्रमाणपत्र',
      stat_proj: 'प्रोजेक्ट्स', stat_awards: 'पुरस्कार',
      // Exp
      exp_responsibilities: 'मुख्य जिम्मेदारियाँ', exp_achievements: 'मुख्य उपलब्धियाँ',
      // Project
      proj_outcomes: 'मुख्य परिणाम',
    }
  };

  const savedLang = localStorage.getItem('portfolio-lang') || 'en';
  applyLanguage(savedLang);

  langToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
    themeDropdown.classList.remove('open');
  });

  langOptions.forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-lang');
      applyLanguage(lang);
      localStorage.setItem('portfolio-lang', lang);
      langDropdown.classList.remove('open');
    });
  });

  function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    langLabel.textContent = lang.toUpperCase();
    langOptions.forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    // Nav links
    const navItems = document.querySelectorAll('.nav-links a');
    const navKeys = ['nav_home','nav_about','nav_experience','nav_education','nav_projects','nav_skills','nav_certifications','nav_achievements','nav_contact'];
    navItems.forEach((link, i) => {
      if (navKeys[i] && t[navKeys[i]]) link.textContent = t[navKeys[i]];
    });

    // Resume button text
    const resumeSpan = document.querySelector('#resumeBtn [data-i18n="resume"]');
    if (resumeSpan) resumeSpan.textContent = t.resume;

    // Hero CTAs
    const ctaBtns = document.querySelectorAll('.hero-cta-group .btn');
    if (ctaBtns[0]) {
      const svg0 = ctaBtns[0].querySelector('svg');
      ctaBtns[0].innerHTML = '';
      if (svg0) ctaBtns[0].appendChild(svg0);
      ctaBtns[0].append(' ' + t.hero_cta1);
    }
    if (ctaBtns[1]) {
      const svg1 = ctaBtns[1].querySelector('svg');
      ctaBtns[1].innerHTML = '';
      if (svg1) ctaBtns[1].appendChild(svg1);
      ctaBtns[1].append(' ' + t.hero_cta2);
    }

    // Section labels & titles
    const sectionKeys = ['about','experience','education','projects','skills','certifications','achievements','contact'];
    sectionKeys.forEach(key => {
      const sec = document.getElementById(key);
      if (!sec) return;
      const label = sec.querySelector('.section-label');
      const title = sec.querySelector('.section-title');
      if (label && t['label_' + key]) label.textContent = t['label_' + key];
      if (title && t['title_' + key]) {
        const goldSpan = title.querySelector('.gold');
        if (goldSpan) {
          title.childNodes[0].textContent = t['title_' + key] + ' ';
        }
      }
    });

    // Contact section
    const contactH3 = document.querySelector('.contact-info h3');
    if (contactH3) {
      contactH3.innerHTML = t.contact_heading + ' <span class="gold">' + t.contact_heading_gold + '</span>';
    }
    const contactP = document.querySelector('.contact-info > p');
    if (contactP) contactP.textContent = t.contact_desc;

    // Form labels
    const formLabels = document.querySelectorAll('.form-group label');
    const labelKeys = ['contact_name','contact_email','contact_subject','contact_message'];
    formLabels.forEach((lbl, i) => {
      if (labelKeys[i] && t[labelKeys[i]]) lbl.textContent = t[labelKeys[i]];
    });

    // Submit button text
    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn) {
      const svgSub = submitBtn.querySelector('svg');
      submitBtn.innerHTML = '';
      if (svgSub) submitBtn.appendChild(svgSub);
      submitBtn.append(' ' + t.contact_send);
    }

    // Footer tagline
    const tagline = document.querySelector('.footer-tagline');
    if (tagline) tagline.textContent = t.footer_tagline;

    // About section
    const aboutWho = document.querySelector('.about-text h3');
    if (aboutWho) aboutWho.textContent = t.about_who;

    const mvCards = document.querySelectorAll('.mv-card h4');
    if (mvCards[0]) mvCards[0].textContent = t.about_mission;
    if (mvCards[1]) mvCards[1].textContent = t.about_vision;

    const aboutBtns = document.querySelectorAll('.about-cta-group .btn-sm');
    const aboutBtnKeys = ['about_btn_exp','about_btn_edu','about_btn_proj','about_btn_skills','about_btn_cert'];
    aboutBtns.forEach((btn, i) => {
      if (aboutBtnKeys[i] && t[aboutBtnKeys[i]]) btn.textContent = t[aboutBtnKeys[i]];
    });

    // Stat labels
    const statLabels = document.querySelectorAll('.stat-label');
    const statKeys = ['stat_exp','stat_cert','stat_proj','stat_awards'];
    statLabels.forEach((sl, i) => {
      if (statKeys[i] && t[statKeys[i]]) sl.textContent = t[statKeys[i]];
    });

    // Experience section titles
    const expSectionTitles = document.querySelectorAll('.exp-section-title');
    if (expSectionTitles[0]) expSectionTitles[0].textContent = t.exp_responsibilities;
    if (expSectionTitles[1]) expSectionTitles[1].textContent = t.exp_achievements;

    // Project outcomes titles
    const projOutcomes = document.querySelectorAll('.project-outcomes h4');
    projOutcomes.forEach(h4 => { h4.textContent = t.proj_outcomes; });
  }


  // ── 16. CLOSE DROPDOWNS ON OUTSIDE CLICK ────────────
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.theme-switcher')) {
      themeDropdown.classList.remove('open');
    }
    if (!e.target.closest('.lang-switcher')) {
      langDropdown.classList.remove('open');
    }
  });


  // ── 17. TERMINAL AI AGENT INTERACTIVITY ─────────────
  const terminalLauncher = document.getElementById('terminalLauncher');
  const terminalContainer = document.getElementById('terminalContainer');
  const terminalClose = document.getElementById('terminalClose');
  const terminalMinimize = document.getElementById('terminalMinimize');
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');

  if (terminalLauncher && terminalContainer && terminalInput && terminalBody) {
    let commandHistory = [];
    let historyIndex = -1;

    // Toggle terminal visibility
    terminalLauncher.addEventListener('click', () => {
      terminalContainer.classList.toggle('open');
      if (terminalContainer.classList.contains('open')) {
        terminalInput.focus();
      }
    });

    const closeTerminal = () => {
      terminalContainer.classList.remove('open');
    };

    if (terminalClose) terminalClose.addEventListener('click', closeTerminal);
    if (terminalMinimize) terminalMinimize.addEventListener('click', closeTerminal);

    // Focus input when clicking terminal body
    terminalBody.addEventListener('click', () => {
      terminalInput.focus();
    });

    // Helper to append a line to the terminal
    function appendTerminalLine(content, className = '') {
      const line = document.createElement('div');
      line.className = `terminal-line ${className}`;
      line.innerHTML = content;
      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // AI response database / query engine
    function getAIResponse(query) {
      const q = query.toLowerCase().trim();

      // Commands check
      if (q === 'help') {
        return `Available terminal commands:<br>
        - <span class="highlight">ls</span>: List profile text files<br>
        - <span class="highlight">cat &lt;file&gt;</span>: View file content (e.g., <span class="highlight">cat about.txt</span>)<br>
        - <span class="highlight">about</span>: Short professional summary<br>
        - <span class="highlight">skills</span>: List key technologies<br>
        - <span class="highlight">projects</span>: View featured creations<br>
        - <span class="highlight">contact</span>: Get contact channels<br>
        - <span class="highlight">clear</span>: Clear terminal screen`;
      }
      if (q === 'ls') {
        return `about.txt      skills.txt      projects.txt      contact.txt`;
      }
      if (q === 'about' || q === 'cat about.txt') {
        return `<span class="highlight">Raj Verma</span> is a Computer Science (AI & ML) sophomore at VIT Bhopal University. He is currently a Software Engineering Intern at <span class="success">FOSSEE, IIT Bombay</span>, where he engineered the LCCA module for the structural engineering platform Osdag. GPA: 8.96. NCC Air Wing Captain.`;
      }
      if (q === 'skills' || q === 'cat skills.txt') {
        return `Key Technical Skills:<br>
        - <span class="highlight">Languages:</span> Python, JavaScript, Java, C++, HTML/CSS<br>
        - <span class="highlight">Frameworks:</span> React, Node.js, Express, FastAPI, PyQt, scikit-learn<br>
        - <span class="highlight">Cloud/DB:</span> AWS, SQL/SQLite, MongoDB, Supabase, Firebase`;
      }
      if (q === 'projects' || q === 'cat projects.txt') {
        return `Featured Projects:<br>
        1. <span class="highlight">Wave Academy:</span> Full-stack school portal serving 1500+ students using Supabase + Firebase.<br>
        2. <span class="highlight">Code Reviewer AI:</span> Automated architecture and security reviewer powered by Google Gemini API.`;
      }
      if (q === 'contact' || q === 'cat contact.txt') {
        return `Contact Channels:<br>
        - <span class="highlight">Email:</span> i.rajverma8423@gmail.com<br>
        - <span class="highlight">Phone:</span> +91-9807486339<br>
        - <span class="highlight">GitHub:</span> github.com/irajverma<br>
        - <span class="highlight">LinkedIn:</span> linkedin.com/in/raj-verma-459320232`;
      }

      // Keyword mapping for natural questions
      if (q.includes('college') || q.includes('university') || q.includes('study') || q.includes('vit') || q.includes('bhopal')) {
        return `Raj studies at <span class="highlight">VIT Bhopal University</span>. He is pursuing a B.Tech in Computer Science Engineering (specialising in Artificial Intelligence & Machine Learning).`;
      }
      if (q.includes('intern') || q.includes('work') || q.includes('experience') || q.includes('iit') || q.includes('bombay') || q.includes('fossee') || q.includes('osdag') || q.includes('lcca')) {
        return `Raj is a Software Engineering Intern at <span class="success">FOSSEE, IIT Bombay</span>. He works on the Osdag project, where he successfully implemented the Life Cycle Cost Assessment (LCCA) module using Python and SQLite.`;
      }
      if (q.includes('hackathon') || q.includes('hackmol') || q.includes('jalandhar') || q.includes('nit')) {
        return `Raj was a <span class="highlight">Top 10 Finalist</span> at HackMol 6.0, a national-level hackathon at NIT Jalandhar, competing against hundreds of teams.`;
      }
      if (q.includes('gpa') || q.includes('cgpa') || q.includes('grade') || q.includes('pointer')) {
        return `Raj maintains an excellent academic record with a cumulative GPA of <span class="highlight">8.96</span> at VIT Bhopal.`;
      }
      if (q.includes('certificate') || q.includes('certifications') || q.includes('credential')) {
        return `Raj holds credentials including:<br>
        - <span class="highlight">Google IT Support</span> Professional Certificate<br>
        - <span class="highlight">MERN Full Stack</span> Certification (Ethnus)<br>
        - <span class="highlight">Applied Machine Learning in Python</span> (University of Michigan/Coursera)<br>
        - <span class="highlight">Deloitte Job Simulation</span> Certificate`;
      }
      if (q.includes('resume') || q.includes('cv')) {
        return `You can download Raj's resume directly using the golden <span class="highlight">Download Resume</span> button in the home screen, or access it at <a href="ResumeRajVerma.pdf" download class="highlight">ResumeRajVerma.pdf</a>.`;
      }
      if (q.includes('ncc') || q.includes('captain') || q.includes('air wing')) {
        return `Raj holds the captaincy in the <span class="highlight">NCC Air Wing</span>, showcasing leadership and discipline alongside his engineering skills.`;
      }

      // Default fallback
      return `AI Agent: I'm not fully sure about "${query}".<br>
      Try asking about his <span class="highlight">internship</span>, <span class="highlight">college</span>, <span class="highlight">GPA</span>, <span class="highlight">hackathons</span>, or type <span class="highlight">help</span> to list console commands.`;
    }

    // Handle command execution
    function executeCommand(cmdText) {
      const trimmed = cmdText.trim();
      if (!trimmed) return;

      // Echo command
      appendTerminalLine(`<span class="terminal-input-prompt">guest@rajverma:~$</span> <span class="terminal-command-echo">${escapeHtml(trimmed)}</span>`);

      // Add to history
      commandHistory.push(trimmed);
      historyIndex = commandHistory.length;

      // Special command: clear
      if (trimmed.toLowerCase() === 'clear') {
        terminalBody.innerHTML = '';
        return;
      }

      // Simulated processing latency
      appendTerminalLine(`Processing query...`, 'terminal-response processing-text');
      const processingLines = terminalBody.querySelectorAll('.processing-text');
      const lastProcessingLine = processingLines[processingLines.length - 1];

      setTimeout(() => {
        if (lastProcessingLine) lastProcessingLine.remove();
        const response = getAIResponse(trimmed);
        appendTerminalLine(response, 'terminal-response');
      }, 350 + Math.random() * 200);
    }

    // Helper to escape HTML tags in echo
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.innerText = text;
      return div.innerHTML;
    }

    // Terminal Input Event Listener
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        if (val) {
          executeCommand(val);
          terminalInput.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

});
