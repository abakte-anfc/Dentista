/* Progresso compartilhado pela posição e pelo ângulo, independente da cadência. */
export function advanceProgress(current, target, dt, damping, turns, angularLimit) {
  const eased = (target - current) * (1 - Math.exp(-dt * damping));
  const maximum = angularLimit / (turns * 360) * dt;
  const step = Math.max(-maximum, Math.min(maximum, eased));
  const next = current + step;
  return Math.abs(target - next) < .00015 ? target : next;
}
