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
        <g transform="rotate(-7 140 110)">
          <rect x="54" y="81" width="172" height="58" rx="28" fill="#111315" stroke="#77736d" strokeOpacity=".48" />
          <path d="M183 81h18c16 0 29 13 29 29s-13 29-29 29h-18Z" fill="#9e855f" />
          <path d="M190 87v46M200 85v50M210 89v42" stroke="#151719" strokeOpacity=".42" />
          <circle cx="76" cy="110" r="18" fill="#191b1d" stroke="#c8ab7a" strokeOpacity=".22" />
          <path d="M77 81c-2-21 8-34 27-39 10 14 9 27-2 39" fill="#eee4d6" stroke="#866243" strokeOpacity=".44" />
          <path d="M85 58h16M85 64h13M85 70h15" stroke="#866243" strokeOpacity=".5" />
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
