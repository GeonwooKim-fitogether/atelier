// 후보 껍데기(gNN-*.html)에 engine.js 를 인라인해 자체완결 파일을 dist/ 에 만든다.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const engine = readFileSync(join(here, "engine.js"), "utf8");
mkdirSync(join(here, "dist"), { recursive: true });
const files = readdirSync(here).filter(f => /^d\d\d-.*\.html$/.test(f)).sort();
for (const f of files) {
  const src = readFileSync(join(here, f), "utf8");
  if (!src.includes('<script src="engine.js"></script>')) { console.error(`[candidates] ${f}: engine.js 태그가 없다`); process.exit(1); }
  writeFileSync(join(here, "dist", f), src.replace('<script src="engine.js"></script>', () => `<script>${engine}</script>`));
}
console.log(`[candidates] ${files.length}개 조립 → dist/`);
