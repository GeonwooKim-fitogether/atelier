// refs/01-sacred-images/ 의 원본에서 스튜디오 로고·서명을 잘라내 v5/art/ 에 앱용 자산을 만든다.
//
// 원본을 그대로 두는 이유가 둘 있다. 첫째, refs/ 는 공방장이 고른 레퍼런스 묶음이라
// 원본대로 남아야 한다. 둘째, 같은 경로를 다른 브랜치도 갖고 있어 파일을 고치면
// 머지에서 충돌한다. 그래서 앱이 쓰는 자산은 이 폴더에서 따로 만든다.
//
// 로고는 전부 그림 아래쪽 띠에 있고, 인물은 위 2/3 에 있다. 그래서 로고 위에서
// 잘라 내면 구도를 잃지 않고 표식만 사라진다. 아래 값은 "위에서 몇 %를 남기나"다.
// 눈으로 확인해 정한 값이며, 표식이 없는 그림은 목록에 없고 그대로 복사된다.
import { execFileSync } from "node:child_process";
import { readdirSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, "..", "refs", "01-sacred-images");
const OUT = join(here, "art");

const KEEP = {
  "01_Mary_Single": 0.815,          // 하단 중앙 AG ANGELS
  "02_Mary_and_Child": 0.855,       // 하단 우측 AG · ANGELA GIL
  "04_Cross": 0.855,                // 하단 우측 AG
  "11_Mary_Rosary_White_Gold": 0.855, // 하단 우측 AG
  "12_Mary_Child_Neutral": 0.855,   // 하단 좌측 AG ANGELS
  "13_Mosaic_Jesus_Water": 0.925,   // 하단 우측 작가 사인
};

// 09_Color_Jesus 는 여기 없다. Adobe Stock 워터마크가 그림 전면에 반복돼 있어
// 잘라 내는 것으로 지울 수 없다. 풀에서 뺀다 (index.html 의 ART 배열에도 없다).
const EXCLUDE = new Set(["09_Color_Jesus"]);

mkdirSync(OUT, { recursive: true });
const py = `
import sys, os
from PIL import Image
src, out, keep = sys.argv[1], sys.argv[2], float(sys.argv[3])
im = Image.open(src)
if keep < 1.0:
    im = im.crop((0, 0, im.width, round(im.height * keep)))
im.save(out, "JPEG", quality=92, optimize=True, progressive=True)
print(f"{os.path.basename(out)} {im.width}x{im.height}")
`;

let cropped = 0, copied = 0;
for (const f of readdirSync(SRC).filter((n) => n.endsWith(".jpg")).sort()) {
  const name = f.slice(0, -4);
  if (EXCLUDE.has(name)) continue;
  const keep = KEEP[name] ?? 1.0;
  const line = execFileSync("python3", ["-c", py, join(SRC, f), join(OUT, f), String(keep)]).toString().trim();
  if (keep < 1.0) { cropped++; console.log("  잘라냄  " + line); } else { copied++; }
}
console.log(`[art] 표식 잘라낸 것 ${cropped}장 · 그대로 옮긴 것 ${copied}장 · 제외 ${EXCLUDE.size}장 (09 워터마크)`);
