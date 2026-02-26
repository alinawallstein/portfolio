export default function ProjectAutohaus() {
  return (
    <section className="section" id="autohaus">
      <h2>Projekt: Autohaus-Website</h2>
      <p className="muted">
        Design & Umsetzung einer modernen Website inkl. Fahrzeugbestand, Finanzierung und Kontakt.
      </p>

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
            <li><strong>Fokus:</strong> klares UI, Conversion (Kontakt/Anfrage), mobile first</li>
            <li><strong>Module:</strong> Fahrzeugbestand, Finanzierung, Kontakt & Anfahrt</li>
            <li><strong>Extras:</strong> Export & Zulassung Info-Bereich</li>
          </ul>

          <div className="cta">
            <a className="btn primary" href="https://autowallstein.netlify.app/" target="_blank" rel="noreferrer">
              Live ansehen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}