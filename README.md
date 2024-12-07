# AI 템플릿 메이커
본 서비스는 **다우기술**의 **뿌리오**와 연계하여 개발된 한성대학교 SW프리캡스톤디자인 프로젝트입니다.  
**생성형 AI**를 활용해 이미지를 생성하고, 이를 서비스 내 **템플릿 기능**을 통해 디자인하여 꾸민 뒤 원하는 수신자들에게 이미지 전송이 가능한 기능을 제공합니다.


&nbsp;
## 프로젝트 실행 방법_프론트엔드
1. **Git Repository 클론**  
   프로젝트를 로컬 환경에 복사합니다:
   ```bash
   git clone https://github.com/HSU-SPARKLE/Pre-Capstone-FE.git
   cd Pre-Capstone-FE
   ```

3. **Node.js 및 npm 설치**  
   이 프로젝트는 Node.js와 npm을 사용합니다. Node.js가 설치되어 있지 않다면, Node.js공식 웹사이트(https://nodejs.org/en) 에서 설치합니다.

4. **의존성 설치**  
   프로젝트 디렉토리에서 다음 명령어를 실행하여 필요한 패키지를 설치합니다.
   ```bash
   npm install
   ```

5. **프로젝트 실행**  
   의존성 설치가 완료되면, 다음 명령어로 프로젝트를 실행합니다.
   ```bash
   npm start
   ```

6. **웹 브라우저에서 확인**  
   브라우저를 열고 http://localhost:3000 에 접속하여 프로젝트가 정상적으로 실행되는지 확인합니다.
   


&nbsp;
## 개요
AI 템플릿 메이커는 생성형 AI와 템플릿 기능을 결합하여 소상공인과 소기업(음식점, 카페, 여행사, 소규모 쇼핑몰 등)이 광고 이미지를 손쉽게 제작하고 꾸밀 수 있는 솔루션을 제공합니다.  
사용자는 생성형 AI를 통해 원하는 광고 이미지를 제작한 후 템플릿 기능을 활용해 로고, QR 코드, 텍스트, 추가 이미지를 삽입하여 세련되고 일관성 있는 광고 이미지를 완성할 수 있습니다.  
뿌리오 API와 연동해 생성된 이미지를 원하는 발신자에게 간편하게 문자로 전송할 수 있도록 지원합니다.  
| ![dalle](https://github.com/user-attachments/assets/72df9d38-23f5-4a6f-8059-ffd5b91f588e) | ![로고,QR](https://github.com/user-attachments/assets/0c761837-d5aa-43d9-88e7-55233a43c2b1) |
|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| ![텍스트](https://github.com/user-attachments/assets/377bdc1c-78f1-48d8-8799-2c717a95e3ea) | ![이미지](https://github.com/user-attachments/assets/41ab9d38-2595-48d8-82c1-8a66986a5ce2) |
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/ad8aefb6-a317-47f2-a7a9-25cefaa797fa" alt="템플릿완성1" width="430" height="580"></td>
    <td><img src="https://github.com/user-attachments/assets/6d4648b9-2007-439f-9521-aaabbd8de9e2" alt="템플릿완성2" width="430" height="580"></td>
  </tr>
</table>


&nbsp;
## 주요 기능
### 1. DALL-E 3를 이용한 이미지 생성
- 뿌리오의 요구사항을 반영한 글자와 사람이 포함되지 않은 깔끔하고 미니멀한 디자인의 이미지를 생성합니다.
- 사용자가 광고하고자 하는 의도에 맞게 이미지 및 텍스트를 수월하게 삽입하기 위한 단색 배경 위주의 이미지 생성합니다.
- 스타일 별로 3장의 이미지를 생성하여 사용자가 원하는 스타일의 이미지를 선택할 수 있도록 제공합니다.
  - **애니메이션 스타일**
  - **사실적인 포토 스타일**
  - **일러스트 스타일**
<img width="541" alt="image" src="https://github.com/user-attachments/assets/2e3ae216-9f15-4861-8a8a-42a8bf0307d2">

### 2. 템플릿 기능
- **로고 삽입**
  - 기업, 식당, 카페 등의 로고를 로컬 컴퓨터에서 업로드하여 이미지에 삽입해 브랜드 아이덴티티 강화할 수 있습니다.
- **QR 코드 생성 및 삽입**
  - 원하는 텍스트 및 URL을 입력하여 QR 코드를 생성해 광고 이미지에 삽입하여 간편한 사이트 홍보와 수신자는 문자 메시지 없이 이미지를 통해 바로 사이트로 이동 가능합니다.
- **텍스트 삽입**
  - 원하는 폰트, 크기, 색상, 배경 등을 선택해 광고 문구를 스타일에 맞춰 브랜드 이미지에 어울리는 텍스트 삽입 및 편집이 가능합니다.
- **이미지 삽입**
  - 사용자가 입력한 키워드에 맞는 다양한 이미지를 Unsplash API를 통해 제공하며, Remove.bg를 이용해 배경 제거 기능을 제공하여 AI로 생성된 이미지에 자연스럽게 부착이 가능합니다.

### 3. 광고 메시지 생성 및 광고 문자 발송
- OpenAI를 활용하여 사용자가 입력한 발송 목적 및 내용을 분석하고 이를 기반으로 효과적인 광고 문구를 생성합니다.
- 생성된 광고 문자는 엑셀 파일 형태로 업로드된 주소록과 연동되며, 뿌리오 API를 통해 원하는 수신자들에게 손쉽게 발송할 수 있습니다.

&nbsp;
## 프론트 사용 기술
<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>  
<img src="https://img.shields.io/badge/Unsplash-API-000000?style=flat-square&logo=Unsplash&logoColor=white" />  
<img src="https://img.shields.io/badge/remove.bg-API-000000?style=flat-square&logo=remove.bg&logoColor=white" />  
</p>

### HTML5 <canvas>  
- 생성형 AI를 통해 생성한 이미지 위에 사용자가 추가하고 싶은 이미지를 추가할 수 있도록 구현.
- 사용자의 로컬 파일 업로드 및 외부 API를 통해 가져온 이미지를 드래그 앤 드롭으로 추가 가능.
- 사용자의 입력을 기반으로 텍스트를 이미지에 실시간으로 추가.
- 사용자가 작업을 완료한 후, 캔버스의 내용을 하나의 이미지로 내보낼 수 있음.

### qrcode.react  
- qrcode.react 라이브러리를 프로젝트에 설치해서 사용자가 원하는 내용이 담긴 QR코드를 실시간으로 생성 후 이미지에 추가할 수 있음

### Unsplash API  
- Unsplash API를 사용하여 다양한 이미지들을 가져오고, 사용자 마음껏 이미지를 추가해 이미지를 꾸밀 수 있음.

### remove.bg  
- Unsplash에서 가져온 이미지는 배경이 존재해 생성한 이미지와 잘 어울리지 않는 문제를 remove.bg API를 통해 배경을 제거하고 가운데 있는 물체만 남겨 훨씬 자연스러운 꾸미기 가능


&nbsp;
## 시스템 구조
![프캡 구조도](https://github.com/user-attachments/assets/5e154cc4-0c72-418e-b9d6-4c9a2ef75721)

&nbsp;
## ERD
<img width="1003" alt="image" src="https://github.com/user-attachments/assets/46b408f3-b295-492b-9a13-cb81bf322216">

&nbsp;
## DALLE-3 이미지 생성 흐름도 
![프캡 이미지 생성 흐름](https://github.com/user-attachments/assets/11d8e3a5-6cb7-44f4-adf1-2b36fbac9d9d)



&nbsp;
## 프론트 구성원 및 역할 분담

| 이름       | 역할                                                                 |
|------------|----------------------------------------------------------------------|
| 김건우     | Unsplash 및 remove.bg API 연동, 이미지 템플릿 기능 구현, UI & UX 개발   |
| 강진희     | 이미지 템플릿 기능 구현, AI 프롬프트 최적화, UI & UX 개발                |

&nbsp;
## 기타
와이어 프레임
- https://www.figma.com/design/m3lABpF8fay84QkItHprxC/sw-%ED%94%84%EB%A6%AC%EC%BA%A1%EC%8A%A4%ED%86%A4-%EC%8A%A4%ED%8C%8C%ED%81%B4?node-id=0-1&node-type=canvas&t=aIsBrYSNvOMP297e-0

