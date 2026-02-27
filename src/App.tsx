import "./index.css";
import ShaderBG from "./components/ShaderBG";
import CoffeeViewer from "./components/CoffeeViewer";
import ProjectAutohaus from "./components/ProjectAutohaus";
import AnimatedSection from "./components/AnimatedSection";
import IntroShader from "./components/IntroShader";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HelsinkiSlider from "./components/HelsinkiSlider";
import CGVideoViewer from "./components/CGVideoViewer";
import ScrollToTop from "./components/ScrollToTop";


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
        <a href="#top" className="navBrand" onClick={closeMenu} aria-label="Zur Startseite">
            <span className="brandIcon">💻</span>
            <span className="brandFirst">Alina</span>
            <span className="brandLast">Wallstein</span>
       </a>

        <button
          className="navBurger"
          onClick={() => setOpen(!open)}>
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
            Profil
          </a>

          <a
            href="#projects"
            className={active === "projects" ? "active" : ""}
            onClick={closeMenu}
          >
            Arbeiten
          </a>

          <a
            href="#skills"
            className={active === "skills" ? "active" : ""}
            onClick={closeMenu}
          >
            Fähigkeiten
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
                Studentin: internationale Medieninformatik | Full-Stack-Development | 3D-Webtechnologien | UI/UX-Konzeption
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
              <h2>Creative Developer & Media Informatics Student</h2>
              <p>
                Ich studiere Internationale Medieninformatik an der HTW Berlin und bin aktuell im 3./4. Semester. Besonders spannend finde ich die Schnittstelle zwischen Gestaltung und Programmierung – von React-basierten Frontends bis hin zu 3D-Webprojekten und UI/UX-Konzepten. Gebürtig aus Frankfurt am Main, liebe ich es, Ideen nicht nur zu denken, sondern sie digital umzusetzen.
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
          <h3>Was ich im Wintersemester 25/26 vertieft habe 👩🏻‍💻</h3>
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
          <h3>Woran ich gearbeitet habe ✨ </h3>

<AnimatedSection className="hero">
  <section className="section">

    <div className="wipCard">
      <div className="wipTop">
        <div>
          <h3 className="wipTitle">Haarstudio 6 — Webseite in Entwicklung</h3>
          <p className="wipSub">
            Gerade im Aufbau: Design, Struktur & Frontend. Launch folgt bald.
          </p>
        </div>

        <span className="wipBadge" aria-label="Work in Progress">
          Work in Progress
        </span>
      </div>

      <div className="wipMeta">
        <span className="wipDot" />
        <span className="wipText">Building…</span>
      </div>

      <div className="wipProgress" aria-hidden="true">
        <div className="wipBar" />
      </div>
    </div>
  </section>
</AnimatedSection>
          <AnimatedSection className="hero">
<section className="section">
  <h3>Computergrafik – GLSL Demo</h3>

  <div className="projectCard">
    <CGVideoViewer />

    <div className="projectContent">
      <h4>Shader / Java / GLSL</h4>
      <p>
        Im Rahmen des Moduls Computergrafik entstand eine interaktive 3D-Szene mit Java und GLSL, bestehend aus mehreren unterschiedlich geformten, vollwertigen 3D-Objekten.

Ein Objekt wurde vollständig über selbst definierte Koordinaten konstruiert, während ein weiteres programmatisch generiert bzw. aus einer externen Objektdatei geladen wurde. Die Szene nutzt kontinuierliche Transformationen (Translation, Rotation, Skalierung) zur Animation aller Elemente.

Ein hierarchisches Transformationssystem wurde implementiert, sodass sich ein Objekt relativ zum lokalen Koordinatensystem eines anderen bewegt (vergleichbar mit einem Planeten-Mond-System).
      </p>
      <ul>
        <li>Mehrere 3D-Objekte mit unterschiedlicher Geometrie</li>
        <li>Hierarchische Transformationen (Parent-Child-System)</li>
        <li>Zwei separate Vertex- und Fragment-Shader</li>
        <li>Implementierung von Phong-Schattierung</li>
        <li>Demonstration von Over- und Undersampling</li>
        <li>Einsatz verschiedener Filtermethoden (ungefiltert vs. bilinear)</li>
      </ul>
    </div>
  </div>
