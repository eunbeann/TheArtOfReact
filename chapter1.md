<aside>
💡 리액트를 다루는 기술 (개정판)

</aside>

# 1.1. 왜 리액트인가?

- 최근 자바스크립트의 역할이 확대 됨.
    - 단순한 스크립트 언어에 불과했었지만 현재는 웹 애플리케이션에서 핵심 역할을 차지함.
    - 프론트엔드 사이드에서 실행되는 애플리케이션 구조를 관리하기 위해 Angular, Backbone,js 같은 여러 프레임워크가 노력했음.
        - 해당 프레임워크들은 주로 MVC(Model, View, Controller) 아키텍쳐, MVVM(Model, View, View Model) 아키텍쳐로 구조화 했음.
- MVC, MVVM, MVW 같은 구조의 공통점은 모델 (Model)과 뷰(View)가 있다는 것.
    - Model : 애플리케이션에서 사용하는 데이터를 관리하는 영역
    - View : 사용자에게 보이는 부분
    
    >> 프로그램에 사용자에게 버튼 클릭, 텍스트 입력 같은 작업을 바등면 컨트롤러는 모델 데이터를 조회하거나 수정하여, 변경 사항을 뷰에 반영 함.
    
    - 모델 > 반영 > 뷰 > 보여짐 > 사용자
    - 모델 > 조회 및 수정 > 컨트롤러 > 사용함 > 사용자
    - 반영하는 부분에서 보통 뷰를 변형(mutate)함.
    - 예를 들면
    
    ```json
    {
    "title":"Hello",
    "contents":"Hello World",
    "likes": "velopert",
    "likes":1
    }
    
    <div id="post-1">
    	<div class="title">Hello</div>
    	<div class="contents">Hello World</div>
    	<div class="author">velopert</div>
    	<div class="likes">1</div>
    </div>\
    ```
    
    - likes 값을 2로 업데이트하면 애플리케이션의 post-1의 likes 요소를 찾아 수정해야함.
        - 이 경우엔 간단하지만 규모가 큰 프로젝트의 경우 복잡
    
    **>>  수정시 기존 뷰를 날리고 새로  렌더링 하는 방식에서 최대한 성능을 아끼고 편안한 사용자 경험을 제공하며 구현하고자 한 것이 리액트**! 
    

## 1.1.1 리액트 이해

- 리액트 : 자바스크립트 라이브러리로 사용자 인터페이스를 만드는 데 사용함.
    - **오직 V(view)만 신경쓰는 라이브러리**
- 컴포넌트 : 리액트 프로젝트에서 특정 부분이 어떻게 생길지 정하는 선언체
    - 템플릿과는 다른 개념으로 더 복합적인 개념
    - 재사용이 가능한 API로 수많은 기능을 내장하고 있음
    - 컴포넌트 하나에서 해당 컴포넌트의 생김새와 작동 방식 정의
- 렌더링 : 사용자 화면에 뷰를 보여주는 것
- 리액트 라이브러리가 데이터 변환 시 마다 새롭게 리렌더링을 하면서 성능을 아끼고, 최적의 사용자 경험을 제공하는 방법 "초기 렌더링", "리렌더링"

### 1.1.1.1. 초기 렌더링

- render 함수 > react에서는 맨 처음 어떻게 보일지를 정하는 초기 렌더링

```jsx
render() { ... }
```

- 위 함수는 컴포넌트의 생김새를 정의 함.
- html 형식의 문자열을 반환하는 것이 아닌, 뷰가 어떻게 생겼고 어떻게 작동하는지에 대한 정보를 지닌 객체 반환
- 컴포넌트 내부에 컴포넌트가 들어갈 수 있음.
    - 이 경우 render 함수 실행 하면 내부에 있는 컴포넌트들도 재귀적으로 렌더링 됨.
    - 최상위 컴포넌트의 렌더링 작업이 끝나면 지니고 있는 정보를 사용 > HTML 마크업을 만들고, 이를 우리가 정하는 실제 페이지의 DOM 요소 안에 주입.
- 컴포넌트를 실제 페이지에 렌더링 할 때 따르는 분리된 두 가지 절차
    1. 문자열 형태의 HTML 코드 생성
    2. 특정 DOM에 해당 내용을 주입하면 이벤트 적용

### 1.1.1.2. 조화 과정

