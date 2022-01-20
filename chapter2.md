# 2.1. 코드 이해하기

# 2.2. JSX란?

- 자바스크립트의 확장 문법
- XML과 유사하게 생겼으며 브라우저 실행 이전 자바스크립트 형태의 코드로 변환 됨

```xml
//JSX

funtion App(){
	retunr (
		<div>
			Hello <b>react</b>
		</div>
	);
}
```

다음과 같이 변환

```xml
funtion App() {
	return React.creatElement("div", null, "Hello", React.createElement("b", null, "react"));
}
```

편하게 UI 렌더링 가능

# 2.3. JSX의 장점

## 2.3.1. 보기 쉽고 익숙하다

## 2.3.2. 더욱 높은 활용도

- HTML 태그뿐만 아니라 컴포넌트도 JSX 안에서 작성 가능함.

# 2.4. JSX 문법

사용 시 지켜야 할 규칙

## 2.4.1. 감싸인 요소

- 컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 함.
    - Virtual DOM에서 컴포넌트 변화를 감지해낼 때 효율적으로 비교할 수 있도록, 컴포넌트는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙이 있기 때문
    
    App 컴포넌트 함수 내부를 지우고 다음과 같이 작성
    
    상단 import 함수도 모두 지움.
    
    ```jsx
    //src/App.js
    
    import React from 'react';
    
    function App() {
      return (
        <h1>리액트야 안녕!</h1>
        <h2>잘 작동하니?</h2>
      )
    }
    
    export default App;
    ```
    
    이 경우 요소 여러 개가 부모 요소 하나에 의하여 감싸져 있지 않기 때문에 오류가 발생함.
    
    ```jsx
    import React from 'react';
    
    function App() {
      return (
        <div>
        <h1>리액트야 안녕!</h1>
        <h2>잘 작동하니?</h2>
        </div>
      )
    }
    
    export default App;
    ```
    
    <h1>, <h2> 태그를 <div>로 감싸주면 정상적으로 작동함.
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/adbf0f90-59d8-47cb-920e-8d69ee4ab4a7/Untitled.png)
    

## 2.4.2 자바스크립트 표현

자바스크립트 표현식 작성 가능.

JSX 내부에서 { }로 코드를 감싸 작성

```jsx
// src/App.js

import React from 'react';

function App() {
	const name = '리액트';
  return (
    <>
	    <h1>{name} 안녕!</h1>
	    <h2>잘 작동하니?</h2>
    </>
  )
}

export default App;
```

오류없이 잘 작동함,

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edfd8443-a6bc-4245-8348-ecf7a86837e1/Untitled.png)

## 2.4.3. if문 대신 조건부 연산자

- JSX 내부의 자바스크립트 표현식에서 if 문을 사용할 수는 없음.
- 조건에 따라 다른 내용 렌더링이 필요한 경우
    1. JSX 밖에서 if문을 사용하여 사전에 값을 설정
    2. { } 안에 조건부 연산자(삼항 연산자) 사용

```jsx
// src/App.js

import React from 'react';

function App() {
	const name = '리액트';
  return (
    <div>
			{name === '리액트' ? (
				<h1>리액트입니다. </h1>
			) : (
				<h2>리액트가 아닙니다. </h2>
			)}
    </div>
  );
}

export default App;
```

이 경우 브라우저에서 '리액트입니다' 문구 확인

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7f8c4cb2-9170-450d-a69d-523478800667/Untitled.png)

name 값 변경 시 '리액트가 아닙니다' 문구 확인

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/108665d8-61bb-45a9-87c7-862a1a77667d/Untitled.png)

## 2.4.4. AND 연산자(&&)를 사용한 조건부 렌더링

- 특정 조건을 만족할 때 내용을 보여주고 만족하지 않을 때 아예 아무것도 렌더링 하지 않아야 하는 상황의 경우 조건부 연산자를 통해 구현 가능

```jsx
// src/App.js
import React from 'react';

function App() {
	const name = '리 액트';
  return <div>{name === '리액트' ? <h1>리액트입니다. </h1> : null}</div>;
}

export default App;
```

이렇게 null을 렌더링 하면 아무것도 보여주지 않음.

- && 연산자로 더 짧은 코드 짜기

```jsx
// src/App.js

import React from 'react';

function App() {
	const name = '리 액트';
  return <div>{name === '리액트' && <h1>리액트입니다. </h1>}</div>;
}

export default App;
```

이 경우 역시 아무것도 보여주지 않음. 

name 값을 올바르게 지정시에 '리액트입니다' 문구 등장

- && 연산자로 조건부 렌더링이 가능한 이유
    - 리액트에서 false 렌더링할 때는 null과 마찬가지로 아무것도 나타나지 않음
    
    ```jsx
    //- *유의* falsy한 값인 0은 예외적으로 화면에 나타남
    
    const number = 0;
    return number && <div>내용</div>
    ```
    
    이 경우는 화면에 숫자 0이 나옴.
    
    <aside>
    📌 JSX는 언제 괄호로 감싸나요??
    
    주로 JSX를 여러 줄로 작성할 떄 괄호로 감싸고, 한 줄로 표현할 수 있는 JSX는 감싸지 않음. 
    JSX를괄호로 감싸는 것은 필수 사항이 아님.
    
    </aside>
    

## 2.4.5. undefined를 렌더링하지 않기

