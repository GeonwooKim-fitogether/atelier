#!/usr/bin/env node
// 묶음 4 게이트 — 06·07·08 의 통과 조건을 기계가 판정한다 (LLM 없음, 비용 없음)
//
// 왜 이 스크립트가 있나. 2026-09-05 에 mobile-rosary 07-b 가 교착에 빠졌다.
// 07-b(목업)의 통과 조건이 "06 의 디자인 시스템을 실제로 적용했다" 인데
// 06 산출물에 디자인 시스템 절이 아예 없었다. 적용할 대상이 없으니 통과도
// 반려도 판정할 수 없었고, 만드는 쪽은 매번 자기 기본값으로 그려 매번 반려됐다.
//
// 이 결함의 성질이 중요하다. **아무도 오류를 내지 않는다.** 06 문서는 멀쩡해
// 보이고, 07 은 시작할 수 있는 것처럼 보이며, 결함은 만든 뒤 사람이 볼 때에야
// 드러난다. 사람의 기억으로 막는 방식은 이미 실패했으므로(같은 자리에서 세 번),
// **단계에 들어가기 전에 기계가 앞 단계의 산출물이 실제로 있는지 재는** 자리가
// 필요하다. 이 스크립트가 그 자리다.
//
// 사용:
//   node .claude/skills/atelier-npi/bundle4/gate.mjs <idea-slug> [--json] [--strict]
//
// 기본은 보고(exit 0)다. `--strict` 를 붙이면 미통과 관문이 있을 때 exit 1 을 낸다.
//
// ── 이 스크립트가 하지 않는 것 (정직하게) ──────────────────────────────────
// 내용의 좋고 나쁨은 판정하지 않는다. 재는 것은 "있는가 · 이어져 있는가" 뿐이다.
//   · 목업이 아름다운가 → 사람(공방장)이 본다
//   · 받는 사이가 호흡에 맞는가 → 사람이 실제로 겪어 본다
//   · 와이어프레임의 배치가 옳은가 → 사람이 본다
// 기계가 잡는 것은 **빠짐**이다. 빠짐은 조용하고, 판단은 조용하지 않다.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const args = process.argv.slice(2);
const JSON_OUT = args.includes("--json");
const STRICT = args.includes("--strict");
const slug = args.find((a) => !a.startsWith("--"));

if (!slug) {
  console.error("사용: node .claude/skills/atelier-npi/bundle4/gate.mjs <idea-slug> [--json] [--strict]");
  process.exit(2);
}

const ROOT = join("idea", slug);
if (!existsSync(ROOT)) {
  console.error(`idea/${slug} 이 없다. 먼저 그 안건 폴더가 있어야 한다.`);
  process.exit(2);
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const firstExisting = (...paths) => paths.find((p) => existsSync(p)) || null;

// ── 입력 수집 ────────────────────────────────────────────────────────────────
const P = {
  meta: join(ROOT, "_meta.md"),
  s01: join(ROOT, "01-intake.md"),
  s05: join(ROOT, "05-prioritization.md"),
  s06: firstExisting(join(ROOT, "06-service-design.md"), join(ROOT, "06-service-planning.md")),
  proto: join(ROOT, "07-prototype"),
  s08: join(ROOT, "08-validation.md"),
};
P.brief = join(P.proto, "00-brief.md");
P.wire = join(P.proto, "a-wireframe.html");
P.mock = join(P.proto, "b-mockup.html");
P.refs = join(P.proto, "refs");

const T = {
  s05: read(P.s05) || "",
  s06: P.s06 ? read(P.s06) : "",
  brief: read(P.brief) || "",
  wire: read(P.wire) || "",
  s08: read(P.s08) || "",
};

// 이미지 파일을 폴더째 센다 (하위 폴더 포함)
const IMG = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
function countImages(dir) {
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) n += countImages(p);
    else if (IMG.has(extname(e).toLowerCase())) n++;
  }
  return n;
}

// 07-c(기능 프로토타입)는 이름이 자유롭다 — 폴더 안의 html 중 a-/b-/00- 이 아닌 것
function findFunctional() {
  if (!existsSync(P.proto)) return [];
  const out = [];
  const walk = (dir, depth = 0) => {
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      if (statSync(p).isDirectory()) {
        if (e === "refs" || e === "mockups") continue;
        if (depth < 2) walk(p, depth + 1);
      } else if (extname(e) === ".html" && !/^(a-wireframe|b-mockup|d-)/.test(e)) {
        out.push(p);
      }
    }
  };
  walk(P.proto);
  return out;
}
function findIntegrated() {
  if (!existsSync(P.proto)) return [];
  return readdirSync(P.proto).filter((e) => /^d-.*\.html$/.test(e)).map((e) => join(P.proto, e));
}

// ── 판정 헬퍼 ────────────────────────────────────────────────────────────────
const checks = [];
function check(gate, id, label, ok, detail, human = false) {
  checks.push({ gate, id, label, ok: ok === true, human, detail: detail || "" });
}

const has = (text, re) => (text ? re.test(text) : false);

