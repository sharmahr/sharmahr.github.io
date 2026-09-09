function StorageVisual() {
  return (
    <div className="storage-visual" aria-hidden="true">
      <div className="visual-label">STORAGE, UNDERSTOOD<span>FIG. 02</span></div>
      <svg className="storage-architecture" viewBox="0 0 480 350" fill="none">
        <rect x="119" y="33" width="244" height="92" rx="7" fill="#315443" opacity=".12" transform="translate(0 7)" />
        <rect x="119" y="33" width="244" height="92" rx="7" fill="#254636" stroke="#5b7d66" />
        <g fill="#8ead98"><circle cx="136" cy="47" r="2" /><circle cx="145" cy="47" r="2" /><circle cx="154" cy="47" r="2" /></g>
        <text x="241" y="80" textAnchor="middle" fill="#edf4e5" fontSize="26">SwiftUI app</text>
        <text x="241" y="104" textAnchor="middle" fill="#b6cdb5" fontSize="13">ScannerClient</text>
        <g stroke="#648773" strokeWidth="1.5" className="storage-flow">
          <path d="M226 125v31H137v38m-5-6 5 6 5-6" />
          <path d="M154 194v-29h64v-30m-5 6 5-6 5 6" />
          <path d="M257 125v31h101v38m-5-6 5 6 5-6" />
        </g>
        <text x="82" y="148" fill="#405d49" fontSize="12">JSON lines</text>
        <text x="296" y="148" fill="#405d49" fontSize="12">Batch writes</text>
        <rect x="43" y="185" width="208" height="113" rx="8" stroke="#557762" strokeDasharray="4 5" />
        <rect x="52" y="194" width="190" height="95" rx="5" fill="#aec6b3" stroke="#91ad9a" />
        <text x="147" y="219" textAnchor="middle" fill="#405d49" fontSize="11" letterSpacing="1">02 / SEPARATE PROCESS</text>
        <text x="147" y="249" textAnchor="middle" fill="#254636" fontSize="20">ScannerWorker</text>
        <text x="147" y="274" textAnchor="middle" fill="#405d49" fontSize="12">Crash-isolated scanning</text>
        <rect x="278" y="194" width="158" height="95" rx="5" fill="#e0ead8" stroke="#91ad9a" />
        <text x="357" y="219" textAnchor="middle" fill="#405d49" fontSize="11" letterSpacing="1">03 / LOCAL STORE</text>
        <text x="357" y="249" textAnchor="middle" fill="#254636" fontSize="23">SQLite</text>
        <text x="357" y="274" textAnchor="middle" fill="#405d49" fontSize="12">Sessions + entries</text>
        <text x="240" y="329" textAnchor="middle" fill="#365341" fontSize="13">The worker can crash. The app stays up.</text>
      </svg>
      <div className="visual-label visual-label--bottom"><span>A crash boundary, by design.</span><span>Architecture study</span></div>
    </div>
  );
}

function DatabaseVisual() {
  return (
    <div className="database-visual" aria-hidden="true">
      <div className="visual-label">UNDER THE QUERY<span>FIG. 03</span></div>
      <div className="query-line"><span>SELECT</span> possibility<br /><span>FROM</span> first_principles<span className="query-cursor">;</span></div>
      <svg viewBox="0 0 480 190" className="database-tree" fill="none">
        <path d="M240 38v36H92v30m148-30h148v30m-148-30v30M92 128v23H38v24m54-24h56v24m92-47v47m148-47v23h-55v24m55-24h54v24" stroke="#867796" />
        <g fill="#39303f" stroke="#a48fb6">
          <rect x="205" y="8" width="70" height="32" rx="3" />
          <rect x="57" y="102" width="70" height="28" rx="3" />
          <rect x="205" y="102" width="70" height="28" rx="3" />
          <rect x="353" y="102" width="70" height="28" rx="3" />
        </g>
        <g fill="#d3bfe2">
          <rect x="216" y="17" width="12" height="13" rx="1" /><rect x="234" y="17" width="12" height="13" rx="1" /><rect x="252" y="17" width="12" height="13" rx="1" />
          {[20, 130, 222, 315, 424].map((x) => <rect key={x} x={x} y="169" width="36" height="14" rx="2" />)}
        </g>
        <g fill="#b4a1c3" fontSize="10" fontFamily="monospace" textAnchor="middle"><text x="92" y="120">PARSE</text><text x="240" y="120">PLAN</text><text x="388" y="120">PERSIST</text></g>
      </svg>
      <div className="visual-label visual-label--bottom"><span>Built from the B-tree up.</span><span>Engine study</span></div>
    </div>
  );
}

export default function ProjectVisual({ id }) {
  if (id === "macstorage") return <StorageVisual />;
  if (id === "zed") return <DatabaseVisual />;
  if (id === "parking") {
    return (
      <div className="parking-visual">
        <div className="visual-label" aria-hidden="true">A DIFFERENT KIND OF VISION<span>FIG. 04</span></div>
        <div className="parking-frame"><img src="/assets/projects/parkit-preview.jpg" width="1000" height="563" loading="lazy" decoding="async" alt="Park It training image with vehicles annotated for the parking detection model" /></div>
        <div className="parking-stamp" aria-hidden="true">See a space.<br /><span>Not a problem.</span></div>
        <div className="visual-label visual-label--bottom" aria-hidden="true"><span>Computer vision, real streets.</span><span>Training imagery</span></div>
      </div>
    );
  }
  return (
    <div className="algorush-visual">
      <div className="visual-label" aria-hidden="true">PRACTICE WITH A PURPOSE<span>FIG. 01</span></div>
      <div className="browser-window">
        <div className="browser-window__bar" aria-hidden="true"><span><i /><i /><i /></span>algorush.web.app<svg viewBox="0 0 12 12"><path d="M3 6h6m-3-3v6" stroke="currentColor" /></svg></div>
        <img src="/assets/projects/algorush.jpg" width="1200" height="853" loading="lazy" decoding="async" alt="The live AlgoRush platform, showing its interview practice experience" />
      </div>
      <span className="algorush-badge" aria-hidden="true"><b>1,500+</b>engineers, and counting.</span>
    </div>
  );
}
