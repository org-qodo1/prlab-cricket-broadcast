import assert from "node:assert/strict";
import { test } from "node:test";

import { animationFor } from "../src/animator.js";
import { assertProductSnapshot } from "../src/scoreSnapshot.js";

function snapshot(overrides = {}) {
  return {
    match_id: "m1",
    runs: 10,
    wickets: 1,
    overs: "2.3",
    last_event: {
      display: "DOT",
      runs_added: 0,
      wicket_counted: false,
      legal_delivery: true,
      ...overrides.last_event,
    },
    ...overrides,
  };
}

test("confirmed wicket from scoring plays wicket animation", () => {
  assert.equal(
    animationFor(
      snapshot({
        wickets: 2,
        last_event: {
          display: "WICKET",
          runs_added: 0,
          wicket_counted: true,
          legal_delivery: true,
        },
      })
    ),
    "wicket"
  );
});

test("unconfirmed appeal from scoring does not play wicket", () => {
  assert.equal(
    animationFor(
      snapshot({
        last_event: {
          display: "NOT_OUT",
          runs_added: 0,
          wicket_counted: false,
          legal_delivery: true,
        },
      })
    ),
    "appeal-not-out"
  );
});

test("wide uses scoring display, not extras.type", () => {
  assert.equal(
    animationFor(
      snapshot({
        last_event: {
          display: "WIDE",
          runs_added: 1,
          wicket_counted: false,
          legal_delivery: false,
        },
      })
    ),
    "extra-wide"
  );
});

test("product snapshot must not include protocol fields", () => {
  assert.doesNotThrow(() => assertProductSnapshot(snapshot()));
  assert.throws(
    () => assertProductSnapshot({ ...snapshot(), raw_ball: { extras: { type: "wide" } } }),
    /raw_ball/
  );
});
