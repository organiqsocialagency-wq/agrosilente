import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const expectedRepository = "organiqsocialagency-wq/agrosilente";
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const brand = readFileSync(new URL("../src/lib/brand.ts", import.meta.url), "utf8");
assert.equal(pkg.name, "agrosilente", "Questo repository pubblica esclusivamente Agrosilente.");
assert.match(brand, /name:\s*"Agrosilente"/);
assert.doesNotMatch(brand, /Trullo Natalino/i);
if (process.env.GITHUB_REPOSITORY) {
  assert.equal(process.env.GITHUB_REPOSITORY, expectedRepository, "Repository di destinazione errato.");
}
if (process.argv.includes("--export")) {
  const html = readFileSync(new URL("../.next-export/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>Agrosilente — Dimore in Puglia<\/title>/);
  assert.doesNotMatch(html, /Trullo Natalino/i);
  assert.ok(html.includes("/agrosilente/images/agrosilente/"), "Percorsi delle fotografie errati.");
}
console.log("Identità verificata: Agrosilente → " + expectedRepository);
