---
name: visualize-real-not-ascii
description: 시각화 도구(포지셔닝 맵·BMC·다이어그램)는 진짜 시각으로 박음. ASCII pre·placeholder grid 금지
metadata: 
  node_type: memory
  type: feedback
  originSessionId: db2e4c43-bf92-4936-801f-2d3c59c07967
---

**원칙**: 시각화 도구를 박을 때는 *진짜 시각* (좌표 기반 div·SVG·CSS grid 실제 채움)으로. ASCII 텍스트·빈 placeholder grid 금지.

**금지:**
- `<pre>` ASCII 다이어그램 (포지셔닝 맵·플로우차트 등) = "성의 없음" 인상
- BMC 등 frame을 빈 grid + "다음 단계" placeholder만 박음 = 빈약 인상
- "텍스트로 그린" 도형

**박는 룰:**
- **포지셔닝 맵** = position relative wrapper + position absolute dot. 4 사분면 시각·X/Y축 라벨·dot 크기·색 의미 분리
- **BMC** = 9 블록 모두 채움. 박힌 자료는 풍부하게·진짜 *빈* 블록은 명시적으로 "Stage 05에서 박음" 박음 + *추측 자료라도 있으면* 박음 (옅게)
- **플로우** = SVG arrow 또는 CSS flex/grid 실제 박스 연결
- **매트릭스** = 실제 표 cell 박힘 (●○◐도 의미)

**Why:** CEO 정정 (2026-05-30) *"포지셔닝 맵이랑 BMC는 왜이렇게 성의없게 만들어놓은거지?"* 시각화 도구는 *시각 자체가 가치*. 텍스트로 그리면 도구의 의미 죽음.

**How to apply:** Dashboard에 시각화 도구 박을 때 default 진짜 시각. ASCII로 시도하면 즉시 멈춤. 자료 부족하면 추측 자료라도 박음 (옅게).

관련: [[content-now-design-later]] [[section-header-prominence]] [[positioning-matrix-principles]]
