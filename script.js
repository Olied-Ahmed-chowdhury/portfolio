/**
 * Olied Ahmed Chowdhury Portfolio Script
 * Interactive features: Particles background, Typing effect, Project filtering,
 * Mobile navigation, and Interactive Portfolio AI Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initParticles();
  initProjectFilters();
});

/* ----------------------------------------------------
 * 1. Navbar Scroll & Mobile Navigation Toggle
 * ---------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy for active menu item
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close menu on link click
  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

/* ----------------------------------------------------
 * 2. Typing Effect for Hero Subtitle
 * ---------------------------------------------------- */
function initTypingEffect() {
  const typedElement = document.getElementById('typedText');
  if (!typedElement) return;

  const words = [
    'Software Solutions',
    'AI & Chatbot Agents',
    'Object-Oriented Systems',
    'Python & Groq Llama Apps',
    'Full-Stack Architecture'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ----------------------------------------------------
 * 3. Particle Network Canvas Background
 * ---------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 0.8;
      this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(139, 92, 246, ';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.18 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ----------------------------------------------------
 * 4. Project Filtering
 * ---------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
 * 5. Interactive Portfolio AI Chat Assistant
 * ---------------------------------------------------- */
const aiKnowledgeBase = [
  {
    keywords: ['skill', 'stack', 'languages', 'technologies', 'tech'],
    response:
      "Olied is proficient in C++, Python, Java, C, and SQL/MySQL. He builds AI agent workflows with LangGraph, Groq Llama 3.3, and NLP. On the UI side, he designs in Figma and develops responsive web interfaces as well as CustomTkinter GUIs!"
  },
  {
    keywords: ['study buddy', 'ai chatbot', 'langgraph', 'llama', 'ai project'],
    response:
      "The 'AI Study Buddy' is an intelligent learning assistant built by Olied with Python, Streamlit, LangGraph, and Groq's Llama 3.3 model. It provides personalized study assistance, intelligent context processing, and automated query answering."
  },
  {
    keywords: ['lifelinego', 'ambulance', 'hospital', 'emergency'],
    response:
      "LifelineGo is a Smart Ambulance System designed by Olied to optimize emergency dispatch. It provides intelligent routing and real-time connectivity between patients and the nearest medical response teams."
  },
  {
    keywords: ['hotel', 'serialization', 'java project'],
    response:
      "Olied's Java Serialization Hotel Management project implements advanced object persistence via byte streams, saving and reconstructing complex state objects across sessions without relying exclusively on traditional DB round-trips."
  },
  {
    keywords: ['news', 'tkinter', 'mysql', 'database'],
    response:
      "The News Management System is a desktop app built using Python (CustomTkinter GUI) and MySQL database. It offers a sleek dark-themed editor dashboard for full CRUD management of articles, authors, and news categories."
  },
  {
    keywords: ['university', 'education', 'study', 'student', 'degree', 'metropolitan'],
    response:
      "Olied is currently a 3rd-year Software Engineering undergraduate student at Metropolitan University, Sylhet, Bangladesh. He has strong problem-solving fundamentals in data structures, algorithms, and systems design."
  },
  {
    keywords: ['contact', 'email', 'hire', 'reach', 'linkedin', 'github', 'message'],
    response:
      "You can connect with Olied via email at triple555chy@gmail.com, on LinkedIn at https://www.linkedin.com/in/olied-ahmed-chowdhury-5085b4435/ or check out his repositories at https://github.com/Olied-Ahmed-chowdhury !"
  }
];

function sendMessage() {
  const input = document.getElementById('chatInput');
  const chatWindow = document.getElementById('chatWindow');
  const userText = input.value.trim();

  if (!userText) return;

  // Add User Message
  appendChatMessage(userText, 'user');
  input.value = '';

  // Show Typing Indicator
  const typingId = showTypingIndicator();

  // Generate Response
  setTimeout(() => {
    removeTypingIndicator(typingId);
    const botReply = generateAIResponse(userText);
    appendChatMessage(botReply, 'bot');
  }, 600);
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById('chatInput');
  input.value = promptText;
  sendMessage();
}

function appendChatMessage(text, sender) {
  const chatWindow = document.getElementById('chatWindow');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;

  msgDiv.appendChild(bubble);
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
  const chatWindow = document.getElementById('chatWindow');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg bot';
  typingDiv.id = 'typing-indicator';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = '<i class="fa-solid fa-ellipsis fa-fade"></i> Thinking...';

  typingDiv.appendChild(bubble);
  chatWindow.appendChild(typingDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return 'typing-indicator';
}

function removeTypingIndicator(id) {
  const indicator = document.getElementById(id);
  if (indicator) indicator.remove();
}

function generateAIResponse(query) {
  const lowerQuery = query.toLowerCase();

  for (const item of aiKnowledgeBase) {
    for (const key of item.keywords) {
      if (lowerQuery.includes(key)) {
        return item.response;
      }
    }
  }

  return "Thanks for asking! Olied is an energetic 3rd-year Software Engineering student at Metropolitan University, Sylhet, skilled in C++, Python, Java, MySQL, Figma, and AI automation. Feel free to explore his projects above or email him at triple555chy@gmail.com!";
}

/* ----------------------------------------------------
 * 6. Contact Form Handler (Direct Email / Mailto)
 * ---------------------------------------------------- */
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const mailtoLink = `mailto:triple555chy@gmail.com?subject=${encodeURIComponent(
    `[Portfolio Contact] ${subject} - from ${name}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  )}`;

  window.location.href = mailtoLink;
  alert('Thank you! Opening your email client to send your message to Olied (triple555chy@gmail.com).');
}
