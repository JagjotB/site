import type { ArtifactSlug } from "@/content/experience";

type ArtifactVisualProps = { slug: ArtifactSlug };

function ArchiveCamera() {
  return (
    <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
      <defs>
        <linearGradient id="archive-camera-body" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#292c2e" /><stop offset=".58" stopColor="#111315" /><stop offset="1" stopColor="#070809" />
        </linearGradient>
        <radialGradient id="archive-camera-lens">
          <stop stopColor="#9e855f" stopOpacity=".58" /><stop offset=".3" stopColor="#1f2325" /><stop offset=".76" stopColor="#08090a" /><stop offset="1" stopColor="#c8ab7a" stopOpacity=".38" />
        </radialGradient>
      </defs>
      <path d="M54 78h48l15-23h49l16 23h44c12 0 22 10 22 22v91H32v-91c0-12 10-22 22-22Z" fill="url(#archive-camera-body)" stroke="#c8ab7a" strokeOpacity=".32" />
      <path d="M32 112h216M44 173h192" stroke="#c8ab7a" strokeOpacity=".1" />
      <circle cx="140" cy="133" r="54" fill="#0b0d0e" stroke="#9e855f" strokeOpacity=".62" strokeWidth="4" />
      <circle cx="140" cy="133" r="38" fill="url(#archive-camera-lens)" stroke="#c8ab7a" strokeOpacity=".25" />
      <circle cx="128" cy="121" r="9" fill="#f1e8da" fillOpacity=".08" />
      <rect x="49" y="62" width="36" height="15" rx="2" fill="#17191b" stroke="#c8ab7a" strokeOpacity=".28" />
      <rect x="195" y="57" width="27" height="21" rx="3" fill="#17191b" stroke="#c8ab7a" strokeOpacity=".28" />
    </svg>
  );
}

function ArchitecturalIris() {
  return (
    <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
      <g transform="translate(140 110)">
        <circle r="78" fill="#0b0d0e" stroke="#c8ab7a" strokeOpacity=".55" />
        <circle r="64" fill="none" stroke="#9e855f" strokeOpacity=".2" strokeDasharray="2 7" />
        {Array.from({ length: 7 }).map((_, index) => (
          <path key={index} d="M0-61C21-61 42-51 54-34L17 0C12-13 5-22-6-28Z" fill={index % 2 ? "#232628" : "#17191b"} stroke="#c8ab7a" strokeOpacity=".2" transform={`rotate(${index * (360 / 7)})`} />
        ))}
        <g transform="translate(-31 -30)" fill="none" stroke="#c8ab7a" strokeOpacity=".78">
          <path d="M0 0h62v60H0ZM0 26h27V0M27 26v34M27 43h35M47 0v43" />
          <path d="M27 36h12v7H27" stroke="#f1e8da" strokeOpacity=".6" strokeDasharray="2 2" />
          <rect x="47" y="43" width="15" height="17" fill="#572a38" fillOpacity=".18" />
        </g>
      </g>
    </svg>
  );
}

