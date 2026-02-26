import ShaderBG from "./components/ShaderBG";
import "./index.css";
import CoffeeViewer from "./components/CoffeeViewer";
import ProjectAutohaus from "./components/ProjectAutohaus"; 
import AnimatedSection from "./components/AnimatedSection";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroShader from "./components/IntroShader";

export default function App() {

const [showIntro, setShowIntro] = useState(true);

const skipIntro = useCallback(() => {
  setShowIntro(false);
  document.body.style.overflow = "auto";
}, []);

useEffect(() => {
  document.body.style.overflow = "hidden";

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === " " || e.key === "Enter") skipIntro();
  };
  window.addEventListener("keydown", onKey);

  const timer = window.setTimeout(skipIntro, 3200); // Dauer (3.2s)

  return () => {
    window.removeEventListener("keydown", onKey);
    window.clearTimeout(timer);
    document.body.style.overflow = "auto";
  };
}, [skipIntro]);

  return (
    <>
 <AnimatePresence>
  {showIntro && (
    <motion.div
      key="intro"
      className="introWrapper"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      onClick={skipIntro}
    >
      <IntroShader />

      <div className="introVignette" />

      <motion.div
        className="introText"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
        }}
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Alina Wallstein
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Studentin: internationale Medieninformatik | Frontend Development | 3D-Webtechnologien | UI/UX-Konzeption
        </motion.p>

        <motion.div
          className="introHint"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 },
          }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Klick / Space zum Überspringen
        </motion.div>
      </motion.div>

      <motion.div
        className="introProgress"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 3.2, ease: "linear" }}
      />
    </motion.div>
  )}
</AnimatePresence>

      <ShaderBG />

      <main className="layout">
        <section className="hero">
                    <div className="heroContent">
            <div className="heroText">
              <h1>Alina Wallstein</h1>
              <h2>Frontend Developer & Creative Technologist</h2>
              <p>
                Studentin im Studiengang Internationale Medieninformatik an der Hochschule für Technik und Wirtschaft Berlin (HTW Berlin), mit Fokus auf moderne Frontend-Entwicklung (React), 3D-Webtechnologien und UI/UX-Konzeption.
              </p>
            </div>

            <div className="heroImage">
              <img 
                src="/public/profil.png" 
                alt="Portrait von Alina Wallstein" 
                className="profileImage"
              />
            </div>
          </div>
        </section>

       
        <section className="section">
          <h3>Akademische Leistungen – Aktuelles Semester 25/26</h3>
          <div className="card">
            <ul>
               <li>
                Vertiefte Auseinandersetzung mit Autodesk Maya 
                (Hard-Surface Modeling, Topologie, Rendering)
              </li>
              <li>
                Erfolgreicher Abschluss des Moduls Informatik 2 
                (saubere Code-Struktur, algorithmisches Denken, 
                Implementierung und Optimierung von Sortieralgorithmen)
              </li>
              <li>
                Modul Computergrafik: Shader-Programmierung, 
                Entwicklung eigener 3D-Objekte, Texturierung, 
                Transformationen und Rendering-Pipeline
              </li>
              <li>
                Entwicklung eines React + TypeScript Portfolios 
                mit Shader-Hintergrund (Three.js Integration)
              </li>
            </ul>
          </div>
        </section>
       
        <AnimatedSection className="hero"> 
          <ProjectAutohaus />
        </AnimatedSection>

        <AnimatedSection className="hero">
        <section className="section">
  <h3>3D Projekt – Kaffeemaschine (Maya)</h3>

  <div className="projectCard">
    <CoffeeViewer />

    <div className="projectContent">
      <h4>Hard-Surface Modeling in Autodesk Maya</h4>
      <p>
        Detailliertes 3D-Modell einer Kaffeemaschine mit Fokus auf saubere
        Topologie, proportionale Formgebung und präsentationsfähiges Lighting im Web.
      </p>
      <ul>
        <li>Subdivision / Edge Flow</li>
        <li>Detailmodellierung (Buttons, Gehäuse, Auslass)</li>
        <li>Web-Preview als interaktiver Viewer</li>
      </ul>
    </div>
  </div>
</section>
</AnimatedSection>
<AnimatedSection className="hero">
<section className="section">
  <h3>Studienreise – Helsinki (Finnland)</h3>

  <div className="helsinkiCard">
    <div className="helsinkiContent">
      <h4>Studienreise mit der HTW Berlin</h4>

      <p>
        Im aktuellen Semester nahm ich an einer Studienreise nach Helsinki teil. 
        Ziel war es, internationale Einblicke in digitale Innovation, 
        Designkultur und Hochschulstrukturen zu gewinnen.
      </p>

      <ul>
        <li>Austausch mit Studierenden und Lehrenden vor Ort</li>
        <li>Einblicke in nordisches Design und UX-Kultur</li>
        <li>Besuch von Universitäten und Innovationszentren</li>
      </ul>
    </div>

    <div className="helsinkiGallery">
      <img src="/helsinki1.jpg" alt="Helsinki Impression 1" />
      <img src="/helsinki2.jpg" alt="Helsinki Impression 2" />
      <img src="/helsinki3.jpg" alt="Helsinki Impression 3" />
    </div>
  </div>
</section>
</AnimatedSection>
<AnimatedSection className="hero">
<section className="section">
  <h3>Projekt – Gimme Gear (Sommersemester 2025)</h3>

  <div className="gimmeGearCard">
    <img
      src="/gimmegear.png"
      alt="Gimme Gear Logo" 
      className="gimmeGearLogo"
    />

    <div className="projectContent">
      <h4>Web-Applikation zur Verwaltung von VR-Equipment am Campus</h4>

      <p>
        Entwicklung einer webbasierten Anwendung für den Campus der HTW Berlin 
        mit dem Ziel, VR-Equipment digital verwaltbar und effizient ausleihbar 
        zu machen. Das Projekt entstand im Sommersemester 2025 im Rahmen 
        des Studiums der Internationalen Medieninformatik.
      </p>

      <ul>
        <li>Konzeption einer strukturierten Ausleih-Logik</li>
        <li>Frontend-Entwicklung mit React & TypeScript</li>
        <li>Komponentenbasierte Architektur</li>
        <li>UI/UX-Design und Prototyping</li>
        <li>Optimierung der Nutzerführung für Studierende</li>
      </ul>
    </div>
  </div>
</section>
</AnimatedSection>
        <AnimatedSection className="hero">
        <section className="section">
          <h3>Technische Kompetenzen</h3>
          <div className="grid">
            <div className="skillBox">
              <h4>Frontend</h4>
              <p>React, TypeScript, HTML5, CSS3</p>
            </div>

            <div className="skillBox">
              <h4>3D & Interactive</h4>
              <p>Three.js, WebGL, Shader Development</p>
            </div>

            <div className="skillBox">
              <h4>Programmierung</h4>
              <p>Java, JavaScript</p>
            </div>

            <div className="skillBox">
              <h4>Design</h4>
              <p>Figma, UI/UX Prototyping</p>
            </div>
          </div>
        </section>
        </AnimatedSection>

        <AnimatedSection className="hero">

        <section className="section">
          <h3>Berufliches Ziel</h3>
          <div className="card">
            <p>
              Ich suche eine Werkstudentenstelle oder ein Praktikum im Bereich
              Frontend Development oder Creative Development, um innovative
              Interfaces und performante Webanwendungen zu entwickeln.
            </p>
          </div>
        </section>

        <section className="contact">
          <p>Kontakt: alinawallstein8@gmail.com</p>
        </section>
        </AnimatedSection>
      </main>
    </>
  );
}