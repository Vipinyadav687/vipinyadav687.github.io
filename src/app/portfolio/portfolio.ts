import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class PortfolioComponent implements OnInit {

  activeSection: string = 'home';
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.changeTheme(this.themes[0]);
    this.changeBackground(this.backgrounds[0]);
    this.changeFont(this.fonts[0]);
    this.displaySkills = [...this.skills];
  }

  scrollToSection(sectionId: string) {
    this.activeSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // =========================================
  // --- GLOBAL KEYBOARD SHORTCUT (Shift + V)
  // =========================================
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.shiftKey && event.key.toLowerCase() === 'v') {
      if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        event.preventDefault(); 
        this.startJarvis();
      }
    }
  }
  // =========================================
  // --- 1. JARVIS AUDIO HOLOGRAM ---
  // =========================================
  @ViewChild('hologramCanvas') hologramCanvas!: ElementRef<HTMLCanvasElement>;
  private holoCtx!: CanvasRenderingContext2D;
  private holoFrame: any;
  private time = 0;

  initHologram() {
    if (!this.hologramCanvas) return;
    const canvas = this.hologramCanvas.nativeElement;
    this.holoCtx = canvas.getContext('2d')!;
    canvas.width = 60;
    canvas.height = 60;
    this.drawHologram();
  }

  drawHologram() {
    if (!this.hologramCanvas) return;
    const canvas = this.hologramCanvas.nativeElement;
    this.holoCtx.clearRect(0, 0, canvas.width, canvas.height);
    this.time += 0.1;

    // Only draw the wild pulsing waveforms if Jarvis is actively listening or speaking
    const amplitude = this.isJarvisListening ? 15 : 3; 
    const speed = this.isJarvisListening ? 2 : 0.5;

    this.holoCtx.beginPath();
    for (let i = 0; i < canvas.width; i++) {
      const y = (canvas.height / 2) + Math.sin(i * 0.1 + this.time * speed) * amplitude * Math.sin(this.time * 0.5);
      this.holoCtx.lineTo(i, y);
    }
    this.holoCtx.strokeStyle = this.isJarvisListening ? '#ef4444' : '#2DD4BF';
    this.holoCtx.lineWidth = 2;
    this.holoCtx.stroke();

    this.holoFrame = requestAnimationFrame(() => this.drawHologram());
  }

  // NOTE: Add this.initHologram() inside your existing ngAfterViewInit() function!

  // =========================================
  // --- 2. CHAOS MONKEY DOM HEALER ---
  // =========================================
  isChaosActive: boolean = false;
  chaosMessage: string = '';

  triggerChaosMonkey() {
    if (this.isChaosActive) return;
    this.isChaosActive = true;
    this.chaosMessage = "🚨 CRITICAL DOM FAILURE DETECTED 🚨";

    // Grab every major element on the page
    const elements = document.querySelectorAll('.project-card, .premium-skill-card, .contact-card, .arch-node, .section-title, .premium-btn');
    
    // Break the DOM (Scatter them randomly across the screen)
    elements.forEach((el: any) => {
      el.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      el.style.transform = `translate(${(Math.random() - 0.5) * 800}px, ${(Math.random() - 0.5) * 800}px) rotate(${(Math.random() - 0.5) * 360}deg)`;
      el.style.opacity = '0.3';
      el.style.pointerEvents = 'none';
    });

    // Auto-Healing Algorithm
    setTimeout(() => {
      this.chaosMessage = "🤖 AI System Recovery Initiated. Recalculating DOM matrix...";
      
      setTimeout(() => {
        elements.forEach((el: any) => {
          el.style.transform = 'translate(0, 0) rotate(0deg)';
          el.style.opacity = '1';
        });
        
        this.chaosMessage = "✅ System Restored Successfully.";
        
        // Cleanup
        setTimeout(() => {
          elements.forEach((el: any) => {
            el.style.transition = '';
            el.style.pointerEvents = 'auto';
          });
          this.isChaosActive = false;
        }, 1000);
      }, 2000);
    }, 2500);
  }

 // =========================================
  // --- 3. JEDI WEBCAM MOTION TRACKING ---
  // =========================================
  @ViewChild('webcamVideo') webcamVideo!: ElementRef<HTMLVideoElement>;
  isJediModeActive: boolean = false;
  jediFeedback: string = "Camera off.";
  
  // Motion Tracking Variables
  private motionCanvas = document.createElement('canvas');
  private motionCtx = this.motionCanvas.getContext('2d', { willReadFrequently: true });
  private previousFrame: Uint8ClampedArray | null = null;
  private motionInterval: any;

  enableJediMode() {
    if (this.isJediModeActive) {
      this.isJediModeActive = false;
      clearInterval(this.motionInterval);
      const stream = this.webcamVideo.nativeElement.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      this.jediFeedback = "Camera off.";
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } })
      .then(stream => {
        this.isJediModeActive = true;
        this.webcamVideo.nativeElement.srcObject = stream;
        this.webcamVideo.nativeElement.play();
        this.jediFeedback = "Warming up motion sensors...";
        
        // Wait for video to start playing before tracking
        this.webcamVideo.nativeElement.onloadedmetadata = () => {
          this.motionCanvas.width = 320;
          this.motionCanvas.height = 240;
          this.trackMotion();
        };
      })
      .catch(err => {
        this.jediFeedback = "Camera access denied.";
      });
  }

  trackMotion() {
    if (!this.isJediModeActive || !this.motionCtx) return;
    this.jediFeedback = "Tracking... Wave hand UP or DOWN to scroll";
    this.cdr.detectChanges();

    this.motionInterval = setInterval(() => {
      if (!this.isJediModeActive) return;
      const video = this.webcamVideo.nativeElement;
      if (video.paused || video.ended) return;

      // Draw current video frame to hidden canvas
      this.motionCtx!.drawImage(video, 0, 0, 320, 240);
      const frame = this.motionCtx!.getImageData(0, 0, 320, 240);
      const currentData = frame.data;

      if (this.previousFrame) {
        let motionUp = 0;
        let motionDown = 0;

        // Compare current pixels to previous pixels (Pixel Diffing)
        // We step by 16 (4 pixels at a time) for performance
        for (let i = 0; i < currentData.length; i += 16) { 
          // Check the difference in the Red channel
          const diff = Math.abs(currentData[i] - this.previousFrame[i]);
          
          if (diff > 40) { // If pixel changed significantly (movement)
            const y = Math.floor((i / 4) / 320); // Calculate Y coordinate
            if (y < 120) motionUp++; // Motion in top half of camera
            else motionDown++;       // Motion in bottom half of camera
          }
        }

        // If a massive block of pixels moved (a hand wave)
        const threshold = 600; // Adjust if it's too sensitive or not sensitive enough
        const contentArea = document.querySelector('.content-area');

        if (motionUp > threshold && motionUp > motionDown * 1.5) {
          this.jediFeedback = "⬇️ Swiping DOWN! Scrolling...";
          contentArea?.scrollBy({ top: 500, behavior: 'smooth' });
          this.cdr.detectChanges();
        } else if (motionDown > threshold && motionDown > motionUp * 1.5) {
          this.jediFeedback = "⬆️ Swiping UP! Scrolling...";
          contentArea?.scrollBy({ top: -500, behavior: 'smooth' });
          this.cdr.detectChanges();
        } else {
          this.jediFeedback = "Tracking... Wave hand UP or DOWN to scroll";
          this.cdr.detectChanges();
        }
      }
      
      // Save current frame to compare against the next one
      this.previousFrame = new Uint8ClampedArray(currentData);
    }, 200); // Run check every 200ms
  }

  // =========================================
  // --- GLOBAL "JARVIS" VOICE AI ENGINE ---
  // =========================================
  isJarvisListening: boolean = false;
  jarvisFeedback: string = '';
  jarvisRecognition: any;

  startJarvis() {
    if (this.isJarvisListening) { this.jarvisRecognition?.stop(); return; }
    
    const SpeechRecognitionApi = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionApi) { 
      alert("Voice navigation unsupported in this browser. Please use Chrome or Edge."); 
      return; 
    }

    this.jarvisRecognition = new SpeechRecognitionApi();
    this.jarvisRecognition.lang = 'en-US';
    this.jarvisRecognition.interimResults = false;
    
    this.jarvisRecognition.onstart = () => { 
      this.isJarvisListening = true; 
      this.jarvisFeedback = "Listening... (Ask a question or give a command)"; 
      // Cancel any ongoing speech
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      this.cdr.detectChanges(); 
    };
    
    this.jarvisRecognition.onresult = (event: any) => { 
      const command = event.results[0][0].transcript.toLowerCase();
      this.processJarvisCommand(command);
    };
    
    this.jarvisRecognition.onend = () => {
      this.isJarvisListening = false;
      this.cdr.detectChanges();
    };

    this.jarvisRecognition.onerror = (event: any) => {
      this.jarvisFeedback = "Couldn't hear a command. Try again.";
      this.isJarvisListening = false;
      this.cdr.detectChanges();
      setTimeout(() => { this.jarvisFeedback = ''; this.cdr.detectChanges(); }, 3000);
    };
    
    this.jarvisRecognition.start();
  }

  // 1. TEXT-TO-SPEECH FUNCTION
  speakFeedback(text: string) {
    this.jarvisFeedback = text;
    this.cdr.detectChanges();
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any talking
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // Slightly conversational speed
      window.speechSynthesis.speak(utterance);
    }
    
    // Clear tooltip after reading
    setTimeout(() => {
      if (this.jarvisFeedback === text) {
         this.jarvisFeedback = '';
         this.cdr.detectChanges();
      }
    }, 6000);
  }

  // 2. THE JARVIS BRAIN (Commands, Easter Eggs & NLP)
  processJarvisCommand(command: string) {
    
    // --- EASTER EGGS ---
    if (command.includes('turn off the light') || command.includes('dark mode')) {
       this.changeBackground(this.backgrounds[1]); // Pitch Black
       this.changeTheme(this.themes[1]); // Electric Blue
       this.speakFeedback("Going dark. Electric blue theme active.");
       return;
    }
    if (command.includes('print') && command.includes('resume')) {
       this.speakFeedback("Opening the print dialog for Vipin's resume.");
       window.print();
       return;
    }
    if (command.includes('clear everything') || command.includes('reset')) {
       this.analyzeMatch(''); // Clears matcher
       this.changeBackground(this.backgrounds[0]);
       this.changeTheme(this.themes[0]);
       this.scrollToSection('home');
       this.speakFeedback("Everything has been reset to default.");
       return;
    }

    // --- VOICE-POWERED JOB MATCHER ---
    if (command.includes('filter by') || command.includes('analyze') || command.includes('show me projects with')) {
       const query = command.replace(/(filter by|analyze|show me projects with)/g, '').trim();
       this.scrollToSection('projects');
       this.analyzeMatch(query);
       this.speakFeedback(`Filtering portfolio for ${query}. Check the highlighted projects.`);
       return;
    }

    // --- NAVIGATION ---
    if (command.includes('scroll to') || command.includes('go to')) {
      if (command.includes('about')) { this.scrollToSection('about'); this.speakFeedback("Navigating to the About section."); return; }
      if (command.includes('skill')) { this.scrollToSection('skills'); this.speakFeedback("Here are Vipin's technical skills."); return; }
      if (command.includes('project') || command.includes('experience')) { this.scrollToSection('projects'); this.speakFeedback("Viewing projects and experience."); return; }
      if (command.includes('contact') || command.includes('hire')) { this.scrollToSection('contact'); this.speakFeedback("Let's get in touch."); return; }
      if (command.includes('architecture') || command.includes('diagram')) { this.scrollToSection('architecture'); this.speakFeedback("Architecture diagram ."); return; }
      if (command.includes('home') || command.includes('top')) { this.scrollToSection('home'); this.speakFeedback("Going to the top."); return; }
    }

    // --- NLP Q&A (JARVIS SPEAKS BACK) ---
    // If it's not a command, try to answer it like a chatbot!
    let bestMatch = { score: 0, answer: "" };
    const cleanQuery = command.replace(/[^\w\s]/gi, '');
    const userWords = cleanQuery.split(' '); 
    
    for (const entry of this.knowledgeBase) {
      let currentScore = 0;
      for (const word of userWords) {
        if (word.length < 2) continue; 
        if (entry.keywords.includes(word)) currentScore += entry.weight;
      }
      if (currentScore > bestMatch.score) {
        bestMatch.score = currentScore;
        bestMatch.answer = entry.answer;
      }
    }

    if (bestMatch.score > 0) {
      this.speakFeedback(bestMatch.answer);
    } else {
      this.speakFeedback(`I heard "${command}". I didn't quite catch that. Try saying 'Scroll to projects', or ask 'What are your skills?'`);
    }
  }


  // =========================================
  // --- INLINE AI MATCHER & SHAPE-SHIFTER ---
  // =========================================
  isAnalyzing: boolean = false;
  hasAnalyzed: boolean = false;
  matchPercentage: number = 0;
  matchFeedback: string = '';
  visibleProjects: any[] = [];
  displaySkills: any[] = [];

  analyzeMatch(input: string) {
    if (!input || !input.trim()) {
      this.visibleProjects = this.projects.map(p => ({ ...p, isHighlighted: true }));
      this.displaySkills = [...this.skills].map(s => ({...s, isHighlighted: false}));
      this.hasAnalyzed = false;
      this.isAnalyzing = false;
      this.cdr.detectChanges();
      return;
    }

    this.isAnalyzing = true;
    this.hasAnalyzed = true;
    this.matchPercentage = 0;
    this.matchFeedback = '';
    this.cdr.detectChanges();

    setTimeout(() => {
      try {
        const query = input.toLowerCase().trim();
        let score = 0;
        let matchedSkills: string[] = [];
        
        const typoFixes: { [key: string]: string } = { 
          'sass': 'saas', 'anglar': 'angular', 'angulr': 'angular', 
          'type script': 'typescript', 'java script': 'javascript', 
          'sqll': 'sql', 'front end': 'frontend', 'back end': 'backend' 
        };
        
        let correctedQuery = query;
        Object.keys(typoFixes).forEach(typo => { correctedQuery = correctedQuery.replace(typo, typoFixes[typo]); });

        const techKeywords = ['angular', 'typescript', 'javascript', 'node', 'sql', 'mysql', 'c#', '.net', 'aws', 'erp', 'saas', 'frontend', 'backend', 'full stack', 'api', 'dashboard'];
        techKeywords.forEach(tech => {
          if (correctedQuery.includes(tech)) { score += 15; matchedSkills.push(tech); }
        });

        const userWords = correctedQuery.replace(/[^\w\s]/gi, '').split(' ').filter(w => w.length >= 3);

        this.visibleProjects = this.projects.map((p) => {
          const tagsText = p.tags ? p.tags.join(' ') : ''; 
          const projText = (p.title + ' ' + p.description + ' ' + tagsText).toLowerCase();
          
          let isMatch = matchedSkills.some(skill => projText.includes(skill));
          if (!isMatch) {
              isMatch = userWords.some(word => projText.includes(word));
              if (isMatch) score += 10; 
          }
          return { ...p, isHighlighted: isMatch };
        });

        this.displaySkills = [...this.skills].map(s => {
           const skillName = s.name.toLowerCase().replace(/[.#]/g, '');
           const isSkillMatch = matchedSkills.some(m => skillName.includes(m)) || userWords.some(w => skillName.includes(w));
           return { ...s, isHighlighted: isSkillMatch };
        }).sort((a, b) => {
           if (a.isHighlighted && !b.isHighlighted) return -1;
           if (!a.isHighlighted && b.isHighlighted) return 1;
           return 0;
        });

        const totalMatches = this.visibleProjects.filter(p => p.isHighlighted).length;

        if (totalMatches > 0) {
          this.matchPercentage = Math.min(Math.floor(score + 35 + Math.random() * 15), 98); 
          if (matchedSkills.length > 0) this.matchFeedback = `Match found! You need ${matchedSkills.join(', ')}. I've highlighted my relevant projects & skills.`;
          else this.matchFeedback = `I found some relevant projects based on your search! I've highlighted them below.`;
        } else {
          this.matchPercentage = Math.floor(25 + Math.random() * 20);
          this.matchFeedback = `I didn't find an exact project match for that, but my enterprise full-stack experience makes me highly adaptable. Check out my work below!`;
          this.visibleProjects = this.projects.map(p => ({ ...p, isHighlighted: true }));
        }

        this.isAnalyzing = false;
        this.cdr.detectChanges(); 

        setTimeout(() => {
          if (totalMatches > 0) {
            const firstMatchElement = document.querySelector('.project-card:not(.dimmed)');
            if (firstMatchElement) {
              firstMatchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              firstMatchElement.classList.add('highlight-pulse');
              setTimeout(() => firstMatchElement.classList.remove('highlight-pulse'), 2000);
            }
          }
        }, 150);

      } catch (error) {
        this.isAnalyzing = false;
        this.matchFeedback = "Analysis complete. See highlighted projects below.";
        this.visibleProjects = this.projects.map(p => ({ ...p, isHighlighted: true }));
        this.cdr.detectChanges();
      }
    }, 1000); 
  }

  // =========================================
  // --- SMART SENTIMENT CONTACT FORM ---
  // =========================================
  sentimentType: 'default' | 'urgent' | 'freelance' | 'hire' = 'default';
  sentimentMessage: string = "Tell me about your project or opportunity.";
  sentimentIcon: string = "💬";

  analyzeSentiment(text: string) {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('urgent') || lowerText.includes('asap') || lowerText.includes('emergency') || lowerText.includes('fast')) {
      this.sentimentType = 'urgent';
      this.sentimentMessage = "High Priority! I respond to urgent requests within 12 hours.";
      this.sentimentIcon = "🚨";
    } else if (lowerText.includes('freelance') || lowerText.includes('project') || lowerText.includes('app') || lowerText.includes('build')) {
      this.sentimentType = 'freelance';
      this.sentimentMessage = "I love building new projects! Let's discuss your architecture.";
      this.sentimentIcon = "🚀";
    } else if (lowerText.includes('hire') || lowerText.includes('interview') || lowerText.includes('opportunity') || lowerText.includes('team')) {
      this.sentimentType = 'hire';
      this.sentimentMessage = "Looking forward to speaking with your team! I'm open to new roles.";
      this.sentimentIcon = "💼";
    } else {
      this.sentimentType = 'default';
      this.sentimentMessage = "Tell me about your project or opportunity.";
      this.sentimentIcon = "💬";
    }
    this.cdr.detectChanges(); 
  }

  // =========================================
  // --- DATA ARRAYS ---
  // =========================================
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
    { title: 'Enterprise Tax Billing & Lab System', description: 'A lightning-fast Angular web app replicating desktop software workflows. Features zero-mouse keyboard navigation, dynamic multi-state GST calculations, secure Nodemailer OTP auth, and pixel-perfect A4 invoice PDF generation.', tags: ['Angular Signals', 'Node.js', 'MySQL', 'Print Engine'], image: '/assets/portfolioImg/billing.png' },
    { title: 'Cloud-Based ERP (SaaS)', description: 'Developed a cloud-based ERP application serving finance, HR, inventory, and operations modules. Designed robust RESTful APIs using ASP.NET and optimized SQL databases for secure, multi-tenant enterprise clients.', tags: ['Angular', 'ASP.NET', 'SQL Server', 'RESTful APIs'], image: '/assets/portfolioImg/mmsoft.png' },
    { title: 'Car Rental Service', description: 'Engineered a dynamic web service for renting cars, complete with a secure admin panel and payment gateway integration to drive business growth.', tags: ['Angular', 'TypeScript', 'Bootstrap', 'APIs'], image: '' },
    { title: 'Construction Web-App', description: 'Developed an innovative admin panel for the construction industry, delivering a highly user-friendly UI and comprehensive bug resolution.', tags: ['Angular', 'Django', 'MongoDB', 'Bootstrap'], image: '' },
    { title: 'Loan Consultancy Platform', description: 'Built a user-friendly web application designed to seamlessly connect loan providers with clients.', tags: ['Angular', 'HTML/CSS', 'Bootstrap'], image: '' },
    { title: 'Business Transformation', description: 'Delivered critical contributions to IT services and spearheaded business transformation solutions to enhance operational efficiency and client satisfaction.', tags: ['System Engineering', 'IT Services'], image: '' }
  ];

  // =========================================
  // --- AI CHATBOT LOGIC ---
  // =========================================
  isChatOpen: boolean = false;
  isTyping: boolean = false;
  chatMessages: { role: 'user' | 'ai', text: string }[] = [{ role: 'ai', text: "Hi! I'm Vipin's virtual assistant. I have his entire resume memorized. What would you like to know about his skills or experience?" }];

  knowledgeBase = [
    { category: "Skills", keywords: ['know', 'skill', 'skills', 'tech', 'stack', 'frontend', 'backend', 'angular', 'asp', 'sql'], weight: 2, answer: "Vipin specializes in Angular, TypeScript, ASP.NET, and SQL Server. He also builds APIs and works with AWS." },
    { category: "Experience", keywords: ['work', 'experience', 'job', 'company', 'role', 'tcs', 'mmi', 'vconnect'], weight: 2, answer: "Vipin has 4+ years of experience. He currently works at MMI Software's PVT LTD. Previously, he was at TCS and vConnect Systems." },
    { category: "Projects", keywords: ['project', 'projects', 'build', 'erp', 'saas', 'car', 'loan', 'tax'], weight: 2, answer: "His key projects include a Cloud ERP (SaaS), an Enterprise Tax Billing System, and a Car Rental service." },
    { category: "Contact", keywords: ['hire', 'contact', 'email', 'phone', 'resume', 'call'], weight: 2, answer: "You can reach Vipin at vipinyadav31687@gmail.com. He is always open to discussing new opportunities!" }
  ];

  toggleChat() { this.isChatOpen = !this.isChatOpen; }

  sendMessage(inputEl: HTMLInputElement) {
    const text = inputEl.value.trim();
    if (!text) return;
    this.chatMessages.push({ role: 'user', text: text });
    inputEl.value = ''; 
    this.isTyping = true;
    this.cdr.detectChanges(); 
    this.scrollToBottom();
    setTimeout(() => { this.analyzeAndRespond(text); }, 1200);
  }

 // =========================================
  // --- PREDICTIVE UX (HESITATION TRACKER) ---
  // =========================================
  resumeHoverTimeout: any;
  showResumeHint: boolean = false;

  onResumeHover() {
    // If they hover for 1.5 seconds without clicking, we predict they are hesitating!
    this.resumeHoverTimeout = setTimeout(() => {
      this.showResumeHint = true;
      this.cdr.detectChanges();
    }, 1500);
  }

  onResumeLeave() {
    clearTimeout(this.resumeHoverTimeout);
    this.showResumeHint = false;
    this.cdr.detectChanges();
  }

  // =========================================
  // --- TECH LEAD CODE REVIEWER ---
  // =========================================
  isReviewingCode: boolean = false;
  codeFeedback: string[] = [];
  refactoredCode: string = '';
  hasReviewed: boolean = false;

  analyzeCode(code: string) {
    if (!code || !code.trim()) return;
    
    this.isReviewingCode = true;
    this.hasReviewed = true;
    this.codeFeedback = [];
    this.refactoredCode = '';
    this.cdr.detectChanges();

    // Reduced loading time from 1500ms to 400ms for a much faster, snappier UX
    setTimeout(() => {
      let refactored = code;
      let foundIssues = false;

      // =========================================
      // ENGINE 1: LIVE JAVASCRIPT SANDBOX
      // =========================================
      let consoleOutput: string[] = [];
      const originalLog = console.log; // Temporarily hijack console.log
      
      console.log = (...args) => {
        consoleOutput.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      };

      try {
        // Attempt to execute the raw code to get a live result
        const safeCode = new Function(code);
        safeCode(); 
        
        if (consoleOutput.length > 0) {
          this.codeFeedback.push(`🟢 Live Execution Result:\n${consoleOutput.join('\n')}`);
        }
      } catch (error: any) {
        // If it fails (e.g., TypeScript syntax or Angular imports), fail gracefully
        if (!code.includes('any') && !code.includes('subscribe')) {
          this.codeFeedback.push(`⚠️ Execution Error: ${error.message}. (Note: Pure TS/Angular syntax requires compilation)`);
        }
      } finally {
        console.log = originalLog; // Restore the normal browser console
      }

      // =========================================
      // ENGINE 2: DYNAMIC PATTERN RECOGNITION
      // =========================================
      if (refactored.includes('any')) {
        this.codeFeedback.push("⚠️ Anti-Pattern: Removed 'any'. Using strict typing prevents runtime crashes.");
        refactored = refactored.replace(/: \s*any/g, ': unknown /* Define Interface */');
        foundIssues = true;
      }
      if (refactored.split('subscribe').length > 2) {
        this.codeFeedback.push("🚨 Memory Leak Risk: Nested subscriptions detected. Flattened using switchMap.");
        foundIssues = true;
      }
      if (refactored.includes('setTimeout')) {
        this.codeFeedback.push("💡 Angular Tip: Replaced 'setTimeout' with RxJS 'timer' for better Zone.js stability.");
        refactored = refactored.replace(/setTimeout\(\(\)\s*=>\s*\{/g, "timer(1000).subscribe(() => {");
        foundIssues = true;
      }
      if (refactored.includes('var ')) {
         this.codeFeedback.push("👴 Legacy Code: Replaced 'var' with 'let' or 'const' for proper block scoping.");
         refactored = refactored.replace(/var /g, "let ");
         foundIssues = true;
      }

      if (!foundIssues && consoleOutput.length === 0) {
        this.codeFeedback.push("✅ Clean Code! No major anti-patterns detected.");
      }

      this.refactoredCode = foundIssues ? refactored : code;
      this.isReviewingCode = false;
      this.cdr.detectChanges();
    }, 400); // 400ms makes it feel blazing fast!
  }

  // =========================================
  // --- JARVIS CONTEXTUAL MEMORY UPDATE ---
  // =========================================
  lastTopic: string = ''; // Memory variable

  analyzeAndRespond(query: string) {
    this.isTyping = false;
    let bestMatch = { score: 0, answer: "", category: "General" };
    const cleanQuery = query.toLowerCase().replace(/[^\w\s]/gi, '');
    const userWords = cleanQuery.split(' '); 

    // --- CONTEXTUAL MEMORY CHECK ---
    if (this.lastTopic === 'Experience' && (query.includes('there') || query.includes('what') || query.includes('build'))) {
       bestMatch.score = 10;
       bestMatch.answer = "At TCS and vConnect, I focused on enterprise dashboards, secure ERP SaaS solutions, and scalable cloud APIs!";
    } else {
      // Standard matching
      for (const entry of this.knowledgeBase) {
        let currentScore = 0;
        for (const word of userWords) {
          if (word.length < 2) continue; 
          if (entry.keywords.includes(word)) currentScore += entry.weight;
        }
        if (currentScore > bestMatch.score) {
          bestMatch.score = currentScore;
          bestMatch.answer = entry.answer;
          bestMatch.category = entry.category;
        }
      }
    }

    if (bestMatch.score > 0) {
      this.lastTopic = bestMatch.category; // Save to memory!
      this.chatMessages.push({ role: 'ai', text: bestMatch.answer });
    } else {
      this.chatMessages.push({ role: 'ai', text: `I didn't quite catch that. Try asking about Vipin's 'skills', 'experience', or 'projects'.` });
    }
    
    this.cdr.detectChanges(); 
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatBody = document.getElementById('chat-body');
      if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    }, 100);
  }

  isListening: boolean = false;
  recognition: any;

  startVoiceInput(inputEl: HTMLInputElement) {
    if (this.isListening) { this.recognition?.stop(); return; }
    const SpeechRecognitionApi = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionApi) { alert("Voice recognition unsupported."); return; }
    this.recognition = new SpeechRecognitionApi();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.onstart = () => { this.isListening = true; inputEl.placeholder = "Listening..."; this.cdr.detectChanges(); };
    this.recognition.onresult = (event: any) => { inputEl.value = event.results[0][0].transcript; };
    this.recognition.onend = () => {
      this.isListening = false;
      inputEl.placeholder = "Ask about my skills...";
      this.cdr.detectChanges();
      if (inputEl.value.trim().length > 0) this.sendMessage(inputEl);
    };
    this.recognition.onerror = () => { this.isListening = false; inputEl.placeholder = "Ask about my skills..."; this.cdr.detectChanges(); };
    this.recognition.start();
  }

  // =========================================
  // --- LIVE THEME CUSTOMIZER ---
  // =========================================
  isSettingsOpen: boolean = false;

  themes = [
    { name: 'Cyber Teal', color: '#2DD4BF', primary: '#2DD4BF', dark: '#14b8a6', darker: '#0d9488', secondary: '#60A5FA', rgb: '45, 212, 191' },
    { name: 'Electric Blue', color: '#3b82f6', primary: '#3b82f6', dark: '#2563eb', darker: '#1d4ed8', secondary: '#8b5cf6', rgb: '59, 130, 246' },
    { name: 'Amethyst', color: '#c084fc', primary: '#c084fc', dark: '#a855f7', darker: '#9333ea', secondary: '#f472b6', rgb: '192, 132, 252' },
    { name: 'Neon Fuchsia', color: '#d946ef', primary: '#d946ef', dark: '#c026d3', darker: '#a21caf', secondary: '#3b82f6', rgb: '217, 70, 239' },
    { name: 'Crimson Red', color: '#ef4444', primary: '#ef4444', dark: '#dc2626', darker: '#b91c1c', secondary: '#f59e0b', rgb: '239, 68, 68' },
    { name: 'Blaze Orange', color: '#fb923c', primary: '#fb923c', dark: '#f97316', darker: '#ea580c', secondary: '#f43f5e', rgb: '251, 146, 60' },
    { name: 'Cyber Gold', color: '#eab308', primary: '#eab308', dark: '#ca8a04', darker: '#a16207', secondary: '#ef4444', rgb: '234, 179, 8' },
    { name: 'Toxic Green', color: '#84cc16', primary: '#84cc16', dark: '#65a30d', darker: '#4d7c0f', secondary: '#14b8a6', rgb: '132, 204, 22' }
  ];

  backgrounds = [
    { name: 'Midnight Slate', main: '#0f172a', secondary: '#1e293b', top: '#111827', hero: '#0b1120', mainRgb: '15, 23, 42', secRgb: '30, 41, 59' },
    { name: 'Pitch Black', main: '#000000', secondary: '#111111', top: '#0a0a0a', hero: '#050505', mainRgb: '0, 0, 0', secRgb: '17, 17, 17' },
    { name: 'Deep Navy', main: '#060e1c', secondary: '#121d33', top: '#09142b', hero: '#040a14', mainRgb: '6, 14, 28', secRgb: '18, 29, 51' },
    { name: 'Matte Charcoal', main: '#171717', secondary: '#262626', top: '#1c1c1c', hero: '#121212', mainRgb: '23, 23, 23', secRgb: '38, 38, 38' },
    { name: 'Dark Ruby', main: '#1a0b0e', secondary: '#2a1217', top: '#14080a', hero: '#0d0405', mainRgb: '26, 11, 14', secRgb: '42, 18, 23' },
    { name: 'Deep Forest', main: '#0a1411', secondary: '#12241f', top: '#0c1a16', hero: '#060d0b', mainRgb: '10, 20, 17', secRgb: '18, 36, 31' }
  ];

  fonts = [
    { name: 'Modern (Inter)', family: "'Inter', system-ui, sans-serif" },
    { name: 'Geometric (Poppins)', family: "'Poppins', 'Montserrat', sans-serif" },
    { name: 'Brutal (Grotesk)', family: "'Space Grotesk', 'Helvetica Neue', sans-serif" },
    { name: 'Hacker (JetBrains)', family: "'JetBrains Mono', 'Consolas', monospace" },
    { name: 'Terminal (Code)', family: "'Fira Code', 'Courier New', monospace" },
    { name: 'Elegant (Serif)', family: "'Playfair Display', Georgia, serif" }
  ];

  toggleSettings() { this.isSettingsOpen = !this.isSettingsOpen; }

  changeTheme(theme: any) {
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--primary-dark', theme.dark);
    document.documentElement.style.setProperty('--primary-darker', theme.darker);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    document.documentElement.style.setProperty('--primary-rgb', theme.rgb);
  }

  onCustomColorChange(event: any) {
    const hex = event.target.value;
    const r = parseInt(hex.slice(1, 3), 16); const g = parseInt(hex.slice(3, 5), 16); const b = parseInt(hex.slice(5, 7), 16);
    const rgbString = `${r}, ${g}, ${b}`;
    const darkR = Math.floor(r * 0.8); const darkG = Math.floor(g * 0.8); const darkB = Math.floor(b * 0.8);
    const darkHex = `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;
    const darkerR = Math.floor(r * 0.6); const darkerG = Math.floor(g * 0.6); const darkerB = Math.floor(b * 0.6);
    const darkerHex = `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
    const secR = Math.min(255, Math.floor(r * 1.3)); const secG = Math.min(255, Math.floor(g * 1.3)); const secB = Math.min(255, Math.floor(b * 1.3));
    const secHex = `#${secR.toString(16).padStart(2, '0')}${secG.toString(16).padStart(2, '0')}${secB.toString(16).padStart(2, '0')}`;

    document.documentElement.style.setProperty('--primary', hex);
    document.documentElement.style.setProperty('--primary-dark', darkHex);
    document.documentElement.style.setProperty('--primary-darker', darkerHex);
    document.documentElement.style.setProperty('--secondary', secHex);
    document.documentElement.style.setProperty('--primary-rgb', rgbString);
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

  onCustomBgChange(event: any) {
    const hex = event.target.value; 
    const r = parseInt(hex.slice(1, 3), 16); const g = parseInt(hex.slice(3, 5), 16); const b = parseInt(hex.slice(5, 7), 16);
    const mainRgb = `${r}, ${g}, ${b}`;
    const secR = Math.min(255, r + 15); const secG = Math.min(255, g + 15); const secB = Math.min(255, b + 15);
    const secHex = `#${secR.toString(16).padStart(2, '0')}${secG.toString(16).padStart(2, '0')}${secB.toString(16).padStart(2, '0')}`;
    const topR = Math.min(255, r + 5); const topG = Math.min(255, g + 5); const topB = Math.min(255, b + 5);
    const topHex = `#${topR.toString(16).padStart(2, '0')}${topG.toString(16).padStart(2, '0')}${topB.toString(16).padStart(2, '0')}`;
    const heroR = Math.max(0, r - 5); const heroG = Math.max(0, g - 5); const heroB = Math.max(0, b - 5);
    const heroHex = `#${heroR.toString(16).padStart(2, '0')}${heroG.toString(16).padStart(2, '0')}${heroB.toString(16).padStart(2, '0')}`;

    document.documentElement.style.setProperty('--bg-main', hex);
    document.documentElement.style.setProperty('--bg-secondary', secHex);
    document.documentElement.style.setProperty('--bg-sidebar-top', topHex);
    document.documentElement.style.setProperty('--bg-hero', heroHex);
    document.documentElement.style.setProperty('--bg-main-rgb', mainRgb);
    document.documentElement.style.setProperty('--bg-secondary-rgb', `${secR}, ${secG}, ${secB}`);
    this.applyContrast(hex);
  }

  applyContrast(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (r * 299 + g * 587 + b * 114) / 1000;
    if (luminance > 150) {
      document.documentElement.style.setProperty('--text-main', '#0f172a');
      document.documentElement.style.setProperty('--text-muted', '#475569');
      document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.15)');
    } else {
      document.documentElement.style.setProperty('--text-main', '#f8fafc');
      document.documentElement.style.setProperty('--text-muted', '#94a3b8');
      document.documentElement.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
    }
  }

  changeFont(font: any) { document.documentElement.style.setProperty('--font-main', font.family); }

  // =========================================
  // --- "CTO" ARCHITECTURE SIMULATOR ---
  // =========================================
  isGeneratingArch: boolean = false;
  activeArchitecture: any = null;

  architectures = {
    saas: {
      title: "Enterprise SaaS Architecture",
      frontend: "Angular (Signals + RxJS)",
      gateway: ".NET API Gateway",
      backend: "C# Microservices",
      database: "SQL Server (Multi-Tenant)",
      desc: "Highly scalable, secure architecture perfect for B2B SaaS platforms."
    },
    realtime: {
      title: "Real-Time Dashboard Architecture",
      frontend: "Angular (WebSockets)",
      gateway: "Node.js Server",
      backend: "Redis + Express",
      database: "MongoDB / MySQL",
      desc: "Low-latency architecture optimized for live data streams and fast UI updates."
    },
    ecommerce: {
      title: "E-Commerce / Retail Architecture",
      frontend: "Angular (SSR)",
      gateway: "Payment Gateway API",
      backend: ".NET Core (Orders)",
      database: "SQL Server + Redis",
      desc: "High-availability system designed for transactional security and fast load times."
    }
  };

  generateArchitecture(input: string) {
    if (!input || !input.trim()) return;
    
    this.isGeneratingArch = true;
    this.activeArchitecture = null;
    this.cdr.detectChanges(); // Show scanning animation

    setTimeout(() => {
      const query = input.toLowerCase();
      
      // Basic NLP routing to determine the best tech stack
      if (query.includes('real') || query.includes('live') || query.includes('dash') || query.includes('fast')) {
        this.activeArchitecture = this.architectures.realtime;
      } else if (query.includes('shop') || query.includes('buy') || query.includes('store') || query.includes('commerce')) {
        this.activeArchitecture = this.architectures.ecommerce;
      } else {
        this.activeArchitecture = this.architectures.saas; // Default B2B SaaS fallback
      }
      
      this.isGeneratingArch = false;
      this.cdr.detectChanges(); // Render the SVG diagram
      
      // Auto-scroll down to the generated diagram
      setTimeout(() => {
        const canvas = document.getElementById('arch-canvas-display');
        if (canvas) canvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      
    }, 1500); // 1.5 second "Processing" simulation
  }

  // =========================================
  // --- GENERATIVE UI BUILDER (v0 Flex) ---
  // =========================================
  isGeneratingUI: boolean = false;
  generatedComponent: string = ''; 
  generatedCodeString: string = '';

  generateUI(prompt: string) {
    if (!prompt || !prompt.trim()) return;
    
    this.isGeneratingUI = true;
    this.generatedComponent = '';
    this.cdr.detectChanges(); // Trigger scanning animation

    setTimeout(() => {
      const query = prompt.toLowerCase();
      
      // NLP Routing: Decide which component to build based on their words
      if (query.includes('price') || query.includes('tier') || query.includes('subscription')) {
        this.generatedComponent = 'pricing';
        this.generatedCodeString = `<div class="ai-pricing-card">\n  <h3>Pro Plan</h3>\n  <div class="price">$29<span>/mo</span></div>\n  <ul>\n    <li>✓ Unlimited Projects</li>\n    <li>✓ Advanced Analytics</li>\n    <li>✓ 24/7 Support</li>\n  </ul>\n  <button>Upgrade Now</button>\n</div>`;
      } else if (query.includes('log') || query.includes('sign') || query.includes('auth')) {
        this.generatedComponent = 'login';
        this.generatedCodeString = `<div class="ai-login-form">\n  <h3>Welcome Back</h3>\n  <input type="email" placeholder="Email Address" />\n  <input type="password" placeholder="Password" />\n  <button>Sign In</button>\n  <p>Forgot password?</p>\n</div>`;
      } else {
        // Default to a Dashboard Widget if they ask for something else
        this.generatedComponent = 'dashboard';
        this.generatedCodeString = `<div class="ai-stat-card">\n  <div class="stat-header">\n    Total Revenue\n  </div>\n  <div class="stat-value">$45,231.89</div>\n  <div class="stat-trend positive">\n    ↑ +20.1% from last month\n  </div>\n</div>`;
      }
      
      this.isGeneratingUI = false;
      this.cdr.detectChanges();

      // Auto-scroll to the newly rendered UI
      setTimeout(() => {
        const preview = document.getElementById('ui-preview-window');
        if (preview) preview.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

    }, 100); // Simulate AI compiling time
  }
  sendWhatsApp(name: string, message: string) {
    // Replace with your actual country code and phone number (no plus sign)
    const phoneNumber = '918800604503'; 
    
    // Format the message with line breaks
    const rawText = `Hello Vipin!\n\nName/Company: ${name}\nMessage: ${message}`;
    
    // encodeURIComponent ensures spaces and line breaks transfer perfectly to WhatsApp
    const encodedText = encodeURIComponent(rawText);
    
    // Open WhatsApp in a new tab
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  }

  // =========================================
  // --- NEURAL KNOWLEDGE GRAPH (CANVAS) ---
  // =========================================
  @ViewChild('skillsCanvas') skillsCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: any;
  private particles: any[] = [];
  private mouse = { x: -1000, y: -1000, radius: 150 };

  ngAfterViewInit() {
    this.initNeuralGraph();
  }

  initNeuralGraph() {
    if (!this.skillsCanvas) return;
    const canvas = this.skillsCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Set Canvas Dimensions
    canvas.width = canvas.parentElement?.clientWidth || 1000;
    canvas.height = 500;

    // Create Particles from Skills Array
    this.particles = this.skills.map(skill => {
      const img = new Image();
      img.src = skill.icon;
      return {
        ...skill,
        x: Math.random() * (canvas.width - 60) + 30,
        y: Math.random() * (canvas.height - 60) + 30,
        vx: (Math.random() - 0.5) * 1.5, // Velocity X
        vy: (Math.random() - 0.5) * 1.5, // Velocity Y
        radius: 25,
        imgObj: img
      };
    });

    this.animateGraph();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.skillsCanvas) {
      this.skillsCanvas.nativeElement.width = this.skillsCanvas.nativeElement.parentElement?.clientWidth || 1000;
    }
  }

  onCanvasMouseMove(event: MouseEvent) {
    const rect = this.skillsCanvas.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
  }

  onCanvasMouseLeave() {
    this.mouse.x = -1000; // Move mouse out of bounds
    this.mouse.y = -1000;
  }

  animateGraph() {
    const canvas = this.skillsCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Update and Draw Particles
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];

      // Mouse Collision (Repel Effect)
      let dx = this.mouse.x - p.x;
      let dy = this.mouse.y - p.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.mouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        // Reduced the force multiplier from 5 to 3 so they don't fly quite as violently
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        p.x -= forceDirectionX * force * 3;
        p.y -= forceDirectionY * force * 3;
      }

      // Move particle based on natural velocity
      p.x += p.vx;
      p.y += p.vy;

      // ==========================================
      // THE FIX: STRICT BOUNDARY CLAMPING
      // ==========================================
      if (p.x + p.radius > canvas.width) {
        p.x = canvas.width - p.radius; // Force it back inside the right wall
        p.vx *= -1;                    // Reverse direction
      } else if (p.x - p.radius < 0) {
        p.x = p.radius;                // Force it back inside the left wall
        p.vx *= -1;
      }

      if (p.y + p.radius > canvas.height) {
        p.y = canvas.height - p.radius; // Force it back inside the bottom wall
        p.vy *= -1;
      } else if (p.y - p.radius < 0) {
        p.y = p.radius;                 // Force it back inside the top wall
        p.vy *= -1;
      }
      // ==========================================

      // Draw Neural Links (Lines between close nodes)
      for (let j = i; j < this.particles.length; j++) {
        let p2 = this.particles[j];
        let ddx = p.x - p2.x;
        let ddy = p.y - p2.y;
        let dist = Math.sqrt(ddx * ddx + ddy * ddy);

        if (dist < 180) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(45, 212, 191, ${1 - dist / 180})`; // Fades out over distance
          this.ctx.lineWidth = 1.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }

      // Draw Node Outer Glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius + 4, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      this.ctx.fill();
      this.ctx.strokeStyle = p.color;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Draw Icon Image
      if (p.imgObj.complete && p.imgObj.naturalHeight !== 0) {
        this.ctx.drawImage(p.imgObj, p.x - 15, p.y - 15, 30, 30);
      }

      // Draw Text Label
      this.ctx.font = '600 11px Inter, sans-serif';
      this.ctx.fillStyle = '#f8fafc';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(p.name, p.x, p.y + p.radius + 18);
    }

    this.animationFrameId = requestAnimationFrame(() => this.animateGraph());
  }
  // =========================================
  // --- ATS MATCHER & PROPOSAL GENERATOR ---
  // =========================================
  isAnalyzingJD: boolean = false;
  atsScore: number = 0;
  matchedKeywords: string[] = [];
  customProposal: string = '';

  analyzeJobDescription(jd: string) {
    if (!jd || jd.trim().length < 10) return;
    
    this.isAnalyzingJD = true;
    this.atsScore = 0;
    this.matchedKeywords = [];
    this.customProposal = '';
    this.cdr.detectChanges();

    setTimeout(() => {
      const lowerJd = jd.toLowerCase();
      // Master list of your skills to check against the JD
      const coreSkills = ['angular', 'typescript', 'javascript', 'c#', '.net', 'sql', 'mysql', 'aws', 'node', 'rxjs', 'html', 'css', 'bootstrap', 'git', 'api', 'saas', 'erp', 'microservices'];
      
      // Find matches
      this.matchedKeywords = coreSkills.filter(skill => lowerJd.includes(skill));
      
      // Calculate a realistic ATS score (Base 45 + 5 points per match, max 98%)
      let baseScore = 45; 
      let additional = this.matchedKeywords.length * 6;
      this.atsScore = Math.min(baseScore + additional, 98);

      // Generate a dynamic Proposal/Cover Letter
      if (this.matchedKeywords.length > 0) {
        // Grab the top 3 matched skills
        const topSkills = this.matchedKeywords.slice(0, 3).map(s => s.toUpperCase()).join(', ');
        this.customProposal = `Hi Hiring Team,\n\nI noticed your requirement for ${topSkills}. With over 4 years of experience building enterprise-level applications—particularly in Cloud ERP and SaaS environments—I am highly equipped to deliver scalable solutions for your stack.\n\nMy background bridging robust backend logic (.NET/SQL) with high-performance frontend interfaces (Angular/RxJS) aligns perfectly with this role.\n\nLet's connect to discuss how I can accelerate your engineering goals.\n\nBest,\nVipin Yadav`;
      } else {
        this.customProposal = `Hi Hiring Team,\n\nWhile this specific Job Description doesn't perfectly match my standard keywords, my 4+ years of Full Stack engineering have trained me to be highly adaptable. I specialize in enterprise architecture, rapid problem-solving, and quickly scaling new technologies to meet business needs.\n\nLet's chat about how my fundamentals in system design can add value to your team.\n\nBest,\nVipin Yadav`;
      }

      this.isAnalyzingJD = false;
      this.cdr.detectChanges();
      
      // Auto-scroll to results
      setTimeout(() => {
        const resultCard = document.getElementById('ats-result');
        if (resultCard) resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

    }, 2000); // 2-second deep scanning simulation
  }
}