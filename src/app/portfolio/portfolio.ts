import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class PortfolioComponent {
  @Output() backToLogin = new EventEmitter<void>();

  activeSection: string = 'about';

  scrollToSection(sectionId: string) {
    this.activeSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onBackClick() {
    this.backToLogin.emit();
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

  // Official brand SVGs and Hex Colors for hover glowing effects
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
}