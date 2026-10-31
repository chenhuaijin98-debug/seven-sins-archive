import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { questions } from "../src/data/questions";
import { sins, type SinId } from "../src/data/sins";
import { scoreAnswers } from "../src/lib/scoring";
import { getVirtueForSin, virtues } from "../src/data/virtues";

test("35-question flow, result, PNG download, and mobile overflow", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await expect(page.getByText(/35 道情境题/)).toBeVisible();
  await expect(page.locator("img[alt$='临时肖像占位']")).toHaveCount(0);
  await expect(page.locator("img[src^='/portraits/']")).toHaveCount(7);
  await expect(page.locator("img[src^='/portraits/']").evaluateAll((images) => images.every((img) => (img as HTMLImageElement).naturalWidth > 0))).resolves.toBe(true);
  const virtueCatalog = page.getByTestId("virtue-catalog");
  await expect(virtueCatalog.locator("article")).toHaveCount(7);
  for (const virtue of virtues) {
    const image = virtueCatalog.locator(`img[src="${virtue.portraitPath}"]`);
    await expect(image).toHaveAttribute("alt", `${virtue.name}｜${virtue.title}人物肖像`);
    await expect(image.evaluate(element => (element as HTMLImageElement).naturalWidth > 0)).resolves.toBe(true);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: /开始探索/ }).click();
  await expect(page.getByText(/档案记录 ·\s*01\s*\/\s*35/)).toBeVisible();
  for (const viewport of [{ width: 375, height: 812 }, { width: 390, height: 844 }, { width: 430, height: 932 }]) {
    await page.setViewportSize(viewport);
    const size = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    expect(size.scroll).toBeLessThanOrEqual(size.width);
    await expect(page.locator("button.option")).toHaveCount(4);
    const optionBox = await page.locator("button.option").first().boundingBox();
    expect(optionBox?.height).toBeGreaterThanOrEqual(44);
    const textSizes = await page.evaluate(() => ({ prompt: getComputedStyle(document.querySelector(".question-prompt")!).fontSize, option: getComputedStyle(document.querySelector("button.q-option")!).fontSize }));
    expect(textSizes).toEqual({ prompt: viewport.width === 375 ? "22px" : "23px", option: "17px" });
    const optionStyles = await page.locator("button.q-option").first().evaluate(element => ({ borderStyle: getComputedStyle(element).borderStyle, borderColor: getComputedStyle(element).borderColor, minHeight: getComputedStyle(element).minHeight, userSelect: getComputedStyle(element).userSelect }));
    expect(optionStyles.borderStyle).toBe("solid");
    expect(optionStyles.borderColor).not.toBe("rgba(0, 0, 0, 0)");
    expect(parseFloat(optionStyles.minHeight)).toBeGreaterThanOrEqual(56);
    expect(optionStyles.userSelect).toBe("none");
    await page.locator("button.q-option").nth(0).click();
    await page.getByRole("button", { name: "上一题" }).click();
    await expect(page.locator("button.q-option").nth(0)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("button.q-option").nth(0).locator(".q-option-check")).toBeVisible();
    await page.locator("button.q-option").nth(1).click();
    await page.getByRole("button", { name: "上一题" }).click();
    await expect(page.locator("button.q-option").nth(1)).toHaveAttribute("aria-pressed", "true");
    expect(await page.evaluate(() => getSelection()?.toString())).toBe("");
  }
  await page.getByRole("button", { name: /返回首页/ }).click();
  await page.evaluate(() => localStorage.removeItem("sins-answers"));
  await page.reload();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.getByRole("button", { name: /开始探索/ }).click();
  const desktopTextSizes = await page.evaluate(() => ({ prompt: getComputedStyle(document.querySelector(".question-prompt")!).fontSize, option: getComputedStyle(document.querySelector("button.q-option")!).fontSize }));
  expect(desktopTextSizes).toEqual({ prompt: "25.6px", option: "17px" });
  for (let i = 0; i < 35; i++) {
    await expect(page.getByText(new RegExp(`档案记录 ·\\s*${String(i + 1).padStart(2, "0")}\\s*/\\s*35`))).toBeVisible();
    await expect(page.locator("button.option")).toHaveCount(4);
    if (i === 2) {
      await page.reload();
      await page.getByRole("button", { name: /开始探索/ }).click();
      await expect(page.getByText(/档案记录 ·\s*03\s*\/\s*35/)).toBeVisible();
    }
    await page.locator("button.option").nth(i % 4).click();
    if (i === 0) {
      await page.getByRole("button", { name: "上一题" }).click();
      await expect(page.locator("button.option").nth(0)).toHaveAttribute("aria-pressed", "true");
      await page.locator("button.option").nth(3).click();
    }
    if (i < 34) await expect(page.getByText(new RegExp(`档案记录 ·\\s*${String(i + 2).padStart(2, "0")}\\s*/\\s*35`))).toBeVisible();
  }
  await page.getByRole("button", { name: "生成我的档案" }).click();
  await expect(page.getByTestId("reveal-decrypt")).toBeVisible();
  await page.screenshot({ path: path.join(test.info().outputDir, "reveal-decrypt.png") });
  await expect(page.getByTestId("reveal-radar")).toBeVisible({ timeout: 5000 });
  await page.screenshot({ path: path.join(test.info().outputDir, "reveal-radar.png") });
  await expect(page.getByTestId("reveal-card")).toBeVisible({ timeout: 5000 });
  await page.screenshot({ path: path.join(test.info().outputDir, "reveal-card.png") });
  await expect(page.locator("#result")).toBeVisible();
  await expect(page.getByRole("img", { name: "七维人格倾向雷达图" })).toBeVisible();
  await page.getByRole("button", { name: "嫉妒" }).click();
  await expect(page.getByText(/对差异格外敏感/).first()).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByTestId("download-card").click();
  const download = await downloadPromise;
  const file = path.join(test.info().outputDir, download.suggestedFilename());
  await download.saveAs(file);
  const png = await readFile(file);
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(png.readUInt32BE(16)).toBe(1080);
  expect(png.readUInt32BE(20)).toBe(1350);

  for (const viewport of [{ width: 375, height: 812 }, { width: 390, height: 844 }, { width: 430, height: 932 }]) {
    await page.setViewportSize(viewport);
    if (await page.getByRole("button", { name: /查看我的结果/ }).isVisible()) {
      await page.getByRole("button", { name: /查看我的结果/ }).click();
    }
    const sizes = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    expect(sizes.scroll).toBeLessThanOrEqual(sizes.width);
    await expect(page.getByRole("button", { name: "下载高清 PNG 分享卡" })).toBeVisible();
    await expect(page.locator("svg[aria-label='七维人格倾向雷达图']")).toBeVisible();
    const radar = await page.locator("svg[aria-label='七维人格倾向雷达图']").boundingBox();
    expect(radar?.x).toBeGreaterThanOrEqual(0);
    expect((radar?.x || 0) + (radar?.width || 0)).toBeLessThanOrEqual(viewport.width);
  }
});

