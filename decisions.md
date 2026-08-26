# Atelier Decisions

charter 변경급 사항은 charter.md에 직접 박고 git log로 추적한다. 이 문서는 *charter 변경이 아닌 운영 결정*만 박는다. 결정의 why가 핵심 — 향후 같은 결정을 다시 마주쳤을 때 reasoning trace.

대화 중 발생한 큰 frame shifts·결정 reasoning은 `~/.claude/plans/` 안의 plan 파일에 박힌다.

---

## Atelier 대시보드 — 요구사항 누적 (시점 미정)

대시보드는 **HTML 실시간 산출물**. 작업 시작 시 자동 보여서 *방향 흩어짐 + idea 잊어버림* 방지. charter §16 미해결.

수집된 요구사항 (누적):
- workflow 시각 디테일 — `meta/workflows/type1-external-service.html`이 첫 prototype 패턴
- **Phase 2 대기 상태 idea 가시화** — Stage 1 Pass했지만 Phase 2 미진행. CEO가 잊지 않게.
- **Hold idea 재검토 trigger** — Hold 사유와 함께 보임. 비슷한 idea 떠오를 때 reference.
- 각 idea의 현재 단계 한 눈 — Stage 1 / Stage 2 / Foundry 인계 후
- 진행 중 idea 작업 시작 시 자동 표시

박을 시점: 첫 실작업에서 idea가 *복수*가 되거나 *Phase 2 대기 idea가 누적*되어 *실제 잊어버림 마찰* 발생할 때.

---

## 2026-08-26 — 첫 실사이클 안건 = MyRosary (사내 시스템 Stage 2는 대기)

**결정**: Phase 1의 첫 실사이클 안건을 "사내 상품기획 시스템"에서 **묵주기도 앱(MyRosary)** 으로 바꾼다. 사내 시스템은 Stage 1 Pass 상태로 funnel에 보관하고, MyRosary 사이클 완주 후 두 번째 사이클로 Stage 2를 진행한다.

**why**: 첫째, MyRosary는 진짜 외부 사용자 대상 안건이라 방법론 검증의 자기참조 위험(시스템을 만들고 싶은 사람이 그 시스템의 필요를 평가)이 해소된다. 둘째, 원래 2026-05 부트스트래핑기의 의도(도구 시연 예제)를 완수한다 — 실측 결과 repo만 만들어진 채(커밋 1개) 멈춰 있었다. 셋째, 두 사이클의 경험 위에서 시스템 PRD를 쓰면 시스템이 더 정확해진다. 넷째, 이 결정이 만드는 "Stage 2 대기" 항목 자체가 대시보드 요구(위 절)의 첫 실데이터가 된다.

**범위 주의**: MyRosary의 Atelier 완료 지점은 PRD 패키지 freeze까지다. Foundry 인계는 Foundry→Template-repository 이관 완료 후(plan.md Phase 2 보류 조건).
