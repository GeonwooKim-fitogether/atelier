#!/usr/bin/env node
// 기획 현황판 조립기 — 껍데기(shell.html) + 카드 조각(cards/*.html)을 합쳐
// 정본 현황판 HTML 하나를 만든다.
//
// 왜 이 파일이 있나. 정본 현황판은 원래 300KB짜리 한 덩어리 HTML이었고,
// 갱신하려면 그 덩어리를 열어야 해서 아무도 갱신하지 않았다(2026-08-30 사고).
// 이제 세션은 카드 한 장(수 KB)만 고치고 이 스크립트를 돌린다.
//
// 쓰는 법
//   node workflows/board/build.mjs           조립해서 정본 HTML을 다시 쓴다
//   node workflows/board/build.mjs --check   다시 쓰지 않고, 현재 정본이 조각들과
//                                            일치하는지만 본다 (다르면 종료코드 1)
//
// 의존성 없음. Node 18 이상.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const conf = JSON.parse(fs.readFileSync(path.join(HERE, "board.json"), "utf8"));
const shell = fs.readFileSync(path.join(HERE, "shell.html"), "utf8");
const OUT = path.join(ROOT, conf.output);
const checkOnly = process.argv.includes("--check");

const strip = (h) => h.replace(/<[^>]+>/g, "").trim();
const pick = (card, re) => { const m = card.match(re); return m ? m[1] : null; };

let pieces = [];
let problems = [];

for (const c of conf.cards) {
  const file = path.join(HERE, "cards", `${c.id}.html`);
  if (!fs.existsSync(file)) { problems.push(`카드 파일이 없다: cards/${c.id}.html`); continue; }
  const card = fs.readFileSync(file, "utf8");

  // 목차(board.json)가 카드 내용과 어긋나지 못하게 한다 —
  // 목차만 고치고 카드를 안 고치면 여기서 걸린다.
  const stage = pick(card, /data-stage="([^"]*)"/);
  const name  = pick(card, /<span class="stage-card-name">([\s\S]*?)<\/span>/);
  const stat  = pick(card, /<span class="stage-card-status[^"]*">([\s\S]*?)<\/span>/);
  if (stage !== c.id)              problems.push(`${c.id}: data-stage가 "${stage}"로 다르다`);
  if (name && strip(name) !== c.name)   problems.push(`${c.id}: board.json의 name이 카드와 다르다\n    목차: ${c.name}\n    카드: ${strip(name)}`);
  if (stat && strip(stat) !== c.status) problems.push(`${c.id}: board.json의 status가 카드와 다르다\n    목차: ${c.status}\n    카드: ${strip(stat)}`);

  pieces.push((c.lead ?? "") + card);
}

if (problems.length) {
  console.error("[board] 목차와 카드가 어긋난다:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

const html = shell.replace("{{CARDS}}", () => pieces.join(""));
const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : null;

if (checkOnly) {
  if (current === html) { console.log(`[board] 정본이 조각들과 일치한다 (${conf.cards.length}장)`); process.exit(0); }
  console.error(`[board] 정본이 조각들과 다르다. 'node workflows/board/build.mjs'를 돌려 다시 만들어야 한다.`);
  process.exit(1);
}

fs.writeFileSync(OUT, html);
const same = current === html;
console.log(`[board] 카드 ${conf.cards.length}장 조립 → ${conf.output} (${html.length.toLocaleString()}자)`);
console.log(`[board] 이전 파일과 ${same ? "완전히 같다 — 분리가 무손실임이 확인됐다" : "다르다 (내용이 바뀌었다)"}`);
