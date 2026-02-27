export default function ProjectAutohaus() {
  return (
    <section className="section" id="autohaus">
      <h3>Auto Wallstein – Webentwicklung & UI</h3>

      <div className="projectGrid">
        {/* Browser-Fenster */}
        <div className="browserFrame">
          <div className="browserTop">
            <div className="dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="address">autowallstein.netlify.app</div>
            <div className="topRight" />
          </div>

          {/* Preview-Bereich */}
          <div className="browserBody">
       <div className="browserBody">
            <img 
                className="previewImg" 
                src="/autohaus.png" 
                alt="Autohaus Website Preview" 
            />
            </div>
            </div>
            </div>

            {/* Option B (wenn erlaubt): iframe. Manche Seiten blocken das. */}

        {/* Text / Fakten */}
        <div className="projectFacts">
          <ul className="bullets">
            <li><strong>Motivation:</strong> Für das Autohaus in Heusenstamm wurde eine neue, moderne Website entwickelt, 
    die die Markenidentität klar repräsentiert und zugleich barrierearme Nutzung ermöglicht.</li>
            <li><strong>Fokus:</strong> Mordenes Design, Barrierefreiheit, responsive Gestaltung</li>
            <li><strong>Features:</strong> Fahrzeugbestand, Finanzierung, Kontakt & Anfahrt</li>
            <li><strong>Extras:</strong> Export & Zulassung und Historie</li>
          </ul>

          <div className="cta">
           <a
            href="https://autowallstein.netlify.app/"  
            target="_blank"
            rel="noopener noreferrer"
            className="projectButton"
            >   
            Website ansehen →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}