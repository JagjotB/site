export const easeEditorial = [0.22, 1, 0.36, 1] as const;
export const easeMechanical = [0.65, 0, 0.35, 1] as const;

export const motionDurations = {
  press: 0.2,
  card: 0.48,
  entrance: 0.72,
  reveal: 1.2,
  deliberate: 1.9,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
} as const;
