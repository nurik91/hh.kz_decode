'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const skills = [
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'Java' },
      { name: 'C#' },
      { name: 'PHP' },
      { name: 'Ruby' },
      { name: 'Swift' },
      { name: 'Kotlin' },
      { name: 'Go' },
      { name: 'Rust' },
      { name: 'TypeScript' },
      { name: 'SQL' },
      { name: 'NoSQL' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'React' },
      { name: 'Angular' },
      { name: 'Vue.js' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Django' },
      { name: 'Flask' },
      { name: 'Spring Boot' },
      { name: 'Laravel' },
      { name: 'Ruby on Rails' },
      { name: 'Docker' },
      { name: 'Kubernetes' },
      { name: 'AWS' },
      { name: 'Azure' },
      { name: 'Google Cloud' },
      { name: 'DevOps' },
      { name: 'CI/CD' },
      { name: 'Agile' },
      { name: 'Scrum' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'GitLab' },
      { name: 'Bitbucket' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'MongoDB' },
      { name: 'SQLite' },
      { name: 'Redis' },
      { name: 'Cassandra' },
      { name: 'GraphQL' },
      { name: 'REST API' },
      { name: 'SOAP' },
      { name: 'OAuth' },
      { name: 'JWT' },
      { name: 'TDD' },
      { name: 'BDD' },
      { name: 'Unit Testing' },
      { name: 'Integration Testing' },
      { name: 'End-to-End Testing' },
      { name: 'Mocha' },
      { name: 'Jest' },
      { name: 'Chai' },
      { name: 'Sinon' },
      { name: 'Cypress' },
      { name: 'Selenium' },
      { name: 'Jasmine' },
      { name: 'Protractor' },
      { name: 'JUnit' },
      { name: 'TestNG' },
      { name: 'Mockito' },
      { name: 'Puppeteer' },
      { name: 'Enzyme' },
      { name: 'Nightwatch' },
      { name: 'Nginx' },
      { name: 'Apache' },
      { name: 'Linux' },
      { name: 'Unix' },
      { name: 'Bash' },
      { name: 'PowerShell' },
      { name: 'Shell Scripting' },
      { name: 'Regex' },
      { name: 'Data Structures' },
      { name: 'Algorithms' },
      { name: 'Design Patterns' },
      { name: 'System Design' },
      { name: 'Microservices' },
      { name: 'Big Data' },
      { name: 'Data Analysis' },
      { name: 'Data Science' },
      { name: 'Machine Learning' },
      { name: 'Deep Learning' },
      { name: 'Artificial Intelligence' },
      { name: 'NLP' },
      { name: 'Computer Vision' },
      { name: 'Blockchain' },
      { name: 'Cybersecurity' },
      { name: 'Penetration Testing' },
      { name: 'Ethical Hacking' },
      { name: 'Cloud Computing' },
      { name: 'IoT' },
      { name: 'AR/VR' },
      { name: 'Mobile Development' },
      { name: 'React Native' },
      { name: 'Flutter' },
      { name: 'iOS Development' },
      { name: 'Android Development' },
      { name: 'UX/UI Design' },
      { name: 'Project Management' },
      { name: 'Business Analysis' },
      { name: 'Product Management' },
      { name: 'SEO' },
      { name: 'Digital Marketing' },
      { name: 'Content Creation' },
      { name: 'Copywriting' },
      { name: 'Social Media Marketing' },
      { name: 'Email Marketing' },
      { name: 'Salesforce' },
      { name: 'SAP' },
      { name: 'Oracle' },
      { name: 'ERP Systems' },
      { name: 'CRM Systems' },
      { name: 'Customer Support' },
      { name: 'Technical Support' },
      { name: 'ITIL' },
      { name: 'ITSM' },
      { name: 'Help Desk' },
      { name: 'Networking' },
      { name: 'TCP/IP' },
      { name: 'Firewalls' },
      { name: 'VPNs' },
      { name: 'Load Balancing' },
      { name: 'Wireless Networking' },
      { name: 'VoIP' },
      { name: 'Video Conferencing' },
      { name: 'Data Encryption' },
      { name: 'Backup & Recovery' },
      { name: 'Disaster Recovery' },
      { name: 'Risk Management' },
      { name: 'Compliance' },
      { name: 'GDPR' },
      { name: 'PCI DSS' },
      { name: 'ISO 27001' },
      { name: 'Lean' },
      { name: 'Six Sigma' },
      { name: 'Supply Chain Management' },
      { name: 'Logistics' },
      { name: 'Inventory Management' },
      { name: 'Warehouse Management' },
      { name: 'Procurement' },
      { name: 'Vendor Management' },
      { name: 'Contract Management' },
      { name: 'Negotiation' },
    ];

    await queryInterface.bulkInsert('Skills', skills, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Skills', null, {});
  }
};

