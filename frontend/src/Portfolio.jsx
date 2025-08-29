import React, { useState, useEffect, useRef } from "react";
import "./Portfolio.css";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      let currentSection = "home";
      
      // Check if navbar should have scrolled style
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 200 && 
            window.scrollY < sectionTop + sectionHeight - 200) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const hoveredElement = e.target.closest('a, button, .clickable');
      setIsHoveringClickable(!!hoveredElement);
    };

    // Set initial visibility for animations
    setIsVisible(true);
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    // Canvas animation for futuristic background
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      let animationFrameId;
      const particles = [];
      const particleCount = 100;
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 3 - 1.5;
          this.speedY = Math.random() * 3 - 1.5;
          this.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`;
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
          }
          if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
          }
        }
        
        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(88, 166, 255, ${1 - distance/100})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        
        // Update and draw particles
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
        
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://myportfolio-l9bp.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or email me directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="portfolio">
      {/* ===== Futuristic Canvas Background ===== */}
      <canvas 
        ref={canvasRef} 
        className="futuristic-canvas"
        style={{ position: 'fixed', top: 0, left: 0 }}
      ></canvas>

      {/* ===== Animated Background Elements ===== */}
      <div className="animated-bg">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        
        {/* Moving Particles */}
        <div className="particles-container">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 15}s`
              }}
            ></div>
          ))}
        </div>

        {/* Grid Lines */}
        <div className="grid-lines">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="grid-line" style={{ 
              top: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`
            }}></div>
          ))}
        </div>
      </div>

      {/* ===== Futuristic Cursor ===== */}
      <div 
        className={`cursor ${isHoveringClickable ? 'hover' : ''}`} 
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      >
        <div className="cursor-inner"></div>
        <div className="cursor-orb"></div>
      </div>
      <div 
        className={`cursor-trail ${isHoveringClickable ? 'hover' : ''}`} 
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>

      {/* ===== Dynamic Navbar ===== */}
      <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection("home")}>
            <span className="logo-text">SV</span>
            <div className="logo-glow"></div>
          </div>
          <ul>
            <li>
              <a 
                href="#home" 
                className={activeSection === "home" ? "active" : ""}
                onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
              >
                <span className="nav-item-text">Overview</span>
                <span className="nav-item-line"></span>
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={activeSection === "about" ? "active" : ""}
                onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}
              >
                <span className="nav-item-text">About</span>
                <span className="nav-item-line"></span>
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={activeSection === "skills" ? "active" : ""}
                onClick={(e) => { e.preventDefault(); scrollToSection("skills"); }}
              >
                <span className="nav-item-text">Skills</span>
                <span className="nav-item-line"></span>
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={activeSection === "projects" ? "active" : ""}
                onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }}
              >
                <span className="nav-item-text">Projects</span>
                <span className="nav-item-line"></span>
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={activeSection === "contact" ? "active" : ""}
                onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
              >
                <span className="nav-item-text">Contact</span>
                <span className="nav-item-line"></span>
              </a>
            </li>
          </ul>
          
          {/* Navbar Hover Effect */}
          <div className="nav-hover-effect"></div>
        </div>
      </nav>

      {/* ===== Home Section ===== */}
      <section id="home" className="section home">
        <div className={`home-content ${isVisible ? 'fade-in' : ''}`}>
          <div className="glitch-container">
            <h1 className="glitch" data-text="Sanidhya Verma">
              Sanidhya Verma
            </h1>
          </div>
          <h2 className="subtitle">
            <span className="typing-text">Full Stack Developer</span>
            <span className="divider">|</span>
            <span className="typing-text">AI/ML Enthusiast</span>
          </h2>

          {/* --- Skill Tags --- */}
          <div className="tags">
            {["Node.js", "React", "TensorFlow", "MongoDB", "Express", "Python", "JavaScript", "CSS"].map((tag, i) => (
              <span 
                key={i} 
                className="tag"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={() => scrollToSection("projects")}>
              View My Work
            </button>
            <button className="cta-btn secondary" onClick={() => scrollToSection("contact")}>
              Get In Touch
            </button>
          </div>

          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <p>Scroll down</p>
          </div>
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section id="about" className="section about">
      <div className="section-container">
        <h2 className="section-title">
          <span className="title-number">01.</span>
          About Me
        </h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I am a passionate developer currently pursuing BTech in Computer Science 
              Engineering with a specialization in AI & ML. I love building full-stack 
              applications and exploring machine learning frameworks.
            </p>
            <p>
              With a strong foundation in Data Structures and Algorithms, I've solved 
              150+ problems across various platforms. This rigorous practice has sharpened 
              my problem-solving abilities and algorithmic thinking, enabling me to 
              architect efficient and scalable solutions for complex technical challenges.
            </p>
            <div className="stats">
              <div className="stat">
                <h3>10+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>10+</h3>
                <p>Technologies</p>
              </div>
              <div className="stat">
                <h3>150+</h3>
                <p>DSA Problems Solved</p>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="photo-container">
              <div className="profile-photo">
                <img 
                  src="./public/portfolioPhoto.jpeg" 
                  alt="Sanidhya Verma" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = document.querySelector('.photo-placeholder');
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="photo-placeholder" style={{ display: 'none' }}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#64FFDA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#64FFDA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Your Photo Here</span>
                </div>
              </div>
              <div className="photo-frame"></div>
              <div className="photo-dots">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="dot" style={{ 
                    transform: `rotate(${i * 45}deg) translate(120px)`,
                    animationDelay: `${i * 0.1}s`
                  }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* ===== Skills Section ===== */}
      <section id="skills" className="section skills">
        <div className="section-container">
          <h2 className="section-title">
            <span className="title-number">02.</span>
            Skills
          </h2>
          
          <div className="skills-container">
            <div className="skill-category">
              <h3>Frontend Development</h3>
              <div className="skill-items">
                <span className="skill-item">HTML, CSS, JavaScript</span>
                <span className="skill-item">React (completed beginner course, started learning advanced concepts)</span>
                <span className="skill-item">Responsive design and UI/UX basics</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>Backend Development</h3>
              <div className="skill-items">
                <span className="skill-item">Node.js (CRUD operations, APIs, aggregation pipelines, database connections)</span>
                <span className="skill-item">Express.js</span>
                <span className="skill-item">API integration (e.g., weather API in your project)</span>
                <span className="skill-item">Electron.js (for building desktop apps)</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>Databases</h3>
              <div className="skill-items">
                <span className="skill-item">MongoDB (CRUD operations, schema design, email storage project, emergency app data storage)</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <div className="skill-items">
                <span className="skill-item">JavaScript (frontend + backend)</span>
                <span className="skill-item">Java (Data Structures & Algorithms)</span>
                <span className="skill-item">Python (basics + AI/ML learning plans, TensorFlow awareness)</span>
                <span className="skill-item">C, C++ (Currently learning for software development)</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>Development Tools & Platforms</h3>
              <div className="skill-items">
                <span className="skill-item">Git/GitHub (project version control, contributions)</span>
                <span className="skill-item">Vercel + Railway</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>Other Technical Areas</h3>
              <div className="skill-items">
                <span className="skill-item">AI/ML basics (currently learning, TensorFlow, Python planned)</span>
                <span className="skill-item">IoT project idea (smart window locking system)</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>Soft Skills</h3>
              <div className="skill-items">
                <span className="skill-item">Independent learner (prefer solo projects)</span>
                <span className="skill-item">Consistency (daily DSA in Java plan, posting on LinkedIn)</span>
                <span className="skill-item">Entrepreneurship mindset (PeerPrep X)</span>
                <span className="skill-item">Problem-solving through projects (turning concepts into working apps)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Projects Section ===== */}
      <section id="projects" className="section projects">
        <div className="section-container">
          <h2 className="section-title">
            <span className="title-number">03.</span>
            Projects
          </h2>
          
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-icon">💽</div>
              <h3>Music Player</h3>
              <p>A full-featured music streaming platform built with Electron.js for desktop compatibility. Features include playlist creation, audio visualization, and seamless playback controls with a modern, responsive interface.</p>
              <div className="project-tags">
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>Express</span>
                <span>Electron</span>
              </div>
              {/* <button className="project-btn">View Project</button> */}
            </div>

            <div className="project-card">
              <div className="project-icon">🏫</div>
              <h3>School Website</h3>
              <p>A comprehensive school management system with role-based authentication. Includes admin dashboard for managing students, teachers, and courses, with real-time updates and responsive design for all devices.</p>
              <div className="project-tags">
                <span>React</span>
                <span>Node.js</span>
                <span>Dashboard</span>
              </div>
              {/* <button className="project-btn">View Project</button> */}
            </div>

            <div className="project-card">
              <div className="project-icon">🏬</div>
              <h3>Tourism App</h3>
              <p>An interactive travel platform that helps users discover and plan trips to various destinations. Integrates multiple APIs for location data, weather information, and local attractions with an intuitive booking system.</p>
              <div className="project-tags">
                <span>API</span>
                <span>React</span>
                <span>JavaScript</span>
                <span>Node.js</span>
              </div>
              {/* <button className="project-btn">View Project</button> */}
            </div>

            <div className="project-card">
              <div className="project-icon">💾</div>
              <h3>PeerPrep X</h3>
              <p>Coming Soon, Stay Tuned🔥</p>
              <div className="project-tags">
                <span>MongoDB</span>
                <span>Express</span>
                <span>Backend</span>
                <span>Python</span>
              </div>
              {/* <button className="project-btn">View Project</button> */}
            </div>
          </div>
          
          {/* Mini Projects Section */}
          <h3 className="mini-projects-title">Mini Projects</h3>
          <div className="mini-projects-grid">
            <div className="mini-project-card">
              <div className="mini-project-icon">🌤️</div>
              <h4>Weather App</h4>
              <p>Real-time weather application with location detection, 5-day forecast, and interactive maps. Built with React and integrated with a weather API for accurate data.</p>
              <div className="mini-project-tags">
                <span>React</span>
                <span>API</span>
                <span>CSS</span>
              </div>
            </div>

            <div className="mini-project-card">
              <div className="mini-project-icon">⭕</div>
              <h4>Tic Tac Toe</h4>
              <p>Interactive game with responsive design, win detection, and score tracking. Features both single-player (against AI) and two-player modes with animated transitions.</p>
              <div className="mini-project-tags">
                <span>JavaScript</span>
                <span>HTML</span>
                <span>CSS</span>
              </div>
            </div>

            <div className="mini-project-card">
              <div className="mini-project-icon">✅</div>
              <h4>To-Do List App</h4>
              <p>Productivity application with task categorization, due dates, priority levels, and local storage. Includes drag-and-drop functionality and filter options.</p>
              <div className="mini-project-tags">
                <span>JavaScript</span>
                <span>LocalStorage</span>
                <span>UI/UX</span>
              </div>
            </div>

            <div className="mini-project-card">
              <div className="mini-project-icon">📝</div>
              <h4>Note Making App</h4>
              <p>Rich text editor with formatting options, categorization, search functionality, and cloud synchronization. Supports image embedding and export to multiple formats.</p>
              <div className="mini-project-tags">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
              </div>
            </div>

            <div className="mini-project-card">
              <div className="mini-project-icon">✍️</div>
              <h4>Blog Website</h4>
              <p>Content management system for creating and publishing articles with user authentication, comments section, and admin dashboard for content moderation.</p>
              <div className="mini-project-tags">
                <span>MERN Stack</span>
                <span>Authentication</span>
                <span>Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact Section ===== */}
    <section id="contact" className="section contact">
    <div className="section-container">
        <h2 className="section-title">
        <span className="title-number">04.</span>
        Contact Me
        </h2>
        <div className="contact-content">
        <div className="contact-info">
            <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div>
                <h3>Email</h3>
                <p><a href="sanidhy.pranshu@gmail.com">sanidhy.pranshu@gmail.com</a></p>
            </div>
            </div>
            <div className="contact-item">
            <div className="contact-icon">💼</div>
            <div>
                <h3>LinkedIn</h3>
                <p><a href="https://www.linkedin.com/in/sanidhya-verma-106622310/">linkedin.com/sanidhya-verma</a></p>
            </div>
            </div>
            <div className="contact-item">
            <div className="contact-icon">🐙</div>
            <div>
                <h3>GitHub</h3>
                <p><a href="https://github.com/sugaredcookie">github.com/sugaredcookie</a></p>
            </div>
            </div>
        </div>
        <div className="contact-form">
            <h3>Send me a message</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                type="text" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                />
            </div>
            <div className="form-group">
                <input 
                type="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                />
            </div>
            <div className="form-group">
                <textarea 
                placeholder="Your Message" 
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <div className="btn-icon">{isSubmitting ? '⏳' : '→'}</div>
            </button>
            {submitStatus && (
                <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.message}
                </div>
            )}
            </form>
        </div>
        </div>
    </div>
    </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Sanidhya Verma. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <span>•</span>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;