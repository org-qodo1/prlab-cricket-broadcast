import { animationFor } from "./animator.js";
import { assertProductSnapshot } from "./scoreSnapshot.js";

/**
 * @param {string} scoringOrigin
 * @param {string} matchId
 */
export async function fetchSnapshot(scoringOrigin, matchId) {
  const response = await fetch(`${scoringOrigin}/matches/${matchId}/score`);
  if (!response.ok) {
    throw new Error(`scoring ${response.status}`);
  }
  const snapshot = await response.json();
  assertProductSnapshot(snapshot);
  return { snapshot, animation: animationFor(snapshot) };
}
