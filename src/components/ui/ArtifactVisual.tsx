import type { ArtifactSlug } from "@/content/experience";

type ArtifactVisualProps = {
  slug: ArtifactSlug;
};

export function ArtifactVisual({ slug }: ArtifactVisualProps) {
  if (slug === "tomorrow") {
    return (
      <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
        <defs>
          <linearGradient id="tomorrow-sky" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#3a3432" />
            <stop offset="1" stopColor="#17191b" />
          </linearGradient>
        </defs>
        <rect x="38" y="26" width="204" height="164" rx="2" fill="url(#tomorrow-sky)" stroke="#C8AB7A" strokeOpacity=".36" />
        <circle cx="188" cy="73" r="20" fill="#C8AB7A" fillOpacity=".13" />
        <path d="M39 143c33-24 57-16 84-34 27-19 50-15 118 18v63H39z" fill="#111315" />
        <path d="M39 153c45-28 70-14 103-37 24-17 54-10 99 13" fill="none" stroke="#C8AB7A" strokeOpacity=".52" strokeWidth="1" />
        <path d="M121 149c1-15 8-24 16-24 9 0 15 9 17 24M111 178l10-29h33l13 29" fill="#17191b" stroke="#9E855F" strokeWidth=".8" />
      </svg>
    );
  }

  if (slug === "in-focus") {
    return (
      <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
        <g transform="translate(140 110)">
          <circle r="76" fill="#0b0d0e" stroke="#C8AB7A" strokeOpacity=".55" />
          {Array.from({ length: 9 }).map((_, index) => (
            <path
              key={index}
              d="M0-59C22-59 43-47 54-29L12 14C7 4 1-4-10-10Z"
              fill={index % 2 ? "#232628" : "#191b1d"}
              stroke="#C8AB7A"
              strokeOpacity=".22"
              transform={`rotate(${index * 40})`}
            />
          ))}
          <circle r="19" fill="#C8AB7A" fillOpacity=".2" />
        </g>
      </svg>
    );
  }

  if (slug === "the-promise") {
    return (
      <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
        <g transform="rotate(-7 140 110)">
          <rect x="54" y="81" width="172" height="58" rx="28" fill="#111315" stroke="#77736d" strokeOpacity=".48" />
          <path d="M183 81h18c16 0 29 13 29 29s-13 29-29 29h-18Z" fill="#9E855F" />
          <path d="M190 87v46M200 85v50M210 89v42" stroke="#151719" strokeOpacity=".42" />
          <circle cx="76" cy="110" r="18" fill="#191b1d" stroke="#C8AB7A" strokeOpacity=".22" />
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
              <text x="8" y="56" fill="#572A38" fontFamily="serif" fontSize="16">{index + 1}</text>
            </g>
          ))}
          <path d="M48 0v116M94 8v100M140 0v116M186 8v100" stroke="#572A38" strokeOpacity=".24" strokeDasharray="2 3" />
        </g>
      </svg>
    );
  }

  if (slug === "my-voice") {
    const bars = [10, 22, 38, 16, 54, 70, 32, 46, 78, 42, 28, 62, 36, 20, 48, 26, 14];
    return (
      <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
        <rect x="39" y="63" width="202" height="94" rx="3" fill="#17191b" stroke="#C8AB7A" strokeOpacity=".4" />
        <path d="M55 110h170" stroke="#9E855F" strokeOpacity=".32" />
        {bars.map((height, index) => (
          <path
            key={index}
            d={`M${62 + index * 10} ${110 - height / 2}v${height}`}
            stroke="#C8AB7A"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 220" className="artifact-visual" aria-hidden="true">
      <g transform="rotate(3 140 110)">
        <rect x="52" y="62" width="176" height="96" rx="4" fill="#111315" stroke="#827057" strokeOpacity=".55" />
        <path d="M70 82h140M70 138h140" stroke="#9E855F" strokeOpacity=".25" />
        <g transform="translate(98 86) scale(.66)" stroke="#C8AB7A" fill="none">
          <path d="M11 17h42M11 47h42M17 14v36M28 21v26M40 14v36M48 24v23M28 21l12-7" strokeWidth="1.4" />
          <circle cx="48" cy="20" r="2.3" fill="#C8AB7A" />
        </g>
        <text x="70" y="150" fill="#B8AFA2" fontFamily="sans-serif" fontSize="6" letterSpacing="2">ONLY YOU</text>
      </g>
    </svg>
  );
}
