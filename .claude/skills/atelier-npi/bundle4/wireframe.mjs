#!/usr/bin/env node
// 07-a 와이어프레임 엔진 — spec(JSON) 을 넣으면 매번 같은 모양의 HTML 이 나온다
//
// 왜 엔진인가. 07-a 를 세션마다 손으로 그리면 안건마다 모양이 달라지고, 색을
// 쓰지 않는다는 규칙도 그때그때 지켜진다. 고정 엔진에 내용만 갈아 끼우면
// **모양이 흔들릴 자리가 없어진다.** 이 저장소가 integration-board 와
// progress-dashboard 에서 이미 쓰는 방식이다 (고정 엔진 + config + data).
//
// 사용:
//   node .claude/skills/atelier-npi/bundle4/wireframe.mjs <idea-slug>
//
// 읽는 것: idea/<slug>/07-prototype/a-wireframe.spec.json
// 쓰는 것: idea/<slug>/07-prototype/a-wireframe.html
//
// ── 이 엔진이 하지 않는 것 (정직하게) ──────────────────────────────────────
// **유저 플로 도해는 그리지 않는다.** 분기가 있는 흐름의 자동 배치는 사람이
// 손으로 놓는 것보다 나은 결과를 내기 어렵다. 대신 spec 의 `flowSvg` 가 가리키는
// SVG 파일을 그대로 끼워 넣고, 파일이 없으면 **없다는 사실을 화면에 남긴다**
// (조용히 빈 자리로 두지 않는다). 도해의 기호 규칙은 책 5-2 를 따른다 —
// 둥근 사각형은 시작과 끝, 직사각형은 화면과 동작, 마름모는 분기.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];
if (!slug) {
  console.error("사용: node .claude/skills/atelier-npi/bundle4/wireframe.mjs <idea-slug>");
  process.exit(2);
}

const PROTO = join("idea", slug, "07-prototype");
const SPEC = join(PROTO, "a-wireframe.spec.json");
const OUT = join(PROTO, "a-wireframe.html");
const TPL = join(HERE, "wireframe-template.html");

if (!existsSync(SPEC)) {
  console.error(`${SPEC} 이 없다. spec 을 먼저 만든다 (서식은 같은 폴더의 schema.md).`);
  process.exit(2);
}

const spec = JSON.parse(readFileSync(SPEC, "utf8"));
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// 본문에는 <strong>·<code> 정도만 허용한다 (spec 이 마크업을 조금 쓸 수 있게)
const rich = (s) => String(s ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/`(.+?)`/g, "<code>$1</code>");

// ── 화면 한 장 ──────────────────────────────────────────────────────────────
// element: { label, flex, style: plain|solid|dashed|"", bars: ["w95","w50"], prov: true, row: [el, el] }
function renderEl(el) {
  if (el.grow) return `<div class="grow"${el.flex ? ` style="flex:0 0 ${el.flex}%"` : ""}></div>`;
  if (el.row) return `<div class="row"${el.flex ? ` style="flex:0 0 ${el.flex}%"` : ""}>${el.row.map(renderEl).join("")}</div>`;
  const cls = ["wfbox", el.style || ""].filter(Boolean).join(" ");
  const style = el.flex ? ` style="flex:0 0 ${el.flex}%"` : "";
  const prov = el.prov ? `<span class="prov">잠정</span>` : "";
  const bars = (el.bars || []).map((w) => `<div class="bar${/^t/.test(w) ? " thin" : ""} ${w.replace(/^t/, "")}"></div>`).join("");
  return `<div class="${cls}"${style}>${prov}<span class="lbl">${esc(el.label || "")}</span>${bars}</div>`;
}

// 시트 화면(아래에서 올라오는 반쪽 화면)은 원형이 따로 있다.
// `sheet: true` 를 주면 요소들이 흐린 배경 위 시트 안에 담긴다.
function renderBody(s) {
  const els = (s.elements || []).map(renderEl).join("\n            ");
  if (!s.sheet) return els;
  return `<div class="sheetzone">
              <div class="dim"></div>
              <div class="sheet">
                <div class="handle"></div>
                ${(s.elements || []).map(renderEl).join("\n                ")}
              </div>
            </div>`;
}

const screens = (spec.screens || []).map((s, i) => `
        <div class="screen">
          <div class="cap"><span>화면 ${i + 1} / ${spec.screens.length}</span><b>${esc(s.name)}</b></div>
          <div class="phone">
            <div class="notch"></div>
            ${renderBody(s)}
          </div>
          <p class="desc">${rich(s.desc)}</p>
        </div>`).join("\n");

// ── 대조표 ──────────────────────────────────────────────────────────────────
const xref = (spec.xref || []).map((r) =>
  `<tr><td>${esc(r.us)}</td><td>${esc(r.cond)}</td><td class="scr">${esc(r.screen)}</td></tr>`).join("\n      ");
