# 2026-06 작업물 회수 — 현황과 중요한 경고

> **한 줄 요지: 이 폴더에서 신뢰할 수 있는 파일은 `idea-inbox.md`와 `lessons-learned.md` 둘뿐이다. `CORRUPT-DO-NOT-USE/` 안의 파일들은 크기·형식 검사를 통과했지만 내용이 조용히 훼손됐으므로 원본으로 사용하면 안 된다.**

## 왜 회수가 실패했나 — 방법 자체에 결함이 있었다

2026-05~06 의 Atelier 작업물(MyRosary 기획 파이프라인, 운영 기준 문서군)은 GitHub 에 push 되지 않았고 Google Drive 에만 남아 있었다. 그것을 저장소로 회수하려 했다.

쓴 방법은 이랬다. Drive 도구가 파일을 base64(바이너리를 글자로 바꾼 표현) 문자열로 돌려주면, 그 문자열을 파일에 적어 `base64 -d` 로 디코드해 원본을 복원한다. 이론상 정확하다.

**그런데 그 base64 문자열을 파일에 적는 주체가 언어 모델이다.** 즉 모델이 수천~수만 글자의 무의미한 문자열을 한 글자도 틀리지 않고 재생산해야 하는데, 그것이 되지 않는다.

실측 결과:

| 원본 크기 | 결과 |
|---|---|
| 492 B | 정확 |
| 496 B | 정확 |
| 1,931 B | **크기·UTF-8 검사 통과. 그러나 "프로젝트"가 "프로젅트"로 바뀜** |
| 1,600 B | 크기 일치. 951번째 바이트가 깨져 UTF-8 로 열리지 않음 |
| 1,984 B | 크기 일치, UTF-8 유효. "4분면"이 "4북면"으로 바뀜 |
| 7,590 B | 실패 (7,614 B, UTF-8 깨짐) |
| 16,348 B | 실패 (16,351 B) |

**가장 위험한 것은 1,931 B 사례다.** base64 한 글자를 다른 글자로 바꾸면 디코드 결과의 길이는 그대로이고 UTF-8 도 유효한 채로 내용만 달라진다. 그래서 크기 검사와 형식 검사를 둘 다 통과한다. 자동 검사로는 잡을 수 없다.

유실 작업물의 백업 복구에서 **조용히 훼손된 파일은 회수하지 않은 것보다 나쁘다.** 다음 사람이 그것을 원본으로 믿고 그 위에 작업하기 때문이다. 그래서 시도본 전부를 `CORRUPT-DO-NOT-USE/` 로 격리했다.

## 지금 이 폴더의 상태

| 파일 | 상태 |
|---|---|
| `idea-inbox.md` (492 B) | **원본 정확.** 짧아서 전문을 눈으로 대조 확인함 |
| `lessons-learned.md` (496 B) | **원본 정확.** 같음 |
| `atelier-standard/_MANIFEST.tsv` | Drive 폴더의 파일 목록(이름·ID·크기). 회수 대상 목록이며 내용물이 아님 |
| `CORRUPT-DO-NOT-USE/` 6개 | **훼손 확인됨. 사용 금지.** 어떤 종류의 훼손인지 알기 위한 참고용으로만 남김 |

## 아직 Drive 에만 있는 것 (회수 대상)

두 폴더에 걸쳐 약 60개다.

**폴더 A — MyRosary 기획 파이프라인** (Drive ID `137_XEYihIk5ZZ7kY_z6Sx8nvSeBbbZZQ` 및 인접):
- `v2/` 세트 4개 — `01-intake.md` · `02-research.md` · `03-analysis.md` · `_meta.md` (2026-05-29~31, 최신본)
- `v1/` 세트 4개 — 같은 이름 (2026-05-27~28, 백업본)
- `example-business-plan-my-rosary.html` (16,348 B) — 9챕터 사업 기획서
- `node-graph.html` (32,967 B) — 그래픽
- `type1-external-service.html` (175,330 B)
- 운영 문서 — `idea-funnel.md` · `SESSION-HANDOFF.md` · `_restore_db2e4c43.md` · `category-role-time-separation.md`

**폴더 B — Atelier 운영 기준 문서군** (Drive ID `1zB6RzIB1qf0v8lxr7msVsjGLaLH13pso`, md 약 44개):
시각화 규칙(`visualize-real-not-ascii.md` · `strategy-visualization-mandate.md` · `positioning-matrix-principles.md` · `positioning-map-fm.md`), 프레임 정의(`atelier-stage-framework.md` · `book-frame-stage-mapping.md` · `persona-book-frame.md` · `bmc-all-blocks-filled.md` · `category-king-deconstruction.md` · `entry-sequence-strategy.md`), 게이트(`bundle-convergence-gate.md` · `bundle-completion-frame.md` · `bundle-3-business-completion.md`), 보고 어투(`MEMORY.md` · `dashboard-ceo-tone.md` · `human-tone-reporting.md`) 등. 전체 목록은 `atelier-standard/_MANIFEST.tsv`.

**폴더 C — atelier 저장소 루트의 옛 판본** (Drive ID `1bovB52QLE3zyAR6qj-kg4k4WMGA4Nlb3`):
- `decisions.md` (27,511 B) · `charter.md` (19,828 B) · `README.md` (1,774 B)
  → 지금 GitHub 의 것보다 훨씬 크다. 6월 판본이 별도로 존재한다는 뜻이므로 대조가 필요하다.

## 어떻게 해야 회수되나

**언어 모델이 바이트를 옮기지 않는 경로가 필요하다.** 다음 중 하나다.

1. **사람이 Drive 웹에서 폴더를 통째로 내려받아 저장소에 넣는다.** 가장 확실하고 빠르다.
2. **Drive API 직접 호출을 허용한다.** `curl -H "Authorization: Bearer <Drive 스코프 토큰>" "https://www.googleapis.com/drive/v3/files/<id>?alt=media" -o <파일>` 형태. 이 환경의 `CLOUDSDK_AUTH_ACCESS_TOKEN` 으로는 401 이 나므로(Drive 스코프 없음) 별도 토큰이 필요하다.
3. **`rclone` 이나 `gdrive` CLI 로 폴더 동기화.**

어느 쪽이든 공통점은 하나다 — **파일 내용이 모델의 출력을 거치지 않는다.**