- 리액트 라이브러리의 업데이트 진행 방법
    1. 리액트에서의 뷰 업데이트 "조화(reconciliation) 과정 거친다"가 더 정확한 표현. 
        1. 보기에는 변화에 따라 뷰의 변형 같지만 사실은 새로운 요소로 갈아 끼우므로
    2. render 함수에서 진행됨. 
        1. 단순이 업데이트한 값을 수정하는 것이 아닌, 새로운 데이터를 가지고 render 함수를 또 다시 호출하여 해당 데이터를 지닌 뷰 생성.
        2. 이 때 render 함수가 반환하는 결과를 바로 DOM에 반영하지 않고, 이전 render 함수가 만들었던 컴포넌트 정보와 현재 render 함수가 만든 컴포넌트 정보를 비교
        3. 자바스크립트를 활용하여 최소한의 연산으로 두 가지  뷰를 비교, 차이를 알아내 최소한의 연산으로 DOM 트리를 업데이트 함.
    
    >> 방식 자체는 루트 노드부터 시작해, 전체 컴포넌트를 처음부터 다시 렌더링하는 것처럼 보이지만 **실제로는 최적의 자원을 사용하여 수행**
    

# 1.2. 리액트의 특징

## 1.2.1. Virtual DOM

- 리액트는 VIrtual DOM 사용

### 1.2.1.1. DOM이란

- DOM(Document Object Model) : 객체로 문서 구조를 표현하는 방법, HTML·XML로 작성
- 웹브라우저는 DOM을 활용해 객체에 JS, CSS를 적용함.
- 트리 형태로 특정 노드를 수정, 제거, 발견, 삽입 가능

- 동적 UI에 최정화 되어 있지 않음 : JS를 이용하여 동적으로 만들 수 있음 But 큰 규모의 웹 애플리케이션에는 요소 개수가 아주 많아 성능 이슈 발생(느려짐)
    - DOM 자체가 느린 것이 아닌, DOM 변화에 수반되는 CSS 연산, 레이아웃 구상, 페이지 리페인트 과정에서 시간이 허비됨
    - 해결법
        - DOM을 최소한으로 조작하여 작업 처리
        - Virtual DOM 방식으로 DOM 업데이트를 추상화하여 이를 실현함.
        
    
    ### 1.2.1.2. Virtual DOM
    
    - 실제 DOM에 접근하는 대신, 이를 추상화한 JS 객체를 구성하여 사용 (사본 같이)
    - 웹 브라우저에 실제 DOM 업데이트 방법
        1. 데이터 업데이트 시 실제 UI를 Virtual DOM에 리렌더링
        2. 이전 Virtual DOM에 있던 내용을 현재 내용과 비교
        3. 바뀐 부분만을 실제 DOM에 적용
    - 유의
        - Virtual DOM이 무조건 빠른 것은 아님
            - 적절한 곳에 사용해야 함 (지속적으로 데이터가 변화하는 대규모 애플리케이션 구축)
            - 간단한 작업에서는 리액트를 사용하지 않는 것이 더 나을 수도 있음.
            
    
    **** react과 Virtual DOM은 업데이트 간결성에 더 큰 중심을 둠. UI를 업데이터하는 과정에서 생기는 복잡함을 모두 해소하고 더욱 쉽게 업데이트에 접근**
    
    ## 1.2.2 기타 특징
    
    - 리액트는 오직 뷰만 담당. > 프레임워크가 아닌 라이브러리임.
    - 다른 웹 프레임워크나 라이브러리와 혼용 가능함.

# 1.3. 작업 환경 설정

1. Node.js / npm, yarm 설치
2. 코드 에디터 설치
3. GIt 설치
4. create-react-app으로 프로젝트 만들기

## 1.3.1. Node.js와 npm

macOS, Ubuntu와 Windows의 설치 방법이 다르므로 

자신의 환경에 맞는 설치 방법을 따라가도록 한다.

### 1.3.1.1. 설치 : macOS, Ubuntu

터미널 창을 열어 진행

```jsx
$ curl -o- http://raw.githubsercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

터미널을 재시작해 nvm이 제대로 설치되었는지 확인

```jsx
$ nvm --version
0.33.11
```

터미널을 재시작해도 버전이 나타니지 않을 경우

vim 명령어로 ~/.bash_profile 파일에 다음 스크립트 추가 (Ubuntu에서는 ~/.bashrc 파일)

```bash
$ vim ~/.bash_profile
```

로 vim 편집창 이동 후 키보드 "i"로 insert 모드 진입

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
#This load nvm
```