test("each archetype can lead to a browser result from weighted answers", async ({ page }) => {
  for (const target of sins) {
    const answers = answersForTarget(target.id);
    const calculated = scoreAnswers(answers);
    const values = calculated.distribution;
    expect(calculated.dominant).toBe(target.id);
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.evaluate((saved) => localStorage.setItem("sins-answers", JSON.stringify(saved)), Object.fromEntries(Object.entries(answers).filter(([id]) => Number(id) < 35)));
    await page.reload();
    await page.getByRole("button", { name: /开始探索/ }).click();
    await expect(page.getByText(/档案记录 ·\s*35\s*\/\s*35/)).toBeVisible();
    await page.locator("button.option").nth(answers[35]).click();
    await page.getByRole("button", { name: "生成我的档案" }).click();
    await page.getByRole("button", { name: "跳过动画" }).click();
    await expect(page.locator("#result > article").first().getByRole("heading", { name: target.name, exact: true })).toBeVisible();
    await expect(page.locator("#result > article:first-of-type img")).toHaveAttribute("src", `/portraits/${target.id}.png`);
    await expect(page.locator("#result > article:first-of-type img").evaluate((img) => (img as HTMLImageElement).naturalWidth > 0)).resolves.toBe(true);
    await expect(page.locator("#result")).toContainText(target.name);
    await expect(page.locator("#result")).toContainText(targetsTitle(target.id));
    const virtue = getVirtueForSin(target.id)!;
    const virtueProfile = page.getByTestId("virtue-profile");
    await expect(virtueProfile).toContainText(virtue.name);
    await expect(virtueProfile).toContainText(virtue.title);
    const virtuePortrait = virtueProfile.locator(`img[src="${virtue.portraitPath}"]`);
    await expect(virtuePortrait).toHaveAttribute("src", virtue.portraitPath);
    await expect(virtuePortrait.evaluate(element => (element as HTMLImageElement).naturalWidth > 0)).resolves.toBe(true);
    await expect(virtueProfile).not.toContainText(/美德分数|美德指数/);
    const secondaryVirtue = getVirtueForSin(calculated.secondary)!;
    const secondaryCard = page.getByTestId("secondary-virtue");
    await expect(secondaryCard).toBeVisible();
    await expect(secondaryCard).toContainText(secondaryVirtue.name);
    const overview = page.getByTestId("virtue-overview");
    await expect(overview.locator("details")).toHaveCount(7);
    if (target.id === "pride") {
      for (const item of virtues) {
        const entry = overview.getByTestId(`virtue-entry-${item.id}`);
        await expect(entry.locator("img")).toHaveAttribute("src", item.portraitPath);
        await entry.locator("summary").click();
        await expect(entry).toContainText(item.growthDirection);
        await expect(entry).toContainText(item.dailyPractice);
        await expect(entry).toContainText(item.reflectionQuestion);
        await entry.locator("summary").click();
        await expect(entry.getByText(item.reflectionQuestion)).toBeHidden();
      }
    }
    for (const sin of sins) await expect(page.getByRole("button", { name: new RegExp(`${sin.name}\\s+${values[sin.id]}`) })).toBeVisible();
    await expect(page.locator("svg[aria-label='七维人格倾向雷达图']")).toBeVisible();
    await page.evaluate(() => {
      const archiveWindow = window as Window & { __shareCardText?: string[]; __shareCardImages?: string[] };
      archiveWindow.__shareCardText = [];
      archiveWindow.__shareCardImages = [];
      const original = CanvasRenderingContext2D.prototype.fillText;
      const originalDraw = CanvasRenderingContext2D.prototype.drawImage;
      CanvasRenderingContext2D.prototype.fillText = function (text, ...args) {
        archiveWindow.__shareCardText?.push(String(text));
        return original.call(this, text, ...args);
      };
      CanvasRenderingContext2D.prototype.drawImage = function (image: CanvasImageSource, ...args: number[]) {
        if (image instanceof HTMLImageElement) archiveWindow.__shareCardImages?.push(image.src);
        return (originalDraw as (image: CanvasImageSource, ...coordinates: number[]) => void).call(this, image, ...args);
      };
    });
    const cardDownload = page.waitForEvent("download");
    await page.getByTestId("download-card").click();
    const card = await cardDownload;
    expect(card.suggestedFilename()).toContain(target.id);
    const cardFile = path.join(test.info().outputDir, card.suggestedFilename());
    await card.saveAs(cardFile);
    const cardPng = await readFile(cardFile);
    expect(cardPng.readUInt32BE(16)).toBe(1080);
    expect(cardPng.readUInt32BE(20)).toBe(1350);
    const canvasText = await page.evaluate(() => (window as Window & { __shareCardText?: string[] }).__shareCardText || []);
    expect(canvasText).toContain(`美德映照 · ${virtue.name}`);
    expect(canvasText.join("")).toContain(virtue.shortDescription);
    const canvasImages = await page.evaluate(() => (window as Window & { __shareCardImages?: string[] }).__shareCardImages || []);
    expect(canvasImages.some(image => image.endsWith(virtue.portraitPath))).toBe(true);
  }
});

