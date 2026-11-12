/**
 * SHAURYA PRATAP SINGH - PORTFOLIO INTERACTIVITY
 * 60 FPS Neural Canvas, Live IST Clock, Terminal Tabs, 3D Tilt & Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Indian Standard Time (IST) Clock
  function updateClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    clockEl.textContent = `${now.toLocaleTimeString('en-US', options)} IST`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Mouse Spotlight Tracker
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // 3. Neural Particle Canvas
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor(width / 20), 70);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.r = Math.random() * 1.6 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--theme-accent').trim() || '#2ea043';
        ctx.fill();
      }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    function loop() {
      ctx.clearRect(0, 0, width, height);
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--theme-accent').trim() || '#2ea043';

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(46, 160, 67, ${0.16 * (1 - d / 115)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  // 4. Rotating Typewriter
  const typeTarget = document.getElementById('typewriter-box');
  if (typeTarget) {
    const roles = [
      'Software Engineer',
      'AI & Computer Vision Specialist',
      'Data Analyst',
      'AI Prompt Developer',
      'Full-Stack Developer'
    ];
    let rIdx = 0, cIdx = 0, isDeleting = false, speed = 100;

    function runTypewriter() {
      const current = roles[rIdx];
      if (isDeleting) {
        typeTarget.textContent = current.substring(0, cIdx - 1);
        cIdx--;
        speed = 35;
      } else {
        typeTarget.textContent = current.substring(0, cIdx + 1);
        cIdx++;
        speed = 85;
      }

      if (!isDeleting && cIdx === current.length) {
        speed = 1900;
        isDeleting = true;
      } else if (isDeleting && cIdx === 0) {
        isDeleting = false;
        rIdx = (rIdx + 1) % roles.length;
        speed = 400;
      }
      setTimeout(runTypewriter, speed);
    }
    runTypewriter();
  }

  // 5. Interactive Terminal Tabs
  const termTabs = document.querySelectorAll('.term-tab');
  const codePanes = {
    manifesto: `<span class="k-kw">const</span> <span class="k-fn">shaurya</span> = {
  <span class="k-prop">name</span>: <span class="k-str">"Shaurya Pratap Singh"</span>,
  <span class="k-prop">status</span>: <span class="k-str">"Open to SDE &amp; Data Roles"</span>,
  <span class="k-prop">languages</span>: [<span class="k-str">"Python"</span>, <span class="k-str">"Java"</span>, <span class="k-str">"C"</span>, <span class="k-str">"JavaScript"</span>, <span class="k-str">"SQL"</span>],
  <span class="k-prop">specialization</span>: [<span class="k-str">"Computer Vision"</span>, <span class="k-str">"CNNs"</span>, <span class="k-str">"Prompt Eng"</span>, <span class="k-str">"Analytics"</span>],
  <span class="k-prop">philosophy</span>: <span class="k-str">"Clean Code, High Performance &amp; Human-Centric AI"</span>
};`,
    skills: `{
  <span class="k-prop">"core_languages"</span>: [<span class="k-str">"Python"</span>, <span class="k-str">"Java"</span>, <span class="k-str">"C"</span>, <span class="k-str">"JavaScript"</span>, <span class="k-str">"SQL"</span>],
  <span class="k-prop">"ai_and_vision"</span>: [<span class="k-str">"OpenCV"</span>, <span class="k-str">"Custom 4-Layer CNN"</span>, <span class="k-str">"Prompt Engineering"</span>],
  <span class="k-prop">"data_analytics"</span>: [<span class="k-str">"Pandas"</span>, <span class="k-str">"NumPy"</span>, <span class="k-str">"Scikit-Learn"</span>, <span class="k-str">"Predictive Models"</span>],
  <span class="k-prop">"frameworks_tools"</span>: [<span class="k-str">"Flask"</span>, <span class="k-str">"Git"</span>, <span class="k-str">"GitHub"</span>, <span class="k-str">"VS Code"</span>]
}`,
    architecture: `<span class="k-kw">class</span> <span class="k-fn">VisionPipeline</span>:
    <span class="k-kw">def</span> <span class="k-fn">__init__</span>(self, model_weights):
        self.model = load_custom_cnn(model_weights)
        self.camera = cv2.VideoCapture(<span class="k-num">0</span>)
        
    <span class="k-kw">def</span> <span class="k-fn">stream_inference</span>(self):
        <span class="k-kw">while</span> True:
            ret, frame = self.camera.read()
            gesture = self.model.predict(frame)
            <span class="k-kw">yield</span> render_hud(frame, gesture)`
  };

  const termContainer = document.getElementById('term-content');
  termTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      termTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const pane = tab.getAttribute('data-pane');
      if (termContainer && codePanes[pane]) {
        termContainer.innerHTML = `<pre><code>${codePanes[pane]}</code></pre>`;
      }
    });
  });

  // 6. Skills Filtering
  const filterBtns = document.querySelectorAll('.tab-pill-btn');
  const skillTiles = document.querySelectorAll('.skill-bento-tile');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');

      skillTiles.forEach((tile) => {
        if (category === 'all' || tile.getAttribute('data-category') === category) {
          tile.style.display = 'flex';
        } else {
          tile.style.display = 'none';
        }
      });
    });
  });

  // 7. Theme Accent Switcher
  window.setTheme = function (themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    showToast(`Switched theme to ${themeName.toUpperCase()}`);
  };

  // 8. 3D Card Tilt on Hover
  const bentoCards = document.querySelectorAll('.bento-card, .portrait-glow-ring');
  bentoCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 9. Copy Real Email to Clipboard
  window.copyEmail = function () {
    const email = 'shauryapratapsingh723@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('shauryapratapsingh723@gmail.com copied!');
    }).catch(() => {
      prompt('Copy email:', email);
    });
  };

  function showToast(msg) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = `✓ ${msg}`;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 2800);
  }

  // 10. Quick Form Mailto Handler
  window.handleContactSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('sender-name')?.value || 'Recruiter/Peer';
    const email = document.getElementById('sender-email')?.value || '';
    const message = document.getElementById('sender-message')?.value || '';
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Shaurya,\n\n${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:shauryapratapsingh723@gmail.com?subject=${subject}&body=${body}`;
  };
});
