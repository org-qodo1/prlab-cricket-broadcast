/**
 * Copied from cricket-scoring ScoreSnapshot. Do not import cricket-protocol.
 * If scoring adds raw_ball / extras / umpire_confirmed, this file must ignore them.
 *
 * @typedef {object} LastEvent
 * @property {string} display
 * @property {number} runs_added
 * @property {boolean} wicket_counted
 * @property {boolean} legal_delivery
 *
 * @typedef {object} ScoreSnapshot
 * @property {string} match_id
 * @property {number} runs
 * @property {number} wickets
 * @property {string} overs
 * @property {LastEvent} last_event
 */

export const SNAPSHOT_KEYS = [
  "match_id",
  "runs",
  "wickets",
  "overs",
  "last_event",
];

/** @param {ScoreSnapshot} snapshot */
export function assertProductSnapshot(snapshot) {
  if ("raw_ball" in snapshot) {
    throw new Error("ScoreSnapshot leaked raw_ball; broadcast must not read protocol events");
  }
  if ("umpire_confirmed" in snapshot) {
    throw new Error("ScoreSnapshot leaked umpire_confirmed");
  }
}
