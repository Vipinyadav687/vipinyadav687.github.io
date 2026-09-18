import { Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class PortfolioComponent {

  activeSection: string = 'about';
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.changeTheme(this.themes[0]);        // Default: Cyber Teal
    this.changeBackground(this.backgrounds[0]); // Default: Midnight Slate
    this.changeFont(this.fonts[0]);
  }
  scrollToSection(sectionId: string) {
    this.activeSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Profile Data
  profile = {
    name: 'Vipin Yadav',
    role: 'FULL STACK DEVELOPER',
    avatar: 'https://ui-avatars.com/api/?name=Vipin+Yadav&background=2DD4BF&color=fff&size=150',
    email: 'vipinyadav31687@gmail.com',
    github: 'https://vipinyadav687.github.io/',
    linkedin: 'https://www.linkedin.com/in/vipinyadav16'
  };

  about = {
    title: 'Get to know a little about me',
    description1: 'Results-driven Full Stack Developer with 4+ years of experience specializing in Angular, ASP.NET, and SQL-based applications. Experienced in developing and maintaining cloud-based ERP (SaaS) platforms, building scalable enterprise solutions, and designing secure RESTful APIs.',
    description2: 'With a strong background in frontend development, backend integration, and database management, I am passionate about writing clean, optimized, and maintainable code for production environments. I also hold an IT Career Fundamentals certification from Charles Sturt University, Australia.'
  };

  skills = [
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg', color: '#DD0031' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', color: '#3178C6' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
    { name: 'C# / .NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', color: '#9B4F96' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', color: '#339933' },
    { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', color: '#CC292B' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', color: '#4479A1' },
    { name: 'HTML & CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', color: '#E34F26' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg', color: '#7952B3' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', color: '#FF9900' },
    { name: 'Git & DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', color: '#F05032' }
  ];

  projects = [
    {
      title: 'Enterprise Tax Billing & Lab System',
      description: 'A lightning-fast Angular web app replicating desktop software workflows. Features zero-mouse keyboard navigation, dynamic multi-state GST calculations, secure Nodemailer OTP auth, and pixel-perfect A4 invoice PDF generation.',
      tags: ['Angular Signals', 'Node.js', 'MySQL', 'Print Engine'],
      image: '/assets/portfolioImg/billing.png'
    },
    {
      title: 'Cloud-Based ERP (SaaS)',
      description: 'Developed a cloud-based ERP application serving finance, HR, inventory, and operations modules. Designed robust RESTful APIs using ASP.NET and optimized SQL databases for secure, multi-tenant enterprise clients.',
      tags: ['Angular', 'ASP.NET', 'SQL Server', 'RESTful APIs'],
      image: '/assets/portfolioImg/mmsoft.png'
    },
    {
      title: 'Car Rental Service',
      description: 'Engineered a dynamic web service for renting cars, complete with a secure admin panel and payment gateway integration to drive business growth.',
      tags: ['Angular', 'TypeScript', 'Bootstrap', 'APIs'],
      image: ''
    },
    {
      title: 'Construction Web-App',
      description: 'Developed an innovative admin panel for the construction industry, delivering a highly user-friendly UI and comprehensive bug resolution.',
      tags: ['Angular', 'Django', 'MongoDB', 'Bootstrap'],
      image: ''
    },
    {
      title: 'Loan Consultancy Platform',
      description: 'Built a user-friendly web application designed to seamlessly connect loan providers with clients.',
      tags: ['Angular', 'HTML/CSS', 'Bootstrap'],
      image: ''
    },
    {
      title: 'Business Transformation',
      description: 'Delivered critical contributions to IT services and spearheaded business transformation solutions to enhance operational efficiency and client satisfaction.',
      tags: ['System Engineering', 'IT Services'],
      image: ''
    }
  ];

  // =========================================
  // --- UPGRADED LOCAL AI ENGINE ---
  // =========================================
  isChatOpen: boolean = false;
  isTyping: boolean = false;

  chatMessages: { role: 'user' | 'ai', text: string }[] = [
    { role: 'ai', text: "Hi! I'm Vipin's virtual assistant. I have his entire resume memorized. What would you like to know about his skills or experience?" }
  ];

  knowledgeBase = [
    {
      category: "Skills & Knowledge",
      keywords: ['know', 'knows', 'knowledge', 'skill', 'skills', 'tech', 'technology', 'stack', 'frontend', 'backend', 'database', 'angular', 'asp', 'sql', 'bootstrap', 'javascript'],
      weight: 2,
      answer: "Vipin specializes in Angular, TypeScript, ASP.NET, and SQL Server. He is also highly proficient in JavaScript (ES6+), HTML5/CSS3, Bootstrap, MySQL, AWS Lightsail, and Git."
    },
    {
      category: "Work Experience",
      keywords: ['work', 'works', 'working', 'worked', 'experience', 'job', 'jobs', 'company', 'companies', 'history', 'role', 'tcs', 'mmi', 'vconnect'],
      weight: 2,
      answer: "Vipin has 4+ years of experience. He currently works at MMI Software's PVT LTD as an Angular/Full Stack Developer. Previously, he was a System Engineer at Tata Consultancy Services (TCS) and a Web Developer at vConnect Systems in Australia."
    },
    {
      category: "Projects",
      keywords: ['project', 'projects', 'build', 'built', 'made', 'create', 'erp', 'saas', 'car', 'construction', 'loan', 'tax'],
      weight: 2,
      answer: "Some of his key projects include a Cloud-Based ERP (SaaS) for Finance/HR, an Enterprise Tax Billing System, a Car Rental service, and a Construction Web-App using technologies like Angular, ASP.NET, Django, and MongoDB."
    },
    {
      category: "Education",
      keywords: ['education', 'study', 'studied', 'degree', 'mca', 'bca', 'university', 'college', 'inmantec', 'charles', 'sturt'],
      weight: 1.5,
      answer: "Vipin holds a Master of Computer Applications (MCA) and a Bachelor of Computer Applications (BCA) from INMANTEC, Ghaziabad. He also has an IT Career Fundamentals certification from Charles Sturt University, Australia."
    },
    {
      category: "Contact",
      keywords: ['hire', 'contact', 'email', 'phone', 'number', 'reach', 'resume', 'call', 'mobile'],
      weight: 2,
      answer: "You can reach Vipin directly at vipinyadav31687@gmail.com or call him at 8800604503. He is always open to discussing new opportunities!"
    },
    {
      category: "Summary",
      keywords: ['who', 'about', 'summary', 'profile', 'vipin', 'yadav', 'you'],
      weight: 1,
      answer: "Vipin Yadav is a Results-driven Full Stack Developer with 4+ years of experience. He is passionate about building scalable enterprise solutions, cloud-based ERP platforms, and secure RESTful APIs."
    }
  ];

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(inputEl: HTMLInputElement) {
    const text = inputEl.value.trim();
    if (!text) return;

    this.chatMessages.push({ role: 'user', text: text });
    inputEl.value = '';
    this.isTyping = true;
    this.cdr.detectChanges();
    this.scrollToBottom();

    setTimeout(() => {
      this.analyzeAndRespond(text);
    }, 1200);
  }

  analyzeAndRespond(query: string) {
    this.isTyping = false;
    let bestMatch = { score: 0, answer: "" };

    const cleanQuery = query.toLowerCase().replace(/[^\w\s]/gi, '');
    const userWords = cleanQuery.split(' ');

    for (const entry of this.knowledgeBase) {
      let currentScore = 0;
      for (const word of userWords) {
        if (word.length < 2) continue;
        if (entry.keywords.includes(word)) {
          currentScore += entry.weight;
        }
      }
      if (currentScore > bestMatch.score) {
        bestMatch.score = currentScore;
        bestMatch.answer = entry.answer;
      }
    }

    let finalResponse = "";
    if (bestMatch.score > 0) {
      finalResponse = bestMatch.answer;
    } else {
      finalResponse = "That's an interesting question! Try asking me about Vipin's 'skills', 'work experience', 'projects', or 'education'.";
    }

    this.chatMessages.push({ role: 'ai', text: finalResponse });
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatBody = document.getElementById('chat-body');
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 100);
  }

  // =========================================
  // --- LIVE THEME CUSTOMIZER ---
  // =========================================
  isSettingsOpen: boolean = false;

  // 12 Accent Colors (Vibrant & Polite/Pastel)
  themes = [
    // Vibrant & Dark Tones
    { name: 'Cyber Teal', color: '#2DD4BF', primary: '#2DD4BF', dark: '#14b8a6', darker: '#0d9488', secondary: '#60A5FA', rgb: '45, 212, 191' },
    { name: 'Electric Blue', color: '#3b82f6', primary: '#3b82f6', dark: '#2563eb', darker: '#1d4ed8', secondary: '#8b5cf6', rgb: '59, 130, 246' },
    { name: 'Amethyst', color: '#c084fc', primary: '#c084fc', dark: '#a855f7', darker: '#9333ea', secondary: '#f472b6', rgb: '192, 132, 252' },
    { name: 'Neon Fuchsia', color: '#d946ef', primary: '#d946ef', dark: '#c026d3', darker: '#a21caf', secondary: '#3b82f6', rgb: '217, 70, 239' },
    { name: 'Crimson Red', color: '#ef4444', primary: '#ef4444', dark: '#dc2626', darker: '#b91c1c', secondary: '#f59e0b', rgb: '239, 68, 68' },
    { name: 'Blaze Orange', color: '#fb923c', primary: '#fb923c', dark: '#f97316', darker: '#ea580c', secondary: '#f43f5e', rgb: '251, 146, 60' },
    { name: 'Cyber Gold', color: '#eab308', primary: '#eab308', dark: '#ca8a04', darker: '#a16207', secondary: '#ef4444', rgb: '234, 179, 8' },
    { name: 'Toxic Green', color: '#84cc16', primary: '#84cc16', dark: '#65a30d', darker: '#4d7c0f', secondary: '#14b8a6', rgb: '132, 204, 22' },

    // Light, Polite & Professional Tones
    { name: 'Polite Sky', color: '#38bdf8', primary: '#38bdf8', dark: '#0284c7', darker: '#0369a1', secondary: '#818cf8', rgb: '56, 189, 248' },
    { name: 'Mint Breeze', color: '#6ee7b7', primary: '#6ee7b7', dark: '#059669', darker: '#047857', secondary: '#34d399', rgb: '110, 231, 183' },
    { name: 'Soft Coral', color: '#fb7185', primary: '#fb7185', dark: '#e11d48', darker: '#be123c', secondary: '#f472b6', rgb: '251, 113, 133' },
    { name: 'Gentle Lavender', color: '#a78bfa', primary: '#a78bfa', dark: '#7c3aed', darker: '#6d28d9', secondary: '#c084fc', rgb: '167, 139, 250' }
  ];

  // 9 Background Themes (Deep Darks & Soft Professional)
  backgrounds = [
    // Deep & Intense
    { name: 'Midnight Slate', main: '#0f172a', secondary: '#1e293b', top: '#111827', hero: '#0b1120', mainRgb: '15, 23, 42', secRgb: '30, 41, 59' },
    { name: 'Pitch Black', main: '#000000', secondary: '#111111', top: '#0a0a0a', hero: '#050505', mainRgb: '0, 0, 0', secRgb: '17, 17, 17' },
    { name: 'Deep Navy', main: '#060e1c', secondary: '#121d33', top: '#09142b', hero: '#040a14', mainRgb: '6, 14, 28', secRgb: '18, 29, 51' },
    { name: 'Matte Charcoal', main: '#171717', secondary: '#262626', top: '#1c1c1c', hero: '#121212', mainRgb: '23, 23, 23', secRgb: '38, 38, 38' },
    { name: 'Dark Ruby', main: '#1a0b0e', secondary: '#2a1217', top: '#14080a', hero: '#0d0405', mainRgb: '26, 11, 14', secRgb: '42, 18, 23' },
    { name: 'Deep Forest', main: '#0a1411', secondary: '#12241f', top: '#0c1a16', hero: '#060d0b', mainRgb: '10, 20, 17', secRgb: '18, 36, 31' },

    // Soft, Polite & Professional (Lighter, but keeps text readable)
    { name: 'Corporate Steel', main: '#334155', secondary: '#475569', top: '#1e293b', hero: '#1e293b', mainRgb: '51, 65, 85', secRgb: '71, 85, 105' },
    { name: 'Soft Mocha', main: '#292524', secondary: '#44403c', top: '#1c1917', hero: '#1c1917', mainRgb: '41, 37, 36', secRgb: '68, 64, 60' },
  ];
  fonts = [
    { name: 'Modern (Inter)', family: "'Inter', system-ui, sans-serif" },
    { name: 'Geometric (Poppins)', family: "'Poppins', 'Montserrat', sans-serif" },
    { name: 'Brutal (Grotesk)', family: "'Space Grotesk', 'Helvetica Neue', sans-serif" },
    { name: 'Hacker (JetBrains)', family: "'JetBrains Mono', 'Consolas', monospace" },
    { name: 'Terminal (Code)', family: "'Fira Code', 'Courier New', monospace" },
    { name: 'Elegant (Serif)', family: "'Playfair Display', Georgia, serif" }
  ];

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  changeTheme(theme: any) {
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--primary-dark', theme.dark);
    document.documentElement.style.setProperty('--primary-darker', theme.darker);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    document.documentElement.style.setProperty('--primary-rgb', theme.rgb);
  }

  changeBackground(bg: any) {
    document.documentElement.style.setProperty('--bg-main', bg.main);
    document.documentElement.style.setProperty('--bg-secondary', bg.secondary);
    document.documentElement.style.setProperty('--bg-sidebar-top', bg.top);
    document.documentElement.style.setProperty('--bg-hero', bg.hero);
    document.documentElement.style.setProperty('--bg-main-rgb', bg.mainRgb);
    document.documentElement.style.setProperty('--bg-secondary-rgb', bg.secRgb);
    this.applyContrast(bg.main);
  }

  changeFont(font: any) {
    document.documentElement.style.setProperty('--font-main', font.family);
  }
  // --- CUSTOM COLOR PICKER ENGINE ---
  onCustomColorChange(event: any) {
    const hex = event.target.value; // Get the hex from the picker (e.g., #ff0000)

    // 1. Convert Hex to RGB for the transparent glows
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const rgbString = `${r}, ${g}, ${b}`;

    // 2. Calculate darker shades for gradients and hover states
    const darkR = Math.floor(r * 0.8);
    const darkG = Math.floor(g * 0.8);
    const darkB = Math.floor(b * 0.8);
    const darkHex = `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;

    const darkerR = Math.floor(r * 0.6);
    const darkerG = Math.floor(g * 0.6);
    const darkerB = Math.floor(b * 0.6);
    const darkerHex = `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;

    // 3. Calculate a lighter secondary color for the text gradients
    const secR = Math.min(255, Math.floor(r * 1.3));
    const secG = Math.min(255, Math.floor(g * 1.3));
    const secB = Math.min(255, Math.floor(b * 1.3));
    const secHex = `#${secR.toString(16).padStart(2, '0')}${secG.toString(16).padStart(2, '0')}${secB.toString(16).padStart(2, '0')}`;

    // 4. Inject them instantly into the CSS Variables
    document.documentElement.style.setProperty('--primary', hex);
    document.documentElement.style.setProperty('--primary-dark', darkHex);
    document.documentElement.style.setProperty('--primary-darker', darkerHex);
    document.documentElement.style.setProperty('--secondary', secHex);
    document.documentElement.style.setProperty('--primary-rgb', rgbString);
  }
  // --- CUSTOM BACKGROUND ENGINE ---
  onCustomBgChange(event: any) {
    const hex = event.target.value;

    // 1. Convert base Hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const mainRgb = `${r}, ${g}, ${b}`;

    // 2. Calculate Secondary Background (Cards/Panels) - slightly lighter for contrast
    const secR = Math.min(255, r + 15);
    const secG = Math.min(255, g + 15);
    const secB = Math.min(255, b + 15);
    const secHex = `#${secR.toString(16).padStart(2, '0')}${secG.toString(16).padStart(2, '0')}${secB.toString(16).padStart(2, '0')}`;
    const secRgb = `${secR}, ${secG}, ${secB}`;

    // 3. Calculate Sidebar Top - very slightly lighter than main
    const topR = Math.min(255, r + 5);
    const topG = Math.min(255, g + 5);
    const topB = Math.min(255, b + 5);
    const topHex = `#${topR.toString(16).padStart(2, '0')}${topG.toString(16).padStart(2, '0')}${topB.toString(16).padStart(2, '0')}`;

    // 4. Calculate Hero Section - slightly darker for depth
    const heroR = Math.max(0, r - 5);
    const heroG = Math.max(0, g - 5);
    const heroB = Math.max(0, b - 5);
    const heroHex = `#${heroR.toString(16).padStart(2, '0')}${heroG.toString(16).padStart(2, '0')}${heroB.toString(16).padStart(2, '0')}`;

    // 5. Inject instantly into the CSS Variables
    document.documentElement.style.setProperty('--bg-main', hex);
    document.documentElement.style.setProperty('--bg-secondary', secHex);
    document.documentElement.style.setProperty('--bg-sidebar-top', topHex);
    document.documentElement.style.setProperty('--bg-hero', heroHex);
    document.documentElement.style.setProperty('--bg-main-rgb', mainRgb);
    document.documentElement.style.setProperty('--bg-secondary-rgb', secRgb);
    this.applyContrast(hex);
  }
  applyContrast(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Mathematical formula to find brightness (luminance)
    const luminance = (r * 299 + g * 587 + b * 114) / 1000;

    if (luminance > 150) {
      // It's a LIGHT background -> Apply Dark Text & Borders
      document.documentElement.style.setProperty('--text-main', '#0f172a');
      document.documentElement.style.setProperty('--text-muted', '#475569');
      document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.15)');
    } else {
      // It's a DARK background -> Apply White Text & Borders
      document.documentElement.style.setProperty('--text-main', '#f8fafc');
      document.documentElement.style.setProperty('--text-muted', '#94a3b8');
      document.documentElement.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
    }
  }
  // --- VOICE RECOGNITION ENGINE ---
  isListening: boolean = false;
  recognition: any;

  startVoiceInput(inputEl: HTMLInputElement) {
    // If already listening, stop it manually
    if (this.isListening) {
      this.recognition?.stop();
      return;
    }

    // Connect to the browser's native Speech API
    const SpeechRecognitionApi = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognitionApi) {
      alert("Sorry, your browser doesn't support voice recognition. Please try Google Chrome or Microsoft Edge.");
      return;
    }

    this.recognition = new SpeechRecognitionApi();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false; // Only get final results
    this.recognition.maxAlternatives = 1;

    // When the microphone turns on
    this.recognition.onstart = () => {
      this.isListening = true;
      inputEl.placeholder = "Listening...";
      this.cdr.detectChanges();
    };

    // When the browser successfully translates voice to text
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      inputEl.value = transcript;
    };

    // When the user stops speaking
    this.recognition.onend = () => {
      this.isListening = false;
      inputEl.placeholder = "Ask about my skills...";
      this.cdr.detectChanges();
      
      // Auto-send the message if text was captured
      if (inputEl.value.trim().length > 0) {
        this.sendMessage(inputEl);
      }
    };

    // If an error occurs (like mic permissions denied)
    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      inputEl.placeholder = "Ask about my skills...";
      console.error("Speech Recognition Error:", event.error);
      this.cdr.detectChanges();
    };

    // Start listening
    this.recognition.start();
  }
}