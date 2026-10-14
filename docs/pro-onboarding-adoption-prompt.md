# Pro Onboarding Adoption Prompt

A prompt to paste into an app's session to add Pro onboarding with this
package. Replace `<앱 이름>` and keep the rest. The API reference is
`docs/pro-onboarding.md`; the reference implementation is Post Black Belt
(`/Users/skyu/Desktop/projects/post-blackbelt`, `docs/product-specs/pro-guide.md`).

---

```md
<앱 이름>에 Pro 온보딩을 추가하려고 해. 구독자가 Pro 기능을 실제로 써보게 해서
트라이얼 → 유료 전환을 높이는 게 목적이야. UI는 pabal-expo-paywall-ui 패키지의
공통 컴포넌트를 쓰고, 앱에는 설정·근거·이동·저장·분석만 둬.

## 먼저 읽을 것
- 패키지 문서(패키지 레포): /Users/skyu/Desktop/projects/pabal-expo-paywall-ui/
  docs/pro-onboarding.md, docs/profile.md. 플레이그라운드 /profile-onboarding에서
  화면을 미리 볼 수 있다.
- 참고 구현(Post Black Belt): /Users/skyu/Desktop/projects/post-blackbelt
  - docs/product-specs/pro-guide.md (결정과 이유)
  - src/constants/pro-guide-constants.js, pro-onboarding-constants.js
  - src/hooks/subscription/useProChecklist.js, useProOnboardingGuide.js,
    useProGuide.js, useProFeatureEvidence.js, useProFeatureGuideEvidence.js
  - src/utils/pro-guide-fn.js, pro-guide-store.js, subscription-plan-fn.js
  - src/components/pro-guide/ (홈 카드, 마이페이지 진입점)
  - src/screens/settings/AdminPurchaseCompletePreview.js
- 이 앱의 구독 화면, 권한(Pro 기능 목록), 분석 이벤트, 로컬 저장소 구조

PBB 코드를 복사하지 말고 이 앱의 구조와 패턴에 맞춰 같은 결정을 다시 내려.

## 1단계: 제안 (구현 전에 나한테 확인받기)
코드를 고치기 전에 아래를 표로 제안해줘. 내가 승인하면 구현해.
1. 기능 가이드 항목과 섹션: 구독자가 찾아서 써봐야 하는 Pro 기능(행동이나
   화면)만. 한도·광고 제거 같은 항상 켜진 혜택은 혜택 표에만 둔다.
   항목마다 제목, 섹션, 이동할 화면, 설명이 필요한지, 배지(예: AI)가 필요한지.
2. "여기부터 시작하세요" 체크리스트(핵심 미션) 5~6개: 10초 안에 Pro가 체감되는
   것부터(테마·아이콘 같은 것), 앱의 핵심 행동, 위젯, 돌아보기 기능 순.
   분석 데이터(Mixpanel 등)로 트라이얼 후 남은 사용자가 많이 쓴 기능이 있으면
   근거로 써.
3. 미션·항목별 "사용함" 근거: 아래 규칙으로 어떻게 판단할지.
4. 홈 미션 카드, 마이페이지(설정) 진입점을 이 앱 어디에 둘지.

## "사용함" 판단 규칙
- 근거는 세 가지뿐: 기기 설정값, 분석 이벤트(트래킹 리스너로 받기), 이미
  캐시되는 작은 읽기(카운트 집계 1회, 문서 1개). 컬렉션을 훑는 읽기는 금지.
- 사용자가 누른 "이미 써봤어요"는 진행도에는 세되 "사용 중" 칩으로는 안 보여준다.
- "안 씀"은 절대 표시하지 않는다(기록이 없을 뿐 안 썼다는 뜻이 아님).
- "구독 후에 한 행동"이 기준인 미션은 이벤트 시점에 RevenueCat 캐시된
  customerInfo의 활성 entitlement가 있을 때만 인정한다(트라이얼 포함).
- 상태는 기기별 AsyncStorage 한 키에 저장한다. 서버 저장은 하지 않는다.

## 2단계: 구현
- 구독자 프로필: ProfileSubscriptionWithOnboarding + onboarding prop
  - steps(핵심 미션), onConfirmStepDone, sections, items, onPressItem
  - planLabel / renewalLabel: 활성 entitlement에서 계산(상품 ID로 기간 판단,
    갱신될 때만 "갱신" 문구, 만료일 없으면 평생). 패키지 헬퍼
    getDefaultProfilePlanLabel / getDefaultProfileRenewalLabel 사용.
  - manageSubscriptionButtonVariant="secondary", supportMessageIcon(개발자 로고)
  - 기존 benefitUsageSection 표는 "Pro 혜택 전체 보기" 아래로 접힌다.
- 체크리스트 스텝은 훅 하나(useProChecklist 같은)에서 만들고, 프로필과
  마이페이지 진입점이 같이 쓴다. 마이페이지는 "여기부터 시작하세요 · 다음 스텝"을,
  다 끝나면 제목만 보여준다.
- 홈 미션 카드: 구독 시작 후 일정 기간(PBB는 14일), 핵심 → 추가 미션 순.
- NEW: 항목에 addedInVersion. 첫 방문자는 기준 버전과 비교해 전부 NEW가
  되지 않게 한다(패키지 isProOnboardingItemNew).
- 결제 직후: 축하 화면 → 확인 → Pro 프로필(온보딩 시작).
- 어드민: 실제 결제 없이 무료 → Pro 전환 시뮬레이션, 가이드 진행 초기화.
- 분석 이벤트: 카드 노출, 미션 클릭, 미션 완료, 이미 써봤어요, 가이드 항목 클릭,
  진입점 클릭(entryPoint 속성 포함). 핵심 미션 완료 시 RevenueCat 속성
  pro_guide_core_completed = "true".
- 문구: 패키지 기본 문구(가이드 제목, 체크리스트 제목, 버튼, 칩)를 그대로 쓰고,
  앱 문구(항목·섹션·미션 제목)는 이 앱이 지원하는 모든 언어에 직접 쓴다.
  번역 스크립트는 돌리지 않는다.

## 문서와 규칙
- docs에 Pro 가이드 스펙을 남겨(미션과 순서, 사용 판단 근거, 서버 읽기,
  이벤트, 어드민). PBB의 pro-guide.md 구조를 참고해.
- CLAUDE.md(또는 AGENTS.md)에 규칙 추가: "Pro 기능을 추가할 때는 기능 가이드
  (와 체크리스트)에 넣을지 먼저 제안하고, 정해지면 같은 작업에서 만든다."
- 권한 목록 파일 위에도 같은 안내 주석을 단다.

## 3단계: 검증
- 순수 로직(미션 완료, 구독 후 이벤트만 인정, NEW, 플랜 라벨)은 테스트로.
- 테스트·타입·린트를 돌리고, 기기 확인 항목은 목록으로 남겨줘.
  빌드와 기기 실행은 내가 한다.
- 커밋은 내가 요청할 때만, 파일을 직접 지정해서(git add -A 금지).
```
