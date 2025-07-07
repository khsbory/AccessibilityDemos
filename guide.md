# 서버 실행 가이드 (Windows)

이 문서는 Windows 환경에서 개발 서버를 실행하는 방법을 안내합니다.

## 문제 상황

기본적으로 `package.json`에 정의된 `dev` 스크립트 (`npm run dev`)는 Windows 환경에서 다음과 같은 두 가지 주요 문제로 인해 정상적으로 실행되지 않습니다.

1.  **`NODE_ENV` 인식 불가**: Windows Command Prompt(cmd) 또는 PowerShell은 `NODE_ENV=development`와 같은 형식의 환경 변수 설정을 직접적으로 지원하지 않습니다. 이로 인해 `'NODE_ENV' is not recognized...` 오류가 발생합니다.
2.  **`reusePort` 옵션 미지원**: `server/index.ts` 파일에 설정된 `reusePort: true` 옵션은 Windows의 특정 환경에서 지원되지 않아 `Error: listen ENOTSUP: operation not supported on socket` 오류를 유발할 수 있습니다.

## 해결 방법

위 문제들을 해결하고 서버를 성공적으로 실행하기 위해 다음 단계를 따릅니다.

### 1. `server/index.ts` 파일 수정 (필요시)

`reusePort` 관련 오류가 발생할 경우, `server/index.ts` 파일을 열어 `server.listen` 부분의 `reusePort: true` 옵션을 아래와 같이 제거하거나 주석 처리합니다.

**수정 전:**
```typescript
server.listen({
  port,
  host: "0.0.0.0",
  reusePort: true,
}, () => {
  log(`serving on port ${port}`);
});
```

**수정 후:**
```typescript
server.listen({
  port,
  host: "0.0.0.0",
}, () => {
  log(`serving on port ${port}`);
});
```
*(참고: 이 작업은 이미 현재 프로젝트에 반영되었습니다.)*


### 2. 서버 실행

터미널에서 다음 명령어를 입력하여 개발 서버를 시작합니다. 이 명령어는 `cross-env`를 사용하여 Windows와 다른 운영체제에서 모두 호환되는 방식으로 환경 변수를 설정합니다.

```bash
npx cross-env NODE_ENV=development tsx server/index.ts
```

### 3. 접속 확인

서버가 성공적으로 실행되면 터미널에 다음과 유사한 로그가 출력됩니다.

```
7:06:40 PM [express] serving on port 5000
```

이제 웹 브라우저를 열고 다음 주소로 이동하여 애플리케이션에 접속할 수 있습니다.

**http://localhost:5000** 