- 리액트 컴포넌트에서는 함수에서 undefined만 반환하여 렌더링 상황을 만들어선 안됨
- name 값이 undefined일 대 보여 주고 싶은 문구가 있을경우 코드 작성 법
- 

```fortran

// src/App.js

import React from 'react';
import './App.css';

function App() {
	const name = undefined;
  return <div>{name ||'리액트'}</div>;
}

export default App;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/32d142a7-df17-4cc9-be8d-40d58cf989a8/Untitled.png)

## 2.4.6. 인라인 스타일링

- 리액트에서 DOM 요소에 스타일 적용시 문자열 형태가 아닌 **객체 형태**로 넣음
- 스타일 이름 중에서 "-" 문자 포함되는 경우는 "-"를 없애고 카멜 표기법으로 작성함.
    - ex) background-color (x) backgroundColor (o)
    

```fortran
// src/App.js

import React from 'react';

function App() {
	const name = "리액트";
	const style = {
	// background-Color는 backgroundColor와 같이 카멜 표기법 작성
  backgroundColor: 'black',
  color: 'aqua',
  fontSize: '48px', //font-size > fontSize
  fontWeight: 'bold', //font-weight > fontWeigt
  padding: 16 //단위 생략시 자동 px 지정

};
return <div style={style}>{name} </div>;
}

export default App;
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c3ce431e-1f9e-42ad-a448-300c7b32edf7/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c3ce431e-1f9e-42ad-a448-300c7b32edf7/Untitled.png)

미리 선언하지 않고 바로 style 값 지정하는 방법

```fortran
// src/App.js

import React from 'react';

function App() {
	const name = "리액트";
	return (
		<div
			style={{
	const style = {
	// background-Color는 backgroundColor와 같이 카멜 표기법 작성
  backgroundColor: 'black',
  color: 'aqua',
  fontSize: '48px', //font-size > fontSize
  fontWeight: 'bold', //font-weight > fontWeigt
  padding: 16 //단위 생략시 자동 px 지정
}}
>
	{name}
</div>;
)
}

export default App;
```

## 2.4.7. class 대신 className

- 일반 HTML에서 CSS 클래스를 사용할 때는 <div class="myclass"></div>와 같이 class 속성 사용.
- JSX에서는 class가 아닌 className으로 설정

```css
/App.css

.react {
  background: aqua;
  color: black;
  font-size: 48px;
  font-weight: bold;
  padding: 16px;
}
```

*클래스 표기 방식으로 react라는 이름을 가진 클래스에 스타일 적용 시  

* 기존 App 컴포넌트에서 인라인 스타일에 사용한 폰트 색상과 배경색을 뒤바꾼 스타일

 * App.js 상단에 App.css를 불러와 div 요소에 className 값 지정

```fortran
// src/App.js

import React from 'react';
import './App.css';

function App() {
	const name = "리액트";
	return <div className="react">{name}</div>;
}

export default App;
```

## 2.4.8. 꼭 닫아야 하는 태그

HTML에서 <input>, <br>같은 몇 태그는 닫지 않아도 작동 함.

그러나 JSX에서는 닫지 않으면 오류가 발생!!

- 태그 사이에 별도의 내용이 들어가지 않는 경우 **<input />**와 같이 작성 가능
    
    >> self-closing 태그, 태그를 선언하면서 동시에 닫을 수 있음.
    

## 2.4.9. 주석

**{/* 주석 내용 */}**

- JSX 내부에서 주석 작성 시 위와 같은 형식으로 작성
- 여러줄로 작성도 가능함.
- 시작 태그를 여러 줄로 작성할 때는 **//** 형태의 주석 작성도 가능
- 그러나 아무 데나 작성하면 페이지에 나타남
- 아래 코드를 통해 내용 확인!

```fortran
// src/App.js

import React from 'react';
import './App.css';

function App() {
  const name = '리액트';
  return (
    <>
    {/* 주석은 이렇게 작성합니다. */}
      <div 
        className="react"
      > 
        {name} 
      </div>
      // 하지만 이런 주석이나
      /* 이런 주석은 페이지에 그대로 나타나게 됩니다. */
      <input />
    </>
  );
}

export default App;
```

위 태그를 인터넷창으로 확인해본다면..

 

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/107cef03-8dda-42de-9222-3a19684bd935/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/107cef03-8dda-42de-9222-3a19684bd935/Untitled.png)

# 2.5. ESLint와 Prettier 적용하기

## 2.5.1. ESLint

- VS Code 상단 메뉴에서 **보기 > 문제** 를 클릭하여 문제 탭을 열 수 있음
- 초록색 줄이 그어진 코드 > 고치기 싫다면 무시해도 괜찮음
- 빨간색 줄이 그어진 코드 > 치명적인 오류이므로 반드시 고쳐주어야 함
- .
- 코드 작성할 때 실수를 하면 에러 혹은 경고 메시지를 VS Code 에디터에서 바로 확인할 수 있게 해줌

## 2.5.2. Prettier

- VS Code에서 (키보드 F1) > foramt 입력 > 엔터 키
- 코드 정렬, 세미 콜론 자동 추가, 큰 따옴표로 변환을 자동으로 수정해줌

### 2.5.2.1. 저장할 때 자동으로 코드 자동 정렬하기

** 코드 수작업 정리를 원할 경우 생략해도 되는 과정 **

- Vs Code 창에서 :  파일 > 기본 설정 > 설정
- 상단 검색창에 format on save를 검색하여 나타나는 체크 박스에 체크
    - 저장할 때마다 코드 자동 정렬