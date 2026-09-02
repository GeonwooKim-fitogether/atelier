# 07-b 후보 열 개 — 같은 엔진, 다른 구조와 껍데기

> 한 줄 요지: **`engine.js` 하나(77단계 · 상태 기계 · 지향별 자리 저장 · 음성 · 진동) 위에 껍데기 열 개(`g01`~`g10`)를 입혔다.** 엔진이 같아서 월드컵에서 이긴 부분을 후보 사이에 갈아 끼울 수 있다.

| 파일 | 무엇 |
|---|---|
| `engine.js` | 고정 부분. 06-prd §1 · 06-screen-spec 비화면 채널 · 06-screen-map 결함 2·5·7 처방(저장된 신비로 이어감 · 멈춤 상태 · 지향별 저장)이 들어 있다 |
| `g01-hub.html` ~ `g10-bento.html` | 껍데기 열 개. 장르는 [`../07-b-design-briefs.md`](../07-b-design-briefs.md)의 1~10 과 같다. `<script src="engine.js">` 로 엔진을 부른다 |
| `build.mjs` | 엔진을 인라인해 자체완결 파일을 `dist/` 에 만든다 (아티팩트 게시용) |
| `shots/` | 후보마다 네 순간(`open` · `mine` · `resume` · `done`) 스크린샷. `?demo=<순간>` 으로 그 상태를 바로 연다 |
| `worldcup.mjs` | 스크린샷과 아티팩트 링크를 모아 월드컵 화면 `worldcup.html` 을 만든다 (생성물은 커밋하지 않는다 — 926KB) |

```bash
node build.mjs        # dist/ 갱신
node worldcup.mjs     # worldcup.html 생성
```

**후보를 하나 더 넣을 때** — `gNN-이름.html` 을 만들고, 네 순간을 `?demo=` 로 렌더할 수 있게 하고, `worldcup.mjs` 의 `C` 배열에 한 줄을 더한다. 밖에서 받은 그림 후보(Stitch 등)는 `shots/` 에 네 장을 넣고 `url` 없이 같은 배열에 넣는다.