// ── 관문 06 — 서비스 설계가 07 에 넘길 수 있는 상태인가 ──────────────────────
const S06_NAME = P.s06 ? P.s06.split("/").pop() : "(없음)";
check("06", "G06-1", "06 산출물이 있다", !!P.s06, P.s06 ? S06_NAME : "06-service-design.md 도 06-service-planning.md 도 없다");

const usIds = [...new Set((T.s06.match(/US-\d+/g) || []))];
check("06", "G06-2", "유저 스토리가 있다", usIds.length > 0, usIds.length ? `${usIds.length}개 — ${usIds.join(" ")}` : "US-01 형식의 스토리가 하나도 없다");

const gwt = (T.s06.match(/\*\*(Given|When|Then|And)\*\*|^\s*-\s*\*\*(Given|When|Then|And)\*\*/gim) || []).length;
check("06", "G06-3", "스토리에 Given·When·Then 이 붙어 있다", gwt >= 3, gwt ? `조건 ${gwt}줄` : "Given/When/Then 형식이 보이지 않는다");

check("06", "G06-4", "정보 구조(화면 목록)가 있다", has(T.s06, /정보\s*구조|화면\s*구성|내비게이션/), "화면이 무엇무엇인지 정한 절");

// 디자인 토큰 — 이번 교착의 원인. 다섯 항목을 각각 잰다.
const tokenBits = {
  "색": /색상|팔레트|바탕색|배경색|#[0-9a-fA-F]{6}/,
  "글자 크기": /타이포|글자\s*크기|폰트\s*크기|type\s*scale|글꼴/,
  "간격": /간격|여백|스페이싱|spacing/,
  "컴포넌트 상태": /빈\s*상태|비활성|눌림|로딩|오류\s*상태|컴포넌트\s*목록/,
  "모션": /모션|전환\s*속도|애니메이션|ms\b/,
};
const tokenSection = /디자인\s*(시스템|토큰)/.test(T.s06);
const tokenMissing = Object.entries(tokenBits).filter(([, re]) => !re.test(T.s06)).map(([k]) => k);
check(
  "06", "G06-5", "디자인 토큰 절이 있다",
  tokenSection && tokenMissing.length === 0,
  tokenSection
    ? (tokenMissing.length ? `절은 있으나 빠진 항목: ${tokenMissing.join(" · ")}` : "색·글자 크기·간격·컴포넌트 상태·모션 다섯 다 있다")
    : "디자인 시스템/토큰 절 자체가 없다 — 07-b 가 적용할 대상이 없다"
);

check("06", "G06-6", "톤 규칙(쓰지 않는 말)이 있다", has(T.s06, /쓰지\s*않는다|대신\s*쓴다|톤/), "문구 규칙 절");

// ── 관문 07-a — 와이어프레임 ────────────────────────────────────────────────
check("07-a", "G7A-1", "07 브리프가 있다", !!T.brief, P.brief);

const BRACKETS = ["제품 한 줄", "이 판이 답하려는 질문", "누가 쓰나", "화면 목록", "핵심 동작", "디자인 토큰", "레퍼런스", "전체 규격", "문구 규칙", "금지", "판정 기준"];
const briefMissing = BRACKETS.filter((b) => !T.brief.includes(`[${b}`));
check("07-a", "G7A-2", "브리프의 대괄호가 다 있다", T.brief && briefMissing.length === 0, briefMissing.length ? `빠진 절: ${briefMissing.join(" · ")}` : `${BRACKETS.length}개 절 모두 있다`);

