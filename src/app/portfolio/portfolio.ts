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

  // Tracks which section is currently active for the blue highlight
  activeSection: string = 'about';

  // Smooth scroll function
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
    github: 'github.com/vipinyadav',
    linkedin: 'linkedin.com/in/vipinyadav'
  };

  about = {
    title: 'Get to know a little about me',
    description1: 'Results-driven Full Stack Developer with 4+ years of experience specializing in Angular, ASP.NET, and SQL-based applications. Experienced in developing and maintaining cloud-based ERP (SaaS) platforms, building scalable enterprise solutions, and designing secure RESTful APIs.',
    description2: 'With a strong background in frontend development, backend integration, and database management, I am passionate about writing clean, optimized, and maintainable code for production environments. I also hold an IT Career Fundamentals certification from Charles Sturt University, Australia.'
  };

  // Upgraded Skills Array (Added JS, Bootstrap, SQL Server, AWS, DevOps)
  skills = [
    { name: 'Angular', iconType: 'box', iconText: 'A', boxColor: '#DD0031', lineColor: '#C3002F' },
    { name: 'TypeScript', iconType: 'text', iconText: 'TS', textColor: '#E2E8F0', lineColor: '#3178C6' },
    { name: 'JavaScript', iconType: 'box', iconText: 'JS', boxColor: '#F7DF1E', textColor: '#000000', lineColor: '#D4B800' },
    { name: 'ASP.NET Core', iconType: 'text', iconText: 'C#', textColor: '#A78BFA', lineColor: '#8B5CF6' },
    { name: 'Node.js', iconType: 'box', iconText: 'N', boxColor: '#4ADE80', lineColor: '#22C55E' },
    { name: 'SQL Server', iconType: 'emoji', iconText: '🗄️', lineColor: '#EF4444' },
    { name: 'MySQL', iconType: 'emoji', iconText: '🐬', lineColor: '#0EA5E9' },
    { name: 'HTML / CSS', iconType: 'emoji', iconText: '🎨', lineColor: '#F97316' },
    { name: 'Bootstrap', iconType: 'box', iconText: 'B', boxColor: '#7952B3', lineColor: '#563D7C' },
    { name: 'AWS & Server', iconType: 'emoji', iconText: '☁️', lineColor: '#F59E0B' },
    { name: 'Git & DevOps', iconType: 'emoji', iconText: '🐙', lineColor: '#FFFFFF' }
  ];

 // Projects mapped exactly from your resume + Your New Personal Project
  projects = [
    {
      title: 'Enterprise Tax Billing & Lab System',
      type: 'Freelance Architecture (2024)',
      description: 'A lightning-fast Angular web app replicating desktop software workflows. Features zero-mouse keyboard navigation, dynamic multi-state GST calculations, secure Nodemailer OTP auth, and pixel-perfect A4 invoice PDF generation.',
      tags: ['Angular Signals', 'Node.js', 'MySQL', 'Print Engine'],
      image: '/assets/portfolioImg/billing.png'
    },
    {
      title: 'Cloud-Based ERP (SaaS)',
      type: '',
      description: 'Developed a cloud-based ERP application serving finance, HR, inventory, and operations modules. Designed robust RESTful APIs using ASP.NET and optimized SQL databases for secure, multi-tenant enterprise clients.',
      tags: ['Angular', 'ASP.NET', 'SQL Server', 'RESTful APIs'],
      image: '/assets/portfolioImg/mmsoft.png' 
    },
    {
      title: 'Car Rental Service',
      type: 'vConnect Systems (2020 - 2022)',
      description: 'Engineered a dynamic web service for renting cars, complete with a secure admin panel and payment gateway integration to drive business growth.',
      tags: ['Angular', 'TypeScript', 'Bootstrap', 'APIs'],
      image: ''
    },
    {
      title: 'Construction Web-App',
      type: 'vConnect Systems (2020 - 2022)',
      description: 'Developed an innovative admin panel for the construction industry, delivering a highly user-friendly UI and comprehensive bug resolution.',
      tags: ['Angular', 'Django', 'MongoDB', 'Bootstrap'],
      image: ''
    },
    {
      title: 'Loan Consultancy Platform',
      type: 'vConnect Systems (2020 - 2022)',
      description: 'Built a user-friendly web application designed to seamlessly connect loan providers with clients.',
      tags: ['Angular', 'HTML/CSS', 'Bootstrap'],
      image: ''
    },
    {
      title: 'Business Transformation',
      type: 'Tata Consultancy Services (2023)',
      description: 'Delivered critical contributions to IT services and spearheaded business transformation solutions to enhance operational efficiency and client satisfaction.',
      tags: ['System Engineering', 'IT Services'],
      image: ''
    }
  ];

  onBackClick() {
    this.backToLogin.emit();
  }
}