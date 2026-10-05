import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { test } from "node:test";
import ts from "typescript";

process.env.TZ = "Europe/Rome";
const directory = mkdtempSync(join(tmpdir(), "trullo-natalino-booking-"));
process.on("exit", () => rmSync(directory, { recursive: true, force: true }));
for (const name of ["assets", "brand", "booking"]) {
  const source = readFileSync(
    new URL(`../src/lib/${name}.ts`, import.meta.url),
    "utf8",
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  writeFileSync(join(directory, `${name}.js`), outputText);
}
const require = createRequire(import.meta.url);
const { validateStay, nextDate, stayNights, whatsappHref } = require(
  join(directory, "booking.js"),
);
const valid = {
  arrival: "2026-10-24",
  departure: "2026-10-26",
  adults: 2,
  children: 0,
};
const today = "2026-10-05";

test("accepts a future stay and an arrival today", () => {
  assert.equal(validateStay(valid, today), null);
  assert.equal(validateStay({ ...valid, arrival: today }, today), null);
});
test("rejects missing, past, reversed and same-day dates", () => {
  for (const change of [
    { arrival: "" },
    { departure: "" },
    { arrival: "2026-10-04" },
    { departure: "2026-10-23" },
    { departure: valid.arrival },
  ]) {
    assert.ok(validateStay({ ...valid, ...change }, today));
  }
});
test("rejects invalid calendar dates and partial date input", () => {
  for (const arrival of [
    "2027-02-29",
    "2026-04-31",
    "2026-13-05",
    "2026-2-05",
    "not-a-date",
  ]) {
    assert.ok(
      validateStay({ ...valid, arrival, departure: "2028-03-01" }, today),
    );
  }
});
test("counts nights by calendar days across daylight-saving changes", () => {
  assert.equal(stayNights(valid), 2);
  assert.equal(
    stayNights({ ...valid, arrival: "2027-03-27", departure: "2027-03-29" }),
    2,
  );
  assert.equal(
    stayNights({ ...valid, arrival: "2028-02-28", departure: "2028-03-01" }),
    2,
  );
});
test("calculates checkout minima across month, year and leap-day boundaries", () => {
  assert.equal(nextDate("2026-12-31"), "2027-01-01");
  assert.equal(nextDate("2028-02-28"), "2028-02-29");
  assert.equal(nextDate("2028-02-29"), "2028-03-01");
  assert.equal(nextDate("2027-02-29"), "");
});
test("validates guest counts without assuming room capacity", () => {
  for (const change of [
    { adults: 0 },
    { adults: 15 },
    { adults: 1.5 },
    { children: -1 },
    { children: 7 },
    { children: 0.5 },
  ]) {
    assert.ok(validateStay({ ...valid, ...change }, today));
  }
  assert.equal(
    validateStay({ ...valid, adults: 14, children: 6 }, today),
    null,
  );
});
test("encodes dates and party size for the verified WhatsApp recipient", () => {
  const url = new URL(whatsappHref({ ...valid, adults: 3, children: 2 }));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/393313021588");
  const message = url.searchParams.get("text");
  assert.match(message, /Trullo Natalino/);
  assert.match(message, /Arrivo: 24 ottobre 2026/);
  assert.match(message, /Partenza: 26 ottobre 2026/);
  assert.match(message, /Adulti: 3\nBambini: 2 \(età da comunicare\)/);
});
