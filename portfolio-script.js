/* ===============================
   CANVAS ANIMATION CONFIGURATION
================================ */
const frameCount = 200;

// Path to your image sequence - UPDATE THIS PATH TO MATCH YOUR IMAGES FOLDER
const imagePath = index =>
  `images/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const canvas = document.getElementById("scroll-canvas");
const ctx = canvas.getContext("2d");

const images = [];
let imagesLoaded = 0;
let currentFrame = 0;

/* ===============================
   RETINA CANVAS SETUP
================================ */
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeCanvas);

/* ===============================
   IMAGE PRELOAD
================================ */
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = imagePath(i);

  img.onload = () => {
    imagesLoaded++;

    // Start animation ONLY after all images load
    if (imagesLoaded === frameCount) {
      resizeCanvas();
      drawImage(images[0]);
      requestAnimationFrame(animate);
    }
  };

  img.onerror = () => {
    console.error(`Failed to load image: ${imagePath(i)}`);
  };

  images.push(img);
}

/* ===============================
   DRAW IMAGE ON CANVAS
================================ */
function drawImage(img) {
  if (!img.complete) return;
  
  const dpr = window.devicePixelRatio || 1;
  const canvasWidth = canvas.width / dpr;
  const canvasHeight = canvas.height / dpr;

  const imgRatio = img.width / img.height;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth, drawHeight;

  if (imgRatio > canvasRatio) {
    drawHeight = canvasHeight;
    drawWidth = imgRatio * drawHeight;
  } else {
    drawWidth = canvasWidth;
    drawHeight = drawWidth / imgRatio;
  }

  const x = (canvasWidth - drawWidth) / 2;
  const y = (canvasHeight - drawHeight) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, x, y, drawWidth, drawHeight);
}

/* ===============================
   SCROLL PROGRESS CALCULATION
================================ */
function getScrollProgress() {
  const section = document.querySelector(".hero-section");
  const scrollTop = window.scrollY;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight - window.innerHeight;

  return Math.min(
    Math.max((scrollTop - sectionTop) / sectionHeight, 0),
    1
  );
}

/* ===============================
   ANIMATION LOOP
================================ */
function animate() {
  const scrollProgress = getScrollProgress();
  const frameIndex = Math.floor(scrollProgress * (frameCount - 1));

  if (frameIndex !== currentFrame && images[frameIndex]) {
    currentFrame = frameIndex;
    drawImage(images[currentFrame]);
  }

  requestAnimationFrame(animate);
}

/* ===============================
   NAVIGATION FUNCTIONALITY
================================ */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('activescrolled');
  }
});

/* ===============================
   SCROLL REVEAL ANIMATIONS
================================ */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });
});

/* ===============================
   SMOOTH SCROLL ENHANCEMENTS
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ===============================
   CARD HOVER EFFECTS
================================ */
document.querySelectorAll('.skill-card, .project-card, .cert-card, .education-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

/* ===============================
   PERFORMANCE OPTIMIZATION
================================ */
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});

/* ===============================
   LOADING INDICATOR
================================ */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  console.log('Portfolio website loaded successfully! 🚀');
  console.log(`Canvas animation with ${frameCount} frames`);
  console.log(`Images loaded: ${imagesLoaded}/${frameCount}`);
});

/* ===============================
   GEMINI CHATBOT LOGIC
================================ */
// Using a dynamic import to ensure it works within your existing script
import("https://esm.run/@google/generative-ai").then(module => {
    const { GoogleGenerativeAI } = module;

    const API_KEY = "AIzaSyDPvxJgDe75guVp08BpUnE8_VcW-0TBwcA"; 
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Add your system prompt here
const systemPrompt = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vishva Preethi - Electrical Engineer Portfolio</title>
  <link rel="stylesheet" href="portfolio-style.css" />
</head>
<body>

  <!-- NAVIGATION -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">Vishva Preethi</div>
      <ul class="nav-menu">
        <li><a href="#hero" class="nav-link">Home</a></li>
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#skills" class="nav-link">Skills</a></li>
        <li><a href="#experience" class="nav-link">Experience</a></li>
        <li><a href="#projects" class="nav-link">Projects</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
      </ul>
      <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>

  <!-- HERO SECTION WITH CANVAS ANIMATION -->
  <section id="hero" class="hero-section">
    <canvas id="scroll-canvas"></canvas>
    <div class="hero-content">
      <h1 class="hero-name">Vishva Preethi</h1>
      <h2 class="hero-title">Electrical Engineer | IoT | Automation | Embedded Systems</h2>
      <p class="hero-tagline">Building intelligent automation solutions with IoT and embedded systems integration.</p>
      <div class="hero-buttons">
        <a href="#projects" class="btn btn-primary">View Projects</a>
        <a href="#contact" class="btn btn-secondary">Contact Me</a>
      </div>
    </div>
    <div class="scroll-indicator">
      <span>Scroll Down</span>
      <div class="scroll-arrow"></div>
    </div>
  </section>

  <!-- ABOUT SECTION -->
  <section id="about" class="section about-section">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <p class="about-text">
          I am a final-year electrical engineering student with a strong interest in automation, IoT, and system design. I enjoy learning new things, solving problems, and applying my skills through practical projects and internships. With hands-on experience in industrial automation, IoT-Cloud integration, and electrical systems, I am passionate about developing innovative solutions for real-world challenges.
        </p>
      </div>
    </div>
  </section>

  <!-- SKILLS SECTION -->
  <section id="skills" class="section skills-section">
    <div class="container">
      <h2 class="section-title">Skills & Tech Stack</h2>
      <div class="skills-grid">
        
        <div class="skill-card">
          <div class="skill-icon">⚡</div>
          <h3>Electrical Engineering</h3>
          <ul class="skill-list">
            <li>Industrial Automation</li>
            <li>Power Systems</li>
            <li>Electrical Machines</li>
            <li>Control Systems</li>
          </ul>
        </div>

        <div class="skill-card">
          <div class="skill-icon">🔌</div>
          <h3>IoT & Embedded</h3>
          <ul class="skill-list">
            <li>IoT Systems</li>
            <li>Embedded Systems</li>
            <li>IoT-Cloud Integration</li>
            <li>Sensor Integration</li>
          </ul>
        </div>

        <div class="skill-card">
          <div class="skill-icon">💻</div>
          <h3>Programming & Tools</h3>
          <ul class="skill-list">
            <li>C Programming</li>
            <li>MATLAB</li>
            <li>Proteus</li>
          </ul>
        </div>

        <div class="skill-card">
          <div class="skill-icon">🛠️</div>
          <h3>System Design</h3>
          <ul class="skill-list">
            <li>Circuit Design</li>
            <li>Fault Detection</li>
            <li>Monitoring Systems</li>
            <li>Real-time Control</li>
          </ul>
        </div>

        <div class="skill-card">
          <div class="skill-icon">🗣️</div>
          <h3>Communication</h3>
          <ul class="skill-list">
            <li>Communication Strategy</li>
            <li>English Proficiency</li>
            <li>Tamil Proficiency</li>
            <li>Team Collaboration</li>
          </ul>
        </div>

        <div class="skill-card">
          <div class="skill-icon">🔍</div>
          <h3>Problem Solving</h3>
          <ul class="skill-list">
            <li>Real-time Problem Solving</li>
            <li>System Troubleshooting</li>
            <li>Project Management</li>
          </ul>
        </div>

      </div>
    </div>
  </section>

  <!-- EXPERIENCE SECTION -->
  <section id="experience" class="section experience-section">
    <div class="container">
      <h2 class="section-title">Internships</h2>
      <div class="timeline">
        
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">June – July 2025</div>
            <h3>Industrial Automation & Power Systems Intern</h3>
            <h4>BHEL, Ranipet</h4>
            <ul class="experience-list">
              <li>Gained hands-on experience in industrial automation systems</li>
              <li>Studied power systems and electrical equipment operations</li>
              <li>Learned about manufacturing processes and quality control</li>
              <li>Collaborated with engineering teams on real-world projects</li>
            </ul>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">May 2025</div>
            <h3>IoT-Cloud & AI-Driven Sustainable Solutions Intern</h3>
            <h4>VIT, Vellore (10-day internship)</h4>
            <ul class="experience-list">
              <li>Explored IoT-Cloud integration for sustainable solutions</li>
              <li>Worked on AI-driven applications for environmental monitoring</li>
              <li>Developed practical understanding of cloud-based IoT systems</li>
              <li>Applied knowledge to create innovative sustainable technology solutions</li>
            </ul>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">August 2024</div>
            <h3>Electrical Systems Intern</h3>
            <h4>Vellore Co-op Sugar Mills Ltd. (7-day internship)</h4>
            <ul class="experience-list">
              <li>Studied industry operations and electrical system maintenance</li>
              <li>Learned about power distribution in industrial settings</li>
              <li>Observed safety protocols and operational procedures</li>
              <li>Gained practical knowledge of electrical equipment in manufacturing</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- PROJECTS SECTION -->
  <section id="projects" class="section projects-section">
    <div class="container">
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">
        
        <div class="project-card">
          <div class="project-icon">🏆</div>
          <h3>Machine Health Monitoring System</h3>
          <p>Award-winning project (3rd place at INNOVIOT 2025) that monitors voltage, current, temperature, and vibration to detect faults in electrical machines with a three-stage control system for automatic protection</p>
          <div class="project-tags">
            <span class="tag">IoT</span>
            <span class="tag">Fault Detection</span>
            <span class="tag">Automation</span>
            <span class="tag">Award Winner</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-icon">💧</div>
          <h3>Water Level Monitoring System</h3>
          <p>First prize winner at intra-college hackathon 2024. Real-time water level monitoring system with automated controls and alerts</p>
          <div class="project-tags">
            <span class="tag">IoT</span>
            <span class="tag">Sensors</span>
            <span class="tag">Embedded Systems</span>
            <span class="tag">1st Prize</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-icon">⚙️</div>
          <h3>Three-Stage Control System</h3>
          <p>Intelligent fault response system with alert messaging, buzzer warnings, and automatic relay-based machine shutdown for enhanced safety</p>
          <div class="project-tags">
            <span class="tag">Control Systems</span>
            <span class="tag">Relay Logic</span>
            <span class="tag">Safety</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-icon">🔬</div>
          <h3>IoT-Cloud Integration Projects</h3>
          <p>Sustainable solutions using IoT-Cloud technology and AI-driven approaches for environmental monitoring and automation</p>
          <div class="project-tags">
            <span class="tag">IoT</span>
            <span class="tag">Cloud</span>
            <span class="tag">AI</span>
            <span class="tag">Sustainability</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ACHIEVEMENTS SECTION -->
  <section id="certifications" class="section certifications-section">
    <div class="container">
      <h2 class="section-title">Achievements & Activities</h2>
      <div class="certifications-grid">
        
        <div class="cert-card">
          <div class="cert-logo">🏆</div>
          <h3>3rd Place - INNOVIOT 2025</h3>
          <p>National-level symposium for Machine Health Monitoring System</p>
        </div>

        <div class="cert-card">
          <div class="cert-logo">🥇</div>
          <h3>1st Prize - Intra-College Hackathon</h3>
          <p>Water Level Monitoring System (2024)</p>
        </div>

        <div class="cert-card">
          <div class="cert-logo">🎯</div>
          <h3>Technical Club Member</h3>
          <p>Active participation in project teams and technical events</p>
        </div>

        <div class="cert-card">
          <div class="cert-logo">🤝</div>
          <h3>Symposium Participant</h3>
          <p>Multiple national-level technical symposiums</p>
        </div>

        <div class="cert-card">
          <div class="cert-logo">💡</div>
          <h3>Hackathon Experience</h3>
          <p>Hands-on experience in competitive problem solving</p>
        </div>

      </div>
    </div>
  </section>

  <!-- EDUCATION SECTION -->
  <section id="education" class="section education-section">
    <div class="container">
      <h2 class="section-title">Education</h2>
      <div class="education-content">
        
        <div class="education-card">
          <h3>BE – Electrical and Electronics Engineering</h3>
          <h4>Thanthai Periyar Government Institute of Technology</h4>
          <p class="education-year">2022 – 2026 (Final Year)</p>
          <p class="education-grade">CGPA: 8.45</p>
          <ul class="experience-list">
            <li>Actively participated in national-level hackathons and technical symposiums</li>
            <li>Gained hands-on experience in real-time problem solving</li>
            <li>Involved in technical clubs and project teams</li>
            <li>Enhanced teamwork and practical skills through collaborative projects</li>
          </ul>
        </div>

      </div>
    </div>
  </section>

  <!-- CONTACT SECTION -->
  <section id="contact" class="section contact-section">
    <div class="container">
      <h2 class="section-title">Get In Touch</h2>
      <div class="contact-content">
        
        <div class="contact-info">
          
          <div class="contact-item">
            <div class="contact-icon">📱</div>
            <div>
              <h3>Phone</h3>
              <p>+91 95978 57495</p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div>
              <h3>Email</h3>
              <p><a href="mailto:preethivishva233@gmail.com">preethivishva233@gmail.com</a></p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <div>
              <h3>Location</h3>
              <p>Vellore, Tamil Nadu, India</p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">🔗</div>
            <div>
              <h3>LinkedIn</h3>
              <p><a href="https://www.linkedin.com/in/vishva-preethi-sennuvasan" target="_blank">linkedin.com/in/vishva-preethi-sennuvasan</a></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <p>Built with passion for Electrical Engineering and innovative solutions</p>
      <p>&copy; 2025 Vishva Preethi. All rights reserved.</p>
    </div>
  </footer>
  <div id="chat-wrapper">
    <button id="chat-toggle" class="chat-btn">
        <span class="icon">💬</span>
    </button>

    <div id="chat-container" class="chat-hidden">
        <div class="chat-header">
            <h3>Vishva's AI Assistant</h3>
            <button id="close-chat">&times;</button>
        </div>
        <div id="chat-messages">
            <div class="message bot-msg">Hi! I'm Vishva's virtual assistant. Ask me anything about her projects or skills!</div>
        </div>
        <div class="chat-input-area">
            <input type="text" id="chat-input" placeholder="Type a message..." autocomplete="off">
            <button id="chat-send">Send</button>
        </div>
    </div>
</div>
  <script src="portfolio-script.js"></script>
</body>
</html>

`;

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt,
    });

    const chatSession = model.startChat({ history: [] });

    // UI Elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Window Logic - Fixed
    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', (e) => {
            e.preventDefault();
            chatContainer.classList.toggle('chat-hidden');
            console.log("Chat toggled"); // Debug check
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatContainer.classList.add('chat-hidden');
        });
    }

    async function handleChat() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, true);
        chatInput.value = '';

        try {
            const result = await chatSession.sendMessage(text);
            const response = await result.response;
            appendMessage(response.text(), false);
        } catch (err) {
            appendMessage("I'm having trouble connecting.", false);
            console.error("Gemini Error:", err);
        }
    }

    function appendMessage(text, isUser) {
        const msg = document.createElement('div');
        msg.classList.add('message', isUser ? 'user-msg' : 'bot-msg');
        msg.innerText = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });
    
}).catch(err => console.error("Failed to load Gemini SDK:", err));