const briefEmpty = [...T.brief.matchAll(/##\s*\[([^\]]+)\][^\n]*비어\s*있음/g)].map((m) => m[1]);
check("07-a", "G7A-3", "비어 있다고 표시된 절이 없다", T.brief && briefEmpty.length === 0, briefEmpty.length ? `아직 빈 절: ${briefEmpty.join(" · ")}` : "빈 절 없음");

check("07-a", "G7A-4", "와이어프레임 파일이 있다", !!T.wire, P.wire);

// 대조표 — 06 의 모든 US 가 와이어프레임에서 지목됐는가
const wireUs = new Set((T.wire.match(/US-\d+/g) || []));
const unmapped = usIds.filter((u) => !wireUs.has(u));
check(
  "07-a", "G7A-5", "모든 유저 스토리가 화면에 지목됐다",
  usIds.length > 0 && unmapped.length === 0,
  usIds.length === 0 ? "06 에 스토리가 없어 잴 수 없다" : (unmapped.length ? `지목되지 않은 스토리: ${unmapped.join(" ")}` : `${usIds.length}개 모두 지목됨`)
);

// 07-a 는 색을 쓰지 않는다 — 채도 있는 색이 들어갔는지 성긴 검사
const hexes = [...new Set((T.wire.match(/#[0-9a-fA-F]{6}/g) || []).map((h) => h.toLowerCase()))];
const chromatic = hexes.filter((h) => {
  const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
  return Math.max(r, g, b) - Math.min(r, g, b) > 24; // 무채색에서 충분히 벗어난 것
});
check("07-a", "G7A-6", "색을 쓰지 않았다 (회색 단계만)", T.wire ? chromatic.length === 0 : false, chromatic.length ? `채도가 있는 색 ${chromatic.length}개: ${chromatic.slice(0, 6).join(" ")}` : "무채색만 쓰였다");

// ── 관문 07-b — 목업 ────────────────────────────────────────────────────────
const refCount = countImages(P.refs);
check("07-b", "G7B-1", "레퍼런스 이미지가 있다 (3장 이상)", refCount >= 3, refCount ? `${refCount}장` : "refs/ 가 비어 있다 — 사람이 골라 넣어야 한다");
check("07-b", "G7B-2", "06 디자인 토큰이 준비됐다", checks.find((c) => c.id === "G06-5").ok, "G06-5 와 같은 조건");
check("07-b", "G7B-3", "목업 파일이 있다", existsSync(P.mock), P.mock);
check("07-b", "G7B-4", "공방장이 화면을 승인했다", false, "사람만 판정할 수 있다 — 기계는 재지 않는다", true);

// ── 관문 07-c — 기능 프로토타입 ─────────────────────────────────────────────
const funcs = findFunctional();
check("07-c", "G7C-1", "기능 프로토타입이 있다", funcs.length > 0, funcs.length ? funcs.join(" · ") : "도는 코드가 없다");
check("07-c", "G7C-2", "사람이 실제로 겪어 판정했다", false, "사람만 판정할 수 있다 — 기계는 재지 않는다", true);

// ── 관문 07-d — 통합 시제품 ─────────────────────────────────────────────────
const integ = findIntegrated();
const bOk = checks.filter((c) => c.gate === "07-b" && !c.human).every((c) => c.ok);
const cOk = checks.filter((c) => c.gate === "07-c" && !c.human).every((c) => c.ok);
check("07-d", "G7D-1", "07-b 와 07-c 가 둘 다 있다", bOk && cOk, `07-b ${bOk ? "있음" : "없음"} · 07-c ${cOk ? "있음" : "없음"}`);
check("07-d", "G7D-2", "통합 시제품 파일이 있다", integ.length > 0, integ.length ? integ.join(" · ") : "d-*.html 이 없다");

// ── 관문 08 — 검증 ──────────────────────────────────────────────────────────
const dOk = checks.filter((c) => c.gate === "07-d").every((c) => c.ok);
check("08", "G08-1", "07-d 없이 08 로 가지 않는다", dOk, dOk ? "통합 시제품이 있다" : "07-d 가 없다 — 지표가 나빠도 기능 탓인지 화면 탓인지 가릴 수 없다");
const metrics = (T.s05.match(/\d+\s*%/g) || []).length;
check("08", "G08-2", "접는 지표가 05 에 숫자로 있다", metrics >= 2, metrics ? `05 에서 백분율 ${metrics}개 발견` : "05 에 접는 지표 숫자가 없다");
check("08", "G08-3", "검증 산출물이 있다", existsSync(P.s08), P.s08);

// ── 출력 ────────────────────────────────────────────────────────────────────
const GATES = ["06", "07-a", "07-b", "07-c", "07-d", "08"];
const gateState = {};
for (const g of GATES) {
  const cs = checks.filter((c) => c.gate === g);
  const machine = cs.filter((c) => !c.human);
  gateState[g] = {
    pass: machine.every((c) => c.ok),
    waitingHuman: cs.some((c) => c.human),
    checks: cs,
  };
}
// 다음 한 걸음 — 통과하지 못한 첫 관문의 첫 미통과 항목
let next = null;
for (const g of GATES) {
  const bad = gateState[g].checks.find((c) => !c.ok && !c.human);
  if (bad) { next = { gate: g, id: bad.id, label: bad.label, detail: bad.detail }; break; }
}

if (JSON_OUT) {
  console.log(JSON.stringify({ idea: slug, gates: gateState, next }, null, 2));
  process.exit(STRICT && next ? 1 : 0);
}

const mark = (c) => (c.human ? "○" : c.ok ? "✓" : "✗");
console.log(`\n묶음 4 게이트 — idea/${slug}\n${"─".repeat(64)}`);
for (const g of GATES) {
  const s = gateState[g];
  const head = s.pass ? (s.waitingHuman ? "기계 검사 통과 · 사람 판정 대기" : "통과") : "미통과";
  console.log(`\n[관문 ${g}] ${head}`);
  for (const c of s.checks) {
    console.log(`  ${mark(c)} ${c.id}  ${c.label}`);
    if (c.detail) console.log(`      ${c.detail}`);
  }
}
console.log(`\n${"─".repeat(64)}`);
if (next) {
  console.log(`다음 한 걸음 — [관문 ${next.gate}] ${next.id} ${next.label}`);
  console.log(`  ${next.detail}`);
} else {
  console.log("기계가 잴 수 있는 관문은 모두 통과했다. 남은 것은 사람 판정(○)뿐이다.");
}
console.log("기호: ✓ 통과 · ✗ 미통과 · ○ 사람만 판정 가능 (기계가 재지 않는다)\n");

process.exit(STRICT && next ? 1 : 0);
