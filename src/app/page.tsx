// src/app/page.tsx

'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [navOpen, setNavOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Add initial terminal output on page load
  useEffect(() => {
    setOutput([
      "Initializing terminal...",
      "Welcome to ~/my-portfolio!",
      "Type 'help' to see available commands.",
    ]);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (command === "ls") {
      setOutput((prev) => [...prev, "projects  resume.pdf"]);
    } else if (command === "cat resume.pdf") {
      setOutput((prev) => [...prev, "Opening resume..."]);
      window.open("/resume.pdf", "_blank");
    } else if (command === "ls projects") {
      setOutput((prev) => [
        ...prev,
        "Project 1: E-Commerce Web Application",
        "Project 2: Portfolio Website",
        "Project 3: AI Resume Optimizer (Still Cooking)",
      ]);
    } else if(command =="cat projects -E-Commerce Web Application"){
      // open the github link of the project
      setOutput((prev) => [...prev, "Opening E-Commerce Web Application GitHub repository..."]);
      window.open("https://github.com/AmanShaikh7/Amazon_Mart", "_blank");

    } else if(command =="cat projects -Portfolio Website"){
      // open the github link of the project
      setOutput((prev) => [...prev, "Opening Portfolio Website GitHub repository..."]);
      window.open("https://github.com/AmanShaikh7/My-Portfolio/");
    }
    else if(command =="cat projects -AI Resume Optimizer"){
      // open the github link of the project
      setOutput((prev) => [...prev, "This project is still cooking!!!"]);

    } else if (command === "clear") {
      setOutput([]);
    } else if (command === "contact") {
      setOutput((prev) => [
        ...prev,
        "Contact Me:",
        "Email: amanshaikh5595@google.com",
        "LinkedIn: https://www.linkedin.com/in/aman-shaikh7/",
        "GitHub: https://github.com/AmanShaikh7",
      ]);
    } else if (command === "exit") {
      setOutput((prev) => [...prev, "Goodbye! Have a great day!"]);
      setTimeout(() => setOutput([]), 2000);
    }else if (command === "help") {
      setOutput((prev) => [
        ...prev,
        "Available commands:",
        "******************",
        "ls - List files",
        "cat [file] - View file content",
        "clear - Clear the terminal",
        "contact - Show contact information",
        "ls projects - List projects",
        "cat projects -E-Commerce Web Application - View E-Commerce Web Application project - redirected to github if project not hosted",
        "cat projects -Portfolio Website - View Portfolio Website project - redirected to github if project not hosted",
        "cat projects -AI Resume Optimizer - View AI Resume Optimizer project",
        "exit - Exit the terminal",
        "help - Show this help message",
      ]);
    } else {
      setOutput((prev) => [...prev, `Command not found: ${command}`]);
    }
    setCommand("");
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { name, email, message };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-6">
      {/* Header Section */}
      <motion.div
        id="about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-left">
          <pre className="text-green-300 text-lg">
            {`Welcome to `}
            <span className="text-green-500">~/my-portfolio</span>
            {`!`}
            <span className="blinking-cursor">|</span>
          </pre>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4">
            Hello, I am <span className="text-green-500">Aman Shaikh</span>
          </h1>
          <p className="text-lg md:text-xl text-green-200 mt-2 text-center">
        Software Engineer • AI Enthusiast • Lifelong Learner
      </p>
        </div>
      </motion.div>
      {/* Floating Navigation Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="bg-green-500 text-black px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
        >
          {navOpen ? "Close Menu" : "Menu"}
        </button>
        {navOpen && (
          <div className="absolute bottom-16 right-0 bg-gray-900 text-gray-300 p-4 rounded-lg shadow-md">
            <a href="#about" className="block hover:text-green-400 transition-colors">About</a>
            <a href="#projects" className="block hover:text-green-400 transition-colors">Projects</a>
            <a href="#skills" className="block hover:text-green-400 transition-colors">Skills</a>
            <a href="#experience" className="block hover:text-green-400 transition-colors">Experience</a>
            <a href="#contact" className="block hover:text-green-400 transition-colors">Contact</a>
          </div>
        )}
      </div>
    
      {/* Fake Terminal */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 bg-gray-900 p-4 rounded-lg shadow-lg border border-green-500"
      >
        <div className="terminal-output text-green-300">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <form onSubmit={handleCommand} className="mt-4">
          <span className="text-green-500">~/my-portfolio $</span>{" "}
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="bg-black text-green-400 border-none outline-none w-3/4"
            autoFocus
          />
        </form>
      </motion.section>
      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-teal-400 text-center mb-8">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-teal-400 transition-shadow">
            <h3 className="text-2xl font-bold text-teal-400 mb-4">🛒 E-Commerce Web Application</h3>
            <p className="text-gray-300">
              A full-featured e-commerce backend application developed using Spring Boot and Java, designed to deliver a seamless shopping experience for users and a scalable platform for managing products and orders.
            </p>
            
            <h4 className="text-teal-400 font-semibold mt-4">🔑 Key Features:</h4>
            <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
              <li><span className="font-semibold text-gray-300">User Management:</span> Secure APIs for user registration, login, and profile management.</li>
              <li><span className="font-semibold text-gray-300">Product Listings:</span> Dynamic product catalog with CRUD operations.</li>
              <li><span className="font-semibold text-gray-300">Order Processing:</span> End-to-end workflow including cart management and checkout.</li>
              <li><span className="font-semibold text-gray-300">Real-time Email Notifications:</span> Automated email system for order updates.</li>
              <li><span className="font-semibold text-gray-300">Database Optimization:</span> JPA with Hibernate for efficient data access and MySQL as the backend.</li>
              <li><span className="font-semibold text-gray-300">API Documentation:</span> Integrated Swagger for interactive API documentation.</li>
              <li><span className="font-semibold text-gray-300">Team Collaboration:</span> Worked in a team environment to meet deadlines and maintain code quality.</li>
            </ul>

            <p className="text-gray-300 mt-4">
              This project strengthened my understanding of backend development and enhanced my skills in building scalable, maintainable APIs.
            </p>

            <p className="text-sm text-gray-500 mt-4">Technologies: Spring Boot, Java, Hibernate, MySQL</p>
            <a
              href="https://github.com/AmanShaikh7/Amazon_Mart"
              target="_blank"
              className="text-teal-400 hover:underline mt-4 inline-block"
            >
              View on GitHub
            </a>
          </div>

          {/* Project 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-teal-400 transition-shadow">
            <h3 className="text-2xl font-bold text-teal-400 mb-4">🌐 Personal Portfolio Website</h3>
            <p className="text-gray-300">
              A modern and interactive personal portfolio website designed to showcase my skills, projects, and professional experience. Built with a focus on responsive design, smooth animations, and user-friendly navigation.
            </p>
            
            <h4 className="text-teal-400 font-semibold mt-4">🔑 Key Features:</h4>
            <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
              <li><span className="font-semibold text-gray-300">Interactive Terminal:</span> A unique terminal interface for user interaction.</li>
              <li><span className="font-semibold text-gray-300">Responsive Design:</span> Fully optimized for desktop, tablet, and mobile devices.</li>
              <li><span className="font-semibold text-gray-300">Smooth Animations:</span> Leveraging Framer Motion for seamless transitions and animations.</li>
              <li><span className="font-semibold text-gray-300">Dynamic Sections:</span> Includes sections for About, Projects, Skills, Experience, and Contact.</li>
              <li><span className="font-semibold text-gray-300">Tailwind CSS:</span> Utilized for rapid styling and consistent design.</li>
              <li><span className="font-semibold text-gray-300">GitHub Integration:</span> Links to GitHub repositories for easy access to project source code.</li>
            </ul>

            <p className="text-gray-300 mt-4">
              This project demonstrates my ability to design and develop visually appealing and functional web applications while maintaining clean and maintainable code.
            </p>

            <p className="text-sm text-gray-500 mt-4">Technologies: React, Next.js, Tailwind CSS, Framer Motion</p>
            <a
              href="https://github.com/AmanShaikh7/My-Portfolio/"
              target="_blank"
              className="text-teal-400 hover:underline mt-4 inline-block"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </motion.section>
      {/* Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-6">Skills</h2>
        <p className="text-green-300 mb-4">
          Here are some of the technologies and tools I work with:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md border border-green-500 hover:shadow-green-500 transition-shadow">
            <p className="text-lg font-semibold text-green-300">Java</p>
          </div>
          <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md border border-green-500 hover:shadow-green-500 transition-shadow">
            <p className="text-lg font-semibold text-green-300">Spring Boot</p>
          </div>
          <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md border border-green-500 hover:shadow-green-500 transition-shadow">
            <p className="text-lg font-semibold text-green-300"> Gen AI</p>
          </div>
          <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md border border-green-500 hover:shadow-yellow-500 transition-shadow">
            <p className="text-lg font-semibold text-green-300">AWS</p>
          </div>
          <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md border border-green-500 hover:shadow-green-500 transition-shadow">
            <p className="text-lg font-semibold text-green-300">Docker</p>
          </div>
          <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md border border-green-500 hover:shadow-green-500 transition-shadow">
            <p className="text-lg font-semibold text-green-300">Python</p>
          </div>
          <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md border border-green-500 hover:shadow-green-500 transition-shadow">
            <p className="text-lg font-semibold text-green-300">CICD Pipelines</p>
          </div>
          <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md border border-green-500 hover:shadow-green-500 transition-shadow">
            <p className="text-lg font-semibold text-green-300">Next.js</p>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-teal-400 text-center mb-6">
          Experience
        </h2>
        <div className="space-y-6">
          {/* Job 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-teal-400 transition-shadow">
            <h3 className="text-xl font-semibold text-gray-100">Software Engineer</h3>
            <p className="text-gray-400">Siemens Digital Industries Software</p>
            <p className="text-sm text-gray-500">Aug 2023 – Present</p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li>Designed and Built a <b>Python automation framework</b> for end-to-end testing using Selenium for web automation and Pywinauto for desktop application automation</li>
              <li>Worked on entire <b>CI/CD pipelines</b> with GitLab CI/CD</li>
              <li>Deployed scalable AWS solutions using <b>EC2, S3, RDS, and CloudFormation</b> for enterprise applications.</li>
              <li>Wrote a <b>Python script</b> to optimize the size of EC2, RDS, and EBS resources, significantly reducing cloud costs.</li>
              <li>Automated cloud resource provisioning with <b>Ansible</b>, <b>gitlab CI/CD</b> and <b>Terraform</b></li>
            </ul>
          </div>
        </div>
      </motion.section>
      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-6">Contact Me</h2>
        <p className="text-gray-300 mb-4">
          Feel free to reach out to me for collaborations or just to say hi!
        </p>
        <form className="space-y-4" onSubmit={handleContactSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
        <div className="mt-6">
          <a
            href="https://www.linkedin.com/in/aman-shaikh7/"
            target="_blank"
            className="text-green-400 hover:underline mx-2"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/AmanShaikh7"
            target="_blank"
            className="text-green-400 hover:underline mx-2"
          >
            GitHub
          </a>
        </div>
      </motion.section>
    </main>
  );
}
