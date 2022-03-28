- 이벤트 (evnet) : 사용자가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것

# 4.1. 리액트의 이벤트 시스템

- 리액트의 이벤트 시스템은 HTML 이벤트와 동일한 인터페이스를 가지므로 사용법 유사

앞서 작성한 Say.js의 Button 코드 살펴보기

```jsx
const Say = () => {
    const [message, setMessage] = useState('');
    const onClickEnter = () => setMessage ('안녕하세요!');
    const onClickLeave = () => setMessage ('안녕히 가세요!');

    const [color, setColor] = useState('black');

    return(
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1 style={{ color }}>{message}</h1>
            <button style={{ color : 'red' }} onClick={() => setColor('red')}>
                빨간색
            </button>
            <button style={{ color : 'green' }} onClick={() => setColor('green')}>
                초록색
            </button>
            <button style={{ color : 'blue' }} onClick={() => setColor('blue')}>
                파란색
            </button>
        </div>
```

## 4.1.1. 이벤트를 사용할 때 주의 사항

1. **이벤트 이름은 카멜 표기법으로 작성함**
    1. onclick(HTML) → onClick(react)
    2. onkeyup(HTML) → onKeyUp(react)
2. **이벤트에 실행할 자바스크립트가 아닌 함수 형태의 값 전달**
    1. div, input, span 등의 DOm 요소에는 이벤트 설정이 가능하지만 직접 만든 컴포넌트에는 자체적인 이벤트 설정 불가
    2. 전달받은 props를 컴포넌트 내부의 DOM 이벤트로 설정해서 해결 가능.
    

## 4.1.2. 이벤트 종류

리액트에서 지원하는 이벤트 종류는 다음과 같음

