import { describe, it, expect } from "vitest";
import { scoreAnswers } from "./scoring";
import { questions } from "@/data/questions";
import { sins, type SinId } from "@/data/sins";

function answersFor(target: SinId) {
  const answers = Object.fromEntries(questions.map(q => [q.id, 0])) as Record<number, number>;
  for (let round = 0; round < 5; round++) {
    for (const q of questions) {
      let bestIndex = answers[q.id];
      let bestMargin = Number.NEGATIVE_INFINITY;
      for (let index = 0; index < q.options.length; index++) {
        const candidate = { ...answers, [q.id]: index };
        const result = scoreAnswers(candidate);
        const otherMaximum = Math.max(...sins.filter(s => s.id !== target).map(s => result.distribution[s.id]));
        const margin = result.distribution[target] - otherMaximum;
        if (margin > bestMargin) { bestMargin = margin; bestIndex = index; }
      }
      answers[q.id] = bestIndex;
    }
  }
  return answers;
}

describe("scoreAnswers", () => {
  it("returns a zero distribution and deterministic tie for empty answers", () => {
    const result = scoreAnswers({});
    expect(result.dominant).toBe("pride");
    expect(Object.values(result.distribution).reduce((a, b) => a + b, 0)).toBe(0);
  });
  it("scores valid choices and ignores invalid choices", () => {
    const result = scoreAnswers({ 1: 0, 2: 99 });
    expect(result.scores.pride).toBeGreaterThan(0);
    expect(result.distribution.pride).toBeGreaterThan(0);
  });
});

it("has 35 distinct scenarios with four aligned, readable choices each", () => {
  expect(questions).toHaveLength(35);
  expect(new Set(questions.map(q => q.id)).size).toBe(35);
  for (const q of questions) {
    expect(q.scene.length).toBeGreaterThan(8);
    expect(q.prompt.length).toBeGreaterThan(5);
    expect(q.options).toHaveLength(4);
    expect(new Set(q.options.map(option => option.signal)).size).toBeGreaterThanOrEqual(3);
    for (const option of q.options) {
      expect(option.text.length).toBeGreaterThan(5);
      const values = Object.values(option.weights);
      expect(values.every(value => typeof value === "number" && Number.isFinite(value) && value > 0)).toBe(true);
      expect(option.weights[option.signal]).toBe(Math.max(...values));
    }
  }
  expect(questions.filter(q => q.measurement === "reverse").length).toBeGreaterThanOrEqual(4);
  expect(questions.filter(q => q.measurement === "reverse").every(q => q.options.some(o => (o.weights[o.signal] || 0) < 1.2))).toBe(true);
});

it("gives every dimension a valid independent score on a complete response set", () => {
  const answers = Object.fromEntries(questions.map(q => [q.id, 0]));
  const result = scoreAnswers(answers);
  expect(Object.keys(result.distribution)).toHaveLength(7);
  expect(Object.values(result.distribution).every(value => value >= 0 && value <= 100)).toBe(true);
  expect(result.secondary).not.toBe(result.dominant);
});

it("can produce each of the seven dominant dimensions with coherent answers", () => {
  for (const target of sins) expect(scoreAnswers(answersFor(target.id)).dominant).toBe(target.id);
});
