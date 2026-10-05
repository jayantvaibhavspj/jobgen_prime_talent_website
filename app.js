/**
 * Prime Talent Solutions Pty Ltd | Official Logic & Interactive Engine
 * Executive Corporate Luxury (Modeled on Get Ahead Real Estate & JobGen)
 * Sydney, Australia • Powered by JobGen.ai
 * 
 * Features:
 * - Instant SPA Client-Side Router (0ms instant page switching, zero page reload)
 * - Hero Video & 30 FPS Network Particles Engine
 * - 2026 Australian Tech Salary & Day Rate Calculator
 * - Dynamic Counter Engine
 * - PrimeBot Draggable AI Copilot
 * - Live 30 FPS Tech Motion Watermarks
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 0. TOAST NOTIFICATION HELPER
  // =========================================================================
  function showToast(message) {
    const toast = document.getElementById('toastBubble');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  }

  // =========================================================================
  // 1. HERO BACKGROUND VIDEO CONTROLLER
  // =========================================================================
  let heroVideoCleanup = null;

  function initHeroVideo() {
    if (heroVideoCleanup) {
      heroVideoCleanup();
      heroVideoCleanup = null;
    }

    const video = document.getElementById('heroBgVideo');
    const fallback = document.getElementById('heroBgFallback');
    const toggleBtn = document.getElementById('heroVideoToggle');
    const pauseIcon = document.getElementById('heroPauseIcon');
    const playIcon = document.getElementById('heroPlayIcon');

    if (!video) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      video.removeAttribute('autoplay');
      return;
    }

    function markVideoReady() {
      video.classList.add('video-ready');
      if (fallback) fallback.classList.add('hidden');
    }

    video.addEventListener('canplay', markVideoReady);
    video.addEventListener('playing', markVideoReady);
    video.addEventListener('loadeddata', markVideoReady);
    if (video.readyState >= 2) {
      markVideoReady();
    }

    video.addEventListener('error', () => {
      video.style.display = 'none';
      if (fallback) fallback.style.opacity = '0.38';
    });

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.classList.remove('video-ready');
        if (fallback) fallback.classList.remove('hidden');
      });
    }

    function onToggle() {
      if (video.paused) {
        video.play();
        if (pauseIcon) pauseIcon.style.display = '';
        if (playIcon) playIcon.style.display = 'none';
        toggleBtn.setAttribute('title', 'Pause background video');
        video.classList.remove('user-paused');
      } else {
        video.pause();
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (playIcon) playIcon.style.display = '';
        toggleBtn.setAttribute('title', 'Play background video');
        video.classList.add('user-paused');
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', onToggle);
    }

    function onVisibilityChange() {
      if (document.hidden) {
        video.pause();
      } else {
        if (!video.classList.contains('user-paused')) {
          video.play().catch(() => {});
        }
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    let observer = null;
    const heroSection = document.getElementById('hero');
    if ('IntersectionObserver' in window && heroSection) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!video.classList.contains('user-paused')) {
              video.play().catch(() => {});
            }
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(heroSection);
    }

    heroVideoCleanup = () => {
      if (video) video.pause();
      if (toggleBtn) toggleBtn.removeEventListener('click', onToggle);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (observer) observer.disconnect();
    };
  }

  // =========================================================================
  // 2. HERO NETWORK PARTICLES CANVAS (Enterprise Tech Motion Graphics)
  // =========================================================================
  let heroAnimId = null;

  function initHeroNetworkCanvas() {
    if (heroAnimId) {
      cancelAnimationFrame(heroAnimId);
      heroAnimId = null;
    }

    const canvas = document.getElementById('heroNetworkCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, maxDist: 150 };

    function resizeCanvas() {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.35 ? 'rgba(14, 165, 233, ' : 'rgba(245, 158, 11, ';
        this.alpha = Math.random() * 0.6 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.maxDist) {
            const force = (mouse.maxDist - dist) / mouse.maxDist;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 18000), 45);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.20;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    let lastTime = performance.now();

    function animate(currentTime) {
      heroAnimId = requestAnimationFrame(animate);
      if (!currentTime) currentTime = performance.now();
      const elapsed = currentTime - lastTime;
      if (elapsed < frameInterval) return;
      lastTime = currentTime - (elapsed % frameInterval);

      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
    }

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    animate();
  }

  // =========================================================================
  // 3. STATS NUMBER COUNTER (Counts up from 0 to High targets after delay)
  // =========================================================================
  let statsInterval = null;

  function animateSingleCounter(el, target, duration = 1800) {
    const startTime = performance.now();
    el.textContent = '0';
    el.classList.remove('count-pulse');

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(ease * target);
      el.textContent = val;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target;
        el.classList.add('count-pulse');
      }
    }
    requestAnimationFrame(frame);
  }

  function runStatsCounter() {
    const statCounters = document.querySelectorAll('.stat-counter');
    if (!statCounters.length) return;

    statCounters.forEach((counter, idx) => {
      const target = parseInt(counter.getAttribute('data-count'), 10) || 0;
      setTimeout(() => {
        animateSingleCounter(counter, target, 1700);
      }, idx * 120);
    });
  }

  function initStatsCounter() {
    if (statsInterval) {
      clearInterval(statsInterval);
      statsInterval = null;
    }

    const statCounters = document.querySelectorAll('.stat-counter');
    if (!statCounters.length) return;

    setTimeout(() => {
      runStatsCounter();
    }, 600);

    statsInterval = setInterval(() => {
      const dock = document.querySelector('.hero-metrics-dock');
      if (dock) {
        const rect = dock.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          runStatsCounter();
        }
      }
    }, 12000);

    const metricsDock = document.querySelector('.hero-metrics-dock');
    if (metricsDock) {
      let hoverDebounce = null;
      metricsDock.addEventListener('mouseenter', () => {
        clearTimeout(hoverDebounce);
        hoverDebounce = setTimeout(() => {
          runStatsCounter();
        }, 150);
      });
    }
  }

  // =========================================================================
  // 4. AUSTRALIAN TECH SALARY & DAY RATE CALCULATOR 2026
  // =========================================================================
  const roleDatasets = {
    cloud: [
      { name: "Cloud Solutions Architect", contract: 1350, perm: 205000, spread: "$1,200 – $1,550", insight: "High enterprise demand across Sydney financial hubs. Multi-cloud AWS/Azure certification commanded at 15% premium." },
      { name: "Lead DevOps / Platform Engineer", contract: 1250, perm: 185000, spread: "$1,100 – $1,400", insight: "Kubernetes, Terraform & GitOps skills are in extremely short supply across NSW & VIC." },
      { name: "Site Reliability Engineer (SRE)", contract: 1300, perm: 190000, spread: "$1,150 – $1,450", insight: "Critical for Tier-1 banks adhering to APRA CPS 230 operational risk regulations." }
    ],
    data: [
      { name: "Snowflake & Databricks Data Engineer", contract: 1350, perm: 195000, spread: "$1,200 – $1,500", insight: "Top 3 highest demand skill in Australia. Lakehouse migration projects driving rapid hiring." },
      { name: "Principal Data Architect", contract: 1500, perm: 220000, spread: "$1,350 – $1,700", insight: "Enterprise data governance, medallion architecture, and regulatory compliance expertise required." },
      { name: "GenAI & MLOps Specialist", contract: 1450, perm: 215000, spread: "$1,300 – $1,650", insight: "Fastest growing demand profile in 2026. Private enterprise LLM deployments surging." }
    ],
    cyber: [
      { name: "Zero-Trust & Cyber Security Architect", contract: 1450, perm: 215000, spread: "$1,300 – $1,650", insight: "Directly driven by APRA CPS 234 mandate enforcement and ASD Essential 8 maturity." },
      { name: "Lead SecOps & Incident Response", contract: 1300, perm: 190000, spread: "$1,150 – $1,450", insight: "24/7 detection and response orchestration in high demand across financial services." },
      { name: "GRC & Cyber Compliance Consultant", contract: 1250, perm: 180000, spread: "$1,100 – $1,400", insight: "ISO 27001, SOC 2, and Australian Privacy Principles readiness projects." }
    ],
    digital: [
      { name: "Enterprise Agile Program Director (SAFe)", contract: 1550, perm: 235000, spread: "$1,400 – $1,750", insight: "Multi-million dollar public sector & enterprise delivery governance." },
      { name: "Lead Technical Business Analyst", contract: 1150, perm: 170000, spread: "$1,000 – $1,300", insight: "Crucial translation layer between core banking API engineers and executive stakeholders." },
      { name: "Solution Architect (Digital Channels)", contract: 1400, perm: 210000, spread: "$1,250 – $1,600", insight: "Modern mobile and customer experience banking transformations." }
    ]
  };

  function initSalaryCalculator() {
    const domainSelect = document.getElementById('calcDomain');
    const roleSelect = document.getElementById('calcRole');
    const rateValue = document.getElementById('rateValue');
    const ratePeriod = document.getElementById('ratePeriod');
    const rateSpread = document.getElementById('rateSpread');
    const calcInsight = document.getElementById('calcInsight');
    const seniorityBtns = document.querySelectorAll('#seniorityGroup .calc-tab-btn');
    const engagementBtns = document.querySelectorAll('#engagementGroup .calc-tab-btn');

    if (!domainSelect || !roleSelect) return;

    let currentSeniority = 'senior';
    let currentEngagement = 'contract';

    function calculateBenchmark() {
      const domain = domainSelect.value;
      const roleIndex = parseInt(roleSelect.value, 10) || 0;
      const roleData = roleDatasets[domain] ? roleDatasets[domain][roleIndex] : null;
      if (!roleData) return;

      let base = currentEngagement === 'contract' ? roleData.contract : roleData.perm;
      let multiplier = 1.0;

      if (currentSeniority === 'mid') multiplier = 0.85;
      if (currentSeniority === 'lead') multiplier = 1.18;

      const finalVal = Math.round(base * multiplier);

      if (rateValue) rateValue.textContent = finalVal.toLocaleString();
      if (currentEngagement === 'contract') {
        if (ratePeriod) ratePeriod.textContent = 'AUD / day';
        const lowSpread = Math.round(finalVal * 0.9);
        const highSpread = Math.round(finalVal * 1.12);
        if (rateSpread) rateSpread.textContent = `$${lowSpread.toLocaleString()} – $${highSpread.toLocaleString()} AUD`;
      } else {
        if (ratePeriod) ratePeriod.textContent = 'AUD / year + Super';
        const lowSpread = Math.round(finalVal * 0.92);
        const highSpread = Math.round(finalVal * 1.1);
        if (rateSpread) rateSpread.textContent = `$${lowSpread.toLocaleString()} – $${highSpread.toLocaleString()} AUD + Super`;
      }

      if (calcInsight) {
        calcInsight.innerHTML = `💡 <strong>Market Insight:</strong> ${roleData.insight}`;
      }
    }

    function populateRoles() {
      const domain = domainSelect.value;
      const roles = roleDatasets[domain] || [];
      roleSelect.innerHTML = '';
      roles.forEach((r, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = r.name;
        roleSelect.appendChild(opt);
      });
      calculateBenchmark();
    }

    domainSelect.addEventListener('change', populateRoles);
    roleSelect.addEventListener('change', calculateBenchmark);

    seniorityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        seniorityBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSeniority = btn.getAttribute('data-level');
        calculateBenchmark();
      });
    });

    engagementBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        engagementBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentEngagement = btn.getAttribute('data-engage');
        calculateBenchmark();
      });
    });

    populateRoles();
  }

  // =========================================================================
  // 5. JOBS BOARD / OPEN MANDATES FILTERING
  // =========================================================================
  function initJobFilters() {
    const filterBtns = document.querySelectorAll('#jobFilterChips .filter-chip-btn');
    const jobCards = document.querySelectorAll('#jobsGrid .job-card-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        jobCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-domain') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    document.querySelectorAll('.btn-quick-apply').forEach(btn => {
      btn.addEventListener('click', () => {
        const roleName = btn.getAttribute('data-role');
        const hubTabCandidate = document.getElementById('tabCandidate');
        if (hubTabCandidate) hubTabCandidate.click();
        const candRole = document.getElementById('candRole');
        if (candRole) candRole.value = roleName;
        const hubSection = document.getElementById('action-hub');
        if (hubSection) hubSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Applying for: ${roleName}`);
      });
    });
  }

  // =========================================================================
  // 6. 60-SECOND ACTION HUB TABS & FORMS
  // =========================================================================
  function initActionHub() {
    const tabEmployer = document.getElementById('tabEmployer');
    const tabCandidate = document.getElementById('tabCandidate');
    const employerForm = document.getElementById('employerBriefForm');
    const candidateForm = document.getElementById('candidateDropForm');

    if (tabEmployer && tabCandidate && employerForm && candidateForm) {
      tabEmployer.addEventListener('click', () => {
        tabEmployer.classList.add('active');
        tabCandidate.classList.remove('active');
        employerForm.style.display = 'block';
        candidateForm.style.display = 'none';
      });

      tabCandidate.addEventListener('click', () => {
        tabCandidate.classList.add('active');
        tabEmployer.classList.remove('active');
        candidateForm.style.display = 'block';
        employerForm.style.display = 'none';
      });
    }

    if (employerForm) {
      employerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('✓ Role brief received. Ashwin Shiv will respond within 2 hours.');
        employerForm.reset();
      });
    }

    if (candidateForm) {
      candidateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('✓ Profile submitted confidentially to Ashwin Shiv.');
        candidateForm.reset();
      });
    }

    const bookingForm = document.getElementById('strategyBookingForm');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('✓ Strategy Call confirmed with Ashwin Shiv. Calendar invite sent.');
        bookingForm.reset();
      });
    }
  }

  // =========================================================================
  // 7. PORTAL LOGIN MODAL
  // =========================================================================
  function initPortalModal() {
    const portalModal = document.getElementById('portalModal');
    const portalCloseBtn = document.getElementById('portalCloseBtn');
    const portalForm = document.getElementById('portalLoginForm');

    document.addEventListener('click', (e) => {
      if (e.target.closest('#openPortalBtn')) {
        if (portalModal) portalModal.classList.add('open');
      }
    });

    if (portalCloseBtn && portalModal) {
      portalCloseBtn.addEventListener('click', () => portalModal.classList.remove('open'));
    }
    if (portalModal) {
      portalModal.addEventListener('click', (e) => {
        if (e.target === portalModal) portalModal.classList.remove('open');
      });
    }
    if (portalForm) {
      portalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('✓ Portal authentication successful. Redirecting to workspace...');
        setTimeout(() => {
          portalModal.classList.remove('open');
        }, 1200);
      });
    }
  }

  // =========================================================================
  // 8. PRIMEBOT AI COPILOT — Draggable + Viewport-Bound
  // =========================================================================
  function initPrimeBot() {
    const botTrigger  = document.getElementById('copilotTriggerBtn');
    const botPopup    = document.getElementById('copilotPopupBubble');
    const botWindow   = document.getElementById('copilotChatWindow');
    const botClose    = document.getElementById('copilotCloseBtn');
    const botForm     = document.getElementById('copilotInputForm');
    const botInput    = document.getElementById('copilotTextInput');
    const botLog      = document.getElementById('copilotLogArea');
    const botAnchor   = document.querySelector('.copilot-floating-anchor');
    const chatHeadBar = botWindow ? botWindow.querySelector('.chat-head-bar') : null;

    if (!botTrigger || !botWindow) return;

    function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }

    function clampToViewport(el) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const r  = el.getBoundingClientRect();

      let left = parseFloat(el.style.left) || 0;
      let top  = parseFloat(el.style.top)  || 0;

      if (!el.style.left) {
        left = vw - r.width - (parseFloat(el.style.right) || 24);
        el.style.right = '';
      }
      if (!el.style.top) {
        top = vh - r.height - (parseFloat(el.style.bottom) || 24);
        el.style.bottom = '';
      }

      el.style.left = clamp(left, 8, vw - r.width  - 8) + 'px';
      el.style.top  = clamp(top,  8, vh - r.height - 8) + 'px';
    }

    function makeDraggable(el, handle) {
      if (!el || !handle) return;

      let startX, startY, startLeft, startTop, isDragging = false;

      function onPointerDown(e) {
        if (e.target.closest('button') && e.target !== handle && !handle.contains(e.target)) return;
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;

        isDragging = true;
        startX     = e.clientX;
        startY     = e.clientY;

        const rect = el.getBoundingClientRect();
        startLeft  = rect.left;
        startTop   = rect.top;

        el.style.left   = startLeft + 'px';
        el.style.top    = startTop  + 'px';
        el.style.right  = 'auto';
        el.style.bottom = 'auto';

        el.style.transition = 'none';
        document.body.style.userSelect = 'none';

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup',   onPointerUp);
        e.preventDefault();
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const w  = el.offsetWidth;
        const h  = el.offsetHeight;

        el.style.left = clamp(startLeft + dx, 8, vw - w - 8) + 'px';
        el.style.top  = clamp(startTop  + dy, 8, vh - h - 8) + 'px';
      }

      function onPointerUp() {
        isDragging = false;
        el.style.transition = '';
        document.body.style.userSelect = '';
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup',   onPointerUp);

        sessionStorage.setItem('botPos_' + el.id, JSON.stringify({
          left: el.style.left, top: el.style.top
        }));
      }

      handle.addEventListener('pointerdown', onPointerDown);

      const saved = sessionStorage.getItem('botPos_' + el.id);
      if (saved) {
        try {
          const pos = JSON.parse(saved);
          el.style.left   = pos.left;
          el.style.top    = pos.top;
          el.style.right  = 'auto';
          el.style.bottom = 'auto';
          setTimeout(() => clampToViewport(el), 0);
        } catch(e) {}
      }
    }

    if (botAnchor) makeDraggable(botAnchor, botAnchor);
    makeDraggable(botWindow, chatHeadBar);

    window.addEventListener('resize', () => {
      if (botAnchor) clampToViewport(botAnchor);
      if (botWindow && botWindow.classList.contains('open')) clampToViewport(botWindow);
    });

    function positionChatNearTrigger() {
      if (!botWindow || !botAnchor) return;
      const r  = botAnchor.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cw = 380;
      const ch = 520;
      const gap = 12;

      let left = r.left;
      let top  = r.top - ch - gap;

      if (top < 8) top = r.bottom + gap;
      if (left + cw > vw - 8) left = vw - cw - 8;
      if (left < 8) left = 8;
      if (top + ch > vh - 8) top = vh - ch - 8;

      botWindow.style.left   = left + 'px';
      botWindow.style.top    = top  + 'px';
      botWindow.style.right  = 'auto';
      botWindow.style.bottom = 'auto';
    }

    function openBot() {
      if (botWindow) {
        const saved = sessionStorage.getItem('botPos_' + botWindow.id);
        if (!saved) positionChatNearTrigger();
        botWindow.classList.add('open');
        if (botAnchor) botAnchor.classList.add('chat-open');
        if (botInput) botInput.focus();
      }
    }

    function closeBot() {
      if (botWindow) {
        botWindow.classList.remove('open');
        if (botAnchor) botAnchor.classList.remove('chat-open');
      }
    }

    let clickBlocked = false;
    if (botAnchor) {
      botAnchor.addEventListener('pointerdown', () => { clickBlocked = false; });
      botAnchor.addEventListener('pointermove', () => { clickBlocked = true; });
    }
    botTrigger.addEventListener('click', () => {
      if (!clickBlocked) {
        const isOpen = botWindow.classList.toggle('open');
        if (botAnchor) botAnchor.classList.toggle('chat-open', isOpen);
        if (isOpen && !sessionStorage.getItem('botPos_' + botWindow.id)) {
          positionChatNearTrigger();
        }
      }
    });

    if (botPopup) {
      botPopup.addEventListener('click', (e) => {
        e.stopPropagation();
        openBot();
      });
    }

    // Delegated open for hero buttons or in-content buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('#heroOpenBotBtn') || e.target.closest('.open-primebot-trigger')) {
        openBot();
      }
    });

    if (botClose) botClose.addEventListener('click', closeBot);

    const botResponses = [
      {
        keywords: ['day rate', 'rate', 'salary', 'cost', 'cloud'],
        answer: "In the 2026 Australian market, Senior Cloud & DevOps Architects command between $1,200 – $1,550 AUD/day. Check our live Salary Index section for precise role breakdowns across Sydney, Melbourne & Canberra."
      },
      {
        keywords: ['data', 'snowflake', 'databricks', 'hire'],
        answer: "We have active, pre-vetted Snowflake and Databricks data engineers available for 48-hour deployment. Would you like me to connect you directly with Ashwin Shiv to review candidate rubrics?"
      },
      {
        keywords: ['ashwin', 'founder', 'background', 'who is'],
        answer: "Ashwin Shiv is the Founder & Director of Prime Talent Solutions. He brings 18+ years of technical talent acquisition experience across Fortune 500 enterprises, top ANZ banks, and federal government agencies."
      },
      {
        keywords: ['book', 'call', 'meeting', 'strategy'],
        answer: "You can book a 15-minute strategy call directly on Ashwin's calendar in the booking section below, or call directly at +61 0450 173 053."
      }
    ];

    function appendBotMessage(text, sender) {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${sender}`;
      bubble.textContent = text;
      botLog.appendChild(bubble);
      botLog.scrollTop = botLog.scrollHeight;
    }

    if (botForm) {
      botForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = botInput.value.trim();
        if (!query) return;
        appendBotMessage(query, 'user');
        botInput.value = '';
        setTimeout(() => {
          const lower = query.toLowerCase();
          let matched = botResponses.find(r => r.keywords.some(k => lower.includes(k)));
          const reply = matched ? matched.answer : "Prime Talent Solutions specializes in Cloud, Data & AI, and Cybersecurity across Australia with 48h guaranteed shortlists. Would you like to request talent or speak with Ashwin Shiv?";
          appendBotMessage(reply, 'bot');
        }, 500);
      });
    }

    // Quick Chips delegation inside bot log
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.chat-chip');
      if (chip && botInput && botForm) {
        const q = chip.getAttribute('data-q');
        botInput.value = q;
        botForm.dispatchEvent(new Event('submit'));
      }
    });
  }

  // =========================================================================
  // 9. MOBILE MENU TOGGLE
  // =========================================================================
  function initMobileToggle() {
    const mobileToggle = document.getElementById('mobileToggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const nav = document.querySelector('.desktop-nav');
        if (nav) {
          const isHidden = window.getComputedStyle(nav).display === 'none';
          nav.style.display = isHidden ? 'flex' : 'none';
          nav.style.flexDirection = 'column';
          nav.style.position = 'absolute';
          nav.style.top = '70px';
          nav.style.left = '20px';
          nav.style.right = '20px';
          nav.style.background = 'rgba(10, 15, 28, 0.95)';
          nav.style.padding = '20px';
          nav.style.borderRadius = '14px';
        }
      });
    }
  }

  // =========================================================================
  // 10. LIVE 30 FPS TECH MOTION WATERMARKS (Zero Text, Pure 30 FPS Motion)
  // =========================================================================
  let watermarkObserver = null;
  let watermarkCanvases = new Set();
  let watermarkAnimRunning = false;
  let watermarkLastTime = performance.now();
  const wmTargetFPS = 30;
  const wmFrameInterval = 1000 / wmTargetFPS;

  class TechNode {
    constructor(w, h) {
      this.w = w;
      this.h = h;
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.r = Math.random() * 2 + 1.2;
      this.color = Math.random() > 0.4 ? 'rgba(14, 165, 233, ' : 'rgba(245, 158, 11, ';
      this.alpha = Math.random() * 0.5 + 0.3;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > this.w) this.vx *= -1;
      if (this.y < 0 || this.y > this.h) this.vy *= -1;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  class WatermarkCanvasInstance {
    constructor(container) {
      this.container = container;
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'wm-live-canvas';
      this.ctx = this.canvas.getContext('2d');
      this.container.appendChild(this.canvas);
      this.nodes = [];
      this.resize();
    }
    resize() {
      this.w = this.canvas.width = this.container.offsetWidth || 1200;
      this.h = this.canvas.height = this.container.offsetHeight || 600;
      this.nodes = [];
      const count = Math.min(Math.floor((this.w * this.h) / 28000), 28);
      for (let i = 0; i < count; i++) {
        this.nodes.push(new TechNode(this.w, this.h));
      }
    }
    render() {
      this.ctx.clearRect(0, 0, this.w, this.h);
      const len = this.nodes.length;
      for (let i = 0; i < len; i++) {
        const n1 = this.nodes[i];
        n1.update();
        n1.draw(this.ctx);

        for (let j = i + 1; j < len; j++) {
          const n2 = this.nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            this.ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            this.ctx.lineWidth = 0.75;
            this.ctx.beginPath();
            this.ctx.moveTo(n1.x, n1.y);
            this.ctx.lineTo(n2.x, n2.y);
            this.ctx.stroke();
          }
        }
      }
    }
  }

  function masterWatermarkLoop(now) {
    if (!watermarkCanvases.size) {
      watermarkAnimRunning = false;
      return;
    }
    requestAnimationFrame(masterWatermarkLoop);
    if (!now) now = performance.now();
    const elapsed = now - watermarkLastTime;
    if (elapsed < wmFrameInterval) return;
    watermarkLastTime = now - (elapsed % wmFrameInterval);

    watermarkCanvases.forEach(inst => inst.render());
  }

  function initLiveWatermarks() {
    if (watermarkObserver) {
      watermarkObserver.disconnect();
      watermarkObserver = null;
    }
    watermarkCanvases.clear();

    const watermarks = document.querySelectorAll('.section-watermark');
    if (!watermarks.length) return;

    // Remove any previous canvas to avoid duplication
    watermarks.forEach(wm => {
      const existingCanvas = wm.querySelector('.wm-live-canvas');
      if (existingCanvas) existingCanvas.remove();
      wm.__wmInstance = null;
    });

    watermarkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const inst = entry.target.__wmInstance;
        if (!inst) return;
        if (entry.isIntersecting) {
          watermarkCanvases.add(inst);
          if (!watermarkAnimRunning) {
            watermarkAnimRunning = true;
            watermarkLastTime = performance.now();
            requestAnimationFrame(masterWatermarkLoop);
          }
        } else {
          watermarkCanvases.delete(inst);
        }
      });
    }, { threshold: 0.05 });

    watermarks.forEach(wm => {
      const inst = new WatermarkCanvasInstance(wm);
      wm.__wmInstance = inst;
      watermarkObserver.observe(wm);
    });
  }

  window.addEventListener('resize', () => {
    document.querySelectorAll('.section-watermark').forEach(wm => {
      if (wm.__wmInstance) wm.__wmInstance.resize();
    });
  });

  // =========================================================================
  // 11. RE-INITIALIZE ALL ACTIVE PAGE COMPONENTS
  // =========================================================================
  function reinitPageInteractiveComponents() {
    initHeroVideo();
    initHeroNetworkCanvas();
    initStatsCounter();
    initSalaryCalculator();
    initJobFilters();
    initActionHub();
    initLiveWatermarks();
  }

  // =========================================================================
  // 12. INSTANT SPA ROUTER (0ms INSTANT SWITCHING, NO PAGE RELOAD)
  // =========================================================================
  const pageCache = new Map();
  const knownPages = [
    'index.html',
    'about.html',
    'specialisations.html',
    'salary-calculator.html',
    'contact.html'
  ];

  function normalizePageName(path) {
    if (!path) return 'index.html';
    let clean = path.split('?')[0].split('#')[0];
    clean = clean.split('/').pop() || 'index.html';
    if (clean === '' || clean === '/') return 'index.html';
    return clean;
  }

  function updateNavActiveLinks(activePage) {
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const norm = normalizePageName(href);
      if (norm === activePage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile nav if open
    const desktopNav = document.querySelector('.desktop-nav');
    if (desktopNav && window.innerWidth < 992) {
      desktopNav.style.display = 'none';
    }
  }

  function prefetchPage(pageName) {
    if (pageCache.has(pageName)) return Promise.resolve(pageCache.get(pageName));
    return fetch(pageName, { cache: 'force-cache' })
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const main = doc.getElementById('page-content');
        if (main) {
          const entry = {
            title: doc.title || document.title,
            content: main.innerHTML
          };
          pageCache.set(pageName, entry);
          return entry;
        }
        return null;
      })
      .catch(err => {
        console.debug('Prefetch error:', pageName, err);
        return null;
      });
  }

  function prefetchAllPages() {
    knownPages.forEach(p => {
      prefetchPage(p);
    });
  }

  function applyInstantPageTransition(pageData, targetPage, targetHash = '') {
    const mainEl = document.getElementById('page-content');
    if (!mainEl) return;

    // 0ms instant DOM swap
    mainEl.innerHTML = pageData.content;
    document.title = pageData.title;

    // Trigger instant subtle fade-in
    mainEl.classList.remove('spa-fade-in');
    void mainEl.offsetWidth; // Trigger reflow
    mainEl.classList.add('spa-fade-in');

    // Update active nav links
    updateNavActiveLinks(targetPage);

    // Scroll handling
    if (targetHash) {
      const targetElem = document.querySelector(targetHash);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Re-initialize dynamic components on newly inserted DOM
    reinitPageInteractiveComponents();
  }

  function navigateInstant(targetUrl, pushState = true) {
    const urlParts = targetUrl.split('#');
    const pathPart = urlParts[0];
    const hashPart = urlParts[1] ? `#${urlParts[1]}` : '';
    const targetPage = normalizePageName(pathPart);
    const currentPage = normalizePageName(window.location.pathname);

    // If same page
    if (targetPage === currentPage) {
      if (hashPart) {
        const el = document.querySelector(hashPart);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
      return;
    }

    // If target page is in pre-cached RAM (0ms instant swap!)
    if (pageCache.has(targetPage)) {
      const pageData = pageCache.get(targetPage);
      if (pushState) {
        window.history.pushState({ page: targetPage }, pageData.title, targetUrl);
      }
      applyInstantPageTransition(pageData, targetPage, hashPart);
    } else {
      // Fetch immediately, then swap
      prefetchPage(targetPage).then(pageData => {
        if (pageData) {
          if (pushState) {
            window.history.pushState({ page: targetPage }, pageData.title, targetUrl);
          }
          applyInstantPageTransition(pageData, targetPage, hashPart);
        } else {
          // Fallback to normal navigation if fetch failed
          window.location.href = targetUrl;
        }
      });
    }
  }

  // Intercept all internal navigation clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || link.target === '_blank') return;

    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http://') || href.startsWith('https://')) return;

    // Same-page in-page anchor (e.g. #action-hub)
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const cleanHref = href.split('?')[0].split('#')[0];
    const norm = normalizePageName(cleanHref);

    if (knownPages.includes(norm)) {
      e.preventDefault();
      navigateInstant(href, true);
    }
  });

  // Pre-fetch on hover (even before click!) for instant 0ms latency
  document.addEventListener('mouseover', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('?')[0].split('#')[0];
    const norm = normalizePageName(cleanHref);
    if (knownPages.includes(norm) && !pageCache.has(norm)) {
      prefetchPage(norm);
    }
  });

  // Browser Back & Forward button support (popstate)
  window.addEventListener('popstate', () => {
    const currentPage = normalizePageName(window.location.pathname);
    if (pageCache.has(currentPage)) {
      applyInstantPageTransition(pageCache.get(currentPage), currentPage, window.location.hash);
    } else {
      prefetchPage(currentPage).then(data => {
        if (data) {
          applyInstantPageTransition(data, currentPage, window.location.hash);
        }
      });
    }
  });

  // Save current initial page into memory cache
  const initialPage = normalizePageName(window.location.pathname);
  const currentMain = document.getElementById('page-content');
  if (currentMain) {
    pageCache.set(initialPage, {
      title: document.title,
      content: currentMain.innerHTML
    });
    if (initialPage === 'index.html') {
      pageCache.set('', { title: document.title, content: currentMain.innerHTML });
    }
  }

  // Pre-fetch all other pages immediately in background
  prefetchAllPages();

  // Initialize all base persistent elements & current page components
  initPortalModal();
  initPrimeBot();
  initMobileToggle();
  reinitPageInteractiveComponents();
});
