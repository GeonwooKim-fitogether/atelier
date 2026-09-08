/* ══════════════════════════════════════════════════════════════════════════
   build.mjs — index.html 을 자체완결 단일 파일로 굽는다.

   무엇을 하나
     성화 17장을 압축해 data-URI 로 바꾸고, index.html 안의 그림 참조를
     전부 그 문자열로 바꿔 dist/index.html 하나를 만든다. 그 파일은 폴더
     없이 혼자 열리므로 아티팩트로 그대로 게시할 수 있다.

   무엇을 하지 않나
     refs/01-sacred-images/ 의 원본은 건드리지 않는다. 압축은 아티팩트용 사본에만
     적용되고, 원본은 읽기만 한다. 폰트도 인라인하지 않는다 —
     Google Fonts CDN 은 아티팩트에서 허용된 출처다.

   쓰는 법
     node build.mjs
   ══════════════════════════════════════════════════════════════════════════ */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(HERE, "index.html");
const ART_DIR = path.join(HERE, "art");   // 앱 자산 폴더 (clean-art.mjs 가 만든다)
const DIST = path.join(HERE, "dist");

/* 압축 기준 — 아티팩트 한 장에 열일곱 장을 담아야 하므로 폭을 줄인다.
   가장 넓게 쓰이는 슬롯이 390px 이라 760px 이면 2배 해상도까지 덮는다. */
const MAX_W = 760, QUALITY = 78;

const PY = `
import sys, glob, os
from PIL import Image
src, dst, maxw, q = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
os.makedirs(dst, exist_ok=True)
for f in sorted(glob.glob(os.path.join(src, "*.jpg"))):
    im = Image.open(f).convert("RGB")
    if im.size[0] > maxw:
        im = im.resize((maxw, round(im.size[1] * maxw / im.size[0])), Image.LANCZOS)
    out = os.path.join(dst, os.path.basename(f))
    im.save(out, "JPEG", quality=q, optimize=True, progressive=True)
    print(os.path.basename(f), os.path.getsize(f), os.path.getsize(out), sep="\\t")
`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rosary-art-"));
console.log(`성화 압축 중 (최대 폭 ${MAX_W}px · 품질 ${QUALITY} · progressive)`);
const rows = execFileSync("python3", ["-c", PY, ART_DIR, tmp, String(MAX_W), String(QUALITY)],
  { encoding: "utf8" }).trim().split("\n");

let before = 0, after = 0;
const inline = {};
for (const row of rows) {
  const [name, a, b] = row.split("\t");
  before += +a; after += +b;
  const key = name.replace(/\.jpg$/, "");
  inline[key] = "data:image/jpeg;base64," + fs.readFileSync(path.join(tmp, name)).toString("base64");
}
const b64 = Object.values(inline).reduce((n, s) => n + s.length, 0);
console.log(`  원본 ${(before / 1024).toFixed(0)}KB  ->  압축 ${(after / 1024).toFixed(0)}KB` +
            `  ->  base64 ${(b64 / 1024).toFixed(0)}KB   (${rows.length}장)`);

let html = fs.readFileSync(SRC, "utf8");

/* 1. 처음 그려지는 화면에 박혀 있는 상대 경로를 data-URI 로 바꾼다 */
let swapped = 0;
html = html.replace(/(?:\.\.\/)?art\/([A-Za-z0-9_]+)\.jpg/g, (m, key) => {
  if (!inline[key]) throw new Error("압축본에 없는 그림: " + key);
  swapped++; return inline[key];
});

/* 2. 나머지(회전으로 바뀌는 그림)는 표를 통째로 넣어 준다 */
const table = `<script>window.__ART_INLINE=${JSON.stringify(inline)};</script>\n`;
const anchor = "<script>\n/* ═";
if (!html.includes(anchor)) throw new Error("앱 스크립트 시작 지점을 찾지 못했습니다");
html = html.replace(anchor, table + anchor);

fs.mkdirSync(DIST, { recursive: true });
const out = path.join(DIST, "index.html");
fs.writeFileSync(out, html);
fs.rmSync(tmp, { recursive: true, force: true });

console.log(`정적 참조 ${swapped}곳을 인라인으로 바꿨고, 회전용 표 ${Object.keys(inline).length}장을 넣었습니다.`);
console.log(`나온 파일: ${out}  (${(fs.statSync(out).size / 1024 / 1024).toFixed(2)} MB)`);
