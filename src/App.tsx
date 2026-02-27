import "./index.css";
import ShaderBG from "./components/ShaderBG";
import CoffeeViewer from "./components/CoffeeViewer";
import ProjectAutohaus from "./components/ProjectAutohaus";
import AnimatedSection from "./components/AnimatedSection";
import IntroShader from "./components/IntroShader";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";


function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

useEffect(() => {
  const ids = ["about", "projects", "skills", "contact"] as const;

 const getActive = () => {
  // ✅ Wenn fast ganz unten: Contact aktiv
  const bottomGap = 40;
  const scrolledToBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - bottomGap;

  if (scrolledToBottom) {
    setActive("contact");
    return;
  }

  // Messpunkt etwas mittiger (stabiler)
  const probeY = window.innerHeight * 0.45;

  let current: (typeof ids)[number] = "about";

  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom >= probeY) {
      current = id;
      break;
    }
  }

  setActive(current);
};

  // Initial + on scroll
  getActive();

  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(getActive);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navWrap">
      <nav className="navBar">
        <a href="#top" className="navBrand" onClick={closeMenu}>
          Alina Wallsteins Portfolio
        </a>

        <button
          className="navBurger"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navLinks ${open ? "open" : ""}`}>
          <a
            href="#about"
            className={active === "about" ? "active" : ""}
            onClick={closeMenu}
          >
            Über mich
          </a>

          <a
            href="#projects"
            className={active === "projects" ? "active" : ""}
            onClick={closeMenu}
          >
            Projekte
          </a>

          <a
            href="#skills"
            className={active === "skills" ? "active" : ""}
            onClick={closeMenu}
          >
            Skills
          </a>

          <a
            href="#contact"
            className={active === "contact" ? "active" : ""}
            onClick={closeMenu}
          >
            Kontakt
          </a>
        </div>
      </nav>
    </header>
  );
}
export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const skipIntro = useCallback(() => {
    setShowIntro(false);
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    if (!showIntro) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        skipIntro();
      }
    };

    window.addEventListener("keydown", onKey);
    const timer = window.setTimeout(skipIntro, 3200);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [showIntro, skipIntro]);
  const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollTop / docHeight;
    setScrollProgress(progress);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      <div id="top" />

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className="introWrapper"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            onClick={skipIntro}
            role="button"
            aria-label="Intro überspringen"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") skipIntro();
            }}
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
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Klick / Space / Enter zum Überspringen
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

      <Navbar />
      <div
      className="scrollProgress"
      style={{ transform: `scaleX(${scrollProgress})` }}
    />
      <ShaderBG />

      <main className="layout">
        {/* ABOUT */}
        <section id="about" className="hero">
          <div className="heroContent">
            <div className="heroText">
              <h1>Alina Wallstein</h1>
              <h2>Frontend Developer & Creative Technologist</h2>
              <p>
                Studentin im Studiengang Internationale Medieninformatik an der Hochschule für Technik und Wirtschaft Berlin (HTW Berlin),
                mit Fokus auf moderne Frontend-Entwicklung (React), 3D-Webtechnologien und UI/UX-Konzeption.
              </p>

              <a href="/AlinaWallsteinLebenslauf1.pdf" download className="cvButton">
                Lebenslauf als PDF herunterladen
              </a>
            </div>

            <div className="heroImage">
              <img
                src="/profil.png"
                alt="Portrait von Alina Wallstein"
                className="profileImage"
              />
            </div>
          </div>
        </section>

        {/* (Optional) Akademische Leistungen */}
        <section className="section">
          <h3>Akademische Leistungen – Aktuelles Semester 25/26</h3>
          <div className="card">
            <ul>
              <li>Vertiefte Auseinandersetzung mit Autodesk Maya (Hard-Surface Modeling, Topologie, Rendering)</li>
              <li>Informatik 2 bestanden (saubere Code-Struktur, algorithmisches Denken, Sortieralgorithmen)</li>
              <li>Computergrafik: Shader, eigene 3D-Objekte, Texturierung, Transformationen</li>
              <li>Entwicklung eines React + TypeScript Portfolios mit Shader-Hintergrund</li>
            </ul>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <h3>Projects</h3>

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
                  <img src="/helsinki.jpg" alt="Helsinki Impression" />
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
                    zu machen.
                  </p>

                  <ul>
                    <li>Konzeption einer strukturierten Ausleih-Logik</li>
                    <li>Frontend-Entwicklung mit React & TypeScript</li>
                    <li>Komponentenbasierte Architektur</li>
                    <li>UI/UX-Design und Prototyping</li>
                    <li>Optimierung der Nutzerführung</li>
                  </ul>
                </div>
              </div>
            </section>
          </AnimatedSection>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
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

        {/* CONTACT */}
        <section id="contact" className="section">
          <h3>Contact</h3>
          <div className="card">
            <p>Kontakt: alinawallstein8@gmail.com</p>
          </div>
        </section>

        <section className="contact">
          <p>© {new Date().getFullYear()} Alina Wallstein</p>
        </section>
      </main>
    </>
  );
}