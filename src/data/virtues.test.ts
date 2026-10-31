import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getVirtueForSin, virtues } from "./virtues";

describe("seven virtue archive", () => {
  it("maps every sin to the agreed virtue and includes the complete reflection fields", () => {
    const expected = {
      pride: "humility", envy: "kindness", wrath: "patience", gluttony: "temperance",
      sloth: "diligence", greed: "generosity", lust: "chastity",
    } as const;
    expect(virtues).toHaveLength(7);
    for (const [sin, virtueId] of Object.entries(expected)) {
      const virtue = getVirtueForSin(sin as keyof typeof expected);
      expect(virtue?.id).toBe(virtueId);
      expect(virtue?.pairedSin).toBe(sin);
      expect(virtue?.portraitPath).toBe(`/virtues/${virtueId}.png`);
      expect(virtue?.name).toBeTruthy();
      expect(virtue?.title).toBeTruthy();
      expect(virtue?.shortDescription).toBeTruthy();
      expect(virtue?.dualReading).toBeTruthy();
      expect(virtue?.growthDirection).toBeTruthy();
      expect(virtue?.dailyPractice).toBeTruthy();
      expect(virtue?.reflectionQuestion).toBeTruthy();
      expect(virtue).not.toHaveProperty("score");
    }
  });

  it("has seven readable PNG portraits with matching dimensions", async () => {
    const dimensions = new Set<string>();
    for (const virtue of virtues) {
      const image = await readFile(path.join(process.cwd(), "public", virtue.portraitPath.replace(/^\//, "")));
      expect(image.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      const width = image.readUInt32BE(16);
      const height = image.readUInt32BE(20);
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
      dimensions.add(`${width}x${height}`);
    }
    expect(dimensions).toEqual(new Set(["1122x1402"]));
  });

  it("safely handles absent mappings for legacy or incomplete result data", () => {
    expect(getVirtueForSin(null)).toBeNull();
    expect(getVirtueForSin(undefined)).toBeNull();
  });
});
