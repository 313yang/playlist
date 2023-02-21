# Soundy - 스포티파이 플레이리스트 기반 음원 스트리밍 사이트

## Description

> 2023.01 ~ 2023.02

### Summary

![image](https://user-images.githubusercontent.com/78190786/219079390-81b59393-3cc0-4343-b735-d019384bcd9d.png)

- spotify api를 통해 플레이리스트 조회
- 조회된 플레이리스트 내 음원을 유튜브에 검색
- 검색된 음원을 플레이어로 재생

## About Project

### 개발환경

`Next.js` , `Typesctript`, `React-query`, `Zustand`, `styled-components`

- React-query : 한정된 api사용량으로 인해 캐쉬된 데이터를 이용해 api호출을 최소화 하기 위해 사용.
- Zustand : 플레이어의 상태를 전역으로 관리하기 위해 사용. `persist`로 localstorage에 저장함으로써 브라우저 새로고침이나 종료후에도 전역 상태값이 삭제되지 않게 설정.

### Result

![image](https://user-images.githubusercontent.com/78190786/219071539-401560ef-a6d0-40cf-9a71-94e933d315a2.png)

- 상황별 및 장르별 플레이리스트 선정

![image](https://user-images.githubusercontent.com/78190786/219082086-928d71dd-02c5-4ce1-bccb-4c0d5569170a.png)

- 검색을 통해 플레이리스트 검색가능

![image](https://user-images.githubusercontent.com/78190786/219082371-2f34e971-f6e4-41de-8585-c664daf0a664.png)

- 플레이어 : 자동재생, 한곡반복, 랜덤재생, 다음곡 및 이전곡 넘기기, 음원 재생바 및 볼륨 조절 & 뮤트기능

![image](https://user-images.githubusercontent.com/78190786/219083242-2ebb6688-dcc6-4ca9-b1e4-eeede3fbe552.png)

- 재생목록 : 현재 재생목록 리스트 전체 및 개별삭제 기능. 드래그 앤 드롭으로 순서 변경가능.

### TODO

- [x] 재생목록 드래그 앤 드롭기능
- [x] 음원 재생바 호버 시 duration 표시
- [x] 에러 시 토스트메세지 추가
- [ ] 태블릿 및 모바일 사이즈 제작 (반응형 추가)