export function ArtifactVisual({ slug }: ArtifactVisualProps) {
  if (slug === "the-archive") return <ArchiveCamera />;
  if (slug === "the-way-out") return <ArchitecturalIris />;

  if (slug === "the-promise") {
    return (
      <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
        <defs>
          <linearGradient id="shell-hull" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#070809" />
            <stop offset=".32" stopColor="#242729" />
            <stop offset=".58" stopColor="#111315" />
            <stop offset="1" stopColor="#050606" />
          </linearGradient>
          <linearGradient id="shell-brass" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#6f5a3d" />
            <stop offset=".28" stopColor="#c8ab7a" />
            <stop offset=".53" stopColor="#927550" />
            <stop offset=".78" stopColor="#d1b886" />
            <stop offset="1" stopColor="#665139" />
          </linearGradient>
        </defs>
        <ellipse cx="142" cy="202" rx="53" ry="9" fill="#000" fillOpacity=".32" />
        <g transform="rotate(8 140 111)">
          <path d="M108 31c0-7 5.7-12.5 12.7-12.5h38.6c7 0 12.7 5.5 12.7 12.5v128h-64Z" fill="url(#shell-hull)" stroke="#6f6d68" strokeOpacity=".5" strokeWidth="1.2" />
          <ellipse cx="140" cy="30" rx="32" ry="11.5" fill="#151719" stroke="#817b72" strokeOpacity=".5" />
          <path d="M140 30 112 25M140 30l-19-9M140 30l.2-11.5M140 30l19-9M140 30l28-5M140 30l-25 6M140 30l13 8M140 30l26 5" stroke="#8e8a82" strokeOpacity=".38" strokeWidth="1" />
          <path d="M113 42h54M113 47h54" stroke="#c8ab7a" strokeOpacity=".11" />
          <path d="M118 53v91M124 50v96M156 50v96M162 53v91" stroke="#f1e8da" strokeOpacity=".035" />
          <text x="140" y="119" fill="#c8ab7a" fillOpacity=".68" fontFamily="var(--sans)" fontSize="9" letterSpacing="2.4" textAnchor="middle">12 GA</text>
          <path d="M121 127h38" stroke="#c8ab7a" strokeOpacity=".15" />
          <rect x="108" y="153" width="64" height="39" fill="url(#shell-brass)" stroke="#d5bc8d" strokeOpacity=".55" />
          <path d="M114 156v33M120 155v35M127 155v35M134 155v35M141 155v35M148 155v35M155 155v35M162 155v35M168 156v33" stroke="#33291d" strokeOpacity=".34" />
          <rect x="103" y="188" width="74" height="10" rx="2" fill="url(#shell-brass)" stroke="#d7be8f" strokeOpacity=".65" />
          <ellipse cx="140" cy="197" rx="37" ry="7.5" fill="#8c704c" stroke="#d7be8f" strokeOpacity=".65" />
          <ellipse cx="140" cy="197" rx="7" ry="3.2" fill="#3c3023" stroke="#c8ab7a" strokeOpacity=".55" />
        </g>
      </svg>
    );
  }

  if (slug === "the-details") {
    return (
      <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
        <g transform="translate(22 55)">
          {[0, 1, 2, 3, 4].map((index) => (
            <g key={index} transform={`translate(${index * 46} ${index % 2 ? 8 : 0})`}>
              <path d="M0 0h48v108H0z" fill={index % 2 ? "#e6d8c5" : "#f0e7d9"} stroke="#866243" strokeOpacity=".45" />
              <path d="M8 18h28M8 26h20M8 72h30M8 80h23" stroke="#866243" strokeOpacity=".42" />
              <text x="8" y="56" fill="#572a38" fontFamily="var(--serif)" fontSize="16">{index + 1}</text>
            </g>
          ))}
          <path d="M48 0v116M94 8v100M140 0v116M186 8v100" stroke="#572a38" strokeOpacity=".24" strokeDasharray="2 3" />
        </g>
      </svg>
    );
  }

  if (slug === "my-voice") {
    const bars = [10, 22, 38, 16, 54, 70, 32, 46, 78, 42, 28, 62, 36, 20, 48, 26, 14];
    return (
      <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
        <rect x="39" y="63" width="202" height="94" rx="3" fill="#17191b" stroke="#c8ab7a" strokeOpacity=".4" />
        <path d="M55 110h170" stroke="#9e855f" strokeOpacity=".32" />
        {bars.map((height, index) => <path key={index} d={`M${62 + index * 10} ${110 - height / 2}v${height}`} stroke="#c8ab7a" strokeWidth="2" strokeLinecap="round" />)}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
      <g transform="rotate(3 140 110)">
        <rect x="52" y="62" width="176" height="96" rx="4" fill="#111315" stroke="#827057" strokeOpacity=".55" />
        <path d="M70 82h140M70 138h140" stroke="#9e855f" strokeOpacity=".25" />
        <g transform="translate(98 86) scale(.66)" stroke="#c8ab7a" fill="none">
          <path d="M11 17h42M11 47h42M17 14v36M28 21v26M40 14v36M48 24v23M28 21l12-7" strokeWidth="1.4" />
          <circle cx="48" cy="20" r="2.3" fill="#c8ab7a" />
        </g>
        <text x="70" y="150" fill="#b8afa2" fontFamily="var(--sans)" fontSize="6" letterSpacing="2">ONLY YOU</text>
      </g>
    </svg>
  );
}
