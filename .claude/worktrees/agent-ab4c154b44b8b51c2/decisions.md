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
