// dist/*.html 를 아티팩트용으로 벗긴다 — 아티팩트는 doctype/head/body 를 스스로 씌우므로
// <title>·<link>·<style> 만 앞에 두고 그 뒤에 body 안쪽을 그대로 붙인다.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path"; import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(here, "art"), { recursive: true });
const files = readdirSync(join(here, "dist")).filter(f => /^[de]\d\d-.*\.html$/.test(f)).sort();
for (const f of files) {
  const src = readFileSync(join(here, "dist", f), "utf8");
  const head = src.slice(src.indexOf("<head>") + 6, src.indexOf("</head>"));
  const body = src.slice(src.indexOf("<body") === -1 ? 0 : src.indexOf(">", src.indexOf("<body")) + 1, src.lastIndexOf("</body>"));
  const keep = head.replace(/<meta[^>]*>/g, "").trim();
  writeFileSync(join(here, "art", f), keep + "\n" + body.trim() + "\n");
}
console.log(`[strip] ${files.length}개 → art/`);