test("skip reveal, refresh, and reduced motion remain usable", async ({ page }) => {
  const partial = Object.fromEntries(questions.slice(0, 34).map(q => [q.id, 0]));
  await page.goto("/");
  await page.evaluate(saved => localStorage.setItem("sins-answers", JSON.stringify(saved)), partial);
  await page.reload();
  await page.getByRole("button", { name: /开始探索/ }).click();
  await page.locator("button.option").first().click();
  await page.getByRole("button", { name: "生成我的档案" }).click();
  await expect(page.getByTestId("reveal-decrypt")).toBeVisible();
  await page.getByRole("button", { name: "跳过动画" }).click();
  await expect(page.locator("#result")).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "查看我的结果" }).click();
  await expect(page.locator("#result")).toBeVisible();
  await expect(page.getByTestId("virtue-profile")).toBeVisible();
  await expect(page.getByTestId("reveal-flow")).toHaveCount(0);

  await page.evaluate(() => { localStorage.clear(); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(saved => localStorage.setItem("sins-answers", JSON.stringify(saved)), partial);
  await page.reload();
  await page.getByRole("button", { name: /开始探索/ }).click();
  await page.locator("button.option").first().click();
  await page.getByRole("button", { name: "生成我的档案" }).click();
  await expect(page.locator("#result")).toBeVisible();
  await expect(page.getByTestId("reveal-flow")).toHaveCount(0);
});

function targetsTitle(id: SinId) { return ({ pride: "王冠支配者", envy: "镜中观测者", wrath: "灰烬审判者", gluttony: "欲望收藏家", sloth: "永夜漫游者", greed: "秩序收藏家", lust: "炽焰追逐者" } as const)[id]; }

function answersForTarget(target: SinId) {
  const answers = Object.fromEntries(questions.map(q => [q.id, 0])) as Record<number, number>;
  for (let round = 0; round < 5; round++) {
    for (const q of questions) {
      let bestIndex = answers[q.id];
      let bestMargin = Number.NEGATIVE_INFINITY;
      for (let index = 0; index < q.options.length; index++) {
        const result = scoreAnswers({ ...answers, [q.id]: index });
        const otherMaximum = Math.max(...sins.filter(s => s.id !== target).map(s => result.distribution[s.id]));
        const margin = result.distribution[target] - otherMaximum;
        if (margin > bestMargin) { bestMargin = margin; bestIndex = index; }
      }
      answers[q.id] = bestIndex;
    }
  }
  return answers;
}