</section>
  </AnimatedSection>

          <AnimatedSection className="hero">
            <ProjectAutohaus />
          </AnimatedSection>

          <AnimatedSection className="hero">
            <section className="section">
              <h3>3D-Modellierung – Kaffeemaschine (Autodesk Maya)</h3>

              <div className="projectCard">
                <CoffeeViewer />

                <div className="projectContent">
                  <h4>Hard-Surface Modeling in Autodesk Maya</h4>
                  <p>
  Als Leistungsnachweis entstand eine detaillierte 3D-Modellierung einer 
  Siebträger-Kaffeemaschine in Autodesk Maya. Das Modell wurde aus 
  primitiven Grundkörpern entwickelt und mithilfe von Tools wie 
  Bevel und Extrude strukturell ausgearbeitet.
</p>

<p>
  Materialien und Texturen wurden im ursprünglichen Projekt angelegt, 
  konnten jedoch bei der Web-Integration nicht vollständig übernommen werden. 
  In der aktuellen Darstellung fehlt zudem eine untere Plane – 
  vermutlich bedingt durch den Exportprozess.
</p>
<p>
Rückblickend hat mir dieses Projekt besonders viel Freude bereitet.
Während des Modellierungsprozesses bin ich mehrfach in technische „Sackgassen“ geraten und musste Lösungswege neu denken. Gerade diese Herausforderungen haben jedoch mein Verständnis für 3D-Strukturen und Workflows deutlich vertieft.
Maya war anfangs anspruchsvoll, aber genau das macht für mich den Reiz aus – 3D-Objekte zu erschaffen und Design in räumliche Form zu übersetzen.
</p>
              
                </div>
              </div>
            </section>
          </AnimatedSection>
<AnimatedSection className="hero">
  <section className="section">
    <h3>Studienreise – Helsinki (Finnland)</h3>

    <div className="helsinkiCard">
      {/* TEXT LINKS */}
      <div className="helsinkiContent">
       <h3>Oktober/November 2025</h3>

<p>
  Im Oktober/November 2025 nahm ich mit der HTW Berlin an einer Studienreise 
  nach Helsinki (Finnland) teil. Ziel war es, Einblicke in die finnische 
  Games- und Innovationsszene sowie in aktuelle Entwicklungen im Bereich 
  Virtual Reality zu gewinnen.
</p>

<ul>
  <li>Besuch von Spieleunternehmen wie Futureplay</li>
  <li>Austausch zu Produktionsprozessen und Game-Design-Workflows</li>
  <li>Einblicke in universitäre VR-Forschung und immersive Technologien</li>
</ul>
      </div>

      {/* SLIDER RECHTS */}
      <div className="helsinkiGallery">
        <HelsinkiSlider
          autoPlayMs={0} // z.B. 3500 für Autoplay
          images={[
            { src: "/helsinki.jpg", alt: "Helsinki – Impression 1" },
            { src: "/helsinki1.jpeg", alt: "Helsinki – Impression 2" },
            { src: "/helsinki2.jpg", alt: "Helsinki – Impression 3" },
          ]}
        />
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
                    Konzeption und Entwicklung einer webbasierten Anwendung zur digitalen Organisation und Ausleihe von VR-Equipment an der HTW Berlin.
Das Projekt wurde in einem dreiköpfigen Team realisiert – mit Fokus auf strukturierte Prozesse, Nutzerführung und technische Skalierbarkeit.
                  </p>

                  <ul>
                    <li>Konzeption einer strukturierten Ausleih-Logik</li>
                    <li>Frontend-Entwicklung mit React & TypeScript</li>
                    <li>Komponentenbasierte Architektur</li>
                    <li>Rollenbasierte Admin-Oberfläche mit separater UX-Datenbank</li>
                    <li>Automatisierter E-Mail-Agent zur Bestätigung und Verwaltung von Ausleihvorgängen</li>
                    <li>UI/UX-Design, Prototyping und Optimierung der Nutzerführung</li>
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
              <p>React, TypeScript, HTML5, CSS3, interaktive Interfaces, Animationen,
Integration moderner Web-Tools</p>
            </div>

            <div className="skillBox">
              <h4>3D & Interactive</h4>
              <p>Three.js, GLSL, Shader Development, Autodesk Maya</p>
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
            <p>E-mail: alinawallstein8@gmail.com</p>
            <p>Telefon: +49 162 8777077</p>
         <p className="contactItem">
  <span className="contactLabel">LinkedIn: </span>
  <a
    href="https://www.linkedin.com/in/alinawallstein"
    target="_blank"
    rel="noopener noreferrer"
  >
    linkedin.com/in/alinawallstein
  </a>
</p>
          </div>
        </section>

        <section className="contact">
          <p>© {new Date().getFullYear()} Alina Wallstein</p>
        </section>
      </main>
      <ScrollToTop />
    </>
  );
}