- Clipboard
- Composition
- Keyboard
- Focus
- Mouse
- Touch
- ***
- [https://reactjs.org/docs/events.html](https://reactjs.org/docs/events.html) 리액트 메뉴얼에서 나머지 이벤트 참고

# 4.2. 예제로 이벤트 핸들링 익히기

1. 컴포넌트 생성 및 불러오기
2. onChange 이벤트 핸들링하기
3. 임의 메서드 만들기
4. input 여러 개 다루기
5. onKeyPress 이벤트 핸들링하기

## 4.2.1. 컴포넌트 생성 및 불러오기

### 4.2.1.1. 컴포넌트 생성

src 디렉터리 내부에 EventPractice.js 파일 생성

```jsx
// src/EventPractice.js

import React, { Component } from 'react';

class EventPractice extends Component {
    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
            </div>
        );
    }
}

export default EventPractice;
```

### 4.2.1.2. App.js에서 EvenvtPractice 렌더링

```jsx
// src/App.js

import React from 'react';
import EventPractice from './EventPractice'; 
// 우리가 만든 컴포넌트 불러오기

const App = () => {
  return <EventPractice />
  };

export default App;
```

- 실행 화면 추가

## 4.2.2. onChange 이벤트 핸들링하기

### 4.2.2.1 onChange 이벤트 설정

EventPractice 컴포넌트에 input 요소 렌더링 코드와 해당 요소에 onChange 이벤트를 설정하는 코드 작성. 

```jsx
// src/EventPractice.js

import React, { Component } from 'react';

class EventPractice extends Component {
    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                onChange={
                    (e) => {
                        console.log(e);
                    }
                }
                />
            </div>
        );
    }
}

export default EventPractice;
```

웹브라우저에서 개발자 도구를 열어 input에 아무거나 입력해보면 이벤트 객체가 콘솔에 나타남.

onchage이벤트가 발생할 때 바뀌는 값을 콘솔에 기록하기

```jsx
onChange={
	(e) => {
		console.log(e.targer.vlaue);
	}
}
```

### 4.2.2.2 state에 input 값 담기

1. constructor에서 state 초깃값 설정
2. 이벤트 핸들링 함수 내부에서 this.setState 메서드를 호출하여 State 업데이트
3. input의 value 값을 state에 있는 값으로 설정

```jsx
// src/EventPractice.js

import React, { Component } from 'react';

class EventPractice extends Component {

    **state = {
        message:''
    }**
    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                **value={this.state.message}**
                onChange={
                    (e) => {
                        **this.setState({
                            message: e.target.value**
                        })
                    }
                }
                />
            </div>
        );
    }
}

export default EventPractice;
```

오류없이 제대로 입력 가능하다면 state에 텍스트가 담기 성공!

### 4.2.2.3 버튼을 누를 때 comment 값을 공백으로 설정

입력 값이 state에 잘 들어갔는지, 인풋에서 제대로 반영하는 지 확인하기

1. input 요소 아래 button 만들기
2. 클릭 이벤트 발생하면 comment 값을 메시지 박스로 띄우기
3. comment 값 공백으로 설정하기

```jsx
// src/EventPractice.js

import React, { Component } from 'react';

class EventPractice extends Component {

    state = {
        message:''
    }
    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                onChange={
                    (e) => {
                        this.setState({
                            message: e.target.value
                        })
                    }
                }
                />
                **<button onClick={
                    () => {
                        alert(this.state.message);
                        this.setState({
                            message:''
                        });
                    }
                }>확인</button>**
            </div>
        );
    }
}

export default EventPractice;
```

## 4.2.3. 임의 메서드 만들기

"이벤트의 실행할 자바스크립트의 코드가 아닌 함수 형태의 값을 전달함"

이에 따라 앞에서는 이벤트를 처리할 때 렌더링을 하는 동시에 함수를 만들어서 전달해줌.

이번에는...

- 함수를 미리 준비하여 전달하기
    - 성능은 유사하나 가독성은 훨씬 높음

### 4.2.3.1. 기본 방식

```jsx
// src/EventPractice.js

import React, { Component } from 'react';

class EventPractice extends Component {

    state = {
        message:''
    }

    **constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }
    
    handleClick() {
        alert(this.state.message);
        this.setState({
            message:''
        });
    }**

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                **onChange={this.handleChange}
                />
                <button onClick={this.handleClick}>확인</button>**
            </div>
        );
    }
}

export default EventPractice;
```

임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 this 관곅 끊김

 >> this를 컴포넌트 자신으로 제대로 가리키기 위해 메서드를 this와 바인딩하는 작업 필요

 >> 이 작업이 이루어지지 않는다면 this는 undefined를 가리킴.

### 4.2.3.2. Property Initializer Syntax 사용한 메서드 작성

매서드 바인딩은 생성자 매서드에서 하는 것이 정석

이 작업을 좀 더 간단하게 하는 방법

- 바벨의 transform-class-properties 문법을 사용, 화살표 함수 형태로 메서드 정의하기

```jsx
// src/EventPractice.js

import React, { Component } from 'react';

class EventPractice extends Component {

    state = {
        message:''
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    **handleChange = (e) => {**
        this.setState({
            message: e.target.value
        });
    }
    
    **handleClick = () => {**
        alert(this.state.message);
        this.setState({
            message:''
        });
    }

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                onChange={this.handleChange}
                />
                <button onClick={this.handleClick}>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

## 4.2.4. input 여러 개 다루기

input이 여러 개일 때 → event 객체 (e.target.name 값) 활용하기

```jsx
// src/EventPractice.js

import React, { Component } from 'react';

class EventPractice extends Component {

    state = {
        message:'',
        username: ''
    }

    **handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };
    
    handleClick = () => {
        alert(this.state.username + ':'+this.state.message);
        this.setState({
            message:'',
            username:''
        });
    }**

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>

                **<input
                type="text"
                name="username"
                placeholder="사용자명"
                value={this.state.username}
                onChange={this.handleChange}
                />**

                <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                onChange={this.handleChange}
                />
                <button onClick={this.handleClick}>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

아래의 코드가 핵심 코드!1

```jsx

    **handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };**
```

객체 안에서 key를 [  ]로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key 값으로 사용됨.

 

## 4.2.5. onKeyPress 이벤트 핸들링

- KeyPress 이벤트 처리 방법
- comment 인풋에서 Enter 눌렀을 떄 handleClick 메서드 호출

```jsx
// src/EventPractice.js

import React, { Component } from 'react';

class EventPractice extends Component {

    state = {
        message:'',
        username: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    
    handleClick = () => {
        alert(this.state.username + ':'+this.state.message);
        this.setState({
            message:'',
            username:''
        });
    }

    **handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleClick();
        } 
    }**

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>

                <input
                type="text"
                name="username"
                placeholder="사용자명"
                value={this.state.username}
                onChange={this.handleChange}
                />

                <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                onChange={this.handleChange}
                **onKeyPress={this.handleKeyPress}**
                />
                <button onClick={this.handleClick}>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

# 4.3. 함수형 컴포넌트 구현해보기

새로 코드 작성

```jsx
import React, { useState } from 'react';

const EventPractice = () => {
  const [form, setForm] = useState({
    username: '',
    message: ''
  });
  const { username, message } = form;
  const onChange = e => {
    setTimeout(() => console.log(e), 500);
    const nextForm = {
      ...form, // 기존의 form 내용을 이 자리에 복사 한 뒤
      [e.target.name]: e.target.value // 원하는 값을 덮어씌우기
    };
    setForm(nextForm);
  };
  const onClick = () => {
    alert(username + ': ' + message);
    setForm({
      username: '',
      message: ''
    });
  };
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="유저명"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해보세요"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};
export default EventPractice;

```

[e.target.name](http://e.target.name) 활용없이  onChange 관련 함수 두 개를 따로 만들어줄수도 있지만

인풋의 개수가 많아질 것이 예상되는 경우에는 e.target.name이 더 효과적일 수 있음.

[e.target.name](http://e.target.name) 값을 활용하려면 userState를 쓸 때 인풋 값들이 들어 있는 form 객체를 사용해주면 됨