const unmapped = (spec.xref || []).filter((r) => !r.screen || /없음/.test(r.screen));
const xrefNote = spec.xrefNote
  ? `<p>${rich(spec.xrefNote)}</p>`
  : (unmapped.length
      ? `<p><strong>화면을 찾지 못한 조건이 ${unmapped.length}개다.</strong> 화면이 아니라 타이밍이나 소리처럼 눈에 보이지 않는 것이면 07-c 가 확인할 항목이고, 그렇지 않으면 화면이 빠진 것이다.</p>`
      : `<p><strong>모든 조건이 자리를 찾았다.</strong></p>`);

// ── 발견 ────────────────────────────────────────────────────────────────────
const findings = (spec.findings || []).length ? `
  <section>
    <div class="sec-head"><span class="eyebrow">4 · 발견</span><h2>06 이 정하지 않은 것 ${spec.findings.length}</h2></div>
    <p>그리는 동안 드러난 것이다. 와이어프레임에서는 잠정으로 정해 두었고, 06 에서 확정해야 07-b 가 흔들리지 않는다. 판돈이 큰 것부터 적었다.</p>
    <div class="finds">
      ${spec.findings.map((f) => `<div class="find">
        <span class="q">${esc(f.tag)}</span>
        <b>${esc(f.title)}</b>
        <p>${rich(f.body)}</p>
        ${f.prov ? `<p class="prov-note">잠정 결정: ${rich(f.prov)}</p>` : ""}
      </div>`).join("\n      ")}
    </div>
  </section>` : "";

// ── 판정표 ──────────────────────────────────────────────────────────────────
const defaultVerdict = [
  { cond: "화면 목록이 닫혔다", state: `화면 ${(spec.screens || []).length}장` },
  { cond: "모든 Given·When·Then 이 지목된다", state: `조건 ${(spec.xref || []).length}개 중 ${(spec.xref || []).length - unmapped.length}개가 화면을 찾았다` },
  { cond: "색을 쓰지 않았다 (회색 단계만)", state: "엔진이 무채색 토큰만 쓴다" },
  { cond: "각 와이어프레임 아래 기능 설명", state: `${(spec.screens || []).filter((s) => s.desc).length}장에 설명이 있다` },
];
const verdict = (spec.verdict || defaultVerdict).map((v) =>
  `<tr><td>${esc(v.cond)}</td><td>${rich(v.state)}</td></tr>`).join("\n      ");

// ── 유저 플로 ───────────────────────────────────────────────────────────────
let flow;
const flowPath = spec.flowSvg ? join(PROTO, spec.flowSvg) : null;
if (flowPath && existsSync(flowPath)) {
  flow = `<figure>
        ${readFileSync(flowPath, "utf8").trim()}
        <figcaption>${rich(spec.flowCaption || "기호는 책 5-2 를 따랐다. 둥근 사각형은 시작과 끝, 직사각형은 화면과 동작, 마름모는 분기다.")}</figcaption>
      </figure>`;
} else {
  flow = `<figure>
        <div class="wfbox dashed" style="padding:28px;text-align:center">
          <span class="lbl">유저 플로 도해가 아직 없다 — ${esc(spec.flowSvg || "a-flow.svg")} 를 만들어 spec 의 flowSvg 에 적는다</span>
        </div>
        <figcaption>이 엔진은 흐름 도해를 자동으로 그리지 않는다. 분기가 있는 배치는 손으로 놓는 편이 낫기 때문이다. 없으면 없다고 남긴다.</figcaption>
      </figure>`;
}

// ── 조립 ────────────────────────────────────────────────────────────────────
const lead = (spec.lead || []).map((p) => `<p>${rich(p)}</p>`).join("\n      ");
const html = readFileSync(TPL, "utf8")
  .replaceAll("__TITLE__", esc(spec.title || `${slug} 화면 설계도`))
  .replace("__EYEBROW__", esc(spec.eyebrow || `${slug} ${spec.version || ""} · 07-a 산출물`))
  .replace("__LEAD__", lead)
  .replace("__FLOW__", flow)
  .replaceAll("__NSCREENS__", String((spec.screens || []).length))
  .replace("__SCREENS__", screens)
  .replace("__XREF__", xref)
  .replace("__XREFNOTE__", xrefNote)
  .replace("__FINDINGS__", findings)
  .replace("__VERDICT__", verdict)
  .replace("__FOOTER__", rich(spec.footer || "07-a 산출물이다. 다음은 07-b 목업이며, 시작 조건은 06 의 디자인 토큰 절과 `07-prototype/refs/` 의 레퍼런스 이미지다."));

writeFileSync(OUT, html);
console.log(`${OUT} 생성 — 화면 ${(spec.screens || []).length}장 · 대조 ${(spec.xref || []).length}줄 · 발견 ${(spec.findings || []).length}건${flowPath && existsSync(flowPath) ? " · 흐름 도해 있음" : " · 흐름 도해 없음"}`);
