/**
 * Animations are derived only from scoring's last_event.
 * Two hops from protocol: this module must not know extras.type or umpire_confirmed.
 *
 * @param {import("./scoreSnapshot.js").ScoreSnapshot} snapshot
 * @returns {string}
 */
export function animationFor(snapshot) {
  const event = snapshot.last_event;
  if (event.wicket_counted || event.display === "WICKET") {
    return "wicket";
  }
  if (event.display === "NOT_OUT") {
    return "appeal-not-out";
  }
  if (event.display === "FOUR") {
    return "boundary-four";
  }
  if (event.display === "SIX") {
    return "boundary-six";
  }
  if (event.display === "WIDE") {
    return "extra-wide";
  }
  if (event.display === "NO_BALL") {
    return "extra-no-ball";
  }
  if (event.display === "DOT") {
    return "dot";
  }
  return "runs";
}
