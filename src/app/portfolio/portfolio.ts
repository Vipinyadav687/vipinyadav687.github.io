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
  constructor(private cdr: ChangeDetectorRef) {}
  
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

  themes = [
    { name: 'Cyber Teal', color: '#2DD4BF', primary: '#2DD4BF', dark: '#14b8a6', darker: '#0d9488', secondary: '#60A5FA', rgb: '45, 212, 191' },
    { name: 'Amethyst', color: '#c084fc', primary: '#c084fc', dark: '#a855f7', darker: '#9333ea', secondary: '#f472b6', rgb: '192, 132, 252' },
    { name: 'Emerald', color: '#34d399', primary: '#34d399', dark: '#10b981', darker: '#059669', secondary: '#fbbf24', rgb: '52, 211, 153' },
    { name: 'Blaze', color: '#fb923c', primary: '#fb923c', dark: '#f97316', darker: '#ea580c', secondary: '#f43f5e', rgb: '251, 146, 60' }
  ];

  fonts = [
    { name: 'Modern', family: "'Inter', system-ui, sans-serif" },
    { name: 'Tech Code', family: "'Fira Code', 'Courier New', monospace" },
    { name: 'Elegant', family: "'Playfair Display', Georgia, serif" }
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

  changeFont(font: any) {
    document.documentElement.style.setProperty('--font-main', font.family);
  }
}