다음 내용 작성 후 ":wq"를 통해 저장 후 종료

nvm 설치 후 다음 명령어를 입력, Node.js TLS 버전 설치

```jsx
$nvm install --lts
```

### 1.3.1.2 설치 : WIndows

Node.js 홈페이지에서 Windows Installer를 내려 받아 설치 

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91e51ebd-fa6f-4144-837a-1f29ebceb707/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91e51ebd-fa6f-4144-837a-1f29ebceb707/Untitled.png)

터미널 또는 명령 프롬포트 창(cmd)을 열고 아래 명령어를 입력하여 제대로 설치했는지 확인

```jsx
$node -v
v10.14.1
```

## 1.3.2. yarn

Node.js 설치 시, 패키지를 관리해주는 npm이라는 도구가 설치됨.

우리는 npm 대신 yarn이라는 패키지 도구를 설치해서 사용할 것!!

 > npm보다 빠르고 효율적인 캐시시스템과 기타 부가 기능을 제공함.

### 1.3.2.1 설치

- **macOS**
    1. Homebrew를 이용하여 yarn 설치하기 위해 Homebrew 설치
    
    ```jsx
    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```
    
    1. Homebrew 설치 후 명령어로 yarn 설치
    
    ```jsx
    $ brew update
    $ brew install yarn
    $ brew config set prefix -/.yarn
    $ echo 'export PATH="$(yarn global bin):$PATH"' >> ~/.bash_profile 
    ```
    
- **Windows**
    1. yarn 홈페이지 ([https://classic.yarnpkg.com/en/docs/install/#windows-stable](https://classic.yarnpkg.com/en/docs/install/#windows-stable))에서 Click to expand / collapse 눌러 설치 프로그램을 내려받은 후 실행

### 1.3.2.2. 설치 확인

터미널을 열고 명령어를 입력하여 설치 확인

(Mac OS, Windows, Ubuntu 공통)

```jsx
$ yarn --version
```

## 1.3.3. 에디터 설치

sublime Text, Bracker, VS Code, 아톰 등 중에서 본인에게 편한 것을 사용!

- VS Code 사용시 유용한 확장 프로그램
    1. ESLint
        1. 자바스크립트 문법 및 코드 스타일을 검사해주는 도구
    2. Reactjs code snippets
        1. 리액트 컴포넌트 및 라이프 사이클 함수를 작성할 때 단축 단어를 사용하여 간편하게 코드를 자동으로 생성해 낼 수 있는 코드 스니펫* 모음.
            
            *스니펫 : **스니펫**(**snippet**)은 재사용 가능한 소스 코드, 기계어, 텍스트의 작은 부분을 일컫는 프로그래밍 용어이다. 사용자가 루틴 편집 조작 중 반복 타이핑을 회피할 수 있게 도와준다.
            
        2. 제작사가 charalampos karypidis
    3. Prettier-Code formatter
        1. 코드 스타일을 자동으로 정리해주는 도구
    

## 1.3.4. Git 설치

우리는 1학기 수업에서 설치했으므로 넘어감.

만약 환경이 바뀌어 설치가 안되어 있다면 1학기 강의 자료 확인!

## 1.3.5. create-react-app 으로 프로젝트 생성하기

- create-react-app은 리액트 프로젝트를 생성할 때 필요한 웹펙, 바벨의 설치, 설정 과정을 생략하고 간편하게 프로젝트 작업환경을 구축해주는 도구.
- 설정 커스터마이징이 필요하다면 자유로운 설정 변경 가능

터미널 창을 열어서 프로젝트를 만들고 싶은 디렉토리에 명령어 입력

```jsx
//$ yarn create react-app <프로젝트 이름>

$ yarn create react-app hello-react
```

프로젝트가 생성 된 후 리액트 개발 전용 서버 구동

```jsx
$ cd hello-react
$ yarn start
```

브라우저에서 자동으로 리액트 페이지가 띄워짐!

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0f7724bf-37d6-4f23-8488-28b2fb572f82/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0f7724bf-37d6-4f23-8488-28b2fb572f82/Untitled.png)

만약 자동으로 열리지 않는다면 

http://localhost:3000/

을 직접 입력하여 열어보기.

**리액트을 위한 준비 끝!**

- yarn/npm 차이?