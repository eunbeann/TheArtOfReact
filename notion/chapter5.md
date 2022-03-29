일반 HTML에서 DOM요소에 이름을 달 때는 id를 사용하는 것 처럼 

리액트 프로젝트 내부에서는 DOM에 이름을 달기 위해서 ref(reference)를 사용함.

# 5.1. ref는 어떤 상황에서 사용해야 할까?

- DOM을 직접적으로 건드려야 할 때 ref를 사용함
- 클래스형 컴포넌트에서 ref 사용하는 방법 진행

1. VaildationSample 컴포넌트 만들기
2. input에 ref 담기
3. 버튼을 누를 때 마다 input에 포커스 주기

## 5.1.1. 예제 컴포넌트 생성

src 디렉터리 안에 ValidationSample.css와 ValidationSample.js 파일 만들기

```css
/* src/ValidationSample.css*/

.success {
  background-color: lightgreen;
}

.failure {
  background-color: lightcoral;
}
```

```jsx
/* src/ValidationSample.js */

import React, { Component } from 'react';
import './ValidationSample.css';

class ValidationSample extends Component {
    state = {
        password: '',
        clicked: false,
        validated: false,
    }

    handleChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleButtonClick = () => {
        this.setState({
            clicked: true,
            validated: this.state.password === '0000'
        })
    }
    render() {
        return (
            <div>
                <input
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
                />
                <button onClick={this.handleButtonClick}>검증하기</button>
            </div>
        );
    }
}

export default ValidationSample;
```

- input : onChange 이벤트 발생 → handleChange 호출 → state의 password 값 업데이트
- button : onClick → handleButtonClick 호출 → clicked 값을 참으로 변경, validated 값을 검증 결과로 설정
- input의 className 값은 버튼을 누르기 전에는 비어있는 문자열 전달
- 버튼을 누른 후에는 검증 결과에 따라 success or failure 설정
    - 이 값에 따라 input 색상 변경
    

## 5.1.2. App 컴포넌트에서 예제 컴포넌트 렌더링

ref 사용을 위해 클래스형 컴포넌트로 작성해줌.

```jsx
// src/App.js

import React, { Component } from 'react';
import ValidationSample from './ValidationSample'; 
// 우리가 만든 컴포넌트 불러오기

class App extends Component {
  render() {
    return (
      <ValidationSample/>
    );
  }
}

export default App;
```

## 5.1.3. DOM을 꼭 사용해야 하는 상황

앞에서는 state를 이용해 기능을 구현했지만 state만으로 해결할 수 없는 상황 존재

1. 특정 input에 포커스 주기
2. 스크롤 박스 조작하기
3. Canvas 요소에 그림 그리기 등

이럴 때를 위해 ref 사용

# 5.2. ref 사용

ref를 사용하는 두가지 방법

## 5.2.1. 콜백 함수를 통한 ref 설정

- ref를 만드는 가장 기본적인 방법
- ref라는 콜백 함수를 props로 전달해주면 됨
- 이 콜백 함수는 ref 값을 파라미터로 전달받음.
- 함수 내부에서 파라미터로 전달받은 ref를 컴포넌트의 멤버 변수로 설정

```jsx
//콜백 함수 사용 예시
<input ref={(ref) => {this.input=ref}} />
```

앞으로 this,input은 input 요소의 DOM을 가리킴

DOM 타입과 관계 없이 ref 이름 마음대로 지정 가능

this.hamster =ref

## 5.2.2. createRef를 통한 ref 설정

- 리액트 내장 함수인 createRef 사용
- 더 적은 코드로 쉽게 사용 가능
- 리액트 v16.3 이전 버전에서는 작동하지 않음

```jsx
import React, { Component } from 'react';

class RefSample extends Component {
	inpit React.createRef();

handleFocus = () => {
	this.input.current.focus();
}

render() {
    return (
      <div>
				<input ref ={this.input} />
    );
  }
}

export default RefSample;
```

1. 컴포넌트 내부에서 멤버 변수로 React.createRef() 담아 주기
2. 해단 멤버 변수를 ref를 달고자하는 요소에 ref props로 넣어 줌

이후 접근하기 위해서는 this.input.current를 조회함.

우리는 콜백함수를 주로 사용

## 5.2.3. 적용

ValidactionSample에서 버튼을 한 번 눌렀을 때 포커스가 다시 input쪽으로 자동으로 넘어가도록 코드 작성

### 5.2.3.1. input에 ref 달기

```jsx
// src/ValidationSample.js 중 input 

<input
ref={(ref) => this.input=ref}
type="password"
value={this.state.password}
onChange={this.handleChange}
className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
/>
<button onClick={this.handl
```

