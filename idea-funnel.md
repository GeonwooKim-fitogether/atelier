# Idea Funnel

Stage 1/2 진행한 idea들의 누적 history. Agent가 atelier-npi Skill 진행 결과로 자동 갱신한다.

각 idea의 상태 — Stage 1 Pass/Hold/Kill, Phase 2 대기, PRD freeze, Foundry 인계 후 — 가 시간순으로 박힌다. 향후 Dashboard에서 시각화 (decisions.md 참조).

---

## 2026-08-26 — internal-planning-system · Stage 1 **Pass** → **Stage 2 대기**

- 안건: 사내 상품기획 시스템 (Atelier 2단계 자신 — plan.md Phase 1의 안건)
- Stage 1 Pass: 2026-08-26, 판정자 CEO 김건우
- 근거 요약: 사내 흔적 3건(decisions.md 자기 기록 · charter §7의 우회 절차 명문화 · HTS 낡은 문서 경고) + 외부 흔적 문서. Depth = 주 단위·실제 차질(CEO 증언). 97일 공백은 CEO 확인으로 통증 증거에서 기각. 상세: [`stage-1/internal-planning-system/ideation.md`](./stage-1/internal-planning-system/ideation.md)
- Stage 2로 넘긴 제약: Kill Signal이 Depth를 정량화할 것 · 소규모 팀에 과잉인 도구가 되지 않을 것
- **Stage 2 대기 사유 (2026-08-26, CEO 순서 결정)**: 첫 실사이클 안건을 MyRosary로 정함 — 진짜 외부 사용자 안건으로 방법론을 먼저 검증하고, 두 사이클 경험 위에서 시스템 PRD를 쓴다. 이 항목이 funnel 최초의 "Stage 2 대기" 실데이터다(decisions.md 대시보드 요구가 예견한 상태).

## 2026-08-26 — myrosary · Stage 1 **Pass** → Stage 2 진행 중

- 안건: 묵주기도 앱. 2026-05~06 도구 시연 예제로 repo(GeonwooKim-fitogether/MyRosary)만 생성된 채 멈췄던 것을 CEO가 첫 실사이클로 지정.
- Stage 1 Pass: 2026-08-26, 판정자 CEO 김건우
- 통증 요지: 대중교통 등 자투리 시간에 기도하는데 실물(묵주·기도문) 휴대는 불편하고 기존 앱은 사용성이 나쁘며 발견도 어렵다. wedge = "내 페이스로, 진행이 기억되고, 준비가 필요 없는 이동 중 기도". 상세: [`stage-1/myrosary/ideation.md`](./stage-1/myrosary/ideation.md)
- Stage 2로 넘긴 제약: 기간형 Kill Signal · Moat&Wall에서 수익화 경고 정면 대응 · 이동 중 UX(한 손·저마찰·중단/재개)가 수용 기준 중심
- Stage 2 진행 (2026-08-26, CEO 부재 중 자율 진행 — decisions.md): **2A·2B·2C 초안 완료.** 방향성(`stage-2/myrosary/direction.md`) · PRD draft v0.1(`stage-2/myrosary/PRD.md`) · **클릭 가능 프로토타입과 목업 4장**(`stage-2/myrosary/prototype/index.html`, `mockups/`). 프로토는 렌더·클릭으로 F1(이어서 바치기)·F2(내 페이스) 수용 기준 재현을 실측 확인했다. 남은 것은 **2D freeze 루프** — CEO가 프로토를 직접 써 봐야 시작된다.
- 추인 대기 (질문 배치 D1~D6, 대시보드 결정 큐): 도구 세트 잠정 채택 · Moat&Wall 잠정 판정(제품 판돈) · Kill Signal 제안치(60%/2회) · 6월 기존 결과물 위치 · 프로토 사용(2D 시작) · MVP 개발 장소