### 5.2.3.2. 버튼 onClick 이벤트 코드 수정

onclick 이벤트 발생시 input에 포커스를 주도록 코드 수정

```jsx
handleButtonClick = () => {
        this.setState({
            clicked: true,
            validated: this.state.password === '0000'
        });
				this,input.focus();
    }
```

코드 저장 후 웹 브라우저를 열어 포커스가 input으로 바로 넘어가는지 확인

- 이미지 넣기

컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용시에 활용

DOM에 ref 다는 방법과 동일함

# 5.3. 컴포넌트에 ref 달기

## 5.3.1. 사용법

```jsx
<MyComponent
	ref={(ref) => {this.myComponent=ref}}
/>
```

MyComponent 내부의 메서드 및 멤버 변수에도 접근 가능.

 > 내부의 ref에도 접근이 가능함.

스크롤 박스가 있는 컴포넌트를 만들고, 스크롤바를 아래로 내리는 작업을 부모 컴포넌트에서 실행

1. ScrollBox 컴포넌트 만들기
2. 컴포넌트에 ref 달기
3. ref를 이용하여 컴포넌트 내부 메서드 호출하기

## 5.3.2. 컴포넌트 초기 설정

1. JSX 인라인 스타일링 문법으로 스크롤 박스 만들기
2. 최상위 DOM에 ref 달기

### 5.3.2.1. 컴포넌트 파일 생성

```jsx
// src/ScrollBox.js

import React, { Component } from 'react';

class ScrollBox extends Component {
  render() {
    const style = {
      border: '1px solid black',
      height: '300px',
      width: '300px',
      overflow: 'auto',
      position: 'relative'
    };

    const innerStyle = {
      width: '100%',
      height: '650px',
      background: 'linear-gradient(white, black)'
    };

    return (
      <div
        style={style}
        ref={ref => {this.box = ref;}}>
        <div style={innerStyle} />
      </div>
    );
  }
}
export default ScrollBox;
```

### 5.3.2.2 App 컴포넌트에서 스크롤 박스 컴포넌트 렌더링

```jsx
// src/App.js

import React, { Component } from 'react';
import ScrollBox from './ScrollBox'; 
// 우리가 만든 컴포넌트 불러오기

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox/>
      </div>
    );
  }
}

export default App;
```

## 5.3.3. 컴포넌트에 메서드 생성

컴포넌트에 스크롤바르 맨 아래로 내리는 매서드 생성

- 사용되는 값
    1. scrollTop : 세로 스크롤바 위치 (0 ~ 350)
    2. scrollHeight: 스크롤이 있는 박스 안의 div 높이 (650)
    3. clientHeight: 스크롤이 있는 박스의 높이 (300)

```jsx
// src/ScrollBox.js

import React, { Component } from 'react';
class ScrollBox extends Component {
  scrollToBottom = () => {
    const { scrollHeight, clientHeight } = this.box;
    /* 앞 코드에는 비구조화 할당 문법을 사용했습니다.
    다음 코드와 같은 의미입니다.
    const scrollHeight = this.box.scrollHeight;
    const clientHeight = this.box.cliengHeight;
    */
    this.box.scrollTop = scrollHeight - clientHeight;
  };

  render() {
    const style = {
      border: '1px solid black',
      height: '300px',
      width: '300px',
      overflow: 'auto',
      position: 'relative'
    };
    const innerStyle = {
      width: '100%',
      height: '650px',
      background: 'linear-gradient(white, black)'
    };
    return (
      <div
        style={style}
        ref={ref => {
          this.box = ref;
        }}
      >
        <div style={innerStyle} />
      </div>
    );
  }
}
export default ScrollBox;
```

## 5.3.4. 컴포넌트에 ref 달고 내부 메서드사용

App 컴포넌트에서 ScrollBox에 ref를 달고 버튼을 만들어 누르면 ScrollBox 컴포넌트의 scrollBottom 메서드를 실행하도록 코드 작성

 

```jsx
// src/App.js

import React, { Component } from 'react';
import ScrollBox from './ScrollBox'; 
// 우리가 만든 컴포넌트 불러오기

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={(ref) => (this.scrollBox = ref)} />
        <button onClick={() => this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>
    );
  }
}

export default App;
```

# 정리

- 컴포넌트 내부에서 DOM에 직접 접근할 때에는 ref 사용
    
    →ref 사용하지 않고 원하는 기능 구현 가능한지 여부 고려 필수!!
    
- 서로 다른 컴포넌트끼리의 데이터 교류시에 ref사용하는 것은 오사용
- 컴포넌트끼리 데이터를 교류할 떄는 언제나 데이터를 부모 ↔ 자식 흐름으로 교류해야 함!